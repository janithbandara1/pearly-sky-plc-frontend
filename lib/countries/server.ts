import { CURRENT_COUNTRY, type CountryCode } from "./config";

/**
 * Server Components only. Returns this deployment's fixed country. Kept as
 * an async function (rather than importing CURRENT_COUNTRY directly) so
 * call sites written against the old per-request-detection API don't need
 * to change — under the old single-domain model this read the country
 * proxy.ts resolved per request; now every request on this deployment
 * resolves to the same country, so there's nothing left to detect.
 */
export async function getRequestCountry(): Promise<CountryCode> {
  return CURRENT_COUNTRY;
}
