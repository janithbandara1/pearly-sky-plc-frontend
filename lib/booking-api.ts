import { apiFetch } from "./api";

export type BookingFrequency = "one-time" | "weekly" | "bi-weekly" | "monthly";

export interface CreateBookingPayload {
  serviceId: number;
  propertySizeSqm: number;
  date: string;
  time: string;
  frequency: BookingFrequency;
  addressId?: number;
  note?: string;
  /** Pricing country — the backend uses it to price the order for Stripe checkout. */
  country?: string;
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
  frequency: BookingFrequency;
  note: string | null;
  service: { id: number; label: string; name: string };
}

export interface Booking {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
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

export interface CreateGuestBookingPayload {
  serviceId: number;
  propertySizeSqm: number;
  date: string;
  time: string;
  frequency: BookingFrequency;
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

export function initiateCheckout(accessToken: string, orderId: number) {
  return apiFetch<{ redirectUrl: string }>(`/payments/orders/${orderId}/checkout`, {
    method: "POST",
    accessToken,
    body: { provider: "stripe" },
  });
}

export function initiateGuestCheckout(orderId: number, referenceNumber: string) {
  return apiFetch<{ redirectUrl: string }>(`/payments/orders/${orderId}/checkout/guest`, {
    method: "POST",
    body: { provider: "stripe", referenceNumber },
  });
}
