import type { AttachmentLink, AttachmentRef } from "./upload-api";
import { apiFetch, apiUrl } from "./api";

export type BookingSupplySource = "customer" | "company";

export interface BookingRoom {
  key: string;
  count: number;
}

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
  /** Current site language — the confirmation email/PDF are rendered in it. */
  language?: string;
  /** Files uploaded at checkout / on the quotation form (see lib/upload-api.ts). */
  attachments?: AttachmentRef[];
  specialRequirements?: string;
  howGetIn?: string;
  howHeard?: string;
  propertyType?: string;
  /** healthguard-sanitization only. */
  facilities?: string[];
  /** healthguard-sanitization only. */
  disinfectionLevel?: BookingLineItem;
  /** steam-cleaning / healthguard-sanitization / post-construction only — the backend charges 1.4× the rate. */
  deepClean?: boolean;
  /** steam-cleaning / healthguard-sanitization / post-construction only — hospital-grade disinfection, no surcharge. */
  disinfection?: boolean;
  /** steam-cleaning / healthguard-sanitization / post-construction only — Residential / Industrial switch. */
  serviceCategory?: string;
  /** Room-component services only — `key` is a RoomKey (e.g. "bedrooms"). */
  rooms?: BookingRoom[];
  /** Selected service frequency id (e.g. "weekly") — informational only, doesn't affect pricing. */
  frequency?: string;
  /** steam-cleaning only. */
  steamItems?: string[];
  /** post-event-cleaning only. */
  eventTypes?: string[];
  /** high-security-property-care / luxury-yacht-cleaning only. */
  category?: string;
  /** Exact requested duration — child-care-service / elder-care-service only (everyone else's hours come from the property-size pricing table). */
  durationHours?: number;
  /** Number of requested professionals — child-care-service / elder-care-service only. */
  numCleaners?: number;
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
  deepClean?: boolean;
  disinfection?: boolean;
  serviceCategory?: string | null;
  rooms?: BookingRoom[] | null;
  frequency?: string | null;
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
  /** Files attached at checkout, with short-lived open links (detail endpoints only). */
  attachmentLinks?: AttachmentLink[];
  id: number;
  referenceNumber: string;
  /** High-entropy capability token for the public guest checkout/status/PDF endpoints — never referenceNumber, which is guessable. */
  accessToken: string;
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
  cleanerCount: number | null;
  minHours: string | null;
  maxHours: string | null;
  address: {
    streetAddress: string;
    city: string;
    state: string | null;
    country: string | null;
  } | null;
}

/** Public — the access token authenticates the request, so this works for guests too. */
export function getBookingStatus(bookingId: number, accessToken: string) {
  return apiFetch<BookingStatusSummary>(
    `/bookings/${bookingId}/status?ref=${encodeURIComponent(accessToken)}`,
  );
}

/** Public — the access token authenticates the request, so this works for guests too. */
export function getBookingPdfUrl(bookingId: number, accessToken: string, language?: string) {
  const lang = language ? `&lang=${encodeURIComponent(language)}` : "";
  return apiUrl(`/bookings/${bookingId}/pdf?ref=${encodeURIComponent(accessToken)}${lang}`);
}

export function initiateCheckout(accessToken: string, bookingId: number) {
  return apiFetch<{ redirectUrl: string }>(`/payments/bookings/${bookingId}/checkout`, {
    method: "POST",
    accessToken,
    body: { provider: "stripe" },
  });
}

/** `bookingAccessToken` is the booking's own capability token (Booking.accessToken), not a session token. */
export function initiateGuestCheckout(bookingId: number, bookingAccessToken: string) {
  return apiFetch<{ redirectUrl: string }>(`/payments/bookings/${bookingId}/checkout/guest`, {
    method: "POST",
    body: { provider: "stripe", accessToken: bookingAccessToken },
  });
}
