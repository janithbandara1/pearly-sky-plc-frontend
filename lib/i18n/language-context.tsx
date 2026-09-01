"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { extractLocalePrefix, buildPrefixedPath } from "@/lib/countries/geo";
import { en, type TranslationKey } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import { LANGUAGE_COOKIE_MAX_AGE, LANGUAGE_COOKIE_NAME, type LanguageCode } from "./config";

export type SupportedLanguage = LanguageCode;

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const dictionaries: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en,
  fr,
};

type LanguageContextType = {
  language: SupportedLanguage;
  /** No-op when there's no country in the URL to pair a language segment with. */
  setLanguage: (language: SupportedLanguage) => void;
  translate: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translate: (key) => key,
});

export function LanguageProvider({
  language,
  children,
}: {
  /** Resolved by proxy.ts for the current request; null on the unprefixed/global site. */
  language: SupportedLanguage | null;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resolvedLanguage = language ?? "en";

  const value = useMemo<LanguageContextType>(
    () => ({
      language: resolvedLanguage,
      setLanguage: (next) => {
        document.cookie = `${LANGUAGE_COOKIE_NAME}=${next}; path=/; max-age=${LANGUAGE_COOKIE_MAX_AGE}; samesite=lax`;

        const locale = extractLocalePrefix(pathname);
        if (!locale || locale === "invalid") return;

        const search = searchParams.toString();
        const target = buildPrefixedPath(locale.rest, locale.country, next);

        router.push(`${target}${search ? `?${search}` : ""}`);
        router.refresh();
      },
      translate: (key: TranslationKey) => dictionaries[resolvedLanguage][key] ?? key,
    }),
    [resolvedLanguage, pathname, router, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
