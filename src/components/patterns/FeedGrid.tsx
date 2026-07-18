import { Masonry } from "masonic";
import { useState } from "react";
import type { PostSummary } from "../../types/api";
import { PostCard } from "./PostCard";
import { CollectionDialog } from "../../features/collections/CollectionDialog";
import { AuthDialog } from "../../features/auth/AuthDialog";

export const FeedGrid = ({ posts }: { posts: PostSummary[] }) => {
  const [saving, setSaving] = useState<PostSummary | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <Masonry
        items={posts}
        render={(props) => <PostCard {...props} onSave={setSaving} />}
        columnGutter={14}
        columnWidth={245}
        overscanBy={2}
      />
      <CollectionDialog post={saving} onClose={() => setSaving(null)} onRequireAuth={() => setAuthOpen(true)} />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};
