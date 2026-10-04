import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const connectSrc = isDev
  ? "'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* wss://client.relay.crisp.chat https://*.crisp.chat https://*.r2.cloudflarestorage.com"
  : "'self' https: wss://client.relay.crisp.chat";

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
      // blob: is the local preview of a photo picked in the checkout attachment field.
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://client.crisp.chat",
      // The dev API backend runs on plain http://localhost — only allowed
      // outside production so the production CSP stays https-only. The
      // broad "https:" already covers challenges.cloudflare.com (Turnstile's
      // verification endpoint) and Crisp's REST calls, so they need no
      // separate entry here; the Crisp chat socket needs its own wss: entry.
      // Checkout attachments upload straight to Cloudflare R2 — covered by
      // "https:" in production, listed explicitly in the dev allow-list.
     `connect-src ${connectSrc}`,// Added THIS LINE – allows Google Maps iframes. challenges.cloudflare.com
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
  // No experimental.inlineCss: the CSS is ~215 KB, and inlining put it in
  // every page ~3 times (a <style> tag plus two copies in the RSC payload),
  // making the HTML ~1.6 MB. As a <link> it's downloaded once and cached.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
