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
