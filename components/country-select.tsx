"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { cn } from "@/lib/utils";

/**
 * Standalone country dropdown for the site header — plain markup, no
 * shadcn/ui, matching LocaleSwitcher's style but split out on its own (see
 * LanguageSelect for the language half) so the navbar can show them as two
 * separate selects, the way the footer's LanguageSwitcher/CountrySwitcher
 * already do.
 */
export function CountrySelect({ className }: { className?: string }) {
  const { country, setCountry } = useCountry();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCountry = country ?? SUPPORTED_COUNTRIES[0];
  const CurrentFlag = COUNTRY_FLAGS[currentCountry];

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
        aria-label="Select country"
        className={cn(
          "flex items-center gap-1.5 rounded-lg p-2 text-sm font-medium text-brand-navy-foreground outline-none transition-colors hover:bg-brand-gold/10 hover:text-brand-gold",
          open && "bg-brand-gold/10 text-brand-gold",
        )}
      >
        <CurrentFlag className="shrink-0 rounded-[2px] object-cover" style={{ width: 20, height: 15 }} />
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1.5 w-56 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10">
          <div className="max-h-96 overflow-y-auto p-1">
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
          </div>
        </div>
      )}
    </div>
  );
}
