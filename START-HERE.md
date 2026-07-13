# START HERE

Everything is built, tested, and ready. Follow these steps in order.

---

## Step 1 — Put it on GitHub (5 minutes)

Unzip this folder, open a terminal **inside it**, then:

```bash
git init
git add -A
git commit -m "Groundwork Web Studio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Create the empty repo on GitHub **first** — no README, no .gitignore, no licence.
This project already has them.

> A GitHub Action (`.github/workflows/ci.yml`) runs automatically on every push:
> install → type-check → lint → production build. A green check means it's healthy.

---

## Step 2 — Deploy to Vercel (5 minutes)

1. Go to Vercel → **Add New → Project** → import your GitHub repo.
2. Framework preset: **Next.js** — it auto-detects.
3. **Change nothing else.** No root directory, no build command overrides. The app *is* the repo root.
4. Click **Deploy**.

**It builds with zero environment variables.** You get a live URL immediately.
Link previews and canonical URLs automatically use Vercel's own URL until you add a domain.

⚠️ At this point the site works, but the quote form **only logs leads to the server console** — it doesn't email you yet. That's Step 3.

---

## Step 3 — Turn on the quote form (10 minutes) — **required before real traffic**

The easiest path:

1. Go to [formspree.io](https://formspree.io), create a free form, copy the endpoint URL.
2. In Vercel → **Settings → Environment Variables**, add:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | your Formspree endpoint URL |

3. **Redeploy** (Deployments → ⋯ → Redeploy).
4. Submit the form on your own site. Confirm the email arrives.

*(Prefer Resend instead? Use `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`. See `.env.example`. Formspree is easier — no domain verification.)*

---

## Step 4 — Add your real details

Open **`src/config/site.ts`**. It's the one file that controls the whole site.

Anything you leave blank is **hidden** — never faked. Fill in a field and that part of the site switches on automatically.

| What | Where | Effect |
| --- | --- | --- |
| Phone + email | `contact` | Turns on every call button, the mobile call bar, footer contact |
| Your photo + bio | `founder` | Name (Thomas Olsen) and location (Long Island, NY) are already set. A photo + bio turn the section into a full founder card |
| Region + service areas | `primaryRegion`, `serviceAreas` | Adds your area to the hero, footer, contact page |
| Legal entity name | `legalName` | **Only if an LLC really exists.** Blank = no "LLC" shown anywhere |

For the founder photo: drop the file in `/public` (e.g. `/public/founder.jpg`) and set `photo: "/founder.jpg"`.

**The full checklist is in [`docs/OWNER_CONTENT_REQUIRED.md`](docs/OWNER_CONTENT_REQUIRED.md).**

---

## Step 5 — Add real projects

Open **`src/content/portfolio.ts`**. There's a commented-out example showing the exact shape.

Add a project, drop screenshots into `/public/work/`, and set `permissionToDisplay: true` **only once the client has actually agreed**.

The moment one real project exists, the homepage portfolio section and the "See Real Projects" button turn on by themselves.

---

## Step 6 — Before you point a real domain at it

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel to your real domain (no trailing slash)
- [ ] Have the privacy policy reviewed and add an effective date (`src/app/privacy/page.tsx`) — it's a template
- [ ] Add the domain in Vercel → **Settings → Domains**
- [ ] Optional: analytics (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`) and a booking link (`NEXT_PUBLIC_BOOKING_URL`)

---

## Running it on your own machine

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands: `npm run typecheck`, `npm run lint`, `npm run build`.

---

## What's already done — you don't need to touch these

- Logo, favicons, app icons, and the social/link-preview image — all built from your artwork (`public/brand/`)
- The full design system, all 11 pages, mobile layouts
- Form validation, spam protection (honeypot + rate limiting), accessible errors
- SEO: sitemap, robots.txt, structured data, link previews
- Nothing on the site is invented — no fake reviews, phone numbers, projects, or results

## One known item

`npm audit` reports 5 advisories, all from Next.js 14. The only fix is a jump to
Next 16, which is a breaking change — so it was **deliberately not applied**.
None of them apply to how this site is built (it's static pages plus one form
endpoint). Plan a tested upgrade before you're taking serious traffic; it isn't
urgent for launch.
