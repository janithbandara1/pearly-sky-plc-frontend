import { unstable_cache } from "next/cache";
import { apiFetch } from "@/lib/api";
import type { CountryCode } from "./config";

export interface CountryMeta {
  code: CountryCode;
  name: string;
  currency: string;
  language: string;
}

/**
 * Metadata (name/currency/language) lives on the backend so it isn't duplicated here too.
 * Cached because this is fetched uncached-otherwise on every request in both the (site)
 * and (customer) layouts — i.e. every page on the site — which floods the backend's
 * shared loopback-IP rate limit (see lib/api.ts, app/(site)/page.tsx).
 */
export const getCountries = unstable_cache(
  () => apiFetch<CountryMeta[]>("/countries"),
  ["countries"],
  { revalidate: 300 },
);
