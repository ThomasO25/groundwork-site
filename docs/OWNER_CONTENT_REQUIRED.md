# Owner Content Required — Before Launch

The site is **safe to show publicly right now**. It never displays a fake phone
number, address, email, review, rating, result, project, or founder. Anything not
yet supplied is **hidden**, not faked — and no internal placeholder instructions
are ever shown to a visitor.

Everything below turns a hidden feature back on. Most of it lives in one file:
**`src/config/site.ts`**.

**[BLOCKER]** = required before pointing a real domain at the site.
_[optional]_ = improves the site, not required to launch.

---

## 1. Founder / who clients work with — `src/config/site.ts` → `founder`

Right now the homepage shows an honest section explaining that clients work
directly with the person who builds their site. It names nobody and shows no
photo. Supplying the details below upgrades it to a real, trust-building founder
card with a photo — **this is the single highest-impact item on this list.**

| Field | What's needed | Status |
| --- | --- | --- |
| `founder.name` | **[BLOCKER]** Real first + last name of the person clients deal with. | Empty → generic section |
| `founder.photo` | **[BLOCKER]** A real photo of that person. Save to `/public/founder.jpg`, then set `"/founder.jpg"`. Head-and-shoulders, decent light, no stock photos. Also used on the About page. | Empty → no photo shown |
| `founder.bio` | **[BLOCKER]** 2–4 true sentences: who you are, how you got here, why local businesses. **Do not invent a backstory** — write it yourself or send bullet points. | Empty |
| `founder.location` | _[optional]_ e.g. `"Tampa, FL"` | Empty |
| `founder.phoneDisplay` + `founder.phoneHref` | _[optional]_ A direct line, shown only in the founder card. | Empty |
| `founder.email` | _[optional]_ A direct email for the founder card. | Empty |

---

## 2. Contact information — `src/config/site.ts` → `contact`

**[BLOCKER]** Until these exist, the site has **no phone or email anywhere** —
every click-to-call button, the mobile call bar, and the footer contact rows are
hidden. The quote form is currently the only way to reach you.

| Field | Example |
| --- | --- |
| `contact.phoneDisplay` | `"(813) 555-0100"` — what people see |
| `contact.phoneHref` | `"+18135550100"` — E.164 (a `+`, country code, digits only) |
| `contact.email` | `"hello@yourdomain.com"` |

---

## 3. Business identity — `src/config/site.ts`

- **[BLOCKER]** `name` — confirm or replace the working name **"Groundwork"**.
- **[BLOCKER]** `legalName` — set **only if a legal entity actually exists**
  (e.g. `"Groundwork Studio LLC"`). Leave empty otherwise: the footer shows
  `name` alone and **never invents an "LLC"**.

---

## 4. Service area — `src/config/site.ts`

- _[recommended]_ `primaryRegion` — e.g. `"the Tampa Bay area"`. Empty = neutral
  wording. Appears in the hero, footer, and contact page.
- _[recommended]_ `serviceAreas` — the towns/counties you **actually** serve.
  Empty = the service-area card is hidden. Don't list places you don't cover.

---

## 5. Portfolio — `src/content/portfolio.ts`

**[BLOCKER for credibility]** The homepage portfolio section is **hidden entirely**
until at least one project exists, and `/work` shows an honest "we only publish
work with permission" page. **Three real projects** is the target.

For **each** project:

| Field | Required? | Notes |
| --- | --- | --- |
| `name` | Yes | Project/site name |
| `businessName` | Yes | The client |
| `industry` | Yes | e.g. "Roofing", "Window tinting" |
| `location` | Yes | e.g. "Tampa, FL" |
| `problem` | Yes | 1–2 sentences: what was wrong before |
| `workCompleted` | Yes | What you actually delivered |
| `features` | Yes | 3–5 short items |
| `desktopScreenshot` | Yes | Real capture → `/public/work/<slug>-desktop.jpg` |
| `mobileScreenshot` | Yes | Real capture → `/public/work/<slug>-mobile.jpg` |
| `liveUrl` | Optional | Link to the live site |
| `outcome` | Optional | **Only if verified AND permitted.** e.g. "Quote requests doubled in 3 months". **Never estimate or invent a number.** |
| `permissionToDisplay` | Yes | `true` only once the client has actually agreed |

**Permission:** get it in writing (an email is fine) before setting
`permissionToDisplay: true`. Nothing renders without it.

---

## 6. Testimonials — `src/content/testimonials.ts`

_[optional but powerful]_ Real client quotes only, each with
`permissionToDisplay: true`. The section is **hidden entirely** while empty —
no invented reviews, ever. Needs: quote, name, business, location, permission.

---

## 7. Images — `/public`

| Image | Where it shows | If missing |
| --- | --- | --- |
| Founder photo | Founder section + About page | Hidden — clean text-only layout, no empty frame |
| Project screenshots (desktop + mobile) | Portfolio | Project won't display properly |

Real photos only — your work, your crew, your finished sites. **No stock photos.**

**Already done:** the logo, favicons, app icons, and social/Open Graph image are
built from your official artwork and need nothing from you. See
`public/brand/README.md`. The hero uses a custom brand composition rather than a
photo, so no hero image is required.

---

## 8. Pricing decisions — `src/content/pricing.ts` + `src/content/services.ts`

_[confirm]_ The public pricing is now:

- **Website Launch** — Starting at **$1,500**, or **$500/month for three months**. Optional care from **$75/month**.
- **Growth Website** — Starting at **$2,500**. Final price based on pages, content, service areas, and features.
- **Lead System** — **Custom quote**, scoped to dashboards, integrations, follow-up automation, and admin needs.

Confirm these match what you'll actually honour. Copy deliberately contains **no
guaranteed rankings, leads, or revenue** — keep it that way.

---

## 9. Form delivery — `.env.local` / Vercel env vars **[BLOCKER]**

Pick **one** or leads are only logged to the server console:

- **Formspree (easiest):** set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. No domain verification needed.
- **Resend:** set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` (needs a verified domain).

Then **send a real test submission** and confirm it arrives.

---

## 10. Scheduling link — `NEXT_PUBLIC_BOOKING_URL`

_[optional]_ A Calendly / Cal.com / Google Appointments URL. When set, people are
offered a short intro call **immediately after submitting the form** — the single
easiest conversion win here. Empty = the option is hidden.

---

## 11. Analytics — `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID`

_[optional]_ Nothing loads unless you set an ID — no third-party requests at all
by default.

- **Google Analytics 4** → `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`)
- **Microsoft Clarity** → `NEXT_PUBLIC_CLARITY_ID` (heatmaps + session replay)

Once set, these fire automatically: `cta_click`, `phone_click`, `email_click`,
`portfolio_click`, `contact_form_start`, `contact_form_submit`, `booking_click`.

⚠️ If you enable analytics, **update the privacy policy to say so** (§13).

---

## 12. Domain — `NEXT_PUBLIC_SITE_URL` **[BLOCKER]**

Set to the final production URL (no trailing slash) so canonical URLs, the
sitemap, and link previews are correct. Previews auto-use the Vercel URL.

---

## 13. Legal review — `src/app/privacy/page.tsx` **[BLOCKER]**

The privacy policy is a **template**. Have it reviewed, tailor it to how you
actually handle data (form provider, analytics, hosting), add an effective date,
and remove the on-page "template" banner.

---

## Pre-launch gate

1. Founder name, photo, and bio supplied.
2. Real phone + email in `site.contact`.
3. At least one — ideally three — real projects with permission and screenshots.
4. Form delivery configured, with a test lead received.
5. `NEXT_PUBLIC_SITE_URL` set to the real domain.
6. Privacy policy reviewed, dated, banner removed.
7. `npm run typecheck && npm run lint && npm run build` — all green.
