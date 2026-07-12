import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl, localBusinessJsonLd, JsonLd, OG_IMAGE } from "@/lib/seo";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { Analytics } from "@/components/site/analytics";

/**
 * Fonts are self-hosted (Archivo + IBM Plex Sans, both SIL Open Font License)
 * via next/font/local — no third-party font requests from visitors' browsers.
 * IBM Plex Mono was removed in the redesign: monospace no longer appears in
 * customer-facing copy, so shipping it was pure weight.
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
  // The official Groundwork monogram, exported from the real artwork.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${site.name} — Web Studio` }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
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
        {/* Loads GA4 / Clarity only if their env vars are set; also auto-tracks CTA,
            phone, email, and portfolio clicks site-wide. */}
        <Analytics />
      </body>
    </html>
  );
}
