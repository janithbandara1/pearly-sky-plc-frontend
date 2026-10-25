import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import { buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { GlobalServicesPage } from "@/components/global-home/global-services-page";
import { getOurServicesContent } from "@/lib/content/our-services";

// Global-gateway-only page: the country sites redirect it to their home page
// (see GLOBAL_SITE_ONLY_PATHS in proxy.ts) and list services in the header's
// services menu instead.

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const t = getGlobalTranslator(language);
  const title = t("svc.metaTitle");
  const description = t("svc.metaDescription");

  return {
    title,
    description,
    alternates: buildGlobalAlternates("/our-services", language),
    ...buildSocialMeta(title, description),
  };
}

export default async function OurServicesPage() {
  if (!IS_GLOBAL_SITE) notFound();

  const content = getOurServicesContent(await getRequestLanguage());
  // The quote form's enquiry is read by the team, so it always carries the English service name.
  const englishTitles = Object.fromEntries(getOurServicesContent("en").services.map(({ id, title }) => [id, title]));

  return (
    <>
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/our-services" },
        ]} />
      <GlobalServicesPage content={content} englishTitles={englishTitles} />
    </>
  );
}
