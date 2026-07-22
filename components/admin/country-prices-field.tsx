"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import type { ServicePriceInput } from "@/lib/admin-catalog-api";

const COUNTRY_LABELS: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lk: "Sri Lanka",
};

/** One price input per supported country, keyed by country code. */
export type CountryPricesForm = Record<CountryCode, string>;

export const EMPTY_COUNTRY_PRICES: CountryPricesForm = SUPPORTED_COUNTRIES.reduce(
  (acc, code) => ({ ...acc, [code]: "" }),
  {} as CountryPricesForm,
);

/** Converts an entry per country from the form back to the API's array shape ("" -> null, i.e. unset). */
export function toCountryPricesPayload(prices: CountryPricesForm): ServicePriceInput[] {
  return SUPPORTED_COUNTRIES.map((code) => ({
    country: code,
    price: prices[code].trim() === "" ? null : prices[code].trim(),
  }));
}

/** Converts the API's array shape back to per-country form state, for editing an existing record. */
export function fromCountryPricesPayload(prices: ServicePriceInput[]): CountryPricesForm {
  return SUPPORTED_COUNTRIES.reduce(
    (acc, code) => ({ ...acc, [code]: prices.find((p) => p.country === code)?.price ?? "" }),
    {} as CountryPricesForm,
  );
}

interface CountryPricesFieldProps {
  prices: CountryPricesForm;
  onChange: (prices: CountryPricesForm) => void;
  label?: string;
}

export function CountryPricesField({
  prices,
  onChange,
  label = "Price by country",
}: CountryPricesFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-4">
        {SUPPORTED_COUNTRIES.map((code) => (
          <div key={code} className="flex flex-col gap-1">
            <Label htmlFor={`price-${code}`} className="text-xs font-normal text-muted-foreground">
              {COUNTRY_LABELS[code]}
            </Label>
            <Input
              id={`price-${code}`}
              value={prices[code]}
              onChange={(e) => onChange({ ...prices, [code]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
