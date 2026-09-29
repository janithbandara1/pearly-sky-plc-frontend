import { en, type TranslationKey } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { es } from "./dictionaries/es";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import type { LanguageCode } from "./config";
import type { Dictionary } from "./language-context";

/**
 * Server-only home of the dictionaries. Server Components translate through
 * translateFor(); client components get a single language's dictionary via
 * getDictionary() -> LanguageProvider, so the browser never downloads the
 * other languages.
 */
const dictionaries: Record<LanguageCode, Dictionary> = {
  en,
  fr,
  de,
  es,
  it,
};

/** `language`'s dictionary with English filled in for any key it lacks — pass to LanguageProvider. */
export function getDictionary(language: LanguageCode): Dictionary {
  return language === "en" ? en : { ...en, ...dictionaries[language] };
}

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