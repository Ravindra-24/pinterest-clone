import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { appConfig } from "../../app/config";
import { useLoginMutation, useSignupMutation } from "../../services/api";
import { sessionReceived } from "./authSlice";
import { useAppDispatch } from "../../hooks/store";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  firstName: z.string().trim().min(2, "Enter your first name").max(50),
  lastName: z.string().trim().min(1, "Enter your last name").max(50),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "login" | "signup";
}

export const AuthDialog = ({ open, onOpenChange, initialMode = "login" }: AuthDialogProps) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [login, loginState] = useLoginMutation();
  const [signup, signupState] = useSignupMutation();
  const dispatch = useAppDispatch();
  const schema = mode === "login" ? loginSchema : signupSchema;
  const form = useForm<LoginValues | SignupValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [initialMode, open]);

  useEffect(() => form.reset(), [form, mode]);

  const submit = form.handleSubmit(async (values) => {
    try {
      const session = mode === "login"
        ? await login(values as LoginValues).unwrap()
        : await signup(values as SignupValues).unwrap();
      dispatch(sessionReceived(session));
      toast.success(mode === "login" ? "Welcome back" : "Your account is ready");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.error?.message || error?.data?.message || "We could not complete that request");
    }
  });

  const pending = loginState.isLoading || signupState.isLoading;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby="auth-description">
          <Dialog.Close asChild>
            <Button variant="ghost" size="icon" aria-label="Close" style={{ position: "absolute", right: 12, top: 12 }}><X size={20} /></Button>
          </Dialog.Close>
          <span className="eyebrow">{appConfig.brandName}</span>
          <Dialog.Title className="editorial" style={{ fontSize: "2.6rem", lineHeight: 1, margin: ".55rem 3rem .5rem 0" }}>
            {mode === "login" ? "Welcome back." : "Join the community."}
          </Dialog.Title>
          <Dialog.Description id="auth-description" className="muted" style={{ marginBottom: "1.25rem", lineHeight: 1.55 }}>
            {mode === "login" ? "Continue collecting ideas that move you." : "Create collections, share inspiration, and follow thoughtful creators."}
          </Dialog.Description>
          <form onSubmit={submit} style={{ display: "grid", gap: ".9rem" }} noValidate>
            {mode === "signup" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                <Field label="First name" autoComplete="given-name" {...form.register("firstName" as any)} error={(form.formState.errors as any).firstName?.message} />
                <Field label="Last name" autoComplete="family-name" {...form.register("lastName" as any)} error={(form.formState.errors as any).lastName?.message} />
              </div>
            )}
            <Field label="Email" type="email" autoComplete="email" {...form.register("email")} error={form.formState.errors.email?.message} />
            <div style={{ position: "relative" }}>
              <Field label="Password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} {...form.register("password")} error={form.formState.errors.password?.message} />
              <Button variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} style={{ position: "absolute", right: 2, top: 25 }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <Button type="submit" disabled={pending}>{pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Button>
          </form>
          <hr className="divider" style={{ margin: "1.25rem 0" }} />
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            {mode === "login" ? "New here?" : "Already a member?"}{" "}
            <button className="button button-ghost button-sm" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
