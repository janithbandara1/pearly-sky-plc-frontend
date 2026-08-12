import { apiFetch } from "./api";
import type { AdminBooking } from "./admin-api";

export interface DashboardSummary {
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
  };
  customers: { total: number };
  staff: { total: number };
  revenue: { total: number };
  recentBookings: AdminBooking[];
}

export function getDashboardSummary(accessToken: string) {
  return apiFetch<DashboardSummary>("/admin/dashboard/summary", { accessToken });
}
