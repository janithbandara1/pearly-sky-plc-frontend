import { apiFetch } from "./api";

export interface CustomerProfile {
  id: number;
  firstName: string;
  lastName: string | null;
  company: string | null;
  country: string | null;
  contact: string | null;
  email: string;
}

export interface CustomerAddress {
  id: number;
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  company?: string;
  country?: string;
  contact?: string;
}

export interface AddressPayload {
  streetAddress: string;
  unit?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export function getMyProfile(accessToken: string) {
  return apiFetch<CustomerProfile>("/customers/me", { accessToken });
}

export function updateMyProfile(accessToken: string, payload: UpdateProfilePayload) {
  return apiFetch<CustomerProfile>("/customers/me", {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function listMyAddresses(accessToken: string) {
  return apiFetch<CustomerAddress[]>("/customers/me/addresses", { accessToken });
}

export function createMyAddress(accessToken: string, payload: AddressPayload) {
  return apiFetch<CustomerAddress>("/customers/me/addresses", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function deleteMyAddress(accessToken: string, addressId: number) {
  return apiFetch<{ success: boolean }>(`/customers/me/addresses/${addressId}`, {
    method: "DELETE",
    accessToken,
  });
}
