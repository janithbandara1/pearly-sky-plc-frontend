import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { CookiePolicyContent } from "@/components/legal/cookie-policy-content";

const { title: TITLE } = STATIC_PAGE_META.cookiePolicy;

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/cookie-policy", { language }),
    ...buildSocialMeta(TITLE),
  };
}

export default function CookiePolicyPage() {
  return (
    <main className="flex-1">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookie-policy" },
        ])}
      />
      <PageHero hidePriceSelector image="/images/about/hero.webp" title="Cookie Policy" />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <CookiePolicyContent />
      </div>
    </main>
  );
}
