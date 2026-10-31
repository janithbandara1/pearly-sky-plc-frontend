/**
 * The global gateway's service catalog presentation — card photo and
 * category per service id (the base English service slug), shared by the Our
 * Services page and the quotation request page.
 */
import type { GlobalKey } from "@/lib/i18n/global/en";

const IMAGE_DIR = "/images/services/updated-images/";

/** Card photo per service id — the same files the country sites' catalog seeds use. */
const IMAGES: Record<string, string> = {
  "regular-home-cleaning": "Regular-Home-Cleaning.webp",
  "essential-touch-up-cleaning": "essential-touch-up-cleaning.webp",
  "same-day-priority-cleaning": "Same-Day-Priority-Cleaning.webp",
  "deep-cleaning": "deep-cleaning.webp",
  "end-of-tenancy-cleaning": "end-of-tendancy.webp",
  "post-construction-renovation-cleaning": "Post-Construction-&-Renovation-Cleaning.webp",
  "premium-rental-concierge-cleaning": "Premium-Rental-Concierge-Cleaning.webp",
  "commercial-office-cleaning": "Commercial-&-Office-Cleaning.webp",
  "healthguard-sanitization": "HealthGuard-Sanitization.webp",
  "carpet-upholstery-cleaning": "Carpet-&-Upholstery-Cleaning.webp",
  "steam-cleaning": "Steam-Cleaning.webp",
  "post-event-cleaning": "Post-Event-Cleaning.webp",
  "pool-cleaning": "Pool-Cleaning.webp",
  "precision-pressure-washing": "Precision-Pressure-Washing.webp",
  "child-care-service": "Child-Care-Service.webp",
  "elder-care-service": "Elder-Care-Service.webp",
  "laundry-service": "Laundry-Service.webp",
  "move-in-out-transport-service": "Move-In-Move-Out-Transport-Service.webp",
  "high-security-property-care": "High-Security-Property-Cleaning .webp",
  "luxury-yacht-cleaning": "Luxury-Yacht-Cleaning.webp",
};

export const SERVICE_CATEGORIES: { id: string; labelKey: GlobalKey }[] = [
  { id: "home", labelKey: "svc.cat.home" },
  { id: "specialist", labelKey: "svc.cat.specialist" },
  { id: "property", labelKey: "svc.cat.property" },
  { id: "office", labelKey: "svc.cat.office" },
  { id: "lifestyle", labelKey: "svc.cat.lifestyle" },
];

export type ServiceCategoryId = string;

export const CATEGORY_BY_SERVICE: Record<string, ServiceCategoryId> = {
  "regular-home-cleaning": "home",
  "essential-touch-up-cleaning": "home",
  "same-day-priority-cleaning": "home",
  "deep-cleaning": "home",
  "steam-cleaning": "specialist",
  "healthguard-sanitization": "specialist",
  "carpet-upholstery-cleaning": "specialist",
  "post-event-cleaning": "specialist",
  "precision-pressure-washing": "specialist",
  "pool-cleaning": "specialist",
  "end-of-tenancy-cleaning": "property",
  "high-security-property-care": "property",
  "premium-rental-concierge-cleaning": "property",
  "luxury-yacht-cleaning": "property",
  "commercial-office-cleaning": "office",
  "post-construction-renovation-cleaning": "office",
  "child-care-service": "lifestyle",
  "elder-care-service": "lifestyle",
  "laundry-service": "lifestyle",
  "move-in-out-transport-service": "lifestyle",
};

/** A service's card photo. Encoded, since some file names contain spaces and "&". */
export function serviceCardImage(id: string): string {
  return encodeURI(`${IMAGE_DIR}${IMAGES[id]}`).replaceAll("&", "%26");
}
