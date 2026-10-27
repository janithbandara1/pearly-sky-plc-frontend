import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GlobalHeader } from "@/components/global-home/global-header";
import { GlobalFooter } from "@/components/global-home/global-footer";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { JsonLd } from "@/components/json-ld";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getCountries } from "@/lib/countries/api";
import { getRequestLanguage } from "@/lib/i18n/server";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { getCurrencies } from "@/lib/catalog-api";
import { getCountryOffice } from "@/lib/countries/office";
import { buildLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import RelatedServices from "@/components/services-links";
import PaymentMarquee from "@/components/payment-method-services";
import { CookieConsentBanner } from "@/components/cookie/cookie-consent-banner";
import { CrispChat } from "@/components/cookie/crisp-chat";

import { PoolThemeProvider } from "@/lib/pool-theme-context";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [country, language, countries, currencies] = await Promise.all([
    getRequestCountry(),
    getRequestLanguage(),
    getCountries().catch(() => []),
    getCurrencies().catch(() => []),
  ]);
  const office = getCountryOffice(country);

  return (
    <CountryProvider country={country} countries={countries}>
      <CurrencyProvider currencies={currencies}>
        <LanguageProvider language={language}>
          <PoolThemeProvider>
            <JsonLd data={buildLocalBusinessJsonLd(office, country ?? "fr")} />
            {IS_GLOBAL_SITE ? <GlobalHeader /> : <SiteHeader />}
            <div className="flex flex-1 flex-col">{children}</div>
            {/* <JoinWithUsSection />
            <RelatedServices />
            <PaymentMarquee /> */}
            {IS_GLOBAL_SITE ? <GlobalFooter /> : <SiteFooter />}
            <CookieConsentBanner />
            <CrispChat />
          </PoolThemeProvider>
        </LanguageProvider>
      </CurrencyProvider>
    </CountryProvider>
  );
}
