"use client";

import { Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { COUNTRY_LANGUAGES, SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/** Always rendered; the option list is just the current country's languages — English-only for most, English+French for France. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const { country } = useCountry();

  const availableLanguages = COUNTRY_LANGUAGES[country ?? SUPPORTED_COUNTRIES[0]];
  const languageOptions = SUPPORTED_LANGUAGES.filter(({ code }) => availableLanguages.includes(code));

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)}>
      <SelectTrigger
        aria-label="Select language"
        className={cn(
          "h-9 gap-2 rounded-md border-white/15 bg-white/5 px-3 py-1.5 text-brand-navy-foreground hover:border-brand-gold/50 data-[state=open]:border-brand-gold/50 [&_svg]:text-brand-navy-foreground/60",
          className,
        )}
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
