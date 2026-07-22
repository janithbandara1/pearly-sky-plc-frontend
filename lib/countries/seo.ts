import type { Metadata } from "next";
import { SUPPORTED_COUNTRIES } from "./config";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { buildLocalePath } from "@/lib/locale";

/**
 * Builds the `alternates.languages` block for a given unprefixed path
 * (e.g. "/about"), telling search engines the /fr/en, /fr/fr, /de/en, ...
 * versions are alternates of the same page (not duplicate content) and
 * that the unprefixed path is the version to serve when no country
 * matches ("x-default").
 *
 * Requires `metadataBase` to be set (done in the root layout) since these
 * are relative paths — see the Next.js metadata docs.
 */
export function buildCountryAlternates(pathname: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = { "x-default": pathname };

  for (const country of SUPPORTED_COUNTRIES) {
    for (const language of SUPPORTED_LANGUAGES) {
      languages[`${language}-${country.toUpperCase()}`] = buildLocalePath(pathname, country, language);
    }
  }

  return { languages };
}
