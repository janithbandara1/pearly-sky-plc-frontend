"use client";

import { Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { CURRENT_COUNTRY_LANGUAGES } from "@/lib/countries/config";
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

  const languageOptions = SUPPORTED_LANGUAGES.filter(({ code }) => CURRENT_COUNTRY_LANGUAGES.includes(code));

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)}>
      <SelectTrigger
        aria-label="Select language"
        className={cn(
          "h-9 gap-2 px-4 py-3 rounded-md border-white/15 bg-white/5 text-brand-navy-foreground hover:border-brand-gold/50 data-[state=open]:border-brand-gold/50 [&_svg]:text-brand-navy-foreground/60",
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
