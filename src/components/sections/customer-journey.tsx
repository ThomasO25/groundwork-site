import { Section } from "@/components/ui/section";

/**
 * FOUND → TRUST → CONTACT → FOLLOW-UP
 *
 * Deliberately NOT four icon cards, not a dashboard, not a floating diagram.
 *
 * The layout is an editorial stepped rail: one continuous line runs down the
 * page, each stage indents a little further, and the stage numeral is typeset
 * rather than boxed. It reads as a journey moving forward, which is the point —
 * a 2×2 grid of cards would say "four features" instead of "one path".
 */
const stages: { n: string; title: string; lead: string; body: string }[] = [
  {
    n: "01",
    title: "Found",
    lead: "They have to be able to reach you in the first place.",
    body: "Your services stated clearly, the areas you actually cover, a page structure that makes sense, and the technical foundations that help search engines discover and understand the site.",
  },
  {
    n: "02",
    title: "Trust",
    lead: "Then they decide, quickly, whether you look like the safe choice.",
    body: "Real photos of real jobs. Reviews and credentials where they'll be seen. Plain explanations of what you do. A site that looks like it belongs to a business that's still trading.",
  },
  {
    n: "03",
    title: "Contact",
    lead: "And it has to be effortless to actually reach you.",
    body: "Tap-to-call, a quote request that takes a minute, appointment booking, or a payment path — whichever of those actually suits how your business works.",
  },
  {
    n: "04",
    title: "Follow-up",
    lead: "For some businesses, the work continues after the enquiry lands.",
    body: "Email follow-up, customer management, admin tools, and automation — for businesses that genuinely need them. Plenty don't, and we'll say so.",
  },
];

export function CustomerJourney() {
  return (
    <Section tone="paper" id="the-journey">
      <div className="max-w-prose">
        <span className="eyebrow">How a customer actually arrives</span>
        <h2 className="mt-4 text-display-md text-ink">
          Four things have to go right before the phone rings
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-steel">
          A website isn&apos;t one job — it&apos;s four, in order. Miss any one of them and the customer
          quietly moves on to the next business, and you never hear about it.
        </p>
      </div>

      <ol className="mt-14 space-y-0">
        {stages.map((s, i) => (
          <li
            key={s.n}
            className="relative border-l border-line pb-10 pl-7 last:border-l-0 last:pb-0 sm:pl-10"
            // Each stage steps further in — the path moves forward down the page.
            style={{ marginLeft: `${i * 8}px` }}
          >
            {/* stage marker on the rail */}
            <span
              className="notch absolute -left-[7px] top-1.5 h-3.5 w-3.5 bg-gold sm:-left-[7px]"
              aria-hidden="true"
            />
            {/* the rail continues past the final marker, so the story doesn't stop dead */}
            {i === stages.length - 1 ? (
              <span
                className="absolute -left-px top-1.5 h-3.5 w-px bg-line"
                aria-hidden="true"
              />
            ) : null}

            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-[auto_1fr] sm:items-baseline">
              <span
                className="font-display text-3xl font-extrabold text-sand sm:text-4xl"
                aria-hidden="true"
              >
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-prose text-lg leading-relaxed text-ink">{s.lead}</p>
                <p className="mt-2 max-w-prose leading-relaxed text-steel">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
