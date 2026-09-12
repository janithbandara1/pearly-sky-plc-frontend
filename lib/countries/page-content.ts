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
  de: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Germany and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Germany",
    contactSubtitle: "We're here to help, wherever you are in Germany.",
  },
  lu: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Luxembourg and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Luxembourg",
    contactSubtitle: "We're here to help, wherever you are in Luxembourg.",
  },
  nl: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across the Netherlands and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across the Netherlands",
    contactSubtitle: "We're here to help, wherever you are in the Netherlands.",
  },
  fi: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Finland and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Finland",
    contactSubtitle: "We're here to help, wherever you are in Finland.",
  },
  se: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Sweden and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Sweden",
    contactSubtitle: "We're here to help, wherever you are in Sweden.",
  },
  it: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Italy and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Italy",
    contactSubtitle: "We're here to help, wherever you are in Italy.",
  },
  pl: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Poland and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Poland",
    contactSubtitle: "We're here to help, wherever you are in Poland.",
  },
  be: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Belgium and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Belgium",
    contactSubtitle: "We're here to help, wherever you are in Belgium.",
  },
  at: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Austria and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Austria",
    contactSubtitle: "We're here to help, wherever you are in Austria.",
  },
  dk: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Denmark and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Denmark",
    contactSubtitle: "We're here to help, wherever you are in Denmark.",
  },
  es: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Spain and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Spain",
    contactSubtitle: "We're here to help, wherever you are in Spain.",
  },
  pt: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Portugal and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Portugal",
    contactSubtitle: "We're here to help, wherever you are in Portugal.",
  },
  ro: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Romania and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Romania",
    contactSubtitle: "We're here to help, wherever you are in Romania.",
  },
  ie: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Ireland and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Ireland",
    contactSubtitle: "We're here to help, wherever you are in Ireland.",
  },
  mc: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Monaco and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Monaco",
    contactSubtitle: "We're here to help, wherever you are in Monaco.",
  },
  ch: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Switzerland and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Switzerland",
    contactSubtitle: "We're here to help, wherever you are in Switzerland.",
  },
  gb: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across the United Kingdom and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across the United Kingdom",
    contactSubtitle: "We're here to help, wherever you are in the United Kingdom.",
  },
  us: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across the United States and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across the United States",
    contactSubtitle: "We're here to help, wherever you are in the United States.",
  },
  ca: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Canada and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Canada",
    contactSubtitle: "We're here to help, wherever you are in Canada.",
  },
  au: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Australia and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Australia",
    contactSubtitle: "We're here to help, wherever you are in Australia.",
  },
  nz: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across New Zealand and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across New Zealand",
    contactSubtitle: "We're here to help, wherever you are in New Zealand.",
  },
  qa: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Qatar and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Qatar",
    contactSubtitle: "We're here to help, wherever you are in Qatar.",
  },
  sa: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Saudi Arabia and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Saudi Arabia",
    contactSubtitle: "We're here to help, wherever you are in Saudi Arabia.",
  },
  ae: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across the United Arab Emirates and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across the United Arab Emirates",
    contactSubtitle: "We're here to help, wherever you are in the United Arab Emirates.",
  },
  om: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Oman and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Oman",
    contactSubtitle: "We're here to help, wherever you are in Oman.",
  },
  bh: {
    aboutStoryParagraph2:
      "Since then, we've grown into a trusted name across Bahrain and beyond. Our journey is guided by a deep passion for detail, pioneering cleaning methods, and unwavering customer satisfaction.",
    customersSubtitle: "Trusted by discerning clients across Bahrain",
    contactSubtitle: "We're here to help, wherever you are in Bahrain.",
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
