"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COUNTRY_COOKIE_MAX_AGE, COUNTRY_COOKIE_NAME, defaultLanguageForCountry, type CountryCode } from "./config";
import { buildPrefixedPath, extractLocalePrefix } from "./geo";

type CountryContextType = {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  country: CountryCode | null;
  /** Writes the cookie (~30 days) and navigates to the equivalent path under `next`, resetting language to that country's default. */
  setCountry: (next: CountryCode) => void;
};

const CountryContext = createContext<CountryContextType>({
  country: null,
  setCountry: () => {},
});

export function CountryProvider({
  country,
  children,
}: {
  country: CountryCode | null;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo<CountryContextType>(
    () => ({
      country,
      setCountry: (next) => {
        document.cookie = `${COUNTRY_COOKIE_NAME}=${next}; path=/; max-age=${COUNTRY_COOKIE_MAX_AGE}; samesite=lax`;

        const locale = extractLocalePrefix(pathname);
        const unprefixedPath = locale && locale !== "invalid" ? locale.rest : pathname;
        const search = searchParams.toString();

        // Reset to the target country's default language rather than trying to
        // carry the current one over — most countries only offer "en" anyway,
        // and a France-only "fr" selection has no equivalent elsewhere.
        const nextPath = buildPrefixedPath(unprefixedPath, next, defaultLanguageForCountry(next));
        router.push(`${nextPath}${search ? `?${search}` : ""}`);
        router.refresh();
      },
    }),
    [country, pathname, router, searchParams],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export const useCountry = () => useContext(CountryContext);
