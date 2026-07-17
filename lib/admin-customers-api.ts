import { apiFetch } from "./api";

export interface AdminCustomerAddress {
  id: number;
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

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
  addresses?: AdminCustomerAddress[];
}

export interface UpdateCustomerAdminPayload {
  firstName?: string;
  lastName?: string;
  company?: string;
  country?: string;
  contact?: string;
}

export function listCustomersAdmin(accessToken: string, search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return apiFetch<AdminCustomer[]>(`/admin/customers${query}`, { accessToken });
}

export function getCustomerAdmin(accessToken: string, id: number) {
  return apiFetch<AdminCustomer>(`/admin/customers/${id}`, { accessToken });
}

export function updateCustomerAdmin(
  accessToken: string,
  id: number,
  payload: UpdateCustomerAdminPayload,
) {
  return apiFetch<AdminCustomer>(`/admin/customers/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}
