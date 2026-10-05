import type { SizeQuote } from "@/lib/catalog-api";

/**
 * "Deep Clean" option on the steam/sanitization/post-construction booking
 * flow — raises the hourly rate by 40%. Must match DEEP_CLEAN_MULTIPLIER in
 * the backend's bookings.service.ts, which prices the booking for checkout.
 */
export const DEEP_CLEAN_MULTIPLIER = 1.4;

/** The size quote with Deep Clean applied to its price range (hours/crew are unchanged). */
export function applyDeepCleanToQuote(quote: SizeQuote | null, deepClean: boolean): SizeQuote | null {
  if (!quote || !deepClean) return quote;
  return {
    ...quote,
    priceMin: quote.priceMin != null ? quote.priceMin * DEEP_CLEAN_MULTIPLIER : quote.priceMin,
    priceMax: quote.priceMax != null ? quote.priceMax * DEEP_CLEAN_MULTIPLIER : quote.priceMax,
  };
}

/** The service's hourly rate (the "due at booking" amount) with Deep Clean applied. */
export function applyDeepCleanToRate(rate: string | null, deepClean: boolean): string | null {
  if (rate == null || !deepClean || !Number.isFinite(Number(rate))) return rate;
  return (Number(rate) * DEEP_CLEAN_MULTIPLIER).toFixed(2);
}
