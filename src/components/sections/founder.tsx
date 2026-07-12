import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { Section } from "@/components/ui/section";

/**
 * Two honest states:
 *   1. Founder configured → real photo, name, bio, location, direct contact.
 *   2. Not configured    → a clean, TEXT-ONLY presentation. No empty image frame,
 *      no internal instructions, no invented person, no implied team.
 */
export function Founder() {
  const f = site.founder;

  if (!siteStatus.hasFounder) {
    return (
      <Section tone="ink">
        <div className="max-w-prose">
          <span className="eyebrow eyebrow--dark">Who you&apos;ll be working with</span>
          <h2 className="mt-4 text-display-md text-paper">
            You work directly with the person building your site
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/70">
            No account managers, no call centre, and no handing your project down a chain. The person who
            plans your website is the person who builds it — so nothing gets lost in translation, and you
            always know who to call.
          </p>
          <p className="mt-4 leading-relaxed text-paper/60">
            It also means we take on a limited number of projects at a time, and we&apos;ll tell you
            honestly if we&apos;re not the right fit for what you need.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
        {siteStatus.hasFounderPhoto ? (
          <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-lg border border-line-dark">
            <Image
              src={f.photo}
              alt={`${f.name}, ${site.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>
        ) : null}

        <div>
          <span className="eyebrow eyebrow--dark">Who you&apos;ll be working with</span>
          <h2 className="mt-4 text-display-md text-paper">
            You work directly with the person building your site
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-paper/70">{f.bio}</p>

          <div className="mt-8 border-t border-line-dark pt-6">
            <p className="font-display text-xl font-bold text-paper">{f.name}</p>
            {f.location ? (
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-sand">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {f.location}
              </p>
            ) : null}

            {siteStatus.hasFounderPhone || siteStatus.hasFounderEmail ? (
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {siteStatus.hasFounderPhone ? (
                  <li>
                    <a
                      href={`tel:${f.phoneHref}`}
                      className="inline-flex items-center gap-2 font-medium text-paper hover:text-sand"
                    >
                      <Phone className="h-4 w-4 text-sand" aria-hidden="true" />
                      {f.phoneDisplay}
                    </a>
                  </li>
                ) : null}
                {siteStatus.hasFounderEmail ? (
                  <li>
                    <a
                      href={`mailto:${f.email}`}
                      className="inline-flex items-center gap-2 font-medium text-paper hover:text-sand"
                    >
                      <Mail className="h-4 w-4 text-sand" aria-hidden="true" />
                      {f.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
