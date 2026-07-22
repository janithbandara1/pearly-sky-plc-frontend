import { isSupportedCountry, type CountryCode } from "./config";

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
 * If `pathname` starts with a supported country prefix, returns the code
 * and the remaining path. Otherwise returns null.
 */
export function extractCountryPrefix(
  pathname: string,
): { country: CountryCode; rest: string } | null {
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  if (!match) return null;

  const [, code, rest] = match;
  if (!isSupportedCountry(code)) return null;

  return { country: code.toLowerCase() as CountryCode, rest: rest || "/" };
}

/** Inverse of `extractCountryPrefix`: inserts a country prefix in front of an unprefixed path. */
export function buildPrefixedPath(pathname: string, country: CountryCode): string {
  return pathname === "/" ? `/${country}` : `/${country}${pathname}`;
}
