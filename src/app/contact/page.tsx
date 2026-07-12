import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { Section } from "@/components/ui/section";
import { site, siteStatus } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Quote",
  description: `Request a free, no-pressure quote from ${site.name}. Tell us about your business and we'll get back to you, usually within one business day.`,
  path: "/contact",
});

export default function ContactPage() {
  const showAreaCard = siteStatus.hasServiceAreas || siteStatus.hasRegion;

  return (
    <>
      <Section tone="paper" className="pb-8">
        <div className="max-w-3xl">
          <span className="spec-label">Get a free quote</span>
          <h1 className="mt-3 text-display-lg text-ink">Let&apos;s get you more calls and quotes</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Tell us a little about your business. We&apos;ll follow up with a free, no-pressure quote — usually
            within one business day.
            {siteStatus.hasPhone ? " Prefer to talk? Call us directly, we'll pick up." : ""}
          </p>
        </div>
      </Section>

      <Section tone="concrete" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <QuoteForm />

          <aside className="space-y-4">
            <div className="rounded border border-line bg-white p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">Reach us directly</h2>
              <ul className="mt-4 space-y-4">
                {siteStatus.hasPhone ? (
                  <li>
                    <a href={`tel:${site.contact.phoneHref}`} className="flex items-center gap-3 text-ink hover:text-hivis-deep">
                      <span className="flex h-9 w-9 items-center justify-center rounded bg-concrete">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-medium uppercase tracking-wide text-steel">Call or text</span>
                        <span className="font-semibold">{site.contact.phoneDisplay}</span>
                      </span>
                    </a>
                  </li>
                ) : null}
                {siteStatus.hasEmail ? (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-ink hover:text-hivis-deep">
                      <span className="flex h-9 w-9 items-center justify-center rounded bg-concrete">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-medium uppercase tracking-wide text-steel">Email</span>
                        <span className="font-semibold break-all">{site.contact.email}</span>
                      </span>
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-3 text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-concrete">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wide text-steel">Hours</span>
                    <span className="font-semibold">Mon–Fri, 9am–5pm</span>
                  </span>
                </li>
              </ul>
              {!siteStatus.hasAnyContact ? (
                <p className="mt-4 text-sm leading-relaxed text-steel">
                  The fastest way to reach us right now is the form — we&apos;ll reply by email, usually within
                  one business day.
                </p>
              ) : null}
              {site.social.googleBusiness ? (
                <a
                  href={site.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-hivis-deep"
                >
                  See us on Google
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            {showAreaCard ? (
              <div className="rounded border border-line bg-white p-6">
                <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                  <MapPin className="h-3.5 w-3.5 text-hivis" aria-hidden="true" />
                  Service area
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {siteStatus.hasRegion
                    ? `Proudly serving ${site.primaryRegion} and surrounding communities`
                    : "Proudly serving local service businesses"}
                  {siteStatus.hasServiceAreas ? ", including:" : "."}
                </p>
                {siteStatus.hasServiceAreas ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {site.serviceAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-sm border border-line bg-concrete px-2.5 py-1 font-mono text-xs text-ink"
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
