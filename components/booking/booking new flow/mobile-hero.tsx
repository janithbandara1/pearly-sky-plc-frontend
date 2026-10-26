"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { HeroPriceSelector, type HeroPriceOption } from "@/components/hero-price-selector";
import { Star } from "lucide-react";
import type { ComponentType } from "react";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import ScheduleServiceButton from "../Schedule-service-button";
import { useLanguage } from "@/lib/i18n/language-context";

interface MobileHeroProps {
  image: string;
  title?: string;
  subtitle?: string;
  activePrices: HeroPriceOption[];
  selectedCountryCode: string;
  selectedData: HeroPriceOption;
  selectedFlag: ComponentType<{ className?: string }>;
  getFlagComponent: (code: string) => ComponentType<{ className?: string }>;
  onCountryChange: (country: string) => void;
  hidePriceSelector?: boolean;
  unitLabelKey?: TranslationKey;
  
}

export function MobileHero({
  image,
  title,
  subtitle,
  activePrices,
  selectedCountryCode,
  selectedData,
  selectedFlag,
  getFlagComponent,
  onCountryChange,
  hidePriceSelector,
  unitLabelKey,
  
}: MobileHeroProps) {
    const {translate} = useLanguage()
  return (
    <section className="relative flex flex-col w-full h-[90vh] min-h-[650px] overflow-hidden md:hidden mb-6">
      {/* Background Image with Gold Border & Rounded Styling */}
      <div className="absolute inset-0 w-full h-full border border-[#A98B4B]/50">
        <Image
          src={image}
          alt={title || "Pearly Sky Hero"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#030712]/20" />
      </div>

      {/* Top Header / Nav elements if needed for mobile layout */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6">
        <span className="font-serif text-sm tracking-widest text-[#A98B4B] uppercase font-bold">
          PEARLY SKY
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white uppercase font-sans">English</span>
          <div className="flex flex-col gap-1 w-5 cursor-pointer">
            <span className="h-0.5 w-full bg-[#A98B4B]"></span>
            <span className="h-0.5 w-full bg-[#A98B4B]"></span>
            <span className="h-0.5 w-full bg-[#A98B4B]"></span>
          </div>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 mt-auto flex flex-col items-center px-6 pb-10 text-center">
        {/* Eco Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 backdrop-blur-md">
          <Star className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
          <span className="text-[10px] font-semibold tracking-[0.18em] text-emerald-300 uppercase">
            100% Vetted &amp; Eco-Certified Bilingual Team
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl font-normal tracking-tight text-white drop-shadow-md">
          {title ? translate(title as TranslationKey) : "Regular Home Cleaning"}
        </h1>

        {/* Subtitle */}
        <p className="mt-2 font-serif text-sm italic tracking-wide text-[#D4AF37]">
          {subtitle || "The weekly refresh: consistent clean, sustainable peace of mind."}
        </p>

        {/* Price Selector & CTA Layout */}
        <div className="mt-6 flex w-full flex-col items-center gap-4">
          {!hidePriceSelector && (
            <HeroPriceSelector
              activePrices={activePrices}
              selectedCountryCode={selectedCountryCode}
              selectedData={selectedData}
              selectedFlag={selectedFlag}
              getFlagComponent={getFlagComponent}
              onCountryChange={onCountryChange}
              unitLabelKey={unitLabelKey}
            />
          )}

          <div className="w-full">
            <ScheduleServiceButton />
          </div>
        </div>
      </div>
    </section>
  );
}