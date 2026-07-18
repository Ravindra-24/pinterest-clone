import type { Metric } from "web-vitals";
import { appConfig } from "../app/config";

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }

let started = false;

export const startObservability = async () => {
  if (started) return;
  started = true;
  if (appConfig.sentryDsn) {
    const Sentry = await import("@sentry/react");
    Sentry.init({ dsn: appConfig.sentryDsn, sendDefaultPii: false, tracesSampleRate: 0.1, environment: import.meta.env.MODE });
  }
  if (appConfig.gaMeasurementId) {
    const { onCLS, onINP, onLCP } = await import("web-vitals");
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(appConfig.gaMeasurementId)}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", appConfig.gaMeasurementId, { anonymize_ip: true });
    const report = ({ name, value, id, rating }: Metric) => window.gtag?.("event", name, { value: Math.round(name === "CLS" ? value * 1000 : value), event_label: id, metric_rating: rating, non_interaction: true });
    onCLS(report); onINP(report); onLCP(report);
  }
};
