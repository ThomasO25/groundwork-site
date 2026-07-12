import type { Metadata } from "next";
import { site, siteStatus, legalDisplayName } from "@/config/site";

/**
 * Base URL used for canonical + OG. Priority:
 *   1. NEXT_PUBLIC_SITE_URL (set this to your real domain in production)
 *   2. VERCEL_URL (auto-set by Vercel, so previews get correct URLs for free)
 *   3. localhost (local dev)
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

/** Official Open Graph artwork, built from the Groundwork logo. */
export const OG_IMAGE = "/brand/groundwork-og.png";

/**
 * Build per-page metadata with sensible defaults, canonical URL, and Open Graph.
 * Pass a `path` (e.g. "/services") so canonical + OG url are correct.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = siteUrl + (path === "/" ? "" : path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${site.name} — Web Studio` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  } as Metadata;
}

/**
 * JSON-LD for a local/professional service business.
 * Only includes fields that have real values — no placeholder phone, email,
 * address, or areas are emitted.
 */
export function localBusinessJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: legalDisplayName,
    description: site.description,
    url: siteUrl,
    priceRange: "$$",
    ...(siteStatus.hasPhone ? { telephone: site.contact.phoneDisplay } : {}),
    ...(siteStatus.hasEmail ? { email: site.contact.email } : {}),
    ...(siteStatus.hasServiceAreas
      ? { areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })) }
      : {}),
    ...(siteStatus.hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street || undefined,
            addressLocality: site.address.city,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode || undefined,
            addressCountry: site.address.country,
          },
        }
      : {}),
    ...(site.hours ? { openingHours: site.hours } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** JSON-LD helper for FAQ pages (rich results). */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Render a JSON-LD <script>. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Data is our own, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
