import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { CareersView } from "./careers-view";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("careers", language ?? "en");

  return {
    title,
    description,
    alternates: buildCountryAlternates("/careers", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default function CareersPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <CareersView />
    </>
  );
}
