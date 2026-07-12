import { Section } from "@/components/ui/section";
import { CtaBand } from "@/components/sections/cta-band";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About the Studio",
  description: `${site.name} designs and builds fast, professional websites and lead systems for local service businesses. Learn how we work and what we stand for.`,
  path: "/about",
});

const values = [
  ["Leads over looks", "A beautiful site that doesn't bring in work is a failure. We design around calls, quotes, and bookings first."],
  ["Honest and clear", "Written scopes, plain language, and prices up front. We never invent reviews, awards, or results."],
  ["Built to last", "Fast, secure, standard technology you own outright — no lock-in, no mystery, easy to maintain."],
  ["Local-minded", "We build for how real customers in your area actually search and choose who to call."],
];

export default function AboutPage() {
  return (
    <>
      <Section tone="paper">
        <div className={site.founder.photo ? "grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : "grid gap-12"}>
          <div>
            <span className="spec-label">About</span>
            {/*
              TODO (owner): personalize the two paragraphs below with the real
              studio story — who you are, why you started, and the businesses you
              focus on. The current copy is generic-but-truthful and safe to ship
              to a preview. See docs/OWNER_CONTENT_REQUIRED.md.
            */}
            <h1 className="mt-3 text-display-lg text-ink">
              We build websites that work as hard as you do
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-steel">
              {site.name} helps local service businesses look established online and turn everyday searches
              into real work. We&apos;re a small studio by design — you work directly with the people building
              your site, and every project gets the attention it deserves.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              We focus on the things that actually bring in business: pages that load fast on a phone, an
              obvious way to call or ask for a quote, and the local search basics done properly. And it&apos;s
              yours — the site, the domain, the content. No lock-in.
            </p>
          </div>
          {/* Optional photo. With none supplied this renders NOTHING in production
              (no dashed frame, no instructions) and the copy sits full-width. */}
          <ImagePlaceholder
            src={site.founder.photo || undefined}
            alt={site.founder.name ? `${site.founder.name}, ${site.name}` : "The person behind Groundwork"}
            label="Add a real photo — a headshot, your team, or your workspace builds trust."
            ratio="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </Section>

      <Section tone="concrete">
        <div className="max-w-2xl">
          <span className="spec-label">What we stand for</span>
          <h2 className="mt-3 text-display-md text-ink">Simple principles, applied to every project</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map(([t, d]) => (
            <div key={t} className="rounded border border-line bg-white p-6">
              <div className="h-1 w-8 bg-hivis" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
