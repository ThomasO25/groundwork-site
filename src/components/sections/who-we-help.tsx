import { Section } from "@/components/ui/section";

/**
 * Deliberately NOT a grid of near-identical icon cards. A short sentence and a
 * simple inline list of trades reads faster and makes clear we aren't only a
 * construction-industry studio.
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

export function WhoWeHelp() {
  return (
    <Section tone="paper" className="py-14 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <span className="eyebrow">Who we help</span>
          <h2 className="mt-4 text-display-md text-ink">
            If customers find you by searching, we can help
          </h2>
        </div>

        <div>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5">
            {trades.map((t) => (
              <li
                key={t}
                className="rounded border border-line bg-surface px-3.5 py-2 text-[0.95rem] text-ink"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-steel">
            Not on the list? That&apos;s fine — the work is the same. If people look you up before they
            call, a good website earns you the job.
          </p>
        </div>
      </div>
    </Section>
  );
}
