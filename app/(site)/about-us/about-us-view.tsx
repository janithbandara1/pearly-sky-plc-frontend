"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { Compass, Leaf,Shield, Layers, Users, Sparkles, Clock, Wallet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/hero-components/hero-with-social-links";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import PaymentMarquee from "@/components/payment-method-services";
import { Socialmedialinks } from "@/components/contactus/social-media";
import { 
  Gem, 
  ShieldCheck, 
  Phone, 
  UserCheck, 
  ConciergeBell, 
  MessageSquare, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
 
  X, 
  PawPrint, 
  Droplet, 
  Award,
  
} from 'lucide-react';
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { useState } from "react";
import QuoteModal from "@/components/home/quote-model";
import { aboutData } from "@/lib/content/webpage contents/about-page-content";
import { getTranslatedWord } from "@/lib/content/webpage contents/home-page-data";

/* const CORE_IDENTITY: { labelKey: TranslationKey; textKey: TranslationKey }[] = [
  { labelKey: "aboutIdentity1Label", textKey: "aboutIdentity1Text" },
  { labelKey: "aboutIdentity2Label", textKey: "aboutIdentity2Text" },
  { labelKey: "aboutIdentity3Label", textKey: "aboutIdentity3Text" },
];

const WHY_CHOOSE_US: { Icon: typeof Users; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Users, titleKey: "aboutWhy1Title", textKey: "aboutWhy1Text" },
  { Icon: Leaf, titleKey: "aboutWhy2Title", textKey: "aboutWhy2Text" },
  { Icon: Layers, titleKey: "aboutWhy3Title", textKey: "aboutWhy3Text" },
  { Icon: Wallet, titleKey: "aboutWhy4Title", textKey: "aboutWhy4Text" },
  { Icon: Clock, titleKey: "aboutWhy5Title", textKey: "aboutWhy5Text" },
  { Icon: Shield, titleKey: "aboutWhy6Title", textKey: "aboutWhy6Text" },
]; */



interface AboutPageProps {
  country?: 'fr' | 'uk' | 'lk';
}



export function AboutUsView() {
  const { translate, language } = useLanguage();
  const { aboutStoryParagraph2 } = getCountryPageContent(language);
const [isModalOpen, setIsModalOpen] = useState(false); 
  const content = aboutData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];

  const bullets = Array.isArray(content.sustainabilityBulletsList) 
  ? content.sustainabilityBulletsList 
  : [];

  return (
    <div className="bg-[#050914] text-slate-200 font-sans antialiased selection:bg-[#D4AF37] selection:text-[#050914]">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-[#D4AF37]/20 bg-[#0A1128]">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <Image 
            src="/images/about/about-hero.webp" 
            alt="Luxury Estate Background" 
            fill 
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/90 to-[#0A1128]/70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111827]/80 border border-[#D4AF37]/40 text-[#E5C985] text-xs font-semibold uppercase tracking-widest shadow-md">
              <Gem className="text-[#D4AF37] w-3.5 h-3.5" />
              <span>{getTranslatedWord(CURRENT_COUNTRY, content.heroTagline, translate)}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white leading-tight">
              {getTranslatedWord(CURRENT_COUNTRY, content.heroTitlePart1, translate)} <br />
              <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B08B40] bg-clip-text text-transparent">
                {getTranslatedWord(CURRENT_COUNTRY, content.heroTitleHighlight, translate)}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {getTranslatedWord(CURRENT_COUNTRY, content.heroDescription, translate)}
            </p>

            {/* Hero Stats Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">
                  {getTranslatedWord(CURRENT_COUNTRY, content.stat1Value, translate)}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat1Label,translate)}</span>
              </div> 
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat2Value,translate)}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat2Label,translate)}</span>
              </div> 
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat3Value,translate)}
                </span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat3Label,translate)}
                </span>
              </div> 
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat4Value,translate)}
                </span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">
                  {getTranslatedWord(CURRENT_COUNTRY,content.stat4Label,translate)}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY */}
      <section className="py-20 bg-[#050914] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{getTranslatedWord(CURRENT_COUNTRY,content.storyTagline,translate)}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {getTranslatedWord(CURRENT_COUNTRY,content.storyTitle,translate)}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {getTranslatedWord(CURRENT_COUNTRY,content.storyP1,translate)}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {getTranslatedWord(CURRENT_COUNTRY,content.storyP2,translate)}
              </p>

              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30 mt-4 space-y-3">
                <div className="flex items-center space-x-3 text-[#E5C985] font-serif text-lg font-bold">
                  <Leaf className="text-emerald-400 w-5 h-5" />
                  <span>{getTranslatedWord(CURRENT_COUNTRY,content.promiseTitle,translate)}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getTranslatedWord(CURRENT_COUNTRY,content.promiseDesc,translate)} 
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl h-[450px]">
                <Image 
                  src="/images/about/about-secondary.webp" 
                  alt="Pearly Sky Luxury Interior" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#A07A30] flex items-center justify-center font-bold text-[#050914] text-xl font-serif shrink-0">
                      PS
                    </div>
                    <div>
                      <h4 className="text-white font-serif font-bold text-sm">{getTranslatedWord(CURRENT_COUNTRY,content.storyImageBadgeTitle,translate)}</h4>
                      <p className="text-xs text-[#E5C985]">{getTranslatedWord(CURRENT_COUNTRY,content.storyImageBadgeSub,translate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE BRAND PILLARS / VALUES GRID */}
      <section className="py-20 bg-[#0A1128] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{getTranslatedWord(CURRENT_COUNTRY,content.pillarsTagline,translate)}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.pillarsTitle,translate)}</h2>
            <p className="text-slate-300 text-sm font-light">{getTranslatedWord(CURRENT_COUNTRY,content.pillarsSubtitle,translate)}</p>
          </div> 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.pillar1Title,translate)}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getTranslatedWord(CURRENT_COUNTRY,content.pillar1Desc,translate)}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">
                 {getTranslatedWord(CURRENT_COUNTRY,content.pillar1Tag,translate)}
                 </span>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {getTranslatedWord(CURRENT_COUNTRY,content.pillar2Title,translate)}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getTranslatedWord(CURRENT_COUNTRY,content.pillar2Desc,translate)}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">
                {getTranslatedWord(CURRENT_COUNTRY,content.pillar2Tag,translate)}</span>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <ConciergeBell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.pillar3Title,translate)}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getTranslatedWord(CURRENT_COUNTRY,content.pillar3Desc,translate)}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">
                {getTranslatedWord(CURRENT_COUNTRY,content.pillar3Tag,translate)}
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.pillar4Title,translate)}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getTranslatedWord(CURRENT_COUNTRY,content.pillar4Desc,translate)}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">{getTranslatedWord(CURRENT_COUNTRY,content.pillar4Tag,translate)}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COVERAGE MARQUEE TICKER SLIDER */}
      <section id="locations" className="py-10 bg-[#050914] border-b border-[#D4AF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            {getTranslatedWord(CURRENT_COUNTRY,content.locationsHeader,translate)}
          </h2>
          <span className="text-[11px] text-slate-400">{getTranslatedWord(CURRENT_COUNTRY,content.locationsCount,translate)}</span>
        </div>

        <div className="relative w-full flex overflow-x-hidden group">
          <div className="flex w-max gap-4 animate-marquee whitespace-nowrap py-2 group-hover:[animation-play-state:paused]">
            {[...content.cities, ...content.cities].map((city, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center space-x-3 bg-[#0A1128] border border-[#D4AF37]/30 rounded-full px-5 py-2 hover:border-[#D4AF37] transition-all shadow-md cursor-pointer shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-xs font-semibold text-slate-100">{city}</span>
                <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & EXPERT TEAMS */}
      <section className="py-20 bg-[#0A1128] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{getTranslatedWord(CURRENT_COUNTRY,content.teamTagline,translate)}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.teamTitle,translate)}</h2>
            <p className="text-slate-300 text-sm font-light">{getTranslatedWord(CURRENT_COUNTRY,content.teamSubtitle,translate)}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.teamMembers.map((member, idx) => (
              <div key={idx} className="bg-[#050914] border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group">
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif font-bold text-white text-lg">{member.name}</h4>
                  <span className="text-xs text-[#D4AF37] block font-medium">{getTranslatedWord(CURRENT_COUNTRY,member.role,translate)}</span>
                  <p className="text-[11px] text-slate-300 pt-2 font-light">{getTranslatedWord(CURRENT_COUNTRY,member.desc,translate)}</p>
                </div> 
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SUSTAINABILITY & CERTIFICATION STANDARDS */}
      <section className="py-20 bg-[#050914] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{getTranslatedWord(CURRENT_COUNTRY,content.sustainabilityTagline,translate)}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.sustainabilityTitle,translate)}</h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {getTranslatedWord(CURRENT_COUNTRY,content.sustainabilityDesc,translate)}
              </p>

              <ul className="space-y-4 text-xs text-slate-300">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="text-[#D4AF37] mr-3 mt-0.5 w-4 h-4 shrink-0" />
                    <span>{getTranslatedWord(CURRENT_COUNTRY,bullet,translate)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 text-center space-y-2">
                <Leaf className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif font-bold text-white text-base">Biodegradable</h4>
                <p className="text-[11px] text-slate-400">Formulated with organic botanicals</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 text-center space-y-2">
                <PawPrint className="w-8 h-8 text-[#D4AF37] mx-auto" />
                <h4 className="font-serif font-bold text-white text-base">Pet & Family Safe</h4>
                <p className="text-[11px] text-slate-400">Harmless to paws, skin, and infants</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 text-center space-y-2">
                <Droplet className="w-8 h-8 text-sky-400 mx-auto" />
                <h4 className="font-serif font-bold text-white text-base">Eco-Friendly</h4>
                <p className="text-[11px] text-slate-400">Sustainable non-polluting agents</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 text-center space-y-2">
                <Award className="w-8 h-8 text-[#D4AF37] mx-auto" />
                <h4 className="font-serif font-bold text-white text-base">ISO Compliant</h4>
                <p className="text-[11px] text-slate-400">Rigorous sanitation quality control</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-16 bg-[#0A1128] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#0A1128]/75 backdrop-blur-md p-8 sm:p-12 border border-[#D4AF37]/40 overflow-hidden text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{getTranslatedWord(CURRENT_COUNTRY,content.ctaTagline,translate)}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.ctaTitle,translate)}</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
              {getTranslatedWord(CURRENT_COUNTRY,content.ctaDesc,translate)}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#A07A30] text-[#050914] font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 shadow-xl transition-all"
              >
                {content.ctaBtnText}
              </button>
              <a 
                href="tel:+33743708780" 
                className="border border-[#D4AF37] text-[#E5C985] font-semibold px-8 py-4 rounded-xl text-xs uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+33 7 43 70 87 80</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Render the Modal */}
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        
      />
      

      {/* Tailored Custom CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
