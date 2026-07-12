import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generated favicon: hi-vis dot on graphite — matches the wordmark tick. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E1518",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div style={{ width: 13, height: 13, borderRadius: 999, background: "#F2A20C" }} />
      </div>
    ),
    { ...size }
  );
}
