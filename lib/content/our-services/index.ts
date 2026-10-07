import type { LanguageCode } from "@/lib/i18n/config";
import type { OurServicesContent } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import { es } from "./es";
import { it } from "./it";

const CONTENT: Record<LanguageCode, OurServicesContent> = { en, fr, de, es, it };

/**
 * Server-only: the /our-services copy in `language`. Picked on the server and
 * passed down as a prop so the browser only receives the one language it renders.
 */
export function getOurServicesContent(language: LanguageCode | null): OurServicesContent {
  return CONTENT[language ?? "en"];
}
