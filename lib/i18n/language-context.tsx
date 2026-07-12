"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, type TranslationKey } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

export type SupportedLanguage = "en" | "fr";

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
  setLanguage: (language: SupportedLanguage) => void;
  translate: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translate: (key) => key,
});

const STORAGE_KEY = "preferredLanguage";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") {
      setLanguageState(saved);
      return;
    }
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "fr") setLanguageState("fr");
  }, []);

  const setLanguage = (next: SupportedLanguage) => {
    setLanguageState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  const translate = (key: TranslationKey): string => dictionaries[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
