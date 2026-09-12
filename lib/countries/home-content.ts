import type { CountryCode } from "./config";
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
  de: [
    
    "Copenhagen",
  "Aarhus",
  "Odense",
  "Aalborg",
  "Esbjerg",
  "Randers",
  "Kolding",
  "Horsens",
  "Vejle",
  "Roskilde"
  ],
  lu: [
    

    "Luxembourg City",
  "Esch-sur-Alzette",
  "Differdange",
  "Dudelange",
  "Echternach",
  "Vianden",
  "Clervaux",
  "Wiltz",
  "Remich",
  "Diekirch"
  ],
  nl: [
    
    "Amsterdam",
  "Rotterdam",
  "The Hague",
  "Utrecht",
  "Eindhoven",
  "Groningen",
  "Maastricht",
  "Haarlem",
  "Delft",
  "Leiden"
  ],
  
  fi: [
    "Helsinki",
  "Espoo",
  "Tampere",
  "Vantaa",
  "Oulu",
  "Turku",
  "Jyväskylä",
  "Lahti",
  "Kuopio",
  "Pori",
  "Joensuu",
  "Lappeenranta",
  "Hämeenlinna",
  "Vaasa"] ,
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
    "Norrköping",
    "Lund",
    "Umeå",
    "Gävle",
    "Borås",
  ],
  it:[
"Rome",
  "Milan",
  "Naples",
  "Turin",
  "Palermo",
  "Genoa",
  "Bologna",
  "Florence",
  "Bari",
  "Catania",
  "Verona",
  "Venice"
  ],
    pl: [
    "Warsaw",
  "Kraków",
  "Wrocław",
  "Gdańsk",
  "Poznań",
  "Łódź",
  "Lublin",
  "Katowice",
  "Szczecin",
  "Toruń"
  ],
  be: [
"Brussels",
  "Antwerp",
  "Ghent",
  "Charleroi",
  "Liège",
  "Bruges",
  "Namur",
  "Leuven",
  "Mons",
  "Aalst",
  "Mechelen",
  "Sint-Niklaas",
  "Kortrijk",
  "Ostend"
  ],
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
  es: [
"Madrid",
  "Barcelona",
  "Seville",
  "Granada",
  "Valencia",
  "San Sebastián",
  "Málaga",
  "Bilbao",
  "Toledo",
  "Salamanca"
  ],
  pt:[
    "Lisbon",
  "Porto",
  "Coimbra",
  "Braga",
  "Faro",
  "Aveiro",
  "Évora",
  "Sintra",
  "Cascais",
  "Guimarães"
  ],
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
  ie: [
    "Dublin",
    "Cork",
    "Limerick",
    "Galway",
    "Waterford",
    "Drogheda",
    "Dundalk",
    "Swords",
    "Bray",
    "Navan",
  ],
  mc: [
    "Monte Carlo",
    "Monaco-Ville",
    "La Condamine",
    "Fontvieille",
    "Larvotto",
    "Moneghetti",
  ],
  ch: [
    "Zurich",
    "Geneva",
    "Basel",
    "Bern",
    "Lausanne",
    "Lucerne",
    "St. Gallen",
    "Lugano",
    "Winterthur",
    "Zug",
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
  us: [
    "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "Jacksonville",
  "Fort Worth",
  "San Jose",
  "Austin",
  "Charlotte",
  "Columbus",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Denver",
  "Oklahoma City",
  "Nashville",
  "Washington, District of Columbia",
  "El Paso",
  "Boston"
  ],
  ca: [
    "Toronto",
  "Montreal",
  "Vancouver",
  "Calgary",
  "Edmonton",
  "Ottawa-Gatineau",
  "Quebec City",
  "Winnipeg",
  "Hamilton",
  "Kitchener-Cambridge-Waterloo",
  "London",
  "Halifax",
  "Victoria",
  "Oshawa",
  "Windsor",
  "Saskatoon",
  "Regina",
  "Sherbrooke",
  "St. John's",
  "Kelowna",
  "Barrie",
  "Abbotsford",
  "Kingston",
  "Moncton"
  ],
  au: [
    "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
  "Canberra",
  "Newcastle",
  "Sunshine Coast",
  "Hobart"
  ],
  nz: [
    "Auckland",
  "Christchurch",
  "Wellington",
  "Hamilton",
  "Tauranga",
  "Lower Hutt",
  "Dunedin",
  "Palmerston North",
  "Napier",
  "Porirua"
  ],
  qa: [
    "Doha",
  "Al Rayyan",
  "Al Wakrah",
  "Al Khor",
  "Umm Salal Muhammed",
  "Mesaieed",
  "Dukhan",
  "Madinat ash Shamal",
  "Lusail",
  "Al Daayen"
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
 * Home page copy per country, in that country's default (English) language.
 * France's French variant lives separately in FR_HOME_CONTENT_FR below — every
 * other country is English-only (see lib/countries/config.ts's
 * COUNTRY_LANGUAGES), so a full [country][language] matrix would be mostly
 * unreachable dead entries. fr/gb/lk carry the site's original hand-written
 * copy; the other 22 markets use generic-but-distinct placeholder copy (real
 * office/coverage detail pending) built from each country's name and top cities.
 */
/* export const COUNTRY_HOME_CONTENT: Record<CountryCode, CountryHomeCopy> = {
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
}; */
export const COUNTRY_HOME_CONTENT: Record<CountryCode, CountryHomeCopy> = {
  fr: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — France.",
    trustCoverage: "France / 24 Cities",
    coverageTitle: "Service Excellence Throughout France",
    coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
    footerTagline:
      "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout en France. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
    aboutBilingualLabel: "Bilingual French & English Teams",
    aboutBilingualDesc: "Seamless communication for a diverse clientele.",
  },
  de: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Germany.",
    trustCoverage: "Germany / 10 Cities",
    coverageTitle: "Service Excellence Throughout Germany",
    coverageSubtitle: "Copenhagen, Aarhus, Odense, Aalborg, and more across Germany.",
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
    trustCoverage: "Finland / 14 Cities",
    coverageTitle: "Service Excellence Throughout Finland",
    coverageSubtitle: "Helsinki, Espoo, Tampere, Vantaa, and more across Finland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Finland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Finland.",
  },
  se: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Sweden.",
    trustCoverage: "Sweden / 14 Cities",
    coverageTitle: "Service Excellence Throughout Sweden",
    coverageSubtitle: "Stockholm, Gothenburg, Malmö, Uppsala, and more across Sweden.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sweden. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Sweden.",
  },
  it: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Italy.",
    trustCoverage: "Italy / 12 Cities",
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
    coverageSubtitle: "Warsaw, Kraków, Wrocław, Gdańsk, and more across Poland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Poland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Poland.",
  },
  be: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Belgium.",
    trustCoverage: "Belgium / 14 Cities",
    coverageTitle: "Service Excellence Throughout Belgium",
    coverageSubtitle: "Brussels, Antwerp, Ghent, Charleroi, and more across Belgium.",
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
    coverageSubtitle: "Madrid, Barcelona, Seville, Granada, and more across Spain.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Spain. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Spain.",
  },
  pt: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Portugal.",
    trustCoverage: "Portugal / 10 Cities",
    coverageTitle: "Service Excellence Throughout Portugal",
    coverageSubtitle: "Lisbon, Porto, Coimbra, Braga, and more across Portugal.",
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
  ie: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Ireland.",
    trustCoverage: "Ireland / 10 Cities",
    coverageTitle: "Service Excellence Throughout Ireland",
    coverageSubtitle: "Dublin, Cork, Limerick, Galway, and more across Ireland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Ireland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Ireland.",
  },
  mc: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Monaco.",
    trustCoverage: "Monaco / 6 Districts",
    coverageTitle: "Service Excellence Throughout Monaco",
    coverageSubtitle: "Monte Carlo, Monaco-Ville, La Condamine, Fontvieille, and more across Monaco.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Monaco. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "Bilingual French & English Teams",
    aboutBilingualDesc: "Seamless communication for a diverse clientele across Monaco.",
  },
  ch: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Switzerland.",
    trustCoverage: "Switzerland / 10 Cities",
    coverageTitle: "Service Excellence Throughout Switzerland",
    coverageSubtitle: "Zurich, Geneva, Basel, Bern, and more across Switzerland.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Switzerland. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across Switzerland.",
  },
  gb: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — United Kingdom.",
    trustCoverage: "United Kingdom / 24 Cities",
    coverageTitle: "Service Excellence Throughout the United Kingdom",
    coverageSubtitle: "London, Birmingham, Glasgow, Leeds, and more across the UK.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
  },
  us: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — The United States.",
    trustCoverage: "The United States / 24 Cities",
    coverageTitle: "Service Excellence Throughout The United States",
    coverageSubtitle: "New York City, Los Angeles, Chicago, Houston, and more across the United States.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United States. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across the United States.",
  },
  ca: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Canada.",
    trustCoverage: "Canada / 24 Cities",
    coverageTitle: "Service Excellence Throughout Canada",
    coverageSubtitle: "Toronto, Montreal, Vancouver, Calgary, and more across Canada.",
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
    coverageSubtitle: "Auckland, Christchurch, Wellington, Hamilton, and more across New Zealand.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across New Zealand. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "English-Speaking Concierge Teams",
    aboutBilingualDesc: "Clear, professional communication for every client across New Zealand.",
  },
  qa: {
    heroSubtitle: "Pearly Sky Eco-Luxury Home & Office Cleaning Services — Qatar.",
    trustCoverage: "Qatar / 10 Cities",
    coverageTitle: "Service Excellence Throughout Qatar",
    coverageSubtitle: "Doha, Al Rayyan, Al Wakrah, Al Khor, and more across Qatar.",
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
    coverageSubtitle: "Colombo, Kandy, Galle, Negombo, and more across Sri Lanka.",
    footerTagline:
      "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
    aboutBilingualLabel: "Multilingual Local Teams",
    aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
  },
};
/** France's home page copy in French — the one country/language combo besides each country's English default. */
const FR_HOME_CONTENT_FR: CountryHomeCopy = {
  heroSubtitle: "Services de Nettoyage Éco-Luxe Pearly Sky pour Maisons et Bureaux — France.",
  trustCoverage: "France / 24 Villes",
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
