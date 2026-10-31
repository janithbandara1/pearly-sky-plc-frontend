'use client';

import React from 'react';
import { 
  Compass, 
  Star, 
  Globe, 
  Leaf, 
  Languages, 
  ShieldCheck, 
  LucideIcon 
} from 'lucide-react';
import { TranslationKey,  } from '@/lib/i18n/dictionaries/en';
import { getTranslatedWord } from '@/lib/content/webpage contents/home-page-data';
import { CURRENT_COUNTRY } from '@/lib/countries/config';
import { useLanguage } from '@/lib/i18n/language-context';

interface FeatureItem {
  icon: LucideIcon;
  title: string | TranslationKey;
  subtitle: string | TranslationKey;
  iconColor: string;
}

const featuresList: FeatureItem[] = [
  {
    icon: Compass,
    title: 'greenCompassTitle',
    subtitle: 'greenCompassSubtitle',
    iconColor: 'text-[#eab308]', // Vibrant Yellow/Gold
  },
  { 
    icon: Star,
    title: 'fiveStarRatingTitle',
    subtitle: 'fiveStarRatingSubtitle',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: Globe,
    title: 'globalPartnershipTitle',
    subtitle: 'globalPartnershipSubtitle',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: Leaf,
    title: 'ecoFriendlyProductsTitle',
    subtitle: 'ecoFriendlyProductsSubtitle',
    iconColor: 'text-[#10b981]', // Bright Emerald/Green
  },
  {
    icon: Languages,
    title: 'englishFrenchTitle',
    subtitle: 'englishFrenchSubtitle',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: ShieldCheck,
    title: 'vettedTeamTitle',
    subtitle: 'vettedTeamSubtitle',
    iconColor: 'text-[#eab308]',
  },
];

export default function FeaturesBar() {
  const {translate} =useLanguage(); // Ensure the language context is available
  return (
    <section className="bg-[#0f172a] border-[#38311d] border-t border-b py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 text-center">
          {featuresList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#11182766] border border-[#1e293b] hover:border-[#38311d] transition-colors"
              >
                <IconComponent className={`w-6 h-6 ${item.iconColor} mb-2.5 shrink-0`} />
                <span className="text-xs font-semibold text-white tracking-wide">
                  {translate(item.title as TranslationKey)}
                </span>
                <span className="text-[11px] text-[#8e9eb5] mt-0.5">
                  {translate(item.subtitle as TranslationKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}