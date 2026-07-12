import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site, siteStatus } from "@/config/site";

/**
 * Shown on /work until real, permitted projects exist.
 *
 * Persuasive but completely honest: it makes NO claim about past clients,
 * results, or volume, and does not hint at "confidential projects" we can't
 * prove. It explains why nothing is shown, states what every build includes,
 * and offers a real next step. No fake screenshots, logos, or stock imagery.
 */
const included: [string, string][] = [
  ["Built for phones first", "Most of your customers will find you on a phone. That's where we start."],
  ["Made to get calls", "Tap-to-call and a short quote form on every page."],
  ["Set up to be found", "The local search basics, done properly."],
  ["Yours to keep", "The site, the domain, the content. No lock-in."],
];

export function WorkEmptyState() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
      <div className="relative px-6 py-14 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="notch absolute -right-10 -top-10 h-40 w-40 bg-concrete"
        />
        <div className="relative">
          <Image
            src="/brand/groundwork-mark-light.png"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="mx-auto"
          />
          <h2 className="mx-auto mt-6 max-w-2xl text-display-md text-ink">
            We only publish client work with their permission
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-steel">
            Rather than fill this page with stock images or someone else&apos;s work, we&apos;re
            documenting recent builds properly and adding them here as clients sign off. It takes a little
            longer — we think that&apos;s the right trade.
          </p>
          <p className="mx-auto mt-4 max-w-prose leading-relaxed text-steel">
            In the meantime, just ask. We&apos;ll walk you through what we&apos;d do for a business like
            yours — no pitch, no pressure.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
      </div>

      <div className="grid gap-x-10 gap-y-6 border-t border-line bg-concrete/60 px-6 py-10 sm:grid-cols-2 sm:px-12">
        {included.map(([title, copy]) => (
          <div key={title} className="flex gap-3">
            <span className="notch mt-2 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
            <div>
              <p className="font-display font-bold text-ink">{title}</p>
              <p className="mt-1 leading-relaxed text-steel">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
