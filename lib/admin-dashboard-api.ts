import { apiFetch } from "./api";
import type { AdminOrder } from "./admin-api";

export interface DashboardSummary {
  orders: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
  };
  customers: { total: number };
  staff: { total: number };
  revenue: { total: number };
  recentOrders: AdminOrder[];
}

export function getDashboardSummary(accessToken: string) {
  return apiFetch<DashboardSummary>("/admin/dashboard/summary", { accessToken });
}
