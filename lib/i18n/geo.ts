import { isSupportedLanguage, type LanguageCode } from "./config";

/**
 * Reads the visitor's preferred language from the `accept-language` header.
 * Unlike country detection, this always resolves to something (falls back
 * to "en") since every country-prefixed URL needs a language segment.
 */
export function detectLanguageFromHeaders(headers: Headers): LanguageCode {
  const acceptLanguage = headers.get("accept-language");
  const preferred = acceptLanguage?.split(",")[0]?.split("-")[0]?.trim().toLowerCase();
  return isSupportedLanguage(preferred) ? preferred : "en";
}

/**
 * If `pathname` starts with a supported language prefix, returns the code
 * and the remaining path. Otherwise returns null.
 */
export function extractLanguagePrefix(
  pathname: string,
): { language: LanguageCode; rest: string } | null {
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  if (!match) return null;

  const [, code, rest] = match;
  if (!isSupportedLanguage(code)) return null;

  return { language: code.toLowerCase() as LanguageCode, rest: rest || "/" };
}
