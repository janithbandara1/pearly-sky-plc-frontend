"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Building2, Check, ChevronDown, Globe, MapPin, X } from "lucide-react";
import Link from "@/components/locale-link";
import { REGIONAL_DATA } from "@/lib/content/global-countries";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizedCountryName } from "@/lib/i18n/global/country-names";
import { cn } from "@/lib/utils";

// Only the countries with their own live site take bookings.
const BOOKABLE_COUNTRY_IDS = ["fr", "gb", "lk"];
const COUNTRIES = REGIONAL_DATA.flatMap((group) => group.countries).filter((country) =>
  BOOKABLE_COUNTRY_IDS.includes(country.id),
);

const fieldClass =
  "relative rounded-xl border border-gold-500/25 bg-navy-900 transition-colors focus-within:border-gold-500/60";
const inputClass =
  "w-full rounded-xl bg-transparent py-3.5 pl-10 pr-4 text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none";

/**
 * The step before the gateway's quotation page: the visitor says where the
 * service is needed, sees it confirmed, and continues to /request-quotation
 * with the service and location carried along. Rendered inside a <dialog>
 * opened by its parent, so the form resets with each opening (`serviceId` is
 * its key).
 */
export function ServiceAvailabilityDialog({
  serviceId,
  onClose,
}: {
  serviceId: string | null;
  onClose: () => void;
}) {
  const { translateGlobal: t, language } = useLanguage();
  const [countryId, setCountryId] = useState(BOOKABLE_COUNTRY_IDS[0]);
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  const countries = useMemo(
    () =>
      COUNTRIES.map((country) => ({ id: country.id, name: localizedCountryName(country, language), en: country.name }))
        .sort((a, b) => a.name.localeCompare(b.name, language)),
    [language],
  );
  const country = countries.find((c) => c.id === countryId) ?? countries[0];

  const cityValue = city.trim();
  const postalValue = postal.trim();
  const verified = Boolean(cityValue || postalValue);

  const params = new URLSearchParams();
  if (serviceId) params.set("service", serviceId);
  params.set("country", country.en);
  if (cityValue) params.set("city", cityValue);
  if (postalValue) params.set("postal", postalValue);

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-navy-700 shadow-md">
            <MapPin className="h-4 w-4 text-gold-400" />
          </span>
          <div>
            <h3 id="availability-title" className="font-display text-xl font-semibold tracking-wide text-white">
              {t("avail.title")}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{t("avail.subtitle")}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={onClose}
          className="shrink-0 text-slate-400 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="avail-country" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("avail.country")}
          </label>
          <div className={fieldClass}>
            <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              id="avail-country"
              value={country.id}
              onChange={(event) => setCountryId(event.target.value)}
              className={cn(inputClass, "cursor-pointer appearance-none pr-10")}
            >
              {countries.map(({ id, name }) => (
                <option key={id} value={id} className="bg-navy-900">
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="avail-city" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("avail.city")}
          </label>
          <div className={fieldClass}>
            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="avail-city"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={t("avail.cityPlaceholder")}
              autoComplete="address-level2"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="avail-postal" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("avail.postal")}
          </label>
          <div className={fieldClass}>
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="avail-postal"
              type="text"
              value={postal}
              onChange={(event) => setPostal(event.target.value)}
              placeholder={t("avail.postalPlaceholder")}
              autoComplete="postal-code"
              className={inputClass}
            />
          </div>
        </div>

        <div
          aria-live="polite"
          className={cn(
            "flex items-start gap-3.5 rounded-2xl border bg-navy-900 p-4 transition-colors",
            verified ? "border-gold-500/30" : "border-slate-800",
          )}
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          </span>
          <div className="space-y-1">
            <h4 className={cn("text-sm font-semibold", verified ? "text-gold-300" : "text-slate-200")}>
              {verified
                ? t("avail.verifiedTitle", { location: [cityValue, postalValue].filter(Boolean).join(", "), country: country.name })
                : t("avail.defaultTitle")}
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {verified ? t("avail.verifiedBody") : t("avail.defaultBody")}
            </p>
          </div>
        </div>

        <Link
          href={`/request-quotation?${params.toString()}`}
          className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-navy-900 shadow-lg transition-opacity hover:opacity-90"
        >
          <span>{t("common.bookNow")}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  );
}
