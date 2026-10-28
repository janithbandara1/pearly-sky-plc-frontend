import type { MetadataRoute } from "next";
import { buildServiceSitemapEntries, buildSitemapEntries } from "@/lib/countries/seo";
import { blogPosts } from "@/lib/content/blog-posts";
import { jobs } from "@/lib/content/jobs";
import { getServices } from "@/lib/catalog-api";
import { IS_CAREERS_ENABLED, IS_GLOBAL_SITE } from "@/lib/countries/config";
import { hasQuotationPage, hasServicePage } from "@/lib/service-flows";

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/our-customers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/our-locations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  // /careers is a real, indexable page everywhere now — a job listing on
  // France/global, a "no openings" notice on the UK/Sri Lanka sites (see
  // IS_CAREERS_ENABLED) — so it's listed unconditionally. Individual job
  // postings below stay France/global-only: including them on UK/Sri Lanka
  // would just be N duplicate URLs all showing that same notice.
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of STATIC_PAGES) {
    entries.push(...buildSitemapEntries(path, { changeFrequency, priority }));
  }

  // Global-gateway-only page — redirected away on the country sites (see proxy.ts).
  if (IS_GLOBAL_SITE) {
    entries.push(...buildSitemapEntries("/our-services", { changeFrequency: "monthly", priority: 0.8 }));
  }

  for (const post of blogPosts) {
    entries.push(...buildSitemapEntries(`/blog/${post.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  }

  if (IS_CAREERS_ENABLED) {
    for (const job of jobs) {
      entries.push(...buildSitemapEntries(`/careers/${job.id}`, { changeFrequency: "weekly", priority: 0.5 }));
    }
  }

  // Service list (base slugs + each service's own locale-specific slugs, if
  // any) is fetched uncountried/unlanguaged — `service.name` and
  // `service.locales` already cover every locale's slug, so no per-locale
  // refetch is needed. If the backend is unreachable, service URLs are
  // simply omitted rather than failing the sitemap. Only URLs that serve a
  // 200 get an entry, per lib/service-flows.ts: /services/{slug} when the
  // service is bookable or has a dedicated flow (which includes quote-only
  // services like pool-cleaning whose quote form lives there), and
  // /request-quotation only when it isn't just a redirect to that page.
  // The global gateway has no service pages — /services/* is blocked there
  // (see proxy.ts) — so skip the fetch.
  if (!IS_GLOBAL_SITE) {
    try {
      const services = await getServices();
      for (const service of services) {
        if (service.status !== "active") continue;
        if (hasServicePage(service)) {
          entries.push(
            ...buildServiceSitemapEntries((slug) => `/services/${slug}`, service.name, service.locales, {
              changeFrequency: "monthly",
              priority: 0.6,
            }),
          );
        }
        if (hasQuotationPage(service)) {
          entries.push(
            ...buildServiceSitemapEntries(
              (slug) => `/services/${slug}/request-quotation`,
              service.name,
              service.locales,
              { changeFrequency: "monthly", priority: 0.6 },
            ),
          );
        }
      }
    } catch {
      // Backend unreachable — sitemap still returns the static + local-content entries above.
    }
  }

  return entries;
}
