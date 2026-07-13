import { Hero } from "@/components/sections/hero";
import { Recognition } from "@/components/sections/recognition";
import { CustomerJourney } from "@/components/sections/customer-journey";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { Founder } from "@/components/sections/founder";
import { Process } from "@/components/sections/process";
import { Options } from "@/components/sections/options";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { homepageFaqs } from "@/content/faq";
import { getVisibleProjects } from "@/content/portfolio";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

/**
 * HOMEPAGE — a story-led sales page, not a pricing page.
 *
 *   1. Hero              — the promise. No price.
 *   2. Recognition       — "that's my situation"
 *   3. Customer journey  — Found → Trust → Contact → Follow-up
 *   4. What we build     — the actual capability, benefit-led
 *   5. Real work         — proof, before any mention of service levels (hidden until permitted)
 *   6. Why Groundwork    — the direct working relationship
 *   7. Process           — what you receive at each stage
 *   8. Options           — service-level navigation, LOW on the page, no big price figure
 *   9. FAQ               — six strongest questions, links to the full page
 *  10. Final CTA
 *
 * REMOVED in this pass: the $750 offer block (moved the price off the homepage
 * entirely), the standalone Benefits section, and the Who-We-Help strip — the
 * first led with price far too early, and the other two repeated claims now made
 * better by Recognition, Customer Journey, and What We Build.
 */
export default function HomePage() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <>
      <Hero />
      <Recognition />
      <CustomerJourney />
      <WhatWeBuild />

      {/* Proof sits above any mention of service levels or price. */}
      {hasWork ? (
        <Section tone="paper">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              label="Real work"
              title="Sites built for businesses like yours"
              intro="Real projects and real screenshots — published with each client's permission."
            />
            <ButtonLink href="/work" variant="outline" data-analytics="home_view_all_work">
              See all projects
            </ButtonLink>
          </div>
          <div className="mt-12">
            <PortfolioGrid limit={2} />
          </div>
        </Section>
      ) : null}

      <Testimonials />
      <Founder />
      <Process />
      <Options />
      <FaqSection items={homepageFaqs} showAll={false} />
      <CtaBand />
    </>
  );
}
