import type { SupplySource } from "@/components/booking/equipment-section";
import type { QuoteItem } from "@/lib/content/quote-items";

const STORAGE_KEY = "booking-draft";

export interface BookingDraftPackage {
  name: string;
  price: number | null;
}

export interface BookingDraftItem {
  name: string;
  price: number | null;
}

export interface CareProfileDraft {
  name: string;
  specialNeeds: string;
  gender: string;
  age: string;
  documentName?: string;
  documentData?: string;
  behavioralNotes?: string;
}

export interface BookingDraft {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
  propertySizeSqm: number;
  date: string;
  time: string;
  packages: BookingDraftPackage[];
  items: BookingDraftItem[];
  supplySource: SupplySource;
  addOnsTotal: number;
  genderPreference: string;
  languagePreference: string;
  specialRequirements?: string;
  propertyType?: string;
  /** healthguard-sanitization only. */
  facilities?: string[];
  /** healthguard-sanitization only. */
  disinfectionLevel?: BookingDraftPackage;
  /** steam-cleaning / healthguard-sanitization / post-construction only — +40% on the rate. */
  deepClean?: boolean;
  /** steam-cleaning / healthguard-sanitization / post-construction only — hospital-grade disinfection, no surcharge. */
  disinfection?: boolean;
  /** steam-cleaning / healthguard-sanitization / post-construction only — Residential / Industrial switch. */
  serviceCategory?: "residential" | "industrial";
  /** steam-cleaning only. */
  steamItems?: string[];
  /** post-event-cleaning only. */
  eventTypes?: string[];
  /** high-security-property-care / luxury-yacht-cleaning only. */
  category?: string;
  note?: string;
  /** Care services (child-care-service / elder-care-service) */
  scheduleMode?: string;
  durationMode?: "hours" | "half_day" | "full_day";
  durationHours?: number;
  personCount?: number;
  caregiverCount?: number;
  numCleaners?: number;
  careProfile?: CareProfileDraft;
  careProfiles?: CareProfileDraft[];
  specialRequest?: string;
  serviceSpecifics?: string;
  howGetIn?: string;
  howHeard?: string;
  province?: string;
  unit?: string;

  caregiverGender?: string;
  quoteItems?: QuoteItem[];
  propertyClassification?: string;
  serviceContinuityPlan?: string;
  documentName?: string;
  documentData?: string;
}

// These run during the server-side render of client components (every schedule
// section loads its initial state from the draft in a useState initializer,
// which executes on the server too), where sessionStorage doesn't exist.
export function saveBookingDraft(draft: BookingDraft) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingDraft;
  } catch {
    return null;
  }
}

export function clearBookingDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

