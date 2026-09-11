"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extractLocalePrefix, buildPrefixedPath } from "@/lib/countries/geo";
import { makeServiceSlugResolver } from "@/lib/countries/seo";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";
import { en, type TranslationKey } from "./dictionaries/en";
import { da } from "./dictionaries/da";
import { de } from "./dictionaries/de";
import { es } from "./dictionaries/es";
import { fi } from "./dictionaries/fi";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import { lb } from "./dictionaries/lb";
import { nl } from "./dictionaries/nl";
import { no } from "./dictionaries/no";
import { pl } from "./dictionaries/pl";
import { pt } from "./dictionaries/pt";
import { ro } from "./dictionaries/ro";
import { sv } from "./dictionaries/sv";
import { LANGUAGE_COOKIE_MAX_AGE, LANGUAGE_COOKIE_NAME, type LanguageCode } from "./config";

export type SupportedLanguage = LanguageCode;

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "da", label: "Dansk" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fi", label: "Suomi" },
  { code: "it", label: "Italiano" },
  { code: "lb", label: "Lëtzebuergesch" },
  { code: "nl", label: "Nederlands" },
  { code: "no", label: "Norsk" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "ro", label: "Română" },
  { code: "sv", label: "Svenska" },
];

export type TranslationValue = string | readonly string[];

const dictionaries: Record<SupportedLanguage, Partial<Record<TranslationKey, TranslationValue>>> = {
  en,
  fr,
  da,
  de,
  es,
  fi,
  it,
  lb,
  nl,
  no,
  pl,
  pt,
  ro,
  sv,
};

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
  children,
}: {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  language: SupportedLanguage | null;
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
          const newSlug = slugFor(next, locale.country);
          rest = `${serviceSlugMatch[1]}${newSlug}${serviceSlugMatch[2] ?? ""}`;
        }

        const search = searchParams.toString();
        const target = buildPrefixedPath(rest, locale.country, next);

        // Full page load (not router.push) — a soft navigation only clears the
        // client router cache, not Next's server-side fetch/data cache, so
        // switching language could still render the previous language's cached
        // data for a beat.
        window.location.href = `${target}${search ? `?${search}` : ""}`;
      },
      translate: (key: TranslationKey) => {
        const value = dictionaries[resolvedLanguage][key] ?? en[key] ?? key;
        return typeof value === "string" ? value : value.join("\n\n");
      },
      registerServiceSlugs: (service) => {
        serviceSlugsRef.current = service;
      },
    }),
    [resolvedLanguage, pathname, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
