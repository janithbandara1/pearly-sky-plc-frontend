import { SUPPORTED_COUNTRIES, type CountryCode } from "./config";

interface ServiceMeta {
  title: string;
  description: string;
}

/** Short country label for a title suffix ("Elite Deep Cleaning – France"). */
const COUNTRY_TITLE_SUFFIX: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lu: "Luxembourg",
  nl: "Netherlands",
  fi: "Finland",
  se: "Sweden",
  it: "Italy",
  pl: "Poland",
  be: "Belgium",
  at: "Austria",
  dk: "Denmark",
  es: "Spain",
  pt: "Portugal",
  ro: "Romania",
  gb: "United Kingdom",
  us: "United States",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  qa: "Qatar",
  sa: "Saudi Arabia",
  ae: "United Arab Emirates",
  om: "Oman",
  bh: "Bahrain",
  lk: "Sri Lanka",
};

/** Prose country label for a description sentence ("...across the United Kingdom."). */
const COUNTRY_PROSE: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lu: "Luxembourg",
  nl: "the Netherlands",
  fi: "Finland",
  se: "Sweden",
  it: "Italy",
  pl: "Poland",
  be: "Belgium",
  at: "Austria",
  dk: "Denmark",
  es: "Spain",
  pt: "Portugal",
  ro: "Romania",
  gb: "the United Kingdom",
  us: "the United States",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  qa: "Qatar",
  sa: "Saudi Arabia",
  ae: "the United Arab Emirates",
  om: "Oman",
  bh: "Bahrain",
  lk: "Sri Lanka",
};

/**
 * Builds a distinct title/description per country from one base pair, so the
 * site's 3 hreflang country-alternates per service page aren't byte-identical
 * — search engines fold identical-content alternates into a single indexed
 * page, defeating the purpose of having per-country URLs at all.
 */
function metaByCountryFrom(title: string, description: string): Record<CountryCode, ServiceMeta> {
  const result = {} as Record<CountryCode, ServiceMeta>;
  for (const country of SUPPORTED_COUNTRIES) {
    result[country] = {
      title: `${title} – ${COUNTRY_TITLE_SUFFIX[country]}`,
      description: `${description} Serving clients across ${COUNTRY_PROSE[country]}.`,
    };
  }
  return result;
}

/**
 * Per-service, per-country SEO <title>/<meta description> overrides, keyed
 * by service slug. Services not listed here fall back to
 * "{label} | Pearly Sky" / the service's `description` field from the
 * catalog API — see generateMetadata() in
 * app/(site)/services/[serviceSlug]/page.tsx.
 */
export const SERVICE_META: Record<string, Record<CountryCode, ServiceMeta>> = {
  "regular-home-cleaning": metaByCountryFrom(
    "Regular Home Cleaning | Pearly Sky Eco-Luxury Care",
    "Recurring, detail-driven upkeep that keeps every room fresh, tidy, and welcoming between visits.",
  ),
  "quick-touch-up-cleaning": metaByCountryFrom(
    "Essential Touch-Up Cleaning | Fast Refresh Service",
    "A focused, efficient refresh for high-traffic areas — ideal for a quick reset before guests or the next appointment.",
  ),
  "deep-cleaning": metaByCountryFrom(
    "Elite Luxury Deep Cleaning Services | Pearly Sky Specialized",
    "An exhaustive, detail-driven interior sterilization targeting structural buildup, scaling, and precision rejuvenation. Experience ultimate freshness.",
  ),
  "end-of-tenancy-cleaning": metaByCountryFrom(
    "Premium End of Tenancy Cleaning | Deposit Guarantee Service",
    "Comprehensive, high-standard checkout sanitation designed for premium real estate handovers. Secured asset return metrics with pristine outcomes.",
  ),
  "post-construction-renovation-cleaning": metaByCountryFrom(
    "Post-Construction Detail Cleaning | Luxury Site Handover",
    "Advanced elimination of airborne fine dust, tracking residues, paint splatters, and structural masonry polishing. Turn builds into move-in spaces.",
  ),
  "same-day-priority-cleaning": metaByCountryFrom(
    "Same-Day Priority Cleaning | Rapid-Dispatch Service",
    "Urgent, fully-staffed cleaning dispatched the same day for last-minute arrivals, inspections, or unexpected guests.",
  ),
  "high-security-property-care": metaByCountryFrom(
    "High-Security Property Care | Vetted Discreet Teams",
    "Background-checked, NDA-bound cleaning crews for high-profile residences and secure facilities, with strict access and confidentiality protocols.",
  ),
  "premium-rental-concierge-cleaning": metaByCountryFrom(
    "Premium Rental Concierge Cleaning | Airbnb Turnover Experts",
    "Hotel-grade premium turnovers including fresh linen configurations, property damage auditing, and luxurious welcoming touchpoints.",
  ),
  "commercial-office-cleaning": metaByCountryFrom(
    "Elite Commercial & Corporate Office Cleaning Pearly Sky",
    "Impeccable executive office sanitation and corporate building presentation tailored to maintain workspace health metrics and premium aesthetics.",
  ),
  "healthguard-sanitization": metaByCountryFrom(
    "HealthGuard Disinfection & Medical-Grade Sanitization",
    "Advanced electrostatic anti-viral misting and certified pathogen elimination matrices. Secure your living and working perimeter seamlessly.",
  ),
  "carpet-upholstery-cleaning": metaByCountryFrom(
    "Premium Carpet & Upholstery Cleaning | Fiber Restoration",
    "Professional deep injection-extraction methods targeting localized spots, allergen matrices, and deep fabric structural protection.",
  ),
  "steam-cleaning": metaByCountryFrom(
    "Eco Steam Cleaning Services | High-Temperature Sterilization",
    "Chemical-free sanitation utilizing advanced high-pressure thermal vapor. Eradicates deeply embedded grime across tiles and hard floors.",
  ),
  "post-event-cleaning": metaByCountryFrom(
    "Elite Post-Event Cleaning Services | Rapid Venue Breakdown",
    "Complete overnight or immediate event space breakdown, waste tracking management, and rigorous space polish loops for prestige galas.",
  ),
  "pool-cleaning": metaByCountryFrom(
    "Luxury Swimming Pool Maintenance & Structural Cleaning",
    "Comprehensive chemical titration, wall algae scrubbing, tile polish matrices, and filter configuration audits for private luxury swimming pools.",
  ),
  "precision-pressure-washing": metaByCountryFrom(
    "Precision Pressure Washing | High-PSI Facade Rejuvenation",
    "Heavy-duty specialized surface restoration for structural stone driveways, concrete claddings, and exterior premium architectural structures.",
  ),
  "luxury-yacht-cleaning": metaByCountryFrom(
    "Luxury Yacht Detailing & Marine Care Pearly Sky Marine",
    "Ultra-premium marine-safe eco-solvent detailing. Interior luxury fabric care, teak restoration, and meticulous metallic polishing for luxury vessels.",
  ),
  "child-care-service": metaByCountryFrom(
    "Elite Child Care Assistance & Playroom Sanitization",
    "Certified nanny placement frameworks paired with non-toxic medical-grade allergen extraction across active nurseries and children's play zones.",
  ),
  "elder-care-service": metaByCountryFrom(
    "Premium Elder Care Companion & Safe Home Maintenance",
    "Compassionate senior support schedules coupled with specialized domestic mobility safety setups and organic clean home upkeep routines.",
  ),
  "laundry-service": metaByCountryFrom(
    "Laundry & Linen Care | Wash, Press & Fold Service",
    "Premium garment and linen care — washing, pressing, and folding handled with hotel-grade attention to fabric and finish.",
  ),
  "move-in-out-transport-service": metaByCountryFrom(
    "Move-In & Move-Out Transport Health | Pearly Sky Concierge",
    "Coordinated transport and handling support for relocations, paired with sanitized, health-conscious packing and moving practices.",
  ),
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getServiceMeta(slug: string, country: CountryCode | null): ServiceMeta | undefined {
  return SERVICE_META[slug]?.[country ?? "fr"];
}
