import { officeLocations } from "@/lib/content/locations";
import type { CountryCode } from "./config";

/** Falls back to the France office when country is null (unprefixed/global site). */
export function getCountryOffice(country: CountryCode | null) {
  const resolved = country ?? "fr";
  return officeLocations.find((office) => office.country === resolved) ?? officeLocations[0];
}

export function getWhatsappUrl(contactNo: string): string {
  return `https://wa.me/${contactNo.replace(/\D/g, "")}`;
}
