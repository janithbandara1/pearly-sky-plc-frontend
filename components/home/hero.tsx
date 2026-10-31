"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";
import { COUNTRY_HERO_IMAGES, CURRENT_COUNTRY } from "@/lib/countries/config";
import { IoSparkles } from "react-icons/io5";
import { 
  Crown, 
  Home, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones 
} from 'lucide-react';
import QuoteModal from "./quote-model";
import { useState } from "react";
import { countryHeroContent, getTranslatedWord } from "@/lib/content/webpage contents/home-page-data";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";


interface HeroSectionProps {
  country?: 'uk' | 'fr' | 'lk';
  onBookClick?: () => void;
  onQuoteClick?: () => void;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { translate, language } = useLanguage();
  const { heroSubtitle, heroAvailability } =getCountryHomeContent(language);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<string>('');
  const HeroImages :Record<string,string> ={
   
    "fr": "/images/hero/fr-lk-hero-image.webp",
    "uk": "/images/hero/uk-hero.webp",
    "lk": "/images/hero/about-lk.webp"
  };

  const handleOpenModal = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsModalOpen(true);
  };

  const data = countryHeroContent[CURRENT_COUNTRY];

  
  

  const scrollToServices=()=>{
    
    document.getElementById("servicesection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative h-[100vh] min-h-[480px] w-full overflow-hidden bg-brand-navy md:h-[100vh]">
      <Image
        src={HeroImages[CURRENT_COUNTRY]}
        alt="Pearly Sky eco-luxury cleaning"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80 z-0 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#d4af371a] z-0 rounded-full blur-3xl"></div>
      {/**content */}
      <div className="relative z-10 max-w-7xl p-5 md:p-0 md:mt-10 mx-auto flex flex-col justify-center h-full gap-6">
        
        {/* Top Tagline Badge */}
        <div className="flex items-center gap-2 self-start bg-[#161d2f]/80 border border-[#2b354d] px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider text-[#d4af37] uppercase">
          <Crown className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>{getTranslatedWord(CURRENT_COUNTRY, data.tagline as string, translate)}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="max-w-2xl text-3xl font-serif leading-tight text-white md:text-5xl lg:text-6xl">
          {getTranslatedWord(CURRENT_COUNTRY, data.titlePrefix as string,translate)}<br/>
          <span className="text-[#c9a858] font-normal px-1 mr-0.5">
            {getTranslatedWord(CURRENT_COUNTRY, data.titleHighlight as string,translate)}
          </span>
          {getTranslatedWord(CURRENT_COUNTRY, data.titleSuffix as string,translate)}
          <span className="font-normal px-1">{getTranslatedWord(CURRENT_COUNTRY, data.countryName,translate)}</span>
        </h1>

        {/* Hero Paragraph */}
        <p className="max-w-xl text-xs md:text-sm text-gray-300 leading-relaxed">
          {getTranslatedWord(CURRENT_COUNTRY, data.description as string,translate)}
        </p>

        {/* Category Pill Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {data.categories.map((cat, idx) => (
            <div
              
            onClick={()=>scrollToServices()}
              key={idx}
              className="flex cursor-pointer items-center gap-1.5 bg-[#121824]/90 border border-[#2a3449] px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-200"
            >
              {cat.icon === 'home' && (
                <Home className="w-3.5 h-3.5 text-[#c9a858]" />
              )}
              {cat.icon === 'commercial' && (
                <Building2 className="w-3.5 h-3.5 text-[#c9a858]"  />
              )}
              {cat.icon === 'specialist' && (
                <Sparkles className="w-3.5 h-3.5 text-[#c9a858]"  />
              )}
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 bg-[#d4af37] text-[#0b0f17] font-semibold text-xs tracking-wider uppercase px-6 py-4 rounded-md hover:bg-[#c5a028] transition-colors"
          >
            <span>{getTranslatedWord(CURRENT_COUNTRY, data.ctaPrimary as string,translate)}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 bg-transparent border border-[#d4af37]/60 text-gray-200 font-semibold text-xs tracking-wider uppercase px-6 py-4 rounded-md hover:bg-[#d4af37]/10 transition-colors"
          >
            <Calculator className="w-4 h-4 shrink-0 text-[#d4af37]" />
            <span>{getTranslatedWord(CURRENT_COUNTRY, data.ctaSecondary as string,translate)}</span>
          </button>
        </div>

        {/* Bottom Feature Badges / Trust Bar */}
        <div className="border-t border-[#1e2738] py-4 my-2 flex p-4  gap-3 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{getTranslatedWord(CURRENT_COUNTRY, data.trustBadges[0] as string,translate)}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{getTranslatedWord(CURRENT_COUNTRY, data.trustBadges[1] as string,translate)}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <Headphones className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{getTranslatedWord(CURRENT_COUNTRY, data.trustBadges[2] as string,translate)}</span>
          </div>
        </div>
         
      </div>
      <QuoteModal 
          isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        
         /> 
    </section>
  );
}
