import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CustomerBreadcrumb } from "@/components/customer/customer-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { SiteHeader } from "@/components/site-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return (
    <CountryProvider country={country}>
      <LanguageProvider language={language}>
        <CurrencyProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col p-4 md:p-6">
            <CustomerBreadcrumb />
            <div className="flex flex-1 flex-col gap-6 lg:flex-row">
              <CustomerSidebar />
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          </div>
          <SiteFooter />
        </CurrencyProvider>
      </LanguageProvider>
    </CountryProvider>
  );
}
