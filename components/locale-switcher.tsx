"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { COUNTRY_LANGUAGES, SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * Plain-markup country + language dropdown for the site header/customer
 * header — no shadcn/ui here per user preference (see the site-footer's
 * shadcn-based CountrySwitcher/LanguageSwitcher for elsewhere). The
 * Language section only appears for countries that offer more than one —
 * today that's just France (see lib/countries/config.ts's COUNTRY_LANGUAGES).
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { country, setCountry } = useCountry();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCountry = country ?? SUPPORTED_COUNTRIES[0];
  const CurrentFlag = COUNTRY_FLAGS[currentCountry];
  const availableLanguages = COUNTRY_LANGUAGES[currentCountry];
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
        aria-label={languageOptions.length > 1 ? "Select language and country" : "Select country"}
        className={cn(
          "flex items-center gap-1.5 rounded-lg p-2 text-sm font-medium text-brand-navy-foreground outline-none transition-colors hover:bg-brand-gold/10 hover:text-brand-gold",
          open && "bg-brand-gold/10 text-brand-gold",
        )}
      >
        <CurrentFlag className="shrink-0 rounded-[2px] object-cover" style={{ width: 20, height: 15 }} />
        {languageOptions.length > 1 && <span>{language.toUpperCase()}</span>}
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10">
          <div className="max-h-96 overflow-y-auto p-1">
            <p className="px-2 pt-1.5 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Country
            </p>
            {SUPPORTED_COUNTRIES.map((code) => {
              const Flag = COUNTRY_FLAGS[code];
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setCountry(code);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-muted"
                >
                  <Flag className="shrink-0 rounded-[2px] object-cover" style={{ width: 20, height: 15 }} />
                  <span>{FALLBACK_COUNTRY_NAMES[code]}</span>
                  {code === currentCountry && <Check className="ml-auto size-4" />}
                </button>
              );
            })}

            {languageOptions.length > 1 && (
              <>
                <div className="my-1 border-t" />

                <p className="px-2 pt-1.5 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Language
                </p>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
