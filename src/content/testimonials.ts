/**
 * TESTIMONIALS DATA
 * =============================================================================
 * Intentionally EMPTY. No invented or unattributed reviews are shipped. Add
 * REAL client quotes below and set `permissionToDisplay: true` once you have
 * the client's permission to publish their words and name.
 *
 * Only testimonials with `permissionToDisplay: true` render. When none exist,
 * the testimonials section is hidden entirely (see getVisibleTestimonials).
 * =============================================================================
 */
export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  location: string;
  /** Must be true to render. Confirms the client permitted publication. */
  permissionToDisplay: boolean;
};

export const testimonials: Testimonial[] = [
  // {
  //   quote: "Real, permitted client quote here.",
  //   name: "Real Client Name",
  //   business: "Their Business",
  //   location: "City, ST",
  //   permissionToDisplay: true,
  // },
];

/** Testimonials cleared for public display. */
export function getVisibleTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.permissionToDisplay);
}
