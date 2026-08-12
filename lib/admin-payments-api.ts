import { apiFetch } from "./api";

export interface AdminPayment {
  id: number;
  bookingId: number;
  booking: { id: number; referenceNumber: string } | null;
  amount: string;
  currency: string;
  provider: string;
  providerReference: string | null;
  status: "pending" | "succeeded" | "failed" | "cancelled";
  createdAt: string;
}

export function listPaymentsAdmin(accessToken: string) {
  return apiFetch<AdminPayment[]>("/admin/payments", { accessToken });
}

export function getPaymentAdmin(accessToken: string, id: number) {
  return apiFetch<AdminPayment>(`/admin/payments/${id}`, { accessToken });
}
