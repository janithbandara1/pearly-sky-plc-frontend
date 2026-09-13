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
      // challenges.cloudflare.com serves the Turnstile widget script.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // The dev API backend runs on plain http://localhost — only allowed
      // outside production so the production CSP stays https-only. The
      // broad "https:" already covers challenges.cloudflare.com (Turnstile's
      // verification endpoint), so it needs no separate entry here.
      `connect-src 'self' https:${isDev ? " http://localhost:* ws://localhost:*" : ""}`,
      // Added THIS LINE – allows Google Maps iframes. challenges.cloudflare.com
      // renders Turnstile's interactive-challenge iframe.
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps/ https://challenges.cloudflare.com",
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
