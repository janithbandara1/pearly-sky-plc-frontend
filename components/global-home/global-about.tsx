import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Droplets,
  Feather,
  Gem,
  Globe,
  Handshake,
  Heart,
  House,
  Leaf,
  Lightbulb,
  PawPrint,
  Recycle,
  ShieldCheck,
  Sprout,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "@/components/locale-link";
import { REGIONAL_DATA, TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { getOurServicesContent } from "@/lib/content/our-services";
import { WORLD_MAP } from "@/lib/content/world-map";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import { REGION_KEYS } from "@/lib/i18n/global/regions";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { greatVibes, playfair } from "./fonts";

type Item = { Icon: typeof Leaf; titleKey: GlobalKey; subtitleKey: GlobalKey };
type Point = { Icon: typeof Leaf; titleKey: GlobalKey; textKey: GlobalKey };

const HERO_BADGES: Item[] = [
  { Icon: Leaf, titleKey: "about.badge.eco.title", subtitleKey: "about.badge.eco.subtitle" },
  { Icon: Gem, titleKey: "about.badge.luxury.title", subtitleKey: "about.badge.luxury.subtitle" },
  { Icon: Globe, titleKey: "about.badge.global.title", subtitleKey: "about.badge.global.subtitle" },
  { Icon: ShieldCheck, titleKey: "about.badge.trusted.title", subtitleKey: "about.badge.trusted.subtitle" },
];

const STORY_HIGHLIGHTS: Point[] = [
  { Icon: Sprout, titleKey: "about.highlight.sustainable.title", textKey: "about.highlight.sustainable.text" },
  { Icon: Gem, titleKey: "about.highlight.luxury.title", textKey: "about.highlight.luxury.text" },
  { Icon: Users, titleKey: "about.highlight.team.title", textKey: "about.highlight.team.text" },
];

const VALUES: Point[] = [
  { Icon: Sprout, titleKey: "about.value.sustainability.title", textKey: "about.value.sustainability.text" },
  { Icon: Gem, titleKey: "about.value.quality.title", textKey: "about.value.quality.text" },
  { Icon: Heart, titleKey: "about.value.customer.title", textKey: "about.value.customer.text" },
  { Icon: Handshake, titleKey: "about.value.integrity.title", textKey: "about.value.integrity.text" },
  { Icon: Lightbulb, titleKey: "about.value.innovation.title", textKey: "about.value.innovation.text" },
];

const CERTIFICATIONS: Item[] = [
  { Icon: Compass, titleKey: "about.cert.compass.title", subtitleKey: "about.cert.compass.subtitle" },
  { Icon: Sprout, titleKey: "about.cert.eco.title", subtitleKey: "about.cert.eco.subtitle" },
  { Icon: Droplets, titleKey: "about.cert.nontoxic.title", subtitleKey: "about.cert.nontoxic.subtitle" },
  { Icon: Recycle, titleKey: "about.cert.sustainable.title", subtitleKey: "about.cert.sustainable.subtitle" },
  { Icon: PawPrint, titleKey: "about.cert.pet.title", subtitleKey: "about.cert.pet.subtitle" },
];

const REGION_CARDS = ["Europe Union", "Middle East & Asia", "Australia & New Zealand", "North America"].map((region) => ({
  region,
  count: REGIONAL_DATA.find((group) => group.region === region)?.countries.length ?? 0,
}));

const LIVE_WEBSITES = REGIONAL_DATA.flatMap((group) => group.countries).filter((country) => country.isLive).length;

const sectionLabel = "rounded-md bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-600";
const goldButton =
  "gold-gradient-bg inline-flex min-h-0! items-center gap-3 rounded-xl px-6 py-3 text-sm font-bold text-navy-900 shadow-md transition-all hover:shadow-lg hover:brightness-105";

/** The global gateway's About Us page (IS_GLOBAL_SITE). */
export async function GlobalAbout() {
  const language = await getRequestLanguage();
  const t = getGlobalTranslator(language);
  const serviceCount = getOurServicesContent("en").services.length;
  const stats = [
    { Icon: Globe, value: `${TOTAL_COUNTRIES}+`, label: t("about.stat.countries") },
    { Icon: House, value: `${serviceCount}+`, label: t("about.stat.services") },
    { Icon: UsersRound, value: `${LIVE_WEBSITES}`, label: t("about.stat.live") },
    { Icon: ShieldCheck, value: "100%", label: t("about.stat.eco") },
    { Icon: Star, value: t("why.fiveStar"), label: t("about.stat.quality") },
  ];

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-gray-50 font-sans text-gray-800`}>
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/images/about/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label={t("common.breadcrumb")}
            className="mb-6 flex items-center gap-2 text-xs font-medium text-gold-500/80 sm:text-sm"
          >
            <Link href="/" className="min-h-0! hover:text-gold-500">
              {t("common.home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span aria-current="page" className="text-white">
              {t("about.title")}
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {t("about.title")}
            </h1>
            <p className="mb-6 font-display text-2xl italic text-gold-300 sm:text-3xl">{t("about.tagline")}</p>
            <p className="mb-12 text-base leading-relaxed text-gray-300 sm:text-lg">{t("about.heroDescription")}</p>
          </div>

          <ul className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 md:grid-cols-4">
            {HERO_BADGES.map(({ Icon, titleKey, subtitleKey }) => (
              <li
                key={titleKey}
                className="flex items-center gap-3 rounded-xl border border-gold-500/20 bg-navy-800/60 p-4 backdrop-blur-md transition hover:border-gold-500/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-white sm:text-sm">{t(titleKey)}</span>
                  <span className="text-[11px] text-gray-400">{t(subtitleKey)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-8 hidden text-right font-display text-6xl italic text-white opacity-10 xl:block"
        >
          {t("about.watermark")}
        </p>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className={sectionLabel}>{t("about.story.label")}</span>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
                {t("about.story.title")}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{t("about.story.p1")}</p>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                {t("about.story.p2", { count: TOTAL_COUNTRIES })}
              </p>
              <div className="pt-4">
                <Link href="/our-services" className={goldButton}>
                  <span>{t("hero.ourServices")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
                <div className="relative h-[400px] sm:h-[480px]">
                  <Image
                    src="/images/about/welcome.webp"
                    alt={t("about.story.imageAlt")}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <ul className="absolute inset-x-4 bottom-4 grid grid-cols-1 gap-4 rounded-xl border border-gold-500/30 bg-navy-900/85 p-6 text-white backdrop-blur-md sm:grid-cols-3">
                  {STORY_HIGHLIGHTS.map(({ Icon, titleKey, textKey }) => (
                    <li key={titleKey} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                      <div>
                        <h3 className="font-display text-xs font-bold sm:text-sm">{t(titleKey)}</h3>
                        <p className="mt-1 text-[11px] text-gray-300">{t(textKey)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 divide-y divide-navy-700 rounded-2xl bg-navy-900 p-8 text-center text-white shadow-xl md:grid-cols-5 md:divide-x md:divide-y-0">
            {stats.map(({ Icon, value, label }, index) => (
              <div key={label} className={`flex flex-col-reverse pt-4 md:pt-0 ${index === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                <dt className="mt-1 text-xs uppercase tracking-wider text-gray-400">{label}</dt>
                <dd>
                  <Icon className="mx-auto mb-1 h-6 w-6 text-gold-500" />
                  <span className="font-display text-2xl font-bold sm:text-3xl">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition hover:border-gold-500 sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gold-500/5 transition group-hover:bg-gold-500/15" />
            <span className={sectionLabel}>{t("about.mission.label")}</span>
            <h2 className="mb-4 mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              {t("about.mission.title")}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{t("about.mission.text")}</p>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-900 p-8 text-white shadow-lg transition hover:border-gold-500 sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gold-500/10 transition group-hover:bg-gold-500/25" />
            <Feather aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 text-gold-500/10" />
            <span className="rounded-md bg-gold-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-500">
              {t("about.vision.label")}
            </span>
            <h2 className="mb-4 mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{t("about.vision.title")}</h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">{t("about.vision.text")}</p>
          </article>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className={sectionLabel}>{t("about.values.label")}</span>
          <h2 className="mb-12 mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">{t("about.values.title")}</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map(({ Icon, titleKey, textKey }, index) => (
              <li
                key={titleKey}
                className={`group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-gold-500 hover:shadow-xl ${index === VALUES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-navy-900">{t(titleKey)}</h3>
                <p className="text-xs leading-relaxed text-gray-600">{t(textKey)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-900 py-20 text-white">
        <svg
          viewBox={`0 ${WORLD_MAP.top} ${WORLD_MAP.width} ${WORLD_MAP.height}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
        >
          <path d={WORLD_MAP.land} fill="#d4af37" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-6">
            <span className="rounded-md bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-500">
              {t("about.presence.label")}
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
              {t("about.presence.title1")} <br />
              <span className="text-gold-500">{t("about.presence.title2", { count: TOTAL_COUNTRIES })}</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">{t("about.presence.description")}</p>
            <Link href="/our-locations" className={goldButton}>
              <span>{t("about.presence.cta")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="space-y-4 lg:col-span-6">
            {REGION_CARDS.map(({ region, count }) => (
              <li
                key={region}
                className="flex items-center justify-between rounded-xl border border-gold-500/30 bg-navy-800/80 p-4 backdrop-blur-md transition hover:bg-navy-800"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-bold sm:text-base">{t(REGION_KEYS[region])}</span>
                </span>
                <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-semibold text-gold-500">
                  {t("about.presence.countries", { count })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-2 font-display text-xl font-bold text-navy-900 sm:text-2xl">{t("about.cert.title")}</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xs text-gray-600 sm:text-sm">{t("about.cert.description")}</p>
          <ul className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-5">
            {CERTIFICATIONS.map(({ Icon, titleKey, subtitleKey }, index) => (
              <li
                key={titleKey}
                className={`flex w-full flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm transition hover:shadow-md ${index === CERTIFICATIONS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold text-navy-900">{t(titleKey)}</span>
                <span className="text-[10px] text-gray-500">{t(subtitleKey)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
