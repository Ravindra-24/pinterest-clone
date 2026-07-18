import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface SharedProps {
  label: string;
  error?: string;
  hint?: string;
}

type InputProps = SharedProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Field = forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, id, ...props }, ref) => {
  const fieldId = id || props.name;
  const descriptionId = `${fieldId}-description`;
  return (
    <label className="field" htmlFor={fieldId}>
      <span className="field-label">{label}</span>
      <input ref={ref} id={fieldId} className="input" aria-invalid={Boolean(error)} aria-describedby={error || hint ? descriptionId : undefined} {...props} />
      {(error || hint) && <span id={descriptionId} className={error ? "field-error" : "field-hint"}>{error || hint}</span>}
    </label>
  );
});
Field.displayName = "Field";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, hint, id, ...props }, ref) => {
  const fieldId = id || props.name;
  const descriptionId = `${fieldId}-description`;
  return (
    <label className="field" htmlFor={fieldId}>
      <span className="field-label">{label}</span>
      <textarea ref={ref} id={fieldId} className="input" aria-invalid={Boolean(error)} aria-describedby={error || hint ? descriptionId : undefined} {...props} />
      {(error || hint) && <span id={descriptionId} className={error ? "field-error" : "field-hint"}>{error || hint}</span>}
    </label>
  );
});
Textarea.displayName = "Textarea";
