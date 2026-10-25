import type { LanguageCode } from "../config";

const displayNames = new Map<LanguageCode, Intl.DisplayNames>();

/**
 * A country's name in `language`. English keeps the name written in the data
 * ("United States of America"); the other languages use the browser/runtime's
 * own region names via Intl.DisplayNames, keyed by the ISO code (the data's `flagCode`).
 */
export function localizedCountryName(country: { name: string; flagCode: string }, language: LanguageCode | null): string {
  if (!language || language === "en") return country.name;
  let names = displayNames.get(language);
  if (!names) {
    names = new Intl.DisplayNames([language], { type: "region" });
    displayNames.set(language, names);
  }
  try {
    return names.of(country.flagCode.toUpperCase()) ?? country.name;
  } catch {
    return country.name;
  }
}
