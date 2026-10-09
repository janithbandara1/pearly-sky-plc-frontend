import type { Metadata, MetadataRoute } from "next";
import { COUNTRY_DOMAINS, CURRENT_COUNTRY, CURRENT_COUNTRY_LANGUAGES, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildLocalePath } from "@/lib/locale";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";

/** The language whose page is the hreflang "x-default" on each country's domain. */
const X_DEFAULT_LANGUAGE: Record<CountryCode, LanguageCode> = {
  fr: "en",
  gb: "en",
  lk: "en",
};

/** "/about-us" + "fr" -> "https://pearlyskyglobalclean.fr/fr/about-us" — an absolute URL on this deployment's own domain. */
function absoluteLocalePath(pathname: string, language: LanguageCode): string {
  return `${COUNTRY_DOMAINS[CURRENT_COUNTRY]}${buildLocalePath(pathname, language)}`;
}

/**
 * Builds a page's self-referencing canonical plus its hreflang set, given
 * `pathFor(language)` — the unprefixed path of the equivalent page in each
 * language (it differs per language only for translated service slugs).
 *
 * The hreflang set covers this domain only: one plain language code
 * (en/fr/de/es/it) per language this deployment serves, plus "x-default"
 * (see X_DEFAULT_LANGUAGE). Every page on the domain builds the same set,
 * so the references are reciprocal. The other countries' domains are not
 * listed — without an approved regional strategy (en-GB, fr-FR…), plain
 * language codes can't distinguish between them.
 *
 * Callers must only use this on pages that return 200 and are indexable in
 * every language — never on a redirect, 404 or noindex page.
 */
function buildAlternates(
  pathFor: (language: LanguageCode) => string,
  currentLanguage: LanguageCode | null,
): NonNullable<Metadata["alternates"]> {
  const xDefault = X_DEFAULT_LANGUAGE[CURRENT_COUNTRY];
  // Rendered in insertion order: x-default first, then each language.
  const languages: Record<string, string> = {
    "x-default": absoluteLocalePath(pathFor(xDefault), xDefault),
  };
  for (const language of CURRENT_COUNTRY_LANGUAGES) {
    languages[language] = absoluteLocalePath(pathFor(language), language);
  }

  const canonicalLanguage = currentLanguage ?? xDefault;
  return {
    canonical: absoluteLocalePath(pathFor(canonicalLanguage), canonicalLanguage),
    languages,
  };
}

/** Canonical + hreflang for a page whose path is the same in every language (e.g. "/about-us"). See buildAlternates. */
export function buildCountryAlternates(
  pathname: string,
  current: { language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  return buildAlternates(() => pathname, current.language);
}

/**
 * The global gateway's alternates: a self-canonical only. No hreflang — its
 * pages aren't translations of any country site's (see app/(site)/page.tsx)
 * — but every page still needs a canonical, or audits flag it as missing.
 */
export function buildGlobalAlternates(pathname: string, language: LanguageCode | null): NonNullable<Metadata["alternates"]> {
  return { canonical: buildLocalePath(pathname, language ?? "en") };
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
 * Builds one sitemap.xml entry per language CURRENT_COUNTRY offers (see
 * COUNTRY_LANGUAGES) for a given unprefixed path (e.g. "/about-us"). A
 * sitemap only ever lists URLs on its own domain, so — unlike the old
 * single-domain model — this no longer loops over every country, just this
 * deployment's own. Hreflang alternates to sibling countries' domains stay
 * in page metadata (buildCountryAlternates); repeating them here would
 * point Google at URLs this sitemap doesn't own. Used by app/sitemap.ts.
 */
export function buildSitemapEntries(
  pathname: string,
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap {
  return CURRENT_COUNTRY_LANGUAGES.map((language) => ({
    url: `${SITE_URL}${buildLocalePath(pathname, language)}`,
    ...opts,
  }));
}

/**
 * Given a service's `locales` (its explicit language translations and
 * country+language overrides — see ServiceLocaleSlug), returns a function
 * that resolves the right slug for any (language, country) pair: an
 * override's slug if that exact country+language has one, else a
 * translation's slug for that language, else `baseSlug` (the base English
 * `Service.name`). This is what makes hreflang/sitemap/canonical URLs use
 * "nettoyage-regulier" for France's fr language while every other locale
 * still uses the base slug — see buildServiceAlternates/buildServiceSitemapEntries below.
 */
export function makeServiceSlugResolver(baseSlug: string, locales: ServiceLocaleSlug[]) {
  const overrides = new Map(locales.filter((l) => l.country).map((l) => [`${l.language}:${l.country}`, l.slug]));
  const translations = new Map(locales.filter((l) => !l.country).map((l) => [l.language, l.slug]));
  return (language: string, country: string) =>
    overrides.get(`${language}:${country}`) ?? translations.get(language) ?? baseSlug;
}

/**
 * Like `buildCountryAlternates`, but for a service page whose slug can vary
 * by language — `pathFor(slug)` builds the unprefixed path for a given
 * slug (e.g. `(slug) => \`/services/${slug}\``), so each hreflang
 * alternate and the canonical point at that language's own slug
 * ("nettoyage-regulier" for fr) instead of reusing the requested one.
 */
export function buildServiceAlternates(
  pathFor: (slug: string) => string,
  baseSlug: string,
  locales: ServiceLocaleSlug[],
  current: { language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  const slugFor = makeServiceSlugResolver(baseSlug, locales);
  return buildAlternates((language) => pathFor(slugFor(language, CURRENT_COUNTRY)), current.language);
}

/** Like `buildSitemapEntries`, but for a service page — see `buildServiceAlternates` for why `pathFor` takes the resolved slug. */
export function buildServiceSitemapEntries(
  pathFor: (slug: string) => string,
  baseSlug: string,
  locales: ServiceLocaleSlug[],
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap {
  const slugFor = makeServiceSlugResolver(baseSlug, locales);
  return CURRENT_COUNTRY_LANGUAGES.map((language) => ({
    url: `${SITE_URL}${buildLocalePath(pathFor(slugFor(language, CURRENT_COUNTRY)), language)}`,
    ...opts,
  }));
}
