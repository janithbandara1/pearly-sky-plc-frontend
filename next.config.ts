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
      // challenges.cloudflare.com serves the Turnstile widget script;
      // client.crisp.chat serves the Crisp live-chat widget;
      // static.cloudflareinsights.com is Cloudflare's own RUM beacon, auto-injected
      // into proxied responses by the zone's Web Analytics setting — not something
      // this app opts into per-request, so it must be allow-listed unconditionally.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://client.crisp.chat https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://client.crisp.chat",
      // The dev API backend runs on plain http://localhost — only allowed
      // outside production so the production CSP stays https-only. The
      // broad "https:" already covers challenges.cloudflare.com (Turnstile's
      // verification endpoint) and Crisp's REST calls, so they need no
      // separate entry here; the Crisp chat socket needs its own wss: entry.
      `connect-src 'self' https: wss://client.relay.crisp.chat$ {isDev ? " http://localhost:* ws://localhost:*" : ""}`,
      // Added THIS LINE – allows Google Maps iframes. challenges.cloudflare.com
      // renders Turnstile's interactive-challenge iframe; client.crisp.chat
      // renders the chat widget's iframe.
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps/ https://challenges.cloudflare.com https://client.crisp.chat",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Inlines route CSS into <style> tags instead of render-blocking <link>
  // requests — Tailwind's output stays small enough per route that this is a
  // net win for first-time visitors (see next.config docs for the trade-off
  // with repeat-visitor stylesheet caching).
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
