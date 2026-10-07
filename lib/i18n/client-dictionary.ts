import type { LanguageCode } from "./config";
import type { Dictionary } from "./language-context";

/**
 * Each language is its own lazily-loaded chunk, so a dictionary (~120 kB) is
 * downloaded once and cached by the browser instead of being serialized into
 * every page's HTML as a LanguageProvider prop.
 */
const loaders: Record<LanguageCode, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.en),
  fr: () => import("./dictionaries/fr").then((m) => m.fr),
  de: () => import("./dictionaries/de").then((m) => m.de),
  es: () => import("./dictionaries/es").then((m) => m.es),
  it: () => import("./dictionaries/it").then((m) => m.it),
};

// One promise per language for the module's lifetime — React's use() needs a
// stable promise so it doesn't re-suspend on every render.
const cache = new Map<LanguageCode, Promise<Dictionary>>();

/** `language`'s dictionary with English filled in for any key it lacks — same fallback as translateFor() in translate.ts. */
export function loadDictionary(language: LanguageCode): Promise<Dictionary> {
  let promise = cache.get(language);
  if (!promise) {
    promise =
      language === "en"
        ? loaders.en()
        : Promise.all([loaders.en(), loaders[language]()]).then(([en, dict]) => ({ ...en, ...dict }));
    cache.set(language, promise);
  }
  return promise;
}
