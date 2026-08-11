import { apiFetch } from "./api";

export interface AdminOrderCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  contact: string | null;
}

export interface AdminOrderAddress {
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface AdminOrderStaff {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
}

export interface AdminOrderLineItem {
  name: string;
  price: number | null;
}

export interface AdminOrderServiceDetails {
  id: number;
  date: string;
  time: string;
  propertySizeSqm: number;
  minHours: string;
  maxHours: string;
  cleanerCount: number;
  extraCleanerCount: number;
  note: string | null;
  addOns: AdminOrderLineItem[] | null;
  equipmentItems: AdminOrderLineItem[] | null;
  supplySource: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  specialRequirements: string | null;
  propertyType: string | null;
  facilities: string[] | null;
  disinfectionLevel: AdminOrderLineItem | null;
  steamItems: string[] | null;
  eventTypes: string[] | null;
  category: string | null;
  service: { id: number; label: string };
}

export interface AdminOrder {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  cleanerId: number | null;
  customer: AdminOrderCustomer;
  cleaner: AdminOrderStaff | null;
  address: AdminOrderAddress | null;
  serviceDetails: AdminOrderServiceDetails[];
  createdAt: string;
}

export interface UpdateOrderAdminPayload {
  price?: number;
  currency?: string;
  status?: "pending" | "confirmed" | "cancelled";
  cleanerId?: number;
}

export function listAllOrdersAdmin(accessToken: string) {
  return apiFetch<AdminOrder[]>("/admin/orders", { accessToken });
}

export function getOrderAdmin(accessToken: string, orderId: number) {
  return apiFetch<AdminOrder>(`/admin/orders/${orderId}`, { accessToken });
}

export interface CleanerOrder {
  id: number;
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  price: string | null;
  currency: string | null;
  customer: AdminOrderCustomer;
  serviceDetails: AdminOrderServiceDetails[];
  createdAt: string;
}

/** A cleaner's own assigned bookings. */
export function listCleanerOrders(accessToken: string) {
  return apiFetch<CleanerOrder[]>("/cleaner/orders", { accessToken });
}

/** A single booking assigned to the logged-in cleaner. */
export function getOrderForCleaner(accessToken: string, orderId: number) {
  return apiFetch<AdminOrder>(`/cleaner/orders/${orderId}`, { accessToken });
}

export function updateOrderAdmin(
  accessToken: string,
  orderId: number,
  payload: UpdateOrderAdminPayload,
) {
  return apiFetch<AdminOrder>(`/admin/orders/${orderId}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}
