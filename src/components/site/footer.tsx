import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { site, siteStatus, legalDisplayName } from "@/config/site";
import { Logo } from "./logo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/website-launch", label: "Website Launch" },
      { href: "/services/growth-website", label: "Growth Website" },
      { href: "/services/lead-system", label: "Lead System" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/work", label: "Work" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const social = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink text-white">
      <div className="container-frame py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{site.description}</p>
            {siteStatus.hasRegion ? (
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                Serving {site.primaryRegion}
              </p>
            ) : null}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/75 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/40">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {siteStatus.hasPhone ? (
                <li>
                  <a href={`tel:${site.contact.phoneHref}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <Phone className="h-4 w-4 text-hivis" aria-hidden="true" />
                    {site.contact.phoneDisplay}
                  </a>
                </li>
              ) : null}
              {siteStatus.hasEmail ? (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <Mail className="h-4 w-4 text-hivis" aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              {siteStatus.hasAddress ? (
                <li className="inline-flex items-center gap-2 text-white/75">
                  <MapPin className="h-4 w-4 text-hivis" aria-hidden="true" />
                  {[site.address.city, site.address.region].filter(Boolean).join(", ")}
                </li>
              ) : null}
              {/* Always give a way to convert, even before contact details exist. */}
              <li>
                <Link href="/contact" className="inline-flex items-center gap-2 font-medium text-white hover:text-hivis">
                  Get a free quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
            {social.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {social.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-white/60 hover:text-white">
                      {key === "googleBusiness" ? "Google" : key}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalDisplayName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-white/80">
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
