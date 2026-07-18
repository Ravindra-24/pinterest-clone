import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { categories } from "../app/config";
import { Button } from "../components/ui/Button";
import { Field, Textarea } from "../components/ui/Field";
import { Seo } from "../components/ui/Seo";
import { useCreatePostMutation } from "../services/api";

const draftKey = "curiofold-post-draft";
const schema = z.object({
  title: z.string().trim().min(3, "Use at least 3 characters").max(100, "Keep the title under 100 characters"),
  description: z.string().trim().min(10, "Add a useful description").max(2000),
  altText: z.string().trim().min(8, "Describe what is visible in the image").max(240),
  category: z.string().min(1, "Choose a category"),
  tags: z.string().max(200),
});
type Values = z.infer<typeof schema>;

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const preview = useMemo(() => file ? URL.createObjectURL(file) : "", [file]);
  const saved = (() => { try { return JSON.parse(localStorage.getItem(draftKey) || "null"); } catch { return null; } })();
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: saved || { title: "", description: "", altText: "", category: "", tags: "" }, mode: "onBlur" });

  useEffect(() => {
    const subscription = form.watch((values) => localStorage.setItem(draftKey, JSON.stringify(values)));
    return () => subscription.unsubscribe();
  }, [form]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const chooseFile = (selected?: File) => {
    setFileError("");
    if (!selected) return;
    if (!selected.type.startsWith("image/")) return setFileError("Choose a JPG, PNG, WebP, AVIF, or GIF image");
    if (selected.size > 10 * 1024 * 1024) return setFileError("Keep images under 10 MB");
    setFile(selected);
  };

  const submit = form.handleSubmit(async (values) => {
    if (!file) return setFileError("Choose an image to publish");
    const body = new FormData();
    body.append("image", file);
    body.append("title", values.title);
    body.append("description", values.description);
    body.append("altText", values.altText);
    body.append("category", values.category);
    body.append("tags", JSON.stringify(values.tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 10)));
    try {
      const post = await createPost(body).unwrap();
      localStorage.removeItem(draftKey);
      toast.success("Your idea is live");
      navigate(`/p/${post.slug}`);
    } catch (error: any) { toast.error(error?.data?.error?.message || "Could not publish your idea"); }
  });

  return (
    <div className="page">
      <Seo title="Create" description="Share a new visual idea." noIndex />
      <div className="container">
        <form className="surface form-layout" onSubmit={submit} noValidate>
          <div className="upload-drop">
            {preview ? <div style={{ width: "100%", position: "relative" }}><img className="upload-preview" src={preview} alt="Upload preview" /><Button variant="secondary" size="icon" aria-label="Remove image" onClick={() => setFile(null)} style={{ position: "absolute", top: 10, right: 10 }}><X size={19} /></Button></div> : (
              <label className="upload-drop-inner" htmlFor="post-image">
                <div><UploadCloud size={44} style={{ color: "var(--accent)", margin: "0 auto .8rem" }} /><strong>Drop an image here or browse</strong><p className="muted">JPG, PNG, WebP, AVIF or GIF · up to 10 MB</p></div>
                <input id="post-image" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(event) => chooseFile(event.target.files?.[0])} />
              </label>
            )}
            {fileError && <p className="field-error" role="alert">{fileError}</p>}
          </div>
          <div className="form-panel">
            <span className="eyebrow">Share something useful</span>
            <h1 className="editorial" style={{ fontSize: "clamp(2.5rem, 5vw, 4.6rem)", lineHeight: .95, margin: "0 0 .5rem" }}>Create an idea.</h1>
            <Field label="Title" placeholder="A clear, specific title" maxLength={100} {...form.register("title")} error={form.formState.errors.title?.message} />
            <Textarea label="Description" placeholder="What makes this worth keeping? Add context, materials, place, or technique." maxLength={2000} {...form.register("description")} error={form.formState.errors.description?.message} />
            <Textarea label="Image description" hint="Alt text helps people using screen readers and improves image search." maxLength={240} {...form.register("altText")} error={form.formState.errors.altText?.message} />
            <label className="field"><span className="field-label">Category</span><select className="input" {...form.register("category")}><option value="">Choose one</option>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select>{form.formState.errors.category && <span className="field-error">{form.formState.errors.category.message}</span>}</label>
            <Field label="Tags" hint="Comma-separated, up to 10." placeholder="minimal, oak, natural light" {...form.register("tags")} error={form.formState.errors.tags?.message} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".6rem", marginTop: ".5rem" }}><Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button><Button type="submit" disabled={isLoading}><ImagePlus size={18} />{isLoading ? "Publishing…" : "Publish idea"}</Button></div>
          </div>
        </form>
      </div>
    </div>
  );
}
