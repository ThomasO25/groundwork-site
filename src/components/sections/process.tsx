import { Section, SectionHeader } from "@/components/ui/section";

// A real, ordered sequence — numbering is meaningful here.
const steps = [
  {
    n: "01",
    title: "A short call",
    body: "We learn your business, your best jobs, and where your work comes from now. No jargon, no pressure, no obligation.",
  },
  {
    n: "02",
    title: "Your free website plan",
    body: "You get a clear written plan — what your site should do, what it will include, the timeline, and the price — before you commit to anything.",
  },
  {
    n: "03",
    title: "Design & build",
    body: "We design around your customers — starting with how it looks on a phone — and build it with your real photos and words.",
  },
  {
    n: "04",
    title: "Launch & support",
    body: "We handle the launch, get you listed with Google, and stay available afterwards to keep it running well.",
  },
];

export function Process() {
  return (
    <Section tone="concrete" id="process">
      <SectionHeader
        label="How it works"
        title="A simple, no-surprises process"
        intro="You always know what's happening, what it costs, and what's next. You can stop after the plan — it's yours either way."
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
