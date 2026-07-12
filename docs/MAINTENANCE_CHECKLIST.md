# Maintenance Checklist

A healthy site is a background task, not a rebuild. This is what a care plan should
actually cover. Cadence is a suggestion — adjust to the business.

## Every month
- [ ] Confirm the quote form still delivers — **send one real test lead** and verify it
      arrives. (Email/provider changes silently break forms; catch it here.)
- [ ] Skim analytics (if enabled): traffic, top pages, where leads come from
      (the form's `source` field). Note what's working.
- [ ] Check Google Search Console for coverage errors or manual actions.
- [ ] Verify the site loads fast on a phone; run a quick Lighthouse pass if anything
      feels slow.
- [ ] Reply to / display any new **real** Google reviews (with permission); keep the
      testimonials section current and honest.
- [ ] Make any small copy/price/hours updates the client requested (mostly one-line
      edits in `site.ts` / `content/`).

## Every quarter
- [ ] Update dependencies: `npm outdated`, then bump non-breaking versions and
      `npm run build` to confirm nothing broke. Apply security patches promptly.
- [ ] Re-run Lighthouse (mobile) for Performance/Accessibility/SEO; fix regressions.
- [ ] Review content for staleness — services, pricing, seasonal messaging, team.
- [ ] Check all forms, CTAs, phone/email links, and booking links still work.
- [ ] Confirm backups/version history exist (the repo is the source of truth — make
      sure it's pushed and access is current).

## Every 6–12 months
- [ ] Major framework updates (e.g. Next.js majors) on a branch; test the full build and
      key pages before deploying.
- [ ] Renew/verify domain registration and confirm DNS + HTTPS are healthy.
- [ ] Revisit SEO: which queries the site ranks for, whether new service-area or content
      pages are worth adding, and whether the Business Profile is fully optimized.
- [ ] Review the design against the business's growth — is it still serving the leads
      goal, or is it time for new photos, sections, or a refresh?

## Watch for (act promptly, don't wait for the schedule)
- Form submissions stop arriving → check email/provider config first.
- A sudden traffic or ranking drop → check Search Console and recent changes.
- Security advisories on a dependency → patch and redeploy.
- Broken links after content edits → fix immediately.

## Quick reference — where things live
- Business facts (name, phone, hours, areas): `src/config/site.ts`
- Services / pricing / FAQ / testimonials / portfolio: `src/content/*`
- Colors & fonts: `tailwind.config.ts` and `src/app/fonts/`
- Email/analytics/site-URL config: environment variables (see `.env.example`)
- Full setup & deploy instructions: `README.md`
