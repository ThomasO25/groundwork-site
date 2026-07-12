import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Section } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "Websites we've built for local service businesses. Real projects and screenshots are added here as they launch.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Section tone="paper">
        <div className="max-w-3xl">
          <span className="spec-label">Our work</span>
          <h1 className="mt-3 text-display-lg text-ink">Sites built to bring in business</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Each project is designed around the company&apos;s real customers and the actions that drive
            their calls and quotes. We add projects here as they launch — and we only publish work and
            results with the client&apos;s permission.
          </p>
        </div>
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </Section>

      <CtaBand title="Want your business here next?" />
    </>
  );
}
