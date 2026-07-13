import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { Section } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services & Pricing for Local Service Businesses",
  description:
    "Websites and lead systems for contractors and local service businesses. Starter Sites from $750, Business Websites from $1,500, Growth Websites from $2,500, and custom-quoted builds.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section tone="paper" className="pb-8">
        <div className="max-w-3xl">
          <span className="eyebrow">Services</span>
          <h1 className="mt-3 text-display-lg text-ink">Websites and systems that bring in work</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Every project is designed and built for your business and your customers — never a generic
            template. Most established local businesses land on the Business Website; the Starter Site
            exists for a smaller budget, and custom builds for when a website isn&apos;t enough.
          </p>
          <p className="mt-5 leading-relaxed text-steel">
            <strong className="font-semibold text-ink">Not sure which option fits?</strong> Tell us about
            your business and we&apos;ll recommend the simplest option that does the job. You don&apos;t
            need to choose a package before getting in touch.
          </p>
        </div>
      </Section>

      {services.map((s, i) => (
        <section key={s.slug} className={i % 2 === 0 ? "bg-concrete" : "bg-paper"}>
          <div className="container-frame py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded bg-ink text-paper">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-display-md text-ink">{s.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-steel">{s.summary}</p>

                <dl className="mt-6 space-y-3 border-t border-line pt-6">
                  <div>
                    <dt className="text-xs font-medium text-steel">Price</dt>
                    <dd className="font-display text-2xl font-extrabold text-ink">{s.priceFrom}</dd>
                    {s.care ? <dd className="mt-1 text-sm text-steel">{s.care}</dd> : null}
                    {s.priceBasis ? (
                      <dd className="mt-2 text-xs leading-relaxed text-steel">{s.priceBasis}</dd>
                    ) : null}
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-steel">Best for</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink">{s.bestFor}</dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded bg-ink px-5 text-[0.95rem] font-medium text-white hover:bg-graphite"
                  >
                    Full details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/contact?plan=${s.slug}`}
                    className="inline-flex h-11 items-center rounded border border-ink/25 px-5 text-[0.95rem] font-medium text-ink hover:border-ink"
                  >
                    Get my free website plan
                  </Link>
                </div>
              </div>

              <div className="rounded border border-line bg-surface p-6 sm:p-7">
                <p className="text-xs font-semibold text-steel">What&apos;s included</p>
                <ul className="mt-4 space-y-3">
                  {s.includes.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Not sure which is right?" subtitle="Tell us about your business and we'll recommend the simplest option that gets you results — and put it in writing." />
    </>
  );
}
