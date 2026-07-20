import { apiFetch } from "./api";

export type ServiceCategory = "property_care" | "bespoke_lifestyle";

export interface CatalogService {
  id: number;
  name: string;
  label: string;
  price: string | null;
  status: "active" | "inactive";
  category: ServiceCategory;
  description: string | null;
  imageUrl: string | null;
}

export interface ServiceAddOnPackage {
  id: number;
  name: string;
  price: string | null;
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
  price: string;
  type: string;
  image: string | null;
}

export function getServices() {
  return apiFetch<CatalogService[]>("/catalog/services");
}

export function getService(id: number) {
  return apiFetch<CatalogServiceDetail>(`/catalog/services/${id}`);
}

export function getServiceBySlug(slug: string) {
  return apiFetch<CatalogServiceDetail>(`/catalog/services/by-name/${encodeURIComponent(slug)}`);
}

export function getServiceQuote(id: number, propertySizeSqm: number) {
  return apiFetch<SizeQuote>(
    `/catalog/services/${id}/quote?propertySizeSqm=${propertySizeSqm}`,
  );
}

export function getItems() {
  return apiFetch<CatalogItem[]>("/catalog/items");
}
