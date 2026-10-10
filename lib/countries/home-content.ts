import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

/** Rotating coverage-strip marquee, per country. */
export const COVERAGE_CITIES: Record<CountryCode, string[]> = {
  fr: [
    "Paris",
  "Nice",
  "Saint-Tropez",
  "Antibes",
  "Cannes",
  "Lyon",
  "Bordeaux",
  "Toulouse",
  "Toulon",
  "Montpellier",
  "Strasbourg",
  "Normandy",
  "Deauville",
  "Dieppe",
  "La Rochelle",
  "Neuilly-sur-Seine",
  "Annecy",
  "Aix-en-Provence",
  "Nantes",
  "Biarritz",
  "Monaco Border / Menton",
  "Cassis",
  "Saint-Jean-Cap-Ferrat",
  "Versailles"
  ],
  
  gb: [
    "London",
  "Birmingham",
  "Glasgow",
  "Leeds",
  "Sheffield",
  "Edinburgh",
  "Bristol",
  "Liverpool",
  "Belfast",
  "Manchester",
  "Cardiff",
  "Leicester",
  "Coventry",
  "Nottingham",
  "Newcastle upon Tyne",
  "Kingston upon Hull",
  "Stoke-on-Trent",
  "Southampton",
  "Derby",
  "Portsmouth",
  "Brighton and Hove",
  "Plymouth",
  "Reading",
  "Aberdeen"
  ],
  lk: [
    "Colombo",
  "Kandy",
  "Galle",
  "Negombo",
  "Anuradhapura",
  "Badulla",
  "Sigiriya",
  "Ella",
  "Nuwara Eliya",
  "Kurunegala"
  ],
};

interface CountryHomeCopy {
  heroSubtitle: string;
  heroAvailability: string;
  trustCoverage: string;
  coverageTitle: string;
  coverageSubtitle: string;
  footerTagline: string;
  aboutBilingualLabel: string;
  aboutBilingualDesc: string;
}

/**
 * Home page copy, keyed by [country][language]. Every country has
 * hand-written copy for all of SUPPORTED_LANGUAGES; any language missing
 * here falls back to "en".
 */
const COUNTRY_HOME_CONTENT: Record<CountryCode, Partial<Record<LanguageCode, CountryHomeCopy>>> = {
  fr: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in France",
      heroAvailability: "Serving selected locations across France. Availability depends on your location and service requirements.",
      trustCoverage: "France / 24 Cities",
      coverageTitle: "Service Excellence Throughout France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across France. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Bilingual French & English Teams",
      aboutBilingualDesc: "Seamless communication for a diverse clientele.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail en France",
      heroAvailability: "Nous intervenons dans une sélection de villes en France. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "France / 24 Villes",
      coverageTitle: "Excellence de Service Partout en France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, et plus encore à travers la France.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout en France. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes Bilingues Français & Anglais",
      aboutBilingualDesc: "Communication fluide pour une clientèle diverse.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume in Frankreich",
      heroAvailability: "Wir sind an ausgewählten Standorten in ganz Frankreich tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "Frankreich / 24 Städte",
      coverageTitle: "Erstklassiger Service in ganz Frankreich",
      coverageSubtitle: "Paris, Nizza, Cannes, Monaco, Lyon, Bordeaux und viele weitere Orte in ganz Frankreich.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels in ganz Frankreich. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Zweisprachige Teams (Französisch & Englisch)",
      aboutBilingualDesc: "Reibungslose Kommunikation für eine vielfältige Kundschaft.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en Francia",
      heroAvailability: "Atendemos determinadas zonas de Francia. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Francia / 24 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Toda Francia",
      coverageSubtitle: "París, Niza, Cannes, Mónaco, Lyon, Burdeos y muchas más en toda Francia.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en toda Francia. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos Bilingües en Francés e Inglés",
      aboutBilingualDesc: "Comunicación fluida para una clientela diversa.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro in Francia",
      heroAvailability: "Operiamo in località selezionate in tutta la Francia. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Francia / 24 Città",
      coverageTitle: "Eccellenza del Servizio in Tutta la Francia",
      coverageSubtitle: "Parigi, Nizza, Cannes, Monaco, Lione, Bordeaux e molte altre in tutta la Francia.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutta la Francia. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Bilingui Francese e Inglese",
      aboutBilingualDesc: "Comunicazione fluida per una clientela diversificata.",
    },
  },
  gb: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in the United Kingdom",
      heroAvailability: "Serving selected locations across the United Kingdom. Availability depends on your location and service requirements.",
      trustCoverage: "United Kingdom / 24 Cities",
      coverageTitle: "Service Excellence Throughout the United Kingdom",
      coverageSubtitle: "London, Birmingham, Glasgow, Leeds, and more across the UK.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "English-Speaking Concierge Teams",
      aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail au Royaume-Uni",
      heroAvailability: "Nous intervenons dans une sélection de villes au Royaume-Uni. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "Royaume-Uni / 24 Villes",
      coverageTitle: "Excellence de Service Partout au Royaume-Uni",
      coverageSubtitle: "Londres, Birmingham, Glasgow, Leeds, et plus encore à travers le Royaume-Uni.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout au Royaume-Uni. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes de Conciergerie Anglophones",
      aboutBilingualDesc: "Une communication claire et professionnelle pour chaque client au Royaume-Uni.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume im Vereinigten Königreich",
      heroAvailability: "Wir sind an ausgewählten Standorten im gesamten Vereinigten Königreich tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "UK / 24 Städte",
      coverageTitle: "Erstklassiger Service im ganzen Vereinigten Königreich",
      coverageSubtitle: "London, Birmingham, Glasgow, Leeds und viele weitere Orte im ganzen Vereinigten Königreich.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels im gesamten Vereinigten Königreich. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Englischsprachige Concierge-Teams",
      aboutBilingualDesc: "Klare, professionelle Kommunikation für jeden Kunden im Vereinigten Königreich.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en el Reino Unido",
      heroAvailability: "Atendemos determinadas zonas del Reino Unido. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Reino Unido / 24 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Todo el Reino Unido",
      coverageSubtitle: "Londres, Birmingham, Glasgow, Leeds y muchas más en todo el Reino Unido.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en todo el Reino Unido. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos de Conserjería de Habla Inglesa",
      aboutBilingualDesc: "Comunicación clara y profesional para cada cliente en el Reino Unido.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro nel Regno Unito",
      heroAvailability: "Operiamo in località selezionate in tutto il Regno Unito. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Regno Unito / 24 Città",
      coverageTitle: "Eccellenza del Servizio in Tutto il Regno Unito",
      coverageSubtitle: "Londra, Birmingham, Glasgow, Leeds e molte altre in tutto il Regno Unito.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutto il Regno Unito. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Concierge di Lingua Inglese",
      aboutBilingualDesc: "Comunicazione chiara e professionale per ogni cliente nel Regno Unito.",
    },
  },
  lk: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in Sri Lanka",
      heroAvailability: "Serving selected locations across Sri Lanka. Availability depends on your location and service requirements.",
      trustCoverage: "Sri Lanka / 10 Cities",
      coverageTitle: "Service Excellence Throughout Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo, and more across Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Multilingual Local Teams",
      aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail au Sri Lanka",
      heroAvailability: "Nous intervenons dans une sélection de villes au Sri Lanka. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "Sri Lanka / 10 Villes",
      coverageTitle: "Excellence de Service Partout au Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo, et plus encore à travers le Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout au Sri Lanka. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes Locales Multilingues",
      aboutBilingualDesc: "Des équipes anglophones chaleureuses qui connaissent le Sri Lanka sur le bout des doigts.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume in Sri Lanka",
      heroAvailability: "Wir sind an ausgewählten Standorten in ganz Sri Lanka tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "Sri Lanka / 10 Städte",
      coverageTitle: "Erstklassiger Service in ganz Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo und viele weitere Orte in ganz Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels in ganz Sri Lanka. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Mehrsprachige lokale Teams",
      aboutBilingualDesc: "Freundliche, englischsprachige Teams, die Sri Lanka in- und auswendig kennen.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en Sri Lanka",
      heroAvailability: "Atendemos determinadas zonas de Sri Lanka. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Sri Lanka / 10 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Todo Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo y muchas más en todo Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en todo Sri Lanka. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos Locales Multilingües",
      aboutBilingualDesc: "Equipos amables y de habla inglesa que conocen Sri Lanka a la perfección.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro in Sri Lanka",
      heroAvailability: "Operiamo in località selezionate in tutto lo Sri Lanka. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Sri Lanka / 10 Città",
      coverageTitle: "Eccellenza del Servizio in Tutto lo Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo e molte altre in tutto lo Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutto lo Sri Lanka. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Locali Multilingue",
      aboutBilingualDesc: "Team cordiali e di lingua inglese che conoscono lo Sri Lanka come le proprie tasche.",
    },
  },
};

/**
 * CURRENT_COUNTRY's home page copy in `language`, falling back to its
 * English copy if that language has no hand-written entry.
 */
export function getCountryHomeContent(language: LanguageCode): CountryHomeCopy {
  const forCountry = COUNTRY_HOME_CONTENT[CURRENT_COUNTRY];
  return forCountry[language] ?? forCountry.en!;
}
