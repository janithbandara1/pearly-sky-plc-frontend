"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COUNTRY_LANGUAGES, SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { SUPPORTED_LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * Standalone language dropdown for the site header — plain markup, no
 * shadcn/ui, matching LocaleSwitcher's style but split out on its own (see
 * CountrySelect for the country half) so the navbar can show them as two
 * separate selects, the way the footer's LanguageSwitcher/CountrySwitcher
 * already do.
 */
export function LanguageSelect({ className }: { className?: string }) {
  const { country } = useCountry();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<"left" | "right">("left");
  const ref = useRef<HTMLDivElement>(null);

  const currentCountry = country ?? SUPPORTED_COUNTRIES[0];
  const availableLanguages = COUNTRY_LANGUAGES[currentCountry];
  const languageOptions = SUPPORTED_LANGUAGES.filter((l) => availableLanguages.includes(l.code));

  const toggleOpen = () => {
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      const dropdownWidth = 192; // w-48
      setAlign(rect && rect.left + dropdownWidth > window.innerWidth ? "right" : "left");
    }
    setOpen((prev) => !prev);
  };

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
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label="Select language"
        className={cn(
          "flex items-center gap-1.5 rounded-lg p-2 text-sm font-medium text-brand-navy-foreground outline-none transition-colors hover:bg-brand-gold/10 hover:text-brand-gold",
          open && "bg-brand-gold/10 text-brand-gold",
        )}
      >
        <span>{language.toUpperCase()}</span>
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1.5 w-48 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10",
            align === "right" ? "right-0" : "left-0",
          )}
        >
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
