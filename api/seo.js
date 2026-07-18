const apiBase = () => (process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export default async function handler(request, response) {
  const files = new Set(["sitemap.xml", "sitemaps/posts.xml", "sitemaps/profiles.xml", "sitemaps/collections.xml"]);
  const file = String(request.query.file || "sitemap.xml");
  if (!files.has(file)) return response.status(404).end();
  try {
    const result = await fetch(`${apiBase()}/v1/seo/${file}`, { headers: { accept: "application/xml" } });
    response.setHeader("content-type", "application/xml; charset=utf-8");
    response.setHeader("cache-control", "public, max-age=3600, s-maxage=21600");
    return response.status(result.status).send(await result.text());
  } catch {
    return response.status(503).send("Sitemap unavailable");
  }
}
