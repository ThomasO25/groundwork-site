import { Section } from "@/components/ui/section";

const steps: [string, string][] = [
  [
    "A short conversation",
    "We ask about your business, your best jobs, and where your work comes from now. No jargon, no obligation.",
  ],
  [
    "Your free website plan",
    "You get it in writing: what your site should do, what it includes, how long it takes, and what it costs. Yours to keep either way.",
  ],
  [
    "Design and build",
    "We design around your customers — starting with how it looks in one hand — and build it with your real photos and words.",
  ],
  [
    "Launch and support",
    "We handle the launch and get you listed with Google. Afterwards, you still have someone to call.",
  ],
];

export function Process() {
  return (
    <Section tone="paper" id="how-it-works">
      <div className="max-w-prose">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-4 text-display-md text-ink">Four steps, no surprises</h2>
        <p className="mt-5 leading-relaxed text-steel">
          You always know what&apos;s happening, what it costs, and what&apos;s next. You can stop after
          the plan.
        </p>
      </div>

      {/* A flowing timeline: one continuous rule, staggered entries. */}
      <ol className="relative mt-12 border-l border-line pl-8 sm:pl-10">
        {steps.map(([title, body], i) => (
          <li key={title} className={i === steps.length - 1 ? "relative" : "relative pb-10"}>
            {/* node on the rule */}
            <span
              className="notch absolute -left-[41px] top-1 h-3.5 w-3.5 bg-gold sm:-left-[49px]"
              aria-hidden="true"
            />
            <div className="grid gap-1.5 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-6">
              <span className="font-display text-sm font-bold text-gold-deep">
                Step {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
                <p className="mt-1.5 max-w-prose leading-relaxed text-steel">{body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
