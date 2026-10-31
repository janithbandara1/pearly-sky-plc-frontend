// ==========================================
// TypeScript Interfaces & Types
// ==========================================
export type CountryCode = 'fr' | 'uk' | 'lk';

export interface RegionOption {
  id: string;
  name: string;
}

export interface ServiceTypeOption {
  id: string;
  name: string;
}

export interface HubLocation {
  title: string;
  category: string;
  address: string;
  phone: string;
  regionKey?: string;
  description?: string;
  specializations?: string[];
  image?: string;
}

export interface CountryProfile {
  code: CountryCode;
  flag: string;
  name: string;
  currency: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  citiesServed: string;
  marqueeCities: string[];
  regions: RegionOption[];
  serviceTypes: ServiceTypeOption[];
  hubs: HubLocation[];
}

export type CountryDataProfilesRecord = Record<CountryCode, CountryProfile>;

// ==========================================
// Country Data Profiles Record
// ==========================================
export const countryDataProfiles: CountryDataProfilesRecord = {
  fr: {
    code: 'fr',
    flag: '🇫🇷',
    name: "ContactName",
    currency: 'EUR (€)',
    phone: '+33 7 43 70 87 80',
    email: 'france@pearlyskyglobalclean.com',
    address: 'ContactAddress',
    heroTitle: "ContactHeroTitle",
    heroHighlight: "France",
    heroDescription: "ContactHeroDescription",

    citiesServed: '23+',
    marqueeCities: ['Paris', 'Nice', 'Saint-Tropez', 'Antibes', 'Cannes', 'Monaco', 'Normandy', 'Deauville', 'Bordeaux', 'Courchevel', 'Megève', 'Biarritz'],
    regions: [
      { id: 'paris', name: "ContactRegionParisName" },
      { id: 'riviera', name: "ContactRegionRivieraName" },
      { id: 'cannes', name: "ContactRegionCannesName" },
      { id: 'monaco', name: "ContactRegionMonacoName" },
      { id: 'courchevel', name: "ContactRegionCourchevelName" },
      { id: 'bordeaux', name: "ContactRegionBordeauxName" },
    ],
    serviceTypes: [
      { id: 'haussmann', name: "ContactServiceHaussmannName" },
      { id: 'yacht', name: "ContactServiceYachtName" },
      { id: 'chalet', name: "ContactServiceChaletName" },
      { id: 'estate', name: "ContactServiceEstateName" },
    ],
    hubs: [
      {
        title: "ContactHub1Title",
        category: "ContactHub1Category",
        address: 'ContactHub1Address',
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub1RegionKey",
        description: "ContactHub1Description",
        specializations: ["ContactHub1Spec1", "ContactHub1Spec2"],
        image: '/images/hero/tikcer-images/img1.webp',
      },
      {
        title: "ContactHub2Title",
        category: "ContactHub2Category",
        address: "ContactHub2Address",
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub2RegionKey",
        description: "ContactHub2Description",
        specializations: ["ContactHub2Spec1", "ContactHub2Spec2"],
        image: '/images/hero/tikcer-images/img2.webp',
      },
      {
        title: "ContactHub3Title",
        category: "ContactHub3Category",
        address: "ContactHub3Address",
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub3RegionKey",
        description: "ContactHub3Description",
        specializations: ["ContactHub3Spec1", "ContactHub3Spec2"],
        image: '/images/hero/tikcer-images/img3.webp',
      },
      {
        title: "ContactHub4Title",
        category: "ContactHub4Category",
        address: "ContactHub4Address",
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub4RegionKey",
        description: "ContactHub4Description",
        specializations: ["ContactHub4Spec1", "ContactHub4Spec2"],
        image: '/images/hero/tikcer-images/img4.webp',
      },
      {
        title: "ContactHub5Title",
        category: "ContactHub5Category",
        address: "ContactHub5Address",
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub5RegionKey",
        description: "ContactHub5Description",
        specializations: ["ContactHub5Spec1", "ContactHub5Spec2"],
        image: '/images/hero/tikcer-images/img5.webp',
      },
      {
        title: "ContactHub6Title",
        category: "ContactHub6Category",
        address: "ContactHub6Address",
        phone: '+33 7 43 70 87 80',
        regionKey: "ContactHub6RegionKey",
        description: "ContactHub6Description",
        specializations: ["ContactHub6Spec1", "ContactHub6Spec2"],
        image: '/images/hero/tikcer-images/img6.webp',
      },
    ],
  },
  uk: {
    code: 'uk',
    flag: '🇬🇧',
    name: 'United Kingdom',
    currency: 'GBP (£)',
    phone: '+44 20 7946 0912',
    email: 'uk@pearlyskyglobalclean.com',
    address: 'Berkeley Square, Mayfair, London W1J 6BD',
    heroTitle: 'Contact Us & Regional Hubs in the',
    heroHighlight: 'United Kingdom',
    heroDescription: 'Premier Eco-Luxury Cleaning & Estate Management across Mayfair, Knightsbridge, Surrey Country Estates, and Scottish Highlands. Uncompromising discretion and botanical green formulations.',
    citiesServed: '18+',
    marqueeCities: ['London', 'Mayfair', 'Knightsbridge', 'Kensington', 'Cotswolds', 'Edinburgh', 'Manchester', 'Surrey', 'Ascot', 'Cambridge', 'Oxford', 'Cheshire'],
    regions: [
      { id: 'london-central', name: 'Central London (Mayfair & Belgravia)' },
      { id: 'surrey-estate', name: 'Surrey & Berkshire Country Estates' },
      { id: 'cotswolds', name: 'The Cotswolds Luxury Retreats' },
      { id: 'edinburgh', name: 'Edinburgh & Scottish Highlands' },
    ],
    serviceTypes: [
      { id: 'townhouse', name: 'Georgian & Victorian Townhouse Care' },
      { id: 'country-estate', name: 'English Country Estate Maintenance' },
      { id: 'penthouse', name: 'Luxury Penthouse White-Glove Clean' },
    ],
    hubs: [
      {
        title: 'Mayfair & Belgravia Flagship',
        category: 'Central London',
        address: 'Berkeley Square, London W1J 6BD',
        phone: '+44 20 7946 0912',
        regionKey: 'london-central',
        description: 'White-glove housekeeping and discreet care for historic Georgian townhouses and modern luxury penthouses in Central London.',
        specializations: ['Period Architecture', 'Art & Antique Care'],
        image: '/images/hero/tikcer-images/uk-img-1.webp',
      },
      { 
        title: 'Surrey & Ascot Estates',
        category: 'Home Counties',
        address: 'High Street, Weybridge, Surrey',
        phone: '+44 1932 550123',
        regionKey: 'surrey-estate',
        description: 'Comprehensive estate sanitization, pool house maintenance, and ecological upkeep for secluded country properties.',
        specializations: ['Country Estates', 'Pool & Spa Care'],
        image: '/images/hero/tikcer-images/uk-img-2.webp',
      },
    ],
  },
  lk: {
    code: 'lk',
    flag: '🇱🇰',
    name: 'Sri Lanka',
    currency: 'LKR (Rs.)',
    phone: '+94 11 234 5678',
    email: 'srilanka@pearlyskyglobalclean.com',
    address: 'Cinnamon Gardens, Colombo 00700, Sri Lanka',
    heroTitle: 'Contact Us & Regional Hubs in',
    heroHighlight: 'Sri Lanka',
    heroDescription: 'Bespoke Eco-Luxury Cleaning & Villa Management across Colombo CBD, Galle Fort, Kandy Hill Country, and Coastal Resorts. Immaculate tropical maintenance with non-toxic care.',
    citiesServed: '12+',
    marqueeCities: ['Colombo', 'Kandy', 'Galle Fort', 'Bentota', 'Nuwara Eliya', 'Negombo', 'Mirissa', 'Sigiriya', 'Trincomalee', 'Mount Lavinia'],
    regions: [
      { id: 'colombo-7', name: 'Colombo 07 (Cinnamon Gardens & CBD)' },
      { id: 'galle-fort', name: 'Galle Fort & Southern Coastal Villas' },
      { id: 'kandy-hills', name: 'Kandy & Central Hill Country Estates' },
    ],
    serviceTypes: [
      { id: 'villa', name: 'Luxury Beach Villa & Pool Sanitization' },
      { id: 'colonial', name: 'Colonial Bungalow & Timber Care' },
      { id: 'commercial-pos', name: 'Boutique & Retail POS Showroom Clean' },
    ],
    hubs: [
      {
        title: 'Colombo CBD & Cinnamon Gardens',
        category: 'Western Province',
        address: 'Cinnamon Gardens, Colombo 00700',
        phone: '+94 11 234 5678',
        regionKey: 'colombo-7',
        description: 'Specialized corporate headquarters care, luxury apartments, and boutique retail point-of-sale showroom sanitization.',
        specializations: ['Corporate Towers', 'Boutique Showrooms'],
        image: '/images/hero/tikcer-images/lk-img-1.webp',
      },
      {
        title: 'Galle Fort Coastal Sanctuary',
        category: 'Southern Province',
        address: 'Church Street, Galle Fort, Galle',
        phone: '+94 91 223 4455',
        regionKey: 'galle-fort',
        description: 'Heritage Dutch-colonial building preservation, antique wood maintenance, and luxury beachfront villa turnover.',
        specializations: ['Heritage Preservation', 'Beachfront Villas'],
        image: '/images/hero/tikcer-images/lk-img-1.webp',
      },
    ],
  },
};