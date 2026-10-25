import { Crosshair, Gem, Globe, Headset, Leaf, MessagesSquare, ShieldCheck, Star } from "lucide-react";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";

const FEATURES = [
  {
    Icon: Gem,
    title: "Peace of Mind",
    description: "Worry-free experience with complete confidence in our bonded professionals.",
  },
  {
    Icon: Crosshair,
    title: "Tailored Precision",
    description: "Designed for every specific space, property layout, and customer requirement.",
  },
  {
    Icon: MessagesSquare,
    title: "Seamless Communication",
    description: "Fluent in English and French, with dedicated account concierge support.",
  },
  {
    Icon: ShieldCheck,
    title: "Luxury Standards",
    description: "Consistently meeting and exceeding the highest global hospitality standards.",
  },
];

const STATS = [
  { Icon: Globe, value: `${TOTAL_COUNTRIES}+`, label: "Countries", border: "border-b border-r" },
  { Icon: Leaf, value: "100%", label: "Eco-Friendly Products", border: "border-b" },
  { Icon: Headset, value: "24/7", label: "Customer Support", border: "border-r" },
  { Icon: Star, value: "5-Star", label: "Service Rating", border: "" },
];

export function GlobalWhyChoose() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-slate-800 bg-navy-900 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-gold-400">Why Choose Pearly Sky?</h2>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {FEATURES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="glass-card flex items-start gap-4 rounded-2xl border-slate-700/70! p-5 transition-all hover:border-gold-500/40!"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-400/40 bg-gold-500/20 text-gold-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <dl className="gold-gradient-bg grid grid-cols-2 gap-4 rounded-2xl p-6 text-navy-900 shadow-xl lg:col-span-4">
            {STATS.map(({ Icon, value, label, border }) => (
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
