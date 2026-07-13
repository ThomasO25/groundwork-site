# Groundwork Web Studio — Project Review Sheet

**Repository:** `ThomasO25/groundwork-site`
**Latest commit:** `9b8e7fc09798055923262516e8f2526963e271e5`
**Status:** Preview-ready. Not yet launched (owner content + form delivery outstanding).
**Written for:** independent technical review.

This is a factual record, not a sales pitch. Known gaps, deferred items, and
things that could not be verified are listed explicitly in §12 and §13.

---

## 1. What the site is

A marketing and lead-generation website for **Groundwork Web Studio**, which builds
websites and web-based lead systems for local service businesses (contractors,
home services, tinting/auto, marine, industrial, gyms, and similar trades).

The site's job, in order: establish credibility → show real work → explain the
benefit in the owner's language → get the visitor to request a free website plan.

**Founder:** Thomas Olsen, Long Island, New York.

---

## 2. Technical architecture

| | |
| --- | --- |
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS (custom token set — no UI kit, no component library) |
| Rendering | Static generation for all pages; one dynamic route (`/api/quote`) |
| Fonts | Archivo + IBM Plex Sans, **self-hosted** via `next/font/local` (no Google Fonts request, no third-party font traffic) |
| Icons | lucide-react |
| Validation | Zod, one schema shared by client and server |
| Hosting target | Vercel (zero-config; the app *is* the repo root) |
| CI | GitHub Actions: `npm ci` → typecheck → lint → build on every push and PR |

**94 tracked files.** 23 components, 10 route handlers/pages, 5 content files,
4 lib modules, 10 docs, 7 brand assets.

**Bundle:** 87.3 kB shared JS. Most pages 96–101 kB first-load. Contact is the
heaviest at 123 kB (it carries the form + Zod).

**No browser storage** is used anywhere (no localStorage/sessionStorage/cookies
set by the app itself).

---

## 3. Routes (17 static pages generated)

| Route | Type | Notes |
| --- | --- | --- |
| `/` | Static | Homepage |
| `/services` | Static | Service index |
| `/services/starter-site` | SSG | |
| `/services/business-website` | SSG | |
| `/services/growth-website` | SSG | |
| `/services/lead-system` | SSG | |
| `/pricing` | Static | |
| `/work` | Static | Portfolio (honest empty state until real projects exist) |
| `/about` | Static | |
| `/faq` | Static | |
| `/contact` | Static | Quote form |
| `/privacy` | Static | **Template — needs legal review** |
| `/api/quote` | Dynamic | Form endpoint (server-side validation) |
| `/sitemap.xml` | Static | Auto-generated from routes + services |
| `/robots.txt` | Static | |
| `/_not-found` | Static | |

---

## 4. The public offer (as implemented)

| Level | Public price | Notes |
| --- | --- | --- |
| **Starter Site** | Starting at **$750** | Up to 3 pages. Client supplies content + photos. Built on the existing design system. Limits stated publicly. |
| **Business Website** | Starting at **$1,500** | Up to 6 pages. Labelled *"Best fit for most established local businesses."* |
| **Growth Website** | Starting at **$2,500** | Final price depends on scope. |
| **Lead System / Custom Build** | **Custom quote** | No artificial maximum published. |
| **Website Care** | Starting at **$75/month** | **Optional.** A service, not a licence. |

**Deliberate constraints honoured throughout:**

- Every price is a **starting** price. No fixed prices for scoped work.
- **No financing.** No universal payment schedule advertised. Payment terms read:
  *"Projects typically begin with a deposit, with the remaining balance scheduled
  according to the project scope"* — set out in the written proposal.
  **No public deposit percentage** is stated (awaiting owner decision).
- Starter Site limits are published ("Kept deliberately simple") so it cannot
  quietly become the Business Website through scope creep.
- **No fake "Most Popular" badge.** The label is descriptive.
- Care is explicitly not required to keep ownership. Edits are "within an agreed
  monthly allowance" — **never** described as unlimited.
- **No guaranteed leads, rankings, revenue, or growth** anywhere in the copy.

The site communicates *starting prices and value only*. **No internal pricing
data** — service catalog, margins, labour assumptions, complexity multipliers,
contingency rates, referral commissions — appears anywhere in the repository. The
owner's separate internal Pricing & Quote Workbook governs actual quoting.

---

## 5. Homepage conversion flow

1. **Hero** — headline, offer, two CTAs, plus an *honest* responsive-design visual
   (desktop + phone frames with abstract tone bars; **no fake client, no fake
   testimonial, no fake chart, no fake lead count**). Captioned as an example layout.
2. **Real work** — hidden entirely until permitted projects exist.
3. **Who we help** — inline trade list, not a card grid; makes clear the studio
   isn't construction-only.
4. **Benefits** — consolidated editorial list in owner language.
5. **The offer** — *"Professional websites for local businesses, starting at $750"*
   + a panel explaining exactly what the free website plan is **and isn't**.
6. **Process** — flowing 4-step timeline.
7. **Founder** — direct-relationship section.
8. **FAQ** — clean accordion.
9. **Final CTA.**

Primary CTA is **"Get My Free Website Plan"** consistently across the whole site.

The homepage is **not** a pricing table and contains **no services grid** — that
section was deleted because it repeated the offer section and the pricing page
without adding proof or trust.

---

## 6. The "free website plan" offer

Explained on both the homepage and the contact page. The visitor is told they get:

- A recommendation for what the website should do
- The suggested scope, and the pages/features that matter
- Which service level fits, and a starting or estimated price
- Recommended next steps — theirs to keep either way

And explicitly told what it **is not**: not a mockup, not a finished design, not
an SEO audit, not a full strategy document. This protects the studio from being
asked for hours of unpaid design work.

---

## 7. Lead capture pipeline

**Form fields:** name, business, email *or* phone (at least one required — enforced
by `superRefine`), current website (optional), what they need help with, an optional
service-interest select (situation-based, **not** package-based), and a collapsed
optional step (business type, budget, timeline). Budget defaults to **"Not sure yet."**

**Nobody is required to choose a package to get in touch.**

| Protection | Implementation |
| --- | --- |
| Client validation | Zod, inline accessible errors, focus moves to first invalid field |
| Server validation | **Same Zod schema re-run server-side** — the client is never trusted |
| Honeypot | Off-screen `company_website` field; bots are silently accepted, not bounced |
| Rate limiting | In-memory, 5 requests / 60s per IP |
| Duplicate submission | Payload hash compared; identical resubmit short-circuits to success |
| Source tracking | UTM params, `?plan=`, and referrer captured |
| Delivery | **Formspree** (recommended) or **Resend**; falls back to server-side logging |
| Missing config | Dev-only warning on the form + server warning. **Never shown to visitors.** |
| Secrets | Resend key is server-only. No private key reaches the browser. |

**Success state** offers a booking link **only if** `NEXT_PUBLIC_BOOKING_URL` is set.

---

## 8. The honesty architecture (the most important design decision)

**Every unverified fact is hidden, never faked.** `src/config/site.ts` is the single
source of truth; an empty field switches the corresponding UI *off* rather than
rendering a placeholder.

| Not supplied | What the visitor sees |
| --- | --- |
| Phone / email | No call buttons, no mobile call bar, no footer contact — the form is the path |
| `legalName` | Footer shows "Groundwork" — **never an invented "LLC"** |
| Founder photo/bio | Name + location + true direct-relationship copy. **No invented backstory** |
| Portfolio projects | Homepage work section hidden; `/work` shows an honest branded empty state |
| Testimonials | Section hidden entirely |
| Service area | Hidden. **Not assumed from the founder's location** |

Portfolio and testimonials both require an explicit **`permissionToDisplay: true`**
flag — content does not render without it. Portfolio supports: project name,
business name, industry, location, problem, work completed, features, desktop
screenshot, mobile screenshot, live URL, optional *verified* outcome, permission flag.

**`ImagePlaceholder` returns `null` in production.** Development placeholder frames
and instructions are structurally incapable of reaching a visitor.

There are **zero** fake projects, testimonials, reviews, ratings, results, phone
numbers, addresses, licences, or years-in-business anywhere in the codebase.

---

## 9. Brand implementation

The monogram was recovered from the supplied artwork as a **true antialiased alpha
mask** (luminance-normalised between the solid charcoal plate and the solid beige
glyph), then re-rendered at each size in each brand tint on transparency. No white
halos, no rough edges, tight-cropped. **These are not renamed copies of the source files.**

**Generated:** `groundwork-{mark,wordmark,logo}-{light,dark}.png`, `groundwork-og.png`
(1200×630), `favicon.ico`, `favicon-16x16`, `favicon-32x32`, `apple-touch-icon` (180),
`icon-192`, `icon-512`, `site.webmanifest`.

The wordmark PNGs are set in **Archivo ExtraBold — the site's own self-hosted font** —
so exported artwork and rendered pages stay consistent. In the UI, "GROUNDWORK" and
"WEB STUDIO" render as **accessible HTML text** beside the monogram image: crisp at
any zoom, selectable, translatable, screen-reader readable.

`src/components/brand/groundwork-logo.tsx` — one component, variants `full` /
`wordmark` / `mark` × `light` / `dark` × 3 sizes, with a linking variant for nav.

**Colours (sampled from the supplied logo, not guessed):** charcoal `#211F21`,
beige `#C0AA8B` (light bg), sand `#D8BE9E` (dark bg), cream `#FAF6F0`, warm grey
`#F1E9DE`.

---

## 10. Design system

Warm editorial studio, not industrial and not an AI template. Deliberately avoided:
cool greys, neon accents, gradients, glowing cards, pill shapes, floating shapes,
fake dashboards, and multi-colour palettes.

- **Typography:** Archivo (display) + IBM Plex Sans (body). **IBM Plex Mono was
  removed entirely** — deleted from the font loading, the Tailwind config, and all
  28 files that used it. Two fewer font files shipped.
- **No `SVC-01` / `PLN-01` decorative labels.** No all-caps monospace eyebrows.
- **One button system:** charcoal primary on light, sand on dark, quiet outline
  secondary. Medium radius. No bespoke button styles per section.
- **One motif:** a 45° angular notch echoing the cut in the G monogram. Used sparingly.
- **Animation:** a single gentle rise on the hero. No parallax, no cursor followers,
  no animated gradients. `prefers-reduced-motion` fully respected.
- Dark charcoal sections are used **deliberately and sparingly** (founder, final CTA)
  rather than as the site's default mood.

---

## 11. SEO, structured data, analytics

**Structured data — the notable correctness detail:** "Starting at $X" is a
*minimum*, so it is modelled as `Offer → PriceSpecification → minPrice`, **never as
a fixed `price`**. The Lead System emits **no offer at all**, because a custom quote
must not be represented as a fixed-price product. Verified in the built HTML:

```
starter-site      minPrice=750    fixedPrice: no
business-website  minPrice=1500   fixedPrice: no
growth-website    minPrice=2500   fixedPrice: no
lead-system       no offer         ← correct
```

Types emitted: `ProfessionalService`, `Service`, `Offer`, `PriceSpecification`,
`FAQPage`. **No `AggregateRating`, no `Review`** — confirmed by enumerating every
`@type` in the output. Fabricated review markup would be both dishonest and a Google
structured-data violation.

The `ProfessionalService` block **omits** telephone, email, address, and areaServed
entirely while they're unconfigured, rather than emitting empty or invented values.

**Search-visibility language** is precise throughout. *"We get you listed with
Google"* was replaced with *"we set up the technical foundations that help search
engines discover and understand your website."* The pricing page and FAQ both state
plainly that **nobody can guarantee rankings, placement, or lead volume.** What is
claimed: sitemaps, robots config, on-page SEO, structured data, Search Console
setup assistance, and Google Business Profile assistance *for eligible businesses*.

**Canonicals + Open Graph** fall back to Vercel's `VERCEL_URL` on previews, so link
previews are correct before a domain exists.

**Analytics:** GA4 and Microsoft Clarity, both **off by default**. No tracking script
loads and no third-party request is made unless an ID is set. Events (`cta_click`,
`phone_click`, `email_click`, `portfolio_click`, `contact_form_start`,
`contact_form_submit`, `booking_click`) are captured by event delegation, so server
components stay server components.

---

## 12. Verification results

**Quality gates — from a clean `npm ci` in a fresh extract of the delivered code:**

| Check | Result |
| --- | --- |
| `npm ci` | 396 packages |
| `npm run typecheck` | **exit 0**, clean |
| `npm run lint` | **No ESLint warnings or errors** |
| `npm run build` | **✓ 17/17 static pages**, with **zero environment variables set** |
| `npm audit` | **5 vulnerabilities (4 high, 1 moderate)** — see §13 |

**Browser testing (headless Chromium, production build):**

- **12 public routes × 320 / 375 / 430 / 768 / 1024 / 1440px** → **zero horizontal
  overflow** at every combination.
- **Zero 404s**, zero failed network requests, **zero console/page errors**.
- **Zero broken images** on any page. All 12 internal links resolve.
- Every brand asset returns 200 (favicons, app icons, manifest, OG, all 7 brand PNGs).
- **Exactly one `<h1>` per page; no skipped heading levels** on any page.
- All images have `alt` attributes. All tap targets meet WCAG 2.5.8 (≥24px).
- Contact form renders 12 fields; submit reads "Get my free website plan."

**Production HTML content sweep — all absent:** "Client asset", "Add a real photo",
"Financing available", "Get a free quote", `$500 per month`, `$4,000–$7,500`,
"listed with Google", "Most popular", 555 numbers, "LLC", `SVC-01`/`PLN-01`,
monospace, dev instructions, fake projects, fake testimonials, guarantee language.

**Pricing consistency:** `$750` / `$1,500` / `$2,500` / Custom quote / `$75/month`
appear identically across pages, structured data, metadata, and content files.

---

## 13. Known issues and deferred items

Stated plainly rather than buried:

1. **`npm audit`: 5 advisories (4 high, 1 moderate).** All originate from Next.js
   14.2.35 — which is the *latest* 14.x, so no in-range fix exists. The only
   available fix is `npm audit fix --force`, which jumps to **Next 16** (two major
   versions, breaking). This was **deliberately not applied**. Most advisories don't
   apply to this app's feature usage (no middleware, no i18n, no rewrites, empty
   `next/image` remotePatterns, no CSP nonces, no `beforeInteractive` scripts; it's
   static pages plus one POST route). **Recommendation:** a deliberate, tested
   upgrade on a branch before taking serious traffic. Not a launch blocker.
2. **The privacy policy is a template.** It carries a visible "template" banner and
   needs legal review + an effective date before launch.
3. **The wordmark PNGs are set in Archivo**, which is very close to the supplied
   reference but not necessarily a pixel-identical match to the original font. The
   *on-site* wordmark is HTML text in Archivo, so the site is internally consistent
   either way. If the original vector exists, it can be swapped in.
4. **Lighthouse/Core Web Vitals were not measured.** The build is static with a small
   bundle and self-hosted fonts, but that's an expectation, not a measurement.
5. **The form has never delivered a real email**, because no Formspree/Resend account
   is configured yet. The pipeline is tested; the delivery leg is not.

---

## 14. Remaining owner content

**Supplied and implemented:** founder name (Thomas Olsen), location (Long Island, New York).

| Item | Status | Effect while missing |
| --- | --- | --- |
| **Formspree endpoint** | ⬜ **Blocker** | Leads validate and show success but are only logged to the server console — **not emailed** |
| Founder photo | ⬜ Blocker | Section renders text-only; no empty frame |
| Founder bio | ⬜ Blocker | Name + true direct-relationship copy only; **no invented backstory** |
| Phone number | ⬜ Blocker | All call buttons + mobile call bar hidden |
| Business email | ⬜ Blocker | Email UI hidden |
| Final domain | ⬜ Blocker | Canonical/OG fall back to the Vercel preview URL |
| Portfolio projects (screenshots + written permission) | ⬜ | Work section hidden; honest empty state shown |
| Privacy legal review | ⬜ Blocker | Template banner remains |
| Service area (decision) | ⬜ | Hidden. **Not assumed** from the founder's location |
| Deposit % (decision) | ⬜ | No public figure stated |
| Analytics IDs / booking link | ⬜ Optional | Features stay off; no third-party scripts load |

---

## 15. Commit history

```
9b8e7fc  Offer implementation: 4-tier public pricing, no universal payment plan,
         honest search language, service-interest field, minPrice structured data
bf80622  Audit fixes: valid heading hierarchy; START-HERE guide
240e9d8  Redesign: warm editorial brand system, official logo + favicons + OG
fe81b53  Conversion pass: homepage flow, hide placeholders, founder, analytics
a2c6930  Deploy-ready: VERCEL_URL fallback, GitHub+Vercel quickstart
c9882d7  Pre-launch cleanup: placeholder safety, portfolio schema, CI, docs
```

---

## 16. Single recommended next action

**Supply the Formspree endpoint.** It is a two-minute change and it is the only
thing standing between a working website and one that actually receives leads.
Everything else on the list improves the site; this one is the difference between
it working and silently losing customers.
