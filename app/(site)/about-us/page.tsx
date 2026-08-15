import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { AboutUsView } from "./about-us-view";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const { title, description } = getCountryPageMeta("about", country);

  return {
    title,
    description,
    alternates: buildCountryAlternates("/about-us", { country, language }),
    ...buildSocialMeta(title, description),
  };
}

export default function AboutUsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />
      <AboutUsView />
    </>
  );
}
