import type { LanguageCode } from "../config";
import type { GlobalDictionary } from "./en";

/**
 * The global gateway's own copy (home, locations, about, services, blog,
 * contact, header and footer), kept apart from the ~145 kB main dictionaries so
 * the country sites never download it. Like lib/i18n/client-dictionary.ts, each
 * language is its own lazily-loaded chunk, so the browser gets only the one it shows.
 */
const loaders: Record<LanguageCode, () => Promise<GlobalDictionary>> = {
  en: () => import("./en").then((m) => m.en),
  fr: () => import("./fr").then((m) => m.fr),
  de: () => import("./de").then((m) => m.de),
  es: () => import("./es").then((m) => m.es),
  it: () => import("./it").then((m) => m.it),
};

// One promise per language for the module's lifetime, so React's use() gets a stable promise.
const cache = new Map<LanguageCode, Promise<GlobalDictionary>>();

export function loadGlobalDictionary(language: LanguageCode): Promise<GlobalDictionary> {
  let promise = cache.get(language);
  if (!promise) {
    promise = loaders[language]();
    cache.set(language, promise);
  }
  return promise;
}
