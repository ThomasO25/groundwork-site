import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getVisibleProjects } from "@/content/portfolio";

/**
 * Renders ONLY projects cleared for display (permissionToDisplay).
 * Returns null when there are none — the homepage hides its whole section and
 * /work shows <WorkEmptyState />. Never renders an invented project or result.
 *
 * The screenshot is the dominant visual. No icons, no decorative chrome.
 */
export function PortfolioGrid({ limit }: { limit?: number }) {
  const all = getVisibleProjects();
  const items = limit ? all.slice(0, limit) : all;
  if (items.length === 0) return null;

  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
      {items.map((p) => (
        <figure key={p.slug} className="group flex flex-col" data-analytics-portfolio={p.slug}>
          <div className="relative">
            {p.desktopScreenshot ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-concrete shadow-soft transition-shadow group-hover:shadow-lift">
                <Image
                  src={p.desktopScreenshot}
                  alt={`The ${p.name} website, shown on a desktop screen`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}

            {/* Real mobile capture, inset — not a mockup. */}
            {p.mobileScreenshot ? (
              <div className="absolute -bottom-6 right-5 hidden w-[19%] max-w-[110px] overflow-hidden rounded-md border-4 border-ink bg-surface shadow-lift sm:block">
                <div className="relative aspect-[9/19]">
                  <Image
                    src={p.mobileScreenshot}
                    alt={`The ${p.name} website, shown on a phone`}
                    fill
                    className="object-cover object-top"
                    sizes="110px"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <figcaption className={p.mobileScreenshot ? "mt-10" : "mt-6"}>
            <p className="text-sm font-semibold text-gold-deep">
              {[p.industry, p.location].filter(Boolean).join(" · ")}
            </p>

            <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-2xl font-bold text-ink">{p.name}</h3>
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  Visit the live site
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            <p className="mt-3 max-w-prose leading-relaxed text-steel">{p.problem}</p>
            <p className="mt-2 max-w-prose leading-relaxed text-steel">
              <span className="font-semibold text-ink">What we built: </span>
              {p.workCompleted}
            </p>

            {/* Only ever shown when the owner supplied a verified, permitted result. */}
            {p.outcome ? (
              <p className="mt-4 inline-block rounded-sm bg-sand px-3 py-1.5 text-sm font-semibold text-ink">
                {p.outcome}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
