import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";

export default function NotFoundPage() {
  return <div className="page container"><Seo title="Page not found" description="This page does not exist." noIndex /><EmptyState icon={<Compass className="empty-icon" />} title="We wandered off the canvas." description="The address may be outdated, or the page may have moved." action={<Link className="button button-primary" to="/">Return home</Link>} /></div>;
}
