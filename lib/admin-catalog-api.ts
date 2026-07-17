import { apiFetch } from "./api";
import type { CatalogItem, CatalogService, ServiceCategory } from "./catalog-api";

export interface AdminPackage {
  id: number;
  name: string;
  price: string | null;
  status: "active" | "inactive";
}

export interface AdminJobType {
  id: number;
  serviceId: number;
  name: string;
  label: string;
  status: boolean;
}

export interface AdminCurrency {
  id: number;
  country: string;
  currency: string;
  code: string;
  symbol: string;
  thousandSeparator: string;
  decimalSeparator: string;
}

export interface CreateServicePayload {
  name: string;
  label: string;
  price?: string;
  status?: "active" | "inactive";
  category?: ServiceCategory;
  description?: string;
  imageUrl?: string;
}
export type UpdateServicePayload = Partial<CreateServicePayload>;

export interface CreatePackagePayload {
  name: string;
  price?: string;
  status?: "active" | "inactive";
}
export type UpdatePackagePayload = Partial<CreatePackagePayload>;

export interface CreateItemPayload {
  name: string;
  sku: string;
  price: string;
  type: string;
  image?: string;
}
export type UpdateItemPayload = Partial<CreateItemPayload>;

export interface CreateJobTypePayload {
  serviceId: number;
  name: string;
  label: string;
  status?: boolean;
}
export type UpdateJobTypePayload = Partial<CreateJobTypePayload>;

export interface CreateCurrencyPayload {
  country: string;
  currency: string;
  code: string;
  symbol: string;
  thousandSeparator: string;
  decimalSeparator: string;
}
export type UpdateCurrencyPayload = Partial<CreateCurrencyPayload>;

// ---------- Reads (public endpoints, no token required) ----------

export function listServicesAdmin() {
  return apiFetch<CatalogService[]>("/catalog/services");
}

export function listPackagesAdmin() {
  return apiFetch<AdminPackage[]>("/catalog/packages");
}

export function listItemsAdmin() {
  return apiFetch<CatalogItem[]>("/catalog/items");
}

export function listCurrenciesAdmin() {
  return apiFetch<AdminCurrency[]>("/catalog/currencies");
}

// ---------- Services ----------

export function createService(accessToken: string, payload: CreateServicePayload) {
  return apiFetch<CatalogService>("/admin/catalog/services", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateService(
  accessToken: string,
  id: number,
  payload: UpdateServicePayload,
) {
  return apiFetch<CatalogService>(`/catalog/services/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deleteService(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/catalog/services/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

// ---------- Packages ----------

export function createPackage(accessToken: string, payload: CreatePackagePayload) {
  return apiFetch<AdminPackage>("/admin/catalog/packages", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updatePackage(
  accessToken: string,
  id: number,
  payload: UpdatePackagePayload,
) {
  return apiFetch<AdminPackage>(`/admin/catalog/packages/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deletePackage(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/catalog/packages/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

// ---------- Items ----------

export function createItem(accessToken: string, payload: CreateItemPayload) {
  return apiFetch<CatalogItem>("/admin/catalog/items", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateItem(accessToken: string, id: number, payload: UpdateItemPayload) {
  return apiFetch<CatalogItem>(`/admin/catalog/items/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deleteItem(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/catalog/items/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

// ---------- Job types ----------

export function createJobType(accessToken: string, payload: CreateJobTypePayload) {
  return apiFetch<AdminJobType>("/admin/catalog/job-types", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateJobType(
  accessToken: string,
  id: number,
  payload: UpdateJobTypePayload,
) {
  return apiFetch<AdminJobType>(`/admin/catalog/job-types/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deleteJobType(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/catalog/job-types/${id}`, {
    method: "DELETE",
    accessToken,
  });
}

// ---------- Currencies ----------

export function createCurrency(accessToken: string, payload: CreateCurrencyPayload) {
  return apiFetch<AdminCurrency>("/admin/catalog/currencies", {
    method: "POST",
    accessToken,
    body: payload,
  });
}

export function updateCurrency(
  accessToken: string,
  id: number,
  payload: UpdateCurrencyPayload,
) {
  return apiFetch<AdminCurrency>(`/admin/catalog/currencies/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}

export function deleteCurrency(accessToken: string, id: number) {
  return apiFetch<{ success: boolean }>(`/admin/catalog/currencies/${id}`, {
    method: "DELETE",
    accessToken,
  });
}
