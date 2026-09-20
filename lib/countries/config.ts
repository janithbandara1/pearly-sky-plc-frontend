import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n/config";

/**
 * Single source of truth for the countries this codebase serves. Each is a
 * standalone deployment — its own domain, its own database, its own PM2/env
 * config (see ecosystem.config.js and .env.example) — rather than one
 * shared site with a country picker. Adding a country means adding its code
 * here, giving it an entry in COUNTRY_DOMAINS/COUNTRY_LANGUAGES below, and
 * standing up its own deployment; nothing else in this file hardcodes the
 * list of countries.
 */
export const SUPPORTED_COUNTRIES = ["fr", "gb", "lk"] as const;

export type CountryCode = (typeof SUPPORTED_COUNTRIES)[number];

export function isSupportedCountry(value: string | null | undefined): value is CountryCode {
  if (!value) return false;
  return (SUPPORTED_COUNTRIES as readonly string[]).includes(value.toLowerCase());
}

/**
 * Live production origin for each country's standalone deployment. Used to
 * build cross-domain hreflang alternates (lib/countries/seo.ts) and the
 * country switcher's cross-domain links (setCountry in country-context.tsx)
 * — the only two places one country's site needs to know another's URL.
 */
export const COUNTRY_DOMAINS: Record<CountryCode, string> = {
  fr: "https://pearlyskyglobalclean.fr",
  gb: "https://pearlyskyglobalclean.co.uk",
  lk: "https://pearlyskyglobalclean.lk",
};

/**
 * Which of SUPPORTED_LANGUAGES each country's portal offers. France is the
 * only market that gives visitors a language choice; the UK and Sri Lanka
 * portals are English-only.
 */
export const COUNTRY_LANGUAGES: Record<CountryCode, readonly LanguageCode[]> = {
  fr: SUPPORTED_LANGUAGES,
  gb: ["en"],
  lk: ["en"],
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

/**
 * This deployment's fixed country. Unlike the old single-domain model,
 * there is no per-request country to detect here — each domain runs the
 * same codebase pointed at its own country/database via env vars, decided
 * once at deploy time. Set NEXT_PUBLIC_COUNTRY in each deployment's .env
 * (see .env.example); defaults to "fr" for local development when unset.
 */
export const CURRENT_COUNTRY: CountryCode = isSupportedCountry(process.env.NEXT_PUBLIC_COUNTRY)
  ? (process.env.NEXT_PUBLIC_COUNTRY.toLowerCase() as CountryCode)
  : "fr";

/** Languages CURRENT_COUNTRY's portal offers — shorthand for COUNTRY_LANGUAGES[CURRENT_COUNTRY]. */
export const CURRENT_COUNTRY_LANGUAGES = COUNTRY_LANGUAGES[CURRENT_COUNTRY];
