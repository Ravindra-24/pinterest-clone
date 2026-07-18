import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Field";
import { useReportContentMutation } from "../../services/api";

const reasons = ["Spam or misleading", "Harassment or hate", "Sexual or violent content", "Copyright concern", "Other"];

export const ReportDialog = ({ open, onOpenChange, targetType, targetId }: { open: boolean; onOpenChange: (open: boolean) => void; targetType: string; targetId: string }) => {
  const [reason, setReason] = useState(reasons[0]);
  const [details, setDetails] = useState("");
  const [report, { isLoading }] = useReportContentMutation();
  const submit = async () => {
    try { await report({ targetType, targetId, reason, details }).unwrap(); toast.success("Thank you. We will review this report."); onOpenChange(false); }
    catch { toast.error("Could not submit the report"); }
  };
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content"><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close" style={{ position: "absolute", right: 12, top: 12 }}><X size={20} /></Button></Dialog.Close><Dialog.Title className="editorial" style={{ fontSize: "2.2rem", margin: "0 3rem .4rem 0" }}>Report a concern.</Dialog.Title><Dialog.Description className="muted">Reports are private. Choose the reason that best describes the problem.</Dialog.Description><div style={{ display: "grid", gap: ".5rem", margin: "1rem 0" }}>{reasons.map((item) => <label key={item} className="surface" style={{ display: "flex", gap: ".7rem", padding: ".8rem", cursor: "pointer" }}><input type="radio" name="reason" value={item} checked={reason === item} onChange={() => setReason(item)} />{item}</label>)}</div><Textarea label="Additional details" value={details} onChange={(event) => setDetails(event.target.value)} maxLength={1000} hint="Optional. Do not include sensitive personal information." /><div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem", marginTop: "1rem" }}><Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button><Button variant="danger" disabled={isLoading} onClick={submit}>{isLoading ? "Sending…" : "Submit report"}</Button></div></Dialog.Content></Dialog.Portal></Dialog.Root>;
};
