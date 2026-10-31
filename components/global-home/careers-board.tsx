"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, Search, UserPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { cn } from "@/lib/utils";
import { CountryFlagIcon } from "./country-flags";
import { ApplyButton, useCareerApply } from "./careers-apply";
import {
  CAREER_JOBS,
  FILTERS,
  GENERAL_APPLICATION,
  REGION_LOCATIONS,
  type CareerCategory,
  type CareerFilter,
  type CareerJob,
  type CareerRegion,
} from "./careers-data";

const CATEGORY_LABEL: Record<CareerCategory, GlobalKey> = {
  administration: "careers.filter.administration",
  operations: "careers.filter.operations",
  sales: "careers.filter.sales",
  cleaning: "careers.filter.cleaning",
  it: "careers.filter.it",
};

const REGION_LABEL: Record<CareerRegion, GlobalKey> = {
  "sri-lanka": "careers.filter.srilanka",
  france: "careers.filter.france",
};

const REGION_FLAG: Record<CareerRegion, string> = { "sri-lanka": "lk", france: "fr" };

/** The searchable, filterable job listings — Sri Lanka's cards, then France's featured card. */
export function CareersBoard() {
  const { translateGlobal: t } = useLanguage();
  const apply = useCareerApply();
  const [filter, setFilter] = useState<CareerFilter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CAREER_JOBS.filter((job) => {
      if (filter !== "all" && job.region !== filter && job.category !== filter) return false;
      if (!needle) return true;
      return [t(job.titleKey), job.title, t(REGION_LABEL[job.region]), t(CATEGORY_LABEL[job.category])].some((text) =>
        text.toLowerCase().includes(needle),
      );
    });
  }, [filter, query, t]);

  const sriLankaJobs = visible.filter((job) => job.region === "sri-lanka");
  const franceJobs = visible.filter((job) => job.region === "france");
  // "Other Positions" belongs to Sri Lanka's list, so it only shows when nothing narrows past the region.
  const showOther = (filter === "all" || filter === "sri-lanka") && !query.trim();

  return (
    <>
      <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-800 sm:text-3xl">{t("careers.jobs.title")}</h2>
            <p className="mt-1 max-w-2xl text-xs text-slate-500 sm:text-sm">{t("careers.jobs.description")}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label={t("careers.search.label")}
              placeholder={t("careers.search.placeholder")}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-xs text-slate-800 shadow-sm focus:border-gold-400 focus:outline-none"
            />
          </div>
        </div>

        <div
          role="group"
          aria-label={t("careers.filter.label")}
          className="flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-6 pt-2"
        >
          {FILTERS.map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs transition-all",
                filter === id
                  ? "bg-gold-400 font-semibold text-navy-800 shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-gold-400 hover:text-navy-800",
              )}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {visible.length === 0 && <p className="py-10 text-center text-sm text-slate-500">{t("careers.noResults")}</p>}
      </section>

      {sriLankaJobs.length > 0 && (
        <section className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-8">
          <RegionHeader region="sri-lanka" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sriLankaJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {showOther && (
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="space-y-3">
                  <JobIcon Icon={UserPlus} />
                  <div>
                    <h3 className="text-sm font-bold text-navy-800">{t("careers.other.title")}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{t("careers.other.description")}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => apply(GENERAL_APPLICATION)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-navy-800 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
                >
                  {t("careers.other.cta")}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {franceJobs.length > 0 && (
        <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-8">
          <RegionHeader region="france" />
          {franceJobs.map((job) => (
            <article
              key={job.id}
              className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md lg:grid-cols-12"
            >
              <div className="relative h-56 min-h-[220px] lg:col-span-5 lg:h-auto">
                <Image
                  src="/images/global-home/careers-france.webp"
                  alt={t("careers.france.imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900/40 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-between space-y-4 p-6 sm:p-8 lg:col-span-7">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <JobIcon Icon={job.Icon} />
                    <div>
                      <h3 className="text-base font-bold text-navy-800 sm:text-lg">
                        <JobTitle job={job} />
                      </h3>
                      <p className="text-sm font-bold text-gold-700">
                        <Salary job={job} />
                      </p>
                    </div>
                  </div>
                  <Opening />
                  <p className="pt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{t("careers.france.description")}</p>
                </div>
                <div className="pt-2">
                  <ApplyButton jobId={job.id} className="rounded-xl px-6 py-2.5" />
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

function RegionHeader({ region }: { region: CareerRegion }) {
  const { translateGlobal: t } = useLanguage();
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
      <div className="flex items-center gap-3">
        <CountryFlagIcon code={REGION_FLAG[region]} className="h-6 w-9 rounded-[3px] object-cover shadow-sm" />
        <div>
          <h2 className="font-display text-xl font-bold leading-tight text-navy-800">{t(REGION_LABEL[region])}</h2>
          <p className="text-xs font-medium text-slate-500">{t("careers.region.openings")}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-600 shadow-sm">
        <MapPin className="h-3.5 w-3.5 text-gold-500" />
        <span className="font-semibold">{t(REGION_LOCATIONS[region].titleKey)}</span>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: CareerJob }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-gold-400 hover:shadow-md">
      <div className="space-y-3">
        <JobIcon Icon={job.Icon} />
        <div>
          <h3 className="text-sm font-bold text-navy-800">
            <JobTitle job={job} />
          </h3>
          <p className="mt-0.5 text-xs font-bold text-gold-700">
            <Salary job={job} />
          </p>
        </div>
        <Opening />
      </div>
      <ApplyButton jobId={job.id} className="mt-4 w-full gap-1.5 rounded-xl py-2" />
    </article>
  );
}

function JobIcon({ Icon }: { Icon: CareerJob["Icon"] }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-navy-800">
      <Icon className="h-5 w-5" />
    </span>
  );
}

function JobTitle({ job }: { job: CareerJob }) {
  const { translateGlobal: t } = useLanguage();
  return (
    <>
      {t(job.titleKey)}
      {job.genderNote && <span className="ml-1 text-[11px] font-normal text-slate-500">{t("careers.genderNote")}</span>}
    </>
  );
}

function Salary({ job }: { job: CareerJob }) {
  const { translateGlobal: t } = useLanguage();
  return (
    <>
      {job.amount} {t(job.unit === "month" ? "careers.perMonth" : "careers.perHour")}
    </>
  );
}

function Opening() {
  const { translateGlobal: t } = useLanguage();
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <CalendarDays className="h-3.5 w-3.5 text-gold-500" />
      <span>{t("careers.opening")}</span>
    </p>
  );
}
