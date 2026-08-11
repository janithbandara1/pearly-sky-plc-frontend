import type { Metadata } from "next";
import { getRequestCountry } from "@/lib/countries/server";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/page-meta";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { ContactUsView } from "./contact-us-view";

export async function generateMetadata(): Promise<Metadata> {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const { title, description } = getCountryPageMeta("contact", country);

  return {
    title,
    description,
    alternates: buildCountryAlternates("/contact-us", { country, language }),
    ...buildSocialMeta(title, description),
  };
}

export default function ContactUsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <ContactUsView />
    </>
  );
}
