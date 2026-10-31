/**
 * Single source of truth for which language codes proxy.ts and routing
 * understand — mirrors lib/countries/config.ts. Which of these each
 * *country* actually offers lives in lib/countries/config.ts's
 * COUNTRY_LANGUAGES: currently every country offers both (en + fr).
 * Labels for the switcher UI stay in language-context.tsx since, unlike
 * countries, there's no backend endpoint for them.
 */
export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Languages the sites used to offer (until 2026-10-31) and may still have
 * indexed URLs for. proxy.ts 308-redirects `/{retired}/...` into this
 * deployment's default language instead of letting them 404.
 */
export const RETIRED_LANGUAGES = ["de", "es", "it"] as const;

export function isSupportedLanguage(value: string | null | undefined): value is LanguageCode {
  if (!value) return false;
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value.toLowerCase());
}

/** Name of the cookie that pins a visitor to a language once known. */
export const LANGUAGE_COOKIE_NAME = "language";

/** ~30 days, in seconds (used for both the proxy's Set-Cookie and the client-side switcher). */
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/** Request header proxy.ts sets so server components/layouts can read the resolved language. */
export const LANGUAGE_HEADER_NAME = "x-language";
