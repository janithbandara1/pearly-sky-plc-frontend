"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "./api";
import { useCountry } from "./countries/country-context";

interface CurrencyMeta {
  country: string;
  currency: string;
  code: string;
  symbol: string;
  thousandSeparator: string;
  decimalSeparator: string;
}

type CurrencyContextType = {
  symbol: string;
  /** Formats a price with the current country's currency symbol; "" for null/invalid input. */
  formatPrice: (price: string | number | null | undefined) => string;
};

const DEFAULT_SYMBOL = "€";

function formatWith(symbol: string, price: string | number | null | undefined): string {
  if (price === null || price === undefined || price === "") return "";
  const value = typeof price === "number" ? price : Number(price);
  return Number.isFinite(value) ? `${symbol}${value.toFixed(2)}` : "";
}

const CurrencyContext = createContext<CurrencyContextType>({
  symbol: DEFAULT_SYMBOL,
  formatPrice: (price) => formatWith(DEFAULT_SYMBOL, price),
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { country } = useCountry();
  const [currencies, setCurrencies] = useState<CurrencyMeta[]>([]);

  useEffect(() => {
    apiFetch<CurrencyMeta[]>("/catalog/currencies")
      .then(setCurrencies)
      .catch(() => setCurrencies([]));
  }, []);

  const symbol = currencies.find((c) => c.country === country)?.symbol ?? DEFAULT_SYMBOL;

  return (
    <CurrencyContext.Provider value={{ symbol, formatPrice: (price) => formatWith(symbol, price) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
