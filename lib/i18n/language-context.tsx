"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { extractLocalePrefix, buildPrefixedPath } from "@/lib/countries/geo";
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
      translate: (key: TranslationKey) => {
        const value = dictionaries[resolvedLanguage][key] ?? en[key] ?? key;
        return typeof value === "string" ? value : value.join("\n\n");
      },
    }),
    [resolvedLanguage, pathname, router, searchParams],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
