import type { Metadata } from "next";
import { getServiceBySlug, getServiceSlugMap, type CatalogServiceDetail } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildServiceAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getQuoteMeta } from "@/lib/countries/service-meta";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { notFound, permanentRedirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { buildLocalePath } from "@/lib/locale";
import { hasServicePage, quotesOnServicePage } from "@/lib/service-flows";
import { RequestQuotationView } from "./request-quotation-view";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";

const pathFor = (slug: string) => `/services/${slug}/request-quotation`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  try {
    const service = await getServiceBySlug(serviceSlug, country, language);
    const alternates = buildServiceAlternates(pathFor, service.name, service.locales, { language });
    const { title, description } = getQuoteMeta(service.localizedName, language ?? "en");
    return { title, description, alternates, ...buildSocialMeta(title, description, service.imageUrl ?? undefined) };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    // Transient API failure: fail with a 5xx so crawlers retry, rather than
    // indexing (or noindexing) a generic fallback — see ../page.tsx.
    throw err;
  }
}

export default async function RequestQuotationPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);

  let canonicalSlug = serviceSlug;
  let label = serviceSlug;
  let localizedSlug: string | null = null;
  let service: CatalogServiceDetail | null = null;
  try {
    service = await getServiceBySlug(serviceSlug, country, language);
    canonicalSlug = service.name;
    label = service.localizedName;
    localizedSlug = service.slug;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    // Transient API failure — fall through with the raw values; the quotation view's own fallback handles it.
  }

  if (quotesOnServicePage(canonicalSlug)) {
    permanentRedirect(buildLocalePath(`/services/${localizedSlug ?? serviceSlug}`, language ?? "en"));
  }

  // Service takes no quotation requests: rather than a 200 form whose
  // submission the backend rejects (and that search engines index as a real
  // page), send the visitor to its Book Now page, or 404 when it has none —
  // the mirror of the booking page's check (see lib/service-flows.ts).
  if (service && !service.isQuotable) {
    if (hasServicePage(service)) {
      permanentRedirect(buildLocalePath(`/services/${service.slug}`, language ?? "en"));
    }
    notFound();
  }

  // Reached via a non-canonical slug for this language (e.g. the base
  // English slug, or another locale's slug) — 308 onto the current
  // language's own slug so the visible URL always matches what
  // buildServiceAlternates' canonical tag above claims.
  if (localizedSlug && localizedSlug !== serviceSlug) {
    permanentRedirect(buildLocalePath(`/services/${localizedSlug}/request-quotation`, language ?? "en"));
  }

  return (
    <>
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: label, path: `/services/${serviceSlug}` },
          { name: "Request a Quotation", path: `/services/${serviceSlug}/request-quotation` },
        ]} />
      <RequestQuotationView serviceSlug={canonicalSlug} />
      <JoinWithUsSection />
      <RelatedServices slugs={await getServiceSlugMap(country, language)} />
      <PaymentMarquee />
    </>
  );
}
