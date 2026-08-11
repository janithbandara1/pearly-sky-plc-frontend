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
          <SiteFooter />
        </LanguageProvider>
      </CurrencyProvider>
    </CountryProvider>
  );
}
