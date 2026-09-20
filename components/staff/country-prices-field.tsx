"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_COUNTRY, type CountryCode } from "@/lib/countries/config";
import type { ServicePriceInput } from "@/lib/admin-catalog-api";

const COUNTRY_LABELS: Record<CountryCode, string> = {
  fr: "France",
  gb: "United Kingdom",
  lk: "Sri Lanka",
};

/**
 * One price input, for this deployment's own country only. The underlying
 * shape stays keyed by CountryCode (a Record, not a single value) because
 * the backend's ServicePriceInput[] API is still a per-country array —
 * this deployment just only ever populates its own entry in it, since its
 * database only ever holds CURRENT_COUNTRY's data anyway.
 */
export type CountryPricesForm = Record<CountryCode, string>;

export const EMPTY_COUNTRY_PRICES: CountryPricesForm = {
  [CURRENT_COUNTRY]: "",
} as CountryPricesForm;

/** Converts the form entry back to the API's array shape ("" -> null, i.e. unset). */
export function toCountryPricesPayload(prices: CountryPricesForm): ServicePriceInput[] {
  const value = prices[CURRENT_COUNTRY]?.trim() ?? "";
  return [{ country: CURRENT_COUNTRY, price: value === "" ? null : value }];
}

/** Converts the API's array shape back to form state, for editing an existing record. */
export function fromCountryPricesPayload(prices: ServicePriceInput[]): CountryPricesForm {
  return {
    [CURRENT_COUNTRY]: prices.find((p) => p.country === CURRENT_COUNTRY)?.price ?? "",
  } as CountryPricesForm;
}

interface CountryPricesFieldProps {
  prices: CountryPricesForm;
  onChange: (prices: CountryPricesForm) => void;
  label?: string;
}

export function CountryPricesField({
  prices,
  onChange,
  label = "Hourly rate",
}: CountryPricesFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`price-${CURRENT_COUNTRY}`}>
        {label} ({COUNTRY_LABELS[CURRENT_COUNTRY]})
      </Label>
      <Input
        id={`price-${CURRENT_COUNTRY}`}
        className="max-w-[200px]"
        value={prices[CURRENT_COUNTRY] ?? ""}
        onChange={(e) => onChange({ ...prices, [CURRENT_COUNTRY]: e.target.value })}
      />
    </div>
  );
}
