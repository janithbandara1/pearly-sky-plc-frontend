'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from '@/components/locale-link';
import { useLanguage } from '@/lib/i18n/language-context';
import { TranslationKey } from '@/lib/i18n/dictionaries/en';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  FileCheck,
  Wrench,
  WashingMachine,
  Building2,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  titleKey: TranslationKey;
  name: string;
  suffix?: string;
  image: string;
  icon: React.ElementType;
}
const SERVICE_IMAGE_BASE = '/images/services';
const relatedServices: ServiceItem[] = [
  {
    id: 'deep-cleaning',
    titleKey: 'serviceLableDeepCleaning',
    name: 'deep-cleaning',
    image: `${SERVICE_IMAGE_BASE}/updated-images/deep-cleaning.webp`,
    icon: Sparkles,
  },
  {
    id: 'regular-home-cleaning',
    titleKey: 'serviceLableRegularHomeCleaning',
    name: 'regular-home-cleaning',
    image: `${SERVICE_IMAGE_BASE}/updated-images/Regular-Home-Cleaning.webp`,
    icon: Home,
  },
  {
    id: 'end-of-tenancy',
    titleKey: 'serviceLableEndOfTenancyCleaning',
    name: 'end-of-tenancy-cleaning',
    image: `${SERVICE_IMAGE_BASE}/updated-images/end-of-tendancy.webp`,
    icon: FileCheck,
  },
  {
    id: 'post-construction',
    titleKey: 'serviceLablePostConstructionRenovationCleaning',
    name: 'post-construction-renovation-cleaning',
    image: `${SERVICE_IMAGE_BASE}/updated-images/Post-Construction-&-Renovation-Cleaning.webp`,
    icon: Wrench,
  },
  {
    id: 'laundry-service',
    titleKey: 'serviceLableLaundryService',
    name: 'laundry-service',
    suffix: '/request-quotation',
    image: `${SERVICE_IMAGE_BASE}/updated-images/Laundry-Service.webp`,
    icon: WashingMachine,
  },
  {
    id: 'commercial-office-cleaning',
    titleKey: 'serviceLableCommercialOfficeCleaning',
    name: 'commercial-office-cleaning',
    image: `${SERVICE_IMAGE_BASE}/updated-images/Commercial-&-Office-Cleaning.webp`,
    icon: Building2,
  },
];

export default function RelatedServices({ slugs = {} }: { slugs?: Record<string, string> }) {
  const { translate } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(3); // Default highlighting index

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = 140;
    container.scrollTo({
      left: index * cardWidth - container.clientWidth / 2 + cardWidth / 2,
      behavior: 'smooth',
    });
  };

  const handleScrollEvent = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 136 + 12;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < relatedServices.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--ps-page-bg)] py-16 px-4 sm:px-8 font-poppins text-[var(--ps-text-main)] select-none">
      {/* Decorative Gradient Accent Background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-[var(--ps-gold-accent)]/20 via-[var(--ps-gold-accent)]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-[var(--ps-gold-accent)]/15 via-transparent to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--ps-gold-accent)]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[var(--ps-gold-accent)] uppercase">
              {translate("exploreServicesRelated")}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--ps-gold-accent)]" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Explore <span className="bg-gradient-to-r from-[#fef08a] via-[var(--ps-gold-accent)] to-[#9a7b1c] bg-clip-text text-transparent">Related Services</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto font-light opacity-80">
            Professional, eco-friendly and luxury cleaning services for your home and workplace.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-25 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ps-gold-accent)]/60 bg-[var(--ps-card-bg)] backdrop-blur-md text-[var(--ps-gold-accent)] shadow-lg transition-all duration-300 hover:bg-[var(--ps-gold-accent)] hover:text-[var(--ps-btn-primary-text)] hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-25 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ps-gold-accent)]/60 bg-[var(--ps-card-bg)] backdrop-blur-md text-[var(--ps-gold-accent)] shadow-lg transition-all duration-300 hover:bg-[var(--ps-gold-accent)] hover:text-[var(--ps-btn-primary-text)] hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-6 w-6 stroke-[2.5]" />
          </button>

          {/* Horizontal Scrollable Track */}
          <div
            ref={scrollRef}
            onScroll={handleScrollEvent}
            className="no-scrollbar flex items-stretch gap-3 overflow-x-auto scroll-smooth py-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {relatedServices.map((service, index) => {
              const IconComponent = service.icon;
              const isActive = index === activeIndex;
              const hrefPath = `/services/${slugs[service.name] ?? service.name}${service.suffix ?? ""}`;

              return (
                <Link
                  key={service.name}
                  href={hrefPath}
                  onClick={() => setActiveIndex(index)}
                  className={`group/card relative flex flex-col items-center flex-shrink-0 w-[130px] sm:w-[136px] rounded-2xl border bg-[var(--ps-card-bg)] p-2 transition-all duration-300 hover:-translate-y-1.5 ${
                    isActive
                      ? 'border-[var(--ps-gold-accent)] shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105'
                      : 'border-[var(--ps-gold-accent)]/30 hover:border-[var(--ps-gold-accent)]/70'
                  }`}
                >
                  {/* Image Card Container */}
                  <div className="relative w-full h-[155px] overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src={service.image}
                      alt={translate(service.titleKey)}
                      fill
                      sizes="136px"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />

                    {/* Circular Icon Overlay at bottom center of image */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ps-gold-accent)] bg-[var(--ps-card-bg)] text-[var(--ps-gold-accent)] shadow-md transition-all duration-300 group-hover/card:bg-[var(--ps-gold-accent)] group-hover/card:text-[var(--ps-btn-primary-text)]">
                        <IconComponent className="h-5 w-5 stroke-[1.75]" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="pt-6 pb-2 text-center flex-1 flex items-center justify-center">
                    <span
                      className={`text-xs font-medium leading-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--ps-gold-accent)] font-semibold'
                          : 'opacity-90 group-hover/card:text-[var(--ps-gold-accent)]'
                      }`}
                    >
                      {translate(service.titleKey)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {relatedServices.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-6 bg-[var(--ps-gold-accent)] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                  : 'w-2.5 bg-slate-600/60 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}