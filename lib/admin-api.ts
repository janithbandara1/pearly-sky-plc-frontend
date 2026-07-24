import { apiFetch } from "./api";

export interface AdminOrderCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  contact: string | null;
}

export interface AdminOrderStaff {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
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
  frequency: string;
  note: string | null;
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

export interface MyOrder {
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
export function listMyOrders(accessToken: string) {
  return apiFetch<MyOrder[]>("/me/orders", { accessToken });
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
