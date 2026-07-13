import { ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroVisual } from "./hero-visual";

/**
 * The hero opens the story. It does NOT open with a price — the visitor hasn't
 * been given a reason to care about the number yet. Exact prices live on
 * /pricing and the service-detail pages, and are one click away.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-frame grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-rise">
          <span className="eyebrow">
            {siteStatus.hasRegion
              ? `Websites for local businesses in ${site.primaryRegion}`
              : "Websites for contractors & local service businesses"}
          </span>

          <h1 className="mt-5 text-display-xl text-ink">
            A better website can bring your business{" "}
            <span className="box-decoration-clone bg-[linear-gradient(to_top,#D8BE9E_0,#D8BE9E_0.32em,transparent_0.32em)] pb-1">
              better customers.
            </span>
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel">
            You already know how to do the work. {site.name} makes sure your website shows it — and gives
            the right customers an easy way to call, request a quote, or book.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" data-analytics="hero_primary_website_plan">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href="#what-we-build"
              variant="outline"
              size="lg"
              data-analytics="hero_secondary_what_we_build"
            >
              See What We Build
            </ButtonLink>
          </div>

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-steel">
            Tell us about the business. We&apos;ll recommend what the website should do, what it should
            include, and the most practical next step.
          </p>
        </div>

        <div className="animate-rise [animation-delay:120ms]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
