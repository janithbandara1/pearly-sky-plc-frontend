import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { OurCustomersView } from "./our-customers-view";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const { title, description } = getCountryPageMeta("customers", country, language ?? "en");

  return {
    title,
    description,
    alternates: buildCountryAlternates("/our-customers", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default function OurCustomersPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Customers", path: "/our-customers" },
        ])}
      />
      <OurCustomersView />
    </>
  );
}
