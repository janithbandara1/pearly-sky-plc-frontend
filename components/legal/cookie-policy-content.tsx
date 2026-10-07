import type { LanguageCode } from "@/lib/i18n/config";
import { COOKIE_POLICY } from "@/lib/content/legal/cookie-policy";
import { LegalDocumentView } from "./legal-document";

/** Shared by the full `/cookie-policy` page and the cookie banner's policy modal — one source of truth for the copy. */
export function CookiePolicyContent({ language }: { language: LanguageCode }) {
  return <LegalDocumentView doc={COOKIE_POLICY[language]} />;
}
