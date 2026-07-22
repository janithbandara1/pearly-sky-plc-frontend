import { apiFetch } from "@/lib/api";
import type { CountryCode } from "./config";

export interface CountryMeta {
  code: CountryCode;
  name: string;
  currency: string;
  language: string;
}

/** Metadata (name/currency/language) lives on the backend so it isn't duplicated here too. */
export function getCountries() {
  return apiFetch<CountryMeta[]>("/countries");
}
