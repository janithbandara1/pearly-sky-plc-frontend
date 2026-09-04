"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";

export interface ServiceHighlightsProps {
  title?: string;
  cards: ServiceHighlightCard[];
}

/** Highlights Carousel for cards >= 5 (displays 3 on desktop, 2 on tablet, 1 on mobile) */
function HighlightsFullCarousel({ cards }: { cards: ServiceHighlightCard[] }) {
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
    <div className="px-4 max-w-7xl mx-auto">
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
              <div className="w-full h-full bg-[#F8F9FA] p-4 md:p-5 shadow-[rgba(169,139,75,0.15)_0px_4px_15px] hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full flex flex-col bg-[#F8F9FA] border-[3px] border-[#A98B4B] min-h-[280px] sm:min-h-[320px]">
                  <h3 className="font-semibold text-base sm:text-lg text-center mb-3 sm:mb-4 text-[#A98B4B] min-h-[40px] sm:min-h-[50px] flex items-center justify-center">
                    {card.title}
                  </h3>
                  <ul className="text-sm leading-relaxed list-disc flex-1 text-[#151E2D] pl-5 space-y-1.5">
                    {card.features.map((feature, featureIdx) => (
                      <li key={featureIdx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Pagination Dots */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "w-6 bg-[#0075FF] scale-110"
                  : "w-2.5 bg-[#1C2C3E] opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Mobile Swipeable Carousel for cards <= 4 */
function HighlightsMobileCarousel({ cards }: { cards: ServiceHighlightCard[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
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
              <div className="bg-[#F8F9FA] p-5 shadow-[rgba(169,139,75,0.15)_0px_4px_15px]">
                <div className="rounded-3xl p-5 flex flex-col bg-[#F8F9FA] border-3 border-[#A98B4B] min-h-[280px]">
                  <h3 className="font-semibold text-lg text-center mb-4 text-[#A98B4B]">
                    {card.title}
                  </h3>
                  <ul className="text-sm leading-relaxed list-disc text-[#151E2D] pl-5 space-y-1.5">
                    {card.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Pagination Dots */}
      {cards.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-3">
          {cards.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "w-6 bg-[#0075FF] scale-110"
                  : "w-2.5 bg-[#1C2C3E] opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ServiceHighlights({ title, cards }: ServiceHighlightsProps) {
  if (!cards || cards.length === 0) return null;

  // Grid configuration for cards.length <= 4 on desktop & tablet
  const getGridConfig = (length: number) => {
    switch (length) {
      case 4:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          cardWidth: "w-full max-w-[350px] w-[350px] md:w-[280px]",
          containerMax: "max-w-7xl",
        };
      case 3:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          cardWidth: "w-full max-w-[350px] w-[350px] md:w-[330px]",
          containerMax: "max-w-5xl",
        };
      case 2:
        return {
          gridCols: "grid-cols-1 sm:grid-cols-2",
          cardWidth: "w-full max-w-[350px] w-[350px] md:w-[340px]",
          containerMax: "max-w-3xl",
        };
      case 1:
      default:
        return {
          gridCols: "grid-cols-1",
          cardWidth: "w-full max-w-[350px] w-[350px]",
          containerMax: "max-w-md",
        };
    }
  };

  const isCarousel = cards.length >= 5;
  const gridConfig = getGridConfig(cards.length);

  return (
    <section className="py-2 mt-2 max-[541px]:!bg-[#121E2D] bg-transparent">
      <h2 className="text-center font-bold text-xl sm:text-2xl mb-6 text-[#121E2D] max-[541px]:text-white">
        {title ?? "Standard Package Checklist"}
      </h2>

      {isCarousel ? (
        <HighlightsFullCarousel cards={cards} />
      ) : (
        <>
          {/* Desktop & Tablet Grid View */}
          <div
            className={`hidden min-[542px]:grid ${gridConfig.gridCols} justify-items-center gap-12 px-4 items-stretch ${gridConfig.containerMax} mx-auto`}
          >
            {cards.map((card) => (
              <div
                key={card.title}
                className={`${gridConfig.cardWidth} h-full bg-[#F8F9FA] p-4 md:p-5 shadow-[rgba(169,139,75,0.15)_0px_4px_15px] hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]`}
              >
                <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full flex flex-col bg-[#F8F9FA] border-[3px] border-[#A98B4B] min-h-[280px] sm:min-h-[320px]">
                  <h3 className="font-semibold text-base sm:text-lg text-center mb-3 sm:mb-4 text-[#A98B4B] min-h-[40px] sm:min-h-[50px] flex items-center justify-center">
                    {card.title}
                  </h3>
                  <ul className="text-sm leading-relaxed list-disc flex-1 text-[#151E2D] pl-5 space-y-1.5">
                    {card.features.map((feature, featureIdx) => (
                      <li key={featureIdx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipeable Embla Carousel */}
          <HighlightsMobileCarousel cards={cards} />
        </>
      )}
    </section>
  );
}
