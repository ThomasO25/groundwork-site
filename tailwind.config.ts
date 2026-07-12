import type { Config } from "tailwindcss";

/**
 * GROUNDWORK DESIGN TOKENS — "warm editorial local-business studio"
 *
 * Every colour is taken from the official logo: deep charcoal (#211F21) and the
 * warm beige mark (#C0AA8B on light, #D8BE9E on dark). The page sits on warm
 * cream, not cool grey — the identity should feel human and approachable rather
 * than industrial or SaaS-like.
 *
 * Deliberately avoided: cool greys, hi-vis/neon accents, gradients, pill shapes,
 * multi-colour palettes, and monospace as a display face.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px", // tiny phones: swap the wordmark for the mark alone
      },
      colors: {
        ink: "#211F21", // charcoal — body text + deliberate dark sections
        graphite: "#2E2B29", // lifted surface inside dark sections
        steel: "#6E665D", // warm muted text (AA on cream)
        line: "#E6DCCC", // warm hairline border on light surfaces
        "line-dark": "#3D3833", // hairline border on dark surfaces
        paper: "#FAF6F0", // page background — warm off-white / cream
        surface: "#FFFDFA", // raised surface (panels, form, cards)
        concrete: "#F1E9DE", // soft warm grey alternate section
        gold: "#C0AA8B", // the brand beige, as used on LIGHT backgrounds
        "gold-deep": "#A2845E", // hover / stronger accent
        sand: "#D8BE9E", // the brand beige, as used on DARK backgrounds
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Confident and conversational — not aggressive. Looser than before:
        // gentler negative tracking, more generous line-height.
        "display-xl": ["clamp(2.4rem, 5vw, 4.1rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2rem, 3.8vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        container: "75rem", // 1200px content frame
        prose: "68ch", // comfortable reading measure
      },
      spacing: {
        13: "3.25rem", // large button height — comfortable tap target
      },
      borderRadius: {
        // Medium radii — friendly, not pill-shaped.
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        // Soft, warm-tinted. Nothing glows.
        soft: "0 1px 2px rgba(33,31,33,0.04), 0 10px 30px -18px rgba(33,31,33,0.20)",
        lift: "0 2px 4px rgba(33,31,33,0.05), 0 18px 40px -20px rgba(33,31,33,0.28)",
        bar: "0 -1px 0 0 rgba(33,31,33,0.06), 0 -10px 30px -18px rgba(33,31,33,0.25)",
        menu: "0 16px 40px -16px rgba(33,31,33,0.25)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        // Used once, on the hero. No constant motion anywhere on the site.
        rise: "rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
