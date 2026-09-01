import type { Metadata, MetadataRoute } from "next";
import { COUNTRY_LANGUAGES, COUNTRY_URL_SLUGS, SUPPORTED_COUNTRIES, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildLocalePath } from "@/lib/locale";

/**
 * Builds the `alternates.languages` block for a given unprefixed path
 * (e.g. "/about"), telling search engines the /fr-en, /fr-fr, /de-en, ...
 * versions are alternates of the same page (not duplicate content) and
 * that the unprefixed path is the version to serve when no country
 * matches ("x-default"). Each country contributes one entry per language it
 * actually offers (see COUNTRY_LANGUAGES — every country but France offers
 * just "en"). When `current` is passed (the country/language this specific
 * request resolved to), also sets a self-referencing `canonical` so each
 * locale URL canonicalizes to itself.
 *
 * Requires `metadataBase` to be set (done in the root layout) since these
 * are relative paths — see the Next.js metadata docs.
 */
export function buildCountryAlternates(
  pathname: string,
  current?: { country: CountryCode | null; language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = { "x-default": pathname };

  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      languages[`${language}-${COUNTRY_URL_SLUGS[country].toUpperCase()}`] = buildLocalePath(pathname, country, language);
    }
  }

  if (!current) return { languages };

  return {
    languages,
    canonical: buildLocalePath(pathname, current.country ?? "fr", current.language ?? "en"),
  };
}

/** Open Graph + Twitter Card metadata, reused by every page's metadata export. */
export function buildSocialMeta(
  title: string,
  description?: string,
  imagePath = "/images/hero/hero-1.webp",
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      siteName: "Pearly Sky",
      type: "website",
      images: [{ url: imagePath }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Builds one sitemap.xml entry per country/language combo a country
 * actually offers (see COUNTRY_LANGUAGES) for a given unprefixed path (e.g.
 * "/about-us"), each carrying the full hreflang alternate set (mirrors
 * buildCountryAlternates, but with absolute URLs as sitemaps require). Used
 * by app/sitemap.ts.
 */
export function buildSitemapEntries(
  pathname: string,
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = { "x-default": `${SITE_URL}${pathname}` };
  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      languages[`${language}-${COUNTRY_URL_SLUGS[country].toUpperCase()}`] =
        `${SITE_URL}${buildLocalePath(pathname, country, language)}`;
    }
  }

  const entries: MetadataRoute.Sitemap = [];
  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      entries.push({
        url: `${SITE_URL}${buildLocalePath(pathname, country, language)}`,
        alternates: { languages },
        ...opts,
      });
    }
  }
  return entries;
}
