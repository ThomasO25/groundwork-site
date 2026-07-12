/**
 * PORTFOLIO DATA
 * =============================================================================
 * This array is intentionally EMPTY. No invented projects, screenshots, or
 * results are shipped. Add real projects below — one object per project — and
 * set `permissionToDisplay: true` only once the client has agreed to be shown.
 *
 * Only projects with `permissionToDisplay: true` are rendered anywhere on the
 * site (see getVisibleProjects). Until then, the site shows an honest
 * "projects being added" state.
 *
 * Screenshots: drop images in /public (e.g. /public/work/acme-desktop.jpg) and
 * reference them by path. Never publish a client's outcome numbers unless they
 * are verified and you have permission to state them.
 * =============================================================================
 */
export type Project = {
  /** URL-safe id, e.g. "acme-tint". */
  slug: string;
  /** Project/site name shown as the heading. */
  name: string;
  /** The client or business the site was built for. */
  businessName: string;
  industry: string;
  location: string;
  /** One or two sentences on the problem the site needed to solve. */
  problem: string;
  /** What was delivered (scope of work). */
  workCompleted: string;
  /** Key features built (bulleted on the detail view). */
  features: string[];
  /** Desktop screenshot path, e.g. "/work/acme-desktop.jpg". */
  desktopScreenshot?: string;
  /** Mobile screenshot path, e.g. "/work/acme-mobile.jpg". */
  mobileScreenshot?: string;
  /** Optional live site URL. */
  liveUrl?: string;
  /** Optional, ONLY if verified and permitted, e.g. "2x more quote requests". */
  outcome?: string;
  /** Must be true for the project to appear on the site. */
  permissionToDisplay: boolean;
};

export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // EXAMPLE SHAPE (commented out — copy, fill with a REAL project, uncomment):
  //
  // {
  //   slug: "acme-tint",
  //   name: "Acme Window Tinting",
  //   businessName: "Acme Window Tinting",
  //   industry: "Window Tinting",
  //   location: "Tampa, FL",
  //   problem: "An outdated site that didn't work on phones and buried the phone number.",
  //   workCompleted: "New mobile-first site with click-to-call, a quote form, and service-area pages.",
  //   features: ["Click-to-call", "Quote form", "Service-area pages", "Local SEO"],
  //   desktopScreenshot: "/work/acme-desktop.jpg",
  //   mobileScreenshot: "/work/acme-mobile.jpg",
  //   liveUrl: "https://example.com",
  //   outcome: undefined, // only add a verified, permitted result
  //   permissionToDisplay: true,
  // },
];

/** Projects cleared for public display. Everything else is never rendered. */
export function getVisibleProjects(): Project[] {
  return projects.filter((p) => p.permissionToDisplay);
}
