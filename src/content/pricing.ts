export type PricingTier = {
  code: string;
  name: string;
  price: string;
  priceNote?: string;
  financing?: string;
  care: string;
  blurb: string;
  featured?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

export const pricingTiers: PricingTier[] = [
  {
    code: "PLN-01",
    name: "Website Launch",
    price: "Starting at $1,500",
    financing: "or $500/mo for 3 months",
    care: "Maintenance from $75/month",
    blurb: "A credible, fast, mobile-first site that gets you found and gets you calls.",
    features: [
      "Custom 4–6 page website",
      "Click-to-call + quote form",
      "Local SEO foundation",
      "Google Business Profile setup",
      "Fast, secure hosting",
    ],
    cta: { label: "Start a Launch project", href: "/contact?plan=launch" },
  },
  {
    code: "PLN-02",
    name: "Growth Website",
    price: "$2,500–$3,500",
    care: "Service $150–$200/month",
    blurb: "Individual service pages, a gallery, reviews, and service-area coverage to win more work.",
    featured: true,
    features: [
      "Everything in Launch",
      "A page for each service",
      "Project gallery + reviews",
      "Service-area pages",
      "Expanded SEO & internal linking",
    ],
    cta: { label: "Plan a Growth site", href: "/contact?plan=growth" },
  },
  {
    code: "PLN-03",
    name: "Lead System",
    price: "$4,000–$7,500",
    care: "Service $250–$500/month",
    blurb: "Landing pages, a lead dashboard, and follow-up automation so leads get captured and acted on.",
    features: [
      "Everything in Growth",
      "Conversion landing pages",
      "Lead dashboard + tracking",
      "Email / SMS / CRM automation",
      "Analytics & conversion events",
    ],
    cta: { label: "Scope a Lead System", href: "/contact?plan=lead-system" },
  },
];

// Shown near pricing to set expectations honestly.
export const pricingNote =
  "Final pricing depends on the number of pages, content, integrations, admin features, and automation you need. Every project starts with a short call and a written scope — no surprises.";
