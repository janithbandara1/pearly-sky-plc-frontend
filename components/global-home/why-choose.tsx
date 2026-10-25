import { Crosshair, Gem, Globe, Headset, Leaf, MessagesSquare, ShieldCheck, Star } from "lucide-react";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";
import type { GlobalKey } from "@/lib/i18n/global/en";

const FEATURES: { Icon: typeof Gem; titleKey: GlobalKey; descriptionKey: GlobalKey }[] = [
  { Icon: Gem, titleKey: "why.peace.title", descriptionKey: "why.peace.description" },
  { Icon: Crosshair, titleKey: "why.precision.title", descriptionKey: "why.precision.description" },
  { Icon: MessagesSquare, titleKey: "why.communication.title", descriptionKey: "why.communication.description" },
  { Icon: ShieldCheck, titleKey: "why.luxury.title", descriptionKey: "why.luxury.description" },
];

export async function GlobalWhyChoose() {
  const t = getGlobalTranslator(await getRequestLanguage());

  const stats = [
    { Icon: Globe, value: `${TOTAL_COUNTRIES}+`, label: t("why.stat.countries"), border: "border-b border-r" },
    { Icon: Leaf, value: "100%", label: t("why.stat.eco"), border: "border-b" },
    { Icon: Headset, value: "24/7", label: t("why.stat.support"), border: "border-r" },
    { Icon: Star, value: t("why.fiveStar"), label: t("why.stat.rating"), border: "" },
  ];

  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-800 bg-navy-900 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-gold-400">{t("why.title")}</h2>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {FEATURES.map(({ Icon, titleKey, descriptionKey }) => (
              <div
                key={titleKey}
                className="glass-card flex items-start gap-4 rounded-2xl border-slate-700/70! p-5 transition-all hover:border-gold-500/40!"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-400/40 bg-gold-500/20 text-gold-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{t(titleKey)}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{t(descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <dl className="gold-gradient-bg grid grid-cols-2 gap-4 rounded-2xl p-6 text-navy-900 shadow-xl lg:col-span-4">
            {stats.map(({ Icon, value, label, border }) => (
              // Reversed so the figure shows above its label while <dt> still precedes <dd> in the markup.
              <div key={label} className={`flex flex-col-reverse justify-center border-navy-900/10 p-3 ${border}`}>
                <dt className="text-xs font-semibold uppercase tracking-wider opacity-80">{label}</dt>
                <dd className="mb-1 flex items-center gap-2">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="font-display text-2xl font-extrabold leading-none sm:text-3xl">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
