import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { WorkEmptyState } from "@/components/sections/work-empty-state";
import { Section } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata } from "@/lib/seo";
import { getVisibleProjects } from "@/content/portfolio";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "Websites we've built for contractors and local service businesses — real projects and screenshots, published with each client's permission.",
  path: "/work",
});

export default function WorkPage() {
  const hasWork = getVisibleProjects().length > 0;

  return (
    <>
      <Section tone="paper">
        {hasWork ? (
          <>
            <div className="max-w-prose">
              <span className="eyebrow">Our work</span>
              <h1 className="mt-4 text-display-lg text-ink">Sites built to bring in business</h1>
              <p className="mt-5 text-lg leading-relaxed text-steel">
                Every project is designed around the company&apos;s real customers and the things that
                actually bring them work: calls, quote requests, and booked jobs. We publish work — and any
                results — only with the client&apos;s permission.
              </p>
            </div>
            <div className="mt-14">
              <PortfolioGrid />
            </div>
          </>
        ) : (
          <>
            <h1 className="sr-only">Our work</h1>
            <WorkEmptyState />
          </>
        )}
      </Section>

      <CtaBand title="Want your business here next?" />
    </>
  );
}
