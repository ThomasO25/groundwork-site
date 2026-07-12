import { ImageResponse } from "next/og";
import { site, siteStatus } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Default social-share image, generated at build. Replace with real brand art
 * by adding /public/og.jpg and pointing openGraph.images at it if preferred.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E1518",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#0E1518",
              border: "2px solid #2B383E",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#F2A20C" }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 4, height: 22, background: "#F2A20C" }} />
            <div style={{ fontSize: 20, letterSpacing: 3, color: "#9AA6AD", textTransform: "uppercase" }}>
              Websites & Lead Systems
            </div>
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900, letterSpacing: -1.5 }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#9AA6AD" }}>
          {[
            siteStatus.hasRegion ? `Serving ${site.primaryRegion}` : "",
            siteStatus.hasPhone ? site.contact.phoneDisplay : "",
          ]
            .filter(Boolean)
            .join(" · ") || "Websites & lead systems for local service businesses"}
        </div>
      </div>
    ),
    { ...size }
  );
}
