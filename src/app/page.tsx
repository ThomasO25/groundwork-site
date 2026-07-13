import { Hero } from "@/components/sections/hero";
import { WhoWeHelp } from "@/components/sections/who-we-help";
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
 * Homepage flow:
 *   1. Hero
 *   2. Real work            — proof first, hidden until permitted projects exist
 *   3. Who we help
 *   4. What it does for you (benefits)
 *   5. The offer + starting price (concise — NOT a pricing table)
 *   6. Process
 *   7. Founder
 *   8. FAQ
 *   9. Final CTA
 *
 * The services grid was REMOVED from the homepage: it repeated the offer section
 * and the pricing page without adding proof or trust. Services live on /services
 * and /pricing, which is where someone comparing options actually goes.
 */
export default function HomePage() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <>
      <Hero />

      {hasWork ? (
        <Section tone="concrete">
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

      <WhoWeHelp />
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
