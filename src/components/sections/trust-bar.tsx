import { Smartphone, Gauge, KeyRound, Search } from "lucide-react";

/**
 * "What every site includes" strip.
 *
 * NOTE: This deliberately states only truthful product capabilities — not
 * unverifiable credentials. Do NOT add ratings, review counts, years in
 * business, licenses, or "insured" claims here unless the owner has provided
 * REAL, verifiable values (see docs/OWNER_CONTENT_REQUIRED.md).
 */
const items = [
  { icon: Smartphone, label: "Built for phones", note: "Where most customers will find you" },
  { icon: Gauge, label: "Fast & secure", note: "Loads quickly, protected by default" },
  { icon: KeyRound, label: "You own it", note: "Your site, domain, and content" },
  { icon: Search, label: "Easy to find", note: "Set up for local searches from day one" },
];

export function TrustBar() {
  return (
    <div className="border-b border-line bg-white">
      <div className="container-frame grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3">
            <it.icon className="h-5 w-5 shrink-0 text-hivis" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">{it.label}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-steel">{it.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
