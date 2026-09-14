import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Auth / account areas — not locale-prefixed (excluded by proxy.ts's matcher).
        "/login",
        "/signup",
        "/staff/*",
        "/profile",
        "/addresses",
        "/bookings*",
        "/quotations*",
        "/dashboard*",
        // Transactional (site) pages — locale-prefixed, so match both bare and prefixed forms.
        // Request-quotation pages are deliberately NOT disallowed here — they're
        // real landing pages for quotable services and are listed in the sitemap.
        "/booking-confirmation/*",
        "/quotation-confirmation/*",
        "/services/*/checkout",
        "/services/*/form-submit",
        "/careers/*/apply",
        "/checkout",
        "/payment-confirmation",
        "/*/booking-confirmation/*",
        "/*/quotation-confirmation/*",
        "/*/services/*/checkout",
        "/*/services/*/form-submit",
        "/*/careers/*/apply",
        "/*/checkout",
        "/*/payment-confirmation",
        "/api/*",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
