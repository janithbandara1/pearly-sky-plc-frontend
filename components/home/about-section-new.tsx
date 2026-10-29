'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Clock, Shield } from 'lucide-react';
import { CURRENT_COUNTRY } from '@/lib/countries/config';

interface AboutContent {
  regionTitle: string;
  headlineHighlight: string;
  descriptionMain: string;
  descriptionEco: string;
  bannerTitle: string;
  bannerSubtitle: string;
  imageSrc: string;
}

const aboutData: Record<'fr' | 'uk' | 'lk', AboutContent> = {
  fr: {
    regionTitle: 'Service Excellence Throughout France',
    headlineHighlight: 'Service Excellence Throughout France',
    descriptionMain:
      'At Pearly Sky, we understand that maintaining a pristine environment is essential for productivity and well-being. Whether you require routine home cleaning, comprehensive office deep-cleaning, or specialized yacht concierge services, our team delivers unmatched quality across France & Monaco.',
    descriptionEco:
      'We utilize eco-friendly, luxury-grade cleaning products that are safe for your family, pets, and workplace, ensuring a thorough clean without harsh chemicals.',
    bannerTitle: 'Bilingual French & English Teams',
    bannerSubtitle: 'Seamless communication across all 23 territories',
    imageSrc: '/images/about-hero.webp',
  },
  uk: {
    regionTitle: 'Service Excellence Across United Kingdom',
    headlineHighlight: 'Service Excellence Across London & UK',
    descriptionMain:
      'At Pearly Sky, we understand that maintaining a pristine environment is essential for productivity and well-being. Whether you require routine home cleaning, comprehensive office deep-cleaning, or specialized estate care services, our team delivers unmatched quality across the UK.',
    descriptionEco:
      'We utilize eco-friendly, luxury-grade cleaning products that are safe for your family, pets, and workplace, ensuring a thorough clean without harsh chemicals.',
    bannerTitle: 'Professional Vetted British Teams',
    bannerSubtitle: 'Seamless communication & elite standards across the UK',
    imageSrc: '/images/hero/about-uk.webp',
  },
  lk: {
    regionTitle: 'Service Excellence Across Sri Lanka',
    headlineHighlight: 'Service Excellence Across Colombo & Sri Lanka',
    descriptionMain:
      'At Pearly Sky, we understand that maintaining a pristine environment is essential for productivity and well-being. Whether you require routine home cleaning, comprehensive office deep-cleaning, or specialized commercial property care, our team delivers unmatched quality across Sri Lanka.',
    descriptionEco:
      'We utilize eco-friendly, luxury-grade cleaning products that are safe for your family, pets, and workplace, ensuring a thorough clean without harsh chemicals.',
    bannerTitle: 'Expert Certified Local Teams',
    bannerSubtitle: 'Dedicated support across Colombo & regional provinces',
    imageSrc: '/images/hero/about-fr.webp', 
  },
};



export default function AboutSectionNew() {

  const content = aboutData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];

  return (
    <section id="about" className="py-20 bg-[#0b121e] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              Pearly Sky Luxury Standard
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Why Choose Pearly Sky? <br />
              <span className="bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c9a858] bg-clip-text text-transparent">
                {content.headlineHighlight}
              </span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {content.descriptionMain}
            </p>
            
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {content.descriptionEco}
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0e1726] border border-[#d4af37]/20">
                <Shield className="text-[#d4af37] w-6 h-6 mb-2" />
                <h4 className="text-sm font-bold text-white">Pet &amp; Child Safe</h4>
                <p className="text-xs text-slate-400 mt-1">100% Organic non-toxic formulations</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1726] border border-[#d4af37]/20">
                <Clock className="text-[#d4af37] w-6 h-6 mb-2" />
                <h4 className="text-sm font-bold text-white">24/7 Availability</h4>
                <p className="text-xs text-slate-400 mt-1">Dedicated support whenever you need</p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl">
              <div className="relative w-full h-96">
                <Image
                  src={content.imageSrc}
                  alt="Pearly Sky Luxury Cleaning Service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent" />
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#0b121e]/80 backdrop-blur-md border border-[#d4af37]/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c9a858] flex items-center justify-center font-bold text-[#0b121e] text-xl shrink-0">
                    PS
                  </div>
                  <div>
                    <h4 className="text-white font-serif font-bold text-sm sm:text-base">
                      {content.bannerTitle}
                    </h4>
                    <p className="text-xs text-[#e5c158] mt-0.5">
                      {content.bannerSubtitle}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}