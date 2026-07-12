# Client Starter — Clone, Customize, Test, Deploy

This project is also the **reusable starter** for client websites. The identity
lives in one config file and content lives in data files, so a new client build
is mostly editing data — not writing components.

## Reusable component architecture

- **`src/components/ui/`** — primitives with a shadcn-style API: `Button` /
  `ButtonLink`, `Input`/`Textarea`/`Select`/`Label`/`FieldError`, `Section`/
  `SectionHeader`, `ImagePlaceholder`. Reuse across all client sites.
- **`src/components/sections/`** — composable blocks: `Hero`, `TrustBar`,
  `ServicesOverview`, `Process`, `PricingTiers`, `PortfolioGrid`, `Testimonials`,
  `FaqSection`, `CtaBand`. Pages are assembled from these.
- **`src/components/site/`** — `Header`, `Footer`, `MobileCtaBar`, `Logo`.
- **`src/components/forms/QuoteForm`** — validation, honeypot, states,
  lead-source capture. Drop-in for any client.
- **`src/lib/`** — `cn`, the shared zod schema, SEO helpers (metadata + JSON-LD),
  and the analytics hook.

Because copy/content is centralized, the same components produce visually
distinct sites once tokens and content change.

## Steps to start a new client project

1. **Copy the repo** into a new project folder (or use it as a GitHub template):
   ```bash
   npx degit your-org/groundwork-starter client-acme
   cd client-acme && npm install
   ```
2. **Rebrand identity** in `src/config/site.ts` (name, phone, email, address,
   service areas, social, hours).
3. **Retune the design** for the client in `tailwind.config.ts` and the font
   choices in `src/app/layout.tsx`. Change the accent color and the display/body
   fonts to fit the client's brand — this is the biggest lever for a distinct look.
4. **Edit content** in `src/content/*` (services, pricing, faq, testimonials,
   portfolio) and the About/Home copy. Remove sections that don't apply.
5. **Add real images** to `/public` and wire them up. Replace every placeholder.
6. **Configure the quote form** (Resend or Formspree env vars).
7. **Set `NEXT_PUBLIC_SITE_URL`** and other env vars locally, then on Vercel.
8. **Run the audit** ([`AUDIT_CHECKLIST.md`](AUDIT_CHECKLIST.md)), then the
   **[Launch Checklist](LAUNCH_CHECKLIST.md)**.

## Testing before handoff

```bash
npm run typecheck   # types clean
npm run lint        # lint clean
npm run build       # production build succeeds
npm run start       # smoke-test the built site locally
```

Then manually verify responsiveness (360 / 768 / 1280+), keyboard navigation,
tap-to-call, and a real quote submission end-to-end.

## Adding a page or service

- **New service:** add an entry to `src/content/services.ts`. The overview card,
  the `/services/[slug]` detail page, and the sitemap update automatically.
- **New static page:** create `src/app/<name>/page.tsx`, export `metadata` via
  `buildMetadata({ ..., path: "/<name>" })`, and add the path to
  `src/app/sitemap.ts`.
