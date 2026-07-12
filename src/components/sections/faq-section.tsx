import { Plus } from "lucide-react";
import { faqs, type FaqItem } from "@/content/faq";
import { Section, SectionHeader } from "@/components/ui/section";

export function FaqSection({ items = faqs }: { items?: FaqItem[] }) {
  return (
    <Section tone="concrete" id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader label="FAQ" title="Questions, answered" intro="If you don't see yours, just ask — we're happy to help." />
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-base font-semibold text-ink">{f.q}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-steel transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
