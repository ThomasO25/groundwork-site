/**
 * PUBLIC PRICING — starting prices only.
 *
 * These are the numbers customers see. Actual quoting is done in the owner's
 * separate internal Pricing & Quote Workbook; nothing about the internal service
 * catalog, margins, labour assumptions, multipliers, contingency, or referral
 * rules belongs anywhere in this repository.
 *
 * Rules baked in here:
 *   - "Starting at" everywhere a price appears. No fixed prices for scoped work.
 *   - No artificial maximum on custom work.
 *   - No financing, and no universal payment schedule advertised.
 *   - Website care is always described as optional.
 *   - No guaranteed leads, rankings, revenue, or growth.
 */
export type PricingTier = {
  slug: string;
  name: string;
  price: string;
  /** How the final number is actually decided. */
  priceBasis?: string;
  blurb: string;
  /** Descriptive, not a popularity claim. */
  label?: string;
  featured?: boolean;
  features: string[];
  /** Only used by the Starter Site — honest about where the line is drawn. */
  limits?: string[];
  cta: { label: string; href: string };
};

export const pricingTiers: PricingTier[] = [
  {
    slug: "starter-site",
    name: "Starter Site",
    price: "Starting at $750",
    priceBasis:
      "A deliberately focused package. You supply the written content and usable photos; we build it on our existing design system.",
    blurb:
      "An affordable, professional online presence for a small local business that needs one — done properly, just kept simple.",
    features: [
      "Up to 3 pages",
      "Mobile responsive on every screen",
      "Basic contact form",
      "Basic on-page SEO and foundational metadata",
      "Sitemap and robots configuration",
      "One revision round",
      "Launch assistance",
      "14 days of post-launch bug support",
    ],
    limits: [
      "You supply the final written content and usable photos",
      "Built from our existing design system and components",
      "No admin dashboard, integrations, ecommerce, logins, or customer portals",
      "No extensive content migration or advanced copywriting",
    ],
    cta: { label: "Ask about the Starter Site", href: "/contact?plan=starter-site" },
  },
  {
    slug: "business-website",
    name: "Business Website",
    price: "Starting at $1,500",
    priceBasis: "Final scope depends on your business — agreed in writing before anything begins.",
    blurb:
      "Our normal website product for an established local service business. More design, more room, and a proper contact flow.",
    label: "Best fit for most established local businesses",
    featured: true,
    features: [
      "Up to 6 pages",
      "More customised design and layout",
      "Contact or quote-request form",
      "Foundational local SEO setup",
      "Search Console and sitemap setup assistance",
      "Analytics preparation",
      "Portfolio or gallery capability when needed",
      "Two revision rounds",
      "Launch assistance",
      "30 days of post-launch bug support",
    ],
    cta: { label: "Get my free website plan", href: "/contact?plan=business-website" },
  },
  {
    slug: "growth-website",
    name: "Growth Website",
    price: "Starting at $2,500",
    priceBasis:
      "Final price depends on scope — pages, content, service areas, functionality, and how the content is structured.",
    blurb:
      "For larger local-business sites: more content, more service areas, landing pages, and more going on under the hood.",
    features: [
      "Everything in the Business Website",
      "A page for each service you offer",
      "Pages for the areas you actually serve",
      "Landing pages for specific jobs or campaigns",
      "Deeper content structure as the site grows",
      "Photo gallery and customer reviews",
    ],
    cta: { label: "Get a custom scope", href: "/contact?plan=growth-website" },
  },
  {
    slug: "lead-system",
    name: "Lead System / Custom Build",
    price: "Custom quote",
    priceBasis:
      "Quoted to what you actually need. There's no maximum, because there's no way to guess the scope of a custom build in advance.",
    blurb:
      "When you need software, not just a website: dashboards, logins, portals, automated follow-up, integrations, or payments.",
    features: [
      "Dashboards and administration systems",
      "Customer portals and authentication",
      "Advanced forms and automated follow-up",
      "Integrations, APIs, and payment workflows",
      "Custom business tools built around how you work",
    ],
    cta: { label: "Scope a custom build", href: "/contact?plan=lead-system" },
  },
];

/** Optional ongoing care. Never required, and never a condition of ownership. */
export const care = {
  price: "Starting at $75/month",
  summary:
    "Optional. Your website is yours whether or not you take it — care is a service, not a licence, and you can cancel any time.",
  includes: [
    "Managed deployment and hosting oversight",
    "Software and dependency monitoring",
    "Routine backups where applicable",
    "Uptime monitoring",
    "Minor content edits within an agreed monthly allowance",
    "Form-delivery monitoring, so enquiries don't quietly fail",
    "Basic support when you need something changed",
  ],
  /** Stated plainly so nobody expects unlimited work for $75. */
  note: "Minor edits are covered up to an agreed monthly allowance — not unlimited. Larger changes are quoted separately, always in writing first.",
};

/**
 * Payment terms.
 * No financing, no buy-now-pay-later, no public checkout, no surprise fees.
 * Each customer receives their own secure invoice AFTER agreeing to a project —
 * there is deliberately no public "pay now" link anywhere on this site.
 *
 * `methods` is only shown when site.payments.methodsConfirmed is true, so the
 * site never claims a payment method that isn't actually live yet.
 */
export const paymentTerms = {
  heading: "How payment works",
  body: "After the project scope is approved, you'll receive a written agreement and a secure invoice. Projects normally begin with a deposit, and the remaining payment schedule is listed clearly in the proposal — so there are no surprises and nothing to apply for.",
  methods: "Card and bank-transfer payment options are available.",
  care: "Optional website care is billed as a recurring invoice, and only after you've authorised it.",
};

/** Shown near pricing to set expectations honestly. */
export const pricingNote =
  "Every price above is a starting point. Every project begins with a short conversation and a written scope, so you know exactly what's included and what it costs before you commit to anything.";

/** The line that keeps people from feeling they must choose before talking to us. */
export const notSureNote =
  "Not sure which option fits? Tell us about your business and we'll recommend the simplest option that does the job.";
