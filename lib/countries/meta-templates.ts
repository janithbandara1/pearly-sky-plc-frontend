import type { CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import type { PageMeta } from "./meta-data";

type CountryPageKey = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations" | "blog";

/**
 * Languages meta-data.ts's COUNTRY_PAGE_META doesn't have hand-written copy
 * for (every SUPPORTED_LANGUAGES entry except "en", which already has full
 * per-country literal text). getCountryPageMeta falls back to this
 * generator for those, producing every country's title/description in the
 * visitor's chosen language instead of always showing English.
 *
 * Titles append a short bare country label ({country}, e.g. "UK") — proper-
 * noun labels need no grammatical agreement, and a short label keeps titles
 * from being truncated in search results. Descriptions use a full
 * prepositional phrase ({inCountry}, e.g. "au Royaume-Uni", "im Vereinigten
 * Königreich") so the sentence reads naturally in each language.
 */
export const TRANSLATED_LANGUAGES = ["fr"] as const;
type TranslatedLanguage = (typeof TRANSLATED_LANGUAGES)[number];

function isTranslatedLanguage(language: LanguageCode): language is TranslatedLanguage {
  return (TRANSLATED_LANGUAGES as readonly string[]).includes(language);
}

/** Short bare country label per language, used to fill a template's {country} slot (titles). */
export const COUNTRY_DISPLAY_NAMES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: { fr: "France", gb: "Royaume-Uni", lk: "Sri Lanka" },
};

/** "in {country}" with the right preposition/article per language, used to fill a template's {inCountry} slot (descriptions). */
export const COUNTRY_IN_PHRASES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: { fr: "en France", gb: "au Royaume-Uni", lk: "au Sri Lanka" },
};

interface PageMetaTemplate {
  title: string;
  description: string;
}

/** {country} is replaced with COUNTRY_DISPLAY_NAMES, {inCountry} with COUNTRY_IN_PHRASES. */
export const TRANSLATED_PAGE_META_TEMPLATES: Record<TranslatedLanguage, Record<CountryPageKey, PageMetaTemplate>> = {
  fr: {
    home: {
      title: "Pearly Sky | Services de nettoyage premium {country}",
      description:
        "Un nettoyage professionnel et attentionné pour les logements et les espaces de travail dans une sélection de villes {inCountry}.",
    },
    about: {
      title: "À propos de Pearly Sky | Nettoyage professionnel {country}",
      description:
        "Découvrez l'approche de Pearly Sky en matière de nettoyage professionnel résidentiel, commercial et spécialisé dans une sélection de villes {inCountry}.",
    },
    customers: {
      title: "Nos clients | Services de nettoyage Pearly Sky {country}",
      description:
        "Découvrez comment Pearly Sky accompagne propriétaires, familles, gestionnaires de biens et entreprises avec des services de nettoyage professionnels adaptés à leurs espaces dans une sélection de villes {inCountry}.",
    },
    contact: {
      title: "Contacter Pearly Sky | Services de nettoyage professionnels {country}",
      description:
        "Contactez Pearly Sky pour des services professionnels de nettoyage de logements, de bureaux et spécialisés dans une sélection de villes {inCountry}. Demandez un devis personnalisé ou renseignez-vous sur nos services.",
    },
    careers: {
      title: "Carrières chez Pearly Sky | Emplois dans le nettoyage {inCountry}",
      description:
        "Découvrez les opportunités de carrière chez Pearly Sky : postes dans le nettoyage et les services professionnels, et comment manifester votre intérêt pour rejoindre notre équipe {inCountry}.",
    },
    ourLocations: {
      title: "Nos implantations | Services de nettoyage Pearly Sky",
      description:
        "Découvrez les implantations de Pearly Sky et un nettoyage professionnel et écoresponsable pour les logements et les espaces de travail dans nos zones d'intervention.",
    },
    blog: {
      title: "Blog & Actualités Nettoyage Éco-Luxe {country} | Pearly Sky",
      description:
        "Conseils professionnels, guides d'entretien durable et insights sur l'entretien immobilier d'élite pour les espaces premium {inCountry}.",
    },
  },
};

/**
 * Returns the templated title/description for a translated language, or
 * null if `language` has no template (caller should fall back to English).
 */
export function getTranslatedCountryPageMeta(
  page: CountryPageKey,
  country: CountryCode,
  language: LanguageCode,
): PageMeta | null {
  if (!isTranslatedLanguage(language)) return null;
  const template = TRANSLATED_PAGE_META_TEMPLATES[language][page];
  const fill = (text: string) =>
    text
      .replaceAll("{country}", COUNTRY_DISPLAY_NAMES[language][country])
      .replaceAll("{inCountry}", COUNTRY_IN_PHRASES[language][country]);
  return { title: fill(template.title), description: fill(template.description) };
}
