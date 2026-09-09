import {
  countryFromUrlSlug,
  COUNTRY_URL_SLUGS,
  isLanguageSupportedForCountry,
  isSupportedCountry,
  type CountryCode,
} from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

/**
 * Reads the visitor's country from geo headers injected upstream.
 *
 * Hosting: this app runs on a Hostinger VPS behind Cloudflare (proxied),
 * so Cloudflare stamps `cf-ipcountry` on every request before it reaches
 * Nginx/Node — no SDK or IP database needed. If the deployment ever moves
 * off Cloudflare (e.g. plain VPS with no CDN, or Vercel), this is the only
 * function that needs to change — swap or extend the header(s) it reads.
 */
export function detectCountryFromHeaders(headers: Headers): CountryCode | null {
  const cfCountry = headers.get("cf-ipcountry");
  if (cfCountry && isSupportedCountry(cfCountry)) {
    return cfCountry.toLowerCase() as CountryCode;
  }
  return null;
}

/**
 * If `pathname` starts with a supported `/{slug}-{lang}` directory (e.g.
 * "/fr-en/about-us" or "/fr-fr"), returns the resolved country, language,
 * and the remaining path. A directory whose country exists but whose
 * language isn't one that country offers (e.g. "/uk-fr" — the UK is
 * English-only) is "invalid" rather than silently falling back, so it 404s
 * instead of being treated as an unprefixed path. Returns null when
 * `pathname` isn't shaped like a locale directory at all.
 */
export function extractLocalePrefix(
  pathname: string,
): { country: CountryCode; language: LanguageCode; rest: string } | "invalid" | null {
  const match = pathname.match(/^\/([a-z]{2})-([a-z]{2})(\/.*)?$/i);
  if (!match) return null;

  const [, slug, lang, rest] = match;
  const country = countryFromUrlSlug(slug.toLowerCase());
  if (!country) return null;

  const language = lang.toLowerCase();
  if (!isLanguageSupportedForCountry(country, language)) return "invalid";

  return { country, language, rest: rest || "/" };
}

/** Inverse of `extractLocalePrefix`: inserts a `/{slug}-{lang}` prefix in front of an unprefixed path. */
export function buildPrefixedPath(pathname: string, country: CountryCode, language: LanguageCode): string {
  const prefix = `/${COUNTRY_URL_SLUGS[country]}-${language}`;
  return pathname === "/" ? prefix : `${prefix}${pathname}`;
}
