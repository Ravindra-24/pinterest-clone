export type Visibility = "public" | "private";

export interface PublicUser {
  id: string;
  _id?: string;
  username: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  bio?: string | null;
  profilePicture?: string | null;
  joinedAt?: string;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  isFollowing?: boolean;
  permissions?: string[];
  interests?: string[];
}

export interface MediaAsset {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  dominantColor?: string;
  blurDataUrl?: string;
}

export interface PostSummary {
  id: string;
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  altText?: string;
  image?: string;
  media: MediaAsset;
  user: PublicUser;
  category?: string;
  tags?: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  saveCount: number;
  likedByViewer?: boolean;
  savedByViewer?: boolean;
}

export interface Comment {
  id: string;
  commentText: string;
  user: PublicUser;
  createdAt: string;
  likeCount: number;
}

export interface PostDetail extends PostSummary {
  comments: Comment[];
  visibility?: Visibility;
  isOwner?: boolean;
}

export interface CollectionSummary {
  id: string;
  slug: string;
  name: string;
  description?: string;
  visibility: Visibility;
  owner: PublicUser;
  cover?: MediaAsset;
  itemCount: number;
}

export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, any> & { nextCursor?: string | null; hasMore?: boolean };
  error?: { code?: string; message: string; details?: unknown } | null;
  message?: string;
}

export interface Session {
  accessToken: string;
  user: PublicUser;
}
