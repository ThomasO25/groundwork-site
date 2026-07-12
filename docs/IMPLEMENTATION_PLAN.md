# Implementation Plan & Architecture

This document covers the strategic deliverables behind the build: the sitemap,
the homepage conversion flow, the services & pricing structure, and the folder /
component architecture (both for this agency site and for a reusable per-client
template).

> **Placeholder notice.** Business identity (name "Groundwork", phone, email,
> address, service areas, reviews, licensing, years in business) is fictional and
> clearly flagged in `src/config/site.ts` and the content files. Replace before
> launch. Nothing in this build invents a real review, award, result, or client.

---

## 1. Recommended sitemap

A lead-gen site for local service businesses should be shallow, fast to navigate,
and funnel every page toward one of three actions: **call, request a quote, or
book**. Deep hierarchies bury the money pages. The structure below is intentionally
flat — every commercial page is one click from the header.

```
/                     Home — value prop, proof, services, process, CTA
/services             Services overview (all three offerings + how we work)
  /services/website-launch    SVC-01 · starter site
  /services/growth-website    SVC-02 · multi-page marketing site
  /services/lead-system       SVC-03 · site + automation/booking/CRM
/pricing              Transparent tiers + what's always included + financing/care
/work                 Portfolio (placeholder projects, clearly labeled)
/about                Studio story, values, who you're working with
/faq                  Objection-handling: cost, timeline, ownership, process
/contact              Quote form + phone + email + service-area list
/privacy              Privacy policy (placeholder specifics to confirm)

Machine routes (no nav):
/sitemap.xml          Auto-generated from routes + service slugs
/robots.txt           Allows crawl; disallows /dashboard and /api
/icon, /opengraph-image  Generated favicon + social-share card
/api/quote            Server endpoint that receives quote submissions
```

**Why these pages and not more.** Local service buyers make fast, trust-based
decisions. They want to know *what you do, what it costs, whether you're legit,
and how to reach you* — in that order. Blog, case-study, and resource sections can
be added later once there's real content; scaffolding them empty now would look
thin and hurt credibility. The `/work` and `/about` pages carry the trust load
until real testimonials and results exist.

**Growth room (not built, recommended next):** `/services/[slug]` already scales to
new offerings by adding an entry to `src/content/services.ts`. A `/blog` or
`/guides` section and per-industry landing pages (e.g. `/for/plumbers`) are the
natural SEO expansion once there's real content and results to show.

---

## 2. Homepage structure & conversion flow

The homepage is built as a **descending funnel**: grab attention, establish trust,
explain the offer, show the process, prove it, handle objections, then ask for the
conversion. Each section has one job.

| Order | Section (`src/components/sections/…`) | Job | Conversion role |
|------|----------------------------------------|-----|-----------------|
| 1 | `hero` | State the outcome ("More calls. More quotes. More booked work.") + 2 CTAs | Primary CTA above the fold |
| 2 | `trust-bar` | Licensed/insured, rating, years, local (all placeholder) | Reduce risk instantly |
| 3 | `services-overview` | Three offerings, each linking to detail | Route by intent |
| 4 | "Why us" (inline in `page.tsx`) | Four differentiators on a dark band | Build preference |
| 5 | `process` | 4 numbered steps — the only place numbers are used | Remove "what happens next" anxiety |
| 6 | recent work preview (`portfolio-grid`, limit 3) | Show tangible output | Proof (placeholder-labeled) |
| 7 | `testimonials` | Social proof (placeholder-labeled, never published as real) | Proof |
| 8 | `faq-section` | Pre-empt cost/timeline/ownership objections | Remove blockers |
| 9 | `cta-band` | Final call-to-action, dark, high-contrast | Capture the decided visitor |

**Conversion mechanics baked in everywhere:**

- **Sticky mobile CTA bar** (`mobile-cta-bar`) — a fixed "Call now / Free quote" bar
  on phones, where most local-service traffic lands. The body has bottom padding so
  content never hides behind it.
- **Click-to-call** everywhere the phone appears (`tel:` links), because a large share
  of these leads convert by phone, not form.
- **One primary action per view.** The hi-vis amber is reserved for the single most
  important CTA on screen so the eye always knows where to go.
- **Lead-source capture.** The quote form silently records `utm_*`, `?plan=`, `?ref=`,
  and referrer into a hidden field, so the owner learns which ads/pages produce leads.

---

## 3. Services & pricing structure

### Services (`src/content/services.ts`)

Three tiers of engagement, each a good-better-best step up in scope, so a visitor
self-selects by budget and need:

| Code | Service | Starting price* | Care plan* | Best for |
|------|---------|-----------------|-----------|----------|
| SVC-01 | Website Launch | $1,500 | $75/mo | New/very small businesses needing a credible presence fast |
| SVC-02 | Growth Website | $2,500–$3,500 | $150–$200/mo | Established businesses wanting more leads and content |
| SVC-03 | Lead System | $4,000–$7,500 | $250–$500/mo | Businesses ready to automate calls, quotes, and booking |

\* Placeholder pricing — set to your real numbers in `src/content/services.ts` and
`src/content/pricing.ts`. Each service defines `summary`, `priceFrom`, `care`,
`bestFor`, `includes[]`, and `outcomes[]`, rendered on both the overview and the
dynamic `/services/[slug]` detail page.

**Why three, presented this way.** A single price scares off small buyers and
under-charges big ones; a giant menu causes decision paralysis. Three clearly
differentiated tiers with plain-language "best for" guidance lets the visitor place
themselves. Every service page ends with the same two CTAs (get a quote / call).

### Pricing page (`src/content/pricing.ts` + `/pricing`)

- **Three plan cards** (PLN-01/02/03) mirroring the services, with the middle
  "Growth" plan visually featured as the recommended default.
- **"Always included" grid** — nine baseline commitments (mobile-first, fast, secure,
  SEO basics, you own it, etc.) shown once so they don't clutter each tier.
- **Financing & care explainers** — normalizes the monthly care plan and payment
  options, reducing sticker shock.
- **Honesty line** (`pricingNote`) — states that final price depends on scope and is
  confirmed in a quote. This sets expectations and protects the owner from being held
  to a headline number.

**Pricing philosophy:** show real starting numbers (transparency builds trust with
this audience and filters out tyre-kickers), but always frame them as "starting at"
and route to a quote for the exact figure.

---

## 4. Client intake questionnaire

Delivered as a standalone document — see **`docs/INTAKE_QUESTIONNAIRE.md`**. It is
structured to collect everything needed to scope, price, and start a project without
a second round of back-and-forth, and it maps directly onto the quote-form fields so
web leads and manually-onboarded clients produce the same data shape.

---

## 5. Reusable folder & component architecture

There are two architectures here: the **agency site** (this repo) and a **per-client
project template** the agency clones for each new build. Both follow the same
conventions so the team context-switches cleanly between them.

### 5a. Agency site architecture (this repo)

The guiding rule: **content, configuration, and presentation are separated** so a
non-developer can change business facts and copy without touching component code.

```
src/
  config/
    site.ts            ← SINGLE SOURCE OF TRUTH: name, contact, address,
                          service areas, social, hours. Edit this first to rebrand.
  content/             ← Editable copy/data, no JSX logic:
    services.ts          services + pricing detail
    pricing.ts           plan cards
    faq.ts               Q&A
    portfolio.ts         work samples (placeholder-flagged)
    testimonials.ts      reviews (placeholder-flagged, never auto-published)
  lib/                 ← Framework glue:
    utils.ts             cn() class helper
    validation.ts        zod quote schema (shared by client form + API)
    seo.tsx              metadata builder, JSON-LD (LocalBusiness / FAQ / Service)
    analytics.ts         trackConversion() — vendor-agnostic no-op until configured
  components/
    ui/                ← Primitives: button, field, section, image-placeholder
    site/              ← Chrome: logo, header, footer, mobile-cta-bar
    sections/          ← Page-level blocks (hero, process, cta-band, …) — composed
                          into pages; reused across the site
    forms/             ← quote-form (client-validated, honeypot, source capture)
  app/                 ← Routes (App Router). Pages mostly *compose* sections;
                          they hold little logic of their own.
    fonts/               self-hosted woff2 (no Google Fonts dependency)
```

**Why this shape:**
- **`config` + `content` are the "CMS."** Changing a phone number, a price, or an FAQ
  is a one-line edit in a plain data file — no component surgery, low risk of breakage.
- **`sections` are the reusable vocabulary.** A page is a short list of sections in an
  order. Reordering the funnel or reusing `cta-band` on another page is trivial.
- **`ui` primitives enforce consistency.** One `Button`, one field set, one `Section`
  wrapper means spacing, focus states, and the amber-CTA rule are defined once.
- **`lib` isolates the risky/vendor parts** (validation, SEO, analytics) so swapping an
  analytics provider or email service doesn't ripple through the UI.

### 5b. Reusable per-client project template

For client builds, clone this repo as a starter. The same structure applies; the
workflow to stand up a new client is:

1. **Copy the repo**, rename in `package.json`.
2. **Fill `src/config/site.ts`** with the client's real identity (the single edit that
   rebrands headers, footers, metadata, JSON-LD, and CTAs).
3. **Replace `src/content/*`** with the client's real services, pricing, FAQ, and — once
   collected and approved — real testimonials and portfolio entries.
4. **Swap brand tokens** in `tailwind.config.ts` (colors) and the `fonts/` folder
   (typefaces) for the client's brand.
5. **Drop in real assets** where `image-placeholder` frames sit (logo, hero, team,
   project photos).
6. **Choose integrations** per client: email delivery (Resend or Formspree), analytics,
   booking URL, Google Business Profile link — all wired through env vars and `site.ts`.
7. **Run `npm run build`** to verify, then deploy to Vercel.

Because every client-specific value is funneled through `site.ts`, `content/`, the
Tailwind tokens, and env vars, a new client site is a **configuration exercise, not a
re-engineering one** — which is what keeps per-project margins healthy.

---

## 6. Internal project dashboard

Delivered as a standalone technical plan — see **`docs/DASHBOARD_PLAN.md`**. Summary:
a lightweight internal-only dashboard on Supabase (Postgres + Auth + Row Level
Security) tracking clients, projects, and inbound leads, with the marketing site
optionally forwarding quote submissions into the `leads` table. It is specified as a
plan rather than built, in keeping with the "add a backend only when needed" principle
— the marketing site ships fully functional without it.
