import { en, type TranslationKey } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { es } from "./dictionaries/es";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import type { LanguageCode } from "./config";

/**
 * Server-safe mirror of language-context.tsx's `translate` — that one is a
 * client hook (useLanguage), so anything running in a Server Component
 * (generateMetadata, JSON-LD builders) needs its own copy of the same
 * dictionaries + English-fallback logic rather than a hook it can't call.
 * Keep this dictionary list in sync with language-context.tsx's.
 */
const dictionaries: Record<LanguageCode, Partial<Record<TranslationKey, string | readonly string[]>>> = {
  en,
  fr,
  de,
  es,
  it,
};

/** Returns a `translate(key)` bound to `language`, falling back to English — same resolution order as useLanguage()'s translate. */
export function translateFor(language: LanguageCode) {
  return (key: TranslationKey): string => {
    const value = dictionaries[language]?.[key] ?? en[key] ?? key;
    return typeof value === "string" ? value : value.join("\n\n");
  };
}
