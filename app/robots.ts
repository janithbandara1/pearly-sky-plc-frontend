import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3010";

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
        "/booking-confirmation/*",
        "/quotation-confirmation/*",
        "/services/*/checkout",
        "/services/*/request-quotation",
        "/careers/*/apply",
        "/*/booking-confirmation/*",
        "/*/quotation-confirmation/*",
        "/*/services/*/checkout",
        "/*/services/*/request-quotation",
        "/*/careers/*/apply",
        "/api/*",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
