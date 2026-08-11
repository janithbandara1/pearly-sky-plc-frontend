import { CustomerHeader } from "@/components/customer/customer-header";
import { SiteFooter } from "@/components/site-footer";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { CurrencyProvider } from "@/lib/currency-context";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return (
    <CountryProvider country={country}>
      <CurrencyProvider>
        <LanguageProvider language={language}>
          <CustomerHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
          <SiteFooter />
        </LanguageProvider>
      </CurrencyProvider>
    </CountryProvider>
  );
}
