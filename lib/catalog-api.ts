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

/** One language's (or one country+language's) explicit slug for a service — raw material for hreflang/sitemap, not for display. */
export interface ServiceLocaleSlug {
  language: string;
  /** null for a language-level (country-agnostic) translation; set for a country+language override. */
  country: string | null;
  slug: string;
}

export interface ServiceSeoMeta {
  title: string | null;
  description: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
}

export interface CatalogService {
  id: number;
  /** Base/English slug — stable across locales, used as the fallback slug and as a business-logic key (category checks, translation-key lookups). Not for building links. */
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
  /** Effective slug for the request's (country, language) — falls back to `name` when nothing's translated/overridden. Use this for links. */
  slug: string;
  /** Effective display name for the request's language — falls back to `label`. */
  localizedName: string;
  /** Effective description for the request's language — falls back to `description`. */
  localizedDescription: string | null;
  /** Resolved SEO copy (country+language override -> language translation); a null field still needs a generated fallback. */
  seo: ServiceSeoMeta;
  /** Every language/country this service has an explicit slug for — used to build hreflang alternates and sitemap entries. */
  locales: ServiceLocaleSlug[];
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

/**
 * Fills in the locale-resolution fields (slug/localizedName/localizedDescription/seo/locales)
 * on a hand-written offline fallback service — used where the UI falls back to static data
 * when the catalog API is unreachable, so those fallbacks don't need to fake a real locale
 * resolution: they just mirror their own base name/label/description with no SEO overrides.
 */
export function withLocaleDefaults(
  service: Omit<CatalogServiceDetail, "slug" | "localizedName" | "localizedDescription" | "seo" | "locales">,
): CatalogServiceDetail {
  return {
    ...service,
    slug: service.name,
    localizedName: service.label,
    localizedDescription: service.description,
    seo: { title: null, description: null, ogTitle: null, ogDescription: null },
    locales: [],
  };
}

export function getServices(country?: string | null, language?: string | null) {
  return apiFetch<CatalogService[]>("/catalog/services", { country, language });
}

export function getService(id: number, country?: string | null, language?: string | null) {
  return apiFetch<CatalogServiceDetail>(`/catalog/services/${id}`, { country, language });
}

/** `slug` may be the base English slug or a locale-specific (translated/overridden) one — the backend resolves either. */
export function getServiceBySlug(slug: string, country?: string | null, language?: string | null) {
  return apiFetch<CatalogServiceDetail>(
    `/catalog/services/by-slug/${encodeURIComponent(slug)}`,
    { country, language },
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

export interface CurrencyMeta {
  country: string;
  currency: string;
  code: string;
  symbol: string;
  thousandSeparator: string;
  decimalSeparator: string;
}

export function getCurrencies() {
  return apiFetch<CurrencyMeta[]>("/catalog/currencies");
}
