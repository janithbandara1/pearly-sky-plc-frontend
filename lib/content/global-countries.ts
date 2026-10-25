/**
 * Every country in Pearly Sky's network, grouped by region — live sites link
 * to their own domain, the rest show as coming soon. Shared by the global
 * gateway's region picker (components/ui/country-wise-domains.tsx) and its
 * home page network carousel (components/global-home/global-network.tsx).
 */
export interface Country {
  id: string;
  name: string;
  domain: string;
  flagCode: string;
  isLive: boolean;
}

export interface Region {
  region: string;
  gridCols: string;
  containerWidth?: string;
  countries: Country[];
}

export const REGIONAL_DATA: Region[] = [
  {
    region: "Europe Union",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    containerWidth: "lg:w-2/3",
    countries: [
      { id: "gb", isLive: true, name: "United Kingdom", domain: "pearlyskyglobalclean.co.uk", flagCode: "gb" },
      { id: "fr", isLive: true, name: "France", domain: "pearlyskyglobalclean.fr", flagCode: "fr" },
      { id: "de", isLive: false, name: "Germany", domain: "coming soon...", flagCode: "de" },
      { id: "it", isLive: false, name: "Italy", domain: "coming soon...", flagCode: "it" },
      { id: "lu", isLive: false, name: "Luxembourg", domain: "coming soon...", flagCode: "lu" },
      { id: "be", isLive: false, name: "Belgium", domain: "coming soon...", flagCode: "be" },
      { id: "at", isLive: false, name: "Austria", domain: "coming soon...", flagCode: "at" },
      { id: "fi", isLive: false, name: "Finland", domain: "coming soon...", flagCode: "fi" },
      { id: "ie", isLive: false, name: "Ireland", domain: "coming soon...", flagCode: "ie" },
      { id: "no", isLive: false, name: "Norway", domain: "coming soon...", flagCode: "no" },
      { id: "ch", isLive: false, name: "Switzerland", domain: "coming soon...", flagCode: "ch" },
      { id: "nl", isLive: false, name: "Netherlands", domain: "coming soon...", flagCode: "nl" },
      { id: "mc", isLive: false, name: "Monaco", domain: "coming soon...", flagCode: "mc" },
      { id: "dk", isLive: false, name: "Denmark", domain: "coming soon...", flagCode: "dk" },
      { id: "is", isLive: false, name: "Iceland", domain: "coming soon...", flagCode: "is" },
      { id: "li", isLive: false, name: "Liechtenstein", domain: "coming soon...", flagCode: "li" },
      { id: "mt", isLive: false, name: "Malta", domain: "coming soon...", flagCode: "mt" },
      { id: "se", isLive: false, name: "Sweden", domain: "coming soon...", flagCode: "se" },
    ],
  },
  {
    region: "Australia & New Zealand",
    gridCols: "grid-cols-2 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "au", isLive: false, name: "Australia", domain: "coming soon...", flagCode: "au" },
      { id: "nz", isLive: false, name: "New Zealand", domain: "coming soon...", flagCode: "nz" },
    ],
  },
  {
    region: "North America",
    gridCols: "grid-cols-1 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "ca", isLive: false, name: "Canada", domain: "coming soon...", flagCode: "ca" },
      { id: "us", isLive: false, name: "United States of America", domain: "coming soon...", flagCode: "us" },
    ],
  },
  {
    region: "Middle East & Asia",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6",
    containerWidth: "lg:w-full",
    countries: [
      { id: "ae", isLive: false, name: "United Arab Emirates", domain: "coming soon...", flagCode: "ae" },
      { id: "qa", isLive: false, name: "Qatar", domain: "coming soon...", flagCode: "qa" },
      { id: "bh", isLive: false, name: "Bahrain", domain: "coming soon...", flagCode: "bh" },
      { id: "om", isLive: false, name: "Oman", domain: "coming soon...", flagCode: "om" },
      { id: "lk", isLive: true, name: "Sri Lanka", domain: "Pearlyskyglobalclean.lk", flagCode: "lk" },
    ],
  },
];

export const TOTAL_COUNTRIES = REGIONAL_DATA.reduce((sum, group) => sum + group.countries.length, 0);
