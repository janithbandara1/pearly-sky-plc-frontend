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

interface SectorItem {
  name: string;
  icon: LucideIcon;
}

const sectorsList: SectorItem[] = [
  { name: 'Residential', icon: Home },
  { name: 'Commercial', icon: Building },
  { name: 'Private Estate', icon: Landmark },
  { name: 'Hospitality', icon: ConciergeBell },
  { name: 'Event & Sport', icon: Trophy },
  { name: 'Hotels & Resorts', icon: Hotel },
  { name: 'Restaurants', icon: Utensils },
  { name: 'Schools & Academies', icon: GraduationCap },
  { name: 'Luxury Retail', icon: ShoppingBag },
  { name: 'Transport & Logistics', icon: Plane },
  { name: 'Construction & Renovation', icon: HardHat },
  { name: 'Shopping Mall', icon: Store },
  { name: 'Yacht & Ship Cleaning', icon: Ship },
  { name: 'Government Sector', icon: Building2 },
  { name: 'Private Sector', icon: Briefcase },
  { name: 'Shops & Boutiques', icon: ShopIcon },
  { name: 'Cinema & Entertainment', icon: Film },
];

export default function SectorsSlider() {
  return (
    <section id="sectors" className="py-16 bg-[#faf9f6]">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
            Tailored Solutions for Every Field
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0b121e] mt-2 leading-tight">
            Industries &amp; Sectors We Serve
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Providing bespoke, non-toxic eco-luxury cleaning standards across high-profile sectors in France &amp; Monaco.
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
                  {sec.name}
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