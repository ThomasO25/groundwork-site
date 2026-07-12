import { Section, SectionHeader } from "@/components/ui/section";

// A real, ordered sequence — numbering is meaningful here.
const steps = [
  {
    n: "01",
    title: "Quick call",
    body: "We learn your business, your best jobs, and where your leads come from. No jargon, no pressure.",
  },
  {
    n: "02",
    title: "Written scope",
    body: "You get a clear plan: pages, timeline, and price in writing before any work starts.",
  },
  {
    n: "03",
    title: "Design & build",
    body: "We design mobile-first around your customers and build a fast, secure site with your real content.",
  },
  {
    n: "04",
    title: "Launch & grow",
    body: "We handle launch, submit your site to Google, and stay on to keep it running and bringing in work.",
  },
];

export function Process() {
  return (
    <Section tone="concrete">
      <SectionHeader
        label="How it works"
        title="A simple, no-surprises process"
        intro="You always know what's happening, what it costs, and what's next."
      />
      <ol className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="bg-paper p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl font-medium text-hivis-deep">{s.n}</span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
