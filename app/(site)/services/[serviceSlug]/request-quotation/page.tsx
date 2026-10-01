import type { Metadata } from "next";
import { getServiceBySlug, type CatalogServiceDetail } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildServiceAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { notFound, permanentRedirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { buildLocalePath } from "@/lib/locale";
import { hasServicePage } from "@/lib/service-flows";
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
    const title = `Request a Quote — ${service.localizedName} | Pearly Sky`;
    const description = `Request a free, no-obligation quote for ${service.localizedName.toLowerCase()} with Pearly Sky's eco-luxury cleaning team.`;
    return { title, description, alternates, ...buildSocialMeta(title, description, service.imageUrl ?? undefined) };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    // Transient API failure: never let search engines index the generic fallback.
    return { title: "Request a Quote | Pearly Sky", robots: { index: false, follow: true } };
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

  if (
    canonicalSlug === "child-care-service" ||
    canonicalSlug === "elder-care-service" ||
    canonicalSlug === "carpet-upholstery-cleaning" ||
    canonicalSlug === "pool-cleaning" ||
    canonicalSlug === "precision-pressure-washing"
  ) {
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
      <RelatedServices />
      <PaymentMarquee />
    </>
  );
}
