"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronDown,
  ChevronRight,
  Gem,
  Globe,
  House,
  KeyRound,
  Search,
  UserCheck,
} from "lucide-react";
import Link from "@/components/locale-link";
import { REGIONAL_DATA, TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { COUNTRY_DOMAINS, COUNTRY_HERO_IMAGES, isSupportedCountry } from "@/lib/countries/config";
import { COVERAGE_CITIES } from "@/lib/countries/home-content";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizedCountryName } from "@/lib/i18n/global/country-names";
import { REGION_KEYS } from "@/lib/i18n/global/regions";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { cn } from "@/lib/utils";
import { CountryFlagIcon } from "./country-flags";
import { greatVibes, playfair } from "./fonts";

// Tab order, as in the design.
const REGIONS = ["Europe Union", "Middle East & Asia", "Australia & New Zealand", "North America"];

/**
 * The order the design lists countries in (live sites first). Countries it
 * doesn't show follow in their data order — Array.sort is stable.
 */
const DISPLAY_ORDER = [
  "fr", "gb", "lk", "de", "it", "es", "nl", "be", "ch", "at", "mc", "ca", "us", "ae", "sa", "qa", "au", "nz",
];
const displayRank = (id: string) => {
  const index = DISPLAY_ORDER.indexOf(id);
  return index === -1 ? DISPLAY_ORDER.length : index;
};

const ALL_COUNTRIES = REGIONS.flatMap((region) => {
  const group = REGIONAL_DATA.find((g) => g.region === region);
  return (group?.countries ?? []).map((country) => ({
    ...country,
    region,
    cities: isSupportedCountry(country.id) ? COVERAGE_CITIES[country.id].length : null,
    url: country.isLive ? `https://${country.domain.toLowerCase()}` : null,
  }));
}).sort((a, b) => displayRank(a.id) - displayRank(b.id));

type Country = (typeof ALL_COUNTRIES)[number];

const LIVE_COUNTRIES = ALL_COUNTRIES.filter((country) => country.isLive);
const FEATURES: { Icon: typeof Gem; titleKey: GlobalKey; subtitleKey: GlobalKey }[] = [
  { Icon: UserCheck, titleKey: "locations.feature.experts.title", subtitleKey: "locations.feature.experts.subtitle" },
  { Icon: Gem, titleKey: "locations.feature.premium.title", subtitleKey: "locations.feature.premium.subtitle" },
  { Icon: Globe, titleKey: "locations.feature.global.title", subtitleKey: "locations.feature.global.subtitle" },
  { Icon: Award, titleKey: "locations.feature.quality.title", subtitleKey: "locations.feature.quality.subtitle" },
];
const PARIS_HIGHLIGHTS: { Icon: typeof House; labelKey: GlobalKey }[] = [
  { Icon: House, labelKey: "locations.paris.homes" },
  { Icon: Building2, labelKey: "locations.paris.offices" },
  { Icon: Gem, labelKey: "locations.paris.luxury" },
  { Icon: KeyRound, labelKey: "locations.paris.concierge" },
];

/**
 * The global gateway's Our Locations page (IS_GLOBAL_SITE). `worldMap` is a
 * server-rendered slot (see world-map.tsx) so its geometry stays out of this client bundle.
 */
export function GlobalLocations({ worldMap }: { worldMap: React.ReactNode }) {
  const { translate, translateGlobal: t, language } = useLanguage();
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"default" | "name">("default");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = ALL_COUNTRIES.filter(
      (country) =>
        (region === "all" || country.region === region) &&
        (!needle ||
          country.name.toLowerCase().includes(needle) ||
          localizedCountryName(country, language).toLowerCase().includes(needle)),
    );
    return sort === "name"
      ? [...matches].sort((a, b) =>
          localizedCountryName(a, language).localeCompare(localizedCountryName(b, language), language),
        )
      : matches;
  }, [region, query, sort, language]);

  const tabs = [
    { id: "all", label: t("locations.allLocations"), count: TOTAL_COUNTRIES },
    ...REGIONS.map((id) => ({
      id,
      label: t(REGION_KEYS[id]),
      count: ALL_COUNTRIES.filter((country) => country.region === id).length,
    })),
  ];

  const stats = [
    { value: `${TOTAL_COUNTRIES}`, label: t("locations.stat.countries") },
    { value: `${LIVE_COUNTRIES.length}`, label: t("locations.stat.live") },
    { value: `${SUPPORTED_LANGUAGES.length}`, label: t("locations.stat.languages") },
  ];

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-navy-900 font-sans text-slate-100`}>
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden lg:min-h-[640px]">
        <Image src="/images/locations/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/65 to-navy-900/90" />
        <p className="pointer-events-none absolute right-10 top-10 z-10 hidden -rotate-3 font-script text-3xl text-gold-400/90 drop-shadow-md md:block lg:right-24 lg:text-4xl">
          {t("locations.script")}
        </p>

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center">
          <nav
            aria-label={t("common.breadcrumb")}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-slate-300 backdrop-blur-md"
          >
            <Link href="/" className="min-h-0! hover:text-gold-400">
              {translate("navHome")}
            </Link>
            <ChevronRight className="h-3 w-3 text-gold-400" />
            <span aria-current="page" className="text-gold-400">
              {translate("navLocations")}
            </span>
          </nav>

          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-7xl">
            {translate("navLocations")}
          </h1>
          <p className="mb-6 font-display text-xl font-medium text-gold-400 sm:text-2xl">
            {t("locations.subtitle", { count: TOTAL_COUNTRIES })}
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {t("locations.description", { count: TOTAL_COUNTRIES })}
          </p>

          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {FEATURES.map(({ Icon, titleKey, subtitleKey }) => (
              <li
                key={titleKey}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition-all hover:border-gold-500/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-white">{t(titleKey)}</span>
                  <span className="text-[11px] text-slate-400">{t(subtitleKey)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-white/10 bg-navy-900/95 py-4 shadow-md backdrop-blur-md">
        <div className="scrollbar-hide mx-auto max-w-7xl overflow-x-auto px-4">
          <div role="group" aria-label={t("locations.filterRegion")} className="mx-auto flex min-w-max items-center justify-center gap-2">
            {tabs.map(({ id, label, count }) => (
              <button
                key={id}
                type="button"
                aria-pressed={region === id}
                onClick={() => setRegion(id)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  region === id
                    ? "bg-gold-500 text-navy-900 shadow-lg"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/10 bg-navy-900 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">{worldMap}</div>

          <div className="space-y-6 lg:col-span-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                {t("locations.presence.eyebrow")}
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {t("locations.presence.title", { count: TOTAL_COUNTRIES })}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{t("locations.presence.description")}</p>
            <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs uppercase tracking-wider text-slate-400">{label}</dt>
                  <dd className="font-display text-2xl font-bold text-gold-400 lg:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="locations-section" className="scroll-mt-32 bg-navy-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t("locations.allLocations")}</h2>
              <p className="mt-1 text-sm text-slate-400">{t("locations.discover")}</p>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("locations.searchPlaceholder")}
                  aria-label={t("locations.searchAria")}
                  className="w-full rounded-xl border border-white/10 bg-navy-800/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as "default" | "name")}
                  aria-label={t("locations.sortAria")}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-navy-800/80 px-4 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="default">{t("locations.sortDefault")}</option>
                  <option value="name">{t("locations.sortName")}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-slate-400">{t("locations.noResults")}</p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((country) => (
                <LocationCard key={country.id} country={country} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <FeaturedParis />
      <RequestService />
    </main>
  );
}

function LocationCard({ country }: { country: Country }) {
  const { translateGlobal: t, language } = useLanguage();
  const heroImage = isSupportedCountry(country.id) ? COUNTRY_HERO_IMAGES[country.id] : null;
  const name = localizedCountryName(country, language);

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/80 shadow-lg transition-all duration-300 hover:border-gold-500/50">
      <div className="relative h-44 overflow-hidden bg-navy-700">
        {heroImage ? (
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // No city photo yet — the banner shows the country's name in gold instead.
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1b2a] px-4 text-center">
            <span className="font-display text-2xl font-semibold leading-tight text-gold-500">{name}</span>
          </div>
        )}
        {heroImage && <div className="absolute inset-0 bg-linear-to-t from-navy-800 via-transparent to-transparent" />}
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
        <div className="flex items-center gap-3">
          <CountryFlagIcon code={country.flagCode} className="h-4 w-6 shrink-0 rounded shadow-sm" />
          <div>
            <h3 className="font-display text-base font-bold leading-tight text-white">{name}</h3>
            <p className="text-xs text-slate-400">
              {country.cities ? t("locations.cities", { count: country.cities }) : t(REGION_KEYS[country.region])}
            </p>
          </div>
        </div>
        {country.url ? (
          <a
            href={country.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-0! w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-emerald-500"
          >
            <span>{t("common.liveWebsite")}</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        ) : (
          <span className="block w-full rounded-xl border border-white/10 bg-white/5 py-2 text-center text-xs font-semibold text-slate-300">
            {t("common.comingSoon")}
          </span>
        )}
      </div>
    </li>
  );
}

function FeaturedParis() {
  const { translateGlobal: t } = useLanguage();

  return (
    <section className="bg-navy-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-navy-800 to-navy-900 shadow-2xl lg:grid-cols-12">
        <div className="relative min-h-[300px] lg:col-span-5 lg:min-h-[400px]">
          <Image
            src={COUNTRY_HERO_IMAGES.fr}
            alt={t("locations.paris.imageAlt")}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 lg:bg-linear-to-r lg:from-transparent lg:to-navy-900" />
        </div>
        <div className="flex flex-col justify-center space-y-6 p-8 sm:p-12 lg:col-span-7">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t("locations.paris.eyebrow")}
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">{t("locations.paris.title")}</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{t("locations.paris.description")}</p>
          <ul className="grid grid-cols-2 gap-4 py-2 sm:grid-cols-4">
            {PARIS_HIGHLIGHTS.map(({ Icon, labelKey }) => (
              <li
                key={labelKey}
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-gold-400" />
                <span>{t(labelKey)}</span>
              </li>
            ))}
          </ul>
          <div>
            <a
              href={COUNTRY_DOMAINS.fr}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient-bg inline-flex min-h-0! items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              <span>{t("locations.paris.cta")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Live countries send the visitor to that country's own quotation page;
 * countries still to come go to the global Contact Us form.
 */
function RequestService() {
  const { translateGlobal: t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState("");
  const [showHint, setShowHint] = useState(false);
  const options = useMemo(
    () =>
      ALL_COUNTRIES.map((country) => ({ ...country, label: localizedCountryName(country, language) })).sort((a, b) =>
        a.label.localeCompare(b.label, language),
      ),
    [language],
  );
  const selected = options.find((country) => country.id === selectedId);

  const buttonClass =
    "gold-gradient-bg flex min-h-0! w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl px-8 py-3.5 text-sm font-semibold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 sm:w-auto";
  const label = (
    <>
      <span>{t("locations.request.cta")}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </>
  );

  return (
    <section id="request-section" className="scroll-mt-20 border-t border-white/10 bg-linear-to-b from-navy-900 to-navy-800 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
          {t("locations.request.eyebrow")}
        </span>
        <h2 className="mb-3 mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{t("locations.request.title")}</h2>
        <p className="mb-10 text-sm text-slate-400 sm:text-base">{t("locations.request.description")}</p>

        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:flex-row sm:p-8">
          <div className="relative w-full sm:flex-1">
            <select
              value={selectedId}
              onChange={(event) => {
                setSelectedId(event.target.value);
                setShowHint(false);
              }}
              aria-label={t("locations.request.selectAria")}
              className="w-full cursor-pointer appearance-none rounded-xl border border-white/20 bg-navy-900 px-4 py-3.5 text-sm text-white transition-colors focus:border-gold-500 focus:outline-none"
            >
              <option value="" disabled>
                {t("locations.request.selectCountry")}
              </option>
              {options.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {!selected ? (
            <button type="button" onClick={() => setShowHint(true)} className={buttonClass}>
              {label}
            </button>
          ) : selected.url ? (
            <a
              href={`${selected.url}/request-quotation`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              {label}
            </a>
          ) : (
            <Link href="/contact-us" className={buttonClass}>
              {label}
            </Link>
          )}
        </div>

        {showHint && <p className="mt-4 text-sm text-gold-400">{t("locations.request.hint")}</p>}
        {selected && !selected.url && (
          <p className="mt-4 text-sm text-slate-400">{t("locations.request.soon", { country: selected.label })}</p>
        )}
      </div>
    </section>
  );
}
