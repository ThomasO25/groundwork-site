import { PricingTiers } from "@/components/sections/pricing-tiers";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Clear starting prices for local-business websites. Website Launch from $1,500 (or $500 per month for three months), Growth Websites from $2,500, and custom-quoted Lead Systems. Simple payment plans available.",
  path: "/pricing",
});

const included = [
  "A custom design built around your business",
  "Tap-to-call on every page",
  "A simple quote form that blocks spam",
  "Set up to be found in local searches",
  "Loads fast and stays protected",
  "Works properly on every phone",
  "Listed correctly with Google",
  "Yours to keep — site, domain, and content",
  "Someone to call after launch",
];

export default function PricingPage() {
  return (
    <>
      <Section tone="paper" className="pb-8">
        <div className="max-w-prose">
          <span className="eyebrow">Pricing</span>
          <h1 className="mt-4 text-display-lg text-ink">Clear pricing. No surprises.</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Every project starts with a short conversation and a written plan, so you know exactly what
            you&apos;re getting and what it costs before anything begins. The prices below are starting
            points.
          </p>
        </div>
      </Section>

      <Section tone="paper" className="pt-0">
        {/* Keeps the heading order valid (h1 → h2 → h3) without changing the design:
            the tier names are h3s, so they need an h2 parent. */}
        <h2 className="sr-only">Packages and starting prices</h2>
        <PricingTiers heading={false} />
      </Section>

      <Section tone="concrete">
        <div className="max-w-prose">
          <span className="eyebrow">Always included</span>
          <h2 className="mt-4 text-display-md text-ink">Every website ships with the essentials</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((f) => (
            <li key={f} className="flex items-start gap-3 border-t border-line pt-4">
              <span className="notch mt-1.5 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
              <span className="leading-relaxed text-ink">{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
