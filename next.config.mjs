/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Add real remote hosts here if you serve images from a CDN or Supabase Storage.
    remotePatterns: [],
  },
  async headers() {
    // Sensible baseline security headers. Review before launch; a strict
    // Content-Security-Policy is intentionally omitted because it must be
    // tuned to the analytics/embed scripts each client actually uses.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
