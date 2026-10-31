"use client";

import React from "react";
import { SERVICE_CONTENT_MAP } from "./hero-content";
import ScheduleServiceButton from "../Schedule-service-button";
import {Diamond, Leaf, ShieldCheck, Star, StarCheck} from "lucide-react";

export interface DynamicHeroOverlayProps {
  /** The slug corresponding to the service */
  serviceSlug?: string;
  /** Optional custom class names */
  className?: string;
  isQuote?: boolean;
}

export default function DynamicHeroOverlay({
  serviceSlug = "regular-home-cleaning",
  className = "",
  isQuote=false,
}: DynamicHeroOverlayProps) {
  // Look up content safely with a fallback option
  const content =
    SERVICE_CONTENT_MAP[serviceSlug] || SERVICE_CONTENT_MAP["regular-home-cleaning"];

  return (
    <div
      className={`relative z-10 flex min-h-[680px]  md:min-h-[680px] lg:min-h-[500px] w-full flex-col items-start justify-center bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/30 px-4 py-12 text-center sm:px-8 sm:py-16 md:px-12 ${className}`}
    >
      {/* Subtle radial vignette overlay for crisp readability without heavy boxes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#030712]/80 via-[#030712]/50 to-transparent" />
      {/* Main Content Container */}
      <div className="relative z-10 flex max-w-4xl flex-col items-start">
        {/* Eco/Service Badge */}
        {content.badgeText && (
          <div className="mb-4 inline-flex flex-col items-start gap-2 rounded-full ">
            
            <div className="w-8 h-[2px] bg-brand-gold"></div>
            <span className="text-[10px] font-semibold tracking-[0.18em] text-brand-gold uppercase sm:text-xs">
              {content.badgeText}
            </span>
          </div>
        )}

        {/* Main Title */}
        {content.title && (
          <h1 className="font-serif text-3xl font-normal tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>
        )}

        {/* Golden Italic Subtitle */}
        {content.subtitle && (
          <p className="mt-2.5 font-serif text-sm italic tracking-wide text-[#D4AF37] sm:mt-4 sm:text-lg md:text-xl lg:text-2xl">
            {content.subtitle}
          </p>
        )}

        {/* Description Paragraph */}
        {content.description && (
          <p className="mt-4 max-w-2xl text-xs leading-relaxed font-light text-slate-300 sm:mt-6 sm:text-sm md:text-base lg:text-lg">
            {content.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-8 md:gap-12 py-6">
      {/* Badge 1 */}
      <div className="flex flex-col items-center text-center group">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#030712]/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <Leaf className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <span className="mt-3 font-sans text-xs md:text-sm font-medium tracking-wide text-white leading-tight max-w-[100px]">
          100% Eco-Certified
        </span>
      </div>

      {/* Badge 2 */}
      <div className="flex flex-col items-center text-center group">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#030712]/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <span className="mt-3 font-sans text-xs sm:text-sm font-medium tracking-wide text-white leading-tight max-w-[110px]">
          Vetted &amp; Bilingual Team
        </span>
      </div>

      {/* Badge 3 */}
      <div className="flex flex-col items-center text-center group">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#030712]/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <Diamond className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <span className="mt-3 font-sans text-xs sm:text-sm font-medium tracking-wide text-white leading-tight max-w-[100px]">
          Luxury Standards
        </span>
      </div>
    </div>
        {/* {!isQuote && <ScheduleServiceButton  />} */}
      </div>
    </div>
  );
}