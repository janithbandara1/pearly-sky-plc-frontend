import type { SupplySource } from "@/components/booking/equipment-section";
import type { BookingFrequency } from "./booking-api";

const STORAGE_KEY = "booking-draft";

export interface BookingDraftPackage {
  name: string;
  price: number | null;
}

export interface BookingDraftItem {
  name: string;
}

export interface BookingDraft {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
  propertySizeSqm: number;
  date: string;
  time: string;
  frequency: BookingFrequency;
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
  note?: string;
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
