import { Phone, ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";

export function CtaBand({
  title = "Tell us about your business.",
  subtitle = "We'll send back a practical recommendation for what your website should do, what it would include, and what the next step would cost. No pressure, and the plan is yours either way.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="notch absolute -right-16 -top-16 h-56 w-56 bg-white/[0.03]" />
      <div className="container-frame relative py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow--dark">Get started</span>
            <h2 className="mt-4 text-display-md text-paper">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">{subtitle}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <ButtonLink href="/contact" variant="accent" size="lg" data-analytics="cta_band_website_plan">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {siteStatus.hasPhone ? (
              <ButtonLink href={`tel:${site.contact.phoneHref}`} variant="outline-dark" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
