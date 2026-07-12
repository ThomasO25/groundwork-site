import { Phone, Check, ArrowRight } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const proofPoints = ["More calls & quote requests", "Looks established & trustworthy", "Fast on every phone"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* faint engineered grid, kept very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0E1518 1px, transparent 1px), linear-gradient(to bottom, #0E1518 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(120% 80% at 80% 0%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 80% 0%, black, transparent 70%)",
          opacity: 0.05,
        }}
      />
      <div className="container-frame relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <span className="spec-label">
            Websites &amp; Lead Systems{siteStatus.hasRegion ? ` · ${site.primaryRegion}` : ""}
          </span>
          <h1 className="mt-4 text-display-xl text-ink">
            More calls. More quotes.{" "}
            <span className="relative whitespace-nowrap">
              More booked work.
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-hivis" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            We build fast, professional websites for local service businesses — designed to make you
            look established and turn everyday searches into phone calls and quote requests.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Get a free quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {siteStatus.hasPhone ? (
              <ButtonLink href={`tel:${site.contact.phoneHref}`} variant="outline" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </ButtonLink>
            ) : (
              <ButtonLink href="/pricing" variant="outline" size="lg">
                See pricing
              </ButtonLink>
            )}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {proofPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <Check className="h-4 w-4 text-hivis" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ImagePlaceholder
            alt="Featured project or a photo of your team, trucks, or shop"
            label="Add a strong hero photo — your best work, your crew, or a preview of a site you're proud of."
            ratio="aspect-[4/3]"
          />
          <div className="mt-3 grid grid-cols-3 divide-x divide-line rounded border border-line bg-white text-center">
            {["Fast", "Mobile-first", "Secure"].map((t) => (
              <span key={t} className="px-2 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
