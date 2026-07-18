import { Heart, Plus, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { PostSummary } from "../../types/api";
import { cloudinaryImage, cloudinarySrcSet } from "../../services/images";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

export const PostCard = ({ data: post, width, onSave }: { data: PostSummary; width: number; onSave?: (post: PostSummary) => void }) => {
  const ratio = post.media.aspectRatio || 0.76;
  const height = Math.max(230, Math.min(560, width / ratio));

  const share = async () => {
    const url = `${window.location.origin}/p/${post.slug}`;
    const webShare = (navigator as any).share as undefined | ((data: ShareData) => Promise<void>);
    try {
      if (webShare) await webShare.call(navigator, { title: post.title, text: post.description, url });
      else await navigator.clipboard.writeText(url);
      toast.success(webShare ? "Shared" : "Link copied");
    } catch (error: any) {
      if (error?.name !== "AbortError") toast.error("Could not share this idea");
    }
  };

  return (
    <article className="post-card" style={{ height }}>
      <img
        className="post-card-image"
        src={cloudinaryImage(post.media.url, Math.max(width * 2, 480))}
        srcSet={cloudinarySrcSet(post.media.url)}
        sizes="(max-width: 520px) 50vw, (max-width: 980px) 33vw, 280px"
        width={post.media.width}
        height={post.media.height}
        alt={post.altText || post.title}
        loading="lazy"
        decoding="async"
        style={{ background: post.media.dominantColor }}
      />
      <Link className="post-card-link" to={`/p/${post.slug}`} aria-label={`View ${post.title}`} />
      <div className="post-card-overlay" aria-hidden="false">
        <div className="post-card-top">
          <span className="chip" style={{ minHeight: 34, padding: ".35rem .65rem", background: "rgb(255 255 255 / 88%)", color: "#1d1b19", border: 0 }}>{post.category}</span>
          <Button size="small" onClick={() => onSave?.(post)}><Plus size={16} />Save</Button>
        </div>
        <div className="post-card-bottom">
          <Link className="card-author" to={`/u/${post.user.username}`} aria-label={`View ${post.user.displayName}'s profile`}><Avatar user={post.user} size={34} /></Link>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 className="post-card-title">{post.title}</h2>
            <span className="post-card-meta"><span><Heart size={12} fill="currentColor" /> {post.likeCount}</span></span>
          </div>
          <Button variant="ghost" size="icon" aria-label={`Share ${post.title}`} onClick={share} style={{ color: "white", background: "rgb(0 0 0 / 28%)" }}><Share2 size={17} /></Button>
        </div>
      </div>
    </article>
  );
};
