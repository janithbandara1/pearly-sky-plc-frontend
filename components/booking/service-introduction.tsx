"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { usePoolTheme } from "@/lib/pool-theme-context";
import {
  HeadLine,
  ServiceContentIntroBody,
} from "@/lib/types/services-types/serives-content-types";
import ScheduleServiceButton from "./Schedule-service-button";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";

export interface ServiceIntroductionProps {
  headline: HeadLine;
  body: ServiceContentIntroBody[];
  mainImage?: string;
  bgImage: string;
  theme?: string;
}

export function ServiceIntroduction({
  headline,
  body,
  mainImage = "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
  bgImage,
  theme: themeProp,
}: ServiceIntroductionProps) {
  const { translate } = useLanguage();
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  

  return (
    <section className="w-full p-0 my-1 md:my-6 transition-colors duration-300">
      <div className="relative w-full flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        {/* Overlapping Double-Frame Images Section */}
        <div className="relative w-full md:w-[45%] lg:w-[46%] flex items-center justify-start h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px]">
          {/* Background Decorative Arch Frame (Bottom-Left) */}
          <div
            className={`absolute w-[85%] md:w-[82%] rounded-2xl md:rounded-tl-[50px] md:rounded-br-[50px] bottom-0 left-0 z-0 h-[92%] md:h-[78%] lg:h-[84%] overflow-hidden transition-all duration-300 ${
              isLight
                ? "border-2 border-[#D8B63F]/50 shadow-md"
                : "border-2 border-[#FFD766]/35 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            }`}
          >
            <Image
              src={bgImage || mainImage}
              alt="Decorative Background"
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 38vw"
              className={`object-cover transition-opacity duration-300 ${
                isLight ? "opacity-75" : "opacity-60"
              }`}
            />
            {/* Subtle Gradient Veil for Dark Mode */}
            {!isLight && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#111C2E]/80 via-transparent to-transparent pointer-events-none" />
            )}
          </div>

          {/* Foreground Main Image Frame (Top-Right Overlap) */}
          <div
            className={`absolute top-0 right-0 md:right-4 md:top-8 z-10 w-[78%] md:w-[78%] h-[84%] md:h-[58%] overflow-hidden rounded-[20px] md:rounded-[24px] transition-all duration-300 hover:scale-[1.02] ${
              isLight
                ? "border-[2.5px] border-[#D8B63F] shadow-xl ring-1 ring-black/5"
                : "border-[2.5px] border-[#FFD766] shadow-[0_16px_40px_rgba(0,0,0,0.8)] ring-1 ring-[#FFD766]/20"
            }`}
          >
            <Image
              src={bgImage || mainImage}
              alt={translate(headline)}
              fill
              priority
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 55vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Modernized Luxury Content Card Container */}
        <div
          className={`relative w-full md:w-[55%] lg:w-[54%] flex flex-col justify-center gap-5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 transition-all duration-300 ${
            isLight
              ? "bg-white/95 backdrop-blur-md border border-[#D9DDE5] shadow-[0_12px_45px_rgba(0,47,109,0.06)] hover:border-[#D8B63F]/60"
              : "bg-[#1B2A40]/90 backdrop-blur-md border border-[#718096]/30 shadow-[0_16px_50px_rgba(0,0,0,0.5)] hover:border-[#FFD766]/50"
          }`}
        >
          {/* Top Luxury Pill Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${
                isLight
                  ? "border border-[#002F6D]/20 bg-[#002F6D]/10 text-[#002F6D]"
                  : "border border-[#FFD766]/40 bg-[#FFD766]/10 text-[#FFD766]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLight ? "bg-[#FFD766]" : "bg-[#FFD766] animate-pulse"
                }`}
              />
              <span>PearlSky Distinction</span>
            </span>
          </div>

              
          {/* Headline */}
          <h2
            className={`text-left text-2xl sm:text-3xl font-serif font-bold leading-snug sm:leading-snug md:leading-tight tracking-wide transition-colors ${
              isLight
                ? "text-[#002F6D]"
                : "text-[#FFD766] drop-shadow-[0_2px_10px_rgba(255,215,102,0.2)]"
            }`}
          >
            {translate(headline)}
          </h2>

          {/* Body Paragraphs */}
          <div className="space-y-3.5 w-full">
            {body.map((paragraph, index) => (
              <p
                key={index}
                className={`text-sm sm:text-base leading-relaxed text-justify font-normal transition-colors ${
                  isLight ? "text-[#687386]" : "text-[#C3CDDC]"
                }`}
              >
                {translate(paragraph)}
              </p>
            ))}
          </div>

          {/* Bottom Action / CTA Bar */}
          <div
            className={`mt-4 pt-5 border-t flex items-center justify-between flex-wrap gap-4 ${
              isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLight
                    ? "bg-[#FFD766]"
                    : "bg-[#FFD766] shadow-[0_0_8px_rgba(255,215,102,0.8)]"
                }`}
              />
              <p
                className={`font-serif font-semibold text-sm sm:text-base tracking-wide ${
                  isLight ? "text-[#d8b63f]" : "text-[#FFD766]"
                }`}
              >
                {translate("serviceIntroBottomText")}
              </p>
            </div>
            <div className="flex justify-center w-full">
                <ScheduleServiceButton isLight={isLight} />
            </div>
                
               
          </div>
        </div>
      </div>
    </section>
  );
}