"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { DE, ES, FR, GB, IT } from "country-flag-icons/react/3x2";
import { CURRENT_COUNTRY_LANGUAGES } from "@/lib/countries/config";
import { SUPPORTED_LANGUAGES, useLanguage, type SupportedLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const LANGUAGE_FLAGS: Record<SupportedLanguage, typeof GB> = { en: GB, fr: FR, de: DE, es: ES, it: IT };

const OPTIONS = SUPPORTED_LANGUAGES.filter(({ code }) => CURRENT_COUNTRY_LANGUAGES.includes(code));

/**
 * The global gateway's language dropdown: flag + language name, opening a list
 * of the other languages. Plain markup (no shadcn), like the rest of the global
 * header. Choosing one goes through the shared setLanguage, which saves the
 * language cookie and loads the same page under its /{language} prefix.
 */
export function GlobalLanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, translateGlobal: t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find(({ code }) => code === language) ?? OPTIONS[0];
  const CurrentFlag = LANGUAGE_FLAGS[current.code];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("lang.current", { language: current.label })}
        className={cn(
          // h-9, the same as the Book Now button beside it in the header.
          "flex h-9 items-center gap-2 rounded-full border border-slate-700 bg-navy-700/80 px-3 text-xs text-slate-200 transition-all hover:border-gold-500/50",
          open && "border-gold-500/50",
        )}
      >
        <CurrentFlag aria-hidden className="h-4 w-4 rounded-[3px] object-cover" />
        <span>{current.label}</span>
        <ChevronDown className={cn("h-2.5 w-2.5 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("lang.select")}
          className="glass-panel absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border-gold-500/30! py-2 shadow-2xl"
        >
          {OPTIONS.map(({ code, label }) => {
            const Flag = LANGUAGE_FLAGS[code];
            return (
              <li key={code} role="option" aria-selected={code === language}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (code !== language) setLanguage(code);
                  }}
                  className="flex min-h-10 w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-200 transition-colors hover:bg-gold-500/20"
                >
                  <Flag aria-hidden className="h-4 w-4 shrink-0 rounded-[3px] object-cover" />
                  <span>{label}</span>
                  {code === language && <Check className="ml-auto h-3 w-3 text-gold-400" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
