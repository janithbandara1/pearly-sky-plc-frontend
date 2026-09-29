"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentType } from "react";
import { Search } from "lucide-react";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { IS_GLOBAL_SITE, SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { DIAL_CODES, TIMEZONE_COUNTRIES } from "@/lib/content/dial-codes";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  placeholder?: string;
  /** Used until the visitor's own country is detected, and when it can't be. */
  initialCountry?: CountryCode;
  className?: string;
}

interface CountryOption {
  /** ISO 3166-1 alpha-2, uppercase. */
  code: string;
  name: string;
  dialCode: string;
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

// The global gateway serves visitors from anywhere, so it offers every
// country; each real country site only offers the countries we operate in.
const COUNTRY_OPTIONS: CountryOption[] = IS_GLOBAL_SITE
  ? Object.entries(DIAL_CODES)
    .map(([code, dialCode]) => ({ code, name: regionNames.of(code) ?? code, dialCode }))
    .sort((a, b) => a.name.localeCompare(b.name))
  : SUPPORTED_COUNTRIES.map((country) => ({
    code: country.toUpperCase(),
    name: FALLBACK_COUNTRY_NAMES[country],
    dialCode: DIAL_CODES[country.toUpperCase()],
  }));

function getCountryFromValue(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  // Longest dial code wins, so "+1876 ..." resolves to Jamaica rather than "+1".
  const match = COUNTRY_OPTIONS.filter((option) => trimmed.startsWith(option.dialCode)).sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  )[0];
  return match?.code ?? null;
}

/**
 * Best-effort guess at the visitor's country from the browser alone — its
 * timezone first (reflects where they are), then the region of their
 * preferred locales (e.g. "en-GB"). No IP lookup involved.
 */
function detectVisitorCountry(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone && TIMEZONE_COUNTRIES[timezone]) return TIMEZONE_COUNTRIES[timezone];
  } catch { }

  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of locales) {
    const region = locale?.split("-").find((part, index) => index > 0 && part.length === 2)?.toUpperCase();
    if (region && DIAL_CODES[region]) return region;
  }
  return null;
}

// Timezone/locale don't change during a page's life, so there's nothing to subscribe to.
const subscribeNoop = () => () => { };

type FlagComponent = ComponentType<{ className?: string }>;
type FlagSet = Record<string, FlagComponent>;

// Every country's flag, loaded from the library on demand and only on the
// global gateway — the real country sites stick to COUNTRY_FLAGS' three
// statically imported ones, so their bundles don't grow.
let loadedFlagSet: FlagSet | null = null;

function useFlagSet(): FlagSet | null {
  const [flagSet, setFlagSet] = useState(loadedFlagSet);

  useEffect(() => {
    if (!IS_GLOBAL_SITE || flagSet) return;
    import("country-flag-icons/react/3x2").then((flags) => {
      loadedFlagSet = flags as unknown as FlagSet;
      setFlagSet(loadedFlagSet);
    });
  }, [flagSet]);

  return flagSet;
}

function Flag({ code, flagSet, className }: { code: string; flagSet: FlagSet | null; className?: string }) {
  const Component = COUNTRY_FLAGS[code.toLowerCase() as CountryCode] ?? flagSet?.[code];
  return Component ? <Component className={className} /> : <span className={className} />;
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
  // Null until the visitor picks one (or a number is prefilled) — until then
  // the visitor's detected country is shown, falling back to initialCountry
  // on the server render and when detection finds nothing.
  const [pickedCountry, setPickedCountry] = useState<string | null>(() => getCountryFromValue(value));
  const detectedCountry = useSyncExternalStore(
    subscribeNoop,
    () => (IS_GLOBAL_SITE ? detectVisitorCountry() : null),
    () => null,
  );
  const flagSet = useFlagSet();
  const selectedCountry = pickedCountry ?? detectedCountry ?? initialCountry.toUpperCase();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    COUNTRY_OPTIONS.find((option) => option.code === selectedCountry) ??
    COUNTRY_OPTIONS.find((option) => option.code === "FR")!;

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.code.toLowerCase().includes(query) ||
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
    const currentDialCode = currentNumber.startsWith(selectedOption.dialCode)
      ? selectedOption.dialCode
      : COUNTRY_OPTIONS.find((item) => item.code === getCountryFromValue(currentNumber))?.dialCode;
    const localNumber = currentDialCode
      ? currentNumber.slice(currentDialCode.length).trim()
      : currentNumber;

    setPickedCountry(option.code);
    onChange(`${option.dialCode}${localNumber ? ` ${localNumber}` : " "}`);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className={cn("relative flex h-10 w-full border-[#C9B678]", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-label="Select country code"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        className="flex text-white border border-[#C9B678] bg-gray-600 shrink-0 items-center gap-2 rounded-l-lg  border-r-0   px-2.5 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
      >
        <Flag code={selectedOption.code} className="h-3.5 w-5 object-cover" />
        <span className="text-sm text-white ">{selectedOption.dialCode}</span>
        <span className="text-xs text-white ">▾</span>
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
        className="h-full min-w-0 border border-[#C9B678] flex-1 rounded-r-lg bg-transparent px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
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
                    <Flag code={option.code} className="h-3.5 w-5 shrink-0 object-cover" />
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
