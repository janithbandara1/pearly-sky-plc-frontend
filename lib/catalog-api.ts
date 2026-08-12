import { apiFetch } from "./api";

export type ServiceCategory = "property_care" | "bespoke_lifestyle";

export interface ServicePriceEntry {
  country: string;
  price: string | null;
}

export interface CatalogService {
  id: number;
  name: string;
  label: string;
  /** Hourly rate resolved for the request's country (via `x-country`); null if unset or no country. */
  price: string | null;
  /** Full per-country breakdown, e.g. for admin editing. */
  prices: ServicePriceEntry[];
  status: "active" | "inactive";
  category: ServiceCategory;
  description: string | null;
  imageUrl: string | null;
}

export interface ServiceAddOnPackage {
  id: number;
  name: string;
  /** Resolved for the request's country; null if unset or no country. */
  price: string | null;
  prices: ServicePriceEntry[];
  image: string | null;
}

export interface CatalogServiceDetail extends CatalogService {
  servicePackages: { package: ServiceAddOnPackage }[];
  serviceItems: { item: CatalogItem }[];
}

export interface SizeQuote {
  bookable: boolean;
  minHours?: number;
  maxHours?: number;
  cleanerCount?: number;
  extraCleanerCount?: number;
  priceMin?: number | null;
  priceMax?: number | null;
}

export interface CatalogItem {
  id: number;
  name: string;
  sku: string;
  /** Resolved for the request's country; null if unset or no country. */
  price: string | null;
  prices: ServicePriceEntry[];
  type: string;
  image: string | null;
}

export function getServices(country?: string | null) {
  return apiFetch<CatalogService[]>("/catalog/services", { country });
}

export function getService(id: number, country?: string | null) {
  return apiFetch<CatalogServiceDetail>(`/catalog/services/${id}`, { country });
}

export function getServiceBySlug(slug: string, country?: string | null) {
  return apiFetch<CatalogServiceDetail>(
    `/catalog/services/by-name/${encodeURIComponent(slug)}`,
    { country },
  );
}

export function getServiceQuote(id: number, propertySizeSqm: number, country?: string | null) {
  return apiFetch<SizeQuote>(
    `/catalog/services/${id}/quote?propertySizeSqm=${propertySizeSqm}`,
    { country },
  );
}

export function getItems(country?: string | null) {
  return apiFetch<CatalogItem[]>("/catalog/items", { country });
}
