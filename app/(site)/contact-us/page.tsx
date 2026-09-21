import type { Metadata } from "next";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getCountryPageMeta } from "@/lib/countries/meta-data";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { buildCountryAlternates, buildSocialMeta } from "@/lib/countries/seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/json-ld";
import { ContactUsView } from "./contact-us-view";
import PaymentMarquee from "@/components/payment-method-services";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const { title, description } = getCountryPageMeta("contact", language ?? "en");

  if (IS_GLOBAL_SITE) {
    return { title, description, ...buildSocialMeta(title, description) };
  }

  return {
    title,
    description,
    alternates: buildCountryAlternates("/contact-us", { language }),
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
      <h1 className="text-center mt-4 text-2xl font-semibold  text-[oklch(.379_.146_265.522)]">Support Payment Method</h1>
      <PaymentMarquee />
    </>
  );
}
