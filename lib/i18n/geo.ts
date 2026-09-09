import { isSupportedLanguage, type LanguageCode } from "./config";

/**
 * Reads the visitor's preferred language from the `accept-language` header.
 * Only meaningful for France (the one country offering a language choice —
 * see lib/countries/config.ts's COUNTRY_LANGUAGES); callers clamp the result
 * to whatever the resolved country actually supports.
 */
export function detectLanguageFromHeaders(headers: Headers): LanguageCode {
  const acceptLanguage = headers.get("accept-language");
  const preferred = acceptLanguage?.split(",")[0]?.split("-")[0]?.trim().toLowerCase();
  return isSupportedLanguage(preferred) ? preferred : "en";
}
