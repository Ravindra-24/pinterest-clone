import * as Dialog from "@radix-ui/react-dialog";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { categories } from "../../app/config";
import { Button } from "../../components/ui/Button";
import { sessionReceived } from "../auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useUpdateProfileMutation } from "../../services/api";

const dismissKey = "canvas-onboarding-dismissed";

export const InterestDialog = () => {
  const session = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>(session.user?.interests || []);
  const [dismissed, setDismissed] = useState(sessionStorage.getItem(dismissKey) === "true");
  const [update, { isLoading }] = useUpdateProfileMutation();
  const open = Boolean(session.user && !session.user.interests?.length && !dismissed);
  const toggle = (interest: string) => setSelected((items) => items.includes(interest) ? items.filter((item) => item !== interest) : [...items, interest].slice(0, 6));
  const close = () => { sessionStorage.setItem(dismissKey, "true"); setDismissed(true); };
  const save = async () => {
    if (selected.length < 3) return toast.error("Choose at least three interests");
    const body = new FormData(); body.append("interests", JSON.stringify(selected));
    try { const user = await update(body).unwrap(); if (session.accessToken) dispatch(sessionReceived({ accessToken: session.accessToken, user })); toast.success("Your discovery feed is ready"); close(); } catch { toast.error("Could not save your interests"); }
  };
  return <Dialog.Root open={open} onOpenChange={(value) => !value && close()}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content"><Sparkles size={28} style={{ color: "var(--accent)" }} /><Dialog.Title className="editorial" style={{ fontSize: "2.7rem", lineHeight: 1, margin: ".6rem 0" }}>Shape your discovery feed.</Dialog.Title><Dialog.Description className="muted" style={{ lineHeight: 1.55 }}>Choose at least three themes. You can change these later from your profile.</Dialog.Description><div className="filter-row" style={{ flexWrap: "wrap", overflow: "visible", marginTop: "1rem" }}>{categories.filter((item) => item !== "All").map((item) => <button key={item} className={`chip ${selected.includes(item) ? "active" : ""}`} aria-pressed={selected.includes(item)} onClick={() => toggle(item)}>{item}</button>)}</div><div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}><Button variant="ghost" onClick={close}>Not now</Button><Button onClick={save} disabled={isLoading}>{isLoading ? "Saving…" : "Personalize feed"}</Button></div></Dialog.Content></Dialog.Portal></Dialog.Root>;
};
