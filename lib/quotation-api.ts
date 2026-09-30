import { apiFetch, apiUrl } from "./api";
import type { BookingLineItem, BookingSupplySource } from "./booking-api";

export type QuotationStatus = "new" | "contacted" | "closed";

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
  numCleaners?: number;
  durationHours?: number;
  genderPreference?: string;
  languagePreference?: string;
  /** Current site language — the confirmation email/PDF are rendered in it. */
  language?: string;
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
  numCleaners: number | null;
  durationHours: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
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
