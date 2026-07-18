import * as Dialog from "@radix-ui/react-dialog";
import { FolderPlus, Lock, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { useAppSelector } from "../../hooks/store";
import { useCreateCollectionMutation, useGetCollectionsQuery, useSavePostMutation } from "../../services/api";
import type { PostSummary } from "../../types/api";

export const CollectionDialog = ({ post, onClose, onRequireAuth }: { post: PostSummary | null; onClose: () => void; onRequireAuth: () => void }) => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: collections = [], isLoading } = useGetCollectionsQuery(undefined, { skip: !user || !post });
  const [createCollection] = useCreateCollectionMutation();
  const [savePost] = useSavePostMutation();
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const save = async (collectionId: string) => {
    if (!post) return;
    try {
      await savePost({ collectionId, postId: post.id }).unwrap();
      toast.success("Saved to your collection");
      onClose();
    } catch { toast.error("Could not save this idea"); }
  };

  const create = async () => {
    if (!newName.trim()) return;
    try {
      const collection = await createCollection({ name: newName.trim(), visibility: "private" }).unwrap();
      await save(collection.id);
    } catch { toast.error("Could not create the collection"); }
  };

  return (
    <Dialog.Root open={Boolean(post)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close" style={{ position: "absolute", right: 12, top: 12 }}><X size={20} /></Button></Dialog.Close>
          <Dialog.Title className="editorial" style={{ fontSize: "2.2rem", margin: "0 3rem .4rem 0" }}>Keep this idea.</Dialog.Title>
          <Dialog.Description className="muted">Choose where it belongs. New collections are private by default.</Dialog.Description>
          {!user ? (
            <div className="empty"><div><Lock className="empty-icon" /><h2>Sign in to save</h2><p>Your collections stay with you across devices.</p><Button onClick={() => { onClose(); onRequireAuth(); }}>Sign in</Button></div></div>
          ) : (
            <div style={{ display: "grid", gap: ".65rem", marginTop: "1.25rem" }}>
              {isLoading && <div className="skeleton" style={{ height: 52, borderRadius: 12 }} />}
              {collections.map((collection) => (
                <button key={collection.id} className="button button-secondary" style={{ justifyContent: "space-between", borderRadius: 12 }} onClick={() => save(collection.id)}>
                  <span style={{ display: "flex", alignItems: "center", gap: ".65rem" }}><FolderPlus size={18} />{collection.name}</span><Plus size={17} />
                </button>
              ))}
              {creating ? (
                <div className="surface" style={{ display: "grid", gap: ".7rem", padding: ".8rem" }}>
                  <Field label="Collection name" value={newName} onChange={(event) => setNewName(event.target.value)} autoFocus maxLength={60} />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}><Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button><Button onClick={create}>Create and save</Button></div>
                </div>
              ) : <Button variant="ghost" onClick={() => setCreating(true)}><Plus size={18} />New collection</Button>}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
