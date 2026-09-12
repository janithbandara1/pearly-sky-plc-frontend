import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js needs inline/eval script in dev; unsafe-inline is also
      // required for its production hydration/style bootstrap scripts.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // The dev API backend runs on plain http://localhost — only allowed
      // outside production so the production CSP stays https-only.
      `connect-src 'self' https:${isDev ? " http://localhost:* ws://localhost:*" : ""}`,
      // Added THIS LINE – allows Google Maps iframes
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps/",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
