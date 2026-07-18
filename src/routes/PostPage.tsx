import { formatDistanceToNow } from "date-fns";
import { Flag, Heart, MessageCircle, Pencil, Plus, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { CollectionDialog } from "../features/collections/CollectionDialog";
import { AuthDialog } from "../features/auth/AuthDialog";
import { ReportDialog } from "../features/trust/ReportDialog";
import { useAppSelector } from "../hooks/store";
import { cloudinaryImage, cloudinarySrcSet } from "../services/images";
import { useAddCommentMutation, useGetPostQuery, useToggleLikeMutation } from "../services/api";

export default function PostPage() {
  const { slugId = "" } = useParams();
  const navigate = useNavigate();
  const viewer = useAppSelector((state) => state.auth.user);
  const { data: post, isLoading, isError } = useGetPostQuery(slugId);
  const [toggleLike, likeState] = useToggleLikeMutation();
  const [addComment, commentState] = useAddCommentMutation();
  const [comment, setComment] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  if (isLoading) return <div className="page container"><div className="surface skeleton" style={{ height: "72vh" }} /></div>;
  if (isError || !post) return <div className="page container"><Seo title="Idea not found" description="This idea is no longer available." noIndex /><EmptyState title="This idea has moved on." description="It may have been removed or made private." action={<Button onClick={() => navigate("/")}>Explore other ideas</Button>} /></div>;

  const requireAuth = (action: () => void) => viewer ? action() : setAuthOpen(true);
  const share = async () => {
    const webShare = (navigator as any).share as undefined | ((data: ShareData) => Promise<void>);
    try {
      const url = window.location.href;
      if (webShare) await webShare.call(navigator, { title: post.title, text: post.description, url });
      else await navigator.clipboard.writeText(url);
      toast.success(webShare ? "Shared" : "Link copied");
    } catch (error: any) { if (error?.name !== "AbortError") toast.error("Could not share this idea"); }
  };
  const submitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    requireAuth(async () => {
      try { await addComment({ postId: post.id, commentText: comment.trim() }).unwrap(); setComment(""); toast.success("Comment added"); }
      catch { toast.error("Could not add your comment"); }
    });
  };

  const imageSchema = { "@context": "https://schema.org", "@type": "ImageObject", name: post.title, description: post.description, contentUrl: post.media.url, author: { "@type": "Person", name: post.user.displayName, url: `${window.location.origin}/u/${post.user.username}` }, datePublished: post.createdAt };

  return (
    <div className="page">
      <Seo title={post.title} description={post.description || `A visual idea by ${post.user.displayName}.`} path={`/p/${post.slug}`} image={post.media.url} type="article" jsonLd={imageSchema} />
      <div className="container">
        <article className="surface split-view">
          <div className="post-stage" style={{ background: post.media.dominantColor }}>
            <img src={cloudinaryImage(post.media.url, 1600)} srcSet={cloudinarySrcSet(post.media.url)} sizes="(max-width: 980px) 100vw, 65vw" width={post.media.width} height={post.media.height} alt={post.altText || post.title} fetchPriority="high" />
          </div>
          <div className="post-panel">
            <div className="author-row">
              <Link to={`/u/${post.user.username}`}><Avatar user={post.user} size={48} /></Link>
              <div><Link to={`/u/${post.user.username}`} style={{ fontWeight: 850 }}>{post.user.displayName}</Link><div className="muted" style={{ fontSize: ".8rem" }}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div></div>
            </div>
            <h1 className="post-title editorial">{post.title}</h1>
            {post.description && <p className="muted" style={{ lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{post.description}</p>}
            <div className="post-actions">
              <Button onClick={() => setSaveOpen(true)}><Plus size={18} />Save</Button>
              <Button variant="secondary" disabled={likeState.isLoading} onClick={() => requireAuth(() => toggleLike(post.id))}><Heart size={18} fill={post.likedByViewer ? "currentColor" : "none"} />{post.likeCount}</Button>
              <Button variant="secondary" onClick={share}><Share2 size={18} />Share</Button>
              <Button variant="ghost" size="icon" aria-label="Report idea" onClick={() => requireAuth(() => setReportOpen(true))}><Flag size={18} /></Button>
              {post.isOwner && <><Button variant="ghost" size="icon" aria-label="Edit idea" onClick={() => navigate(`/edit/${post.id}`)}><Pencil size={18} /></Button><Button variant="ghost" size="icon" aria-label="Delete idea"><Trash2 size={18} /></Button></>}
            </div>
            <hr className="divider" />
            <section aria-labelledby="comments-title" style={{ marginTop: "1.25rem" }}>
              <h2 id="comments-title" style={{ display: "flex", alignItems: "center", gap: ".5rem", margin: 0 }}><MessageCircle size={20} />Conversation <span className="muted" style={{ fontWeight: 500 }}>({post.commentCount})</span></h2>
              <form onSubmit={submitComment} style={{ display: "flex", gap: ".5rem", marginTop: "1rem" }}>
                <label className="sr-only" htmlFor="comment">Add a comment</label>
                <input id="comment" className="input" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={800} placeholder="Add something thoughtful…" />
                <Button type="submit" disabled={commentState.isLoading || !comment.trim()}>Post</Button>
              </form>
              <div className="comments">
                {post.comments.length ? post.comments.map((item) => <div className="comment" key={item.id}><Avatar user={item.user} size={36} /><div><strong>{item.user.displayName}</strong><p>{item.commentText}</p><span className="muted" style={{ fontSize: ".72rem" }}>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span></div></div>) : <p className="muted">Start the conversation with a useful observation.</p>}
              </div>
            </section>
          </div>
        </article>
      </div>
      <CollectionDialog post={saveOpen ? post : null} onClose={() => setSaveOpen(false)} onRequireAuth={() => setAuthOpen(true)} />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} targetType="post" targetId={post.id} />
    </div>
  );
}
