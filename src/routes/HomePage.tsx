import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { appConfig, categories } from "../app/config";
import { FeedGrid } from "../components/patterns/FeedGrid";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useGetFeedQuery } from "../services/api";
import type { PostSummary } from "../types/api";

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("for-you");
  const [cursor, setCursor] = useState<string | undefined>();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const { data, isFetching, isError, refetch } = useGetFeedQuery({ cursor, category, sort, limit: 24 });

  useEffect(() => {
    if (!data) return;
    setPosts((current) => {
      const next = cursor ? [...current, ...data.items] : data.items;
      return Array.from(new Map(next.map((post) => [post.id, post])).values());
    });
  }, [data, cursor]);

  const changeFilter = (nextCategory: string, nextSort = sort) => {
    setPosts([]);
    setCursor(undefined);
    setCategory(nextCategory);
    setSort(nextSort);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <Seo
        description="Discover visual ideas across architecture, art, interiors, travel, food, fashion, and photography."
        jsonLd={{ "@context": "https://schema.org", "@type": "WebSite", name: appConfig.brandName, url: appConfig.siteUrl, potentialAction: { "@type": "SearchAction", target: `${appConfig.siteUrl}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } }}
      />
      <div className="container">
        <section className="hero" aria-labelledby="discover-title">
          <div>
            <span className="eyebrow">Visual discovery, considered</span>
            <h1 id="discover-title" className="editorial">Ideas worth keeping.</h1>
            <p className="hero-copy">A thoughtful place to find, collect, and share images that make your next project feel possible.</p>
          </div>
          <p className="hero-note">Browse without interruption. Save what resonates, follow curious people, and return when inspiration becomes action.</p>
        </section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div className="filter-row" aria-label="Filter by category">
            {categories.map((item) => <button key={item} className={`chip ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => changeFilter(item)}>{item}</button>)}
          </div>
          <div className="filter-row" aria-label="Sort ideas">
            <button className={`chip ${sort === "for-you" ? "active" : ""}`} aria-pressed={sort === "for-you"} onClick={() => changeFilter(category, "for-you")}>For you</button>
            <button className={`chip ${sort === "trending" ? "active" : ""}`} aria-pressed={sort === "trending"} onClick={() => changeFilter(category, "trending")}>Trending</button>
            <button className={`chip ${sort === "following" ? "active" : ""}`} aria-pressed={sort === "following"} onClick={() => changeFilter(category, "following")}>Following</button>
            <button className={`chip ${sort === "recent" ? "active" : ""}`} aria-pressed={sort === "recent"} onClick={() => changeFilter(category, "recent")}>Recent</button>
          </div>
        </div>
        {isError && posts.length === 0 ? (
          <EmptyState title="The feed is taking a pause." description="We could not load ideas just now. Your connection may be offline." action={<Button onClick={() => refetch()}>Try again</Button>} />
        ) : posts.length ? (
          <>
            <FeedGrid posts={posts} />
            <div className="feed-status">
              {isFetching ? "Gathering more ideas…" : data?.hasMore ? <Button variant="secondary" onClick={() => setCursor(data.nextCursor || undefined)}><ArrowDown size={17} />Load more</Button> : "You have reached the end—for now."}
            </div>
          </>
        ) : isFetching ? (
          <div aria-busy="true" aria-label="Loading ideas" style={{ columns: "240px", columnGap: 14 }}>
            {[310, 460, 360, 510, 390, 280, 440, 330].map((height, index) => <div key={index} className="skeleton" style={{ height, borderRadius: 18, marginBottom: 14, breakInside: "avoid" }} />)}
          </div>
        ) : (
          <EmptyState title="No ideas here yet." description="Try another category or check back after the first idea is published." />
        )}
      </div>
    </div>
  );
}
