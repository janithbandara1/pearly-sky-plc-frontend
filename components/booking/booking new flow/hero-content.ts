export interface ServiceHeroContent {
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
}

export const SERVICE_CONTENT_MAP: Record<string, ServiceHeroContent> = {
  "regular-home-cleaning": {
    badgeText: "100% ECO-CERTIFIED BOTANICAL FORMULA",
    title: "Regular Home Cleaning",
    subtitle: '"The Weekly Refresh: Consistent Clean, Sustainable Peace of Mind"',
    description: "Tailored luxury residential upkeep by background-verified, discreet senior hospitality professionals using bio-neutral solvents & HEPA filtration.",
  },
  "essential-touch-up-cleaning": {
    badgeText: "RAPID PRECISION REFRESH",
    title: "Essential Touch-Up Cleaning",
    subtitle: '"Swift Elegance: Spotless Surfaces for Last-Minute Hosting"',
    description: "Focused, high-priority maintenance detailing designed for fast turnarounds, ensuring pristine guest-ready spaces on demand.",
  },
  "deep-cleaning": {
    badgeText: "INTENSIVE SANITARY RESTORATION",
    title: "Deep Cleaning",
    subtitle: '"Total Renewal: Reclaiming Every Hidden Corner to Perfection"',
    description: "Comprehensive top-to-bottom restoration targeting neglected crevices, high-touch zones, and ingrained buildup with specialized detailing techniques.",
  },
  "end-of-tenancy-cleaning": {
    badgeText: "100% BOND-BACK GUARANTEE",
    title: "End of Tenancy Cleaning",
    subtitle: '"Flawless Handover: Meeting Strict Inspection Standards"',
    description: "Rigorous checklist-driven cleaning tailored to satisfy picky landlords and property managers for seamless tenant transitions.",
  },
  "post-construction-renovation-cleaning": {
    badgeText: "HEPA DUST EXTRACTION CERTIFIED",
    title: "Post-Construction & Renovation Cleaning",
    subtitle: '"From Dust to Splendor: Revealing Your Masterpiece"',
    description: "Specialized removal of fine particulate drywall dust, paint flecks, and debris to transform construction sites into pristine luxury environments.",
  },
  "same-day-priority-cleaning": {
    badgeText: "EXPRESS PRIORITY DISPATCH",
    title: "Same-Day Priority Cleaning",
    subtitle: '"Immediate Luxury: Rapid Response When Time is Critical"',
    description: "Dedicated emergency cleaning crews deployed swiftly to handle urgent scheduling needs without compromising our immaculate standards.",
  },
  "high-security-property-care": {
    badgeText: "CLEARED VVIP SECURITY PROTOCOLS",
    title: "High-Security Property Care",
    subtitle: '"Absolute Discretion: Elite Protection & Pristine Maintenance"',
    description: "Specialized cleaning and estate upkeep conducted by top-tier, security-cleared personnel bound by strict non-disclosure and confidentiality.",
  },
  "premium-rental-concierge-cleaning": {
    badgeText: "AIRBNB/VRBO SUPERHOST STANDARD",
    title: "Premium Rental Concierge Cleaning",
    subtitle: '"Seamless Turnovers: 5-Star Hospitality Experiences"',
    description: "End-to-end guest turnover management including luxury linen staging, restocking, and meticulous inspection reports.",
  },
  "commercial-office-cleaning": {
    badgeText: "ENTERPRISE WELLNESS COMPLIANT",
    title: "Commercial Office Cleaning",
    subtitle: '"Corporate Elegance: Inspiring Productive, Healthy Workspaces"',
    description: "Discreet after-hours executive suite and office maintenance utilizing quiet HEPA equipment and eco-safe surface sanitization.",
  },
  "steam-cleaning": {
    badgeText: "THERMAL SANITIZATION TECHNOLOGY",
    title: "Advanced Steam Cleaning",
    subtitle: '"Deep Thermal Extraction: Chemical-Free Purity"',
    description: "High-pressure dry vapor steam treatment that eliminates allergens, deep-set stains, and bacteria from upholstery, rugs, and hard floors.",
  },
  "post-event-cleaning": {
    badgeText: "RAPID MORNING-AFTER RESTORATION",
    title: "Post-Event Cleaning",
    subtitle: '"Disappearing Acts: Restoring Order After Grand Celebrations"',
    description: "Swift, discreet recovery teams that clear catering debris, restore entertainment zones, and return your venue to flawless luxury.",
  },
  "luxury-yacht-cleaning": {
    badgeText: "MARITIME ECO-SAFE CERTIFIED",
    title: "Luxury Yacht Cleaning",
    subtitle: '"Pristine Waters, Spotless Decks: Marine-Grade Elegance"',
    description: "Specialized teak care, salt-residue neutralization, and delicate interior detailing designed for high-end vessels and superyachts.",
  },
  "healthguard-sanitization": {
    badgeText: "HOSPITAL-GRADE ANTIMICROBIAL SHIELD",
    title: "HealthGuard Sanitization",
    subtitle: '"Advanced Pathogen Defense: Total Environmental Safety"',
    description: "Electrostatic atomization and broad-spectrum disinfection targeting 99.9% of viruses, bacteria, and microbial contaminants.",
  },
  "pool-cleaning": {
    badgeText: "CRYSTAL CLEAR WATER CHEMISTRY",
    title: "Professional Pool Care & Maintenance",
    subtitle: '"Pristine Aquatic Retreats: Balanced Beauty Year-Round"',
    description: "Comprehensive chemical balancing, debris skimming, filter cleansing, and tile scrubbing to keep your luxury pool sparkling.",
  },
};