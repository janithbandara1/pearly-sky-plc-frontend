import type { MetadataRoute } from "next";
import { buildServiceSitemapEntries, buildSitemapEntries } from "@/lib/countries/seo";
import { blogPosts } from "@/lib/content/blog-posts";
import { jobs } from "@/lib/content/jobs";
import { getServices } from "@/lib/catalog-api";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/our-services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/our-customers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/our-locations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of STATIC_PAGES) {
    entries.push(...buildSitemapEntries(path, { changeFrequency, priority }));
  }

  for (const post of blogPosts) {
    entries.push(...buildSitemapEntries(`/blog/${post.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  }

  for (const job of jobs) {
    entries.push(...buildSitemapEntries(`/careers/${job.id}`, { changeFrequency: "weekly", priority: 0.5 }));
  }

  // Service list (base slugs + each service's own locale-specific slugs, if
  // any) is fetched uncountried/unlanguaged — `service.name` and
  // `service.locales` already cover every locale's slug, so no per-locale
  // refetch is needed. If the backend is unreachable, service URLs are
  // simply omitted rather than failing the sitemap. Only the flows a
  // service actually supports get a sitemap entry — a booking-only service
  // has no /request-quotation page to index, and a service with neither
  // flow (isBookable: false, isQuotable: false) has no live URL at all, so
  // it's skipped entirely.
  // The global gateway has no backend behind it at all, and /services/* is
  // blocked there anyway (see proxy.ts) — skip the fetch rather than let it
  // fail against a backend that was never meant to exist.
  if (!IS_GLOBAL_SITE) {
    try {
      const services = await getServices();
      for (const service of services) {
        if (service.status !== "active") continue;
        if (service.isBookable) {
          entries.push(
            ...buildServiceSitemapEntries((slug) => `/services/${slug}`, service.name, service.locales, {
              changeFrequency: "monthly",
              priority: 0.6,
            }),
          );
        }
        if (service.isQuotable) {
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
