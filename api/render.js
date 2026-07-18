import { readFile } from "node:fs/promises";
import path from "node:path";

const escapeHtml = (value = "") => String(value).replace(/[&<>'\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
const safeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const apiBase = () => (process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const siteBase = (request) => (process.env.SITE_URL || process.env.VITE_SITE_URL || `https://${request.headers.host}`).replace(/\/$/, "");

const loadIndex = async () => {
  for (const candidate of [path.join(process.cwd(), "dist/index.html"), path.join(process.cwd(), "index.html")]) {
    try { return await readFile(candidate, "utf8"); } catch { /* try the next build location */ }
  }
  throw new Error("Built index.html was not found");
};

const entityConfig = (type, data, site, requestedPath) => {
  if (type === "post") return {
    title: `${data.title} — ${process.env.VITE_APP_NAME || "Canvas"}`,
    description: data.description || `A visual idea by ${data.user?.displayName || "the community"}.`,
    image: data.media?.url || data.image,
    canonical: `${site}/p/${data.slug}`,
    schema: { "@context": "https://schema.org", "@type": "ImageObject", name: data.title, description: data.description, contentUrl: data.media?.url || data.image, author: { "@type": "Person", name: data.user?.displayName, url: `${site}/u/${data.user?.username}` }, datePublished: data.createdAt },
    body: `<article><img src="${escapeHtml(data.media?.url || data.image)}" alt="${escapeHtml(data.altText || data.title)}"><h1>${escapeHtml(data.title)}</h1><p>${escapeHtml(data.description)}</p><a href="${escapeHtml(`${site}/u/${data.user?.username}`)}">${escapeHtml(data.user?.displayName)}</a></article>`,
  };
  if (type === "user") return {
    title: `${data.displayName} — ${process.env.VITE_APP_NAME || "Canvas"}`,
    description: data.bio || `Explore visual ideas shared by ${data.displayName}.`,
    image: data.profilePicture,
    canonical: `${site}/u/${data.username}`,
    schema: { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: data.displayName, identifier: data.username, description: data.bio, image: data.profilePicture } },
    body: `<article><h1>${escapeHtml(data.displayName)}</h1><p>${escapeHtml(data.bio || "")}</p><p>${Number(data.postCount || data.posts?.length || 0)} ideas</p>${(data.posts || []).slice(0, 24).map((post) => `<a href="${escapeHtml(`${site}/p/${post.slug}`)}">${escapeHtml(post.title)}</a>`).join("")}</article>`,
  };
  return {
    title: `${data.name} — ${process.env.VITE_APP_NAME || "Canvas"}`,
    description: data.description || `A collection of ${data.itemCount || 0} visual ideas.`,
    image: data.cover?.url,
    canonical: `${site}/c/${data.slug}`,
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", name: data.name, description: data.description, creator: { "@type": "Person", name: data.owner?.displayName } },
    body: `<article><h1>${escapeHtml(data.name)}</h1><p>${escapeHtml(data.description || "")}</p>${(data.posts || []).slice(0, 24).map((post) => `<a href="${escapeHtml(`${site}/p/${post.slug}`)}">${escapeHtml(post.title)}</a>`).join("")}</article>`,
  };
};

export default async function handler(request, response) {
  const type = ["post", "user", "collection"].includes(request.query.type) ? request.query.type : "post";
  const identifier = String(request.query.identifier || "");
  const endpoint = type === "post" ? `/v1/posts/${encodeURIComponent(identifier)}` : type === "user" ? `/v1/users/${encodeURIComponent(identifier)}` : `/v1/collections/${encodeURIComponent(identifier)}`;
  try {
    if (!apiBase()) throw new Error("API_BASE_URL is not configured");
    const apiResponse = await fetch(`${apiBase()}${endpoint}`, { headers: { accept: "application/json" } });
    if (!apiResponse.ok) return response.status(apiResponse.status === 404 ? 404 : 502).send("Page unavailable");
    const payload = await apiResponse.json();
    const data = payload.data;
    if (request.query.legacy === "true") {
      const target = type === "post" ? `/p/${data.slug}` : `/u/${data.username}`;
      response.setHeader("location", target);
      return response.status(308).end();
    }
    const site = siteBase(request);
    const meta = entityConfig(type, data, site, request.query.path);
    let html = await loadIndex();
    const head = `<title>${escapeHtml(meta.title)}</title><meta name="description" content="${escapeHtml(meta.description)}"><link rel="canonical" href="${escapeHtml(meta.canonical)}"><meta property="og:title" content="${escapeHtml(meta.title)}"><meta property="og:description" content="${escapeHtml(meta.description)}"><meta property="og:type" content="${type === "post" ? "article" : "profile"}"><meta property="og:url" content="${escapeHtml(meta.canonical)}">${meta.image ? `<meta property="og:image" content="${escapeHtml(meta.image)}"><meta name="twitter:card" content="summary_large_image">` : ""}<script type="application/ld+json">${safeJson(meta.schema)}</script>`;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, "").replace("</head>", `${head}</head>`).replace('<div id="root"></div>', `<div id="root"><main class="seo-shell">${meta.body}</main></div>`);
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.setHeader("cache-control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
    return response.status(200).send(html);
  } catch (error) {
    console.error(error);
    return response.status(500).send("Page unavailable");
  }
}
