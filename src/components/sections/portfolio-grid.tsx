import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getVisibleProjects } from "@/content/portfolio";

/**
 * Renders ONLY projects cleared for display (permissionToDisplay).
 * Returns null when there are none — callers decide what to show instead
 * (the homepage hides its whole section; /work shows <WorkEmptyState />).
 *
 * Never renders an invented project, screenshot, or result.
 */
export function PortfolioGrid({ limit }: { limit?: number }) {
  const all = getVisibleProjects();
  const items = limit ? all.slice(0, limit) : all;
  if (items.length === 0) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((p) => (
        <figure key={p.slug} className="flex flex-col" data-analytics-portfolio={p.slug}>
          <div className="relative">
            {/* Desktop screenshot — the main visual. */}
            {p.desktopScreenshot ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-line bg-concrete">
                <Image
                  src={p.desktopScreenshot}
                  alt={`${p.name} website, shown on desktop`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}

            {/* Real mobile screenshot, inset. Not a mockup — an actual capture. */}
            {p.mobileScreenshot ? (
              <div className="absolute -bottom-5 right-5 hidden w-[22%] overflow-hidden rounded border border-line bg-white shadow-bar sm:block">
                <div className="relative aspect-[9/19]">
                  <Image
                    src={p.mobileScreenshot}
                    alt={`${p.name} website, shown on a phone`}
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <figcaption className={p.mobileScreenshot ? "mt-9" : "mt-5"}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-bold text-ink">{p.name}</h3>
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-hivis-deep"
                >
                  Visit site
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-steel">
              {[p.industry, p.location].filter(Boolean).join(" · ")}
            </p>

            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel">
              <span className="font-medium text-ink">The problem:</span> {p.problem}
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-steel">
              <span className="font-medium text-ink">What we did:</span> {p.workCompleted}
            </p>

            {p.features.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-sm border border-line bg-concrete px-2.5 py-1 font-mono text-[11px] text-ink"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Only ever shown when the owner supplied a verified, permitted result. */}
            {p.outcome ? (
              <p className="mt-4 inline-block rounded-sm bg-hivis/15 px-3 py-1.5 text-sm font-semibold text-ink">
                {p.outcome}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
