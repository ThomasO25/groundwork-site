import { Section } from "@/components/ui/section";

/** Each step says what YOU get, not just what we do. */
const steps: { title: string; body: string; receive: string }[] = [
  {
    title: "A short conversation",
    body: "We ask about the business, the jobs you actually want more of, and where your work comes from now. No jargon and no obligation.",
    receive: "You get: an honest read on whether a new website would even help.",
  },
  {
    title: "A written website plan",
    body: "We put the recommendation in writing — what the site should do, the pages and features that matter, the service level that fits, and a starting or estimated price.",
    receive: "You get: the plan itself, yours to keep, whether or not you hire us.",
  },
  {
    title: "Design and build",
    body: "We design around your customers — starting with how it looks in one hand — and build it with your real photos and words. You see it as it comes together.",
    receive: "You get: a site built to an agreed scope, with revision rounds included.",
  },
  {
    title: "Launch and support",
    body: "We handle the launch and set up the technical foundations that help search engines discover and understand the site.",
    receive: "You get: post-launch bug support, and someone to call afterwards.",
  },
];

export function Process() {
  return (
    <Section tone="paper" id="how-it-works">
      <div className="max-w-prose">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-4 text-display-md text-ink">Four steps, and you can stop after the second</h2>
        <p className="mt-5 text-lg leading-relaxed text-steel">
          The plan is free and it&apos;s yours either way. Nothing is committed until you&apos;ve seen the
          scope and the price in writing.
        </p>
      </div>

      <ol className="relative mt-14 border-l border-line pl-8 sm:pl-10">
        {steps.map((s, i) => (
          <li key={s.title} className={i === steps.length - 1 ? "relative" : "relative pb-11"}>
            <span
              className="notch absolute -left-[41px] top-1 h-3.5 w-3.5 bg-gold sm:-left-[49px]"
              aria-hidden="true"
            />
            <div className="grid gap-1.5 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-7">
              <span className="font-display text-sm font-bold text-gold-deep">Step {i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-prose leading-relaxed text-steel">{s.body}</p>
                <p className="mt-2.5 max-w-prose text-[0.95rem] font-medium leading-relaxed text-ink">
                  {s.receive}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
