import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, Phone } from "lucide-react";
import { services, getService } from "@/content/services";
import { site, siteStatus, legalDisplayName } from "@/config/site";
import { Section } from "@/components/ui/section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata, JsonLd, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) return buildMetadata({ title: "Service", description: site.description, path: "/services" });
  return buildMetadata({
    title: `${s.name} for Local Businesses`,
    description: s.summary,
    path: `/services/${s.slug}`,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "ProfessionalService", name: legalDisplayName, url: siteUrl },
    ...(siteStatus.hasServiceAreas
      ? { areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })) }
      : {}),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <Section tone="paper" className="pb-8">
        <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-steel" aria-label="Breadcrumb">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{service.name}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="spec-label">What we build</span>
            <h1 className="mt-3 text-display-lg text-ink">{service.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel">{service.summary}</p>
          </div>
          <div className="rounded border border-line bg-concrete p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-steel">Price</p>
            <p className="mt-1 font-display text-3xl font-extrabold text-ink">{service.priceFrom}</p>
            {service.paymentPlan ? (
              <p className="mt-1 text-sm font-medium text-ink">{service.paymentPlan}</p>
            ) : null}
            {service.care ? <p className="mt-1 text-sm text-steel">{service.care}</p> : null}
            {service.priceBasis ? (
              <p className="mt-3 text-xs leading-relaxed text-steel">{service.priceBasis}</p>
            ) : null}
            <ButtonLink
              href={`/contact?plan=${service.slug}`}
              className="mt-5 w-full"
              data-analytics={`service_${service.slug}_primary`}
            >
              Get my free website plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {siteStatus.hasPhone ? (
              <ButtonLink
                href={`tel:${site.contact.phoneHref}`}
                variant="outline"
                className="mt-2.5 w-full"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="concrete">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-display-md text-ink">What&apos;s included</h2>
            <ul className="mt-6 space-y-3.5">
              {service.includes.map((f) => (
                <li key={f} className="flex gap-3 text-[0.95rem] text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-hivis-deep" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-display-md text-ink">What you can expect</h2>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map((o) => (
                <li key={o} className="rounded border border-line bg-white p-5">
                  <p className="text-[0.95rem] font-medium text-ink">{o}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded border border-line bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-steel">Best for</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{service.bestFor}</p>
            </div>
          </div>
        </div>

        {/* Internal links to the other services */}
        <div className="mt-14 border-t border-line pt-8">
          <p className="font-mono text-[11px] uppercase tracking-wide text-steel">Other services</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded border border-line bg-paper px-4 py-2 text-sm font-medium text-ink hover:border-ink"
                >
                  {s.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
