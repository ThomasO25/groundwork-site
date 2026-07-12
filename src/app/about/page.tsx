import Image from "next/image";
import { Section } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { Founder } from "@/components/sections/founder";
import { site, siteStatus } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About the Studio",
  description: `${site.name} builds professional websites for contractors and local service businesses. Here's why we exist, who we help, and how we work.`,
  path: "/about",
});

/**
 * Warm, plain-spoken, and honest. No invented history, no team, and none of the
 * inflated agency language ("world-class", "cutting-edge", "transforming the
 * digital landscape") the brief rules out.
 */
const expectations: [string, string][] = [
  [
    "Plain language",
    "No jargon, no acronyms, and no assuming you know what a CMS is. If we can't explain it simply, we shouldn't be charging you for it.",
  ],
  [
    "A written plan first",
    "Before any money changes hands, you get a plan: what the site does, what it includes, how long it takes, what it costs.",
  ],
  [
    "Nothing invented",
    "We don't write fake reviews, borrow someone else's photos, or promise rankings and lead counts nobody can guarantee.",
  ],
  [
    "Still here afterwards",
    "Prices change, you add a service, you get a new truck. There's someone to call — you're not on your own with it.",
  ],
];

export default function AboutPage() {
  const hasPhoto = siteStatus.hasFounderPhoto;

  return (
    <>
      <Section tone="paper">
        <div className={hasPhoto ? "grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : "grid"}>
          <div className="max-w-prose">
            <span className="eyebrow">About</span>
            <h1 className="mt-4 text-display-lg text-ink">
              We build websites for people who are good at their trade
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-steel">
              Plenty of local businesses do excellent work and lose jobs anyway — because the website looks
              like it was thrown together in 2011, or won&apos;t load on a phone, or hides the phone number
              three scrolls down. Meanwhile the competitor down the road, who isn&apos;t as good, gets the
              call.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              That&apos;s the gap {site.name} exists to close. We build sites for contractors, home
              services, tinting and auto shops, marine and industrial companies, gyms — anyone whose
              customers look them up before they call.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              The approach is practical rather than clever: make the business look established, make it
              obvious how to get in touch, show the work, and set things up so nearby customers can
              actually find you.
            </p>
          </div>

          {/* Photo only when a real one exists — never an empty frame. */}
          {hasPhoto ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line shadow-soft">
              <Image
                src={site.founder.photo}
                alt={site.founder.name ? `${site.founder.name}, ${site.name}` : `${site.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          ) : null}
        </div>
      </Section>

      <Founder />

      <Section tone="concrete">
        <div className="max-w-prose">
          <span className="eyebrow">What to expect</span>
          <h2 className="mt-4 text-display-md text-ink">How working together actually goes</h2>
        </div>
        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {expectations.map(([t, d]) => (
            <div key={t} className="border-t border-line pt-5">
              <dt className="flex items-start gap-2.5 font-display text-lg font-bold text-ink">
                <span className="notch mt-2 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
                {t}
              </dt>
              <dd className="mt-2 leading-relaxed text-steel">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </>
  );
}
