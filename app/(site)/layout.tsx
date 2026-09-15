import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { getCountryOffice } from "@/lib/countries/office";
import { buildLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";
import { CookieConsentBanner } from "@/components/cookie/cookie-consent-banner";
import { CrispChat } from "@/components/cookie/crisp-chat";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);
  const office = getCountryOffice(country);

  return (
    <CountryProvider country={country}>
      <CurrencyProvider>
        <LanguageProvider language={language}>
          <JsonLd data={buildLocalBusinessJsonLd(office, country ?? "fr")} />
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          {/* <JoinWithUsSection />
          <RelatedServices />
          <PaymentMarquee /> */}
          <SiteFooter />
          <CookieConsentBanner />
          <CrispChat />
        </LanguageProvider>
      </CurrencyProvider>
    </CountryProvider>
  );
}
