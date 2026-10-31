import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

interface CountryPageCopy {
  aboutStoryParagraph2: string;
  customersSubtitle: string;
  contactSubtitle: string;
}

/**
 * Copy for pages other than the home page (see home-content.ts), keyed by
 * [country][language]. Every country has hand-written copy for all of
 * SUPPORTED_LANGUAGES; any language missing here falls back to "en".
 */
const COUNTRY_PAGE_CONTENT: Record<CountryCode, Partial<Record<LanguageCode, CountryPageCopy>>> = {
  fr: {
    en: {
      aboutStoryParagraph2:
        "Since then, we've grown into a trusted name across France and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
      customersSubtitle: "Trusted by discerning clients across France",
      contactSubtitle: "We're here to help, wherever you are in France.",
    },
    fr: {
      aboutStoryParagraph2:
        "Depuis, nous sommes devenus une référence de confiance à travers la France et au-delà. Notre parcours est guidé par une passion profonde du détail, des méthodes de nettoyage novatrices et une satisfaction client sans faille.",
      customersSubtitle: "La confiance d'une clientèle exigeante à travers la France",
      contactSubtitle: "Nous sommes là pour vous aider, où que vous soyez en France.",
    },
  },
  gb: {
    en: {
      aboutStoryParagraph2:
        "Since then, we've grown into a trusted name across the United Kingdom and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
      customersSubtitle: "Trusted by discerning clients across the United Kingdom",
      contactSubtitle: "We're here to help, wherever you are in the United Kingdom.",
    },
    fr: {
      aboutStoryParagraph2:
        "Depuis, nous sommes devenus une référence de confiance à travers le Royaume-Uni et au-delà. Notre parcours est guidé par une passion profonde du détail, des méthodes de nettoyage novatrices et une satisfaction client sans faille.",
      customersSubtitle: "La confiance d'une clientèle exigeante à travers le Royaume-Uni",
      contactSubtitle: "Nous sommes là pour vous aider, où que vous soyez au Royaume-Uni.",
    },
  },
  lk: {
    en: {
      aboutStoryParagraph2:
        "Since then, we've grown into a trusted name across Sri Lanka and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
      customersSubtitle: "Trusted by discerning clients across Sri Lanka",
      contactSubtitle: "We're here to help, wherever you are in Sri Lanka.",
    },
    fr: {
      aboutStoryParagraph2:
        "Depuis, nous sommes devenus une référence de confiance à travers le Sri Lanka et au-delà. Notre parcours est guidé par une passion profonde du détail, des méthodes de nettoyage novatrices et une satisfaction client sans faille.",
      customersSubtitle: "La confiance d'une clientèle exigeante à travers le Sri Lanka",
      contactSubtitle: "Nous sommes là pour vous aider, où que vous soyez au Sri Lanka.",
    },
  },
};

/**
 * CURRENT_COUNTRY's page copy in `language`, falling back to its English
 * copy if that language has no hand-written entry.
 */
export function getCountryPageContent(language: LanguageCode): CountryPageCopy {
  const forCountry = COUNTRY_PAGE_CONTENT[CURRENT_COUNTRY];
  return forCountry[language] ?? forCountry.en!;
}
