import type { LucideIcon } from "lucide-react";
import { Rocket, TrendingUp, Workflow } from "lucide-react";

/**
 * Service copy is written for a busy business owner — not a developer.
 * Every line is a business outcome. Technical terms only appear when the
 * benefit is spelled out in the same breath. No guarantees, ever.
 */
export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  /** Headline price. */
  priceFrom: string;
  /** Payment-plan line. */
  paymentPlan?: string;
  /** How the final number is decided (for scoped work). */
  priceBasis?: string;
  /** Ongoing care — always optional. */
  care?: string;
  bestFor: string;
  includes: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "website-launch",
    name: "Website Launch",
    icon: Rocket,
    summary:
      "A fast, professional website that makes your business look established and makes it effortless for a customer to call you or ask for a quote.",
    priceFrom: "Starting at $1,500",
    paymentPlan: "Or $500 per month for three months",
    care: "Optional website care from $75/month",
    bestFor:
      "Established local businesses that need a site that actually brings in calls — replacing an outdated site, or a Facebook page doing all the work.",
    includes: [
      "A custom design built around your business — not a template",
      "Up to 6 pages: Home, Services, About, Reviews, Areas, Contact",
      "Tap-to-call and a simple quote form on every page",
      "The local search basics set up properly, so nearby customers can find you",
      "Your Google Business Profile connected and set up correctly",
      "Hosting that keeps the site fast and protected",
    ],
    outcomes: [
      "More phone calls and quote requests from local searches",
      "A business that looks trustworthy before anyone calls",
      "A site that loads fast and works properly on every phone",
    ],
  },
  {
    slug: "growth-website",
    name: "Growth Website",
    icon: TrendingUp,
    summary:
      "Everything in Website Launch, expanded with a page for each service, a photo gallery, customer reviews, and coverage of every area you work in.",
    priceFrom: "Starting at $2,500",
    priceBasis:
      "Final pricing is based on pages, content, service areas, and features — written down before you commit.",
    care: "Optional website care available",
    bestFor:
      "Growing companies with several services and a wider service area that want to be found for more searches and win bigger jobs.",
    includes: [
      "Everything in Website Launch",
      "A dedicated page for each service you offer",
      "A photo gallery, including before-and-after work",
      "Customer reviews shown where they'll be seen",
      "Honest pages for the areas you actually serve",
      "Deeper local search setup as your site grows",
    ],
    outcomes: [
      "Found for more services and more locations",
      "Better-quality enquiries from people who already trust you",
      "Room to add more work and services without starting over",
    ],
  },
  {
    slug: "lead-system",
    name: "Lead System",
    icon: Workflow,
    summary:
      "For businesses ready to handle more enquiries without dropping any: dedicated pages for your best jobs, a simple dashboard of incoming leads, and automatic follow-up so people hear back quickly.",
    priceFrom: "Custom quote",
    priceBasis:
      "Scoped to what you actually need — dashboards, connections to the tools you already use, follow-up automation, and admin requirements. Nothing is built until it's agreed in writing.",
    bestFor:
      "Businesses that already get enquiries and want to convert more of them, with faster follow-up and less admin for the owner.",
    includes: [
      "Everything in Growth Website",
      "Dedicated pages for specific jobs, offers, or campaigns",
      "A simple dashboard showing every lead and its status",
      "Automatic follow-up by email or text, so nobody waits days",
      "Connections to the tools you already use to track customers",
      "Clear reporting on which marketing actually brings in work",
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
