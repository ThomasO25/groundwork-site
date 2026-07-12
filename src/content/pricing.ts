export type PricingTier = {
  name: string;
  /** Headline price. Never a guaranteed final number for scoped work. */
  price: string;
  /** Payment-plan line, shown under the price. */
  paymentPlan?: string;
  /** How the final number gets decided (honesty about scope). */
  priceBasis?: string;
  /** Optional ongoing care. Always described as optional. */
  care?: string;
  blurb: string;
  featured?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Website Launch",
    price: "Starting at $1,500",
    paymentPlan: "Or $500 per month for three months",
    care: "Optional website care from $75/month",
    blurb:
      "A professional, fast website that makes you look established and gets you calls. The right place to start for most businesses.",
    features: [
      "A complete 4–6 page website",
      "Tap-to-call and a simple quote form",
      "Set up to be found in local searches",
      "Google Business Profile set up properly",
      "Built to load fast on any phone",
    ],
    cta: { label: "Get my free website plan", href: "/contact?plan=launch" },
  },
  {
    name: "Growth Website",
    price: "Starting at $2,500",
    priceBasis:
      "Final pricing is based on pages, content, service areas, and features — always written down before you commit.",
    care: "Optional website care available",
    blurb:
      "For businesses with several services or areas to cover. More pages, more proof, and more ways for customers to find you.",
    featured: true,
    features: [
      "Everything in Website Launch",
      "A page for each service you offer",
      "Photo gallery and customer reviews",
      "Pages for the areas you serve",
      "Deeper local search setup",
    ],
    cta: { label: "Get a custom scope", href: "/contact?plan=growth" },
  },
  {
    name: "Lead System",
    price: "Custom quote",
    priceBasis:
      "Scoped to what you actually need: dashboards, connections to the tools you already use, follow-up automation, and admin requirements.",
    blurb:
      "For businesses ready to handle more leads without dropping any. Built around how your team actually follows up.",
    features: [
      "Everything in Growth Website",
      "Dedicated pages for specific jobs or offers",
      "A simple dashboard for incoming leads",
      "Automatic follow-up by email or text",
      "Clear reporting on where calls come from",
    ],
    cta: { label: "Scope a lead system", href: "/contact?plan=lead-system" },
  },
];

/** Shown near pricing to set expectations honestly — no guarantees anywhere. */
export const pricingNote =
  "Every project starts with a short call and a written scope, so you know exactly what's included and what it costs before you commit to anything. Simple payment plans available.";

/** What optional monthly care actually covers. Care is never required. */
export const careIncludes = [
  "Software updates, backups, and security",
  "Small content changes (new photos, prices, hours)",
  "Uptime monitoring so problems get caught early",
  "Someone to call when you need something changed",
];
