import { apiFetch, apiUrl } from "./api";

export type BookingSupplySource = "customer" | "company";

export interface BookingLineItem {
  name: string;
  price?: number;
}

interface BookingPreferencesPayload {
  addOns?: BookingLineItem[];
  equipmentItems?: BookingLineItem[];
  supplySource?: BookingSupplySource;
  genderPreference?: string;
  languagePreference?: string;
  specialRequirements?: string;
  howGetIn?: string;
  howHeard?: string;
  propertyType?: string;
  /** healthguard-sanitization only. */
  facilities?: string[];
  /** healthguard-sanitization only. */
  disinfectionLevel?: BookingLineItem;
  /** steam-cleaning only. */
  steamItems?: string[];
  /** post-event-cleaning only. */
  eventTypes?: string[];
  /** high-security-property-care / luxury-yacht-cleaning only. */
  category?: string;
}

export interface CreateBookingPayload extends BookingPreferencesPayload {
  serviceId: number;
  propertySizeSqm: number;
  date: string;
  time: string;
  addressId?: number;
  note?: string;
  /** Pricing country — the backend uses it to price the booking for Stripe checkout. */
  country?: string;
  /** Per-booking contact override — shown for this booking without touching the account's saved profile. */
  firstName?: string;
  lastName?: string;
  email?: string;
  contact?: string;
}

export interface BookingServiceDetails {
  id: number;
  date: string;
  time: string;
  propertySizeSqm: number;
  minHours: string;
  maxHours: string;
  cleanerCount: number;
  extraCleanerCount: number;
  note: string | null;
  addOns: BookingLineItem[] | null;
  equipmentItems: BookingLineItem[] | null;
  supplySource: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  specialRequirements: string | null;
  howGetIn: string | null;
  howHeard: string | null;
  propertyType: string | null;
  facilities: string[] | null;
  disinfectionLevel: BookingLineItem | null;
  steamItems: string[] | null;
  eventTypes: string[] | null;
  category: string | null;
  service: { id: number; label: string; name: string };
}

export interface BookingCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  contact: string | null;
}

export interface BookingAddress {
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface Booking {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  customer: BookingCustomer;
  address: BookingAddress | null;
  serviceDetails: BookingServiceDetails[];
  createdAt: string;
}

export function createBooking(accessToken: string, payload: CreateBookingPayload) {
  return apiFetch<Booking>("/bookings", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export interface CreateGuestBookingPayload extends BookingPreferencesPayload {
  serviceId: number;
  propertySizeSqm: number;
  date: string;
  time: string;
  note?: string;
  firstName: string;
  lastName?: string;
  email: string;
  contact: string;
  streetAddress: string;
  unit?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  /** Pricing country code (site selector) — separate from the free-text address country. */
  pricingCountry?: string;
}

export function createGuestBooking(payload: CreateGuestBookingPayload) {
  return apiFetch<Booking>("/bookings/guest", {
    method: "POST",
    body: payload,
  });
}

export function listMyBookings(accessToken: string) {
  return apiFetch<Booking[]>("/bookings", { accessToken });
}

export function getMyBooking(accessToken: string, bookingId: number) {
  return apiFetch<Booking>(`/bookings/${bookingId}`, { accessToken });
}

export interface BookingStatusSummary {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  service: { label: string } | null;
  date: string | null;
  time: string | null;
}

/** Public — the reference number authenticates the request, so this works for guests too. */
export function getBookingStatus(bookingId: number, referenceNumber: string) {
  return apiFetch<BookingStatusSummary>(
    `/bookings/${bookingId}/status?ref=${encodeURIComponent(referenceNumber)}`,
  );
}

/** Public — the reference number authenticates the request, so this works for guests too. */
export function getBookingPdfUrl(bookingId: number, referenceNumber: string) {
  return apiUrl(`/bookings/${bookingId}/pdf?ref=${encodeURIComponent(referenceNumber)}`);
}

export function initiateCheckout(accessToken: string, bookingId: number) {
  return apiFetch<{ redirectUrl: string }>(`/payments/bookings/${bookingId}/checkout`, {
    method: "POST",
    accessToken,
    body: { provider: "stripe" },
  });
}

export function initiateGuestCheckout(bookingId: number, referenceNumber: string) {
  return apiFetch<{ redirectUrl: string }>(`/payments/bookings/${bookingId}/checkout/guest`, {
    method: "POST",
    body: { provider: "stripe", referenceNumber },
  });
}
