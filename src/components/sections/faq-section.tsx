import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { faqs, type FaqItem } from "@/content/faq";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Clean accordion — hairline dividers, no bordered box around every question.
 * `showAll={false}` renders a shortlist and links to the full FAQ page, so the
 * homepage doesn't turn into a wall of answers.
 */
export function FaqSection({
  items = faqs,
  showAll = true,
}: {
  items?: FaqItem[];
  showAll?: boolean;
}) {
  return (
    <Section tone="paper" id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            label="Common questions"
            title="Questions, answered"
            intro="If you don't see yours, just ask — we're happy to help."
          />
          {!showAll ? (
            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 py-2 font-semibold text-ink underline-offset-4 hover:text-gold-deep hover:underline"
              data-analytics="home_faq_see_all"
            >
              See all questions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left">
                <span className="font-display text-lg font-bold text-ink">{f.q}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-gold-deep transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-steel">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
