"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { cn } from "@/lib/utils";
import { GroundworkLogoLink } from "@/components/brand/groundwork-logo";
import { ButtonLink } from "@/components/ui/button";

// Deliberately short. FAQ lives on the homepage and in the footer — it doesn't
// need to compete for space in the primary navigation.
const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="container-frame flex h-[70px] items-center justify-between gap-4">
        {/* Monogram + wordmark. On phones under 400px the mark stands alone so
            nothing is ever cramped or clipped. */}
        <GroundworkLogoLink variant="wordmark" size="md" className="hidden xs:inline-flex" />
        <GroundworkLogoLink variant="mark" size="md" className="inline-flex xs:hidden" />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-[0.95rem] font-medium transition-colors",
                  active ? "text-ink" : "text-steel hover:text-ink"
                )}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded bg-gold"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {siteStatus.hasPhone ? (
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-steel transition-colors hover:text-ink"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
          ) : null}
          <ButtonLink href="/contact" size="sm" data-analytics="header_website_plan">
            Get my free website plan
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu — generous tap targets, one clear CTA, no crowding. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-paper shadow-menu md:hidden"
      >
        <nav className="container-frame flex flex-col py-3" aria-label="Primary (mobile)">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/70 py-3.5 text-base font-medium text-ink last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2.5 pb-4 pt-4">
            <ButtonLink href="/contact" size="lg" onClick={() => setOpen(false)} data-analytics="mobile_nav_website_plan">
              Get my free website plan
            </ButtonLink>
            {siteStatus.hasPhone ? (
              <ButtonLink href={`tel:${site.contact.phoneHref}`} variant="outline" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </ButtonLink>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
