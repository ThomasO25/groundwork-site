import type { Config } from "tailwindcss";

/**
 * Design tokens for the "industrial systems studio" identity.
 * Palette intentionally avoids generic AI-site defaults (cream+serif+terracotta,
 * near-black+acid-green, broadsheet hairlines). Accent is a restrained hi-vis
 * amber used only for primary actions and section ticks.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1518", // primary text + dark sections (graphite, not pure black)
        graphite: "#1C262B", // slightly lifted dark surface
        steel: "#52606B", // secondary/muted text
        line: "#DBDFDF", // hairline borders on light surfaces
        "line-dark": "#2B383E", // hairline borders on dark surfaces
        concrete: "#EDEFEE", // light alternate section background
        paper: "#FBFBFA", // base page background (cool near-white, not cream)
        hivis: "#F2A20C", // accent — safety amber (the one bold move)
        "hivis-deep": "#D98A00", // hover/active state for amber
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Tightened display scale for the industrial grotesque headlines.
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        container: "75rem", // 1200px content frame
      },
      borderRadius: {
        // Small, sturdy radii — no pills, but not a broadsheet zero-radius look.
        sm: "3px",
        DEFAULT: "4px",
        md: "6px",
      },
      boxShadow: {
        // Reserved for elements that genuinely float (sticky bars, menus).
        bar: "0 -1px 0 0 rgba(14,21,24,0.08), 0 -8px 24px -12px rgba(14,21,24,0.25)",
        menu: "0 12px 32px -12px rgba(14,21,24,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
