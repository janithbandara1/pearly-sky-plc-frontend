import { LanguageProvider } from "@/lib/i18n/language-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { CookieConsentBanner } from "@/components/cookie/cookie-consent-banner";
import { CrispChat } from "@/components/cookie/crisp-chat";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const language = await getRequestLanguage();

  return (
    <LanguageProvider language={language}>
      {children}
      <CookieConsentBanner />
      <CrispChat />
    </LanguageProvider>
  );
}
