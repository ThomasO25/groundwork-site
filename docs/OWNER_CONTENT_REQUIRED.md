# Owner Content Required — Before Launch

This site is safe to deploy to a **preview URL right now**: it never displays a
fake phone number, address, email, review, rating, license, or result. Anything
not yet provided is simply hidden.

Before pointing a real domain at it and going live, supply the real information
below. Most of it lives in one file: **`src/config/site.ts`**. When you fill a
field in, the matching UI turns back on automatically.

Legend: **[blocker]** = must be done before a public launch · _[optional]_ = nice to have.

---

## 1. Business identity — `src/config/site.ts`
- **[blocker]** `name` — Confirm or replace the working name **"Groundwork"** with the real business name. (A site must render *some* name, so this is the one value that ships non-empty.)
- **[blocker]** `legalName` — Set **only if a legal entity actually exists** (e.g. `"Acme Web Studio LLC"`). Leave empty otherwise; the footer will show `name` with **no invented "LLC"**.
- _[optional]_ `tagline`, `description` — Adjust wording to taste (currently generic but truthful).

## 2. Contact information — `src/config/site.ts` → `contact`
- **[blocker]** `phoneDisplay` + `phoneHref` — Real phone (display + E.164). Empty = all click-to-call UI stays hidden.
- **[blocker]** `email` — Real inbox. Empty = all email UI stays hidden (form still works).
- _[optional]_ `hours` — Used for structured data.

> With no phone/email set, the site still converts through the quote form; the contact page says so honestly.

## 3. Service area — `src/config/site.ts`
- _[optional but recommended]_ `primaryRegion` — e.g. `"the Tampa Bay area"`. Empty = neutral wording ("your area").
- _[optional but recommended]_ `serviceAreas` — Real cities/counties. Empty = the service-area UI is hidden. **Do not invent locations you don't serve** (and avoid thin "fake location" pages for SEO).

## 4. Portfolio — `src/content/portfolio.ts`
- **[blocker to show work]** Add real projects to the `projects` array using the documented shape. Each needs `permissionToDisplay: true` **and the client's actual permission**.
- Provide real **screenshots** in `/public` (e.g. `/public/work/acme-desktop.jpg`) and reference them.
- **Never invent outcome numbers.** Only add `outcome` if it's verified and you're permitted to state it.
- Until at least one project is added, `/work` shows an honest "projects being added" state and the homepage hides its work section.

## 5. Testimonials — `src/content/testimonials.ts`
- _[optional]_ Add real, permitted client quotes with `permissionToDisplay: true`.
- **Never invent reviews.** With none added, the testimonials section is hidden entirely.

## 6. Images — `/public`
- _[recommended]_ Hero image, About photo (headshot/team/workspace), and a real logo (`src/components/site/logo.tsx` currently renders a wordmark).
- Missing images render a clearly-labeled "client asset" placeholder in development so nothing ships looking accidentally empty.

## 7. Pricing decisions — `src/content/pricing.ts` & `src/content/services.ts`
- _[review]_ Confirm the three tiers, price ranges, financing, and maintenance figures match what you actually offer. Copy avoids guarantees by design — keep it that way (no promised rankings, lead counts, or revenue).

## 8. Form delivery — `.env.local` (see `.env.example`) **[blocker]**
Pick **one** path so quote submissions are actually delivered:
- **Formspree (easiest):** set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. No server email code or verified domain needed.
- **Resend:** set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` (requires a domain verified in Resend).
- If neither is set, the form still "succeeds" but the lead is **only logged to the server console** (a dev-only warning appears on the form and in the server log).

## 9. Analytics — `.env.local` + `src/app/layout.tsx`
- _[optional]_ Decide: GA4, Plausible, or none. Set `NEXT_PUBLIC_ANALYTICS_ID` and wire the script in `layout.tsx` only after choosing a provider. Update the privacy policy accordingly.

## 10. Domain & site URL — env **[blocker]**
- **[blocker]** Set `NEXT_PUBLIC_SITE_URL` to the final production URL (no trailing slash) so canonical URLs, sitemap, and Open Graph are correct.

## 11. Legal review — `src/app/privacy/page.tsx` **[blocker]**
- **[blocker]** The privacy policy is a **template**. Have it reviewed for your jurisdiction, tailor it to how you actually handle data (form provider, analytics, hosting), and **add an effective date**. Remove the on-page "template" banner once finalized.

---

## Quick pre-launch gate
1. `src/config/site.ts` filled with real name, contact, and (ideally) region/areas.
2. Form delivery configured (Formspree or Resend) and a test submission received.
3. `NEXT_PUBLIC_SITE_URL` set to the real domain.
4. Privacy policy reviewed + effective date + banner removed.
5. At least one real project (or intentionally launch with the honest empty state).
6. Re-run `npm run typecheck && npm run lint && npm run build` — all green.
