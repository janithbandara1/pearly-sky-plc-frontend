import Image from "next/image";
import {
  Building2,
  ChartLine,
  Gem,
  Globe,
  HandHelping,
  Heart,
  Leaf,
  Scale,
  Sprout,
  Users,
  UsersRound,
} from "lucide-react";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { greatVibes, playfair } from "./fonts";
import { ApplyButton, CareersApplyProvider } from "./careers-apply";
import { CareersBoard } from "./careers-board";

const HERO_FEATURES: { Icon: typeof Leaf; labelKey: GlobalKey }[] = [
  { Icon: Leaf, labelKey: "careers.feature.work" },
  { Icon: Users, labelKey: "careers.feature.team" },
  { Icon: ChartLine, labelKey: "careers.feature.growth" },
  { Icon: Globe, labelKey: "careers.feature.global" },
];

const PROCESS_STEPS: GlobalKey[] = [
  "careers.process.step1",
  "careers.process.step2",
  "careers.process.step3",
  "careers.process.step4",
];

const PERKS: { Icon: typeof Leaf; labelKey: GlobalKey }[] = [
  { Icon: Scale, labelKey: "careers.perk.fair" },
  { Icon: Users, labelKey: "careers.perk.equal" },
  { Icon: Globe, labelKey: "careers.perk.growth" },
  { Icon: HandHelping, labelKey: "careers.perk.support" },
];

const WHY_BADGES: { Icon: typeof Leaf; labelKey: GlobalKey }[] = [
  { Icon: Leaf, labelKey: "careers.why.eco" },
  { Icon: Gem, labelKey: "careers.why.training" },
  { Icon: UsersRound, labelKey: "careers.why.management" },
  { Icon: Sprout, labelKey: "careers.why.development" },
  { Icon: Building2, labelKey: "careers.why.locations" },
  { Icon: Heart, labelKey: "careers.why.culture" },
];

/** The global gateway's Careers page (IS_GLOBAL_SITE). */
export async function GlobalCareers() {
  const t = getGlobalTranslator(await getRequestLanguage());

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-cream font-sans text-slate-800`}>
      <CareersApplyProvider>
        <section className="relative flex min-h-[440px] items-center overflow-hidden border-b border-gold-500/20 px-4 py-14 sm:px-8">
          <Image src="/images/global-home/hero-villa.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,12,27,0.95)_35%,rgba(2,12,27,0.65)_70%,rgba(2,12,27,0.85)_100%)]" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              <span className="block text-xs font-bold uppercase tracking-widest text-gold-400">{t("careers.eyebrow")}</span>
              <h1 className="max-w-2xl text-balance font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
                {t("careers.title")}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">{t("careers.description")}</p>
              <ul className="flex max-w-3xl flex-wrap gap-3 pt-3">
                {HERO_FEATURES.map(({ Icon, labelKey }) => (
                  <li
                    key={labelKey}
                    className="flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-navy-800/80 px-4 py-2 transition-colors hover:border-gold-400"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="text-xs font-medium text-slate-100">{t(labelKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden items-center justify-end lg:col-span-4 lg:flex">
              <span className="-rotate-4 select-none font-script text-6xl text-gold-300 drop-shadow-lg">{t("careers.script")}</span>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200/70 bg-white px-4 py-10 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-wider text-navy-800">{t("careers.process.title")}</h2>
            <ol className="relative mb-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              {PROCESS_STEPS.map((key, index) => (
                <li key={key} className="relative z-10 flex flex-col items-center gap-2 px-2 text-center">
                  <span
                    className={
                      index === 0
                        ? "gold-gradient-bg flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-navy-900 shadow"
                        : "flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-xs font-bold text-slate-600"
                    }
                  >
                    {index + 1}
                  </span>
                  <span className="text-[11px] font-medium text-slate-700">{t(key)}</span>
                </li>
              ))}
            </ol>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {PERKS.map(({ Icon, labelKey }) => (
                <li key={labelKey} className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-slate-800">{t(labelKey)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CareersBoard />

        <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-navy-800 sm:text-left sm:text-3xl">{t("careers.why.title")}</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {WHY_BADGES.map(({ Icon, labelKey }) => (
              <li key={labelKey} className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-700">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[11px] font-bold leading-tight text-slate-700">{t(labelKey)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-8">
          <div className="relative grid grid-cols-1 items-center overflow-hidden rounded-3xl border border-gold-500/30 bg-navy-900 shadow-2xl lg:grid-cols-12">
            <div className="z-10 space-y-4 p-8 text-white sm:p-12 lg:col-span-7">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("careers.ready.title")}</h2>
              <p className="max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">{t("careers.ready.description")}</p>
              <div className="pt-2">
                <ApplyButton className="rounded-full px-6 py-3" />
              </div>
            </div>
            <div className="relative h-48 min-h-[200px] lg:col-span-5 lg:h-full">
              <Image
                src="/images/global-home/careers-apply.webp"
                alt={t("careers.ready.imageAlt")}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 hidden bg-linear-to-r from-navy-900 via-transparent to-transparent lg:block" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </section>
      </CareersApplyProvider>
    </main>
  );
}
