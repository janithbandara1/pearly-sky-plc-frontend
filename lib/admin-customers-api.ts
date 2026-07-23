import { apiFetch } from "./api";

export interface AdminCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  company: string | null;
  country: string | null;
  contact: string | null;
  email: string;
  isGuest: boolean;
  createdAt: string;
}

export function listCustomersAdmin(accessToken: string, search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return apiFetch<AdminCustomer[]>(`/admin/customers${query}`, { accessToken });
}
