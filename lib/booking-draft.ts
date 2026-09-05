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
  image?: string | null;
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

export function saveBookingDraft(draft: BookingDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadBookingDraft(): BookingDraft | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingDraft;
  } catch {
    return null;
  }
}

export function clearBookingDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}

