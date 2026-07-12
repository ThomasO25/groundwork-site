import { Check, ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getVisibleProjects } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const proofPoints = [
  "More calls and quote requests",
  "Looks established and trustworthy",
  "Easy to find, fast on every phone",
];

export function Hero() {
  const hasWork = getVisibleProjects().length > 0;
  const hasImage = siteStatus.hasHeroImage;

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Faint engineered grid — restrained, part of the Groundwork identity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0E1518 1px, transparent 1px), linear-gradient(to bottom, #0E1518 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 80% at 80% 0%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 80% 0%, black, transparent 70%)",
          opacity: 0.05,
        }}
      />

      <div
        className={cn(
          "container-frame relative items-center gap-12 py-16 sm:py-20 lg:py-24",
          hasImage ? "grid lg:grid-cols-[1.05fr_0.95fr]" : "grid"
        )}
      >
        <div className={cn(!hasImage && "max-w-3xl")}>
          <span className="spec-label">
            For contractors &amp; local service businesses
            {siteStatus.hasRegion ? ` · ${site.primaryRegion}` : ""}
          </span>

          <h1 className="mt-4 text-display-xl text-ink">
            A better website can bring your business{" "}
            {/* Amber underline drawn as a background gradient so it survives line
                wrapping — `whitespace-nowrap` here would overflow a 320px screen. */}
            <span className="box-decoration-clone bg-[linear-gradient(to_top,#F2A20C_0,#F2A20C_5px,transparent_5px)] pb-1">
              better customers.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            {site.name} builds fast, professional websites for contractors and local service businesses —
            designed to turn searches into calls, quote requests, and booked work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" data-analytics="hero_primary_website_plan">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {/* Only promise "real projects" when real, permitted projects exist —
                otherwise this CTA would lead to an empty page. */}
            {hasWork ? (
              <ButtonLink href="/work" variant="outline" size="lg" data-analytics="hero_secondary_see_work">
                See Real Projects
              </ButtonLink>
            ) : (
              <ButtonLink href="#process" variant="outline" size="lg" data-analytics="hero_secondary_process">
                See how it works
              </ButtonLink>
            )}
          </div>

          <p className="mt-5 text-sm text-steel">
            Free, no-pressure. You&apos;ll get a short plan for what your site should do — whether or not you
            hire us.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {proofPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <Check className="h-4 w-4 text-hivis" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero image is optional. With none configured, nothing renders here in
            production and the hero stays a clean, intentional typographic block. */}
        {hasImage ? (
          <div>
            <ImagePlaceholder
              src={site.media.heroImage}
              alt="Recent work by Groundwork"
              label="Hero image: your best finished site, your crew, or your work."
              ratio="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
