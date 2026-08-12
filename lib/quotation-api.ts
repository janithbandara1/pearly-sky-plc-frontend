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
  specialRequirements?: string;
  firstName: string;
  lastName?: string;
  email: string;
  contact: string;
  streetAddress: string;
  city: string;
  country?: string;
  postalCode?: string;
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
  streetAddress: string;
  city: string;
  country: string | null;
  postalCode: string | null;
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

/** Public — the reference number authenticates the request, so this works for guests too. */
export function getQuotationPdfUrl(id: number, referenceNumber: string) {
  return apiUrl(`/quotations/${id}/pdf?ref=${encodeURIComponent(referenceNumber)}`);
}

export interface QuotationStatusSummary {
  id: number;
  referenceNumber: string;
  service: { label: string };
  date: string | null;
  time: string | null;
}

/** Public — the reference number authenticates the request, so this works for guests too. */
export function getQuotationStatus(id: number, referenceNumber: string) {
  return apiFetch<QuotationStatusSummary>(
    `/quotations/${id}/status?ref=${encodeURIComponent(referenceNumber)}`,
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
