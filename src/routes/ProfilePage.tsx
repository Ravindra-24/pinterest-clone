import { format } from "date-fns";
import { CalendarDays, FolderHeart, Pencil, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { FeedGrid } from "../components/patterns/FeedGrid";
import { Seo } from "../components/ui/Seo";
import { AuthDialog } from "../features/auth/AuthDialog";
import { useAppSelector } from "../hooks/store";
import { useGetCollectionsQuery, useGetProfileQuery, useToggleFollowMutation } from "../services/api";

export default function ProfilePage() {
  const { username = "" } = useParams();
  const navigate = useNavigate();
  const viewer = useAppSelector((state) => state.auth.user);
  const { data: profile, isLoading, isError } = useGetProfileQuery(username);
  const { data: collections = [] } = useGetCollectionsQuery(username, { skip: !profile });
  const [follow, followState] = useToggleFollowMutation();
  const [authOpen, setAuthOpen] = useState(false);
  const [tab, setTab] = useState<"posts" | "collections">("posts");

  if (isLoading) return <div className="page container"><div className="surface skeleton" style={{ height: 280 }} /></div>;
  if (isError || !profile) return <div className="page container"><Seo title="Profile not found" description="This profile is not available." noIndex /><EmptyState title="We could not find this person." description="The username may have changed or the account may be private." /></div>;

  const isOwner = viewer?.id === profile.id;
  const toggleFollow = async () => {
    if (!viewer) return setAuthOpen(true);
    try { await follow(profile.id).unwrap(); toast.success(profile.isFollowing ? "Unfollowed" : "Following"); }
    catch { toast.error("Could not update this connection"); }
  };
  const schema = { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: profile.displayName, identifier: profile.username, description: profile.bio, image: profile.profilePicture } };

  return (
    <div className="page">
      <Seo title={profile.displayName} description={profile.bio || `Explore visual ideas shared by ${profile.displayName}.`} path={`/u/${profile.username}`} image={profile.profilePicture || undefined} type="profile" jsonLd={schema} />
      <div className="container">
        <header className="surface profile-hero">
          <Avatar user={profile} size={112} />
          <div>
            <span className="eyebrow">@{profile.username}</span>
            <h1 className="editorial">{profile.displayName}</h1>
            {profile.bio && <p className="muted" style={{ maxWidth: 600, lineHeight: 1.6 }}>{profile.bio}</p>}
            <div className="profile-stats">
              <span><strong>{profile.postCount || profile.posts.length}</strong> ideas</span>
              <span><strong>{profile.followerCount || 0}</strong> followers</span>
              <span><strong>{profile.followingCount || 0}</strong> following</span>
              {profile.joinedAt && <span><CalendarDays size={14} style={{ display: "inline", marginRight: 4 }} />Joined {format(new Date(profile.joinedAt), "MMM yyyy")}</span>}
            </div>
          </div>
          <Button onClick={isOwner ? () => navigate(`/u/${profile.username}/edit`) : toggleFollow} disabled={followState.isLoading} variant={profile.isFollowing ? "secondary" : "primary"}>
            {isOwner ? <><Pencil size={17} />Edit profile</> : <><UserPlus size={17} />{profile.isFollowing ? "Following" : "Follow"}</>}
          </Button>
        </header>
        <div className="filter-row" role="tablist" aria-label="Profile content" style={{ marginTop: "1.5rem" }}>
          <button className={`chip ${tab === "posts" ? "active" : ""}`} role="tab" aria-selected={tab === "posts"} onClick={() => setTab("posts")}>Ideas</button>
          <button className={`chip ${tab === "collections" ? "active" : ""}`} role="tab" aria-selected={tab === "collections"} onClick={() => setTab("collections")}>Collections</button>
        </div>
        {tab === "posts" ? profile.posts.length ? <FeedGrid posts={profile.posts} /> : <EmptyState title="No ideas shared yet." description={`${profile.displayName} is still curating their first post.`} /> : collections.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {collections.map((collection) => (
              <Link key={collection.id} to={`/c/${collection.slug}`} className="surface collection-card">
                <div className="collection-cover" style={{ background: collection.cover?.dominantColor || "var(--surface-muted)" }}>
                  {collection.cover?.url ? <img src={collection.cover.url} alt="" loading="lazy" /> : <FolderHeart size={34} aria-hidden="true" />}
                </div>
                <div className="collection-card-copy">
                  <span className="eyebrow">{collection.visibility}</span>
                  <h2 className="editorial">{collection.name}</h2>
                  <p className="muted">{collection.itemCount} saved {collection.itemCount === 1 ? "idea" : "ideas"}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : <EmptyState title="No public collections yet." description="Private collections are only visible to their owner." />}
      </div>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
