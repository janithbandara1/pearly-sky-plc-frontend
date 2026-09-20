import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { TermsAndConditionsContent } from "@/components/legal/terms-and-conditions-content";

const { title: TITLE } = STATIC_PAGE_META.termsAndConditions;

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/terms-and-conditions", { language }),
    ...buildSocialMeta(TITLE),
  };
}

export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms-and-conditions" },
        ])}
      />
      <PageHero hidePriceSelector image="/images/about/hero.webp" title="Terms and Conditions" />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <TermsAndConditionsContent />
      </div>
    </main>
  );
}
