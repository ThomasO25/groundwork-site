import { Check, Minus } from "lucide-react";
import { pricingTiers, pricingNote, notSureNote, care, paymentTerms } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/button";
import { siteStatus } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Four starting prices, one care panel, one payment-terms panel.
 * No fake "most popular" badge — the Business Website carries a descriptive
 * label instead. Nobody is required to pick a package before getting in touch.
 */
export function PricingTiers({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading ? (
        <div className="max-w-prose">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-display-md text-ink">Starting prices, written down before you commit</h2>
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier) => (
          <div
            key={tier.slug}
            className={cn(
              "flex flex-col rounded-lg border p-6",
              tier.featured ? "border-gold bg-surface shadow-soft" : "border-line bg-surface/60"
            )}
          >
            {tier.label ? (
              <span className="mb-4 self-start rounded-sm bg-sand px-2.5 py-1 text-xs font-semibold text-ink">
                {tier.label}
              </span>
            ) : null}

            <h3 className="font-display text-xl font-bold text-ink">{tier.name}</h3>
            <p className="mt-2.5 font-display text-2xl font-extrabold text-ink">{tier.price}</p>
            <p className="mt-3.5 leading-relaxed text-steel">{tier.blurb}</p>

            {tier.priceBasis ? (
              <p className="mt-4 rounded border border-line bg-concrete/70 px-3.5 py-3 text-sm leading-relaxed text-steel">
                {tier.priceBasis}
              </p>
            ) : null}

            <ul className="mt-5 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem] text-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            {/* Only the Starter Site states its limits — so it can't quietly
                become the Business Website through scope creep. */}
            {tier.limits ? (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink">Kept deliberately simple</p>
                <ul className="mt-2.5 space-y-2">
                  {tier.limits.map((l) => (
                    <li key={l} className="flex gap-2.5 text-sm text-steel">
                      <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-steel/60" aria-hidden="true" />
                      <span className="leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ButtonLink
              href={tier.cta.href}
              variant={tier.featured ? "primary" : "outline"}
              className="mt-6 w-full"
              data-analytics={`pricing_${tier.slug}`}
            >
              {tier.cta.label}
            </ButtonLink>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-prose leading-relaxed text-steel">{pricingNote}</p>
      <p className="mt-3 max-w-prose leading-relaxed text-steel">
        <strong className="font-semibold text-ink">{notSureNote.split("?")[0]}?</strong>
        {notSureNote.split("?")[1]}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-7">
          <h3 className="font-display text-xl font-bold text-ink">{paymentTerms.heading}</h3>
          <p className="mt-3 leading-relaxed text-steel">{paymentTerms.body}</p>
          <p className="mt-3 leading-relaxed text-steel">{paymentTerms.care}</p>
          {/* Payment methods are only stated once the owner's account is actually
              live and tested — we don't promise a payment option that isn't ready. */}
          {siteStatus.hasPaymentMethods ? (
            <p className="mt-3 leading-relaxed text-steel">{paymentTerms.methods}</p>
          ) : null}
        </div>

        <div className="rounded-lg border border-line bg-surface p-7">
          <h3 className="font-display text-xl font-bold text-ink">Website care — optional</h3>
          <p className="mt-1.5 font-display text-lg font-bold text-ink">{care.price}</p>
          <p className="mt-3 leading-relaxed text-steel">{care.summary}</p>
          <ul className="mt-4 space-y-2.5">
            {care.includes.map((c) => (
              <li key={c} className="flex gap-2.5 text-[0.95rem] text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-steel">{care.note}</p>
        </div>
      </div>
    </div>
  );
}
