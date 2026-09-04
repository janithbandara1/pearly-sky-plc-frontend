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
  de: [
    "Berlin",
    "Munich",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "Stuttgart",
    "Düsseldorf",
    "Dresden",
    "Leipzig",
    "Nuremberg",
  ],
  lu: [
    "Luxembourg City",
    "Esch-sur-Alzette",
    "Differdange",
    "Dudelange",
    "Ettelbruck",
    "Diekirch",
    "Wiltz",
    "Grevenmacher",
    "Remich",
    "Echternach",
  ],
  nl: [
    "Amsterdam",
    "Rotterdam",
    "The Hague",
    "Utrecht",
    "Eindhoven",
    "Groningen",
    "Tilburg",
    "Maastricht",
    "Haarlem",
    "Arnhem",
  ],
  fi: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Turku", "Oulu", "Jyväskylä", "Lahti", "Kuopio", "Pori"],
  se: [
    "Stockholm",
    "Gothenburg",
    "Malmö",
    "Uppsala",
    "Västerås",
    "Örebro",
    "Linköping",
    "Helsingborg",
    "Jönköping",
    "Lund",
  ],
  it: ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice", "Bologna", "Genoa", "Verona", "Palermo"],
  pl: [
    "Warsaw",
    "Kraków",
    "Łódź",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Szczecin",
    "Bydgoszcz",
    "Lublin",
    "Katowice",
  ],
  be: ["Brussels", "Antwerp", "Ghent", "Bruges", "Liège", "Leuven", "Namur", "Mons", "Mechelen", "Charleroi"],
  at: [
    "Vienna",
    "Graz",
    "Linz",
    "Salzburg",
    "Innsbruck",
    "Klagenfurt",
    "Villach",
    "Wels",
    "Sankt Pölten",
    "Dornbirn",
  ],
  dk: [
    "Copenhagen",
    "Aarhus",
    "Odense",
    "Aalborg",
    "Esbjerg",
    "Randers",
    "Kolding",
    "Horsens",
    "Vejle",
    "Roskilde",
  ],
  es: ["Madrid", "Barcelona", "Valencia", "Seville", "Málaga", "Bilbao", "Marbella", "Palma", "Zaragoza", "Alicante"],
  pt: ["Lisbon", "Porto", "Cascais", "Braga", "Coimbra", "Faro", "Funchal", "Sintra", "Setúbal", "Aveiro"],
  ro: [
    "Bucharest",
    "Cluj-Napoca",
    "Timișoara",
    "Iași",
    "Constanța",
    "Craiova",
    "Brașov",
    "Galați",
    "Ploiești",
    "Oradea",
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
  us: [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "San Francisco",
    "Boston",
    "Washington D.C.",
    "Las Vegas",
    "Houston",
    "Seattle",
  ],
  ca: [
    "Toronto",
    "Vancouver",
    "Montreal",
    "Calgary",
    "Ottawa",
    "Edmonton",
    "Quebec City",
    "Winnipeg",
    "Victoria",
    "Halifax",
  ],
  au: [
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Perth",
    "Gold Coast",
    "Adelaide",
    "Canberra",
    "Sunshine Coast",
    "Hobart",
    "Newcastle",
  ],
  nz: [
    "Auckland",
    "Wellington",
    "Christchurch",
    "Queenstown",
    "Hamilton",
    "Tauranga",
    "Dunedin",
    "Napier",
    "Nelson",
    "Rotorua",
  ],
  qa: [
    "Doha",
    "Al Rayyan",
    "Al Wakrah",
    "Lusail",
    "Al Khor",
    "Umm Salal",
    "Mesaieed",
    "Dukhan",
    "Ras Laffan",
    "Al Shamal",
  ],
  sa: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Dhahran", "Abha", "Taif", "Al Khobar"],
  ae: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Al Ain",
    "Umm Al Quwain",
    "Dubai Marina",
    "Jumeirah",
  ],
  om: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Ibri", "Rustaq", "Seeb", "Barka", "Khasab"],
  bh: ["Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali", "Isa Town", "Sitra", "Budaiya", "Jidhafs", "Zallaq"],
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
 * Home page copy per country, in that country's default (English) language.
 * France's French variant lives separately in FR_HOME_CONTENT_FR below — every
 * other country is English-only (see lib/countries/config.ts's
 * COUNTRY_LANGUAGES), so a full [country][language] matrix would be mostly
 * unreachable dead entries. fr/gb/lk carry the site's original hand-written
 * copy; the other 22 markets use generic-but-distinct placeholder copy (real
 * office/coverage detail pending) built from each country's name and top cities.
 */
export const COUNTRY_HOME_CONTENT: Record<CountryCode, CountryHomeCopy> = {
  fr: { 
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — France.",
    trustCoverage: "France / 10 Cities",
    coverageTitle: "Service Excellence Throughout France",
    coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across France. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "Bilingual French & English Teams",
    aboutBilingualDesc: "Seamless communication for a diverse clientele.",
  },
  de: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Germany.",
    trustCoverage: "Germany / 10 Cities",
    coverageTitle: "Service Excellence Throughout Germany",
    coverageSubtitle: "Berlin, Munich, Hamburg, Frankfurt, and more across Germany.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Germany. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Germany.",
  },
  lu: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Luxembourg.",
    trustCoverage: "Luxembourg / 10 Cities",
    coverageTitle: "Service Excellence Throughout Luxembourg",
    coverageSubtitle: "Luxembourg City, Esch-sur-Alzette, Differdange, Dudelange, and more across Luxembourg.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Luxembourg. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Luxembourg.",
  },
  nl: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — The Netherlands.",
    trustCoverage: "The Netherlands / 10 Cities",
    coverageTitle: "Service Excellence Throughout The Netherlands",
    coverageSubtitle: "Amsterdam, Rotterdam, The Hague, Utrecht, and more across the Netherlands.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the Netherlands. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the Netherlands.",
  },
  fi: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Finland.",
    trustCoverage: "Finland / 10 Cities",
    coverageTitle: "Service Excellence Throughout Finland",
    coverageSubtitle: "Helsinki, Espoo, Tampere, Vantaa, and more across Finland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Finland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Finland.",
  },
  se: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Sweden.",
    trustCoverage: "Sweden / 10 Cities",
    coverageTitle: "Service Excellence Throughout Sweden",
    coverageSubtitle: "Stockholm, Gothenburg, Malmö, Uppsala, and more across Sweden.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sweden. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Sweden.",
  },
  it: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Italy.",
    trustCoverage: "Italy / 10 Cities",
    coverageTitle: "Service Excellence Throughout Italy",
    coverageSubtitle: "Rome, Milan, Naples, Turin, and more across Italy.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Italy. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Italy.",
  },
  pl: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Poland.",
    trustCoverage: "Poland / 10 Cities",
    coverageTitle: "Service Excellence Throughout Poland",
    coverageSubtitle: "Warsaw, Kraków, Łódź, Wrocław, and more across Poland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Poland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Poland.",
  },
  be: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Belgium.",
    trustCoverage: "Belgium / 10 Cities",
    coverageTitle: "Service Excellence Throughout Belgium",
    coverageSubtitle: "Brussels, Antwerp, Ghent, Bruges, and more across Belgium.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Belgium. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Belgium.",
  },
  at: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Austria.",
    trustCoverage: "Austria / 10 Cities",
    coverageTitle: "Service Excellence Throughout Austria",
    coverageSubtitle: "Vienna, Graz, Linz, Salzburg, and more across Austria.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Austria. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Austria.",
  },
  dk: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Denmark.",
    trustCoverage: "Denmark / 10 Cities",
    coverageTitle: "Service Excellence Throughout Denmark",
    coverageSubtitle: "Copenhagen, Aarhus, Odense, Aalborg, and more across Denmark.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Denmark. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Denmark.",
  },
  es: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Spain.",
    trustCoverage: "Spain / 10 Cities",
    coverageTitle: "Service Excellence Throughout Spain",
    coverageSubtitle: "Madrid, Barcelona, Valencia, Seville, and more across Spain.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Spain. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Spain.",
  },
  pt: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Portugal.",
    trustCoverage: "Portugal / 10 Cities",
    coverageTitle: "Service Excellence Throughout Portugal",
    coverageSubtitle: "Lisbon, Porto, Cascais, Braga, and more across Portugal.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Portugal. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Portugal.",
  },
  ro: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Romania.",
    trustCoverage: "Romania / 10 Cities",
    coverageTitle: "Service Excellence Throughout Romania",
    coverageSubtitle: "Bucharest, Cluj-Napoca, Timișoara, Iași, and more across Romania.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Romania. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Romania.",
  },
  gb: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — United Kingdom.",
    trustCoverage: "United Kingdom / 10 Cities",
    coverageTitle: "Service Excellence Throughout the United Kingdom",
    coverageSubtitle: "London, Manchester, Edinburgh, Birmingham, and more across the UK.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
  },
  us: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — The United States.",
    trustCoverage: "The United States / 10 Cities",
    coverageTitle: "Service Excellence Throughout The United States",
    coverageSubtitle: "New York, Los Angeles, Miami, Chicago, and more across the United States.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United States. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the United States.",
  },
  ca: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Canada.",
    trustCoverage: "Canada / 10 Cities",
    coverageTitle: "Service Excellence Throughout Canada",
    coverageSubtitle: "Toronto, Vancouver, Montreal, Calgary, and more across Canada.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Canada. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Canada.",
  },
  au: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Australia.",
    trustCoverage: "Australia / 10 Cities",
    coverageTitle: "Service Excellence Throughout Australia",
    coverageSubtitle: "Sydney, Melbourne, Brisbane, Perth, and more across Australia.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Australia. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Australia.",
  },
  nz: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — New Zealand.",
    trustCoverage: "New Zealand / 10 Cities",
    coverageTitle: "Service Excellence Throughout New Zealand",
    coverageSubtitle: "Auckland, Wellington, Christchurch, Queenstown, and more across New Zealand.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across New Zealand. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across New Zealand.",
  },
  qa: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Qatar.",
    trustCoverage: "Qatar / 10 Cities",
    coverageTitle: "Service Excellence Throughout Qatar",
    coverageSubtitle: "Doha, Al Rayyan, Al Wakrah, Lusail, and more across Qatar.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Qatar. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Qatar.",
  },
  sa: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Saudi Arabia.",
    trustCoverage: "Saudi Arabia / 10 Cities",
    coverageTitle: "Service Excellence Throughout Saudi Arabia",
    coverageSubtitle: "Riyadh, Jeddah, Mecca, Medina, and more across Saudi Arabia.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Saudi Arabia. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Saudi Arabia.",
  },
  ae: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — The United Arab Emirates.",
    trustCoverage: "The United Arab Emirates / 10 Cities",
    coverageTitle: "Service Excellence Throughout The United Arab Emirates",
    coverageSubtitle: "Dubai, Abu Dhabi, Sharjah, Ajman, and more across the United Arab Emirates.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Arab Emirates. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the United Arab Emirates.",
  },
  om: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Oman.",
    trustCoverage: "Oman / 10 Cities",
    coverageTitle: "Service Excellence Throughout Oman",
    coverageSubtitle: "Muscat, Salalah, Sohar, Nizwa, and more across Oman.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Oman. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Oman.",
  },
  bh: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Bahrain.",
    trustCoverage: "Bahrain / 10 Cities",
    coverageTitle: "Service Excellence Throughout Bahrain",
    coverageSubtitle: "Manama, Riffa, Muharraq, Hamad Town, and more across Bahrain.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Bahrain. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Bahrain.",
  },
  lk: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Sri Lanka.",
    trustCoverage: "Sri Lanka / 10 Cities",
    coverageTitle: "Service Excellence Throughout Sri Lanka",
    coverageSubtitle: "Colombo, Kandy, Galle, and more across Sri Lanka.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "Multilingual Local Teams",
    aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
  },
};

/** France's home page copy in French — the one country/language combo besides each country's English default. */
const FR_HOME_CONTENT_FR: CountryHomeCopy = {
  heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — France.",
  trustCoverage: "France / 10 Villes",
  coverageTitle: "Excellence de Service Partout en France",
  coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, et plus encore à travers la France.",
  footerTagline: "Services de nettoyage et de soin éco-luxe partout en France.",
  aboutBilingualLabel: "Équipes Bilingues Français & Anglais",
  aboutBilingualDesc: "Communication fluide pour une clientèle diverse.",
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryHomeContent(country: CountryCode | null, language: LanguageCode): CountryHomeCopy {
  const resolved = country ?? "fr";
  if (resolved === "fr" && language === "fr") return FR_HOME_CONTENT_FR;
  return COUNTRY_HOME_CONTENT[resolved];
}
