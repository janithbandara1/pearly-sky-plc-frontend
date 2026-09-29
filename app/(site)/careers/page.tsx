import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_CAREERS_ENABLED, IS_GLOBAL_SITE } from "@/lib/countries/config";
import { CareersView } from "./careers-view";
import { NoCareersNotice } from "@/components/careers/no-careers-notice";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("careers", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, ...buildSocialMeta(title, description) };
  }

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
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
      {IS_CAREERS_ENABLED ? <CareersView /> : <NoCareersNotice />}
    </>
  );
}
