import { Hero } from "@/components/sections/hero";
import { WhoWeHelp } from "@/components/sections/who-we-help";
import { Benefits } from "@/components/sections/benefits";
import { EntryOffer } from "@/components/sections/entry-offer";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
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
 *   1. Hero (+ honest responsive-design visual)
 *   2. Who we help
 *   3. Real work           — hidden until permitted projects exist
 *   4. Benefits            — consolidated; replaced the old trust-bar + "why us"
 *   5. The offer + price
 *   6. Process
 *   7. Services
 *   8. Founder
 *   9. FAQ
 *  10. Final CTA
 */
export default function HomePage() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <>
      <Hero />
      <WhoWeHelp />

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

      <Benefits />
      <EntryOffer />
      <Process />
      <ServicesOverview />
      <Founder />
      <Testimonials />
      <FaqSection />
      <CtaBand />
    </>
  );
}
