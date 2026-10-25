import Image from "next/image";
import { ArrowRight, Crown, Gem, Globe, Leaf, ShieldCheck, Sprout } from "lucide-react";
import Link from "@/components/locale-link";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { WatchVideoButton } from "./watch-video";

const FEATURES: { Icon: typeof Sprout; labelKey: GlobalKey }[] = [
  { Icon: Sprout, labelKey: "hero.feature.eco" },
  { Icon: Gem, labelKey: "hero.feature.luxury" },
  { Icon: Globe, labelKey: "hero.feature.global" },
  { Icon: ShieldCheck, labelKey: "hero.feature.trusted" },
];

export async function GlobalHero() {
  const t = getGlobalTranslator(await getRequestLanguage());

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden border-b border-gold-500/20 px-4 pb-8 pt-12 sm:px-8"
    >
      <Image
        src="/images/hero/hero-1.webp"
        alt={t("hero.imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,12,27,0.9)_30%,rgba(2,12,27,0.45)_70%,rgba(2,12,27,0.75)_100%)]" />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">
            <Crown className="h-3 w-3" />
            <span>{t("hero.welcome")}</span>
          </div>

          {/* The brand name stays in English in every language. */}
          <h1 className="font-display text-4xl font-bold leading-tight text-white drop-shadow-md sm:text-6xl lg:text-7xl">
            Pearly Sky <br />
            <span className="gold-gradient-text font-normal italic">Eco-Luxury</span> Cleaning Global
          </h1>

          <p className="text-lg font-light tracking-wide text-gold-300 sm:text-2xl">{t("hero.tagline")}</p>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-slate-300 sm:text-base">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/our-services"
              className="gold-gradient-bg flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg shadow-gold-500/20 transition-all hover:brightness-110"
            >
              <span>{t("hero.ourServices")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about-us"
              className="glass-panel rounded-full border-slate-600! px-6 py-3 text-sm font-medium text-slate-100 transition-all hover:border-gold-500/50! hover:bg-navy-700/80"
            >
              {t("hero.aboutUs")}
            </Link>
            <WatchVideoButton />
          </div>
        </div>

        <div className="flex lg:col-span-4 lg:justify-end">
          <div className="glass-panel flex max-w-xs items-center gap-4 rounded-2xl border-gold-500/30! p-5 shadow-2xl transition-all hover:border-gold-400!">
            <div className="gold-gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-navy-900 shadow-md">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-snug text-gold-400">{t("hero.ecoCertified")}</p>
              <p className="mt-0.5 text-xs text-slate-400">{t("hero.nonToxic")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-slate-700/40 pt-8 md:flex-row">
        <ul className="grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:w-auto xl:grid-cols-4">
          {FEATURES.map(({ Icon, labelKey }) => (
            <li
              key={labelKey}
              className="glass-card flex items-center gap-2.5 rounded-full border-slate-700/60! px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:border-gold-500/40!"
            >
              <Icon className="h-4 w-4 shrink-0 text-gold-400" />
              <span>{t(labelKey)}</span>
            </li>
          ))}
        </ul>

        <p className="text-center font-script text-2xl text-gold-300 opacity-90 sm:text-3xl md:whitespace-nowrap md:text-right">
          {t("hero.slogan")}
        </p>
      </div>
    </section>
  );
}
