import type { LucideIcon } from "lucide-react";
import { Rocket, TrendingUp, Workflow } from "lucide-react";

export type Service = {
  slug: string;
  code: string; // spec-label code used in the design (e.g. "SVC-01")
  name: string;
  icon: LucideIcon;
  summary: string;
  priceFrom: string;
  financing?: string;
  care: string; // ongoing care line
  bestFor: string;
  includes: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "website-launch",
    code: "SVC-01",
    name: "Website Launch",
    icon: Rocket,
    summary:
      "A fast, professional 4–6 page website that makes your business look established and makes it effortless for customers to call or request a quote.",
    priceFrom: "Starting at $1,500",
    financing: "Or $500/month for 3 months",
    care: "Maintenance from $75/month",
    bestFor:
      "Established local businesses that need a credible, mobile-first site that actually brings in calls — replacing an outdated site or a Facebook-only presence.",
    includes: [
      "Custom, mobile-first design (not a generic template)",
      "Up to 6 pages: Home, Services, About, Reviews, Service Areas, Contact",
      "Click-to-call and a simple quote-request form",
      "Local SEO foundation: titles, metadata, sitemap, structured data",
      "Google Business Profile linking and setup guidance",
      "Fast, secure hosting on Vercel with SSL",
    ],
    outcomes: [
      "More phone calls and quote requests from local searches",
      "A business that looks trustworthy and established",
      "A site that loads fast and works on every phone",
    ],
  },
  {
    slug: "growth-website",
    code: "SVC-02",
    name: "Growth Website",
    icon: TrendingUp,
    summary:
      "Everything in Launch, expanded into individual service pages, a project gallery, reviews, and location pages that help you rank and convert across your whole service area.",
    priceFrom: "Generally $2,500–$3,500",
    care: "Ongoing service generally $150–$200/month",
    bestFor:
      "Growing companies with several services and a wider service area that want to be found for more searches and win bigger, better-qualified jobs.",
    includes: [
      "Everything in Website Launch",
      "Dedicated pages for each core service",
      "Project gallery / portfolio with before-and-after support",
      "Reviews and testimonials system",
      "Service-area pages written naturally (no duplicate 'fake location' pages)",
      "Expanded SEO: internal linking, richer structured data, image optimization",
    ],
    outcomes: [
      "Found for more services and more locations",
      "Higher-quality leads that already trust you",
      "Room to grow content without a rebuild",
    ],
  },
  {
    slug: "lead-system",
    code: "SVC-03",
    name: "Lead System",
    icon: Workflow,
    summary:
      "A complete lead-capture and follow-up system: conversion-focused landing pages, smarter forms, an admin dashboard, and connections to email, SMS, or your CRM so leads get captured and followed up quickly.",
    priceFrom: "Generally $4,000–$7,500",
    care: "Ongoing service generally $250–$500/month",
    bestFor:
      "Businesses that already get traffic and want to convert more of it — with tracked leads, faster response, and automation that saves the owner time.",
    includes: [
      "Everything in Growth Website",
      "Conversion-focused landing pages for key services or campaigns",
      "Lead dashboard with statuses, notes, and lead-source tracking",
      "Automated notifications and follow-up hooks (email / SMS / CRM)",
      "Secure admin area with proper authorization",
      "Analytics and conversion-event tracking",
    ],
    outcomes: [
      "Faster follow-up and fewer missed leads",
      "Clear visibility into which marketing brings in work",
      "Less manual admin for the owner",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
