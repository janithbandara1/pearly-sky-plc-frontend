import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildServiceAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { redirect } from "next/navigation";
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
    const alternates = buildServiceAlternates(pathFor, service.name, service.locales, { country, language });
    const title = `Request a Quote — ${service.localizedName} | Pearly Sky`;
    const description = `Request a free, no-obligation quote for ${service.localizedName.toLowerCase()} with Pearly Sky's eco-luxury cleaning team.`;
    return { title, description, alternates, ...buildSocialMeta(title, description, service.imageUrl ?? undefined) };
  } catch {
    const alternates = buildCountryAlternates(`/services/${serviceSlug}/request-quotation`, { country, language });
    return { title: "Request a Quote | Pearly Sky", alternates };
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
  try {
    const service = await getServiceBySlug(serviceSlug, country, language);
    canonicalSlug = service.name;
    label = service.localizedName;
  } catch {
    // Unknown slug — fall through with the raw values; the quotation view's own fallback handles it.
  }

  if (
    canonicalSlug === "child-care-service" ||
    canonicalSlug === "elder-care-service" ||
    canonicalSlug === "carpet-upholstery-cleaning" ||
    canonicalSlug === "pool-cleaning" ||
    canonicalSlug === "precision-pressure-washing"
  ) {
    redirect(`/services/${serviceSlug}`);
  }

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: label, path: `/services/${serviceSlug}` },
          { name: "Request a Quotation", path: `/services/${serviceSlug}/request-quotation` },
        ])}
      />
      <RequestQuotationView serviceSlug={canonicalSlug} />
      <JoinWithUsSection />
      <RelatedServices />
      <PaymentMarquee />
    </>
  );
}
