import { Quote } from "lucide-react";
import { getVisibleTestimonials } from "@/content/testimonials";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Renders ONLY verified, permitted testimonials. If there are none, the whole
 * section is hidden — we never show placeholder or invented reviews.
 */
export function Testimonials() {
  const items = getVisibleTestimonials();
  if (items.length === 0) return null;

  return (
    <Section tone="paper">
      <SectionHeader label="In their words" title="What owners say" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <blockquote key={i} className="relative flex flex-col rounded border border-line bg-surface p-6">
            <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
            <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">{t.quote}</p>
            <footer className="mt-5 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs font-medium text-steel">
                {t.business} · {t.location}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
