import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { STATIC_PAGE_META } from "@/lib/countries/meta-data";
import { PRIVACY_POLICY } from "@/lib/content/legal/privacy-policy";
import { LegalDocumentView } from "@/components/legal/legal-document";

const { title: TITLE } = STATIC_PAGE_META.privacyPolicy;

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();

  return {
    title: TITLE,
    alternates: buildCountryAlternates("/privacy-policy", { language }),
    ...buildSocialMeta(TITLE),
  };
}

export default async function PrivacyPolicyPage() {
  const language = (await getRequestLanguage()) ?? "en";
  const doc = PRIVACY_POLICY[language];

  return (
    <main className="flex-1">
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: doc.title, path: "/privacy-policy" },
        ]} />
      <PageHero image="/images/about/hero.webp" hidePriceSelector title={doc.title} />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
        <LegalDocumentView doc={doc} />
      </div>
    </main>
  );
}
