/**
 * ANALYTICS
 * =============================================================================
 * Two optional providers, both OFF by default:
 *   - Google Analytics 4  → NEXT_PUBLIC_GA_ID       (e.g. "G-XXXXXXXXXX")
 *   - Microsoft Clarity   → NEXT_PUBLIC_CLARITY_ID  (e.g. "abcd1234")
 *
 * No tracking script is loaded unless its environment variable is set, so the
 * site ships with zero third-party requests until the owner opts in.
 *
 * Events are fired through `track()`. Most clicks are captured automatically by
 * <Analytics /> via `data-analytics` attributes — see components/site/analytics.tsx.
 * =============================================================================
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";
export const analyticsEnabled = Boolean(GA_ID || CLARITY_ID);

/** The full set of conversion events this site reports. */
export const EVENTS = {
  ctaClick: "cta_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  formStart: "contact_form_start",
  formSubmit: "contact_form_submit",
  portfolioClick: "portfolio_click",
  bookingClick: "booking_click",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];
type Params = Record<string, string | number | boolean | undefined>;

/**
 * Fire a conversion event to every configured provider.
 * Safe to call anywhere: no-ops on the server and when nothing is configured,
 * and never throws (analytics must never break a form submission).
 */
export function track(event: AnalyticsEvent | string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      clarity?: (...a: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    // Clarity records the event name and tags the session for filtering.
    if (typeof w.clarity === "function") {
      w.clarity("event", event);
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== "") w.clarity?.("set", k, String(v));
      });
    }
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
  } catch {
    /* never let analytics break the page */
  }
}

/** Back-compat alias — older call sites used this name. */
export const trackConversion = track;
