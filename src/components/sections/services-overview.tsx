import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { Section, SectionHeader } from "@/components/ui/section";

export function ServicesOverview() {
  return (
    <Section tone="paper" id="services">
      <SectionHeader
        label="What we build"
        title="Three ways to get more work"
        intro="Start where you are. Every tier is built to bring in calls and quotes — and to grow with your business."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex flex-col rounded border border-line bg-white p-6 transition-colors hover:border-ink"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-concrete text-ink">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">{s.code}</span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">{s.summary}</p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-sm font-medium text-ink">{s.priceFrom}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                See what&apos;s included
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
