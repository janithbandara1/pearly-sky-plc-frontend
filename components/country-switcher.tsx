"use client";

import {
  FR,
  DE,
  LU,
  NL,
  FI,
  SE,
  IT,
  PL,
  BE,
  AT,
  DK,
  ES,
  PT,
  RO,
  IE,
  MC,
  CH,
  GB,
  US,
  CA,
  AU,
  NZ,
  QA,
  SA,
  AE,
  OM,
  BH,
  LK,
} from "country-flag-icons/react/3x2";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const FALLBACK_COUNTRY_NAMES: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lu: "Luxembourg",
  nl: "Netherlands",
  fi: "Finland",
  se: "Sweden",
  it: "Italy",
  pl: "Poland",
  be: "Belgium",
  at: "Austria",
  dk: "Denmark",
  es: "Spain",
  pt: "Portugal",
  ro: "Romania",
  ie: "Ireland",
  mc: "Monaco",
  ch: "Switzerland",
  gb: "United Kingdom",
  us: "United States",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  qa: "Qatar",
  sa: "Saudi Arabia",
  ae: "United Arab Emirates",
  om: "Oman",
  bh: "Bahrain",
  lk: "Sri Lanka",
};

export const COUNTRY_FLAGS: Record<CountryCode, typeof FR> = {
  fr: FR,
  de: DE,
  lu: LU,
  nl: NL,
  fi: FI,
  se: SE,
  it: IT,
  pl: PL,
  be: BE,
  at: AT,
  dk: DK,
  es: ES,
  pt: PT,
  ro: RO,
  ie: IE,
  mc: MC,
  ch: CH,
  gb: GB,
  us: US,
  ca: CA,
  au: AU,
  nz: NZ,
  qa: QA,
  sa: SA,
  ae: AE,
  om: OM,
  bh: BH,
  lk: LK,
};

export function CountrySwitcher({ className }: { className?: string }) {
  const { country, countries, setCountry } = useCountry();
  const metaByCode = Object.fromEntries(countries.map((c) => [c.code, c]));

  const current = country ?? SUPPORTED_COUNTRIES[0];

  return (
    <Select value={current} onValueChange={(value) => setCountry(value as CountryCode)}>
      <SelectTrigger
        aria-label="Select country"
        className={cn(
          "h-9 gap-2 rounded-md border-white/15 bg-white/5 px-3 py-1.5 text-brand-navy-foreground hover:border-brand-gold/50 data-[state=open]:border-brand-gold/50 [&_svg]:text-brand-navy-foreground/60",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_COUNTRIES.map((code) => {
          const Flag = COUNTRY_FLAGS[code];
          return (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <Flag className="shrink-0 object-cover" style={{ width: 20, height: 15 }} />
                {metaByCode[code]?.name ?? FALLBACK_COUNTRY_NAMES[code]}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
