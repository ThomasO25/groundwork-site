import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { Section } from "@/components/ui/section";

/**
 * "You work directly with the person building your site."
 *
 * Two states, both honest:
 *   1. Founder configured (site.founder.name) → full card with photo, bio,
 *      location, and any direct contact details supplied.
 *   2. Not configured → a short, truthful band about how the studio works. It
 *      claims NO name, NO photo, NO history, and NO staff — it only states the
 *      working relationship. Nothing is invented, and nothing looks unfinished.
 *
 * See docs/OWNER_CONTENT_REQUIRED.md → Founder.
 */
export function Founder() {
  if (!siteStatus.hasFounder) {
    return (
      <Section tone="paper">
        <div className="mx-auto max-w-3xl rounded border border-line bg-white p-8 sm:p-10">
          <span className="spec-label">Who you&apos;ll be working with</span>
          <h2 className="mt-3 text-display-md text-ink">
            You work directly with the person building your site
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            No account managers, no call centre, no handing your project down a chain. The person who
            plans your website is the person who builds it — so nothing gets lost in translation, and you
            always know who to call.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-steel">
            That also means we take on a limited number of projects at a time, and we&apos;ll tell you
            honestly if we&apos;re not the right fit for what you need.
          </p>
        </div>
      </Section>
    );
  }

  const f = site.founder;

  return (
    <Section tone="paper">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {siteStatus.hasFounderPhoto ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded border border-line">
            <Image
              src={f.photo}
              alt={`${f.name}, ${site.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        ) : null}

        <div className={siteStatus.hasFounderPhoto ? "" : "mx-auto max-w-3xl"}>
          <span className="spec-label">Who you&apos;ll be working with</span>
          <h2 className="mt-3 text-display-md text-ink">
            You work directly with the person building your site
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-steel">{f.bio}</p>

          <div className="mt-7 border-t border-line pt-5">
            <p className="text-lg font-bold text-ink">{f.name}</p>
            {f.location ? (
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-steel">
                <MapPin className="h-3.5 w-3.5 text-hivis" aria-hidden="true" />
                {f.location}
              </p>
            ) : null}

            {siteStatus.hasFounderPhone || siteStatus.hasFounderEmail ? (
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {siteStatus.hasFounderPhone ? (
                  <li>
                    <a
                      href={`tel:${f.phoneHref}`}
                      className="inline-flex items-center gap-2 font-medium text-ink hover:text-hivis-deep"
                    >
                      <Phone className="h-4 w-4 text-hivis" aria-hidden="true" />
                      {f.phoneDisplay}
                    </a>
                  </li>
                ) : null}
                {siteStatus.hasFounderEmail ? (
                  <li>
                    <a
                      href={`mailto:${f.email}`}
                      className="inline-flex items-center gap-2 font-medium text-ink hover:text-hivis-deep"
                    >
                      <Mail className="h-4 w-4 text-hivis" aria-hidden="true" />
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
