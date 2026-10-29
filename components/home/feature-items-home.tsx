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

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor: string;
}

const featuresList: FeatureItem[] = [
  {
    icon: Compass,
    title: 'Green Compass',
    subtitle: 'Eco-Certified',
    iconColor: 'text-[#eab308]', // Vibrant Yellow/Gold
  },
  {
    icon: Star,
    title: '5-Star Service Rating',
    subtitle: 'Luxury Standard',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: Globe,
    title: 'Global Partnership',
    subtitle: 'Vetted Network',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    subtitle: 'Pet & Child Safe',
    iconColor: 'text-[#10b981]', // Bright Emerald/Green
  },
  {
    icon: Languages,
    title: 'English & French',
    subtitle: 'Bilingual Teams',
    iconColor: 'text-[#eab308]',
  },
  {
    icon: ShieldCheck,
    title: 'Vetted Team',
    subtitle: 'Background Checked',
    iconColor: 'text-[#eab308]',
  },
];

export default function FeaturesBar() {
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
                  {item.title}
                </span>
                <span className="text-[11px] text-[#8e9eb5] mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}