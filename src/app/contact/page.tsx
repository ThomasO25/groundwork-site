import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { Section } from "@/components/ui/section";
import { site, siteStatus } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Website Plan",
  description: `Get a free website plan from ${site.name} — what your website should do, what it would include, and what it costs. No obligation.`,
  path: "/contact",
});

export default function ContactPage() {
  const showAreaCard = siteStatus.hasServiceAreas || siteStatus.hasRegion;

  return (
    <>
      <Section tone="paper" className="pb-8">
        <div className="max-w-prose">
          <span className="eyebrow">Free website plan</span>
          <h1 className="mt-4 text-display-lg text-ink">Tell us about your business</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            We&apos;ll send you a short, practical plan: what your website should do, what it would
            include, and what it costs. It&apos;s free, there&apos;s no obligation, and the plan is yours
            to keep either way.
            {siteStatus.hasPhone ? " Prefer to talk? Call us directly." : ""}
          </p>
        </div>
      </Section>

      <Section tone="paper" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <QuoteForm />

          <aside className="space-y-6 lg:sticky lg:top-28">
            {/* Reassurance: nobody should feel unqualified to fill this in. */}
            <div className="rounded-lg border border-line bg-concrete/70 p-6">
              <h2 className="font-display text-lg font-bold text-ink">You don&apos;t need to know the technical stuff</h2>
              <p className="mt-3 leading-relaxed text-steel">
                You don&apos;t need to know page counts, platforms, or technical details. Tell us about the
                business and what you want the website to help with — that&apos;s genuinely enough for us
                to work from.
              </p>
            </div>

            {siteStatus.hasAnyContact ? (
              <div className="rounded-lg border border-line bg-surface p-6">
                <h2 className="font-display text-lg font-bold text-ink">Reach us directly</h2>
                <ul className="mt-4 space-y-4">
                  {siteStatus.hasPhone ? (
                    <li>
                      <a
                        href={`tel:${site.contact.phoneHref}`}
                        className="flex items-center gap-3 text-ink hover:text-gold-deep"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded bg-concrete">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm text-steel">Call or text</span>
                          <span className="font-semibold">{site.contact.phoneDisplay}</span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                  {siteStatus.hasEmail ? (
                    <li>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="flex items-center gap-3 text-ink hover:text-gold-deep"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded bg-concrete">
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm text-steel">Email</span>
                          <span className="break-all font-semibold">{site.contact.email}</span>
                        </span>
                      </a>
                    </li>
                  ) : null}
                  <li className="flex items-center gap-3 text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded bg-concrete">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-steel">Hours</span>
                      <span className="font-semibold">Mon–Fri, 9am–5pm</span>
                    </span>
                  </li>
                </ul>
                {site.social.googleBusiness ? (
                  <a
                    href={site.social.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink hover:text-gold-deep"
                  >
                    See us on Google
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}

            {showAreaCard ? (
              <div className="rounded-lg border border-line bg-surface p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  Where we work
                </h2>
                <p className="mt-3 leading-relaxed text-steel">
                  {siteStatus.hasRegion
                    ? `Proudly serving ${site.primaryRegion} and the surrounding area`
                    : "Proudly serving local service businesses"}
                  {siteStatus.hasServiceAreas ? ", including:" : "."}
                </p>
                {siteStatus.hasServiceAreas ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {site.serviceAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-sm border border-line bg-concrete px-2.5 py-1 text-sm text-ink"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </>
  );
}
