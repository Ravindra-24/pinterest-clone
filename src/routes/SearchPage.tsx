import { Search } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../app/config";
import { FeedGrid } from "../components/patterns/FeedGrid";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";
import { useSearchPostsQuery } from "../services/api";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const [input, setInput] = useState(query);
  const { data, isFetching, isError } = useSearchPostsQuery({ q: query, category }, { skip: query.trim().length < 2 });
  useEffect(() => setInput(query), [query]);
  const submit = (event: FormEvent) => { event.preventDefault(); if (input.trim()) setParams({ q: input.trim(), ...(category ? { category } : {}) }); };
  return (
    <div className="page">
      <Seo title={query ? `Search: ${query}` : "Search"} description="Search visual ideas and creators." noIndex />
      <div className="container">
        <span className="eyebrow">Find your next direction</span>
        <h1 className="editorial" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: .9, margin: ".5rem 0 1.5rem" }}>{query ? <>Results for “{query}”</> : "Search with intention."}</h1>
        <form onSubmit={submit} style={{ display: "flex", gap: ".5rem", maxWidth: 760, marginBottom: "1rem" }}><label className="sr-only" htmlFor="search-page">Search</label><div style={{ position: "relative", flex: 1 }}><Search size={20} style={{ position: "absolute", left: 15, top: 14, color: "var(--ink-subtle)" }} /><input id="search-page" className="input" style={{ paddingLeft: 46, borderRadius: 999 }} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Try ‘quiet interiors’ or ‘Mumbai architecture’" autoFocus /></div><button className="button button-primary" type="submit">Search</button></form>
        <div className="filter-row">{categories.map((item) => <button key={item} className={`chip ${(category || "All") === item ? "active" : ""}`} onClick={() => setParams({ ...(query ? { q: query } : {}), ...(item !== "All" ? { category: item } : {}) })}>{item}</button>)}</div>
        {isFetching ? <div className="feed-status">Searching the collection…</div> : isError ? <EmptyState title="Search is unavailable." description="Please check your connection and try again." /> : data?.items.length ? <FeedGrid posts={data.items} /> : query ? <EmptyState title="No exact matches yet." description="Try fewer words, a broader category, or a different description." /> : <EmptyState title="Start with a visual detail." description="Search by style, material, place, creator, or mood." />}
      </div>
    </div>
  );
}
