"use client";

import { useEffect, useState } from "react";
import { DE, FR, LK } from "country-flag-icons/react/3x2";
import { getCountries, type CountryMeta } from "@/lib/countries/api";
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

const FALLBACK_NAMES: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lk: "Sri Lanka",
};

const FLAGS: Record<CountryCode, typeof FR> = {
  fr: FR,
  de: DE,
  lk: LK,
};

export function CountrySwitcher({ className }: { className?: string }) {
  const { country, setCountry } = useCountry();
  const [metaByCode, setMetaByCode] = useState<Record<string, CountryMeta>>({});

  useEffect(() => {
    getCountries()
      .then((countries) => {
        setMetaByCode(Object.fromEntries(countries.map((c) => [c.code, c])));
      })
      .catch(() => setMetaByCode({}));
  }, []);

  const current = country ?? SUPPORTED_COUNTRIES[0];

  return (
    <Select value={current} onValueChange={(value) => setCountry(value as CountryCode)}>
      <SelectTrigger
        className={cn(
          "h-9 gap-2 rounded-md border-white/15 bg-white/5 px-3 py-1.5 text-brand-navy-foreground hover:border-brand-gold/50 data-[state=open]:border-brand-gold/50 [&_svg]:text-brand-navy-foreground/60",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_COUNTRIES.map((code) => {
          const Flag = FLAGS[code];
          return (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <Flag className="shrink-0 object-cover" style={{ width: 20, height: 15 }} />
                {metaByCode[code]?.name ?? FALLBACK_NAMES[code]}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
