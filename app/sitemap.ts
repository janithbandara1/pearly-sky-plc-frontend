import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/countries/seo";
import { blogPosts } from "@/lib/content/blog-posts";
import { jobs } from "@/lib/content/jobs";
import { getServices } from "@/lib/catalog-api";

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
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

  // Service list is identical across countries (country only resolves price),
  // so an uncountried fetch gives the canonical slug set. If the backend is
  // unreachable, service URLs are simply omitted rather than failing the sitemap.
  try {
    const services = await getServices();
    for (const service of services) {
      if (service.status !== "active") continue;
      entries.push(...buildSitemapEntries(`/services/${service.name}`, { changeFrequency: "monthly", priority: 0.6 }));
    }
  } catch {
    // Backend unreachable — sitemap still returns the static + local-content entries above.
  }

  return entries;
}
