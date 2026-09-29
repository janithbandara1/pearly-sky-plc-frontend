import { StaffAuthProvider } from "@/lib/staff-auth-context";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n/translate";
import { LanguageProvider } from "@/lib/i18n/language-context";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const language = await getRequestLanguage();

  return (
    <LanguageProvider language={language} dictionary={getDictionary(language ?? "en")}>
      <StaffAuthProvider>{children}</StaffAuthProvider>
    </LanguageProvider>
  );
}
