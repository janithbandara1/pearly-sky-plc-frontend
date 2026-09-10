import type { Metadata, MetadataRoute } from "next";
import { COUNTRY_LANGUAGES, COUNTRY_URL_SLUGS, SUPPORTED_COUNTRIES, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildLocalePath } from "@/lib/locale";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";

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
 * Builds one sitemap.xml entry per country/language combo a country offers
 * (see COUNTRY_LANGUAGES) for a given unprefixed path (e.g. "/about-us").
 * Hreflang alternates stay in page metadata; repeating the full alternate map
 * on every sitemap entry makes the XML grow quadratically with locale count.
 * Used by app/sitemap.ts.
 */
export function buildSitemapEntries(
  pathname: string,
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      entries.push({
        url: `${SITE_URL}${buildLocalePath(pathname, country, language)}`,
        ...opts,
      });
    }
  }
  return entries;
}

/**
 * Given a service's `locales` (its explicit language translations and
 * country+language overrides — see ServiceLocaleSlug), returns a function
 * that resolves the right slug for any (language, country) pair: an
 * override's slug if that exact country+language has one, else a
 * translation's slug for that language, else `baseSlug` (the base English
 * `Service.name`). This is what makes hreflang/sitemap/canonical URLs use
 * "nettoyage-regulier" for fr-fr while every other locale still uses the
 * base slug — see buildServiceAlternates/buildServiceSitemapEntries below.
 */
function makeServiceSlugResolver(baseSlug: string, locales: ServiceLocaleSlug[]) {
  const overrides = new Map(locales.filter((l) => l.country).map((l) => [`${l.language}:${l.country}`, l.slug]));
  const translations = new Map(locales.filter((l) => !l.country).map((l) => [l.language, l.slug]));
  return (language: string, country: string) =>
    overrides.get(`${language}:${country}`) ?? translations.get(language) ?? baseSlug;
}

/**
 * Like `buildCountryAlternates`, but for a service page whose slug can vary
 * by locale — `pathFor(slug)` builds the unprefixed path for a given
 * locale's slug (e.g. `(slug) => \`/services/${slug}\``), so each hreflang
 * alternate and the canonical point at that locale's own slug instead of
 * reusing the requested one.
 */
export function buildServiceAlternates(
  pathFor: (slug: string) => string,
  baseSlug: string,
  locales: ServiceLocaleSlug[],
  current?: { country: CountryCode | null; language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  const slugFor = makeServiceSlugResolver(baseSlug, locales);
  const languages: Record<string, string> = { "x-default": pathFor(baseSlug) };

  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      languages[`${language}-${COUNTRY_URL_SLUGS[country].toUpperCase()}`] = buildLocalePath(
        pathFor(slugFor(language, country)),
        country,
        language,
      );
    }
  }

  if (!current) return { languages };

  const currentCountry = current.country ?? "fr";
  const currentLanguage = current.language ?? "en";
  return {
    languages,
    canonical: buildLocalePath(pathFor(slugFor(currentLanguage, currentCountry)), currentCountry, currentLanguage),
  };
}

/** Like `buildSitemapEntries`, but for a service page — see `buildServiceAlternates` for why `pathFor` takes the resolved slug. */
export function buildServiceSitemapEntries(
  pathFor: (slug: string) => string,
  baseSlug: string,
  locales: ServiceLocaleSlug[],
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap {
  const slugFor = makeServiceSlugResolver(baseSlug, locales);
  const entries: MetadataRoute.Sitemap = [];
  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      entries.push({
        url: `${SITE_URL}${buildLocalePath(pathFor(slugFor(language, country)), country, language)}`,
        ...opts,
      });
    }
  }
  return entries;
}
