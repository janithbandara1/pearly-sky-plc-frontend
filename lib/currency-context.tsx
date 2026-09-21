"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCountry } from "./countries/country-context";
import type { CurrencyMeta } from "./catalog-api";

type CurrencyContextType = {
  symbol: string;
  /** Formats a price with the current country's currency symbol; "" for null/invalid input. */
  formatPrice: (price: string | number | null | undefined) => string;
};

const DEFAULT_SYMBOL = "€";

/** Currency codes seeded in the catalog (`backend/src/database/seed.ts`) mapped to their display symbol. */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  GBP: "£",
  LKR: "Rs.",
};

/** For displaying a record's own stored currency (e.g. a booking/payment) rather than the viewer's current country — falls back to the code itself if unrecognized. */
export function symbolForCurrencyCode(code?: string | null): string {
  if (!code) return "";
  return CURRENCY_SYMBOLS[code.toUpperCase()] ?? code.toUpperCase();
}

function formatWith(symbol: string, price: string | number | null | undefined): string {
  if (price === null || price === undefined || price === "") return "";
  const value = typeof price === "number" ? price : Number(price);
  return Number.isFinite(value) ? `${symbol}${value.toFixed(2)}` : "";
}

const CurrencyContext = createContext<CurrencyContextType>({
  symbol: DEFAULT_SYMBOL,
  formatPrice: (price) => formatWith(DEFAULT_SYMBOL, price),
});

/** `currencies` is fetched server-side (see the (site)/(customer) layouts) so the
 * correct symbol is present in the initial render — including for crawlers, whose
 * renderer won't itself fetch `/catalog/currencies` since it's disallowed in robots.txt. */
export function CurrencyProvider({
  currencies,
  children,
}: {
  currencies: CurrencyMeta[];
  children: ReactNode;
}) {
  const { country } = useCountry();

  const symbol = currencies.find((c) => c.country === country)?.symbol ?? DEFAULT_SYMBOL;

  return (
    <CurrencyContext.Provider value={{ symbol, formatPrice: (price) => formatWith(symbol, price) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
