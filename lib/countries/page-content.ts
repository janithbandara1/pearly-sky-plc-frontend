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
    de: {
      aboutStoryParagraph2:
        "Seitdem sind wir zu einem vertrauenswürdigen Namen in ganz Frankreich und darüber hinaus geworden. Unser Weg ist geprägt von einer tiefen Leidenschaft für Details, innovativen Reinigungsmethoden und kompromissloser Kundenzufriedenheit.",
      customersSubtitle: "Das Vertrauen anspruchsvoller Kunden in ganz Frankreich",
      contactSubtitle: "Wir sind für Sie da, wo auch immer Sie sich in Frankreich befinden.",
    },
    es: {
      aboutStoryParagraph2:
        "Desde entonces, nos hemos convertido en un nombre de confianza en toda Francia y más allá. Nuestro camino está guiado por una profunda pasión por el detalle, métodos de limpieza innovadores y un compromiso inquebrantable con la satisfacción del cliente.",
      customersSubtitle: "La confianza de clientes exigentes en toda Francia",
      contactSubtitle: "Estamos aquí para ayudarle, esté donde esté en Francia.",
    },
    it: {
      aboutStoryParagraph2:
        "Da allora siamo diventati un nome di fiducia in tutta la Francia e oltre. Il nostro percorso è guidato da una profonda passione per i dettagli, metodi di pulizia innovativi e un impegno costante per la soddisfazione del cliente.",
      customersSubtitle: "La fiducia di una clientela esigente in tutta la Francia",
      contactSubtitle: "Siamo qui per aiutarti, ovunque tu sia in Francia.",
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
    de: {
      aboutStoryParagraph2:
        "Seitdem sind wir zu einem vertrauenswürdigen Namen im gesamten Vereinigten Königreich und darüber hinaus geworden. Unser Weg ist geprägt von einer tiefen Leidenschaft für Details, innovativen Reinigungsmethoden und kompromissloser Kundenzufriedenheit.",
      customersSubtitle: "Das Vertrauen anspruchsvoller Kunden im gesamten Vereinigten Königreich",
      contactSubtitle: "Wir sind für Sie da, wo auch immer Sie sich im Vereinigten Königreich befinden.",
    },
    es: {
      aboutStoryParagraph2:
        "Desde entonces, nos hemos convertido en un nombre de confianza en todo el Reino Unido y más allá. Nuestro camino está guiado por una profunda pasión por el detalle, métodos de limpieza innovadores y un compromiso inquebrantable con la satisfacción del cliente.",
      customersSubtitle: "La confianza de clientes exigentes en todo el Reino Unido",
      contactSubtitle: "Estamos aquí para ayudarle, esté donde esté en el Reino Unido.",
    },
    it: {
      aboutStoryParagraph2:
        "Da allora siamo diventati un nome di fiducia in tutto il Regno Unito e oltre. Il nostro percorso è guidato da una profonda passione per i dettagli, metodi di pulizia innovativi e un impegno costante per la soddisfazione del cliente.",
      customersSubtitle: "La fiducia di una clientela esigente in tutto il Regno Unito",
      contactSubtitle: "Siamo qui per aiutarti, ovunque tu sia nel Regno Unito.",
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
    de: {
      aboutStoryParagraph2:
        "Seitdem sind wir zu einem vertrauenswürdigen Namen in ganz Sri Lanka und darüber hinaus geworden. Unser Weg ist geprägt von einer tiefen Leidenschaft für Details, innovativen Reinigungsmethoden und kompromissloser Kundenzufriedenheit.",
      customersSubtitle: "Das Vertrauen anspruchsvoller Kunden in ganz Sri Lanka",
      contactSubtitle: "Wir sind für Sie da, wo auch immer Sie sich in Sri Lanka befinden.",
    },
    es: {
      aboutStoryParagraph2:
        "Desde entonces, nos hemos convertido en un nombre de confianza en todo Sri Lanka y más allá. Nuestro camino está guiado por una profunda pasión por el detalle, métodos de limpieza innovadores y un compromiso inquebrantable con la satisfacción del cliente.",
      customersSubtitle: "La confianza de clientes exigentes en todo Sri Lanka",
      contactSubtitle: "Estamos aquí para ayudarle, esté donde esté en Sri Lanka.",
    },
    it: {
      aboutStoryParagraph2:
        "Da allora siamo diventati un nome di fiducia in tutto lo Sri Lanka e oltre. Il nostro percorso è guidato da una profonda passione per i dettagli, metodi di pulizia innovativi e un impegno costante per la soddisfazione del cliente.",
      customersSubtitle: "La fiducia di una clientela esigente in tutto lo Sri Lanka",
      contactSubtitle: "Siamo qui per aiutarti, ovunque tu sia in Sri Lanka.",
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
