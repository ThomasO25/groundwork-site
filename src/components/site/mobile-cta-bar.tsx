import { Phone } from "lucide-react";
import { site, siteStatus } from "@/config/site";

/**
 * Sticky call/quote bar on mobile only. When a phone number is configured it
 * shows tap-to-call + quote; otherwise it shows a single full-width quote CTA
 * (never a fake phone link). Bottom padding is added to <body> in layout.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper shadow-bar md:hidden">
      <div className={`grid gap-2 p-2.5 ${siteStatus.hasPhone ? "grid-cols-2" : "grid-cols-1"}`}>
        {siteStatus.hasPhone ? (
          <a
            href={`tel:${site.contact.phoneHref}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-ink/20 font-medium text-ink"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call now
          </a>
        ) : null}
        <a
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded bg-hivis font-semibold text-ink"
        >
          Get a free quote
        </a>
      </div>
    </div>
  );
}
