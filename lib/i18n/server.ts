import { headers } from "next/headers";
import { LANGUAGE_HEADER_NAME, isSupportedLanguage, type LanguageCode } from "./config";

/**
 * Server Components only. Reads the language proxy.ts resolved for the
 * current request (null on the unprefixed/global site). Use this instead
 * of re-reading the header directly so every call site agrees on the
 * header name and validation.
 */
export async function getRequestLanguage(): Promise<LanguageCode | null> {
  const headerList = await headers();
  const value = headerList.get(LANGUAGE_HEADER_NAME);
  return isSupportedLanguage(value) ? value : null;
}
