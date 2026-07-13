import { Section } from "@/components/ui/section";

/**
 * Consolidated from the old "trust bar" + "why us" + "benefits" sections, which
 * all made overlapping claims. One list, in the owner's language, no cards.
 */
const benefits: [string, string][] = [
  ["Look established", "Customers decide in seconds. A clean, professional site makes you the safe choice before anyone picks up the phone."],
  ["Make it easy to call", "Your number is one tap away on every page — no hunting for it while standing in a driveway."],
  ["Show your best work", "Photos of real jobs, laid out so people can actually see what you do."],
  ["Get better quote requests", "A short form that works on a phone, asking for the details you actually need."],
  ["Work properly on every phone", "Most people will find you on a phone. That's where we start, not where we compromise."],
  ["Be easier to find", "We set up the technical foundations that help search engines discover and understand your site — sitemaps, metadata, structured data, and Search Console."],
  ["Have someone there afterwards", "When your prices change or you add a service, you have someone to call."],
];

export function Benefits() {
  return (
    <Section tone="concrete">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">What it does for you</span>
          <h2 className="mt-4 text-display-md text-ink">
            A website should bring you work — not just sit there
          </h2>
          <p className="mt-5 max-w-prose leading-relaxed text-steel">
            Most small-business sites are slow, awkward on a phone, or obviously a template. Yours should
            do a job.
          </p>
        </div>

        <dl className="divide-y divide-line border-t border-line">
          {benefits.map(([title, copy]) => (
            <div key={title} className="grid gap-1.5 py-5 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6">
              <dt className="flex items-start gap-2.5 font-display text-lg font-bold text-ink">
                <span className="notch mt-2 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
                {title}
              </dt>
              <dd className="leading-relaxed text-steel">{copy}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
