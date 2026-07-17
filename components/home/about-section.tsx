"use client";

import Image from "next/image";
import { Globe2, Laptop, Leaf, Phone, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

const ICON_COLORS: Record<string, string> = {
  bilingual: "text-sky-500",
  eco: "text-emerald-600",
  booking: "text-sky-600",
  support: "text-sky-600",
};

function HighlightsPanel({
  highlights,
}: {
  highlights: { key: string; Icon: LucideIcon; label: string; desc: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {highlights.map(({ key, Icon, label, desc }) => (
        <div
          key={key}
          className="flex items-start gap-3 rounded-lg bg-muted/60 px-3 py-2 sm:bg-transparent sm:px-0 sm:py-1"
        >
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${ICON_COLORS[key]}`} />
          <p className="text-sm sm:text-base">
            <span className="font-bold text-brand-navy">{label}:</span>{" "}
            <span className="text-muted-foreground">{desc}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export function AboutSection() {
  const { translate } = useLanguage();

  const highlights = [
    {
      key: "bilingual",
      Icon: Globe2,
      label: translate("aboutBilingualLabel"),
      desc: translate("aboutBilingualDesc"),
    },
    {
      key: "eco",
      Icon: Leaf,
      label: translate("aboutEcoLabel"),
      desc: translate("aboutEcoDesc"),
    },
    {
      key: "booking",
      Icon: Laptop,
      label: translate("aboutBookingLabel"),
      desc: translate("aboutBookingDesc"),
    },
    {
      key: "support",
      Icon: Phone,
      label: translate("aboutSupportLabel"),
      desc: translate("aboutSupportDesc"),
    },
  ];

  return (
    <section className="bg-background py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {translate("aboutWhyChooseUsTitle")}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-brand-gold-dark">
          {/* Desktop: image fills the card behind the overlaid highlights panel */}
          <div className="relative hidden sm:block sm:aspect-[21/9]">
            <Image
              src="/images/about/welcome.webp"
              alt="Pearly Sky team at work"
              fill
              sizes="(min-width: 640px) 1024px, 0px"
              className="object-cover object-right"
            />
            <div className="pointer-events-none absolute inset-0 w-3/5 bg-gradient-to-r from-white via-white/85 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-center px-10">
              <HighlightsPanel highlights={highlights} />
            </div>
          </div>

          {/* Mobile: highlights card on top, full-width image below */}
          <div className="sm:hidden">
            <div className="bg-white px-4 py-6">
              <HighlightsPanel highlights={highlights} />
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/about/welcome.webp"
                alt="Pearly Sky team at work"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
