import { apiFetch } from "./api";
import { TranslationKey } from "./i18n/dictionaries/en";

export type ServiceCategory = "care_and_concierge" | "commercial_and_specialized_cleaning" | "premium_add_ons" | "residential_cleaning";

export type PackageCategory =
  | "deep_and_specialized_cleaning"
  | "general_interior_maintenance"
  | "lifestyle_and_home_care"
  | "outdoor_and_exterior_spaces";

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  "deep_and_specialized_cleaning",
  "general_interior_maintenance",
  "lifestyle_and_home_care",
  "outdoor_and_exterior_spaces",
];

export const PACKAGE_CATEGORY_LABELS: Record<PackageCategory, TranslationKey> = {
  deep_and_specialized_cleaning: "CategoryDeepSpecialized",
  general_interior_maintenance: "CategoryGeneralInterior",
  lifestyle_and_home_care: "CategoryLifeStyle",
  outdoor_and_exterior_spaces: "CategoryDeepOutDoor",
};

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
  /** Visible page copy — the homepage card blurb and booking/quotation page subtitle. */
  description: string | null;
  imageUrl: string | null;
  /** Can be booked online through the sizing/pricing + booking flow. */
  isBookable: boolean;
  /** Accepts "Request a Quotation" submissions. */
  isQuotable: boolean;
}

export interface ServiceAddOnPackage {
  id: number;
  name: TranslationKey;
  image: string | null;
  category: PackageCategory;
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
