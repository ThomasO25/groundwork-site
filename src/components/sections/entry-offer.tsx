import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/**
 * The simple entry offer. The homepage leads with ONE clear starting price —
 * larger work gets a custom written scope instead of a wall of price ranges.
 */
const included = [
  "A professional site built around your services",
  "Tap-to-call and a simple quote form on every page",
  "Set up to be found in local searches",
  "Yours to keep — the site, the domain, the content",
];

export function EntryOffer() {
  return (
    <Section tone="concrete" id="pricing-preview">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="spec-label">A simple place to start</span>
          <h2 className="mt-3 text-display-md text-ink">
            Professional websites starting at{" "}
            <span className="relative whitespace-nowrap">
              $1,500
              <span className="absolute -bottom-0.5 left-0 h-1 w-full bg-hivis" aria-hidden="true" />
            </span>
          </h2>
          <p className="mt-4 text-xl font-semibold text-ink">Or $500 per month for three months.</p>
          <p className="mt-4 text-lg leading-relaxed text-steel">
            That&apos;s the starting point for a complete, professional site. Bigger websites and lead
            systems don&apos;t get a guessed number — we write you a custom scope that spells out exactly
            what&apos;s included and what it costs, before you commit to anything.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-steel">
            Ongoing website care is <strong className="font-semibold text-ink">optional</strong>, from
            $75/month — updates, backups, security, and small changes handled for you. Skip it if you&apos;d
            rather not.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" data-analytics="entry_offer_primary">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline" size="lg" data-analytics="entry_offer_pricing">
              See what&apos;s included
            </ButtonLink>
          </div>
        </div>

        <div className="rounded border border-line bg-white p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
            Every website includes
          </p>
          <ul className="mt-5 space-y-3.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-hivis-deep" aria-hidden="true" />
                <span className="text-[0.95rem] leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-steel">
            Simple payment plans available. No long contracts, and no charges you didn&apos;t agree to in
            writing first.
          </p>
        </div>
      </div>
    </Section>
  );
}
