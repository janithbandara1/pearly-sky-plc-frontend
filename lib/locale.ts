import { isLanguageSupportedHere } from "./countries/config";
import { isSupportedLanguage, type LanguageCode } from "./i18n/config";

/**
 * Inserts a `/{language}` prefix in front of an unprefixed path. Every URL
 * on a country's domain is language-prefixed only — the country itself is
 * implied by the domain (see CURRENT_COUNTRY) rather than by a path segment,
 * unlike the old single-domain `/{country}-{language}/...` scheme.
 */
export function buildLocalePath(pathname: string, language: LanguageCode): string {
  const prefix = `/${language}`;
  return pathname === "/" ? prefix : `${prefix}${pathname}`;
}

/**
 * If `pathname` starts with a `/{language}` directory (e.g. "/en/about-us"),
 * returns the resolved language and the remaining path. A language this
 * deployment's country doesn't offer (e.g. "/fr" on the UK site) is
 * "invalid" rather than falling back silently, so it 404s instead of
 * masquerading as a real path. Returns null when `pathname` isn't shaped
 * like a language directory at all (including a two-letter first segment
 * that isn't one of SUPPORTED_LANGUAGES — no route in this app is a bare
 * two-letter path, so this is unambiguous).
 */
export function extractLocalePrefix(
  pathname: string,
): { language: LanguageCode; rest: string } | "invalid" | null {
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  if (!match) return null;

  const [, lang, rest] = match;
  const language = lang.toLowerCase();
  if (!isSupportedLanguage(language)) return null;
  if (!isLanguageSupportedHere(language)) return "invalid";

  return { language, rest: rest || "/" };
}

/**
 * Pages with no language prefix of their own (no LanguageProvider-driven
 * URL language above them — see their layouts). proxy.ts never redirects
 * them into a /{language} URL, and localizeHref never prefixes links to them.
 */
export function isLocaleExcluded(pathname: string): boolean {
  return pathname === "/login" || pathname === "/signup" || pathname.startsWith("/staff");
}

/**
 * Prefixes an internal link with the current page's language, e.g.
 * "/services/nettoyage-regulier" -> "/fr/services/nettoyage-regulier", so
 * crawlers (which carry no language cookie) never hit proxy.ts's unprefixed
 * redirect — and a link on a French page leads to the French page. Leaves
 * external/protocol-relative links, hash/query-only links, already-prefixed
 * paths and isLocaleExcluded pages untouched.
 */
export function localizeHref(href: string, language: LanguageCode): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] ?? "";
  if (extractLocalePrefix(pathname) !== null || isLocaleExcluded(pathname)) return href;

  return `${buildLocalePath(pathname, language)}${suffix}`;
}
