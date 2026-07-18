import { Helmet } from "react-helmet-async";
import { appConfig } from "../../app/config";

interface SeoProps {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const Seo = ({ title, description, path = "/", image, type = "website", noIndex, jsonLd }: SeoProps) => {
  const fullTitle = title ? `${title} — ${appConfig.brandName}` : `${appConfig.brandName} — Ideas worth keeping`;
  const canonical = `${appConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
