import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { OurLocationsView } from "./our-locations-view";

const TITLE = "Our Locations | Pearly Sky";
const DESCRIPTION =
  "Explore Pearly Sky's eco-luxury cleaning and transport services across France, the United Kingdom, Sri Lanka, and beyond.";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildCountryAlternates("/our-locations", { country, language }),
    ...buildSocialMeta(TITLE, DESCRIPTION),
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
    </>
  );
}
