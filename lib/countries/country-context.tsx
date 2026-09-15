"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { COUNTRY_COOKIE_MAX_AGE, COUNTRY_COOKIE_NAME, defaultLanguageForCountry, type CountryCode } from "./config";
import { buildPrefixedPath, extractLocalePrefix } from "./geo";
import type { CountryMeta } from "./api";

type CountryContextType = {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  country: CountryCode | null;
  /** Writes the cookie (~30 days) and navigates to the equivalent path under `next`, resetting language to that country's default. */
  setCountry: (next: CountryCode) => void;
  /** Fetched server-side (see the (site)/(customer) layouts) — names/currencies for every supported country, for the switcher and similar UI. */
  countries: CountryMeta[];
};

const CountryContext = createContext<CountryContextType>({
  country: null,
  setCountry: () => {},
  countries: [],
});

export function CountryProvider({
  country,
  countries,
  children,
}: {
  country: CountryCode | null;
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
        document.cookie = `${COUNTRY_COOKIE_NAME}=${next}; path=/; max-age=${COUNTRY_COOKIE_MAX_AGE}; samesite=lax`;

        const locale = extractLocalePrefix(pathname);
        const unprefixedPath = locale && locale !== "invalid" ? locale.rest : pathname;
        const search = searchParams.toString();

        // Reset to the target country's default language rather than trying to
        // carry the current one over — most countries only offer "en" anyway,
        // and a France-only "fr" selection has no equivalent elsewhere.
        const nextPath = buildPrefixedPath(unprefixedPath, next, defaultLanguageForCountry(next));
        // Full page load (not router.push) — a soft navigation only clears the
        // client router cache, not Next's server-side fetch/data cache, so
        // switching country could still render the previous country's cached
        // data for a beat.
        window.location.href = `${nextPath}${search ? `?${search}` : ""}`;
      },
    }),
    [country, countries, pathname, searchParams],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export const useCountry = () => useContext(CountryContext);
