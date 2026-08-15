import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { RequestQuotationView } from "./request-quotation-view";

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
    </>
  );
}
