import { PricingTiers } from "@/components/sections/pricing-tiers";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing — Website & Lead System Packages",
  description:
    "Transparent starting prices for local-business websites and lead systems. Website Launch from $1,500, Growth Websites, and full Lead Systems. Financing and monthly care available.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Section tone="paper" className="pb-6">
        <div className="max-w-3xl">
          <span className="spec-label">Pricing</span>
          <h1 className="mt-3 text-display-lg text-ink">Clear pricing. No surprises.</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Every project starts with a short call and a written scope, so you know exactly what you&apos;re
            getting and what it costs before anything begins. Prices below are starting points.
          </p>
        </div>
      </Section>

      <Section tone="paper" className="pt-0">
        <PricingTiers heading={false} />
      </Section>

      {/* What's always included */}
      <Section tone="concrete">
        <div className="max-w-2xl">
          <span className="spec-label">Always included</span>
          <h2 className="mt-3 text-display-md text-ink">Every project ships with the essentials</h2>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Custom, mobile-first design",
            "Click-to-call on every page",
            "Local SEO foundation",
            "Fast, secure hosting with SSL",
            "Contact / quote form with spam protection",
            "Accessible, semantic markup",
            "Google-ready sitemap & metadata",
            "Setup guidance you actually own",
            "Post-launch support options",
          ].map((f) => (
            <li key={f} className="bg-paper px-5 py-4 text-sm font-medium text-ink">
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* Financing / care explainer */}
      <Section tone="paper">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded border border-line bg-white p-7">
            <h3 className="text-xl font-bold text-ink">Financing available</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Prefer to spread the cost? Website Launch is available at $500/month for three months. We&apos;ll
              walk you through the options on our first call.
            </p>
          </div>
          <div className="rounded border border-line bg-white p-7">
            <h3 className="text-xl font-bold text-ink">Monthly care (optional)</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Hosting, security updates, small edits, monitoring, and being on call — starting at $75/month.
              Most owners prefer to hand this off so their site stays fast and current without the hassle.
            </p>
          </div>
        </div>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
