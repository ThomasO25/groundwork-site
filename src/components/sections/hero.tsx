import { ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroVisual } from "./hero-visual";
import { getVisibleProjects } from "@/content/portfolio";

export function Hero() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-frame grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
        {/* ---------------- Left: the promise + the offer ---------------- */}
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
            {site.name} builds professional websites for contractors and local service businesses —
            designed to turn searches into calls, quote requests, and booked work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" data-analytics="hero_primary_website_plan">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={hasWork ? "/work" : "#how-it-works"}
              variant="outline"
              size="lg"
              data-analytics={hasWork ? "hero_secondary_see_work" : "hero_secondary_process"}
            >
              {hasWork ? "See Real Projects" : "See How It Works"}
            </ButtonLink>
          </div>

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-steel">
            Free and no-pressure. See what your website should include and what it would cost before
            deciding anything.
          </p>
        </div>

        {/* ---------------- Right: honest design demonstration ---------------- */}
        <div className="animate-rise [animation-delay:120ms]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
