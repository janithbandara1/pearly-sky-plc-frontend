import type { LanguageCode } from "../config";
import { en, type GlobalDictionary, type GlobalKey } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import { es } from "./es";
import { it } from "./it";
import { formatTranslation } from "./format";

const dictionaries: Record<LanguageCode, GlobalDictionary> = { en, fr, de, es, it };

export type GlobalTranslator = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/**
 * Server Components only (importing this from a client component would pull all
 * five dictionaries into the browser bundle — client components use
 * `translateGlobal` from useLanguage() instead). Returns a `t(key, vars?)` bound to `language`.
 */
export function getGlobalTranslator(language: LanguageCode | null): GlobalTranslator {
  const dictionary = dictionaries[language ?? "en"];
  return (key, vars) => formatTranslation(dictionary[key] ?? en[key] ?? key, vars);
}
