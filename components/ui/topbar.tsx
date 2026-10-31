'use client';

import React, { useState } from 'react';
import { Shield, Leaf, Phone, Mail, Globe } from 'lucide-react';

interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  teamText: string;
  ecoText: string;
}

// Dynamic data record using fr, uk, lk keys
const regionData: Record<'fr' | 'uk' | 'lk', ContactInfo> = {
  fr: {
    phone: '+33743708780',
    phoneDisplay: '+33 7 43 70 87 80',
    email: 'info@pearlyskyglobalclean.com',
    teamText: 'Bilingual French & English Teams Across France & Monaco',
    ecoText: '100% Non-Toxic & Eco-Certified Luxury Products',
  },
  uk: {
    phone: '+442079460921',
    phoneDisplay: '+44 20 7946 0921',
    email: 'uk@pearlyskyglobalclean.com',
    teamText: 'Professional Cleaning Teams Across London & UK',
    ecoText: '100% Non-Toxic & Eco-Certified Luxury Products',
  },
  lk: {
    phone: '+94112345678',
    phoneDisplay: '+94 11 234 5678',
    email: 'lk@pearlyskyglobalclean.com',
    teamText: 'Expert Support Teams Across Colombo & Sri Lanka',
    ecoText: '100% Non-Toxic & Eco-Certified Luxury Products',
  },
};

export default function TopBar() {
  const [currentRegion, setCurrentRegion] = useState<'fr' | 'uk' | 'lk'>('fr');
  const data = regionData[currentRegion];

  return (
    <div className="w-full bg-[#0b0f17] text-[#D4AF37] border-b border-[#2a2f3d] py-0 px-4 text-xs ">
      <div className="flex  items-center justify-between gap-3 flex-row md:max-w-7xl md:mx-auto">
        
        {/* Region Switcher Selector */}
        <div className="flex hidden items-center gap-2 bg-[#161b26] px-2.5 py-1 rounded-md border border-[#2a2f3d]">
          <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] uppercase tracking-wider text-gray-400">Region:</span>
          {(['fr', 'uk', 'lk'] as const).map((region) => (
            <button
              key={region}
              onClick={() => setCurrentRegion(region)}
              className={`px-2 py-0.5 rounded text-[11px] uppercase font-bold transition-colors ${
                currentRegion === region
                  ? 'bg-[#D4AF37] text-[#0b0f17]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Left / Main info items */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <div className="flex items-center gap-2 text-center md:text-left text-[8px]  lg:text-[11px]">
            <Shield className="w-4 h-4 shrink-0 text-[#D4AF37]" />
            <span>{data.teamText}</span>
          </div>

          <div className="hidden md:flex  items-center gap-2 text-center md:text-left text-[8px] lg:text-[11px]">
            <Leaf className="w-4 h-4 shrink-0 text-[#10b981]" />
            <span>{data.ecoText}</span>
          </div>
        </div>

        {/* Right / Contact items */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <a 
            href={`tel:${data.phone}`} 
            className="flex items-center gap-2 hover:underline transition-colors text-[8px] lg:text-[11px]"
          >
            <Phone className="w-4 h-4 shrink-0 text-[#D4AF37] " />
            <span>{data.phoneDisplay}</span>
          </a>

          <a 
            href={`mailto:${data.email}`} 
            className="hidden md:flex  items-center gap-2 hover:underline transition-colors text-[8px] md:text-[11px]"
          >
            <Mail className="w-4 h-4 shrink-0 text-[#D4AF37]" />
            <span>{data.email}</span>
          </a>
        </div>

      </div>
    </div>
  );
}