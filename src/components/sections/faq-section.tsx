import { Plus } from "lucide-react";
import { faqs, type FaqItem } from "@/content/faq";
import { Section, SectionHeader } from "@/components/ui/section";

/** Clean accordion — hairline dividers, no bordered box around every question. */
export function FaqSection({ items = faqs }: { items?: FaqItem[] }) {
  return (
    <Section tone="paper" id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            label="Common questions"
            title="Questions, answered"
            intro="If you don't see yours, just ask — we're happy to help."
          />
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
