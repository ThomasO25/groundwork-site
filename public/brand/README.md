# Groundwork brand assets

Generated from the official logo references — not renamed copies. The monogram
was recovered as a true antialiased alpha mask (luminance-normalised between the
solid charcoal plate and the solid beige glyph), then re-rendered at size in each
brand colour on transparency. No white halos, no rough edges, tight-cropped.

The wordmark is set in **Archivo ExtraBold** — the same self-hosted font the live
site uses — so exported art and rendered pages stay consistent.

| File | Use |
| --- | --- |
| `groundwork-mark-light.png` | Monogram for **light** backgrounds (beige `#C0AA8B`) |
| `groundwork-mark-dark.png` | Monogram for **dark** backgrounds (sand `#D8BE9E`) |
| `groundwork-wordmark-light.png` | GROUNDWORK / WEB STUDIO for light backgrounds |
| `groundwork-wordmark-dark.png` | Same, for dark backgrounds |
| `groundwork-logo-light.png` | Full stacked lockup, light backgrounds |
| `groundwork-logo-dark.png` | Full stacked lockup, dark backgrounds |
| `groundwork-og.png` | 1200×630 Open Graph / social preview |

The suffix names the **background the asset sits on**. The brand mark is beige in
both cases; the two tints are the reference's own optical adjustment (deeper on
white, lighter on charcoal).

Favicons and app icons live in `/public`: `favicon.ico`, `favicon-16x16.png`,
`favicon-32x32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`.

## In code
Don't hand-roll the logo — use the component:

```tsx
import { GroundworkLogo, GroundworkLogoLink } from "@/components/brand/groundwork-logo";

<GroundworkLogoLink variant="wordmark" size="md" />        // header
<GroundworkLogoLink variant="full" size="lg" />            // footer
<GroundworkLogo variant="mark" tone="dark" size="sm" />    // on ink sections
```

"GROUNDWORK" and "WEB STUDIO" render as **accessible HTML text** beside the
monogram image — crisp at any zoom, selectable, and readable by screen readers.

## Colours
Charcoal `#211F21` · Beige `#C0AA8B` (light bg) · Sand `#D8BE9E` (dark bg) ·
Cream `#FAF6F0` · Warm grey `#F1E9DE`
