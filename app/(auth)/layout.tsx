import { LanguageProvider } from "@/lib/i18n/language-context";
import { getRequestLanguage } from "@/lib/i18n/server";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const language = await getRequestLanguage();

  return <LanguageProvider language={language}>{children}</LanguageProvider>;
}
