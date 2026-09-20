import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { OurLocationsView } from "./our-locations-view";
import PaymentMarquee from "@/components/payment-method-services";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const { title, description } = getCountryPageMeta("ourLocations", country, language ?? "en");

  return {
    title,
    description,
    alternates: buildCountryAlternates("/our-locations", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default function OurLocationsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/our-locations" },
        ])}
      />
      <OurLocationsView />
      <PaymentMarquee />
    </>
  );
}
