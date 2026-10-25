"use client";

import { createContext, use, useContext, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CURRENT_COUNTRY, IS_GLOBAL_SITE } from "@/lib/countries/config";
import { buildLocalePath, extractLocalePrefix } from "@/lib/locale";
import { makeServiceSlugResolver } from "@/lib/countries/seo";
import type { ServiceLocaleSlug } from "@/lib/catalog-api";
import type { TranslationKey } from "./dictionaries/en";
import { loadDictionary } from "./client-dictionary";
import { loadGlobalDictionary } from "./global/client";
import { formatTranslation } from "./global/format";
import type { GlobalKey } from "./global/en";
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
  /**
   * The language segment actually in the current URL ("/fr/..."), or null on
   * unprefixed pages (/login, /signup, /staff). Internal links are prefixed
   * with it (see components/locale-link.tsx) only when it is set.
   */
  urlLanguage: SupportedLanguage | null;
  /** No-op when there's no country in the URL to pair a language segment with. */
  setLanguage: (language: SupportedLanguage) => void;
  translate: (key: TranslationKey) => string;
  /**
   * Copy of the global gateway's own pages (lib/i18n/global/) — returns the key
   * itself on the country sites, which never load that dictionary. `{name}`
   * placeholders are filled from `vars`.
   */
  translateGlobal: (key: GlobalKey, vars?: Record<string, string | number>) => string;
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
  urlLanguage: null,
  setLanguage: () => {},
  translate: (key) => key,
  translateGlobal: (key) => key,
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
  // Loaded as a cacheable chunk rather than passed as a prop — a prop would
  // inline the whole dictionary into every page's HTML (see client-dictionary.ts).
  const dictionary = use(loadDictionary(resolvedLanguage));
  // Only the global gateway has pages that read it; the country sites skip the download.
  const globalDictionary = IS_GLOBAL_SITE ? use(loadGlobalDictionary(resolvedLanguage)) : null;

  // A ref, not state — registering doesn't need to trigger a re-render, and
  // setLanguage (created fresh on every pathname change) must always see the
  // latest registration rather than whatever was captured at creation time.
  const serviceSlugsRef = useRef<{ baseSlug: string; locales: ServiceLocaleSlug[] } | null>(null);

  const value = useMemo<LanguageContextType>(
    () => ({
      language: resolvedLanguage,
      urlLanguage: language,
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
      translate: (key?: TranslationKey | string | null) => {
        if (!key) return "";
        const value = (dictionary as Record<string, unknown>)[key] ?? key;
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return value.filter(Boolean).join("\n\n");
        return String(value ?? "");
      },
      translateGlobal: (key, vars) => formatTranslation(globalDictionary?.[key] ?? key, vars),
      registerServiceSlugs: (service) => {
        serviceSlugsRef.current = service;
      },
    }),
    [resolvedLanguage, language, dictionary, globalDictionary, pathname, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
