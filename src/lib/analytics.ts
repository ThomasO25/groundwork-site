/**
 * Conversion-event hook. Fires to whatever analytics provider is present.
 * No provider is bundled — this is a safe no-op until the client approves one
 * and its script is added in layout.tsx. Never blocks the UI.
 */
type Params = Record<string, string | number | boolean | undefined>;

export function trackConversion(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      plausible?: (name: string, opts?: { props?: Params }) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    if (typeof w.plausible === "function") w.plausible(event, { props: params });
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
  } catch {
    /* analytics must never break the form */
  }
}
