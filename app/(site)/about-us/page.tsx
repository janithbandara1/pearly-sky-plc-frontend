import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { AboutUsView } from "./about-us-view";
import { GlobalAbout } from "@/components/global-home/global-about";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("about", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("/about-us", language),
      ...buildSocialMeta(title, description) };
  }

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
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ]} />
      {IS_GLOBAL_SITE ? <GlobalAbout /> : <AboutUsView />}

    </>
  );
}
