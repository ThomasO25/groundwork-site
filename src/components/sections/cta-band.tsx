import { Phone, ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";

/** Reusable mid/bottom conversion band. Tone defaults to the dark ink section. */
export function CtaBand({
  title = "Ready for more calls and quotes?",
  subtitle = "Tell us about your business and we'll send a free, no-pressure quote — usually within one business day.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="container-frame py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="spec-label spec-label--dark">Get started</span>
            <h2 className="mt-3 text-display-md text-white">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{subtitle}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <ButtonLink href="/contact" size="lg">
              Get a free quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {siteStatus.hasPhone ? (
              <ButtonLink href={`tel:${site.contact.phoneHref}`} variant="outline" size="lg" className="border-white/25 text-white hover:border-white hover:bg-white/5">
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
