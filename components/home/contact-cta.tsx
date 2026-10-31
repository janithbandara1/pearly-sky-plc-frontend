'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';

import { CURRENT_COUNTRY } from '@/lib/countries/config';
import QuoteModal from './quote-model';
import { useLanguage } from '@/lib/i18n/language-context';


interface ContactData {
  phone: string;
  phoneDisplay: string;
}

// Dynamic phone numbers using Record type for fr, uk, lk
const countryContactData: Record<'fr' | 'uk' | 'lk', ContactData> = {
  fr: {
    phone: '+33743708780',
    phoneDisplay: '+33 7 43 70 87 80',
  },
  uk: {
    phone: '+442079460921',
    phoneDisplay: '+44 20 7946 0921',
  },
  lk: {
    phone: '+94112345678',
    phoneDisplay: '+94 11 234 5678',
  },
};


export default function ContactUsCTAQuote() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contact = countryContactData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];

  const {translate} = useLanguage();

  return (
    <section id="contact" className="py-16 bg-[#fffdf4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-[#0b121e] p-8 md:p-12 border border-[#d4af37]/40 overflow-hidden shadow-2xl">
          
          {/* Background Image / Overlay (Visible on md screens and above) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
            <Image
              src="/images/hero/contact-cta.webp"
              alt="Luxury Cleaning Equipment"
              fill
              sizes="50vw"
              className="object-cover opacity-30"
            />
            {/* Gradient Overlay for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b121e] via-[#0b121e]/80 to-transparent" />
          </div>

          {/* Text Content */} 
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              {translate("instantEstimateTitle")}
            </span>
            
            <h2 className="text-3xl font-serif font-bold text-white mt-1 leading-tight md:text-4xl">
              {translate("freeQuoteTitle")}
            </h2>
            
            <p className="text-slate-300 text-sm mt-3 leading-relaxed font-light">
              {translate("estimateDescription")}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c9a858] px-8 py-3.5 text-center text-sm font-bold text-[#0b121e] shadow-md transition-all hover:brightness-110"
              >
                {translate("bookServiceCta")}
              </button>

              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/60 px-8 py-3.5 text-center text-sm font-semibold text-[#e5c158] transition-all hover:bg-[#d4af37]/10"
              >
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Call {contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Quote Modal Popup */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}