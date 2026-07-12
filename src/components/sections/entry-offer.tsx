import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

const included = [
  "A professional site built around your services",
  "Tap-to-call and a simple quote form on every page",
  "Set up to be found in local searches",
  "Yours to keep — the site, the domain, the content",
];

export function EntryOffer() {
  return (
    <Section tone="paper">
      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="eyebrow">A simple place to start</span>
            <h2 className="mt-4 font-display text-display-md text-ink">
              Professional websites starting at $1,500
            </h2>
            <p className="mt-3 text-xl font-semibold text-ink">Or $500 per month for three months.</p>

            {/* The single, plain-English explanation of payment plans. */}
            <p className="mt-5 leading-relaxed text-steel">
              That&apos;s simply the project split into three scheduled payments — not a loan, no credit
              check, no interest, and no third-party lender.
            </p>
            <p className="mt-3 leading-relaxed text-steel">
              Bigger websites and lead systems don&apos;t get a guessed number. We write you a scope that
              spells out exactly what&apos;s included and what it costs, before you commit to anything.
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

          <div className="border-t border-line bg-concrete/70 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <h3 className="font-display text-lg font-bold text-ink">Every website includes</h3>
            <ul className="mt-5 space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-deep" aria-hidden="true" />
                  <span className="leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
            {/* The single, plain-English explanation of optional care. */}
            <p className="mt-7 border-t border-line pt-6 text-[0.95rem] leading-relaxed text-steel">
              <strong className="font-semibold text-ink">Monthly care is optional</strong>, from $75/month —
              updates, backups, security, and small changes handled for you. Skip it if you&apos;d rather
              not; the site is yours either way.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
