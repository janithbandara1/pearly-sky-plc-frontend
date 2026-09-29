"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { buildLocalePath, extractLocalePrefix } from "@/lib/locale";
import { makeServiceSlugResolver } from "@/lib/countries/seo";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";
import type { TranslationKey } from "./dictionaries/en";
import { LANGUAGE_COOKIE_MAX_AGE, LANGUAGE_COOKIE_NAME, type LanguageCode } from "./config";

export type SupportedLanguage = LanguageCode;

/** Every entry has a dictionary in lib/i18n/translate.ts; which ones a deployment offers is COUNTRY_LANGUAGES in lib/countries/config.ts. */
export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
];

export type TranslationValue = string | readonly string[];

export type Dictionary = Partial<Record<TranslationKey, TranslationValue>>;

type LanguageContextType = {
  language: SupportedLanguage;
  /** No-op when there's no country in the URL to pair a language segment with. */
  setLanguage: (language: SupportedLanguage) => void;
  translate: (key: TranslationKey) => string;
  /**
   * Lets a `/services/[serviceSlug]` page (and its `/checkout`,
   * `/request-quotation`, etc. subroutes) tell `setLanguage` how to
   * translate the slug segment of the URL, not just the `/{country}-{lang}`
   * prefix — so switching language on "regular-home-cleaning" lands on its
   * French slug ("nettoyage-regulier") instead of keeping the English one.
   * Call with `null` on unmount so unrelated pages aren't affected.
   */
  registerServiceSlugs: (service: { baseSlug: string; locales: ServiceLocaleSlug[] } | null) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translate: (key) => key,
  registerServiceSlugs: () => {},
});

export function LanguageProvider({
  language,
  dictionary,
  children,
}: {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  language: SupportedLanguage | null;
  /** Only the current language, English-filled — from getDictionary() in lib/i18n/translate.ts on the server. */
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resolvedLanguage = language ?? "en";

  // A ref, not state — registering doesn't need to trigger a re-render, and
  // setLanguage (created fresh on every pathname change) must always see the
  // latest registration rather than whatever was captured at creation time.
  const serviceSlugsRef = useRef<{ baseSlug: string; locales: ServiceLocaleSlug[] } | null>(null);

  const value = useMemo<LanguageContextType>(
    () => ({
      language: resolvedLanguage,
      setLanguage: (next) => {
        document.cookie = `${LANGUAGE_COOKIE_NAME}=${next}; path=/; max-age=${LANGUAGE_COOKIE_MAX_AGE}; samesite=lax`;

        const locale = extractLocalePrefix(pathname);
        if (!locale || locale === "invalid") return;

        let rest = locale.rest;
        const registeredService = serviceSlugsRef.current;
        const serviceSlugMatch = registeredService && rest.match(/^(\/services\/)[^/]+(\/.*)?$/);
        if (registeredService && serviceSlugMatch) {
          const slugFor = makeServiceSlugResolver(registeredService.baseSlug, registeredService.locales);
          const newSlug = slugFor(next, CURRENT_COUNTRY);
          rest = `${serviceSlugMatch[1]}${newSlug}${serviceSlugMatch[2] ?? ""}`;
        }

        const search = searchParams.toString();
        const target = buildLocalePath(rest, next);

        // Full page load (not router.push) — a soft navigation only clears the
        // client router cache, not Next's server-side fetch/data cache, so
        // switching language could still render the previous language's cached
        // data for a beat.
        window.location.href = `${target}${search ? `?${search}` : ""}`;
      },
      translate: (key: TranslationKey) => {
        const value = dictionary[key] ?? key;
        if (typeof value === "string") return value;
        return value.filter(Boolean).join("\n\n");
      },
      registerServiceSlugs: (service) => {
        serviceSlugsRef.current = service;
      },
    }),
    [resolvedLanguage, dictionary, pathname, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
