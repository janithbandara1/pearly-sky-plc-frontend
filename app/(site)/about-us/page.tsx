import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta, GLOBAL_META } from "@/lib/countries/meta-data";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { AboutUsView } from "./about-us-view";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";

export async function generateMetadata(): Promise<Metadata> {


    if (IS_GLOBAL_SITE) {
       
      const {title,description} = GLOBAL_META.aboutUs;
      
      return {
        title: title,
        description: description,
        ...buildSocialMeta(title, description),
      };
    }

  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("about", language ?? "en");

  return {
    title,
    description,
    alternates: buildCountryAlternates("/about-us", { language }),
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
