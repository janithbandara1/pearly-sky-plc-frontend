import { apiFetch } from "./api";

export interface AdminBookingCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  contact: string | null;
}

export interface AdminBookingAddress {
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface AdminBookingStaff {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
}

export interface AdminBookingLineItem {
  name: string;
  price: number | null;
}

export interface AdminBookingServiceDetails {
  id: number;
  date: string;
  time: string;
  propertySizeSqm: number;
  minHours: string;
  maxHours: string;
  cleanerCount: number;
  extraCleanerCount: number;
  note: string | null;
  addOns: AdminBookingLineItem[] | null;
  equipmentItems: AdminBookingLineItem[] | null;
  supplySource: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  specialRequirements: string | null;
  howGetIn: string | null;
  howHeard: string | null;
  propertyType: string | null;
  facilities: string[] | null;
  disinfectionLevel: AdminBookingLineItem | null;
  steamItems: string[] | null;
  eventTypes: string[] | null;
  category: string | null;
  service: { id: number; label: string };
}

export interface AdminBooking {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  cleanerId: number | null;
  customer: AdminBookingCustomer;
  cleaner: AdminBookingStaff | null;
  address: AdminBookingAddress | null;
  serviceDetails: AdminBookingServiceDetails[];
  createdAt: string;
}

export interface UpdateBookingAdminPayload {
  price?: number;
  currency?: string;
  status?: "pending" | "confirmed" | "cancelled";
  cleanerId?: number;
}

export function listAllBookingsAdmin(accessToken: string) {
  return apiFetch<AdminBooking[]>("/admin/bookings", { accessToken });
}

export function getBookingAdmin(accessToken: string, bookingId: number) {
  return apiFetch<AdminBooking>(`/admin/bookings/${bookingId}`, { accessToken });
}

export interface CleanerBooking {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  customer: AdminBookingCustomer;
  serviceDetails: AdminBookingServiceDetails[];
  createdAt: string;
}

/** A cleaner's own assigned bookings. */
export function listCleanerBookings(accessToken: string) {
  return apiFetch<CleanerBooking[]>("/cleaner/bookings", { accessToken });
}

/** A single booking assigned to the logged-in cleaner. */
export function getBookingForCleaner(accessToken: string, bookingId: number) {
  return apiFetch<AdminBooking>(`/cleaner/bookings/${bookingId}`, { accessToken });
}

export function updateBookingAdmin(
  accessToken: string,
  bookingId: number,
  payload: UpdateBookingAdminPayload,
) {
  return apiFetch<AdminBooking>(`/admin/bookings/${bookingId}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}
