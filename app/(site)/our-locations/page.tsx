import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { buildCountryAlternates, buildGlobalAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { OurLocationsView } from "./our-locations-view";
import PaymentMarquee from "@/components/payment-method-services";
import { GlobalLocations } from "@/components/global-home/global-locations";
import { WorldMap } from "@/components/global-home/world-map";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("ourLocations", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, alternates: buildGlobalAlternates("/our-locations", language),
      ...buildSocialMeta(title, description) };
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
      <BreadcrumbJsonLd items={[
          { name: "Home", path: "/" },
          { name: "Our Locations", path: "/our-locations" },
        ]} />
      {IS_GLOBAL_SITE ? (
        <GlobalLocations worldMap={<WorldMap />} />
      ) : (
        <>
          <OurLocationsView />
          <PaymentMarquee />
        </>
      )}
    </>
  );
}
