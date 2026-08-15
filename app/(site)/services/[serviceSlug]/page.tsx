import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/catalog-api";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { getServiceMeta } from "@/lib/countries/service-meta";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { ServiceBookingView } from "./service-booking-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const [{ serviceSlug }, country, language] = await Promise.all([params, getRequestCountry(), getRequestLanguage()]);
  const alternates = buildCountryAlternates(`/services/${serviceSlug}`, { country, language });
  const override = getServiceMeta(serviceSlug, country);

  try {
    const service = await getServiceBySlug(serviceSlug, country);
    const title = override?.title || `${service.label} | Pearly Sky`;
    const description =
      override?.description ||
      service.description ||
      `Book ${service.label} with Pearly Sky's eco-luxury cleaning team.`;
    return { title, description, alternates, ...buildSocialMeta(title, description, service.imageUrl ?? undefined) };
  } catch {
    return { title: "Services | Pearly Sky", alternates };
  }
}

export default async function ServiceDetailPage({
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
        ])}
      />
      <ServiceBookingView serviceSlug={serviceSlug} />
    </>
  );
}
