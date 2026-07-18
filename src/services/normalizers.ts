import type { PostDetail, PostSummary, PublicUser } from "../types/api";

export const normalizeUser = (input: any): PublicUser => {
  const id = String(input?.id || input?._id || "");
  const displayName =
    input?.displayName ||
    input?.fullName ||
    [input?.firstName, input?.lastName].filter(Boolean).join(" ") ||
    "Canvas member";

  return {
    id,
    _id: id,
    username: input?.username || `member-${id.slice(-6)}`,
    displayName,
    firstName: input?.firstName,
    lastName: input?.lastName,
    bio: input?.bio,
    profilePicture: input?.profilePicture,
    joinedAt: input?.joinedAt || input?.createdAt,
    followerCount: input?.followerCount ?? input?.followers?.length ?? 0,
    followingCount: input?.followingCount ?? input?.following?.length ?? 0,
    postCount: input?.postCount ?? input?.posts?.length ?? 0,
    isFollowing: input?.isFollowing,
    permissions: input?.permissions || [],
    interests: input?.interests || [],
  };
};

export const normalizePost = (input: any): PostSummary => {
  const id = String(input?.id || input?._id || "");
  const image = input?.media?.url || input?.image || "";
  return {
    id,
    _id: id,
    slug: input?.slug || `${slugify(input?.title || "idea")}-${id}`,
    title: input?.title || "Untitled idea",
    description: input?.description || "",
    altText: input?.altText || input?.title || "Creative visual idea",
    image,
    media: {
      url: image,
      publicId: input?.media?.publicId,
      width: input?.media?.width,
      height: input?.media?.height,
      aspectRatio:
        input?.media?.aspectRatio ||
        (input?.media?.width && input?.media?.height
          ? input.media.width / input.media.height
          : undefined),
      dominantColor: input?.media?.dominantColor || "#ddd6ce",
      blurDataUrl: input?.media?.blurDataUrl,
    },
    user: normalizeUser(input?.user || {}),
    category: input?.category || "Inspiration",
    tags: input?.tags || [],
    createdAt: input?.createdAt || new Date().toISOString(),
    likeCount: input?.likeCount ?? input?.likes?.length ?? 0,
    commentCount: input?.commentCount ?? input?.comments?.length ?? 0,
    saveCount: input?.saveCount ?? 0,
    likedByViewer: input?.likedByViewer,
    savedByViewer: input?.savedByViewer,
  };
};

export const normalizePostDetail = (input: any): PostDetail => ({
  ...normalizePost(input),
  comments: (input?.comments || []).map((comment: any) => ({
    id: String(comment?.id || comment?._id || ""),
    commentText: comment?.commentText || "",
    user: normalizeUser(comment?.user || {}),
    createdAt: comment?.createdAt || new Date().toISOString(),
    likeCount: comment?.likeCount ?? comment?.likes?.length ?? 0,
  })),
  visibility: input?.visibility || "public",
  isOwner: input?.isOwner,
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "idea";
