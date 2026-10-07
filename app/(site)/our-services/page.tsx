import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCountryPageMeta, GLOBAL_META } from "@/lib/countries/meta-data";
import PaymentMarquee from "@/components/payment-method-services";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import ServicesDetailsPage from "./our-services-section";
import { getOurServicesContent } from "@/lib/content/our-services";



export async function generateMetadata(): Promise<Metadata> {
  const title = "Our Services | Pearly Sky Eco-Luxury Cleaning";
  const description = "Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services.";
  const language = await getRequestLanguage();

  if (IS_GLOBAL_SITE) {
    return {
      title,
      description,
      alternates: buildGlobalAlternates("/our-services", language),
      ...buildSocialMeta(title, description),
    };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/our-services", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default async function OurServicesPage() {
  const content = getOurServicesContent(await getRequestLanguage());

  return (
    <>
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/our-services" },
        ]} />
      <div className="overflow-hidden">
            <ServicesDetailsPage content={content} />
      </div>   
      <PaymentMarquee />
    </>
  );
}
