import type { AttachmentLink, AttachmentRef } from "./upload-api";
import { apiFetch, apiUrl } from "./api";
import type { BookingLineItem, BookingRoom, BookingSupplySource } from "./booking-api";

export type QuotationStatus = "new" | "contacted" | "closed";

export type ContactChannel = "whatsapp" | "phone" | "email";

/** One requested service on a multi-service quotation (global gateway). */
export interface QuotationServiceLineInput {
  serviceId: number;
  numCleaners: number;
  durationHours: number;
  /** Omitted for personal-support services. */
  propertySizeSqm?: number;
  upholsteryPreset?: string;
}

/** As stored — with the service's name/label snapshotted at request time. */
export interface QuotationServiceLine {
  serviceId: number;
  name: string;
  label: string;
  numCleaners: number;
  durationHours: number;
  propertySizeSqm: number | null;
  upholsteryPreset: string | null;
}

export interface QuotationSupplyLineInput {
  name: string;
  quantity: number;
  unit: string;
  /** Chemicals only. */
  concentration?: string;
  msds: boolean;
}

/** One requested equipment/chemical supply — unpriced. */
export interface QuotationSupplyLine {
  name: string;
  quantity: number;
  unit: string;
  concentration: string | null;
  msds: boolean;
}

export interface CreateQuotationPayload {
  serviceId: number;
  date?: string;
  time?: string;
  propertyType?: string;
  propertySizeSqm?: number;
  quoteItemsTitle?: string;
  quoteItems?: string[];
  supplySource?: BookingSupplySource;
  equipmentItems?: BookingLineItem[];
  /** Pricing country (e.g. "FR") — the backend records the equipment prices in its currency. */
  pricingCountry?: string;
  /** Room-component services only — `key` is a RoomKey (e.g. "bedrooms"). */
  rooms?: BookingRoom[];
  /** Selected service frequency id (e.g. "weekly"). */
  frequency?: string;
  /** The service's Service Category tab id (e.g. "residential", "yatch-cleaning"). */
  serviceCategory?: string;
  /** steam-cleaning / healthguard-sanitization / post-construction only. */
  deepClean?: boolean;
  /** steam-cleaning / healthguard-sanitization / post-construction only — hospital-grade disinfection. */
  disinfection?: boolean;
  numCleaners?: number;
  durationHours?: number;
  genderPreference?: string;
  languagePreference?: string;
  /** Current site language — the confirmation email/PDF are rendered in it. */
  language?: string;
  /** Files uploaded at checkout / on the quotation form (see lib/upload-api.ts). */
  attachments?: AttachmentRef[];
  /** Several services at once (global gateway) — `serviceId` must be the first line's. */
  serviceLines?: QuotationServiceLineInput[];
  supplyLines?: QuotationSupplyLineInput[];
  preferredContactChannel?: ContactChannel;
  specialRequirements?: string;
  howGetIn?: string;
  howHeard?: string;
  firstName: string;
  lastName?: string;
  email: string;
  contact: string;
  streetAddress: string;
  unit?: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  /** Laundry / move-in-out transport quotations only — a separate delivery address alongside the address above. */
  deliveryStreetAddress?: string;
  deliveryUnit?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryCountry?: string;
  deliveryPostalCode?: string;
}

export interface QuotationServiceRef {
  id: number;
  label: string;
  name: string;
}

export interface QuotationCustomer {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  contact: string | null;
}

export interface Quotation {
  /** Files attached at checkout, with short-lived open links (detail endpoints only). */
  attachmentLinks?: AttachmentLink[];
  id: number;
  customerId: number;
  serviceId: number;
  referenceNumber: string;
  /** High-entropy capability token for the public status/PDF endpoints — never referenceNumber, which is guessable. */
  accessToken: string;
  status: QuotationStatus;
  date: string | null;
  time: string | null;
  propertyType: string | null;
  propertySizeSqm: number | null;
  quoteItemsTitle: string | null;
  quoteItems: string[] | null;
  supplySource: string | null;
  equipmentItems: BookingLineItem[] | null;
  /** Currency code the equipment prices were quoted in (e.g. "EUR"); null on older quotations. */
  currency: string | null;
  rooms: BookingRoom[] | null;
  frequency: string | null;
  serviceCategory: string | null;
  deepClean: boolean;
  disinfection: boolean;
  numCleaners: number | null;
  durationHours: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  /** Multi-service quotations only (global gateway); null otherwise. */
  serviceLines: QuotationServiceLine[] | null;
  supplyLines: QuotationSupplyLine[] | null;
  preferredContactChannel: ContactChannel | null;
  specialRequirements: string | null;
  howGetIn: string | null;
  howHeard: string | null;
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  deliveryStreetAddress: string | null;
  deliveryUnit: string | null;
  deliveryCity: string | null;
  deliveryState: string | null;
  deliveryCountry: string | null;
  deliveryPostalCode: string | null;
  service: QuotationServiceRef;
  customer?: QuotationCustomer;
  createdAt: string;
}

export function createQuotation(payload: CreateQuotationPayload) {
  return apiFetch<Quotation>("/quotations", { method: "POST", body: payload });
}

export function listMyQuotations(accessToken: string) {
  return apiFetch<Quotation[]>("/quotations", { accessToken });
}

export function getMyQuotation(accessToken: string, id: number) {
  return apiFetch<Quotation>(`/quotations/${id}`, { accessToken });
}

/** Public — the access token authenticates the request, so this works for guests too. */
export function getQuotationPdfUrl(id: number, accessToken: string, language?: string) {
  const lang = language ? `&lang=${encodeURIComponent(language)}` : "";
  return apiUrl(`/quotations/${id}/pdf?ref=${encodeURIComponent(accessToken)}${lang}`);
}

export interface QuotationStatusSummary {
  id: number;
  referenceNumber: string;
  status: QuotationStatus;
  service: { label: string };
  date: string | null;
  time: string | null;
  numCleaners: number | null;
  streetAddress: string;
  city: string;
  deliveryStreetAddress: string | null;
  deliveryCity: string | null;
}

/** Public — the access token authenticates the request, so this works for guests too. */
export function getQuotationStatus(id: number, accessToken: string) {
  return apiFetch<QuotationStatusSummary>(
    `/quotations/${id}/status?ref=${encodeURIComponent(accessToken)}`,
  );
}

export function listAllQuotationsAdmin(accessToken: string) {
  return apiFetch<Quotation[]>("/admin/quotations", { accessToken });
}

export function getQuotationAdmin(accessToken: string, id: number) {
  return apiFetch<Quotation>(`/admin/quotations/${id}`, { accessToken });
}

export function updateQuotationAdmin(
  accessToken: string,
  id: number,
  payload: { status: QuotationStatus },
) {
  return apiFetch<Quotation>(`/admin/quotations/${id}`, {
    method: "PATCH",
    accessToken,
    body: payload,
  });
}
