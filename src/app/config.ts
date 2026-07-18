const legacyApi = import.meta.env.REACT_APP_API_BASE_URL;
const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");

export const appConfig = {
  brandName: import.meta.env.VITE_APP_NAME || "Curiofold",
  siteUrl,
  socialImage: import.meta.env.VITE_SOCIAL_IMAGE || `${siteUrl}/social-card.png`,
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || legacyApi || "/api").replace(/\/$/, ""),
  googleClientId:
    import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID ||
    import.meta.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID ||
    "",
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || "",
} as const;

export const categories = [
  "All",
  "Architecture",
  "Art",
  "Fashion",
  "Food",
  "Interiors",
  "Nature",
  "Photography",
  "Travel",
] as const;
