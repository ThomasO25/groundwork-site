/**
 * =============================================================================
 * SINGLE SOURCE OF TRUTH FOR BUSINESS IDENTITY
 * =============================================================================
 * Rebrand the entire site by editing THIS file. Every page, the header, footer,
 * SEO metadata, and structured data read from here.
 *
 * HOW MISSING INFO IS HANDLED
 * ---------------------------------------------------------------------------
 * Any field left as an empty string ("") or empty array is treated as "not
 * provided yet." The UI HIDES the related element instead of showing a fake
 * value. The site is therefore safe to deploy to a preview URL before the
 * owner supplies real details — nothing invented is ever displayed.
 *
 * See docs/OWNER_CONTENT_REQUIRED.md for the full list of what to fill in.
 * =============================================================================
 */

export interface SiteConfig {
  /** Public brand name shown in the logo, titles, and copy. */
  name: string;
  /**
   * Registered legal entity name (e.g. "Acme Web Studio LLC"). LEAVE EMPTY
   * unless a legal entity actually exists — the footer shows `name` alone and
   * will NOT invent an "LLC" or other suffix.
   */
  legalName: string;
  tagline: string;
  description: string;

  contact: {
    /** Human-readable phone, e.g. "(813) 555-0100". Empty = hide all phone UI. */
    phoneDisplay: string;
    /** E.164 phone for tel: links, e.g. "+18135550100". */
    phoneHref: string;
    /** Public email, e.g. "hello@yourdomain.com". Empty = hide all email UI. */
    email: string;
  };

  /** Physical address (optional). Leave city empty to omit from schema + footer. */
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };

  /** Region phrase used in copy, e.g. "the Tampa Bay area". Empty = neutral wording. */
  primaryRegion: string;
  /** Cities/areas served, e.g. ["Tampa", "St. Petersburg"]. Empty = hide area UI. */
  serviceAreas: string[];

  social: {
    googleBusiness: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };

  /**
   * The person clients actually work with. Leave `name` empty until the real
   * founder details exist — the founder card is hidden rather than faked.
   */
  founder: {
    name: string;
    /** Image path in /public, e.g. "/founder.jpg". Empty = photo hidden. */
    photo: string;
    /** 2–4 sentences, first person or third — the real story, no invented history. */
    bio: string;
    /** e.g. "Tampa, FL". Empty = hidden. */
    location: string;
    /** Optional direct line, shown only in the founder card. E.164 for the link. */
    phoneDisplay: string;
    phoneHref: string;
    email: string;
  };

  media: {
    /** Optional hero image in /public. Empty = clean typographic hero (no empty frame). */
    heroImage: string;
  };

  /** Optional scheduling URL (Calendly/Cal.com/etc.). */
  bookingUrl: string;
  /** Business hours in schema.org format for structured data. */
  hours: string;
}

export const site: SiteConfig = {
  // --- Identity -------------------------------------------------------------
  // "Groundwork" is a working studio name so the site can render. Confirm or
  // replace it with the real business name (see OWNER_CONTENT_REQUIRED.md).
  name: "Groundwork",
  legalName: "", // Only set if a legal entity exists. Empty = no "LLC" shown.
  tagline: "Websites that turn local searches into booked jobs.",
  description:
    "We design fast, trustworthy websites and lead systems for local service businesses — built to get you more calls, quotes, and booked work.",

  // --- Contact (fill in real values; empty fields are hidden, not faked) -----
  contact: {
    phoneDisplay: "", // e.g. "(813) 555-0100"
    phoneHref: "", // e.g. "+18135550100" (E.164: + country code, digits only)
    email: "", // e.g. "hello@yourdomain.com"
  },

  // --- Address (optional for a web studio) ----------------------------------
  address: {
    street: "",
    city: "", // e.g. "Tampa" — leave empty to omit address from schema + footer
    region: "", // e.g. "FL"
    postalCode: "",
    country: "US",
  },

  // --- Market ---------------------------------------------------------------
  primaryRegion: "", // e.g. "the Tampa Bay area"
  serviceAreas: [], // e.g. ["Tampa", "St. Petersburg", "Clearwater"]

  // --- Links (add after each profile is verified; empty ones are hidden) -----
  social: {
    googleBusiness: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  // --- The person clients work with -----------------------------------------
  // Leave `name` empty until real details exist. With no name, the founder card
  // is replaced by an honest "you work directly with your builder" note that
  // claims no identity, photo, or history.
  founder: {
    name: "", // e.g. "Alex Rivera"
    photo: "", // e.g. "/founder.jpg" (drop the file in /public)
    bio: "", // 2–4 real sentences. Never invent a backstory.
    location: "", // e.g. "Tampa, FL"
    phoneDisplay: "",
    phoneHref: "",
    email: "",
  },

  // --- Imagery --------------------------------------------------------------
  media: {
    heroImage: "", // e.g. "/hero.jpg". Empty = clean typographic hero, no empty frame.
  },

  // --- Optional -------------------------------------------------------------
  // Scheduling link for the "book a short call" option after a form submission.
  // Set NEXT_PUBLIC_BOOKING_URL in the environment, or hard-code it here.
  // Empty = the booking option is hidden entirely.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  hours: "Mo-Fr 09:00-17:00",
};

/**
 * Derived readiness flags. Components read these to decide whether to render a
 * contact link, testimonials, service areas, etc. — so the UI never shows a
 * placeholder in production.
 */
export const siteStatus = {
  hasPhone: Boolean(site.contact.phoneHref && site.contact.phoneDisplay),
  hasEmail: Boolean(site.contact.email),
  hasAddress: Boolean(site.address.city),
  hasServiceAreas: site.serviceAreas.length > 0,
  hasLegalName: Boolean(site.legalName),
  hasRegion: Boolean(site.primaryRegion),
  /** A named founder exists → render the real founder card. */
  hasFounder: Boolean(site.founder.name),
  hasFounderPhoto: Boolean(site.founder.photo),
  hasFounderPhone: Boolean(site.founder.phoneHref && site.founder.phoneDisplay),
  hasFounderEmail: Boolean(site.founder.email),
  hasHeroImage: Boolean(site.media.heroImage),
  /** Scheduling link configured → offer "book a short call" after submitting. */
  hasBooking: Boolean(site.bookingUrl),
  get hasAnyContact(): boolean {
    return this.hasPhone || this.hasEmail;
  },
};

/** Name to show in legal/footer contexts. Never invents an entity suffix. */
export const legalDisplayName = site.legalName || site.name;

/** Region phrase for body copy, with a neutral fallback when unset. */
export const regionPhrase = site.primaryRegion || "your area";
