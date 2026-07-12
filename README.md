# Groundwork — Agency Website & Lead Foundation

A production-ready marketing website and lead-generation system for a studio that
builds websites for **local service businesses** (contractors, window tinting,
marine, forklift/industrial, gyms, restaurants, salons, and other local pros).

It also doubles as the **reusable starter** for client projects — the same
structure, components, SEO plumbing, and quote system are meant to be cloned and
rebranded per client. See [`docs/CLIENT_STARTER.md`](docs/CLIENT_STARTER.md).

> ✅ **Safe to deploy to a preview URL as-is.** This build never shows a fake
> phone number, address, email, review, rating, license, or result. Any business
> detail that hasn't been provided is simply **hidden** until you add it in
> `src/config/site.ts`. Portfolio and testimonials render only real, permitted
> entries (and an honest "being added" state otherwise).
>
> **Before going live with a real domain,** work through
> [`docs/OWNER_CONTENT_REQUIRED.md`](docs/OWNER_CONTENT_REQUIRED.md) — the single
> checklist of real information the owner must supply.

---

## Repository layout

The Next.js app is the **repository root** — `package.json`, `next.config.mjs`,
and `src/` sit at the top level (no nested project folder). Clone it and run
commands from the root.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.ts`)
- **Zod** for shared client + server form validation
- **lucide-react** icons
- Static generation for all pages; a single dynamic API route for the quote form
- Deploys on **Vercel**; quote delivery via **Formspree** (easiest) or **Resend**

Hand-rolled UI primitives in `src/components/ui` follow a shadcn/ui-style API, so
you can drop in shadcn components later without reworking call sites.

---

## Prerequisites

- **Node.js 18.17+** (or 20+). Check with `node -v`.
- npm (ships with Node). pnpm/yarn work too.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in values (see below)
npm run dev                    # http://localhost:3000
```

Useful scripts:

```bash
npm run dev         # local dev server
npm run build       # production build (must pass before deploy)
npm run start       # run the production build locally
npm run typecheck   # TypeScript only, no emit
npm run lint        # Next.js/ESLint
```

> Fonts (Archivo + IBM Plex Sans/Mono) are **self-hosted** as `.woff2` files in
> `src/app/fonts/` and loaded with `next/font/local`. The build needs no network
> access and makes no requests to Google's CDN at runtime. To change typefaces,
> drop new `.woff2` files in that folder and update the paths in `layout.tsx`.

---

## Rebranding: edit ONE file first

`src/config/site.ts` is the **single source of truth** for business identity:
name, phone, email, address, service areas, social links, hours. The header,
footer, every page, SEO metadata, and structured data all read from it. Change
it here and it changes everywhere.

Then review the content data:

| File | What it controls |
| --- | --- |
| `src/config/site.ts` | Name, contact, service areas, social links |
| `src/content/services.ts` | The three service offerings + details |
| `src/content/pricing.ts` | Pricing tiers and the honest pricing note |
| `src/content/faq.ts` | FAQ questions/answers (also powers FAQ rich results) |
| `src/content/testimonials.ts` | Reviews — **empty by default**; add real, permitted quotes (`permissionToDisplay: true`) or the section stays hidden |
| `src/content/portfolio.ts` | Work — **empty by default**; add real projects + screenshots (`permissionToDisplay: true`) or an honest "being added" state shows |

### Images

Drop real images into `/public` (e.g. `/public/work/acme-desktop.jpg`) and set
`desktopScreenshot` (and optionally `mobileScreenshot`) on a project in
`src/content/portfolio.ts`. In development, a missing image renders a clearly
labeled placeholder frame so nothing looks accidentally empty; descriptive `alt`
text is required by the components.

---

## Quote form delivery — pick one path

The quote form (`/contact`) validates on the client, then submits. Choose how
leads are delivered by setting environment variables:

**Path A — Formspree (recommended, easiest).** Set
`NEXT_PUBLIC_FORMSPREE_ENDPOINT` to your Formspree form URL. The client posts
directly to Formspree — no server email code and no domain verification needed.

**Path B — Resend.** Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and a verified
`QUOTE_FROM_EMAIL`. Submissions POST to the built-in `/api/quote` route, which
re-validates server-side, blocks spam (honeypot + rate limit), and emails you the
lead. Requires verifying your sending domain in Resend first.

**No config?** The form still "succeeds" in **log mode**: submissions are
validated and printed to the server console (visible in `vercel logs` or your
terminal) but **not delivered**. A dev-only warning appears on the form and in
the server log so this is obvious. Fine for testing; **configure a path before
launch.**

See [`docs/SEO_SETUP.md`](docs/SEO_SETUP.md) for analytics/conversion tracking.

---

## Deploy: GitHub → Vercel

This repo builds and runs **with zero environment variables**, so you can deploy
first and configure later. (With nothing set, the quote form validates and logs
the lead to the server console instead of emailing it — see "Quote form delivery".)

### 1. Push to GitHub

From the repository root:

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main                  # CI runs on `main`
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

(Create the empty repo on GitHub first — no README/.gitignore, this repo has them.)

### 2. Import to Vercel

1. Vercel → **Add New → Project** → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). **Leave every build setting
   alone** — no root directory override, no custom build command. The app *is*
   the repo root.
3. Click **Deploy**. You get a live preview URL.

Canonical URLs, sitemap, and Open Graph automatically fall back to Vercel's
`VERCEL_URL` on previews, so they're correct even before you set a domain.

### 3. Configure when ready (all optional for the first deploy)

Under **Settings → Environment Variables**, add from `.env.example`:

| Variable | When you need it |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Before production — set to your real domain (no trailing slash) |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | To actually receive quote emails (easiest path) |
| `RESEND_API_KEY` + `QUOTE_TO_EMAIL` + `QUOTE_FROM_EMAIL` | Alternative to Formspree |
| `NEXT_PUBLIC_ANALYTICS_ID` | If/when you choose an analytics provider |

Redeploy after adding variables. Add your custom domain last, under
**Settings → Domains**.

> Never commit `.env.local` or any real secret — it's git-ignored on purpose.
> Environment variables live in Vercel, not in the repo.

> **Before going public with a real domain,** work through
> [`docs/OWNER_CONTENT_REQUIRED.md`](docs/OWNER_CONTENT_REQUIRED.md) and the
> [Launch Checklist](docs/LAUNCH_CHECKLIST.md).

---

## After launch: get indexed by Google

1. Create/verify the property in **Google Search Console**.
2. Submit your sitemap: `https://your-domain.com/sitemap.xml`.
3. Use **URL Inspection → Request Indexing** for your homepage and key pages.
4. Connect and verify your **Google Business Profile**, then add its URL to
   `site.social.googleBusiness` so the "See us on Google" links appear.

Full details and the SEO checklist: [`docs/SEO_SETUP.md`](docs/SEO_SETUP.md).

---

## Security notes (please read)

- Secrets are read from environment variables only; nothing is hard-coded.
- The quote route re-validates **server-side** (never trusts the client) and
  applies a honeypot + basic in-memory rate limit. For high-traffic sites, back
  the rate limiter with a durable store (Upstash/Vercel KV) — noted in the route.
- Baseline security headers are set in `next.config.mjs`. A strict
  `Content-Security-Policy` is intentionally left for you to tune to whatever
  analytics/embeds a given client uses.
- No system is ever "completely secure." Keep dependencies updated
  (`npm outdated`) and re-run `npm audit` periodically.

---

## Accessibility & quality

Semantic HTML, labeled form fields with useful validation messages, keyboard
navigation, a skip-to-content link, visible focus rings, reduced-motion support,
and a mobile-first layout that avoids horizontal overflow are all built in. Still
run a manual pass before launch — see the
[Launch Checklist](docs/LAUNCH_CHECKLIST.md).

---

## Not yet implemented (planned)

To keep the site honest, these are **not built** and are not claimed anywhere in
the public copy:

- **Stripe / online payments** — no checkout, invoicing, or payment code exists
  yet. When added, it belongs in a new server route (e.g. `src/app/api/checkout/`)
  with the secret key server-side only.
- **Lead dashboard / CRM + SMS automation** — described in
  [`docs/DASHBOARD_PLAN.md`](docs/DASHBOARD_PLAN.md) as a plan, and sold as a
  scoped Lead System engagement. Nothing on the marketing site implies it ships
  automatically.

---

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:
`npm ci` → `npm run typecheck` → `npm run lint` → `npm run build` on Node 20.
`next-env.d.ts` is committed so type-checking works on a fresh clone before the
first build.

---

## Documentation index

- [`docs/OWNER_CONTENT_REQUIRED.md`](docs/OWNER_CONTENT_REQUIRED.md) — **start
  here before launch:** every real detail the owner must supply
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — sitemap, homepage
  conversion flow, architecture, and decisions
- [`docs/CLIENT_STARTER.md`](docs/CLIENT_STARTER.md) — clone & rebrand for a new
  client; folder/component architecture
- [`docs/INTAKE_QUESTIONNAIRE.md`](docs/INTAKE_QUESTIONNAIRE.md) — client intake
  questionnaire
- [`docs/SCOPE_TEMPLATE.md`](docs/SCOPE_TEMPLATE.md) — project-scope template
- [`docs/DASHBOARD_PLAN.md`](docs/DASHBOARD_PLAN.md) — internal project dashboard
  technical plan
- [`docs/SEO_SETUP.md`](docs/SEO_SETUP.md) — reusable SEO setup + indexing steps
- [`docs/AUDIT_CHECKLIST.md`](docs/AUDIT_CHECKLIST.md) — website audit checklist
- [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) — pre-launch checklist
- [`docs/MAINTENANCE_CHECKLIST.md`](docs/MAINTENANCE_CHECKLIST.md) — monthly care

---

## What the owner still needs to supply

The complete, grouped checklist lives in
[`docs/OWNER_CONTENT_REQUIRED.md`](docs/OWNER_CONTENT_REQUIRED.md) — business
identity, contact info, service area, portfolio, testimonials, images, pricing,
form delivery, analytics, domain, and the privacy-policy legal review.
