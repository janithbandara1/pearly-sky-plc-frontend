import type { CountryCode } from "./countries/config";
import type { LanguageCode } from "./i18n/config";

/** Inserts a `/country/language` prefix in front of an unprefixed path. */
export function buildLocalePath(pathname: string, country: CountryCode, language: LanguageCode): string {
  const prefix = `/${country}/${language}`;
  return pathname === "/" ? prefix : `${prefix}${pathname}`;
}
