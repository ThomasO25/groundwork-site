# Launch Checklist

Work top to bottom before pointing the domain at the site. Items marked **BLOCKER**
should not be skipped.

## 1. Identity & content (replace all placeholders)
- [ ] **BLOCKER** `src/config/site.ts` — real business name, legal name, phone, email,
      address, primary region, and service areas.
- [ ] **BLOCKER** Confirm the phone number is a real, monitored line (it's a `tel:` link
      in many places, including the sticky mobile bar).
- [ ] `src/content/services.ts` and `pricing.ts` — real services, real prices (or route
      to quote), real "what's included."
- [ ] `src/content/faq.ts` — real answers to your customers' real questions.
- [ ] `src/content/testimonials.ts` — **remove placeholders**; add only real, permissioned
      reviews, or leave empty. Never publish invented testimonials.
- [ ] `src/content/portfolio.ts` — **remove placeholders**; add only real projects with
      real (permissioned) images, or leave the section out until you have work to show.
- [ ] `src/app/privacy/page.tsx` — confirm the privacy policy reflects what you actually
      collect and do; fill the flagged specifics. (Consider legal review.)

## 2. Brand & assets
- [ ] Real logo in place of the wordmark mark, if you have one.
- [ ] Brand colors set in `tailwind.config.ts` (or keep the industrial default on purpose).
- [ ] Fonts swapped in `src/app/fonts/` + `layout.tsx` if the brand requires it.
- [ ] Replace every `ImagePlaceholder` (hero, about/team, work) with real photos, or
      confirm you're intentionally launching without them.
- [ ] Check the generated `/opengraph-image` looks right, or supply real share art.

## 3. Configuration & integrations
- [ ] **BLOCKER** `NEXT_PUBLIC_SITE_URL` set to the real production domain.
- [ ] Choose lead delivery and configure it:
      - **Resend** — set `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`
        (verify your sending domain in Resend), **or**
      - **Formspree** — set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- [ ] **BLOCKER** Submit a real test quote and confirm it actually arrives where the
      owner will see it. This is the #1 thing to verify — a form that silently fails
      loses every lead.
- [ ] Analytics decision: set `NEXT_PUBLIC_ANALYTICS_ID` (GA/Plausible) if desired, or
      launch without.
- [ ] `bookingUrl` and `site.social.*` links set if you use booking / have social pages.

## 4. Technical verification
- [ ] `npm run build` passes with no errors.
- [ ] `npm run typecheck` and `npm run lint` clean.
- [ ] Click every nav link and CTA; confirm phone/email links open the dialer/mail app.
- [ ] Test on a real phone — check the sticky mobile CTA bar and that nothing is hidden
      behind it.
- [ ] Check the site in a couple of browsers; confirm reduced-motion users are respected.
- [ ] Run Lighthouse (mobile) — aim for green Performance/Accessibility/Best-Practices/SEO.

## 5. Domain & deploy
- [ ] **BLOCKER** Confirm you control the domain and its DNS.
- [ ] Deploy to Vercel and set env vars in the Vercel project settings.
- [ ] Point the domain at Vercel; confirm HTTPS is active and `www`/apex both resolve.
- [ ] Confirm `https://yourdomain.com/sitemap.xml` and `/robots.txt` load correctly.

## 6. Post-launch (first 48 hours)
- [ ] Google Search Console: verify property, submit sitemap, request homepage indexing.
- [ ] Google Business Profile: claim/verify, complete, add its URL to `site.ts`.
- [ ] Send yourself one more real lead from the live site to confirm production delivery.
- [ ] Set a reminder for the monthly maintenance pass (see MAINTENANCE_CHECKLIST.md).
