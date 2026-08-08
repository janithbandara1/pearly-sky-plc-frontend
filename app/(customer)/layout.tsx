import { CustomerDashboardShell } from "@/components/customer/customer-dashboard-shell";
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
          <CustomerDashboardShell>{children}</CustomerDashboardShell>
        </LanguageProvider>
      </CurrencyProvider>
    </CountryProvider>
  );
}
