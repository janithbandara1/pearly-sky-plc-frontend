"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { COUNTRY_DOMAINS, defaultLanguageForCountry, type CountryCode } from "./config";
import { buildLocalePath, extractLocalePrefix } from "@/lib/locale";
import type { CountryMeta } from "./api";

type CountryContextType = {
  /** This deployment's fixed country (see CURRENT_COUNTRY in ./config) — always set, never null. */
  country: CountryCode;
  /**
   * Navigates to `next`'s own domain — under the per-country-domain
   * architecture, "switching country" means leaving this site entirely for
   * a sibling deployment, not changing state on this one. Resets to that
   * country's default language rather than trying to carry the current one
   * over, since most countries only offer "en" anyway.
   */
  setCountry: (next: CountryCode) => void;
  /** Fetched server-side (see the (site)/(customer) layouts) — names/currencies for every supported country, for the switcher and similar UI. */
  countries: CountryMeta[];
};

const CountryContext = createContext<CountryContextType>({
  country: "fr",
  setCountry: () => {},
  countries: [],
});

export function CountryProvider({
  country,
  countries,
  children,
}: {
  country: CountryCode;
  countries: CountryMeta[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo<CountryContextType>(
    () => ({
      country,
      countries,
      setCountry: (next) => {
        if (next === country) return;

        const locale = extractLocalePrefix(pathname);
        const unprefixedPath = locale && locale !== "invalid" ? locale.rest : pathname;
        const search = searchParams.toString();
        const target = `${COUNTRY_DOMAINS[next]}${buildLocalePath(unprefixedPath, defaultLanguageForCountry(next))}`;

        window.location.href = `${target}${search ? `?${search}` : ""}`;
      },
    }),
    [country, countries, pathname, searchParams],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export const useCountry = () => useContext(CountryContext);
