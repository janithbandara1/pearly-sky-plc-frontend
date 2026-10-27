import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getServiceBySlug, getServiceSlugMap, type CatalogServiceDetail, type ServiceLocaleSlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildServiceAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getServiceMeta } from "@/lib/countries/service-meta";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { buildLocalePath } from "@/lib/locale";
import { hasServicePage } from "@/lib/service-flows";
import { ServiceBookingView } from "./service-booking-view";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";
import GoldStandardSection from "@/components/booking/booking new flow/gold-standard-section";
import { usePoolTheme } from "@/lib/pool-theme-context";

const pathFor = (slug: string) => `/services/${slug}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  try {
    const service = await getServiceBySlug(serviceSlug, country, language);
    const alternates = buildServiceAlternates(pathFor, service.name, service.locales, { language });
    // Approved per-language copy in service-meta.ts, then the catalog API's
    // country+language override / translation SEO copy, then a plain
    // generated fallback.
    const approved = getServiceMeta(service.name, language ?? "en");
    const title = approved?.title || service.seo.title || `${service.localizedName} | Pearly Sky`;
    const description =
      approved?.description ||
      service.seo.description ||
      service.localizedDescription ||
      `Book ${service.localizedName} with Pearly Sky's eco-luxury cleaning team.`;
    const ogTitle = service.seo.ogTitle || title;
    const ogDescription = service.seo.ogDescription || description;
    return { title, description, alternates, ...buildSocialMeta(ogTitle, ogDescription, service.imageUrl ?? undefined) };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    // Transient API failure: fail the request (5xx) rather than serve a
    // generic "Services | Pearly Sky" page. A 200 with that title is what
    // got indexed for every service, and a noindex would drop the page from
    // the index outright; a 5xx makes crawlers retry and keep the last good copy.
    throw err;
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  // The booking view's internal logic (content lookups, category checks) is
  // keyed by the base English slug, not whatever locale-specific slug the
  // URL used — so it always gets `service.name`, never the raw `serviceSlug`.
  let canonicalSlug = serviceSlug;
  let label = serviceSlug;
  let localizedSlug: string | null = null;
  let locales: ServiceLocaleSlug[] = [];
  let service: CatalogServiceDetail | null = null;
  try {
    service = await getServiceBySlug(serviceSlug, country, language);
    canonicalSlug = service.name;
    label = service.localizedName;
    localizedSlug = service.slug;
    locales = service.locales;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    // Transient API failure — fall through with the raw values; the booking view's own fallback handles it.
  }

  // No Book Now flow for this service (e.g. laundry-service): rather than a
  // 200 "Book now … isn't available yet" page that search engines index as
  // a real page, send the visitor (and crawler) to the quotation form, or
  // 404 when the service takes neither bookings nor quotations. Checked
  // before the slug fix-up below so an old link reaches the form in one hop.
  if (service && !hasServicePage(service)) {
    if (service.isQuotable) {
      permanentRedirect(buildLocalePath(`/services/${service.slug}/request-quotation`, language ?? "en"));
    }
    notFound();
  }

  // Reached via a non-canonical slug for this language (e.g. the base
  // English slug, or another locale's slug shared by an old link/bookmark)
  // — 308 onto the current language's own slug so the visible URL always
  // matches what buildServiceAlternates' canonical tag above claims.
  if (localizedSlug && localizedSlug !== serviceSlug) {
    permanentRedirect(buildLocalePath(`/services/${localizedSlug}`, language ?? "en"));
  }
  
  return (
    <>
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: label, path: `/services/${serviceSlug}` },
        ]} />
      <ServiceBookingView serviceSlug={canonicalSlug} locales={locales} initialService={service} />
      <GoldStandardSection/>
      <RelatedServices slugs={await getServiceSlugMap(country, language)} />
      <PaymentMarquee />
      
    </>
  );
}
