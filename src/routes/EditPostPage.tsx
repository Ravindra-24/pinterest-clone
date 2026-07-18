import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { Field, Textarea } from "../components/ui/Field";
import { Seo } from "../components/ui/Seo";
import { EmptyState } from "../components/ui/EmptyState";
import { useAppSelector } from "../hooks/store";
import { useGetPostQuery, useUpdatePostMutation } from "../services/api";

export default function EditPostPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const viewer = useAppSelector((state) => state.auth.user);
  const { data: post, isLoading } = useGetPostQuery(id);
  const [update, updateState] = useUpdatePostMutation();
  const [values, setValues] = useState({ title: "", description: "", altText: "", category: "", visibility: "public" });
  useEffect(() => { if (post) setValues({ title: post.title, description: post.description || "", altText: post.altText || "", category: post.category || "Inspiration", visibility: post.visibility || "public" }); }, [post]);
  if (isLoading || !post) return <div className="page container"><div className="feed-status">Loading your idea…</div></div>;
  if (viewer?.id !== post.user.id) return <div className="page container"><EmptyState title="This idea is not editable." description="Only its owner can make changes." /></div>;
  const submit = async (event: React.FormEvent) => { event.preventDefault(); try { const updated = await update({ id: post.id, changes: values as any }).unwrap(); toast.success("Changes saved"); navigate(`/p/${updated.slug}`); } catch { toast.error("Could not save changes"); } };
  return <div className="page"><Seo title={`Edit ${post.title}`} description="Edit an idea." noIndex /><div className="container"><form className="surface form-layout" onSubmit={submit}><div className="upload-drop"><img className="upload-preview" src={post.media.url} alt={post.altText} /></div><div className="form-panel"><span className="eyebrow">Edit idea</span><h1 className="editorial" style={{ fontSize: "3.5rem", margin: 0 }}>Refine the details.</h1><Field label="Title" value={values.title} onChange={(event) => setValues({ ...values, title: event.target.value })} /><Textarea label="Description" value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })} /><Textarea label="Image description" value={values.altText} onChange={(event) => setValues({ ...values, altText: event.target.value })} /><Field label="Category" value={values.category} onChange={(event) => setValues({ ...values, category: event.target.value })} /><label className="field"><span className="field-label">Visibility</span><select className="input" value={values.visibility} onChange={(event) => setValues({ ...values, visibility: event.target.value })}><option value="public">Public</option><option value="private">Private</option></select></label><div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}><Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button><Button type="submit" disabled={updateState.isLoading}>{updateState.isLoading ? "Saving…" : "Save changes"}</Button></div></div></form></div></div>;
}
