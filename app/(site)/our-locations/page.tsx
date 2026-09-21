import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { OurLocationsView } from "./our-locations-view";
import PaymentMarquee from "@/components/payment-method-services";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";

export async function generateMetadata(): Promise<Metadata> {
  
  if (IS_GLOBAL_SITE) {
           
    const {title,description} = GLOBAL_META.ourLocation;
    
    return {
      title: title,
      description: description,
      ...buildSocialMeta(title, description),
    };
  }
  
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("ourLocations", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, ...buildSocialMeta(title, description) };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/our-locations", { language }),
    ...buildSocialMeta(title, description),
  };
}

export default function OurLocationsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/our-locations" },
        ])}
      />
      <OurLocationsView />
      <PaymentMarquee />
    </>
  );
}
