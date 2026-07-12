import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl, localBusinessJsonLd, JsonLd } from "@/lib/seo";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";

/**
 * Fonts are self-hosted (Archivo + IBM Plex, both SIL Open Font License) via
 * next/font/local. Self-hosting means no build-time dependency on Google Fonts
 * and no third-party font requests from visitors' browsers (better privacy and
 * performance). Files live in ./fonts.
 */
const display = localFont({
  src: [
    { path: "./fonts/archivo-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/archivo-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/archivo-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const sans = localFont({
  src: [
    { path: "./fonts/plex-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plex-sans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const mono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      {/* pb-20 keeps content clear of the sticky mobile CTA bar; md:pb-0 removes it on desktop */}
      <body className="pb-20 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
