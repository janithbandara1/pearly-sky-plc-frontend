"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";
import {
  ServiceContentHighlightTitles,
} from "@/lib/types/services-types/serives-content-types";
import { useLanguage } from "@/lib/i18n/language-context";
import { usePoolTheme } from "@/lib/pool-theme-context";

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

/** Individual modernized luxury highlight card */
function HighlightCard({ card, theme="light" }: CardItemProps) {
  const { translate } = useLanguage();

  return (
    <div
      className={`group relative h-full rounded-2xl sm:rounded-3xl p-[1.5px] transition-all duration-300 hover:-translate-y-1.5 ${
        theme === "light"
          ? "bg-gradient-to-b from-[#C5A059]/40 via-[#C5A059]/20 to-transparent shadow-[0_4px_25px_rgba(197,160,89,0.12)] hover:from-[#C5A059]/80 hover:shadow-[0_12px_35px_rgba(197,160,89,0.25)]"
          : "bg-gradient-to-b from-[#c9a858]/40 via-[#c9a858]/15 to-[#c9a858]/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:from-[#c9a858]/80 hover:shadow-[0_14px_40px_rgba(201,168,88,0.2)]"
      }`}
    >
      <div
        className={`h-full rounded-[22px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md min-h-[300px] sm:min-h-[340px] transition-colors duration-300 ${
          theme === "light"
            ? "bg-white/95 border border-[#C5A059]/20"
            : "bg-[#121E2D]/90 border border-white/5"
        }`}
      >
        <div>
          {/* Card Title Header */}
          <div className="flex items-center justify-center min-h-[48px] border-b pb-3.5 mb-4 text-center">
            <h3
              className={`font-serif font-bold text-base sm:text-lg tracking-wide ${
                theme === "light" ? "text-[#1B2E4B]" : "text-[#e4cc8c]"
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
                    theme === "light"
                      ? "bg-[#C5A059]/15 text-[#C5A059]"
                      : "bg-[#c9a858]/20 text-[#e4cc8c] shadow-[0_0_8px_rgba(201,168,88,0.4)]"
                  }`}
                >
                  <svg
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
                  </svg>
                </span>
                <span
                  className={`font-medium ${
                    theme === "light" ? "text-[#2D3748]" : "text-slate-200"
                  }`}
                >
                  {translate(feature)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtle Bottom Accent Glow */}
        <div
          className={`mt-4 pt-3 border-t w-full flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase ${
            theme === "light"
              ? "border-gray-100 text-gray-400"
              : "border-white/5 text-slate-500"
          }`}
        >
          <span>Included</span>
          <span className={theme === "light" ? "text-[#C5A059]" : "text-[#c9a858]"}>
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
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? theme === "light"
                    ? "w-7 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.5)]"
                    : "w-7 h-2 rounded-full bg-gradient-to-r from-[#c9a858] to-[#e4cc8c] shadow-[0_0_12px_rgba(201,168,88,0.7)]"
                  : theme === "light"
                  ? "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400"
                  : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
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
                  ? theme === "light"
                    ? "w-6 h-2 rounded-full bg-[#C5A059]"
                    : "w-6 h-2 rounded-full bg-gradient-to-r from-[#c9a858] to-[#e4cc8c]"
                  : theme === "light"
                  ? "w-2 h-2 rounded-full bg-gray-300"
                  : "w-2 h-2 rounded-full bg-white/20"
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
  theme ="light",
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
              ? "text-[#1B2E4B]"
              : "text-[#e4cc8c] drop-shadow-[0_2px_10px_rgba(201,168,88,0.25)]"
          }`}
        >
          {title ? translate(title) : translate("serviceHighlightSectionHeader")}
        </h2>
        <div
          className={`w-16 h-1 mx-auto mt-2.5 rounded-full ${
            isLight ? "bg-[#C5A059]" : "bg-gradient-to-r from-[#c9a858] to-[#e4cc8c]"
          }`}
        />
      </div>

      {isCarousel ? (
        <HighlightsFullCarousel cards={cards} theme={theme} />
      ) : (
        <>
          {/* Desktop & Tablet Grid View */}
          <div
            className={`hidden min-[542px]:grid ${gridConfig.gridCols} justify-items-center gap-6 lg:gap-8 px-4 items-stretch ${gridConfig.containerMax} mx-auto`}
          >
            {cards.map((card, idx) => (
              <div key={idx} className={`${gridConfig.cardWidth} h-full`}>
                <HighlightCard card={card} theme={theme} />
              </div>
            ))}
          </div>

          {/* Mobile Swipeable Embla Carousel */}
          <HighlightsMobileCarousel cards={cards} theme={theme} />
        </>
      )}
    </section>
  );
}
