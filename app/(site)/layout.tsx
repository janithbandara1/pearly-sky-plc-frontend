import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getRequestCountry } from "@/lib/countries/server";
import { CountryProvider } from "@/lib/countries/country-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { LanguageProvider } from "@/lib/i18n/language-context";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [country, language] = await Promise.all([getRequestCountry(), getRequestLanguage()]);

  return (
    <CountryProvider country={country}>
      <LanguageProvider language={language}>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </LanguageProvider>
    </CountryProvider>
  );
}
