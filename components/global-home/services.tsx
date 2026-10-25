import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "@/components/locale-link";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { getOurServicesContent } from "@/lib/content/our-services";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import { GLOBAL_SERVICES } from "./services-data";

export async function GlobalServices() {
  const t = getGlobalTranslator(await getRequestLanguage());
  const serviceCount = getOurServicesContent("en").services.length;

  return (
    <section id="services" className="scroll-mt-20 border-t border-gold-500/10 bg-navy-900 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">
              {t("homeServices.eyebrow")}
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{t("homeServices.title", { count: serviceCount })}</h2>
            <p className="mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
              {t("homeServices.description", { count: TOTAL_COUNTRIES })}
            </p>
          </div>
          <Link
            href="/our-services"
            className="glass-panel flex items-center gap-2 self-start rounded-full border-gold-500/30! px-5 py-2.5 text-xs font-semibold text-gold-400 transition-all hover:bg-gold-500 hover:text-navy-900 md:self-auto"
          >
            <span>{t("homeServices.viewAll", { count: serviceCount })}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {GLOBAL_SERVICES.map(({ value, titleKey, descriptionKey, image, Icon }) => (
            <Link
              key={value}
              href="/our-services"
              className="group relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60 bg-navy-800 transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl"
            >
              <Image
                src={image}
                alt={t(titleKey)}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/60 to-transparent" />
              <div className="relative z-10 p-4">
                <span className="glass-panel flex h-9 w-9 items-center justify-center rounded-xl border-gold-500/40! text-gold-400 shadow-md">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="relative z-10 p-4">
                <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-gold-300">
                  {t(titleKey)}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11px] text-slate-300">{t(descriptionKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
