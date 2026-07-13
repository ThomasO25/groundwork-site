import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { Section } from "@/components/ui/section";

/**
 * WHY GROUNDWORK — the direct working relationship, stated positively.
 *
 * Framed as what you get ("one point of contact"), not as what we lack ("no
 * account managers, no call centre"). Same truth, without the defensiveness.
 *
 * Two honest states:
 *   1. Founder details supplied → real photo, name, bio, location, contact.
 *   2. Not supplied → clean text-only layout. No empty image frame, no invented
 *      person, no fabricated history, and no implied team.
 */
const points: [string, string][] = [
  [
    "One point of contact",
    "From the first conversation through to launch, you're dealing with the person who is actually planning and building the site.",
  ],
  [
    "Nothing lost in translation",
    "What you explain about your business goes straight into the work, rather than through a chain of people who've never met you.",
  ],
  [
    "Straight answers",
    "If a bigger package won't help you, we'll say so. If we're not the right fit for what you need, we'll tell you that too.",
  ],
];

export function Founder() {
  const f = site.founder;
  const hasCard = siteStatus.hasFounder;

  return (
    <Section tone="paper" id="why-groundwork">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span className="eyebrow">Why Groundwork</span>
          <h2 className="mt-4 text-display-md text-ink">
            One point of contact, from the first conversation through launch.
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel">
            You work directly with the person planning and building your website. That&apos;s the whole
            arrangement — and it&apos;s the reason projects stay clear, honest, and easy to talk about.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-steel">
            It also means we take on a limited number of projects at a time, so the one in front of us gets
            proper attention.
          </p>

          <dl className="mt-9 space-y-6 border-t border-line pt-8">
            {points.map(([t, d]) => (
              <div key={t} className="grid gap-1.5 sm:grid-cols-[0.7fr_1.3fr] sm:gap-6">
                <dt className="flex items-start gap-2.5 font-display font-bold text-ink">
                  <span className="notch mt-2 h-2 w-2 shrink-0 bg-gold" aria-hidden="true" />
                  {t}
                </dt>
                <dd className="leading-relaxed text-steel">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The founder card. Text-only until a real photo and bio exist. */}
        {hasCard ? (
          <div className="lg:pl-4">
            <div className="rounded-lg border border-line bg-surface p-8 shadow-soft">
              {siteStatus.hasFounderPhoto ? (
                <div className="relative mb-7 aspect-[4/5] overflow-hidden rounded border border-line">
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${site.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              ) : null}

              <p className="font-display text-2xl font-bold text-ink">{f.name}</p>
              {f.location ? (
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-deep">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {f.location}
                </p>
              ) : null}

              {/* Bio only when the owner has written one. Never invented. */}
              {siteStatus.hasFounderBio ? (
                <p className="mt-5 leading-relaxed text-steel">{f.bio}</p>
              ) : (
                <p className="mt-5 leading-relaxed text-steel">
                  Groundwork is a small studio by design. The person who plans your website is the person
                  who builds it — so you always know exactly who you&apos;re dealing with.
                </p>
              )}

              {siteStatus.hasFounderPhone || siteStatus.hasFounderEmail ? (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
                  {siteStatus.hasFounderPhone ? (
                    <li>
                      <a
                        href={`tel:${f.phoneHref}`}
                        className="inline-flex items-center gap-2 font-medium text-ink hover:text-gold-deep"
                      >
                        <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                        {f.phoneDisplay}
                      </a>
                    </li>
                  ) : null}
                  {siteStatus.hasFounderEmail ? (
                    <li>
                      <a
                        href={`mailto:${f.email}`}
                        className="inline-flex items-center gap-2 break-all font-medium text-ink hover:text-gold-deep"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                        {f.email}
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
