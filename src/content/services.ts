import type { LucideIcon } from "lucide-react";
import { Rocket, Building2, TrendingUp, Workflow } from "lucide-react";

/**
 * Service copy is written for a busy business owner, not a developer.
 *
 * Search-visibility language is deliberately precise: we describe the technical
 * foundations we set up and the assistance we provide. We never promise rankings,
 * placement, indexing outcomes, lead volume, revenue, or growth — because none of
 * those can be guaranteed by anyone.
 */
export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  /** Always a starting price, or "Custom quote". Never a fixed price for scoped work. */
  priceFrom: string;
  /** How the final number is decided. */
  priceBasis?: string;
  /** Optional ongoing care — never required. */
  care?: string;
  bestFor: string;
  includes: string[];
  /** Only the Starter Site draws an explicit line, so it can't quietly become the Business Website. */
  notIncluded?: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "starter-site",
    name: "Starter Site",
    icon: Rocket,
    summary:
      "A focused, affordable way for a small local business to get a professional website online — properly built, just deliberately simple.",
    priceFrom: "Starting at $750",
    priceBasis:
      "You supply the final written content and usable photos, and we build on our existing design system. That's what keeps it at this price.",
    care: "Optional website care from $75/month",
    bestFor:
      "Small local businesses that have no website yet, or are running everything through a Facebook page, and need a credible presence without a big spend.",
    includes: [
      "Up to 3 pages",
      "Works properly on phones, tablets, and desktops",
      "A basic contact form that reaches you",
      "Basic on-page SEO and foundational metadata",
      "Sitemap and robots configuration, so search engines can crawl the site",
      "One revision round",
      "Launch assistance",
      "14 days of post-launch bug support",
    ],
    notIncluded: [
      "An admin dashboard or content management system",
      "Custom integrations, ecommerce, logins, or customer portals",
      "Advanced animations or advanced copywriting",
      "Extensive content migration from an old site",
      "Custom web applications",
    ],
    outcomes: [
      "A credible, professional presence customers can actually find",
      "An obvious way for someone to get in touch",
      "A foundation you can grow from later",
    ],
  },
  {
    slug: "business-website",
    name: "Business Website",
    icon: Building2,
    summary:
      "Our normal website product for an established local service business: more design, more room for your services, and a proper contact and quote flow.",
    priceFrom: "Starting at $1,500",
    priceBasis: "Final scope depends on your business — always agreed in writing before work begins.",
    care: "Optional website care from $75/month",
    bestFor:
      "Established local service businesses replacing an outdated site, or finally getting a first website that has to do real work.",
    includes: [
      "Up to 6 pages",
      "A more customised design and layout built around your business",
      "A contact or quote-request form on every page",
      "Foundational local SEO setup",
      "Help setting up Google Search Console and submitting your sitemap",
      "Analytics preparation, so you can see what's working",
      "Portfolio or gallery capability when you need it",
      "Two revision rounds",
      "Launch assistance",
      "30 days of post-launch bug support",
    ],
    outcomes: [
      "A business that looks established before anyone calls",
      "A clear, easy path from 'found you' to 'called you'",
      "Search engines can properly discover and understand your site",
    ],
  },
  {
    slug: "growth-website",
    name: "Growth Website",
    icon: TrendingUp,
    summary:
      "For larger local-business websites: more content, more service areas, landing pages, and a structure that holds up as you keep adding to it.",
    priceFrom: "Starting at $2,500",
    priceBasis:
      "Final price depends on scope — the number of pages, the content, your service areas, the features, and how it all needs to be structured.",
    care: "Optional website care available",
    bestFor:
      "Growing companies with several services and a wider service area, who need to be found for more searches and present more of their work.",
    includes: [
      "Everything in the Business Website",
      "A dedicated page for each service you offer",
      "Honest pages for the areas you actually serve",
      "Landing pages for specific jobs, offers, or campaigns",
      "A photo gallery, including before-and-after work",
      "Customer reviews shown where they'll actually be seen",
      "A deeper content structure that holds up as the site grows",
    ],
    outcomes: [
      "More of your services and areas properly represented online",
      "Better-quality enquiries from people who already trust you",
      "Room to keep adding without starting over",
    ],
  },
  {
    slug: "lead-system",
    name: "Lead System / Custom Build",
    icon: Workflow,
    summary:
      "When you need software rather than a website: dashboards, logins, customer portals, automated follow-up, integrations, or payments.",
    priceFrom: "Custom quote",
    priceBasis:
      "Quoted to what you actually need. We don't publish a maximum, because there's no honest way to guess the scope of a custom build in advance.",
    bestFor:
      "Businesses whose real problem is a process, not a page — handling more enquiries, following up faster, or replacing something held together with spreadsheets.",
    includes: [
      "Dashboards and administration systems",
      "Customer portals and secure logins",
      "Advanced forms and automated follow-up by email or text",
      "Integrations and APIs connecting the tools you already use",
      "Payment workflows",
      "Custom business tools built around how your team actually works",
    ],
    outcomes: [
      "Faster follow-up, so fewer enquiries go cold",
      "A clear view of where your work is coming from",
      "Less time spent on admin and chasing",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
