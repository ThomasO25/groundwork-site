import { PricingTiers } from "@/components/sections/pricing-tiers";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Starting prices for local-business websites: Starter Site from $750, Business Website from $1,500, Growth Website from $2,500, and custom-quoted lead systems. Optional website care from $75/month.",
  path: "/pricing",
});

// What ships with every project, whatever the level. Deliberately precise about
// search visibility: foundations we set up, never rankings we can't promise.
const included = [
  "A design built around your business, not a template",
  "Works properly on phones, tablets, and desktops",
  "A contact form that actually reaches you",
  "Spam protection, so you don't get buried in junk",
  "Foundational on-page SEO and metadata",
  "Sitemap and robots configuration for search engines",
  "Structured data describing your business accurately",
  "Yours to keep — the site, the domain, and the content",
];

export default function PricingPage() {
  return (
    <>
      <Section tone="paper" className="pb-8">
        <div className="max-w-prose">
          <span className="eyebrow">Pricing</span>
          <h1 className="mt-4 text-display-lg text-ink">Clear starting prices. No surprises.</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Every project starts with a short conversation and a written scope, so you know exactly
            what&apos;s included and what it costs before anything begins. The prices below are starting
            points — and you don&apos;t need to pick one before getting in touch.
          </p>
        </div>
      </Section>

      <Section tone="paper" className="pt-0">
        {/* Keeps the heading order valid (h1 → h2 → h3): the tier names are h3s. */}
        <h2 className="sr-only">Service levels and starting prices</h2>
        <PricingTiers heading={false} />
      </Section>

      <Section tone="concrete">
        <div className="max-w-prose">
          <span className="eyebrow">Always included</span>
          <h2 className="mt-4 text-display-md text-ink">Every project ships with the essentials</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((f) => (
            <li key={f} className="flex items-start gap-3 border-t border-line pt-4">
              <span className="notch mt-1.5 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
              <span className="leading-relaxed text-ink">{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-prose text-sm leading-relaxed text-steel">
          A note on search: we set up the technical foundations that help search engines discover and
          understand your website, and we can assist with Google Search Console, sitemap submission, and a
          Google Business Profile if your business is eligible. Nobody can guarantee rankings, placement, or
          lead volume — and you should be careful of anyone who says otherwise.
        </p>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
