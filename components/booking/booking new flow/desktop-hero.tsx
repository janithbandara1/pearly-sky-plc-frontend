"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { HeroPriceSelector, type HeroPriceOption } from "@/components/hero-price-selector";
import { Star } from "lucide-react";
import type { ComponentType } from "react";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import ScheduleServiceButton from "../Schedule-service-button";
import { useLanguage } from "@/lib/i18n/language-context";

interface DesktopHeroProps {
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

export function DesktopHero({
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
}: DesktopHeroProps) {
    const {translate} = useLanguage()
  return (
    <section className="relative hidden md:flex flex-col w-full h-[80vh] min-h-[685px] overflow-hidden mb-12">
      {/* Background Image with Gold Border */}
      <div className="absolute inset-0 w-full h-full border border-[#A98B4B]/50 rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title || "Pearly Sky Hero"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Rich Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]/20" />
      </div>

      {/* Desktop Navigation Bar Overlay */}
      <div className="relative z-20 flex items-center justify-between px-12 pt-8">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-widest text-[#A98B4B] uppercase font-bold">
            PEARLY SKY
          </span>
          <span className="text-[10px] tracking-widest text-slate-300 uppercase font-sans border-l border-[#A98B4B]/40 pl-3">
            Eco-Luxury Cleaning
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-sans text-slate-200">
            <Link href="/" className="hover:text-[#A98B4B] transition-colors">Home Services</Link>
            <Link href="/about" className="hover:text-[#A98B4B] transition-colors">About</Link>
            <Link href="/locations" className="hover:text-[#A98B4B] transition-colors">Locations</Link>
            <Link href="/contact" className="hover:text-[#A98B4B] transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-4 pl-4 border-l border-[#A98B4B]/30">
            <span className="text-xs text-white font-sans uppercase">English</span>
            <button className="rounded-full bg-[#A98B4B] px-5 py-2 text-xs font-semibold text-[#030712] transition-transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Centered Content Area */}
      <div className="relative z-10 my-auto flex flex-col items-center px-12 text-center max-w-4xl mx-auto">
        {/* Eco Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-2 backdrop-blur-md">
          <Star className="h-4 w-4 text-emerald-400 fill-emerald-400" />
          <span className="text-xs font-semibold tracking-[0.2em] text-emerald-300 uppercase">
            100% Vetted &amp; Eco-Certified Bilingual Team &bull; Luxury Standards
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl lg:text-6xl font-normal tracking-tight text-white drop-shadow-md">
          {title ? translate(title as TranslationKey) : "Regular Home Cleaning"}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 font-serif text-xl italic tracking-wide text-[#D4AF37]">
          {subtitle || "The weekly refresh: consistent clean, sustainable peace of mind."}
        </p>

        {/* Price Selector & CTA Button Layout */}
        <div className="mt-8 flex items-center justify-center gap-6">
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
          <ScheduleServiceButton />
        </div>
      </div>
    </section>
  );
}