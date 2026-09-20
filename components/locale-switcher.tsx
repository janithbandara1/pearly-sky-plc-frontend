"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { COUNTRY_LANGUAGES, CURRENT_COUNTRY } from "@/lib/countries/config";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * Plain-markup language dropdown for the customer header — no shadcn/ui
 * here per user preference (see the site-footer's shadcn-based
 * LanguageSwitcher for elsewhere). Lists whichever languages
 * CURRENT_COUNTRY offers — just English for the UK/Sri Lanka deployments,
 * English+French+German+Spanish+Italian for France (see
 * lib/countries/config.ts's COUNTRY_LANGUAGES).
 *
 * No longer shows a country picker — each deployment is now a single
 * country's own site (see CURRENT_COUNTRY), not a shared multi-country
 * site with a switcher, so there's nothing to switch to.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const availableLanguages = COUNTRY_LANGUAGES[CURRENT_COUNTRY];
  const languageOptions = SUPPORTED_LANGUAGES.filter((l) => availableLanguages.includes(l.code));

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Select language"
        className={cn(
          "flex items-center gap-1.5 rounded-lg p-2 text-sm font-medium text-brand-navy-foreground outline-none transition-colors hover:bg-brand-gold/10 hover:text-brand-gold",
          open && "bg-brand-gold/10 text-brand-gold",
        )}
      >
        <Globe className="size-4 shrink-0" aria-hidden="true" />
        <span>{language.toUpperCase()}</span>
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full md:right-0 lg:right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10">
          <div className="max-h-96 overflow-y-auto p-1">
            {languageOptions.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setOpen(false);
                  setLanguage(code);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-muted"
              >
                <span className="w-6 shrink-0 text-xs font-semibold">{code.toUpperCase()}</span>
                <span>{label}</span>
                {code === language && <Check className="ml-auto size-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
