import type { CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

interface CountryPageCopy {
  aboutStoryParagraph2: string;
  customersSubtitle: string;
  contactSubtitle: string;
}

/**
 * Copy for pages other than the home page (see home-content.ts), in each
 * country's default (English) language. France's French variant lives
 * separately in FR_PAGE_CONTENT_FR below — every other country is
 * English-only (see lib/countries/config.ts's COUNTRY_LANGUAGES). fr/gb/lk
 * carry the site's original hand-written copy; the other 22 markets use
 * generic-but-distinct placeholder copy (real local detail pending) built
 * from each country's name.
 */
export const COUNTRY_PAGE_CONTENT: Record<CountryCode, CountryPageCopy> = {
  fr: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across France and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across France",
    contactSubtitle: "We're here to help, wherever you are in France.",
  },
  gb: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across the United Kingdom and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across the United Kingdom",
    contactSubtitle: "We're here to help, wherever you are in the United Kingdom.",
  },
  lk: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Sri Lanka and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Sri Lanka",
    contactSubtitle: "We're here to help, wherever you are in Sri Lanka.",
  },
};

/** France's page copy in French — the one country/language combo besides each country's English default. */
const FR_PAGE_CONTENT_FR: CountryPageCopy = {
  aboutStoryParagraph2:
    "Depuis, nous sommes devenus une référence de confiance à travers la France et au-delà. Notre parcours est guidé par une passion profonde du détail, des méthodes de nettoyage novatrices et une satisfaction client sans faille.",
  customersSubtitle: "La confiance d'une clientèle exigeante à travers la France",
  contactSubtitle: "Nous sommes là pour vous aider, où que vous soyez en France.",
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryPageContent(country: CountryCode | null, language: LanguageCode): CountryPageCopy {
  const resolved = country ?? "fr";
  if (resolved === "fr" && language === "fr") return FR_PAGE_CONTENT_FR;
  return COUNTRY_PAGE_CONTENT[resolved];
}
