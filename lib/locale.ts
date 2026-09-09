import { COUNTRY_URL_SLUGS, type CountryCode } from "./countries/config";
import type { LanguageCode } from "./i18n/config";

/** Inserts a `/{slug}-{lang}` country directory prefix in front of an unprefixed path. */
export function buildLocalePath(pathname: string, country: CountryCode, language: LanguageCode): string {
  const prefix = `/${COUNTRY_URL_SLUGS[country]}-${language}`;
  return pathname === "/" ? prefix : `${prefix}${pathname}`;
}
