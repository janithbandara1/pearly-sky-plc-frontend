import { redirect } from "next/navigation";
import { poppins } from "../services/[serviceSlug]/service-booking-view";
import RequestDetailedQuotationPage from "./new-quotation-view";
import GoldStandardSection from "@/components/booking/booking new flow/gold-standard-section";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCachedServices, getServices, toHomeService } from "@/lib/catalog-api";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getRequestCountry } from "@/lib/countries/server";
import { unstable_cache } from "next/cache";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { getOurServicesContent } from "@/lib/content/our-services";
import { GlobalQuotationPage, type QuotationServiceOption } from "@/components/global-home/global-quotation-page";
import { CATEGORY_BY_SERVICE, serviceCardImage } from "@/components/global-home/services-catalog";
import { SERVICE_ORDER } from "@/components/global-home/services-order";

/** YYYY-MM-DD, `daysAhead` days from today (UTC). */
function isoDate(daysAhead: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}


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

export default async function page({
  searchParams,
}: {
  /** `service` — a base service name (e.g. "deep-cleaning") to preselect, as the global site's Book Now buttons pass; `country`/`city`/`postal` prefill the location the availability dialog collected. */
  searchParams: Promise<{ service?: string; country?: string; city?: string; postal?: string }>;
}){
  const getCachedServices = unstable_cache(
    (country: string | null, language: string | null) => getServices(country, language),
    ["home-services"],
    { revalidate: 60 },
  );
  const [country, language, { service, country: initialCountry, city: initialCity, postal: initialPostal }] = await Promise.all([getRequestCountry(), getRequestLanguage(), searchParams]);
  const services =  (await getCachedServices(country, language)).map(toHomeService);

  // The global gateway's own multi-service quotation portal: every quotable
  // service, titled and described from the Our Services copy in the
  // visitor's language, in the same order as the Our Services page.
  if (IS_GLOBAL_SITE) {
    const copyById = new Map(getOurServicesContent(language).services.map((copy) => [copy.id, copy]));
    const options: QuotationServiceOption[] = services
      .filter((s) => s.isQuotable && copyById.has(s.name))
      .sort((a, b) => SERVICE_ORDER.indexOf(a.name) - SERVICE_ORDER.indexOf(b.name))
      .map((s) => {
        const copy = copyById.get(s.name)!;
        return {
          id: s.id,
          name: s.name,
          title: copy.title,
          headline: copy.headline,
          image: serviceCardImage(s.name),
          category: CATEGORY_BY_SERVICE[s.name],
        };
      });
    return (
      <>
        <BreadcrumbJsonLd items={[
            { name: "Home", path: "/" },
            { name: "Request a Quotation", path: "/request-quotation" },
          ]} />
        <GlobalQuotationPage
          services={options}
          initialServiceName={service}
          initialLocation={{ country: initialCountry, city: initialCity, postalCode: initialPostal }}
          defaultDate={isoDate(1)}
          minDate={isoDate(0)}
        />
      </>
    );
  }

  const initialServiceId = services.find((s) => s.name === service)?.id;
  return(
    <>
    <BreadcrumbJsonLd items={[
              { name: "Home", path: "/" },
              { name: "Request a Detailed Quotation", path: "/request-quotation" },
            ]} />
     <RequestDetailedQuotationPage services={services} initialServiceId={initialServiceId}/>
     <GoldStandardSection/> 
    </> 
  )
 
}