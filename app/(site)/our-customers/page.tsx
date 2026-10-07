import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { OurCustomersView } from "./our-customers-view";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("customers", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("/our-customers", language),
      ...buildSocialMeta(title, description) };
  }

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
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Our Customers", path: "/our-customers" },
        ]} />
      <OurCustomersView />
    </>
  );
}
