import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n/config";

/**
 * Single source of truth for which country prefixes the redirect logic
 * (proxy.ts) and routing understand. Adding a country is just adding its
 * code here — proxy.ts, the switcher, and the hreflang helper all read
 * from this list rather than hardcoding codes themselves.
 *
 * Richer metadata (name, currency, language) intentionally lives on the
 * backend (`GET /countries`) instead of here, so it isn't duplicated in
 * two places. This file only needs the bare codes because proxy.ts runs
 * on every request and must not make a network call to decide whether a
 * prefix is valid.
 */
export const SUPPORTED_COUNTRIES = [
  "fr",
  "de",
  "lu",
  "nl",
  "fi",
  "se",
  "it",
  "pl",
  "be",
  "at",
  "dk",
  "es",
  "pt",
  "ro",
  "ie",
  "mc",
  "ch",
  "gb",
  "us",
  "ca",
  "au",
  "nz",
  "qa",
  "sa",
  "ae",
  "om",
  "bh",
  "lk",
] as const;

export type CountryCode = (typeof SUPPORTED_COUNTRIES)[number];

export function isSupportedCountry(value: string | null | undefined): value is CountryCode {
  if (!value) return false;
  return (SUPPORTED_COUNTRIES as readonly string[]).includes(value.toLowerCase());
}

/**
 * URL directory code per the master blueprint (frontend/docs/pearly-sky-global-master-blueprint.md).
 * Identical to the internal `CountryCode` for every country except the UK:
 * the internal code stays `gb` (renaming it would mean a live data migration
 * across customers/quotations/prices tables — see the backend's countries
 * constant), but the blueprint's directory is `/uk-en/`, not `/gb-en/`.
 */
export const COUNTRY_URL_SLUGS: Record<CountryCode, string> = {
  fr: "fr",
  de: "de",
  lu: "lu",
  nl: "nl",
  fi: "fi",
  se: "se",
  it: "it",
  pl: "pl",
  be: "be",
  at: "at",
  dk: "dk",
  es: "es",
  pt: "pt",
  ro: "ro",
  ie: "ie",
  mc: "mc",
  ch: "ch",
  gb: "uk",
  us: "us",
  ca: "ca",
  au: "au",
  nz: "nz",
  qa: "qa",
  sa: "sa",
  ae: "ae",
  om: "om",
  bh: "bh",
  lk: "lk",
};

const URL_SLUG_TO_COUNTRY: Record<string, CountryCode> = Object.fromEntries(
  SUPPORTED_COUNTRIES.map((code) => [COUNTRY_URL_SLUGS[code], code]),
);

/** Resolves a `/{slug}-{lang}/...` URL directory code back to its internal `CountryCode`. */
export function countryFromUrlSlug(slug: string | null | undefined): CountryCode | null {
  if (!slug) return null;
  return URL_SLUG_TO_COUNTRY[slug.toLowerCase()] ?? null;
}

/**
 * Every supplied dictionary is available in every market so visitors can
 * choose their preferred language from the header or footer switcher.
 */
export const COUNTRY_LANGUAGES: Record<CountryCode, readonly LanguageCode[]> = {
  fr: SUPPORTED_LANGUAGES,
  de: SUPPORTED_LANGUAGES,
  lu: SUPPORTED_LANGUAGES,
  nl: SUPPORTED_LANGUAGES,
  fi: SUPPORTED_LANGUAGES,
  se: SUPPORTED_LANGUAGES,
  it: SUPPORTED_LANGUAGES,
  pl: SUPPORTED_LANGUAGES,
  be: SUPPORTED_LANGUAGES,
  at: SUPPORTED_LANGUAGES,
  dk: SUPPORTED_LANGUAGES,
  es: SUPPORTED_LANGUAGES,
  pt: SUPPORTED_LANGUAGES,
  ro: SUPPORTED_LANGUAGES,
  ie: SUPPORTED_LANGUAGES,
  mc: SUPPORTED_LANGUAGES,
  ch: SUPPORTED_LANGUAGES,
  gb: SUPPORTED_LANGUAGES,
  us: SUPPORTED_LANGUAGES,
  ca: SUPPORTED_LANGUAGES,
  au: SUPPORTED_LANGUAGES,
  nz: SUPPORTED_LANGUAGES,
  qa: SUPPORTED_LANGUAGES,
  sa: SUPPORTED_LANGUAGES,
  ae: SUPPORTED_LANGUAGES,
  om: SUPPORTED_LANGUAGES,
  bh: SUPPORTED_LANGUAGES,
  lk: SUPPORTED_LANGUAGES,
};

export function isLanguageSupportedForCountry(
  country: CountryCode,
  language: string | null | undefined,
): language is LanguageCode {
  if (!language) return false;
  return (COUNTRY_LANGUAGES[country] as readonly string[]).includes(language.toLowerCase());
}

/** The language a country's portal opens in when nothing else pins one — always the first (and for most countries, only) entry. */
export function defaultLanguageForCountry(country: CountryCode): LanguageCode {
  return COUNTRY_LANGUAGES[country][0];
}

/** Name of the cookie that pins a visitor to a country once known. */
export const COUNTRY_COOKIE_NAME = "country";

/** ~30 days, in seconds (used for both the proxy's Set-Cookie and the client-side switcher). */
export const COUNTRY_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Request header proxy.ts sets so server components/layouts can read the resolved country. */
export const COUNTRY_HEADER_NAME = "x-country";
