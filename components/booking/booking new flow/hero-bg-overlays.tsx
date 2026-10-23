"use client";

import React from "react";
import { SERVICE_CONTENT_MAP } from "./hero-content";
import ScheduleServiceButton from "../Schedule-service-button";
import {Star, StarCheck} from "lucide-react";

export interface DynamicHeroOverlayProps {
  /** The slug corresponding to the service */
  serviceSlug?: string;
  /** Optional custom class names */
  className?: string;
}

export default function DynamicHeroOverlay({
  serviceSlug = "regular-home-cleaning",
  className = "",
}: DynamicHeroOverlayProps) {
  // Look up content safely with a fallback option
  const content =
    SERVICE_CONTENT_MAP[serviceSlug] || SERVICE_CONTENT_MAP["regular-home-cleaning"];

  return (
    <div
      className={`relative z-10 flex min-h-[680px]  md:min-h-[520px] w-full flex-col items-center justify-center bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/30 px-4 py-12 text-center sm:px-8 sm:py-16 md:px-12 ${className}`}
    >
      {/* Subtle radial vignette overlay for crisp readability without heavy boxes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#030712]/60 via-[#030712]/40 to-transparent" />

      {/* Main Content Container */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        {/* Eco/Service Badge */}
        {content.badgeText && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3.5 py-1.5 backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/60 sm:mb-6 sm:px-4 sm:py-2">
            
            <StarCheck className="text-green-500 w-4 h-4"  />
            <span className="text-[10px] font-semibold tracking-[0.18em] text-emerald-300 uppercase sm:text-xs">
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
        <ScheduleServiceButton  />
      </div>
    </div>
  );
}