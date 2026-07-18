import { useState } from "react";
import { Button } from "../ui/Button";
import { startObservability } from "../../services/observability";

const key = "canvas-analytics-consent";

export const ConsentBanner = () => {
  const stored = localStorage.getItem(key);
  const [visible, setVisible] = useState(!stored);
  if (stored === "accepted") startObservability();
  if (!visible) return null;
  const decide = (accepted: boolean) => { localStorage.setItem(key, accepted ? "accepted" : "declined"); if (accepted) startObservability(); setVisible(false); };
  return <aside className="surface" aria-label="Analytics preferences" style={{ position: "fixed", zIndex: 160, right: 16, bottom: 86, width: "min(calc(100% - 2rem), 430px)", padding: "1rem", boxShadow: "var(--shadow-lg)" }}><strong>Optional analytics</strong><p className="muted" style={{ lineHeight: 1.5, margin: ".45rem 0 .8rem" }}>Help improve performance and discovery by sharing anonymous usage and Web Vitals. Essential account features work either way.</p><div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}><Button variant="ghost" size="small" onClick={() => decide(false)}>Decline</Button><Button size="small" onClick={() => decide(true)}>Allow analytics</Button></div></aside>;
};
