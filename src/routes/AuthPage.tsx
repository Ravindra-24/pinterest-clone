import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthDialog } from "../features/auth/AuthDialog";
import { Seo } from "../components/ui/Seo";

export default function AuthPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  return <div className="page container"><Seo title={mode === "signup" ? "Create account" : "Sign in"} description="Access your account." noIndex /><AuthDialog open={open} initialMode={mode === "signup" ? "signup" : "login"} onOpenChange={(value) => { setOpen(value); if (!value) navigate(-1); }} /></div>;
}
