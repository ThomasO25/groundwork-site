import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getVisibleProjects } from "@/content/portfolio";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

/**
 * Renders ONLY projects cleared for display (permissionToDisplay). When there
 * are none, shows an honest "projects being added" state instead of fake work.
 */
export function PortfolioGrid({ limit }: { limit?: number }) {
  const all = getVisibleProjects();
  const items = limit ? all.slice(0, limit) : all;

  if (items.length === 0) {
    return (
      <div className="rounded border border-dashed border-line bg-concrete px-6 py-14 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">Portfolio</p>
        <h3 className="mt-3 text-xl font-bold text-ink">Recent projects are being added</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-steel">
          We&apos;re putting together a showcase of recent work. In the meantime, we&apos;re happy to
          walk you through relevant examples and references directly.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded bg-hivis px-5 py-2.5 text-sm font-semibold text-ink hover:bg-hivis-deep"
        >
          Ask to see our work
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <figure key={p.slug} className="flex flex-col">
          <ImagePlaceholder
            src={p.desktopScreenshot}
            alt={`${p.name} — ${p.industry} website`}
            label="Add a real screenshot of the finished site."
            ratio="aspect-[16/10]"
          />
          <figcaption className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-ink">{p.name}</h3>
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-steel hover:text-ink"
                >
                  Visit <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-steel">
              {p.industry} · {p.location}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-steel">{p.problem}</p>
            {p.outcome ? (
              <p className="mt-2 inline-block rounded-sm bg-concrete px-2 py-0.5 text-xs font-medium text-ink">
                {p.outcome}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
