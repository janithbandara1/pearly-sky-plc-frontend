import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { OurCustomersView } from "./our-customers-view";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("customers", language ?? "en");

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
