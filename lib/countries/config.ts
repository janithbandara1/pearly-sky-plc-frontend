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
 * True when this deployment is the country-picker gateway
 * (NEXT_PUBLIC_COUNTRY=global) rather than one of the three real 
 * per-country sites. The gateway has no backend/database behind it at
 * all — no catalog, no bookings, no accounts — it's just the shared home
 * page chrome with the services/login pieces hidden (see site-header.tsx,
 * site-footer.tsx, and app/(site)/page.tsx) plus a link to each real
 * country site. proxy.ts blocks every route except "/" and the static
 * legal pages on this mode.
 */
export const IS_GLOBAL_SITE = process.env.NEXT_PUBLIC_COUNTRY === "global";

/**
 * This deployment's fixed country. Unlike the old single-domain model,
 * there is no per-request country to detect here — each domain runs the
 * same codebase pointed at its own country/database via env vars, decided
 * once at deploy time. Set NEXT_PUBLIC_COUNTRY in each deployment's .env
 * (see .env.example); defaults to "fr" for local development when unset.
 *
 * On the global gateway (IS_GLOBAL_SITE) this is just a structural
 * placeholder — nothing on that deployment ever actually calls the
 * backend or reads country-specific content, so which real country it
 * falls back to doesn't matter.
 */
export const CURRENT_COUNTRY: CountryCode = isSupportedCountry(process.env.NEXT_PUBLIC_COUNTRY)
  ? (process.env.NEXT_PUBLIC_COUNTRY.toLowerCase() as CountryCode)
  : "fr";

/**
 * Languages this deployment's portal offers — CURRENT_COUNTRY's languages,
 * or just English on the global gateway (IS_GLOBAL_SITE), which has no
 * country/content to offer a choice over.
 */
export const CURRENT_COUNTRY_LANGUAGES: readonly LanguageCode[] = IS_GLOBAL_SITE
  ? (["en"] as const)
  : COUNTRY_LANGUAGES[CURRENT_COUNTRY];

/** Whether `language` is valid on *this* deployment — see CURRENT_COUNTRY_LANGUAGES. Use this (not isLanguageSupportedForCountry) for anything routing- or request-level, so it accounts for IS_GLOBAL_SITE. */
export function isLanguageSupportedHere(language: string | null | undefined): language is LanguageCode {
  if (!language) return false;
  return (CURRENT_COUNTRY_LANGUAGES as readonly string[]).includes(language.toLowerCase());
}

/**
 * Careers/job listings only exist for France's hiring — the UK and Sri
 * Lanka deployments have no positions to list, so /careers is hidden and
 * blocked there (see proxy.ts, site-header.tsx, site-footer.tsx, and
 * app/sitemap.ts). Also shown on the global gateway, whose content isn't
 * country-specific to begin with.
 */
export const IS_CAREERS_ENABLED = IS_GLOBAL_SITE || CURRENT_COUNTRY === "fr";
