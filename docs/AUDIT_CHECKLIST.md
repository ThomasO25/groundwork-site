# Website Audit Checklist

Run on any site (new build or an existing client site you're reviewing).

## Conversion
- [ ] Clear primary CTA above the fold and repeated down the page
- [ ] Phone number is a tap-to-call `tel:` link everywhere it appears
- [ ] Sticky mobile call/quote control present
- [ ] Quote/contact form is short and easy; validation is helpful
- [ ] Form has visible success **and** error states
- [ ] Service area is stated clearly
- [ ] Trust signals present (licenses, reviews, guarantees) — and **verified**

## SEO
- [ ] Unique `<title>` + meta description on every page
- [ ] One `<h1>` per page; logical heading order
- [ ] Canonical URLs correct
- [ ] Open Graph / social preview renders correctly
- [ ] `sitemap.xml` and `robots.txt` present and correct
- [ ] Descriptive `alt` text on all images
- [ ] Structured data valid (Rich Results Test)
- [ ] Clean, readable URLs; internal links between related pages
- [ ] No keyword stuffing; no duplicate near-identical location pages

## Performance
- [ ] Images optimized and correctly sized (`next/image`)
- [ ] Fast first load (check Lighthouse / PageSpeed)
- [ ] No layout shift from fonts/images
- [ ] JS payload reasonable

## Accessibility
- [ ] Semantic HTML; landmarks (`header`/`main`/`footer`/`nav`)
- [ ] All form fields have labels
- [ ] Keyboard navigable; visible focus states
- [ ] Sufficient color contrast
- [ ] Reduced-motion respected; no unnecessary motion
- [ ] Skip-to-content link

## Responsive & QA
- [ ] Looks right at ~360px, ~768px, ~1280px+
- [ ] No horizontal overflow at any width
- [ ] No broken links or missing images
- [ ] No console errors; production build succeeds

## Security
- [ ] No secrets in the repo or client bundle
- [ ] Form inputs validated/sanitized server-side
- [ ] Rate limiting / spam protection on public forms
- [ ] Protected actions authorized server-side (if any)
- [ ] Security headers set; dependencies reasonably current
