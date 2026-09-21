import { FR, GB, LK } from "country-flag-icons/react/3x2";
import type { CountryCode } from "@/lib/countries/config";

// The switcher component that used to live here was removed — each
// deployment is now a single country's own site (see CURRENT_COUNTRY in
// lib/countries/config.ts), so there's no other country to switch to
// in-app anymore. These two lookup tables stay, since other components
// (phone-input.tsx, page-hero.tsx, the checkout/quotation forms) still use
// them to display this deployment's own country's name/flag.

export const FALLBACK_COUNTRY_NAMES: Record<CountryCode, string> = {
  fr: "France",
  gb: "United Kingdom",
  lk: "Sri Lanka",
};

export const COUNTRY_FLAGS: Record<CountryCode, typeof FR> = {
  fr: FR,
  gb: GB,
  lk: LK,
};
