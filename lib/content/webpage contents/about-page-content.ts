import { TranslationKey } from "@/lib/i18n/dictionaries/en";

/* const VISION_MISSION: { Icon: typeof Compass; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Compass, titleKey: "aboutPageVisionTitle", textKey: "aboutVisionText" },
  { Icon: Sparkles, titleKey: "aboutPageMissionTitle", textKey: "aboutMissionText" },
];

const CORE_VALUES: { titleKey: TranslationKey; textKey: TranslationKey }[] = [
  {
    titleKey: "aboutValue1",
    textKey: "aboutValue1Text",
  },
  {
    titleKey: "aboutValue2",
    textKey: "aboutValue2Text",
  },
  {
    titleKey: "aboutValue3",
    textKey: "aboutValue3Text",
  },
  {
    titleKey: "aboutValue4",
    textKey: "aboutValue4Text",
  },
  {
    titleKey: "aboutValue5",
    textKey: "aboutValue5Text",
  },
];
const OBJECTIVES: TranslationKey[] = [
  "aboutObjective1",
  "aboutObjective2",
  "aboutObjective3",
  "aboutObjective4",
  "aboutObjective5",
];
 */
interface AboutPageContent {
  heroTagline: string | TranslationKey;
  heroTitlePart1: string | TranslationKey;
  heroTitleHighlight: string | TranslationKey;
  heroDescription: string | TranslationKey;
  stat1Value: string | TranslationKey;
   stat1Label: string | TranslationKey;
  stat2Value: string | TranslationKey;
   stat2Label: string | TranslationKey;
  stat3Value: string | TranslationKey;
   stat3Label: string | TranslationKey;
  stat4Value: string | TranslationKey;
   stat4Label: string | TranslationKey;
  storyTagline: string | TranslationKey;
  storyTitle: string | TranslationKey;
  storyP1: string | TranslationKey;
  storyP2: string | TranslationKey;
  promiseTitle: string | TranslationKey;
  promiseDesc: string | TranslationKey;
  storyImageBadgeTitle: string | TranslationKey;
  storyImageBadgeSub: string | TranslationKey;
  pillarsTagline: string | TranslationKey;
  pillarsTitle: string | TranslationKey;
  pillarsSubtitle: string | TranslationKey;
  pillar1Title: string | TranslationKey; pillar1Desc: string | TranslationKey; pillar1Tag: string | TranslationKey;
  pillar2Title: string | TranslationKey; pillar2Desc: string | TranslationKey; pillar2Tag: string | TranslationKey;
  pillar3Title: string | TranslationKey; pillar3Desc: string | TranslationKey; pillar3Tag: string | TranslationKey;
  pillar4Title: string | TranslationKey; pillar4Desc: string | TranslationKey; pillar4Tag: string | TranslationKey;
  locationsHeader: string | TranslationKey; 
  locationsCount: string | TranslationKey;
  cities: TranslationKey | string[];
  teamTagline: TranslationKey | string;
  teamTitle: TranslationKey | string;
  teamSubtitle: TranslationKey | string;
  teamMembers: Array<{ name: string; role: string; desc: string; img: string }>;
  sustainabilityTagline: string | TranslationKey;
  sustainabilityTitle: string | TranslationKey;
  sustainabilityDesc: string | TranslationKey;
  sustainabilityBulletsList: string[] | TranslationKey;
  ctaTagline: string | TranslationKey;
  ctaTitle: string | TranslationKey;
  ctaDesc: string | TranslationKey;
  ctaBtnText: string | TranslationKey;
}

export const aboutData: Record<'fr' | 'uk' | 'lk', AboutPageContent> = {
  fr: {
    heroTagline: "heroTagline",
    heroTitlePart1: "heroTitlePart1", 
    heroTitleHighlight: "heroTitleHighlight",
    heroDescription: "heroDescription",
    stat1Value: "stat1Value", 
    stat1Label: "stat1Label",
    stat2Value: "stat2Value", 
    stat2Label: "stat2Label",
    stat3Value: "stat3Value", 
    stat3Label: "stat3Label",
    stat4Value: "stat4Value", 
    stat4Label: "stat4Label",
    storyTagline: "storyTagline",
    storyTitle: "storyTitle",
    storyP1: "storyP1",
    storyP2: "storyP2",
    promiseTitle: "promiseTitle",
    promiseDesc: "promiseDesc",
    storyImageBadgeTitle: "storyImageBadgeTitle",
    storyImageBadgeSub: "storyImageBadgeSub",
    pillarsTagline: "pillarsTagline",
    pillarsTitle: "pillarsTitle",
    pillarsSubtitle: "pillarsSubtitle",
    pillar1Title: "pillar1Title",
    pillar1Desc: "pillar1Desc",
    pillar1Tag: "pillar1Tag",
    pillar2Title: "pillar2Title",
    pillar2Desc: "pillar2Desc",
    pillar2Tag: "pillar2Tag",
    pillar3Title: "pillar3Title",
    pillar3Desc: "pillar3Desc",
    pillar3Tag: "pillar3Tag",
    pillar4Title: "pillar4Title",
    pillar4Desc: "pillar4Desc",
    pillar4Tag: "pillar4Tag",
    locationsHeader: "locationsHeader",
    locationsCount: "locationsCount",
    cities: [
      "Paris", "Nice", "Saint-Tropez", "Antibes", "Cannes", "Monaco", 
      "Normandy", "Deauville", "Dieppe", "La Rochelle", "Nantes", "Bordeaux", 
      "Toulouse", "Toulon", "Montpellier", "Strasbourg", "Arcachon", "Annecy", 
      "Biarritz", "Courchevel", "Megève", "Aix-en-Provence", "Mougins"
    ],
    teamTagline: "teamTagline",
    teamTitle: "teamTitle",
    teamSubtitle: "teamSubtitle",
    teamMembers: [
      { name: "Élodie de St. Germain", role: "teamMember1Role", desc: "teamMember1Desc", img: "/images/about/team-member1.webp" },
      { name: "Jean-Luc Laurent", role: "teamMember2Role", desc: "teamMember2Desc", img: "/images/about/team-member2.webp" },
      { name: "Dr. Claire Moreau", role: "teamMember3Role", desc: "teamMember3Desc", img: "/images/about/team-member3.webp" },
      { name: "Marc-Antoine Vaneau", role: "teamMember4Role", desc: "teamMember4Desc", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "sustainabilityTagline",
    sustainabilityTitle: "sustainabilityTitle",
    sustainabilityDesc: "sustainabilityDesc",
    sustainabilityBulletsList: "sustainabilityBullets",
    ctaTagline: "ctaTagline",
    ctaTitle: "ctaTitle",
    ctaDesc: "ctaDesc",
    ctaBtnText: "ctaBtnText"
  },
  uk: {
    heroTagline: "A Legacy of Distinction in the United Kingdom",
    heroTitlePart1: "Pure Spaces.",
    heroTitleHighlight: "Elevated Living Across London & UK.",
    heroDescription: "Pearly Sky is the UK's premier eco-luxury cleaning partner. We serve distinguished residences, private estates, penthouses, corporate headquarters, and high-end hospitality venues from London to Edinburgh.",
    stat1Value: "100%", stat1Label: "Eco-Certified",
    stat2Value: "24/7", stat2Label: "VIP Concierge",
    stat3Value: "100%", stat3Label: "DBS Vetted",
    stat4Value: "15+", stat4Label: "UK Cities",
    storyTagline: "Our Story & Heritage",
    storyTitle: "Redefining Luxury Cleaning for Discerning Clients in the UK",
    storyP1: "Founded on the belief that immaculate cleanliness should never cost the health of your sanctuary or our planet, Pearly Sky bridges five-star hotel hospitality standards with cutting-edge, non-toxic eco-biotechnology.",
    storyP2: "From historic townhouses in Mayfair and private country estates in the Cotswolds to luxury penthouses in Canary Wharf, our discreet specialists ensure your environments radiate purity, peace, and health.",
    promiseTitle: "Non-Toxic Luxury Promise",
    promiseDesc: "Every formula used by Pearly Sky is 100% biodegradable, pet-safe, child-safe, and harmless to delicate marble, hardwood, and fine textiles.",
    storyImageBadgeTitle: "Discretion & Precision",
    storyImageBadgeSub: "Serving British VIPs, embassies, and private estates",
    pillarsTagline: "Guiding Standards",
    pillarsTitle: "The Four Pillars of Pearly Sky",
    pillarsSubtitle: "Engineered to exceed expectations for the most discerning residential and corporate clients across the UK.",
    pillar1Title: "Eco-Conscious Excellence",
    pillar1Desc: "Green Compass Eco-Certified non-toxic products that eliminate 99.9% of pathogens without volatile organic compounds or chemical residue.",
    pillar1Tag: "100% Biodegradable",
    pillar2Title: "Security & Discretion",
    pillar2Desc: "Rigorously vetted, background-checked, and security-cleared personnel bound by non-disclosure agreements for complete peace of mind.",
    pillar2Tag: "Vetted Personnel",
    pillar3Title: "Tailored VIP Protocols",
    pillar3Desc: "Custom cleaning checklists engineered specifically for high-value artwork, silk carpets, rare stone, and bespoke luxury interiors.",
    pillar3Tag: "Bespoke Standards",
    pillar4Title: "English Proficiency",
    pillar4Desc: "Seamless communication across all client interactions, operations managers, and elite on-site cleaning specialists.",
    pillar4Tag: "Professional English",
    locationsHeader: "Service Coverage Across London & UK",
    locationsCount: "15 Key Destinations",
    cities: [
      "London", "Mayfair", "Kensington", "Chelsea", "Knightsbridge", "City of London",
      "Canary Wharf", "Cotswolds", "Oxford", "Cambridge", "Edinburgh", "Manchester",
      "Bristol", "Surrey", "Ascot", "Windsor", "Brighton", "Bath"
    ],
    teamTagline: "Our Experts",
    teamTitle: "Leadership Behind the Brilliance",
    teamSubtitle: "Seasoned hospitality and eco-cleaning leaders directing operations throughout the UK.",
    teamMembers: [
      { name: "Victoria Sterling", role: "Head of Luxury Operations — London", desc: "Former Mayfair hotel director overseeing residential cleaning protocols across Greater London.", img: "/images/about/team-member1.webp" },
      { name: "Alistair Vance", role: "Country Estates Director", desc: "Private estate management specialist leading luxury care across the Cotswolds and home counties.", img: "/images/about/team-member2.webp" },
      { name: "Dr. Evelyn Reed", role: "Head of Eco-Sanitization", desc: "Environmental scientist formulating our proprietary non-toxic and hypoallergenic cleaning protocols.", img: "/images/about/team-member3.webp" },
      { name: "Julian Thorne", role: "Head of Concierge Relations", desc: "Dedicated liaison for luxury property managers, family offices, and elite estate managers.", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "Green Compass Standard",
    sustainabilityTitle: "Our Environmental Commitments",
    sustainabilityDesc: "Pearly Sky strictly adheres to UK eco-label guidelines and Green Compass standards, safeguarding both internal living air quality and natural British environments.",
    sustainabilityBulletsList: [
      "Zero Harsh Solvents, Ammonia, or Synthetic Chlorine Fragrances",
      "100% Recyclable Packaging & Closed-Loop Refill Systems",
      "Safe for Wildlife & Eco-Friendly Botanical Formulas",
      "HEPA 14 Micro-Filtration Vacuuming for Allergen-Free Air Quality"
    ],
    ctaTagline: "Bespoke Cleaning Protocols",
    ctaTitle: "Experience Eco-Luxury Living in the UK Today",
    ctaDesc: "Contact our London operations team to discuss customized care for your residence, estate, penthouse, or corporate workspace.",
    ctaBtnText: "Request a Personalized Quote"
  },
  lk: {
    heroTagline: "A Legacy of Distinction in Sri Lanka",
    heroTitlePart1: "Pure Spaces.",
    heroTitleHighlight: "Elevated Living Across Colombo & Sri Lanka.",
    heroDescription: "Pearly Sky is Sri Lanka's premier eco-luxury cleaning partner. We serve distinguished residences, luxury villas, corporate headquarters, and high-end hospitality venues from Colombo to Galle.",
    stat1Value: "100%", stat1Label: "Eco-Certified",
    stat2Value: "24/7", stat2Label: "VIP Concierge",
    stat3Value: "100%", stat3Label: "Trained & Vetted",
    stat4Value: "10+", stat4Label: "Sri Lankan Cities",
    storyTagline: "Our Story & Heritage",
    storyTitle: "Redefining Luxury Cleaning for Discerning Clients in Sri Lanka",
    storyP1: "Founded on the belief that immaculate cleanliness should never cost the health of your sanctuary or our tropical environment, Pearly Sky bridges five-star hotel hospitality standards with cutting-edge, non-toxic eco-biotechnology.",
    storyP2: "From luxury coastal villas in Galle and modern apartments in Colombo to private highland estates in Nuwara Eliya, our discreet specialists ensure your environments radiate purity, peace, and health.",
    promiseTitle: "Non-Toxic Luxury Promise",
    promiseDesc: "Every formula used by Pearly Sky is 100% biodegradable, pet-safe, child-safe, and harmless to delicate marble, hardwood, and fine tropical finishes.",
    storyImageBadgeTitle: "Discretion & Precision",
    storyImageBadgeSub: "Serving distinguished clients and luxury villas across Sri Lanka",
    pillarsTagline: "Guiding Standards",
    pillarsTitle: "The Four Pillars of Pearly Sky",
    pillarsSubtitle: "Engineered to exceed expectations for the most discerning residential and corporate clients across Sri Lanka.",
    pillar1Title: "Eco-Conscious Excellence",
    pillar1Desc: "Green Compass Eco-Certified non-toxic products that eliminate 99.9% of pathogens without volatile organic compounds or chemical residue.",
    pillar1Tag: "100% Biodegradable",
    pillar2Title: "Security & Discretion",
    pillar2Desc: "Rigorously vetted, background-checked, and security-cleared personnel bound by non-disclosure agreements for complete peace of mind.",
    pillar2Tag: "Vetted Personnel",
    pillar3Title: "Tailored VIP Protocols",
    pillar3Desc: "Custom cleaning checklists engineered specifically for high-value artwork, teak timber, rare stone, and luxury tropical villa interiors.",
    pillar3Tag: "Bespoke Standards",
    pillar4Title: "Multilingual Fluency",
    pillar4Desc: "Seamless communication in English, Sinhala, and Tamil across all client interactions and on-site specialists.",
    pillar4Tag: "English, Sinhala & Tamil",
    locationsHeader: "Service Coverage Across Sri Lanka",
    locationsCount: "10 Key Destinations",
    cities: [
      "Colombo", "Mount Lavinia", "Dehiwala", "Battaramulla", "Rajagiriya", 
      "Kotte", "Negombo", "Galle Fort", "Bentota", "Kandy", "Nuwara Eliya", "Trincomalee"
    ],
    teamTagline: "Our Experts",
    teamTitle: "Leadership Behind the Brilliance",
    teamSubtitle: "Seasoned hospitality and eco-cleaning leaders directing operations throughout Sri Lanka.",
    teamMembers: [
      { name: "Chathura Perera", role: "Head of Operations — Colombo", desc: "Former 5-star resort operations director overseeing luxury residential cleaning across the Western Province.", img: "/images/about/team-member1.webp" },
      { name: "Dilshan Mendis", role: "Coastal & Villa Director", desc: "Hospitality sanitation specialist leading luxury villa and coastal estate care in Galle and Bentota.", img: "/images/about/team-member2.webp" },
      { name: "Dr. Anoma Wickramasinghe", role: "Head of Eco-Sanitization", desc: "Environmental scientist formulating our proprietary non-toxic and hypoallergenic cleaning protocols.", img: "/images/about/team-member3.webp" },
      { name: "Kasun Jayasuriya", role: "Head of Client Relations", desc: "Dedicated liaison for luxury property managers, private family offices, and upscale residential complexes.", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "Green Compass Standard",
    sustainabilityTitle: "Our Environmental Commitments",
    sustainabilityDesc: "Pearly Sky strictly adheres to eco-label guidelines and Green Compass standards, safeguarding both internal living air quality and tropical ecosystems across Sri Lanka.",
    sustainabilityBulletsList: [
      "Zero Harsh Solvents, Ammonia, or Synthetic Chlorine Fragrances",
      "100% Recyclable Packaging & Closed-Loop Refill Systems",
      "Safe for Tropical Gardens & Eco-Sensitive Environments",
      "HEPA 14 Micro-Filtration Vacuuming for Allergen-Free Air Quality"
    ],
    ctaTagline: "Bespoke Cleaning Protocols",
    ctaTitle: "Experience Eco-Luxury Living in Sri Lanka Today",
    ctaDesc: "Contact our Colombo operations team to discuss customized care for your residence, luxury villa, or corporate workspace.",
    ctaBtnText: "Request a Personalized Quote"
  }
};