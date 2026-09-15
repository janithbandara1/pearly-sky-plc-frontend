import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { redirect } from "next/navigation";
import { RequestQuotationView } from "./request-quotation-view";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);
  const alternates = buildCountryAlternates(`/services/${serviceSlug}/request-quotation`, { country, language });

  try {
    const service = await getServiceBySlug(serviceSlug, country);
    const title = `Request a Quote — ${service.label} | Pearly Sky`;
    const description = `Request a free, no-obligation quote for ${service.label.toLowerCase()} with Pearly Sky's eco-luxury cleaning team.`;
    return { title, description, alternates, ...buildSocialMeta(title, description, service.imageUrl ?? undefined) };
  } catch {
    return { title: "Request a Quote | Pearly Sky", alternates };
  }
}

export default async function RequestQuotationPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  if (
    serviceSlug === "child-care-service" ||
    serviceSlug === "elder-care-service" ||
    serviceSlug === "carpet-upholstery-cleaning" ||
    serviceSlug === "pool-cleaning" ||
    serviceSlug === "precision-pressure-washing"
  ) {
    redirect(`/services/${serviceSlug}`);
  }

  const label = await getServiceBySlug(serviceSlug)
    .then((service) => service.label)
    .catch(() => serviceSlug);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: label, path: `/services/${serviceSlug}` },
          { name: "Request a Quotation", path: `/services/${serviceSlug}/request-quotation` },
        ])}
      />
      <RequestQuotationView serviceSlug={serviceSlug} />
      <JoinWithUsSection />
      <RelatedServices />
      <PaymentMarquee />
    </>
  );
}
