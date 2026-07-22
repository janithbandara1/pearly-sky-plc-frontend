"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COUNTRY_COOKIE_MAX_AGE, COUNTRY_COOKIE_NAME, type CountryCode } from "./config";
import { buildPrefixedPath, extractCountryPrefix } from "./geo";

type CountryContextType = {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  country: CountryCode | null;
  /** Writes the cookie (~30 days) and navigates to the equivalent path under `next`. */
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

        const prefixed = extractCountryPrefix(pathname);
        const unprefixedPath = prefixed ? prefixed.rest : pathname;
        const search = searchParams.toString();

        router.push(`${buildPrefixedPath(unprefixedPath, next)}${search ? `?${search}` : ""}`);
        router.refresh();
      },
    }),
    [country, pathname, router, searchParams],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export const useCountry = () => useContext(CountryContext);
