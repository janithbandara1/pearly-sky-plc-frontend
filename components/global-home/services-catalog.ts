/**
 * The global gateway's service catalog presentation — card photo and
 * category per service id (the base English service slug), shared by the Our
 * Services page and the quotation request page.
 */
import type { GlobalKey } from "@/lib/i18n/global/en";

const IMAGE_DIR = "/images/services/updated-";

/** Card photo per service id (the 660px variants). */
const IMAGES: Record<string, string> = {
  "regular-home-cleaning": "home-property-cleaning-services-1-standard-residential-cleaning-660w.webp",
  "essential-touch-up-cleaning": "home-property-cleaning-services-2-express-refresh-cleaning-660w.webp",
  "same-day-priority-cleaning": "home-property-cleaning-services-3-last-minute-cleaning-660w.webp",
  "deep-cleaning": "home-property-cleaning-services-4-deep-cleaning-660w.webp",
  "end-of-tenancy-cleaning": "home-property-cleaning-services-5-move-in-out-cleaning-660w.webp",
  "post-construction-renovation-cleaning":
    "home-property-cleaning-services-6-post-construction-renovation-cleaning-660w.webp",
  "premium-rental-concierge-cleaning":
    "home-property-cleaning-services-7-airbnb-short-term-rental-cleaning-660w.webp",
  "commercial-office-cleaning": "home-property-cleaning-services-8-commercial-office-cleaning-660w.webp",
  "healthguard-sanitization":
    "home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection-660w.webp",
  "carpet-upholstery-cleaning": "home-property-cleaning-services-10-carpet-upholstery-cleaning-660w.webp",
  "steam-cleaning": "home-property-cleaning-services-11-steam-cleaning-660w.webp",
  "post-event-cleaning": "home-property-cleaning-services-12-post-event-cleaning-660w.webp",
  "pool-cleaning": "home-property-cleaning-services-13-pool-cleaning-660w.webp",
  "precision-pressure-washing": "home-property-cleaning-services-14-precision-pressure-washing-660w.webp",
  "child-care-service": "care-support-services-1-child-care-service-660w.webp",
  "elder-care-service": "care-support-services-2-elder-care-service-660w.webp",
  "laundry-service": "care-support-services-3-laundry-services-660w.webp",
  "move-in-out-transport-service": "care-support-services-4-move-in-out-transport-service-660w.webp",
  "high-security-property-care": "home-property-cleaning-services-15-security-cleaning-660w.webp",
  "luxury-yacht-cleaning": "home-property-cleaning-services-16-luxury-yacht-cleaning-660w.webp",
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

/** A service's card photo (660px variant). */
export function serviceCardImage(id: string): string {
  return `${IMAGE_DIR}${IMAGES[id]}`;
}
