import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { site, siteStatus, legalDisplayName } from "@/config/site";
import { GroundworkLogoLink } from "@/components/brand/groundwork-logo";

const services = [
  { href: "/services/website-launch", label: "Website Launch" },
  { href: "/services/growth-website", label: "Growth Website" },
  { href: "/services/lead-system", label: "Lead System" },
  { href: "/pricing", label: "Pricing" },
];

const studio = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const social = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-concrete">
      <div className="container-frame py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <GroundworkLogoLink variant="full" size="lg" />
            <p className="mt-5 max-w-xs leading-relaxed text-steel">
              Professional websites for contractors and local service businesses — built to turn searches
              into calls and booked work.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 py-2 font-semibold text-ink underline-offset-4 hover:text-gold-deep hover:underline"
              data-analytics="footer_website_plan"
            >
              Get my free website plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold text-ink">Services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="-my-1 inline-block py-2 text-[0.95rem] text-steel hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold text-ink">Studio</h2>
            <ul className="mt-4 space-y-1">
              {studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="-my-1 inline-block py-2 text-[0.95rem] text-steel hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {siteStatus.hasAnyContact || siteStatus.hasAddress ? (
              <ul className="mt-6 space-y-2.5">
                {siteStatus.hasPhone ? (
                  <li>
                    <a
                      href={`tel:${site.contact.phoneHref}`}
                      className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink hover:text-gold-deep"
                    >
                      <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                      {site.contact.phoneDisplay}
                    </a>
                  </li>
                ) : null}
                {siteStatus.hasEmail ? (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="inline-flex items-center gap-2 break-all text-[0.95rem] font-medium text-ink hover:text-gold-deep"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                      {site.contact.email}
                    </a>
                  </li>
                ) : null}
                {siteStatus.hasAddress ? (
                  <li className="inline-flex items-center gap-2 text-[0.95rem] text-steel">
                    <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    {[site.address.city, site.address.region].filter(Boolean).join(", ")}
                  </li>
                ) : null}
              </ul>
            ) : null}

            {social.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {social.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-my-1 inline-block py-2 text-[0.95rem] capitalize text-steel hover:text-ink"
                    >
                      {key === "googleBusiness" ? "Google" : key}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalDisplayName}. All rights reserved.
          </p>
          <Link href="/privacy" className="-my-1 inline-block py-2 hover:text-ink">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
