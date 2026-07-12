import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { getVisibleProjects } from "@/content/portfolio";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const hasWork = getVisibleProjects().length > 0;
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />

      {/* Why us — plain, credible, no invented claims */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="spec-label spec-label--dark">Why owners choose us</span>
            <h2 className="mt-3 text-display-md text-white">
              Built for leads — not to look like everyone else&apos;s website
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Most small-business sites are slow, hard to use on a phone, or clearly a template. We design
              each site around your customers and the actions that bring you work: calling, requesting a
              quote, and booking.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Made to convert", "Clear calls-to-action, tap-to-call, and fast quote forms on every page."],
              ["Genuinely fast", "Lightweight, statically generated pages that load quickly on any connection."],
              ["Found locally", "A real local-SEO foundation so the right customers in your area find you."],
              ["Easy to maintain", "Edit content in one place, or hand it to us — no technical work required."],
            ].map(([t, d]) => (
              <li key={t} className="rounded border border-line-dark bg-graphite p-5">
                <p className="font-semibold text-white">{t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Process />

      {/* Recent work preview — only shown once real, permitted projects exist. */}
      {hasWork ? (
        <Section tone="paper">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader label="Recent work" title="Sites built to get results" />
            <ButtonLink href="/work" variant="outline">
              View all work
            </ButtonLink>
          </div>
          <div className="mt-12">
            <PortfolioGrid limit={3} />
          </div>
        </Section>
      ) : null}

      <Testimonials />
      <FaqSection />
      <CtaBand />
    </>
  );
}
