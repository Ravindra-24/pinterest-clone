/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_GOOGLE_AUTH_CLIENT_ID?: string;
  readonly REACT_APP_API_BASE_URL?: string;
  readonly REACT_APP_GOOGLE_AUTH_CLIENT_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
