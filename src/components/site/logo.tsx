import Link from "next/link";
import { site } from "@/config/site";

/**
 * Wordmark with a hi-vis "level/bubble" tick — an engineered mark rather than a
 * generic icon-in-a-rounded-square. Swap for a real SVG logo when available.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${site.name} — home`}>
      <span className="relative flex h-7 w-7 items-center justify-center rounded-sm bg-ink" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-hivis transition-transform duration-200 group-hover:scale-110" />
      </span>
      <span
        className={
          "font-display text-lg font-extrabold tracking-tight " + (dark ? "text-white" : "text-ink")
        }
      >
        {site.name}
      </span>
    </Link>
  );
}
