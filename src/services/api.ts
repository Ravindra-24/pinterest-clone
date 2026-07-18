import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { appConfig } from "../app/config";
import { normalizePost, normalizePostDetail, normalizeUser } from "./normalizers";
import { sessionCleared, sessionReceived } from "../features/auth/authSlice";
import type { RootState } from "../app/store";
import type { ApiEnvelope, CollectionSummary, CursorPage, PostDetail, PostSummary, PublicUser, Session } from "../types/api";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${appConfig.apiBaseUrl}/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("accept", "application/json");
    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const url = typeof args === "string" ? args : args.url;
  if (result.error?.status === 401 && !url.includes("/auth/refresh")) {
    const refresh = await rawBaseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions);
    const session = (refresh.data as ApiEnvelope<Session> | undefined)?.data;
    if (session?.accessToken) {
      api.dispatch(sessionReceived({ ...session, user: normalizeUser(session.user) }));
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(sessionCleared());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Feed", "Post", "Profile", "Collection", "Session"],
  endpoints: (builder) => ({
    getSession: builder.query<Session, void>({
      query: () => "/auth/me",
      transformResponse: (response: ApiEnvelope<Session>) => ({
        ...response.data,
        user: normalizeUser(response.data.user),
      }),
      providesTags: ["Session"],
    }),
    login: builder.mutation<Session, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Session>) => ({
        ...response.data,
        user: normalizeUser(response.data.user),
      }),
      invalidatesTags: ["Session"],
    }),
    signup: builder.mutation<Session, { firstName: string; lastName: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Session>) => ({
        ...response.data,
        user: normalizeUser(response.data.user),
      }),
      invalidatesTags: ["Session"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Session"],
    }),
    getFeed: builder.query<CursorPage<PostSummary>, { cursor?: string; category?: string; sort?: string; limit?: number }>({
      query: ({ cursor, category, sort = "recent", limit = 24 }) => ({
        url: "/posts",
        params: { cursor, category: category === "All" ? undefined : category, sort, limit },
      }),
      transformResponse: (response: ApiEnvelope<any[]>) => ({
        items: (response.data || []).map(normalizePost),
        nextCursor: response.meta?.nextCursor || null,
        hasMore: Boolean(response.meta?.hasMore),
      }),
      providesTags: (result) => [
        "Feed",
        ...(result?.items.map(({ id }) => ({ type: "Post" as const, id })) || []),
      ],
    }),
    getPost: builder.query<PostDetail, string>({
      query: (slugOrId) => `/posts/${encodeURIComponent(slugOrId)}`,
      transformResponse: (response: ApiEnvelope<any>) => normalizePostDetail(response.data),
      providesTags: (result) => (result ? [{ type: "Post", id: result.id }] : []),
    }),
    updatePost: builder.mutation<PostDetail, { id: string; changes: Partial<PostDetail> & { tags?: string[] } }>({
      query: ({ id, changes }) => ({ url: `/posts/${id}`, method: "PATCH", body: changes }),
      transformResponse: (response: ApiEnvelope<any>) => normalizePostDetail(response.data),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Post", id }, "Feed"],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Feed", "Profile"],
    }),
    createPost: builder.mutation<PostDetail, FormData>({
      query: (body) => ({ url: "/posts", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<any>) => normalizePostDetail(response.data),
      invalidatesTags: ["Feed", "Profile"],
    }),
    toggleLike: builder.mutation<PostSummary, string>({
      query: (id) => ({ url: `/posts/${id}/like`, method: "PATCH" }),
      transformResponse: (response: ApiEnvelope<any>) => normalizePost(response.data),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    addComment: builder.mutation<PostDetail, { postId: string; commentText: string }>({
      query: ({ postId, commentText }) => ({ url: `/posts/${postId}/comments`, method: "POST", body: { commentText } }),
      transformResponse: (response: ApiEnvelope<any>) => normalizePostDetail(response.data),
      invalidatesTags: (_result, _error, { postId }) => [{ type: "Post", id: postId }],
    }),
    getProfile: builder.query<PublicUser & { posts: PostSummary[] }, string>({
      query: (usernameOrId) => `/users/${encodeURIComponent(usernameOrId)}`,
      transformResponse: (response: ApiEnvelope<any>) => ({
        ...normalizeUser(response.data),
        posts: (response.data.posts || []).map(normalizePost),
      }),
      providesTags: (result) => (result ? [{ type: "Profile", id: result.id }] : []),
    }),
    updateProfile: builder.mutation<PublicUser, FormData>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      transformResponse: (response: ApiEnvelope<any>) => normalizeUser(response.data),
      invalidatesTags: ["Profile", "Session"],
    }),
    toggleFollow: builder.mutation<PublicUser, string>({
      query: (id) => ({ url: `/users/${id}/follow`, method: "PATCH" }),
      transformResponse: (response: ApiEnvelope<any>) => normalizeUser(response.data),
      invalidatesTags: (_result, _error, id) => [{ type: "Profile", id }],
    }),
    searchPosts: builder.query<CursorPage<PostSummary>, { q: string; cursor?: string; category?: string }>({
      query: ({ q, cursor, category }) => ({ url: "/search", params: { q, cursor, category, limit: 24 } }),
      transformResponse: (response: ApiEnvelope<any[]>) => ({
        items: (response.data || []).map(normalizePost),
        nextCursor: response.meta?.nextCursor || null,
        hasMore: Boolean(response.meta?.hasMore),
      }),
    }),
    getCollections: builder.query<CollectionSummary[], string | void>({
      query: (username) => ({ url: "/collections", params: { username } }),
      transformResponse: (response: ApiEnvelope<CollectionSummary[]>) => response.data,
      providesTags: ["Collection"],
    }),
    createCollection: builder.mutation<CollectionSummary, { name: string; description?: string; visibility: "public" | "private" }>({
      query: (body) => ({ url: "/collections", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<CollectionSummary>) => response.data,
      invalidatesTags: ["Collection"],
    }),
    getCollection: builder.query<CollectionSummary & { posts: PostSummary[] }, string>({
      query: (slugOrId) => `/collections/${encodeURIComponent(slugOrId)}`,
      transformResponse: (response: ApiEnvelope<any>) => ({ ...response.data, posts: (response.data.posts || []).map(normalizePost) }),
      providesTags: (result) => result ? [{ type: "Collection", id: result.id }] : ["Collection"],
    }),
    savePost: builder.mutation<void, { collectionId: string; postId: string }>({
      query: ({ collectionId, postId }) => ({ url: `/collections/${collectionId}/items`, method: "POST", body: { postId } }),
      invalidatesTags: ["Collection", "Feed", "Post"],
    }),
    reportContent: builder.mutation<void, { targetType: string; targetId: string; reason: string; details?: string }>({
      query: (body) => ({ url: "/reports", method: "POST", body }),
    }),
    getNotifications: builder.query<any[], void>({
      query: () => "/notifications",
      transformResponse: (response: ApiEnvelope<any[]>) => response.data.map((item) => ({ ...item, actor: normalizeUser(item.actor) })),
    }),
    markNotificationsRead: builder.mutation<void, void>({
      query: () => ({ url: "/notifications/read", method: "PATCH" }),
    }),
    getReports: builder.query<any[], string | void>({
      query: (status) => ({ url: "/moderation/reports", params: { status } }),
      transformResponse: (response: ApiEnvelope<any[]>) => response.data,
    }),
    resolveReport: builder.mutation<void, { id: string; status: string; resolutionNote?: string }>({
      query: ({ id, ...body }) => ({ url: `/moderation/reports/${id}`, method: "PATCH", body }),
    }),
    moderateContent: builder.mutation<void, { targetType: string; targetId: string; action: string }>({
      query: (body) => ({ url: "/moderation/actions", method: "POST", body }),
    }),
  }),
});

export const {
  useGetSessionQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetFeedQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useToggleLikeMutation,
  useAddCommentMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useToggleFollowMutation,
  useSearchPostsQuery,
  useGetCollectionsQuery,
  useCreateCollectionMutation,
  useGetCollectionQuery,
  useSavePostMutation,
  useReportContentMutation,
  useGetNotificationsQuery,
  useMarkNotificationsReadMutation,
  useGetReportsQuery,
  useResolveReportMutation,
  useModerateContentMutation,
} = api;
