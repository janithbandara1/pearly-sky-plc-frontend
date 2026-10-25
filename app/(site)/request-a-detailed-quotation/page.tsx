import { redirect } from "next/navigation";
import { poppins } from "../services/[serviceSlug]/service-booking-view";
import RequestDetailedQuotationPage from "./new-quotation-view";
import GoldStandardSection from "@/components/booking/booking new flow/gold-standard-section";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCachedServices, getServices, toHomeService } from "@/lib/catalog-api";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getRequestCountry } from "@/lib/countries/server";
import { unstable_cache } from "next/cache";


const SERVICE_QUERY_MAP: Record<string, string> = {
  "standard-residential": "regular-home-cleaning",
  "regular-home-cleaning": "regular-home-cleaning",
  "regular-maintenance-cleaning": "regular-home-cleaning",
  "express-refresh": "essential-touch-up-cleaning",
  "essential-touch-up-cleaning": "essential-touch-up-cleaning",
  "quick-touch-up-cleaning": "essential-touch-up-cleaning",
  "last-minute": "same-day-priority-cleaning",
  "same-day-priority-cleaning": "same-day-priority-cleaning",
  "deep-cleaning": "deep-cleaning",
  "move-in-out": "end-of-tenancy-cleaning",
  "end-of-tenancy-cleaning": "end-of-tenancy-cleaning",
  "post-construction": "post-construction-renovation-cleaning",
  "post-construction-renovation-cleaning": "post-construction-renovation-cleaning",
  "airbnb-cleaning": "premium-rental-concierge-cleaning",
  "premium-rental-concierge-cleaning": "premium-rental-concierge-cleaning",
  "commercial-office": "commercial-office-cleaning",
  "commercial-office-cleaning": "commercial-office-cleaning",
  "steam-cleaning": "steam-cleaning",
  "post-event": "post-event-cleaning",
  "post-event-cleaning": "post-event-cleaning",
  "luxury-yacht": "luxury-yacht-cleaning",
  "luxury-yacht-cleaning": "luxury-yacht-cleaning",
};

/* 
export default async function RequestDetailedQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const targetSlug = (service && SERVICE_QUERY_MAP[service]) || "regular-home-cleaning";

  redirect(`/services/${targetSlug}/request-quotation`);
}
 */

export default async function page(){
  const getCachedServices = unstable_cache(
    (country: string | null, language: string | null) => getServices(country, language),
    ["home-services"],
    { revalidate: 60 },
  );
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const services =  (await getCachedServices(country, language)).map(toHomeService);
  return(
    <>
    <BreadcrumbJsonLd items={[
              { name: "Home", path: "/" },
              { name: "Request a Detailed Quotation", path: `/services/request-a-detailed-quotation` },
            ]} />
     <RequestDetailedQuotationPage services={services}/>
     <GoldStandardSection/> 
    </> 
  )
 
}