import type { CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

/** Rotating coverage-strip marquee, per country. */
export const COVERAGE_CITIES: Record<CountryCode, string[]> = {
  fr: [
    "Paris",
    "Nice",
    "Cannes",
    "Monaco",
    "Lyon",
    "Bordeaux",
    "Saint-Tropez",
    "Strasbourg",
    "Aix-en-Provence",
    "Annecy",
  ],
  gb: [
    "London",
    "Manchester",
    "Edinburgh",
    "Birmingham",
    "Liverpool",
    "Leeds",
    "Bristol",
    "Glasgow",
    "Cardiff",
    "Oxford",
  ],
  lk: [
    "Colombo",
    "Kandy",
    "Galle",
    "Negombo",
    "Jaffna",
    "Ella",
    "Nuwara Eliya",
    "Trincomalee",
    "Anuradhapura",
    "Matara",
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
 * Strings that vary by country AND language. Country and language are
 * independent (any /country/language URL is valid — see proxy.ts), so this
 * is a full [country][language] matrix rather than piggybacking on the
 * flat en.ts/fr.ts dictionaries.
 */
export const COUNTRY_HOME_CONTENT: Record<CountryCode, Record<LanguageCode, CountryHomeCopy>> = {
  fr: {
    en: {
      heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — France.",
      trustCoverage: "France / 10 Cities",
      coverageTitle: "Service Excellence Throughout France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across France. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Bilingual French & English Teams",
      aboutBilingualDesc: "Seamless communication for a diverse clientele.",
    },
    fr: {
      heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — France.",
      trustCoverage: "France / 10 Villes",
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
      trustCoverage: "United Kingdom / 10 Cities",
      coverageTitle: "Service Excellence Throughout the United Kingdom",
      coverageSubtitle: "London, Manchester, Edinburgh, Birmingham, and more across the UK.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "English-Speaking Concierge Teams",
      aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
    },
    fr: {
      heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — Royaume-Uni.",
      trustCoverage: "Royaume-Uni / 10 Villes",
      coverageTitle: "Excellence de Service Partout au Royaume-Uni",
      coverageSubtitle: "Londres, Manchester, Édimbourg, Birmingham, et plus encore à travers le Royaume-Uni.",
      footerTagline: "Services de nettoyage et de soin éco-luxe partout au Royaume-Uni.",
      aboutBilingualLabel: "Équipes de Conciergerie Anglophones",
      aboutBilingualDesc: "Une communication claire et professionnelle pour chaque client au Royaume-Uni.",
    },
  },
  lk: {
    en: {
      heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Sri Lanka.",
      trustCoverage: "Sri Lanka / 10 Cities",
      coverageTitle: "Service Excellence Throughout Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, and more across Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Multilingual Local Teams",
      aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
    },
    fr: {
      heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — Sri Lanka.",
      trustCoverage: "Sri Lanka / 10 Villes",
      coverageTitle: "Excellence de Service Partout au Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, et plus encore à travers le Sri Lanka.",
      footerTagline: "Services de nettoyage et de soin éco-luxe partout au Sri Lanka.",
      aboutBilingualLabel: "Équipes Locales Multilingues",
      aboutBilingualDesc: "Des équipes anglophones chaleureuses qui connaissent parfaitement le Sri Lanka.",
    },
  },
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryHomeContent(country: CountryCode | null, language: LanguageCode): CountryHomeCopy {
  return COUNTRY_HOME_CONTENT[country ?? "fr"][language];
}

interface CountryMeta {
  title: string;
  description: string;
}

/** Page <title>/description per country — English-only, matching today's language-invariant metadata. */
export const COUNTRY_META: Record<CountryCode, CountryMeta> = {
  fr: {
    title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in France",
    description:
      "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across France. Request an instant bespoke quote from Pearly Sky today.",
  },
  gb: {
    title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in the United Kingdom",
    description:
      "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across the United Kingdom. Request an instant bespoke quote from Pearly Sky today.",
  },
  lk: {
    title: "Pearly Sky | Eco-Luxury Home & Office Cleaning in Sri Lanka",
    description:
      "Experience premium, eco-friendly luxury cleaning services for elite residences and offices across Sri Lanka. Request an instant bespoke quote from Pearly Sky today.",
  },
};

export function getCountryMeta(country: CountryCode | null): CountryMeta {
  return COUNTRY_META[country ?? "fr"];
}
