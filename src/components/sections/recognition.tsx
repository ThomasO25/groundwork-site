import { Section } from "@/components/ui/section";

/**
 * The recognition beat — the moment the visitor thinks "that's my situation".
 *
 * Constructive, not fear-based: the point isn't that the visitor is failing, it's
 * that the comparison happens whether or not anyone is ready for it. No invented
 * percentages, no unsupported statistics, no scare tactics.
 */
const trades = [
  "Contractors",
  "Home services",
  "Electricians",
  "Plumbers",
  "Landscapers",
  "Window tinting",
  "Auto services",
  "Marine & boat",
  "Industrial & forklift",
  "Gyms & trainers",
];

export function Recognition() {
  return (
    <Section tone="concrete">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">The situation</span>
          <h2 className="mt-4 text-display-md text-ink">
            You can be the best company in town and still lose the call online.
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel">
            It usually has nothing to do with the quality of your work. It happens earlier than that — in
            the two minutes before anyone picks up the phone.
          </p>
        </div>

        {/* The comparison, told as a short narrative rather than a stat block. */}
        <div>
          <ol className="space-y-6 border-l border-line pl-7">
            <li className="relative">
              <span className="notch absolute -left-[35px] top-2 h-2.5 w-2.5 bg-gold" aria-hidden="true" />
              <p className="leading-relaxed text-ink">
                Someone nearby needs what you do, so they search for it on their phone.
              </p>
            </li>
            <li className="relative">
              <span className="notch absolute -left-[35px] top-2 h-2.5 w-2.5 bg-gold" aria-hidden="true" />
              <p className="leading-relaxed text-ink">
                They open three or four businesses in separate tabs — yours among them.
              </p>
            </li>
            <li className="relative">
              <span className="notch absolute -left-[35px] top-2 h-2.5 w-2.5 bg-gold" aria-hidden="true" />
              <p className="leading-relaxed text-ink">
                One site is slow, vague about what it actually does, clearly a few years old, and the phone
                number takes three scrolls to find.
              </p>
            </li>
            <li className="relative">
              <span className="notch absolute -left-[35px] top-2 h-2.5 w-2.5 bg-gold" aria-hidden="true" />
              <p className="leading-relaxed text-ink">
                Another shows the work, names the services, says where it operates, and makes the next step
                obvious.
              </p>
            </li>
            <li className="relative">
              <span
                className="notch absolute -left-[35px] top-2 h-2.5 w-2.5 bg-gold-deep"
                aria-hidden="true"
              />
              <p className="font-semibold leading-relaxed text-ink">
                The better-presented company is the one that gets the chance to quote — even when
                it&apos;s not the better company.
              </p>
            </li>
          </ol>

          <div className="mt-9 border-t border-line pt-7">
            <p className="text-[0.95rem] font-semibold text-ink">
              This applies to almost any trade where people look you up first:
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-2.5">
              {trades.map((t) => (
                <li
                  key={t}
                  className="rounded border border-line bg-surface px-3.5 py-2 text-[0.95rem] text-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-relaxed text-steel">
              Not on the list? The job&apos;s the same. If customers check you out before they call, the
              website is doing the introduction for you — whether you built it that way or not.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
