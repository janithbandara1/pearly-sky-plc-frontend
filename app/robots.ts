import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Shared with both the general and Googlebot-specific rule groups below —
// Google treats a matching named group as exclusive of the "*" group, so
// Googlebot needs its own complete copy of every disallow rule rather than
// inheriting these from "*".
const COMMON_DISALLOW = [
  // Auth / account areas — not locale-prefixed (excluded by proxy.ts's matcher).
  "/login",
  "/signup",
  "/staff/*",
  "/profile",
  "/addresses",
  "/bookings*",
  "/quotations*",
  "/dashboard*",
  // forgot-password is locale-prefixed (unlike login/signup), so match both bare and prefixed forms.
  "/forgot-password",
  "/*/forgot-password",
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: COMMON_DISALLOW,
      },
      {
        // Lets Googlebot render page layouts that fetch these two endpoints
        // client-side, without letting the raw JSON itself get indexed —
        // these Allow rules are more specific than the "/api/*" disallow
        // below, so they win under robots.txt's longest-match precedence.
        userAgent: "Googlebot",
        allow: ["/", "/api/catalog/currencies", "/api/countries"],
        disallow: [...COMMON_DISALLOW, "/api/auth/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
