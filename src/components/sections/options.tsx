import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/**
 * Service-level navigation, deliberately placed LOW on the homepage.
 *
 * No large price figure here — the homepage's job is the story and the contact,
 * not package selection. Exact starting prices live on /pricing and the
 * service-detail pages, one click away, and we say so plainly.
 */
export function Options() {
  return (
    <Section tone="concrete" id="options">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <span className="eyebrow">Where to start</span>
          <h2 className="mt-4 text-display-md text-ink">
            Different businesses need different levels of help.
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-steel">
            From a focused first website to a custom lead system, {""}
            Groundwork recommends the simplest option that does the job.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-steel">
            Clear starting prices are available before you contact us — no forms to fill in first, and
            nothing to choose before you&apos;ve spoken to anyone.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
          <ButtonLink href="/services" variant="outline" size="lg" data-analytics="options_services">
            See Services
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline" size="lg" data-analytics="options_pricing">
            See Transparent Pricing
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" data-analytics="options_website_plan">
            Get My Free Website Plan
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
