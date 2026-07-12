"use client";

import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      {SUPPORTED_LANGUAGES.map(({ code, label }, index) => (
        <div key={code} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground">/</span>}
          <button
            type="button"
            onClick={() => setLanguage(code)}
            aria-current={language === code}
            className={cn(
              "rounded px-1 font-medium transition-colors",
              language === code
                ? "text-brand-gold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {code.toUpperCase()}
          </button>
          <span className="sr-only">{label}</span>
        </div>
      ))}
    </div>
  );
}
