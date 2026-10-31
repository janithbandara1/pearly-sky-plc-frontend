import { en, type TranslationKey } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import type { LanguageCode } from "./config";
import type { Dictionary } from "./language-context";

/**
 * Server-only home of the dictionaries. Server Components translate through
 * translateFor(); client components load a single language's dictionary via
 * lib/i18n/client-dictionary.ts, so the browser never downloads the other
 * languages.
 */
const dictionaries: Record<LanguageCode, Dictionary> = {
  en,
  fr,
};

/** Returns a `translate(key)` bound to `language`, falling back to English — same resolution order as useLanguage()'s translate. */
/* export function translateFor(language: LanguageCode) {
  return (key: TranslationKey): string => {
    const value = dictionaries[language]?.[key] ?? en[key] ?? key;
    return typeof value === "string" ? value : value.join("\n\n");
  };
} */
export function translateFor(language: LanguageCode) {
  return (key: TranslationKey): string => {
    const value = dictionaries[language]?.[key] ?? en[key] ?? key;

    if (typeof value === "string") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean).join("\n\n");
    }

    // Fallback if value is null, undefined, or unexpected type
    return String(value ?? key);
  };
}