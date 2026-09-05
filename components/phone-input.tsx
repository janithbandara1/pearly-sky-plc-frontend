"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Search } from "lucide-react";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { cn } from "@/lib/utils";

const COUNTRY_DIAL_CODES: Record<CountryCode, string> = {
  fr: "+33",
  de: "+49",
  lu: "+352",
  nl: "+31",
  fi: "+358",
  se: "+46",
  it: "+39",
  pl: "+48",
  be: "+32",
  at: "+43",
  dk: "+45",
  es: "+34",
  pt: "+351",
  ro: "+40",
  gb: "+44",
  us: "+1",
  ca: "+1",
  au: "+61",
  nz: "+64",
  qa: "+974",
  sa: "+966",
  ae: "+971",
  om: "+968",
  bh: "+973",
  lk: "+94",
};

interface PhoneInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  placeholder?: string;
  initialCountry?: CountryCode;
  className?: string;
}

interface CountryOption {
  code: CountryCode;
  name: string;
  dialCode: string;
  Flag: ComponentType<{ className?: string }>;
}

const COUNTRY_OPTIONS: CountryOption[] = SUPPORTED_COUNTRIES.map((code) => ({
  code,
  name: FALLBACK_COUNTRY_NAMES[code],
  dialCode: COUNTRY_DIAL_CODES[code],
  Flag: COUNTRY_FLAGS[code],
}));

function getCountryFromValue(value: string, fallback: CountryCode): CountryCode {
  const match = COUNTRY_OPTIONS.find((option) => value.trim().startsWith(option.dialCode));
  return match?.code ?? fallback;
}

export function PhoneInput({
  id,
  name,
  value = "",
  onChange,
  onBlur,
  disabled,
  "aria-invalid": ariaInvalid,
  placeholder,
  initialCountry = "fr",
  className,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(() =>
    getCountryFromValue(value, initialCountry),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = COUNTRY_OPTIONS.find((option) => option.code === selectedCountry) ?? COUNTRY_OPTIONS[0];

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.code.includes(query) ||
        option.dialCode.includes(query),
    );
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCountry(option: CountryOption) {
    const currentNumber = value.trim();
    const currentOption = COUNTRY_OPTIONS.find((item) => currentNumber.startsWith(item.dialCode));
    const localNumber = currentOption
      ? currentNumber.slice(currentOption.dialCode.length).trim()
      : currentNumber;

    setSelectedCountry(option.code);
    onChange(`${option.dialCode}${localNumber ? ` ${localNumber}` : " "}`);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className={cn("relative flex h-10 w-full", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-label="Select country code"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        className="flex shrink-0 items-center gap-2 rounded-l-lg border border-r-0 border-input bg-transparent px-2.5 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
      >
        <selectedOption.Flag className="h-3.5 w-5 object-cover" />
        <span className="text-sm text-foreground">{selectedOption.dialCode}</span>
        <span className="text-xs text-muted-foreground">▾</span>
      </button>
      <input
        id={id}
        type="tel"
        value={value.slice(selectedOption.dialCode.length).trimStart()}
        onChange={(event) => onChange(`${selectedOption.dialCode} ${event.target.value}`)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 rounded-r-lg border border-input bg-transparent px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
      />

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[300px] overflow-hidden rounded-lg border border-input bg-background shadow-xl">
          <div className="flex items-center gap-2 border-b border-border p-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country or code"
              className="h-7 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search countries"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((option) => (
                <li key={option.code}>
                  <button
                    type="button"
                    onClick={() => selectCountry(option)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
                      option.code === selectedCountry && "bg-muted",
                    )}
                  >
                    <option.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                    <span className="min-w-0 flex-1 truncate text-foreground">{option.name}</span>
                    <span className="text-muted-foreground">{option.dialCode}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-center text-sm text-muted-foreground">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
