import { Section, SectionHeader } from "@/components/ui/section";

/**
 * The "what this actually does for your business" section.
 * Written for a busy owner, not a developer — every point is an outcome, never
 * a technology. No guarantees, no invented numbers.
 */
const benefits: [string, string][] = [
  [
    "You look established",
    "Customers judge you in seconds. A clean, professional site makes you look like the safe choice — before anyone picks up the phone.",
  ],
  [
    "You get more calls",
    "Your phone number is one tap away on every page, so someone standing in their driveway can reach you without hunting for it.",
  ],
  [
    "You get more quote requests",
    "A short, simple form that works on a phone. People tell you what they need, and it lands in your inbox.",
  ],
  [
    "Customers can find you",
    "We set up the basics properly so you show up when people nearby search for what you do.",
  ],
  [
    "It saves you time",
    "Requests arrive with the details you actually need, so you spend less time chasing people and more time on the job.",
  ],
  [
    "No pressure, ever",
    "A short conversation, a clear written plan, and a fixed starting price. You decide from there.",
  ],
];

export function Benefits() {
  return (
    <Section tone="ink">
      <SectionHeader
        dark
        label="Why it matters"
        title="A website should bring you work — not just sit there"
        intro="Most small-business sites are slow, hard to use on a phone, or clearly a template. Yours should do a job."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(([title, copy]) => (
          <li key={title} className="rounded border border-line-dark bg-graphite p-6">
            <span className="block h-[3px] w-8 bg-hivis" aria-hidden="true" />
            <p className="mt-4 font-semibold text-white">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{copy}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
