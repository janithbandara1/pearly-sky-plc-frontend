import type { LanguageCode } from "@/lib/i18n/config";
import { TERMS_AND_CONDITIONS } from "@/lib/content/legal/terms-and-conditions";
import { LegalDocumentView } from "./legal-document";

/** Shared by the full `/terms-and-conditions` page and the cookie banner's policy modal — one source of truth for the copy. */
export function TermsAndConditionsContent({ language }: { language: LanguageCode }) {
  return <LegalDocumentView doc={TERMS_AND_CONDITIONS[language]} />;
}
