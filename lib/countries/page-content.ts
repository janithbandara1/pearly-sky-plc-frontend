import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

interface CountryPageCopy {
  aboutStoryParagraph2: string;
  customersSubtitle: string;
  contactSubtitle: string;
}

/**
 * Copy for pages other than the home page (see home-content.ts), keyed by
 * [country][language] — mirrors COUNTRY_LANGUAGES in ./config: France has
 * hand-written "en" and "fr" copy; the UK and Sri Lanka are English-only,
 * so they only ever have an "en" entry.
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
  },
  lk: {
    en: {
      aboutStoryParagraph2:
        "Since then, we've grown into a trusted name across Sri Lanka and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
      customersSubtitle: "Trusted by discerning clients across Sri Lanka",
      contactSubtitle: "We're here to help, wherever you are in Sri Lanka.",
    },
  },
};

/**
 * CURRENT_COUNTRY's page copy in `language`, falling back to its English
 * copy if that language has no hand-written entry yet (only ever applies
 * to France's "de"/"es"/"it" — meta-data.ts's page titles do generate copy
 * for those from templates, but this body copy has no such generator).
 */
export function getCountryPageContent(language: LanguageCode): CountryPageCopy {
  const forCountry = COUNTRY_PAGE_CONTENT[CURRENT_COUNTRY];
  return forCountry[language] ?? forCountry.en!;
}
