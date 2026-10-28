import { getServices } from "@/lib/catalog-api";
import { createQuotation, type Quotation } from "@/lib/quotation-api";

export interface GlobalQuotationRequest {
  /** An Our Services id — the same string as the backend's base `Service.name`. */
  serviceName: string;
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
  propertySizeSqm?: number;
  date?: string;
  /** Anything the forms collect that has no column of its own (e.g. a size range, a message). */
  notes?: string;
  language: string;
}

/**
 * Saves a quote form's enquiry as a real quotation in the global gateway's own
 * backend (reference number, confirmation email + PDF, staff dashboard). The
 * forms only know the service's name, so its id is looked up in the gateway's
 * catalog — seeded quotable-only, with no prices (see backend seed-global.ts).
 */
export async function submitGlobalQuotation(request: GlobalQuotationRequest): Promise<Quotation> {
  const services = await getServices();
  const service = services.find(({ name }) => name === request.serviceName);
  if (!service) throw new Error(`Unknown service "${request.serviceName}"`);

  const [firstName, ...rest] = request.name.trim().split(/\s+/);
  return createQuotation({
    serviceId: service.id,
    firstName,
    lastName: rest.join(" ") || undefined,
    email: request.email,
    contact: request.phone,
    streetAddress: request.streetAddress,
    city: request.city,
    country: request.country,
    propertySizeSqm: request.propertySizeSqm,
    date: request.date || undefined,
    specialRequirements: request.notes || undefined,
    language: request.language,
  });
}
