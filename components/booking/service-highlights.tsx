"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";
import {
  ServiceContentHighlightTitles,
} from "@/lib/types/services-types/serives-content-types";
import { useLanguage } from "@/lib/i18n/language-context";
import { usePoolTheme } from "@/lib/pool-theme-context";
import { Check, Home } from "lucide-react";

export interface ServiceHighlightsProps {
  title?: ServiceContentHighlightTitles;
  cards: ServiceHighlightCard[];
  theme: string;
  onThemeChange?: (theme: "dark" | "light") => void;
}
 
interface CardItemProps {
  card: ServiceHighlightCard;
  theme: string;
}

const titleIcons = [
  { key: "home", icon: <Home /> }
];

/** Individual modernized luxury highlight card */
function HighlightCard({ card, theme = "light" }: CardItemProps) {
  const { translate } = useLanguage();
  const isLight = theme === "light";

  return (
    <div
      className={`group relative h-full rounded-[16px] sm:rounded-[24px] p-[1.5px] transition-all duration-300 hover:-translate-y-1.5 ${
        isLight
          ? "bg-gradient-to-b from-[#D8B63F]/40 via-[#D8B63F]/40 to-[#D8B63F]/40 shadow-[0_4px_25px_rgba(216,182,63,0.1)] hover:from-[#D8B63F]/70 hover:shadow-[0_10px_30px_rgba(216,182,63,0.2)]"
          : "bg-gradient-to-b from-[#FFD766]/35 via-[#FFD766]/35 to-[#FFD766]/35 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:from-[#FFD766]/70 hover:shadow-[0_14px_40px_rgba(255,215,102,0.15)]"
      }`}
    >
      <div
        className={`h-full rounded-[14.5px] sm:rounded-[22.5px] p-6 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] transition-colors duration-300 ${
          isLight ? "bg-white" : "bg-[#1B2A40]"
        }`}
      >
        <div>
          {/* Card Title Header */}
          <div
            className={`flex items-center justify-center min-h-[48px] border-b pb-3.5 mb-4 text-center ${
              isLight ? "border-[#D9DDE5]" : "border-[#718096]/25"
            }`}
          >
            <h3
              className={`font-serif font-bold text-base sm:text-lg tracking-wide ${
                isLight ? "text-[#1A2238]" : "text-[#FFD766]"
              }`}
            >
              {translate(card.title)}
            </h3>
          </div>

          {/* Features List */}
          <ul className="text-sm leading-relaxed space-y-3">
            {card.features.map((feature, featureIdx) => (
              <li key={featureIdx} className="flex items-start gap-2.5">
                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    isLight
                      ? "bg-[#FFD766] text-[#fff]"
                      : "bg-[#FFD766]/20 text-[#FFD766] shadow-[0_0_8px_rgba(255,215,102,0.3)]"
                  }`}
                >
                  {/* <svg
                    className="h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg> */}
                  <Check  className={`h-3 w-3 ${
                    isLight
                      ? " text-[#fff]"
                      : " text-[#FFD766]" } `} />
                </span>
                <span
                  className={`font-medium ${
                    isLight ? "text-[#1A2238]" : "text-[#C3CDDC]"
                  }`}
                >
                  {translate(feature)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtle Bottom Accent */}
        <div
          className={`mt-4 pt-3 border-t w-full flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase ${
            isLight
              ? "border-[#D9DDE5] text-[#687386]"
              : "border-[#718096]/25 text-[#718096]"
          }`}
        >
          <span>Included</span>
          <span className={isLight ? "text-[#d8b63f] font-bold" : "text-[#FFD766]"}>
            PearlSky Standard
          </span>
        </div>
      </div>
    </div>
  );
}

/** Highlights Carousel for cards >= 5 */
function HighlightsFullCarousel({
  cards,
  theme,
}: {
  cards: ServiceHighlightCard[];
  theme: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="px-4 mt-2 max-w-7xl mx-auto">
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none pb-4"
      >
        <div className="flex gap-6 -ml-4 pl-4 items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="shrink-0 grow-0 basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] min-w-0"
            >
              <HighlightCard card={card} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Modernized Luxury Pagination Indicator */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => {
            const isLight = theme === "light";
            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  selectedIndex === index
                    ? isLight
                      ? "w-7 h-2 rounded-full bg-[#d8b63f] shadow-[0_0_8px_rgba(0,47,109,0.3)]"
                      : "w-7 h-2 rounded-full bg-gradient-to-r from-[#FFD766] to-[#D8B63F] shadow-[0_0_12px_rgba(255,215,102,0.5)]"
                    : isLight
                    ? "w-2 h-2 rounded-full bg-[#D9DDE5] hover:bg-[#687386]/40"
                    : "w-2 h-2 rounded-full bg-[#718096]/40 hover:bg-[#718096]/70"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Mobile Swipeable Carousel for cards <= 4 */
function HighlightsMobileCarousel({
  cards,
  theme,
}: {
  cards: ServiceHighlightCard[];
  theme: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const isLight = theme === "light";

  return (
    <div className="block min-[542px]:hidden px-4">
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none pb-4"
      >
        <div className="flex">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full shrink-0 grow-0 basis-full px-1 min-w-0"
            >
              <HighlightCard card={card} theme={theme} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {cards.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? isLight
                    ? "w-6 h-2 rounded-full bg-[#d8b63f]"
                    : "w-6 h-2 rounded-full bg-gradient-to-r from-[#FFD766] to-[#D8B63F]"
                  : isLight
                  ? "w-2 h-2 rounded-full bg-[#D9DDE5]"
                  : "w-2 h-2 rounded-full bg-[#718096]/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ServiceHighlights({
  title,
  cards,
  theme = "light",
}: ServiceHighlightsProps) {
  const { translate } = useLanguage();
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = theme ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light"; 

  if (!cards || cards.length === 0) return null;

  // Grid configuration for cards.length <= 4 on desktop & tablet
  const getGridConfig = (length: number) => {
    switch (length) {
      case 4:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          cardWidth: "w-full max-w-[340px]",
          containerMax: "max-w-7xl",
        };
      case 3:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          cardWidth: "w-full max-w-[360px]",
          containerMax: "max-w-6xl",
        };
      case 2:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2",
          cardWidth: "w-full max-w-[380px]",
          containerMax: "max-w-3xl",
        };
      case 1:
      default:
        return {
          gridCols: "grid-cols-1",
          cardWidth: "w-full max-w-[420px]",
          containerMax: "max-w-md",
        };
    }
  };

  const isCarousel = cards.length >= 5;
  const gridConfig = getGridConfig(cards.length);

  return (
    <section className="py-8 mt-2 w-full transition-colors duration-300">
      {/* Section Header */}
      <div className="text-center mb-8 px-4">
        <h2
          className={`font-serif font-bold text-2xl sm:text-3xl tracking-wide ${
            isLight
              ? "text-[#002F6D]"
              : "text-[#FFD766] drop-shadow-[0_2px_10px_rgba(255,215,102,0.25)]"
          }`}
        >
          {title ? translate(title) : translate("serviceHighlightSectionHeader")}
        </h2>
        <h2 className={`font-serif font-bold text-2xl md:text-3xl tracking-wide ${
            isLight
              ? "text-[#d8b63f]"
              : "text-[#FFD766] drop-shadow-[0_2px_10px_rgba(255,215,102,0.25)]"
          }`}>{translate("serviceChecklist")}</h2>
        <div
          className={`w-16 h-1 mx-auto mt-2.5 rounded-full ${
            isLight ? "bg-[#d8b63f]" : "bg-gradient-to-r from-[#FFD766] to-[#D8B63F]"
          }`}
        />
      </div>

      {isCarousel ? (
        <HighlightsFullCarousel cards={cards} theme={activeTheme} />
      ) : (
        <>
          {/* Desktop & Tablet Grid View */}
          <div
            className={`hidden min-[542px]:grid ${gridConfig.gridCols} justify-items-center gap-6 lg:gap-8 px-4 items-stretch ${gridConfig.containerMax} mx-auto`}
          >
            {cards.map((card, idx) => (
              <div key={idx} className={`${gridConfig.cardWidth} h-full`}>
                <HighlightCard card={card} theme={activeTheme} />
              </div>
            ))}
          </div>

          {/* Mobile Swipeable Embla Carousel */}
          <HighlightsMobileCarousel cards={cards} theme={activeTheme} />
        </>
      )}
    </section>
  );
}
