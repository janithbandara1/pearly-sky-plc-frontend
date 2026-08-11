import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { CareersView } from "./careers-view";

const TITLE = "Careers | Pearly Sky";
const DESCRIPTION = "Join the Pearly Sky team — explore open roles in eco-luxury cleaning, hospitality, and care services.";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildCountryAlternates("/careers", { country, language }),
    ...buildSocialMeta(TITLE, DESCRIPTION),
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
