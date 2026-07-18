import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Field, Textarea } from "../components/ui/Field";
import { Seo } from "../components/ui/Seo";
import { EmptyState } from "../components/ui/EmptyState";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useGetProfileQuery, useUpdateProfileMutation } from "../services/api";
import { sessionReceived } from "../features/auth/authSlice";

export default function EditProfilePage() {
  const { username = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth);
  const { data: profile } = useGetProfileQuery(username);
  const [update, updateState] = useUpdateProfileMutation();
  const [image, setImage] = useState<File | null>(null);
  const [values, setValues] = useState({ displayName: "", username: "", bio: "" });
  useEffect(() => { if (profile) setValues({ displayName: profile.displayName, username: profile.username, bio: profile.bio || "" }); }, [profile]);
  if (!profile) return <div className="page container"><div className="feed-status">Loading your profile…</div></div>;
  if (session.user?.id !== profile.id) return <div className="page container"><EmptyState title="This profile is not editable." description="You can only edit your own profile." /></div>;
  const submit = async (event: React.FormEvent) => { event.preventDefault(); const body = new FormData(); Object.entries(values).forEach(([key, value]) => body.append(key, value)); if (image) body.append("image", image); try { const user = await update(body).unwrap(); if (session.accessToken) dispatch(sessionReceived({ accessToken: session.accessToken, user })); toast.success("Profile updated"); navigate(`/u/${user.username}`); } catch { toast.error("Could not update your profile"); } };
  return <div className="page"><Seo title="Edit profile" description="Update your profile." noIndex /><div className="container" style={{ maxWidth: 780 }}><form className="surface form-panel" onSubmit={submit}><span className="eyebrow">Profile settings</span><h1 className="editorial" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: .9, margin: 0 }}>How you show up.</h1><div className="author-row"><Avatar user={profile} size={84} /><label className="button button-secondary" htmlFor="profile-image">Change photo<input id="profile-image" type="file" className="sr-only" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImage(event.target.files?.[0] || null)} /></label></div><Field label="Display name" value={values.displayName} onChange={(event) => setValues({ ...values, displayName: event.target.value })} /><Field label="Username" value={values.username} onChange={(event) => setValues({ ...values, username: event.target.value })} /><Textarea label="Bio" value={values.bio} onChange={(event) => setValues({ ...values, bio: event.target.value })} maxLength={500} /><div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}><Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button><Button type="submit" disabled={updateState.isLoading}>{updateState.isLoading ? "Saving…" : "Save profile"}</Button></div></form></div></div>;
}
