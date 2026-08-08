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
export const SUPPORTED_COUNTRIES = ["fr", "gb", "lk"] as const;

export type CountryCode = (typeof SUPPORTED_COUNTRIES)[number];

export function isSupportedCountry(value: string | null | undefined): value is CountryCode {
  if (!value) return false;
  return (SUPPORTED_COUNTRIES as readonly string[]).includes(value.toLowerCase());
}

/** Name of the cookie that pins a visitor to a country once known. */
export const COUNTRY_COOKIE_NAME = "country";

/** ~30 days, in seconds (used for both the proxy's Set-Cookie and the client-side switcher). */
export const COUNTRY_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Request header proxy.ts sets so server components/layouts can read the resolved country. */
export const COUNTRY_HEADER_NAME = "x-country";
