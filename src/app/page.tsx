import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Benefits } from "@/components/sections/benefits";
import { EntryOffer } from "@/components/sections/entry-offer";
import { Process } from "@/components/sections/process";
import { Founder } from "@/components/sections/founder";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { getVisibleProjects } from "@/content/portfolio";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

/**
 * Homepage conversion flow:
 *   1. Hero              — the promise + the offer
 *   2. Real work         — proof, as high as possible (hidden until real projects exist)
 *   3. Benefits          — what it does for the business
 *   4. Simple entry offer— one clear starting price
 *   5. Process           — how it works, low pressure
 *   6. Founder           — who you're actually dealing with
 *   7. FAQ               — remove the last objections
 *   8. Final CTA
 */
export default function HomePage() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <>
      <Hero />
      <TrustBar />

      {/* 2. Proof first — but only when real, permitted projects exist. An empty
          or half-finished portfolio section would cost more trust than it earns,
          so it is hidden entirely rather than shown unfinished. */}
      {hasWork ? (
        <Section tone="paper">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              label="Real work"
              title="Sites built for businesses like yours"
              intro="Real projects, real screenshots — published with each client's permission."
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

      <Benefits />
      <EntryOffer />
      <Process />
      <Founder />
      <Testimonials />
      <FaqSection />
      <CtaBand />
    </>
  );
}
