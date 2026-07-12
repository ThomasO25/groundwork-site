import { Check } from "lucide-react";
import { pricingTiers, pricingNote } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingTiers({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <div className="max-w-2xl">
          <span className="spec-label">Pricing</span>
          <h2 className="mt-3 text-display-md text-ink">Straightforward pricing that scales with you</h2>
        </div>
      ) : null}

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.code}
            className={cn(
              "flex flex-col rounded border bg-white p-6",
              tier.featured ? "border-ink ring-1 ring-ink" : "border-line"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">{tier.code}</span>
              {tier.featured ? (
                <span className="rounded-sm bg-hivis px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
                  Most popular
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 text-xl font-bold text-ink">{tier.name}</h3>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{tier.price}</p>
            {tier.financing ? <p className="mt-1 text-sm text-steel">{tier.financing}</p> : null}
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-steel">{tier.care}</p>

            <p className="mt-4 text-sm leading-relaxed text-steel">{tier.blurb}</p>

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
            >
              {tier.cta.label}
            </ButtonLink>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-steel">{pricingNote}</p>
    </div>
  );
}
