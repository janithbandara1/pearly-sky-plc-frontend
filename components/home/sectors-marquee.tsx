"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const SECTORS: { titleKey: TranslationKey; descKey: TranslationKey; image: string }[] = [
  { titleKey: "sectorCommercialTitle", descKey: "sectorCommercialDesc", image: "/images/sectors/commercial.webp" },
  { titleKey: "sectorSportsTitle", descKey: "sectorSportsDesc", image: "/images/sectors/sports.webp" },
  { titleKey: "sectorPrivatePropertiesTitle", descKey: "sectorPrivatePropertiesDesc", image: "/images/sectors/private-properties.webp" },
  { titleKey: "sectorResidentialTitle", descKey: "sectorResidentialDesc", image: "/images/sectors/residential.webp" },
  { titleKey: "sectorHospitalityTitle", descKey: "sectorHospitalityDesc", image: "/images/sectors/hospitality.webp" },
  { titleKey: "sectorEducationTitle", descKey: "sectorEducationDesc", image: "/images/sectors/education.webp" },
  { titleKey: "sectorHealthcareTitle", descKey: "sectorHealthcareDesc", image: "/images/sectors/healthcare.webp" },
  { titleKey: "sectorFinanceTitle", descKey: "sectorFinanceDesc", image: "/images/sectors/finance.webp" },
  { titleKey: "sectorLeisureTitle", descKey: "sectorLeisureDesc", image: "/images/sectors/leisure.webp" },
  { titleKey: "sectorElderCareTitle", descKey: "sectorElderCareDesc", image: "/images/sectors/elder-care.webp" },
  { titleKey: "sectorRetailTitle", descKey: "sectorRetailDesc", image: "/images/sectors/retail.webp" },
];

export function SectorsMarquee() {
  const { translate } = useLanguage();
  const loop = [...SECTORS, ...SECTORS];

  return (
    <section className="py-16">
      <h2 className="mx-auto mb-8 text-[rgb(0,47,109)] w-full max-w-6xl px-4 text-center text-2xl font-bold tracking-tight sm:px-6 sm:text-3xl">
        {translate("sectorsTitle")}
      </h2>

      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 bg-[rgb(78,93,105)] py-8 group-hover:[animation-play-state:paused]">
          {loop.map((sector, index) => (
            <div
              key={`${sector.titleKey}-${index}`}
              className="relative flex h-56 w-72 shrink-0 flex-col border-2 border-[rgb(217,192,126)] justify-end overflow-hidden rounded-xl "
            >
              <Image
                src={sector.image}
                alt={translate(sector.titleKey)}
                fill
                sizes="288px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-4 text-brand-cream">
                <p className="font-semibold">{translate(sector.titleKey)}</p>
                <p className="mt-1 text-xs text-brand-cream/80">{translate(sector.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
