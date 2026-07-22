import { headers } from "next/headers";
import { COUNTRY_HEADER_NAME, isSupportedCountry, type CountryCode } from "./config";

/**
 * Server Components only. Reads the country proxy.ts resolved for the
 * current request (null on the unprefixed/global site). Use this instead
 * of re-reading the header directly so every call site agrees on the
 * header name and validation.
 */
export async function getRequestCountry(): Promise<CountryCode | null> {
  const headerList = await headers();
  const value = headerList.get(COUNTRY_HEADER_NAME);
  return isSupportedCountry(value) ? value : null;
}
