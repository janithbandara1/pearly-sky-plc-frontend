import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { COOKIE_POLICY } from "@/lib/content/legal/cookie-policy";
import { CookiePolicyContent } from "@/components/legal/cookie-policy-content";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = STATIC_PAGE_META.cookiePolicy[language ?? "en"];

  return {
    title,
    description,
    alternates: buildCountryAlternates("/cookie-policy", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function CookiePolicyPage() {
  const language = (await getRequestLanguage()) ?? "en";
  const { title } = COOKIE_POLICY[language];

  return (
    <main className="flex-1">
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: title, path: "/cookie-policy" },
        ]} />
      <PageHero hidePriceSelector image="/images/about/hero.webp" title={title} />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <CookiePolicyContent language={language} />
      </div>
    </main>
  );
}
