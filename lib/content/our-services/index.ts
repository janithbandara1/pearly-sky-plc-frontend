import type { LanguageCode } from "@/lib/i18n/config";
import type { OurServicesContent } from "./types";
import { en } from "./en";
import { fr } from "./fr";

const CONTENT: Record<LanguageCode, OurServicesContent> = { en, fr };

/**
 * Server-only: the /our-services copy in `language`. Picked on the server and
 * passed down as a prop so the browser only receives the one language it renders.
 */
export function getOurServicesContent(language: LanguageCode | null): OurServicesContent {
  return CONTENT[language ?? "en"];
}
