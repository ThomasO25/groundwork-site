import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function ServicesOverview() {
  return (
    <Section tone="concrete" id="services">
      <div className="max-w-prose">
        <span className="eyebrow">What we build</span>
        <h2 className="mt-4 text-display-md text-ink">Start where you are</h2>
        <p className="mt-5 leading-relaxed text-steel">
          Most businesses start with a Website Launch. The other two exist for when you outgrow it —
          they&apos;re not required for a professional website.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {services.map((s, i) => {
          const isStart = i === 0;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={cn(
                "group grid items-start gap-5 rounded-lg border p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7",
                isStart
                  ? "border-gold bg-surface"
                  : "border-line bg-surface/60 hover:border-gold"
              )}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-concrete text-ink">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display text-xl font-bold text-ink">{s.name}</h3>
                  {isStart ? (
                    <span className="rounded-sm bg-sand px-2 py-0.5 text-xs font-semibold text-ink">
                      Most businesses start here
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 max-w-prose leading-relaxed text-steel">{s.summary}</p>
              </div>

              <div className="sm:text-right">
                <p className="font-display text-lg font-extrabold text-ink">{s.priceFrom}</p>
                {s.paymentPlan ? <p className="mt-0.5 text-sm text-steel">{s.paymentPlan}</p> : null}
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  See what&apos;s included
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 max-w-prose leading-relaxed text-steel">
        <strong className="font-semibold text-ink">Not sure which one fits?</strong> Tell us about your
        business and we&apos;ll recommend the simplest option that does the job.
      </p>
    </Section>
  );
}
