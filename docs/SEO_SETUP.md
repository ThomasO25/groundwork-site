# SEO Setup

What's already built in, and what the owner must do after launch to get found on
Google. This site is engineered for **local** search — the goal is showing up when
someone nearby searches "[your service] near me."

## Built in already

- **Per-page metadata** — every page sets its own title and description via the
  `buildMetadata()` helper (`src/lib/seo.tsx`), with a site-wide title template and
  canonical URLs.
- **Structured data (JSON-LD):**
  - `LocalBusiness` / `ProfessionalService` on every page (name, phone, address,
    area served, hours) — this is what powers rich local results.
  - `Service` schema on each `/services/[slug]` page.
  - `FAQPage` schema on pages with an FAQ.
- **Open Graph + social card** — a generated `/opengraph-image` and OG/Twitter tags so
  shared links look professional.
- **Sitemap & robots** — `/sitemap.xml` is generated from the routes (including all
  service slugs); `/robots.txt` allows crawling and points to the sitemap while
  disallowing `/dashboard` and `/api`.
- **Favicon** — generated at `/icon`.
- **Performance & mobile** — self-hosted fonts, static prerendering, lean JS, and a
  mobile-first layout. Core Web Vitals and mobile-friendliness are ranking factors.
- **Semantic HTML & accessibility** — proper headings, skip link, focus states, and
  labeled controls, which also help crawlers understand the page.

## Owner setup — do this **before** launch

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonical URLs, the sitemap,
   and OG tags). Getting this wrong causes duplicate-content and broken-share issues.
2. Fill real business identity in `src/config/site.ts` — the JSON-LD is only as good as
   the name, address, phone, hours, and service areas you put there. Make the **NAP**
   (name, address, phone) *exactly* match your Google Business Profile and other
   listings; consistency is a strong local ranking signal.
3. Write real, specific page descriptions in `src/config/site.ts` / page metadata —
   avoid generic filler.

## Owner setup — do this **right after** launch

1. **Google Search Console** — create/verify the property for your domain.
2. **Submit your sitemap** in Search Console: `https://yourdomain.com/sitemap.xml`.
3. **Request indexing** for the homepage via the URL Inspection tool to speed up first
   crawl. (Indexing still takes days — that's normal.)
4. **Google Business Profile** — claim and verify it, fill it out completely, add real
   photos, and add its URL to `site.social.googleBusiness` so the site's "See us on
   Google" links appear. For local service businesses, the Business Profile often
   drives more calls than the website itself — treat it as a first-class channel.
5. **Bing Webmaster Tools** (optional) — import from Search Console in two clicks.
6. Get listed in a few relevant directories and ensure NAP matches everywhere.

## Ongoing (see also MAINTENANCE_CHECKLIST.md)

- Encourage happy customers to leave **real** Google reviews (never fabricate any).
- Add real content over time — service detail, a genuine project/gallery, and
  eventually per-service-area or blog pages — to expand what you can rank for.
- Keep an eye on Search Console for coverage errors and the queries you're appearing
  for.
