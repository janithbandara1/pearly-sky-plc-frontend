'use client';

import React from 'react';
import { 
  Home, 
  Building, 
  Landmark, 
  ConciergeBell, 
  Trophy, 
  Hotel, 
  Utensils, 
  GraduationCap, 
  ShoppingBag, 
  Plane, 
  HardHat, 
  Store, 
  Ship, 
  Building2, 
  Briefcase, 
  ShoppingBag as ShopIcon, 
  Film,
  LucideIcon
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { TranslationKey } from '@/lib/i18n/dictionaries/en';

interface SectorItem {
  name: string;
  icon: LucideIcon;
}

const sectorsList: SectorItem[] = [
  { name: 'residentialName', icon: Home },
  { name: 'commercialName', icon: Building },
  { name: 'privateEstateName', icon: Landmark },
  { name: 'hospitalityName', icon: ConciergeBell },
  { name: 'eventAndSportName', icon: Trophy },
  { name: 'hotelsAndResortsName', icon: Hotel },
  { name: 'restaurantsName', icon: Utensils },
  { name: 'schoolsAndAcademiesName', icon: GraduationCap },
  { name: 'luxuryRetailName', icon: ShoppingBag },
  { name: 'transportAndLogisticsName', icon: Plane },
  { name: 'constructionAndRenovationName', icon: HardHat },
  { name: 'shoppingMallName', icon: Store },
  { name: 'yachtAndShipCleaningName', icon: Ship },
  { name: 'governmentSectorName', icon: Building2 },
  { name: 'privateSectorName', icon: Briefcase },
  { name: 'shopsAndBoutiquesName', icon: ShopIcon },
  { name: 'cinemaAndEntertainmentName', icon: Film },
];

export default function SectorsSlider() {
  const {translate} =useLanguage(); // Ensure the language context is available
  return (
    <section id="sectors" className="py-16 bg-[#faf9f6]">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            {translate("tailoredSolutionsTitle")}
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0b121e] mt-2 leading-tight">
            {translate("industriesSectorsTitle")}
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {translate("industriesDescription")}
          </p>
        </div>
      </div>

      {/* 1-Line Continuous Sector Slider */}
      <div className="relative w-full flex overflow-x-hidden group bg-[#0b121e] py-6 border-y border-[#d4af37]/30 select-none">
        <div className="flex w-max gap-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...sectorsList,...sectorsList].map((sec, idx) => {
            const IconComponent = sec.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-[#0e1726]/90 border border-[#1e293b] px-5 py-3 rounded-xl shadow-lg hover:border-[#d4af37] transition-all cursor-pointer shrink-0"
              >
                <IconComponent className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  {translate(sec.name as TranslationKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind Keyframe  Marquee */}
      <style jsx>{`
        @keyframes marqueeReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marqueeReverse 40s linear infinite;
        }
      `}</style>
    </section>
  );
}