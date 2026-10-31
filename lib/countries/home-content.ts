import { CURRENT_COUNTRY, IS_GLOBAL_SITE, type CountryCode } from "./config";
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
  welcomeContent: string;
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
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across France. We specialize in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated teams of English and French-speaking professionals are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in Paris, Nice, Cannes, and Monaco.",
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
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout en France. Nous sommes spécialisés dans la fourniture de solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes dédiées de professionnels anglophones et francophones s'engagent à ce que vos espaces soient non seulement impeccables, mais aussi à préserver un environnement sain et durable. Découvrez le summum de la propreté avec nos services haut de gamme et personnalisés, conçus pour répondre à vos besoins spécifiques à Paris, Nice, Cannes et Monaco.",
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
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across the United Kingdom. We specialise in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated English-speaking teams are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in London, Birmingham, Glasgow, Leeds and beyond.",
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
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout au Royaume-Uni. Nous sommes spécialisés dans des solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes anglophones dédiées veillent à ce que vos espaces soient non seulement impeccables, mais aussi sains et durables. Découvrez l'excellence de la propreté avec nos services premium sur mesure, conçus pour vos besoins à Londres, Birmingham, Glasgow, Leeds et au-delà.",
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
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across Sri Lanka. We specialise in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated multilingual local teams are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in Colombo, Kandy, Galle, Negombo and beyond.",
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
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout au Sri Lanka. Nous sommes spécialisés dans des solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes locales multilingues dédiées veillent à ce que vos espaces soient non seulement impeccables, mais aussi sains et durables. Découvrez l'excellence de la propreté avec nos services premium sur mesure, conçus pour vos besoins à Colombo, Kandy, Galle, Negombo et au-delà.",
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

/** Welcome paragraph for the global gateway, which has no country of its own (and is English-only). */
const GLOBAL_WELCOME_CONTENT =
  "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services around the world. We specialise in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated multilingual teams are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services in France, the United Kingdom and Sri Lanka.";

/** Home welcome paragraph — this country's copy, or the worldwide copy on the global gateway. */
export function getWelcomeContent(language: LanguageCode): string {
  return IS_GLOBAL_SITE ? GLOBAL_WELCOME_CONTENT : getCountryHomeContent(language).welcomeContent;
}
