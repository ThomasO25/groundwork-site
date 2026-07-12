import Image from "next/image";

/**
 * HERO VISUAL — an honest demonstration of responsive website design.
 *
 * This is NOT a fake client site and NOT a SaaS dashboard. It is an abstract
 * layout study: a desktop frame and a phone frame showing the *shape* of a
 * well-built local-business page — a header with the real Groundwork mark, a
 * headline block, an image area, a call button, and a service row.
 *
 * Deliberately contains no invented client name, testimonial, statistic, chart,
 * lead count, or result. The content blocks are visibly abstract (tone bars),
 * so nothing pretends to be finished client work. A caption states what it is.
 */
export function HeroVisual() {
  return (
    <div className="relative">
      {/* Angular brand motif behind the frames — the G's 45° cut, used once. */}
      <div
        aria-hidden="true"
        className="notch absolute -right-6 -top-8 hidden h-40 w-40 bg-concrete lg:block"
      />

      <figure className="relative">
        {/* ---- Desktop frame ---- */}
        <div className="relative overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
          {/* window chrome — plain, three dots, no fake URL or fake tabs */}
          <div className="flex items-center gap-1.5 border-b border-line bg-concrete/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
          </div>

          <div className="p-5 sm:p-6">
            {/* site header row */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/brand/groundwork-mark-light.png"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                />
                <span className="h-2 w-16 rounded-sm bg-ink/80" aria-hidden="true" />
              </span>
              <span className="hidden items-center gap-3 sm:flex" aria-hidden="true">
                <span className="h-1.5 w-8 rounded-sm bg-line" />
                <span className="h-1.5 w-8 rounded-sm bg-line" />
                <span className="h-6 w-16 rounded-sm bg-ink" />
              </span>
            </div>

            {/* headline + copy + button, all abstract */}
            <div className="mt-6 grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
              <div aria-hidden="true">
                <span className="block h-3.5 w-[85%] rounded-sm bg-ink/80" />
                <span className="mt-2 block h-3.5 w-[62%] rounded-sm bg-ink/80" />
                <span className="mt-4 block h-1.5 w-full rounded-sm bg-line" />
                <span className="mt-1.5 block h-1.5 w-[80%] rounded-sm bg-line" />
                <span className="mt-5 block h-8 w-32 rounded-sm bg-gold" />
              </div>
              <div
                aria-hidden="true"
                className="aspect-[4/3] rounded-sm border border-line bg-concrete"
              />
            </div>

            {/* service row */}
            <div className="mt-6 grid grid-cols-3 gap-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-sm border border-line p-3">
                  <span className="block h-4 w-4 rounded-sm bg-gold/60" />
                  <span className="mt-2.5 block h-1.5 w-full rounded-sm bg-line" />
                  <span className="mt-1.5 block h-1.5 w-2/3 rounded-sm bg-line" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Phone frame, overlapping ---- */}
        <div className="absolute -bottom-8 -left-4 w-[112px] overflow-hidden rounded-md border-4 border-ink bg-surface shadow-lift sm:-left-8 sm:w-[132px]">
          <div className="flex justify-center bg-ink pb-1 pt-0.5" aria-hidden="true">
            <span className="h-1 w-8 rounded-full bg-white/25" />
          </div>
          <div className="p-2.5">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <Image
                src="/brand/groundwork-mark-light.png"
                alt=""
                aria-hidden="true"
                width={12}
                height={12}
              />
              <span className="h-1.5 w-9 rounded-sm bg-ink/80" />
            </span>
            <span className="mt-3 block h-2.5 w-full rounded-sm bg-ink/80" aria-hidden="true" />
            <span className="mt-1.5 block h-2.5 w-3/4 rounded-sm bg-ink/80" aria-hidden="true" />
            <span className="mt-2.5 block h-1 w-full rounded-sm bg-line" aria-hidden="true" />
            <span className="mt-1 block h-1 w-5/6 rounded-sm bg-line" aria-hidden="true" />
            {/* the tap-to-call bar every Groundwork site ships with */}
            <span className="mt-3 block h-6 w-full rounded-sm bg-gold" aria-hidden="true" />
            <span
              className="mt-2 block aspect-[4/3] rounded-sm border border-line bg-concrete"
              aria-hidden="true"
            />
          </div>
        </div>
      </figure>

      <p className="mt-12 pl-1 text-sm leading-relaxed text-steel sm:pl-32">
        An example of how we lay out a local-business site — the same design works on a desktop and in
        one hand.
      </p>
    </div>
  );
}
