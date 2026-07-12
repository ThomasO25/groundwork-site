"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { site, siteStatus } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="container-frame flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-ink" : "text-steel hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {siteStatus.hasPhone ? (
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm font-medium text-ink hover:bg-ink/[0.05]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
          ) : null}
          <ButtonLink href="/contact" size="sm" data-analytics="header_website_plan">
            Get a free website plan
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="container-frame flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-base font-medium text-ink hover:bg-ink/[0.05]"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            <ButtonLink href="/contact" className="w-full" onClick={() => setOpen(false)}>
              Get a free website plan
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
