import { officeLocations } from "@/lib/content/locations";
import type { CountryCode } from "./config";

const COUNTRY_CONTACT_EMAILS: Partial<Record<CountryCode, string>> = {
  fr: "contact@pearlysky.fr",
  gb: "contact@pearlysky.co.uk",
  lk: "contact@pearlysky.lk",
};

/** Falls back to the France office when country is null (unprefixed/global site). */
export function getCountryOffice(country: CountryCode | null) {
  const resolved = country ?? "fr";
  return officeLocations.find((office) => office.country === resolved) ?? officeLocations[0];
}

export function getWhatsappUrl(contactNo: string): string {
  return `https://wa.me/${contactNo.replace(/\D/g, "")}`;
}

/** Returns the local contact address when one is configured, otherwise the global inbox. */
export function getCountryContactEmail(country: CountryCode | null): string {
  return COUNTRY_CONTACT_EMAILS[country ?? "fr"] ?? "info@pearlyskyglobalclean.com";
}
