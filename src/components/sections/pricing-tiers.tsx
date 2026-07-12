import { Check } from "lucide-react";
import { pricingTiers, pricingNote, careIncludes } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Pricing cards + ONE explanation of payment plans and ONE explanation of
 * optional monthly care. (The old build repeated both on the pricing page.)
 */
export function PricingTiers({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <div className="max-w-prose">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-display-md text-ink">Clear pricing, written down before you commit</h2>
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col rounded-lg border p-7",
              tier.featured ? "border-gold bg-surface shadow-soft" : "border-line bg-surface/60"
            )}
          >
            {tier.featured ? (
              <span className="self-start rounded-sm bg-sand px-2.5 py-1 text-xs font-semibold text-ink">
                Most businesses start here
              </span>
            ) : null}

            <h3 className={cn("font-display text-xl font-bold text-ink", tier.featured && "mt-4")}>
              {tier.name}
            </h3>
            <p className="mt-3 font-display text-3xl font-extrabold text-ink">{tier.price}</p>
            {tier.paymentPlan ? (
              <p className="mt-1 font-medium text-ink">{tier.paymentPlan}</p>
            ) : null}

            <p className="mt-4 leading-relaxed text-steel">{tier.blurb}</p>

            {tier.priceBasis ? (
              <p className="mt-4 rounded border border-line bg-concrete/70 px-4 py-3 text-sm leading-relaxed text-steel">
                {tier.priceBasis}
              </p>
            ) : null}

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem] text-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={tier.cta.href}
              variant={tier.featured ? "primary" : "outline"}
              className="mt-7 w-full"
              data-analytics={`pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}
            >
              {tier.cta.label}
            </ButtonLink>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-prose leading-relaxed text-steel">{pricingNote}</p>

      {/* The single explanation of each. Nothing below repeats these. */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-7">
          <h3 className="font-display text-xl font-bold text-ink">Simple payment plans available</h3>
          <p className="mt-3 leading-relaxed text-steel">
            Website Launch can be paid as <strong className="font-semibold text-ink">$500 per month for
            three months</strong>. That&apos;s simply the project split into three scheduled payments —
            it is <strong className="font-semibold text-ink">not a loan</strong>. No credit check, no
            interest, no third-party lender, and nothing to apply for.
          </p>
        </div>

        <div className="rounded-lg border border-line bg-surface p-7">
          <h3 className="font-display text-xl font-bold text-ink">Monthly care is optional</h3>
          <p className="mt-3 leading-relaxed text-steel">
            You&apos;re never required to buy it, and the website is yours either way. From{" "}
            <strong className="font-semibold text-ink">$75/month</strong>, it covers:
          </p>
          <ul className="mt-4 space-y-2.5">
            {careIncludes.map((c) => (
              <li key={c} className="flex gap-2.5 text-[0.95rem] text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-steel">Cancel any time. No long contracts.</p>
        </div>
      </div>
    </div>
  );
}
