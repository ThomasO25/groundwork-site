import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/**
 * The homepage's starting-price explanation.
 *
 * Deliberately NOT a pricing table — the homepage's job is trust and contact,
 * not package selection. One honest entry price, a plain statement that there
 * are different levels, and a link to the full pricing page for anyone who wants
 * the detail. Nobody has to choose a package before talking to us.
 */
const planIncludes = [
  "What your website should actually do",
  "The scope we'd suggest, and the pages that matter",
  "Which service level fits — and a starting price",
  "What we'd do next, whether or not you hire us",
];

export function EntryOffer() {
  return (
    <Section tone="paper" id="pricing-preview">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span className="eyebrow">What it costs</span>
          <h2 className="mt-4 text-display-md text-ink">
            Professional websites for local businesses, starting at $750.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            There are different levels, because businesses need different things. A small shop getting its
            first proper website has a very different job to do than a company with six services and four
            towns to cover.
          </p>
          <p className="mt-4 leading-relaxed text-steel">
            So we&apos;ll point you at the simplest option that does the job — not the biggest one. Every
            price is a starting point, and you get the real number in writing, based on your actual scope,
            before you commit to anything.
          </p>
          <p className="mt-4 leading-relaxed text-steel">
            Ongoing website care is <strong className="font-semibold text-ink">optional</strong>, from
            $75/month. Your website is yours either way.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" data-analytics="entry_offer_primary">
              Get My Free Website Plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline" size="lg" data-analytics="entry_offer_pricing">
              See all the options
            </ButtonLink>
          </div>
        </div>

        {/* What the free plan actually is — and what it isn't. */}
        <div className="rounded-lg border border-line bg-surface p-8 shadow-soft sm:p-10">
          <h3 className="font-display text-xl font-bold text-ink">What&apos;s a free website plan?</h3>
          <p className="mt-3 leading-relaxed text-steel">
            A short written recommendation, based on a conversation about your business. You get:
          </p>
          <ul className="mt-5 space-y-3.5">
            {planIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-deep" aria-hidden="true" />
                <span className="leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-line pt-6 leading-relaxed text-steel">
            It&apos;s a plan, not free labour — so it isn&apos;t a mockup, a finished design, or an SEO
            audit. It&apos;s the honest advice you&apos;d get in a good first conversation, written down and
            yours to keep.{" "}
            <Link href="/pricing" className="font-medium text-ink underline underline-offset-4 hover:text-gold-deep">
              See what each level costs
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
