import { faqs } from "@/content/faq";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { buildMetadata, JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about timelines, pricing, what we need from you, ownership, maintenance, and how we help local businesses get more calls and quotes.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Section tone="paper" className="pb-4">
        <div className="max-w-3xl">
          <span className="eyebrow">FAQ</span>
          <h1 className="mt-3 text-display-lg text-ink">Frequently asked questions</h1>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            The things owners ask us most. Still have a question? Reach out — we&apos;re glad to help.
          </p>
        </div>
      </Section>
      <FaqSection />
      <CtaBand />
    </>
  );
}
