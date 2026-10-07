import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { TERMS_AND_CONDITIONS } from "@/lib/content/legal/terms-and-conditions";
import { TermsAndConditionsContent } from "@/components/legal/terms-and-conditions-content";

const { title: TITLE } = STATIC_PAGE_META.termsAndConditions;

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/terms-and-conditions", { language }),
    ...buildSocialMeta(TITLE),
  };
}

export default async function TermsAndConditionsPage() {
  const language = (await getRequestLanguage()) ?? "en";
  const { title } = TERMS_AND_CONDITIONS[language];

  return (
    <main className="flex-1">
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: title, path: "/terms-and-conditions" },
        ]} />
      <PageHero hidePriceSelector image="/images/about/hero.webp" title={title} />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <TermsAndConditionsContent language={language} />
      </div>
    </main>
  );
}
