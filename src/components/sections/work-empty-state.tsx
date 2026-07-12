import { ArrowRight, Search, Smartphone, PhoneCall, KeyRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site, siteStatus } from "@/config/site";

/**
 * Shown on /work until real, permitted projects are configured.
 *
 * It is deliberately persuasive but completely honest: it makes no claim about
 * past clients, results, or volume. It explains WHY nothing is shown (we only
 * publish client work with permission), states what every build includes, and
 * offers a real next step. No fake screenshots, logos, or mockups.
 */
const included: [typeof Search, string, string][] = [
  [Smartphone, "Built for phones first", "Most of your customers will find you on a phone. That's where we start."],
  [PhoneCall, "Made to get calls", "Tap-to-call and a short quote form on every page — no hunting for your number."],
  [Search, "Set up to be found", "The local search basics done properly, so nearby customers actually see you."],
  [KeyRound, "Yours to keep", "The site, the domain, the content. No lock-in, no hostage situation."],
];

export function WorkEmptyState() {
  return (
    <div className="rounded border border-line bg-white">
      <div className="border-b border-line px-6 py-10 text-center sm:px-10 sm:py-14">
        <span className="spec-label justify-center">Portfolio</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-display-md text-ink">
          We only publish client work with their permission
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-steel">
          Rather than fill this page with stock images or someone else&apos;s work, we&apos;re documenting
          recent builds properly and adding them here as clients sign off. It takes a little longer — we
          think that&apos;s the right trade.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-steel">
          In the meantime, ask us. We&apos;ll happily walk you through relevant examples and what we&apos;d
          do for a business like yours — no pitch, no pressure.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg" data-analytics="work_empty_primary">
            Get My Free Website Plan
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          {siteStatus.hasPhone ? (
            <ButtonLink href={`tel:${site.contact.phoneHref}`} variant="outline" size="lg">
              Call and ask to see our work
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-7 px-6 py-10 sm:grid-cols-2 sm:px-10">
        {included.map(([Icon, title, copy]) => (
          <div key={title} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-concrete">
              <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-steel">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
