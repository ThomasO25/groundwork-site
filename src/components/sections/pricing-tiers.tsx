import { Check } from "lucide-react";
import { pricingTiers, pricingNote, careIncludes } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingTiers({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <div className="max-w-2xl">
          <span className="spec-label">Pricing</span>
          <h2 className="mt-3 text-display-md text-ink">Clear pricing, written down before you commit</h2>
        </div>
      ) : null}

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col rounded border bg-white p-6",
              tier.featured ? "border-ink ring-1 ring-ink" : "border-line"
            )}
          >
            {/* Descriptive label only — no invented "most popular" style claims. */}
            {tier.featured ? (
              <span className="self-start rounded-sm bg-hivis px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
                Best for multiple services
              </span>
            ) : null}

            <h3 className={cn("text-xl font-bold text-ink", tier.featured && "mt-4")}>{tier.name}</h3>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{tier.price}</p>
            {tier.paymentPlan ? <p className="mt-1 text-sm font-medium text-ink">{tier.paymentPlan}</p> : null}
            {tier.care ? <p className="mt-1 text-sm text-steel">{tier.care}</p> : null}

            <p className="mt-4 text-sm leading-relaxed text-steel">{tier.blurb}</p>

            {tier.priceBasis ? (
              <p className="mt-3 rounded-sm bg-concrete px-3 py-2 text-xs leading-relaxed text-steel">
                {tier.priceBasis}
              </p>
            ) : null}

            <ul className="mt-5 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-hivis-deep" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={tier.cta.href}
              variant={tier.featured ? "primary" : "dark"}
              className="mt-6 w-full"
              data-analytics={`pricing_${tier.name.toLowerCase().replace(/\s+/g, "_")}`}
            >
              {tier.cta.label}
            </ButtonLink>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-steel">{pricingNote}</p>

      {/* Monthly care: explicitly optional, and spelled out. */}
      <div className="mt-8 rounded border border-line bg-white p-6 sm:p-7">
        <h3 className="text-lg font-bold text-ink">Monthly website care is optional</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-steel">
          You are never required to buy it, and your website is yours either way. If you&apos;d rather not
          think about your site again, care starts at <strong className="text-ink">$75/month</strong> and
          covers:
        </p>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {careIncludes.map((c) => (
            <li key={c} className="flex gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-hivis-deep" aria-hidden="true" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-steel">Cancel any time. No long contracts.</p>
      </div>
    </div>
  );
}
