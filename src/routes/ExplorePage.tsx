import { useParams } from "react-router-dom";
import { FeedGrid } from "../components/patterns/FeedGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useGetFeedQuery } from "../services/api";

export default function ExplorePage() {
  const { category = "all" } = useParams();
  const title = category === "all" ? "Explore" : category.charAt(0).toUpperCase() + category.slice(1);
  const { data, isFetching } = useGetFeedQuery({ category: category === "all" ? "All" : title, sort: "popular", limit: 48 });
  return <div className="page"><Seo title={title} description={`Explore popular ${title.toLowerCase()} ideas and visual inspiration.`} path={`/explore/${category}`} /><div className="container"><span className="eyebrow">Curated discovery</span><h1 className="editorial" style={{ fontSize: "clamp(3.8rem, 11vw, 9rem)", lineHeight: .85, margin: ".5rem 0 2rem" }}>{title}.</h1>{isFetching ? <div className="feed-status">Curating ideas…</div> : data?.items.length ? <FeedGrid posts={data.items} /> : <EmptyState title="Nothing here yet." description="This category is waiting for its first thoughtful idea." />}</div></div>;
}
