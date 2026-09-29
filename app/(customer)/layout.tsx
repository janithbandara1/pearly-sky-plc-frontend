import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CustomerBreadcrumb } from "@/components/customer/customer-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getCountries } from "@/lib/countries/api";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/translate";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { getCurrencies } from "@/lib/catalog-api";
import { SiteHeader } from "@/components/site-header";
import { CookieConsentBanner } from "@/components/cookie/cookie-consent-banner";
import { CrispChat } from "@/components/cookie/crisp-chat";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [country, language, countries, currencies] = await Promise.all([
    getRequestCountry(),
    getRequestLanguage(),
    getCountries().catch(() => []),
    getCurrencies().catch(() => []),
  ]);

  return (
    <CountryProvider country={country} countries={countries}>
      <LanguageProvider language={language} dictionary={getDictionary(language ?? "en")}>
        <CurrencyProvider currencies={currencies}>
          <SiteHeader />
          <div className="flex flex-1 flex-col p-4 md:p-6">
            <CustomerBreadcrumb />
            <div className="flex flex-1 flex-col gap-6 lg:flex-row">
              <CustomerSidebar />
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          </div>
          <SiteFooter />
          <CookieConsentBanner />
          <CrispChat />
        </CurrencyProvider>
      </LanguageProvider>
    </CountryProvider>
  );
}
