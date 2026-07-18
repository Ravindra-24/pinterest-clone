import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import { FeedGrid } from "../components/patterns/FeedGrid";
import { Avatar } from "../components/ui/Avatar";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useGetCollectionQuery } from "../services/api";

export default function CollectionPage() {
  const { slugId = "" } = useParams();
  const { data, isLoading, isError } = useGetCollectionQuery(slugId);
  if (isLoading) return <div className="page container"><div className="surface skeleton" style={{ height: 260 }} /></div>;
  if (isError || !data) return <div className="page container"><Seo title="Collection not found" description="This collection is unavailable." noIndex /><EmptyState icon={<Lock className="empty-icon" />} title="This collection is private or missing." description="Only public collections and collections you own can be opened." /></div>;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: data.name, description: data.description, creator: { "@type": "Person", name: data.owner.displayName } };
  return <div className="page"><Seo title={data.name} description={data.description || `A collection of ${data.itemCount} visual ideas by ${data.owner.displayName}.`} path={`/c/${data.slug}`} image={data.cover?.url} jsonLd={schema} /><div className="container"><header style={{ padding: "2rem 0 2.5rem" }}><span className="eyebrow">{data.visibility} collection · {data.itemCount} ideas</span><h1 className="editorial" style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", lineHeight: .85, margin: ".5rem 0 1.2rem" }}>{data.name}.</h1>{data.description && <p className="hero-copy">{data.description}</p>}<div className="author-row" style={{ marginTop: "1rem" }}><Avatar user={data.owner} size={38} /><span>Curated by <strong>{data.owner.displayName}</strong></span></div></header>{data.posts.length ? <FeedGrid posts={data.posts} /> : <EmptyState title="This collection is ready for its first idea." description="Save an idea here to begin shaping the story." />}</div></div>;
}
