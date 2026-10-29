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

/* const VISION_MISSION: { Icon: typeof Compass; titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { Icon: Compass, titleKey: "aboutPageVisionTitle", textKey: "aboutVisionText" },
  { Icon: Sparkles, titleKey: "aboutPageMissionTitle", textKey: "aboutMissionText" },
];

const CORE_VALUES: { titleKey: TranslationKey; textKey: TranslationKey }[] = [
  {
    titleKey: "aboutValue1",
    textKey: "aboutValue1Text",
  },
  {
    titleKey: "aboutValue2",
    textKey: "aboutValue2Text",
  },
  {
    titleKey: "aboutValue3",
    textKey: "aboutValue3Text",
  },
  {
    titleKey: "aboutValue4",
    textKey: "aboutValue4Text",
  },
  {
    titleKey: "aboutValue5",
    textKey: "aboutValue5Text",
  },
];
const OBJECTIVES: TranslationKey[] = [
  "aboutObjective1",
  "aboutObjective2",
  "aboutObjective3",
  "aboutObjective4",
  "aboutObjective5",
];
 */
interface AboutPageContent {
  heroTagline: string;
  heroTitlePart1: string;
  heroTitleHighlight: string;
  heroDescription: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
  stat4Value: string; stat4Label: string;
  storyTagline: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  promiseTitle: string;
  promiseDesc: string;
  storyImageBadgeTitle: string;
  storyImageBadgeSub: string;
  pillarsTagline: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillar1Title: string; pillar1Desc: string; pillar1Tag: string;
  pillar2Title: string; pillar2Desc: string; pillar2Tag: string;
  pillar3Title: string; pillar3Desc: string; pillar3Tag: string;
  pillar4Title: string; pillar4Desc: string; pillar4Tag: string;
  locationsHeader: string;
  locationsCount: string;
  cities: string[];
  teamTagline: string;
  teamTitle: string;
  teamSubtitle: string;
  teamMembers: Array<{ name: string; role: string; desc: string; img: string }>;
  sustainabilityTagline: string;
  sustainabilityTitle: string;
  sustainabilityDesc: string;
  sustainabilityBullets: string[];
  ctaTagline: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtnText: string;
}

const aboutData: Record<'fr' | 'uk' | 'lk', AboutPageContent> = {
  fr: {
    heroTagline: "A Legacy of Distinction in France",
    heroTitlePart1: "Pure Spaces.",
    heroTitleHighlight: "Elevated Living Across France.",
    heroDescription: "Pearly Sky is France's premier eco-luxury cleaning partner. We serve distinguished residences, private estates, superyachts, corporate headquarters, and high-end hospitality venues from Paris to the French Riviera.",
    stat1Value: "100%", stat1Label: "Eco-Certified",
    stat2Value: "24/7", stat2Label: "VIP Concierge",
    stat3Value: "100%", stat3Label: "FR & EN Bilingual",
    stat4Value: "23+", stat4Label: "French Cities",
    storyTagline: "Our Story & Heritage",
    storyTitle: "Redefining Luxury Cleaning for Discerning Clients in France",
    storyP1: "Founded on the belief that immaculate cleanliness should never cost the health of your sanctuary or our planet, Pearly Sky bridges five-star hotel hospitality standards with cutting-edge, non-toxic eco-biotechnology.",
    storyP2: "From historic Haussmannian apartments in Paris and private estates in Courchevel to superyachts berthed in Monaco and Cannes, our discreet specialists ensure your environments radiate purity, peace, and health.",
    promiseTitle: "Non-Toxic Luxury Promise",
    promiseDesc: "Every formula used by Pearly Sky is 100% biodegradable, pet-safe, child-safe, and harmless to delicate marble, hardwood, and marine ecosystems.",
    storyImageBadgeTitle: "Discretion & Precision",
    storyImageBadgeSub: "Serving French VIPs, embassies, and private estates",
    pillarsTagline: "Guiding Standards",
    pillarsTitle: "The Four Pillars of Pearly Sky",
    pillarsSubtitle: "Engineered to exceed expectations for the most discerning residential and corporate clients across France.",
    pillar1Title: "Eco-Conscious Excellence",
    pillar1Desc: "Green Compass Eco-Certified non-toxic products that eliminate 99.9% of pathogens without volatile organic compounds or chemical residue.",
    pillar1Tag: "100% Biodegradable",
    pillar2Title: "Security & Discretion",
    pillar2Desc: "Rigorously vetted, background-checked, and security-cleared personnel bound by non-disclosure agreements for complete peace of mind.",
    pillar2Tag: "Vetted Personnel",
    pillar3Title: "Tailored VIP Protocols",
    pillar3Desc: "Custom cleaning checklists engineered specifically for high-value artwork, silk carpets, rare stone, and yacht interiors.",
    pillar3Tag: "Bespoke Standards",
    pillar4Title: "Bilingual Fluency",
    pillar4Desc: "Seamless communication in French and English across all client interactions, operations managers, and on-site specialists.",
    pillar4Tag: "French & English",
    locationsHeader: "Service Coverage Across France & Monaco",
    locationsCount: "23 Key Destinations",
    cities: [
      "Paris", "Nice", "Saint-Tropez", "Antibes", "Cannes", "Monaco", 
      "Normandy", "Deauville", "Dieppe", "La Rochelle", "Nantes", "Bordeaux", 
      "Toulouse", "Toulon", "Montpellier", "Strasbourg", "Arcachon", "Annecy", 
      "Biarritz", "Courchevel", "Megève", "Aix-en-Provence", "Mougins"
    ],
    teamTagline: "Our Experts",
    teamTitle: "Leadership Behind the Brilliance",
    teamSubtitle: "Seasoned hospitality and eco-cleaning leaders directing operations throughout France.",
    teamMembers: [
      { name: "Élodie de St. Germain", role: "Head of Luxury Operations — Paris", desc: "Former 5-star hotel director overseeing residential cleaning protocols across Île-de-France.", img: "/images/about/team-member1.webp" },
      { name: "Jean-Luc Laurent", role: "Riviera & Yachting Director", desc: "Maritime sanitation specialist leading superyacht and estate care in Monaco, Cannes & Nice.", img: "/images/about/team-member2.webp" },
      { name: "Dr. Claire Moreau", role: "Head of Eco-Sanitization", desc: "Environmental chemist formulating our proprietary non-toxic and hypoallergenic cleaning protocols.", img: "/images/about/team-member3.webp" },
      { name: "Marc-Antoine Vaneau", role: "Head of Concierge Relations", desc: "Dedicated liaison for luxury property managers, private family offices, and estate managers.", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "Green Compass Standard",
    sustainabilityTitle: "Our Environmental Commitments",
    sustainabilityDesc: "Pearly Sky strictly adheres to European eco-label guidelines and Green Compass standards. We safeguard both internal living air quality and external marine ecosystems across France.",
    sustainabilityBullets: [
      "Zero Harsh Solvents, Ammonia, or Synthetic Chlorine Fragrances",
      "100% Recyclable Packaging & Closed-Loop Refill Systems",
      "Safe for Marine Environments — Compliant with Yachting Bio-Regulations",
      "HEPA 14 Micro-Filtration Vacuuming for Allergen-Free Air Quality"
    ],
    ctaTagline: "Bespoke Cleaning Protocols",
    ctaTitle: "Experience Eco-Luxury Living in France Today",
    ctaDesc: "Contact our Paris or Riviera operations team to discuss customized care for your residence, estate, superyacht, or corporate workspace.",
    ctaBtnText: "Request a Personalized Quote"
  },
  uk: {
    heroTagline: "A Legacy of Distinction in the United Kingdom",
    heroTitlePart1: "Pure Spaces.",
    heroTitleHighlight: "Elevated Living Across London & UK.",
    heroDescription: "Pearly Sky is the UK's premier eco-luxury cleaning partner. We serve distinguished residences, private estates, penthouses, corporate headquarters, and high-end hospitality venues from London to Edinburgh.",
    stat1Value: "100%", stat1Label: "Eco-Certified",
    stat2Value: "24/7", stat2Label: "VIP Concierge",
    stat3Value: "100%", stat3Label: "DBS Vetted",
    stat4Value: "15+", stat4Label: "UK Cities",
    storyTagline: "Our Story & Heritage",
    storyTitle: "Redefining Luxury Cleaning for Discerning Clients in the UK",
    storyP1: "Founded on the belief that immaculate cleanliness should never cost the health of your sanctuary or our planet, Pearly Sky bridges five-star hotel hospitality standards with cutting-edge, non-toxic eco-biotechnology.",
    storyP2: "From historic townhouses in Mayfair and private country estates in the Cotswolds to luxury penthouses in Canary Wharf, our discreet specialists ensure your environments radiate purity, peace, and health.",
    promiseTitle: "Non-Toxic Luxury Promise",
    promiseDesc: "Every formula used by Pearly Sky is 100% biodegradable, pet-safe, child-safe, and harmless to delicate marble, hardwood, and fine textiles.",
    storyImageBadgeTitle: "Discretion & Precision",
    storyImageBadgeSub: "Serving British VIPs, embassies, and private estates",
    pillarsTagline: "Guiding Standards",
    pillarsTitle: "The Four Pillars of Pearly Sky",
    pillarsSubtitle: "Engineered to exceed expectations for the most discerning residential and corporate clients across the UK.",
    pillar1Title: "Eco-Conscious Excellence",
    pillar1Desc: "Green Compass Eco-Certified non-toxic products that eliminate 99.9% of pathogens without volatile organic compounds or chemical residue.",
    pillar1Tag: "100% Biodegradable",
    pillar2Title: "Security & Discretion",
    pillar2Desc: "Rigorously vetted, background-checked, and security-cleared personnel bound by non-disclosure agreements for complete peace of mind.",
    pillar2Tag: "Vetted Personnel",
    pillar3Title: "Tailored VIP Protocols",
    pillar3Desc: "Custom cleaning checklists engineered specifically for high-value artwork, silk carpets, rare stone, and bespoke luxury interiors.",
    pillar3Tag: "Bespoke Standards",
    pillar4Title: "English Proficiency",
    pillar4Desc: "Seamless communication across all client interactions, operations managers, and elite on-site cleaning specialists.",
    pillar4Tag: "Professional English",
    locationsHeader: "Service Coverage Across London & UK",
    locationsCount: "15 Key Destinations",
    cities: [
      "London", "Mayfair", "Kensington", "Chelsea", "Knightsbridge", "City of London",
      "Canary Wharf", "Cotswolds", "Oxford", "Cambridge", "Edinburgh", "Manchester",
      "Bristol", "Surrey", "Ascot", "Windsor", "Brighton", "Bath"
    ],
    teamTagline: "Our Experts",
    teamTitle: "Leadership Behind the Brilliance",
    teamSubtitle: "Seasoned hospitality and eco-cleaning leaders directing operations throughout the UK.",
    teamMembers: [
      { name: "Victoria Sterling", role: "Head of Luxury Operations — London", desc: "Former Mayfair hotel director overseeing residential cleaning protocols across Greater London.", img: "/images/about/team-member1.webp" },
      { name: "Alistair Vance", role: "Country Estates Director", desc: "Private estate management specialist leading luxury care across the Cotswolds and home counties.", img: "/images/about/team-member2.webp" },
      { name: "Dr. Evelyn Reed", role: "Head of Eco-Sanitization", desc: "Environmental scientist formulating our proprietary non-toxic and hypoallergenic cleaning protocols.", img: "/images/about/team-member3.webp" },
      { name: "Julian Thorne", role: "Head of Concierge Relations", desc: "Dedicated liaison for luxury property managers, family offices, and elite estate managers.", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "Green Compass Standard",
    sustainabilityTitle: "Our Environmental Commitments",
    sustainabilityDesc: "Pearly Sky strictly adheres to UK eco-label guidelines and Green Compass standards, safeguarding both internal living air quality and natural British environments.",
    sustainabilityBullets: [
      "Zero Harsh Solvents, Ammonia, or Synthetic Chlorine Fragrances",
      "100% Recyclable Packaging & Closed-Loop Refill Systems",
      "Safe for Wildlife & Eco-Friendly Botanical Formulas",
      "HEPA 14 Micro-Filtration Vacuuming for Allergen-Free Air Quality"
    ],
    ctaTagline: "Bespoke Cleaning Protocols",
    ctaTitle: "Experience Eco-Luxury Living in the UK Today",
    ctaDesc: "Contact our London operations team to discuss customized care for your residence, estate, penthouse, or corporate workspace.",
    ctaBtnText: "Request a Personalized Quote"
  },
  lk: {
    heroTagline: "A Legacy of Distinction in Sri Lanka",
    heroTitlePart1: "Pure Spaces.",
    heroTitleHighlight: "Elevated Living Across Colombo & Sri Lanka.",
    heroDescription: "Pearly Sky is Sri Lanka's premier eco-luxury cleaning partner. We serve distinguished residences, luxury villas, corporate headquarters, and high-end hospitality venues from Colombo to Galle.",
    stat1Value: "100%", stat1Label: "Eco-Certified",
    stat2Value: "24/7", stat2Label: "VIP Concierge",
    stat3Value: "100%", stat3Label: "Trained & Vetted",
    stat4Value: "10+", stat4Label: "Sri Lankan Cities",
    storyTagline: "Our Story & Heritage",
    storyTitle: "Redefining Luxury Cleaning for Discerning Clients in Sri Lanka",
    storyP1: "Founded on the belief that immaculate cleanliness should never cost the health of your sanctuary or our tropical environment, Pearly Sky bridges five-star hotel hospitality standards with cutting-edge, non-toxic eco-biotechnology.",
    storyP2: "From luxury coastal villas in Galle and modern apartments in Colombo to private highland estates in Nuwara Eliya, our discreet specialists ensure your environments radiate purity, peace, and health.",
    promiseTitle: "Non-Toxic Luxury Promise",
    promiseDesc: "Every formula used by Pearly Sky is 100% biodegradable, pet-safe, child-safe, and harmless to delicate marble, hardwood, and fine tropical finishes.",
    storyImageBadgeTitle: "Discretion & Precision",
    storyImageBadgeSub: "Serving distinguished clients and luxury villas across Sri Lanka",
    pillarsTagline: "Guiding Standards",
    pillarsTitle: "The Four Pillars of Pearly Sky",
    pillarsSubtitle: "Engineered to exceed expectations for the most discerning residential and corporate clients across Sri Lanka.",
    pillar1Title: "Eco-Conscious Excellence",
    pillar1Desc: "Green Compass Eco-Certified non-toxic products that eliminate 99.9% of pathogens without volatile organic compounds or chemical residue.",
    pillar1Tag: "100% Biodegradable",
    pillar2Title: "Security & Discretion",
    pillar2Desc: "Rigorously vetted, background-checked, and security-cleared personnel bound by non-disclosure agreements for complete peace of mind.",
    pillar2Tag: "Vetted Personnel",
    pillar3Title: "Tailored VIP Protocols",
    pillar3Desc: "Custom cleaning checklists engineered specifically for high-value artwork, teak timber, rare stone, and luxury tropical villa interiors.",
    pillar3Tag: "Bespoke Standards",
    pillar4Title: "Multilingual Fluency",
    pillar4Desc: "Seamless communication in English, Sinhala, and Tamil across all client interactions and on-site specialists.",
    pillar4Tag: "English, Sinhala & Tamil",
    locationsHeader: "Service Coverage Across Sri Lanka",
    locationsCount: "10 Key Destinations",
    cities: [
      "Colombo", "Mount Lavinia", "Dehiwala", "Battaramulla", "Rajagiriya", 
      "Kotte", "Negombo", "Galle Fort", "Bentota", "Kandy", "Nuwara Eliya", "Trincomalee"
    ],
    teamTagline: "Our Experts",
    teamTitle: "Leadership Behind the Brilliance",
    teamSubtitle: "Seasoned hospitality and eco-cleaning leaders directing operations throughout Sri Lanka.",
    teamMembers: [
      { name: "Chathura Perera", role: "Head of Operations — Colombo", desc: "Former 5-star resort operations director overseeing luxury residential cleaning across the Western Province.", img: "/images/about/team-member1.webp" },
      { name: "Dilshan Mendis", role: "Coastal & Villa Director", desc: "Hospitality sanitation specialist leading luxury villa and coastal estate care in Galle and Bentota.", img: "/images/about/team-member2.webp" },
      { name: "Dr. Anoma Wickramasinghe", role: "Head of Eco-Sanitization", desc: "Environmental scientist formulating our proprietary non-toxic and hypoallergenic cleaning protocols.", img: "/images/about/team-member3.webp" },
      { name: "Kasun Jayasuriya", role: "Head of Client Relations", desc: "Dedicated liaison for luxury property managers, private family offices, and upscale residential complexes.", img: "/images/about/team-member4.webp" }
    ],
    sustainabilityTagline: "Green Compass Standard",
    sustainabilityTitle: "Our Environmental Commitments",
    sustainabilityDesc: "Pearly Sky strictly adheres to eco-label guidelines and Green Compass standards, safeguarding both internal living air quality and tropical ecosystems across Sri Lanka.",
    sustainabilityBullets: [
      "Zero Harsh Solvents, Ammonia, or Synthetic Chlorine Fragrances",
      "100% Recyclable Packaging & Closed-Loop Refill Systems",
      "Safe for Tropical Gardens & Eco-Sensitive Environments",
      "HEPA 14 Micro-Filtration Vacuuming for Allergen-Free Air Quality"
    ],
    ctaTagline: "Bespoke Cleaning Protocols",
    ctaTitle: "Experience Eco-Luxury Living in Sri Lanka Today",
    ctaDesc: "Contact our Colombo operations team to discuss customized care for your residence, luxury villa, or corporate workspace.",
    ctaBtnText: "Request a Personalized Quote"
  }
};

interface AboutPageProps {
  country?: 'fr' | 'uk' | 'lk';
}



export function AboutUsView() {
  const { translate, language } = useLanguage();
  const { aboutStoryParagraph2 } = getCountryPageContent(language);
const [isModalOpen, setIsModalOpen] = useState(false);
  const content = aboutData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];

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
              <span>{content.heroTagline}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white leading-tight">
              {content.heroTitlePart1} <br />
              <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B08B40] bg-clip-text text-transparent">
                {content.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {content.heroDescription}
            </p>

            {/* Hero Stats Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">{content.stat1Value}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">{content.stat1Label}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">{content.stat2Value}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">{content.stat2Label}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">{content.stat3Value}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">{content.stat3Label}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30">
                <span className="block text-2xl font-serif font-bold text-[#E5C985]">{content.stat4Value}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider">{content.stat4Label}</span>
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{content.storyTagline}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {content.storyTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {content.storyP1}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {content.storyP2}
              </p>

              <div className="p-6 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/30 mt-4 space-y-3">
                <div className="flex items-center space-x-3 text-[#E5C985] font-serif text-lg font-bold">
                  <Leaf className="text-emerald-400 w-5 h-5" />
                  <span>{content.promiseTitle}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {content.promiseDesc}
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
                      <h4 className="text-white font-serif font-bold text-sm">{content.storyImageBadgeTitle}</h4>
                      <p className="text-xs text-[#E5C985]">{content.storyImageBadgeSub}</p>
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{content.pillarsTagline}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{content.pillarsTitle}</h2>
            <p className="text-slate-300 text-sm font-light">{content.pillarsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{content.pillar1Title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {content.pillar1Desc}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">{content.pillar1Tag}</span>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{content.pillar2Title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {content.pillar2Desc}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">{content.pillar2Tag}</span>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <ConciergeBell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{content.pillar3Title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {content.pillar3Desc}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">{content.pillar3Tag}</span>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-2xl bg-[#0A1128]/75 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">{content.pillar4Title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {content.pillar4Desc}
                </p>
              </div>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest pt-6 block font-semibold">{content.pillar4Tag}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COVERAGE MARQUEE TICKER SLIDER */}
      <section id="locations" className="py-10 bg-[#050914] border-b border-[#D4AF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{content.locationsHeader}</span>
          </h2>
          <span className="text-[11px] text-slate-400">{content.locationsCount}</span>
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{content.teamTagline}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{content.teamTitle}</h2>
            <p className="text-slate-300 text-sm font-light">{content.teamSubtitle}</p>
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
                  <span className="text-xs text-[#D4AF37] block font-medium">{member.role}</span>
                  <p className="text-[11px] text-slate-300 pt-2 font-light">{member.desc}</p>
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{content.sustainabilityTagline}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{content.sustainabilityTitle}</h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {content.sustainabilityDesc}
              </p>

              <ul className="space-y-4 text-xs text-slate-300">
                {content.sustainabilityBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="text-[#D4AF37] mr-3 mt-0.5 w-4 h-4 shrink-0" />
                    <span>{bullet}</span>
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{content.ctaTagline}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{content.ctaTitle}</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
              {content.ctaDesc}
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
