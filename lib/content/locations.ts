import type { CountryCode } from "@/lib/countries/config";

export interface Location {
  id: string;
  name: string;
  region: "europe" | "asia-pacific" | "americas";
  /** Missing (not fabricated) for markets with no flag asset yet — LocationCard falls back to a generic icon. */
  flag?: string;
  serviceCities: string[];
  hasOfficeDetail: boolean;
  address?: string;
  contactNo?: string;
  companyNumber?: string;
  mapSrc?: string;
  /** Matches lib/countries/config.ts's CountryCode, set for every routable country. */
  country?: CountryCode;
}

export const locations: Location[] = [
  {
    id: "france",
    name: "France",
    region: "europe",
    flag: "/images/flags/france.webp",
    serviceCities: ["Paris", "Nice", "Cannes", "Monaco", "Lyon", "Bordeaux"],
    hasOfficeDetail: true,
    address: "15 Rue Des Halles, 75001 Paris.",
    contactNo: "+33 743 708 780",
    companyNumber: "930 651 625",
    country: "fr",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.8965731406633!2d2.3461149!3d48.860182599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f6025fd8697%3A0xe4968cc599a43374!2sPearly%20Sky%20Cleaning%20Service%20Private%20Ltd!5e0!3m2!1sen!2slk!4v1740018065562!5m2!1sen!2slk",
  },
  {
    id: "uk",
    name: "United Kingdom",
    region: "europe",
    flag: "/images/flags/uk.webp",
    serviceCities: ["London", "Manchester", "Edinburgh"],
    hasOfficeDetail: true,
    address: "60 Tottenham Court Road, Office 775, Fitzrovia, London, W1T 2EW, United Kingdom",
    contactNo: "+44 7349 369400",
    companyNumber: "15307255",
    country: "gb",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2680519800388!2d-0.14136389999999996!3d51.5082981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605f3a642a9c1%3A0x7b739a1a3f9ba4!2sPEARLY%20SKY%20CLEANING%20AND%20FACILITY%20MAINTENANCE%20COMPANY%20PRIVATE%20LTD!5e0!3m2!1sen!2slk!4v1743953187220!5m2!1sen!2slk",
  },
  {
    id: "srilanka",
    name: "Sri Lanka",
    region: "asia-pacific",
    flag: "/images/flags/srilanka.webp",
    serviceCities: ["Colombo", "Kandy"],
    hasOfficeDetail: true,
    address: "No - 188/2 Kandy Road, Pahala Imbulgoda, Imbulgoda, Sri Lanka",
    contactNo: "+94 332 218 900",
    companyNumber: "PV 00295748",
    country: "lk",
    mapSrc: 
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.780671969282!2d79.99062740000001!3d7.035044999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9b10fb26561%3A0x111cf200d8a4fc9a!2sPEARLY%20SKY%20COMPANY%20PRIVATE%20LTD!5e0!3m2!1sen!2slk!4v1753536876865!5m2!1sen!2slk",
  },
  { id: "germany", name: "Germany", region: "europe", flag: "/images/flags/germany.webp", serviceCities: ["Berlin", "Munich"], hasOfficeDetail: false, country: "de" },
  { id: "belgium", name: "Belgium", region: "europe", flag: "/images/flags/belgium.webp", serviceCities: ["Brussels"], hasOfficeDetail: false, country: "be" },
  { id: "finland", name: "Finland", region: "europe", flag: "/images/flags/finland.webp", serviceCities: ["Helsinki"], hasOfficeDetail: false, country: "fi" },
  { id: "monaco", name: "Monaco", region: "europe", flag: "/images/flags/monaco.webp", serviceCities: ["Monte Carlo"], hasOfficeDetail: false },
  { id: "italy", name: "Italy", region: "europe", flag: "/images/flags/italy.webp", serviceCities: ["Rome", "Milan"], hasOfficeDetail: false, country: "it" },
  { id: "spain", name: "Spain", region: "europe", flag: "/images/flags/spain.webp", serviceCities: ["Madrid", "Barcelona"], hasOfficeDetail: false, country: "es" },
  { id: "austria", name: "Austria", region: "europe", flag: "/images/flags/austria.webp", serviceCities: ["Vienna"], hasOfficeDetail: false, country: "at" },
  { id: "switzerland", name: "Switzerland", region: "europe", flag: "/images/flags/switzerland.webp", serviceCities: ["Zurich", "Geneva"], hasOfficeDetail: false },
  { id: "denmark", name: "Denmark", region: "europe", flag: "/images/flags/denmark.webp", serviceCities: ["Copenhagen"], hasOfficeDetail: false, country: "dk" },
  { id: "poland", name: "Poland", region: "europe", flag: "/images/flags/poland.webp", serviceCities: ["Warsaw"], hasOfficeDetail: false, country: "pl" },
  { id: "portugal", name: "Portugal", region: "europe", flag: "/images/flags/portugal.webp", serviceCities: ["Lisbon"], hasOfficeDetail: false, country: "pt" },
  { id: "ireland", name: "Ireland", region: "europe", flag: "/images/flags/ireland.webp", serviceCities: ["Dublin"], hasOfficeDetail: false },
  { id: "netherlands", name: "Netherlands", region: "europe", flag: "/images/flags/netherlands.webp", serviceCities: ["Amsterdam"], hasOfficeDetail: false, country: "nl" },
  { id: "luxembourg", name: "Luxembourg", region: "europe", flag: "/images/flags/luxembourg.webp", serviceCities: ["Luxembourg City"], hasOfficeDetail: false, country: "lu" },
  { id: "scotland", name: "Scotland", region: "europe", flag: "/images/flags/scotland.webp", serviceCities: ["Edinburgh", "Glasgow"], hasOfficeDetail: false },
  { id: "sweden", name: "Sweden", region: "europe", flag: "/images/flags/sweden.png", serviceCities: ["Stockholm", "Gothenburg"], hasOfficeDetail: false, country: "se" },
  { id: "romania", name: "Romania", region: "europe", flag: "/images/flags/romania.png", serviceCities: ["Bucharest", "Cluj-Napoca"], hasOfficeDetail: false, country: "ro" },
  { id: "uae", name: "United Arab Emirates", region: "asia-pacific", flag: "/images/flags/uae.webp", serviceCities: ["Dubai", "Abu Dhabi"], hasOfficeDetail: false, country: "ae" },
  { id: "qatar", name: "Qatar", region: "asia-pacific", flag: "/images/flags/qatar.webp", serviceCities: ["Doha"], hasOfficeDetail: false, country: "qa" },
  { id: "saudiarabia", name: "Saudi Arabia", region: "asia-pacific", flag: "/images/flags/soudi.png", serviceCities: ["Riyadh", "Jeddah"], hasOfficeDetail: false, country: "sa" },
  { id: "oman", name: "Oman", region: "asia-pacific",flag: "/images/flags/oman.png", serviceCities: ["Muscat", "Salalah"], hasOfficeDetail: false, country: "om" },
  { id: "bahrain", name: "Bahrain", region: "asia-pacific",flag: "/images/flags/bahrain.png", serviceCities: ["Manama", "Riffa"], hasOfficeDetail: false, country: "bh" },
  { id: "australia", name: "Australia", region: "asia-pacific", flag: "/images/flags/australia.webp", serviceCities: ["Sydney", "Melbourne"], hasOfficeDetail: false, country: "au" },
  { id: "newzealand", name: "New Zealand", region: "asia-pacific", flag: "/images/flags/newzealand.webp", serviceCities: ["Auckland"], hasOfficeDetail: false, country: "nz" },
  { id: "us", name: "United States", region: "americas", flag: "/images/flags/us.webp", serviceCities: ["New York", "Los Angeles"], hasOfficeDetail: false, country: "us" },
  { id: "canada", name: "Canada", region: "americas", flag: "/images/flags/canada.webp", serviceCities: ["Toronto", "Vancouver"], hasOfficeDetail: false, country: "ca" },
];

export const officeLocations = locations.filter((l) => l.hasOfficeDetail);
