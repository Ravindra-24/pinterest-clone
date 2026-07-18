import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useAppSelector } from "../hooks/store";
import { useGetReportsQuery, useModerateContentMutation, useResolveReportMutation } from "../services/api";

export default function ModerationPage() {
  const user = useAppSelector((state) => state.auth.user);
  const allowed = user?.permissions?.includes("moderate");
  const { data = [], isLoading, refetch } = useGetReportsQuery("open", { skip: !allowed });
  const [moderate] = useModerateContentMutation();
  const [resolve] = useResolveReportMutation();
  if (!allowed) return <div className="page container"><Seo title="Moderation" description="Restricted moderation tools." noIndex /><EmptyState icon={<ShieldCheck className="empty-icon" />} title="This area is restricted." description="Moderator permission is required." /></div>;
  const action = async (report: any, decision: "hide" | "dismissed") => { try { if (decision === "hide") await moderate({ targetType: report.targetType, targetId: report.targetId, action: "hide" }).unwrap(); await resolve({ id: report.id, status: decision === "hide" ? "resolved" : "dismissed" }).unwrap(); toast.success("Report updated"); refetch(); } catch { toast.error("Could not update the report"); } };
  return <div className="page"><Seo title="Moderation" description="Review community reports." noIndex /><div className="container"><span className="eyebrow">Trust and safety</span><h1 className="editorial" style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: .9, margin: ".5rem 0 2rem" }}>Review queue.</h1>{isLoading ? <div className="feed-status">Loading reports…</div> : data.length ? <div style={{ display: "grid", gap: ".8rem" }}>{data.map((report) => <article className="surface" style={{ padding: "1.2rem" }} key={report.id}><span className="eyebrow">{report.targetType} · {report.reason}</span><h2 style={{ margin: ".5rem 0" }}>Reported by {report.reporter?.displayName || "Member"}</h2>{report.details && <p className="muted">{report.details}</p>}<div style={{ display: "flex", gap: ".5rem" }}><Button variant="danger" onClick={() => action(report, "hide")}>Hide content</Button><Button variant="secondary" onClick={() => action(report, "dismissed")}>Dismiss report</Button></div></article>)}</div> : <EmptyState icon={<ShieldCheck className="empty-icon" />} title="The queue is clear." description="There are no open community reports." />}</div></div>;
}
