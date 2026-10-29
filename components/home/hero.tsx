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

interface HeroData {
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  countryName: string;
  description: string;
  categories: Array<{
    label: string;
    icon: 'home' | 'commercial' | 'specialist';
  }>;
  ctaPrimary: string;
  ctaSecondary: string;
  trustBadges: [string, string, string];
}

const countryHeroContent: Record<string, HeroData> = {
  "uk": {
    tagline: 'PURE SPACES. ELEVATED UK LIVING.',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'Eco-Luxury Cleaning ',
    titleSuffix: 'for Homes and Workspaces in ',
    countryName: 'United Kingdom',
    description:
      'Thoughtful, professional cleaning for homes and workspaces across the UK. Enjoy meticulous care, clear communication, and a service tailored to your space.',
    categories: [
      { label: 'Residential', icon: 'home' },
      { label: 'Commercial', icon: 'commercial' },
      { label: 'Specialist Care', icon: 'specialist' },
    ],
    ctaPrimary: 'BOOK YOUR CLEANING SERVICE',
    ctaSecondary: 'GET A FREE QUOTE',
    trustBadges: [
      '100% Satisfaction Guarantee',
      'DBS Checked & Vetted Specialists',
      '24/7 Dedicated UK Client Care',
    ],
  },
  "fr": {
    tagline: 'PURE SPACES. ELEVATED FRENCH LIVING.',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'Eco-Luxury Cleaning ',
    titleSuffix: 'for Homes and Workspaces in ',
    countryName: 'France',
    description:
      'Thoughtful, professional cleaning for homes and workspaces across France & Monaco. Enjoy meticulous care, clear communication, and a service tailored to your space.',
    categories: [
      { label: 'Residential', icon: 'home' },
      { label: 'Commercial', icon: 'commercial' },
      { label: 'Specialist Care', icon: 'specialist' },
    ],
    ctaPrimary: 'BOOK YOUR CLEANING SERVICE',
    ctaSecondary: 'GET A FREE QUOTE',
    trustBadges: [
      'Garantie 100% Satisfaction',
      'Équipes Qualifiées & Assurées',
      'Service Client Dedié 24/7',
    ],
  },
  "lk": {
    tagline: 'PURE SPACES. ELEVATED SRI LANKAN LIVING.',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'Eco-Luxury Cleaning ',
    titleSuffix: 'for Homes and Workspaces in ',
    countryName: 'Sri Lanka',
    description:
      'Thoughtful, professional cleaning for homes and workspaces across Colombo & Sri Lanka. Enjoy meticulous care, clear communication, and a service tailored to your space.',
    categories: [
      { label: 'Residential', icon: 'home' },
      { label: 'Commercial', icon: 'commercial' },
      { label: 'Specialist Care', icon: 'specialist' },
    ],
    ctaPrimary: 'BOOK YOUR CLEANING SERVICE',
    ctaSecondary: 'GET A FREE QUOTE',
    trustBadges: [
      '100% Satisfaction Guarantee',
      'Verified & Trained Specialists',
      '24/7 Dedicated Client Care',
    ],
  },
};

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
  
  const HeroImages :Record<string,string> ={
   
    "fr": "/images/hero/fr-lk-hero-image.webp",
    "uk": "/images/hero/uk-hero.webp",
    "lk": "/images/hero/fr-lk-hero-image.webp"
  };

  const data = countryHeroContent[CURRENT_COUNTRY || 'fr'];

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
      <div className="relative z-10 max-w-7xl p-5 md:p-0 mx-auto flex flex-col justify-center h-full gap-6">
        
        {/* Top Tagline Badge */}
        <div className="flex items-center gap-2 self-start bg-[#161d2f]/80 border border-[#2b354d] px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider text-[#d4af37] uppercase">
          <Crown className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>{data.tagline}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="max-w-2xl text-3xl font-serif leading-tight text-white md:text-5xl lg:text-6xl">
          {data.titlePrefix}
          <span className="text-[#c9a858] font-normal">
            {data.titleHighlight}
          </span>
          {data.titleSuffix}
          <span className="font-normal">{data.countryName}</span>
        </h1>

        {/* Hero Paragraph */}
        <p className="max-w-xl text-xs md:text-sm text-gray-300 leading-relaxed">
          {data.description}
        </p>

        {/* Category Pill Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {data.categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 bg-[#121824]/90 border border-[#2a3449] px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-200"
            >
              {cat.icon === 'home' && (
                <Home className="w-3.5 h-3.5 text-[#c9a858]" />
              )}
              {cat.icon === 'commercial' && (
                <Building2 className="w-3.5 h-3.5 text-[#c9a858]" />
              )}
              {cat.icon === 'specialist' && (
                <Sparkles className="w-3.5 h-3.5 text-[#c9a858]" />
              )}
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center">
          <button
            onClick={() => scrollToId("services")}
            className="flex items-center justify-center gap-2 bg-[#d4af37] text-[#0b0f17] font-semibold text-xs tracking-wider uppercase px-6 py-4 rounded-md hover:bg-[#c5a028] transition-colors"
          >
            <span>{data.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={() => scrollToId("services")}
            className="flex items-center justify-center gap-2 bg-transparent border border-[#d4af37]/60 text-gray-200 font-semibold text-xs tracking-wider uppercase px-6 py-4 rounded-md hover:bg-[#d4af37]/10 transition-colors"
          >
            <Calculator className="w-4 h-4 shrink-0 text-[#d4af37]" />
            <span>{data.ctaSecondary}</span>
          </button>
        </div>

        {/* Bottom Feature Badges / Trust Bar */}
        <div className="border-t border-[#1e2738] pt-4 mt-2 flex p-4  gap-3 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{data.trustBadges[0]}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{data.trustBadges[1]}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-300">
            <Headphones className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>{data.trustBadges[2]}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
