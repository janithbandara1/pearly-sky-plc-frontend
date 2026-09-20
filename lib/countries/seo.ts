import type { Metadata, MetadataRoute } from "next";
import { COUNTRY_DOMAINS, COUNTRY_LANGUAGES, CURRENT_COUNTRY, SUPPORTED_COUNTRIES, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import { buildLocalePath } from "@/lib/locale";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";

/** `fr` -> "https://pearlyskyglobalclean.fr/en/about-us" — an absolute URL on `country`'s own domain. */
function absoluteLocalePath(pathname: string, country: CountryCode, language: LanguageCode): string {
  return `${COUNTRY_DOMAINS[country]}${buildLocalePath(pathname, language)}`;
}

/**
 * Builds the `alternates.languages` block for a given unprefixed path
 * (e.g. "/about-us"), telling search engines that the same page on every
 * sibling country's domain (fr/gb/lk — see COUNTRY_DOMAINS) is an alternate
 * of this one, not duplicate content, and which one to serve when no more
 * specific hreflang matches ("x-default"). Each country contributes one
 * entry per language it actually offers (see COUNTRY_LANGUAGES — only
 * France offers more than "en"), tagged `{language}-{COUNTRY}` using the
 * country's own ISO code as the region subtag (fr/GB/LK are all valid
 * region subtags as-is, so no separate slug mapping is needed). When
 * `current` is passed (the language this specific request resolved to),
 * also sets a self-referencing `canonical` on CURRENT_COUNTRY's own domain.
 *
 * Requires `metadataBase` to be set to this deployment's own domain (done
 * in the root layout) since `canonical` and any same-domain paths resolve
 * against it — the cross-domain alternates below are absolute, so they're
 * unaffected by metadataBase.
 */
export function buildCountryAlternates(
  pathname: string,
  current?: { language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {
    "x-default": absoluteLocalePath(pathname, CURRENT_COUNTRY, COUNTRY_LANGUAGES[CURRENT_COUNTRY][0]),
  };

  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      languages[`${language}-${country.toUpperCase()}`] = absoluteLocalePath(pathname, country, language);
    }
  }

  if (!current) return { languages };

  return {
    languages,
    canonical: buildLocalePath(pathname, current.language ?? COUNTRY_LANGUAGES[CURRENT_COUNTRY][0]),
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
  return COUNTRY_LANGUAGES[CURRENT_COUNTRY].map((language) => ({
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
 * by locale — `pathFor(slug)` builds the unprefixed path for a given
 * locale's slug (e.g. `(slug) => \`/services/${slug}\``), so each hreflang
 * alternate and the canonical point at that locale's own slug instead of
 * reusing the requested one.
 */
export function buildServiceAlternates(
  pathFor: (slug: string) => string,
  baseSlug: string,
  locales: ServiceLocaleSlug[],
  current?: { language: LanguageCode | null },
): NonNullable<Metadata["alternates"]> {
  const slugFor = makeServiceSlugResolver(baseSlug, locales);
  const defaultLanguage = COUNTRY_LANGUAGES[CURRENT_COUNTRY][0];
  const languages: Record<string, string> = {
    "x-default": absoluteLocalePath(pathFor(slugFor(defaultLanguage, CURRENT_COUNTRY)), CURRENT_COUNTRY, defaultLanguage),
  };

  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of COUNTRY_LANGUAGES[country]) {
      languages[`${language}-${country.toUpperCase()}`] = absoluteLocalePath(
        pathFor(slugFor(language, country)),
        country,
        language,
      );
    }
  }

  if (!current) return { languages };

  const currentLanguage = current.language ?? defaultLanguage;
  return {
    languages,
    canonical: buildLocalePath(pathFor(slugFor(currentLanguage, CURRENT_COUNTRY)), currentLanguage),
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
  return COUNTRY_LANGUAGES[CURRENT_COUNTRY].map((language) => ({
    url: `${SITE_URL}${buildLocalePath(pathFor(slugFor(language, CURRENT_COUNTRY)), language)}`,
    ...opts,
  }));
}
