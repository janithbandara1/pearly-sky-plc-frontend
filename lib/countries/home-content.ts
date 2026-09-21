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
  trustCoverage: string;
  coverageTitle: string;
  coverageSubtitle: string;
  footerTagline: string;
  aboutBilingualLabel: string;
  aboutBilingualDesc: string;
}

/**
 * Home page copy, keyed by [country][language] — mirrors COUNTRY_LANGUAGES
 * in ./config: France has hand-written "en" and "fr" copy; the UK and Sri
 * Lanka are English-only, so they only ever have an "en" entry.
 */
const COUNTRY_HOME_CONTENT: Record<CountryCode, Partial<Record<LanguageCode, CountryHomeCopy>>> = {
  fr: {
    en: {
      heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — France.",
      trustCoverage: "France / 24 Cities",
      coverageTitle: "Service Excellence Throughout France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout en France. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Bilingual French & English Teams",
      aboutBilingualDesc: "Seamless communication for a diverse clientele.",
    },
    fr: {
      heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — France.",
      trustCoverage: "France / 24 Villes",
      coverageTitle: "Excellence de Service Partout en France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, et plus encore à travers la France.",
      footerTagline: "Services de nettoyage et de soin éco-luxe partout en France.",
      aboutBilingualLabel: "Équipes Bilingues Français & Anglais",
      aboutBilingualDesc: "Communication fluide pour une clientèle diverse.",
    },
  },
  gb: {
    en: {
      heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — United Kingdom.",
      trustCoverage: "United Kingdom / 24 Cities",
      coverageTitle: "Service Excellence Throughout the United Kingdom",
      coverageSubtitle: "London, Birmingham, Glasgow, Leeds, and more across the UK.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "English-Speaking Concierge Teams",
      aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
    },
  },
  lk: {
    en: {
      heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Sri Lanka.",
      trustCoverage: "Sri Lanka / 10 Cities",
      coverageTitle: "Service Excellence Throughout Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo, and more across Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Multilingual Local Teams",
      aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
    },
  },
};

/**
 * CURRENT_COUNTRY's home page copy in `language`, falling back to its
 * English copy if that language has no hand-written entry yet (only ever
 * applies to France's "de"/"es"/"it").
 */
export function getCountryHomeContent(language: LanguageCode): CountryHomeCopy {
  const forCountry = COUNTRY_HOME_CONTENT[CURRENT_COUNTRY];
  return forCountry[language] ?? forCountry.en!;
}
