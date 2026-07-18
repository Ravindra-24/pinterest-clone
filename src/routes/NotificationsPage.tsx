import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useGetNotificationsQuery, useMarkNotificationsReadMutation } from "../services/api";

export default function NotificationsPage() {
  const { data = [], isLoading } = useGetNotificationsQuery();
  const [markRead, readState] = useMarkNotificationsReadMutation();
  const copy: Record<string, string> = { follow: "started following you", like: "liked your idea", comment: "commented on your idea", save: "saved your idea", moderation: "sent an account update" };
  return <div className="page"><Seo title="Notifications" description="Recent account activity." noIndex /><div className="container" style={{ maxWidth: 760 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "1rem" }}><div><span className="eyebrow">Activity</span><h1 className="editorial" style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: .9, margin: ".5rem 0 1.5rem" }}>Notifications.</h1></div>{data.some((item) => !item.readAt) && <Button variant="secondary" onClick={() => markRead()} disabled={readState.isLoading}><CheckCheck size={18} />Mark all read</Button>}</div>{isLoading ? <div className="feed-status">Checking recent activity…</div> : data.length ? <div style={{ display: "grid", gap: ".65rem" }}>{data.map((item) => <article key={item.id} className="surface" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: ".8rem", alignItems: "center", padding: "1rem", opacity: item.readAt ? .72 : 1 }}><Avatar user={item.actor} size={44} /><div><strong>{item.actor.displayName}</strong> {copy[item.type] || "interacted with your content"}<div className="muted" style={{ fontSize: ".78rem" }}>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</div></div>{!item.readAt && <span aria-label="Unread" style={{ width: 9, height: 9, borderRadius: 99, background: "var(--accent)" }} />}</article>)}</div> : <EmptyState icon={<Bell className="empty-icon" />} title="Nothing new yet." description="Likes, comments, saves, and new followers will appear here." />}</div></div>;
}
