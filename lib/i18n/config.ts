/**
 * Single source of truth for which language codes proxy.ts and routing
 * understand — mirrors lib/countries/config.ts. Which of these each
 * *country* actually offers lives in lib/countries/config.ts's
 * COUNTRY_LANGUAGES (only France offers both; every other market is
 * English-only per the master blueprint's "English Vision" strategy).
 * Labels for the switcher UI stay in language-context.tsx since, unlike
 * countries, there's no backend endpoint for them.
 */
export const SUPPORTED_LANGUAGES = [
  "en",
  "fr",
  "da",
  "de",
  "es",
  "fi",
  "it",
  "lb",
  "nl",
  "no",
  "pl",
  "pt",
  "ro",
  "sv",
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

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
