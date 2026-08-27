"use client";

import { useState, useRef } from "react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";

export interface ServiceHighlightsProps {
  title?: string;
  cards: ServiceHighlightCard[];
}

export function ServiceHighlights({ title, cards }: ServiceHighlightsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!cards || cards.length === 0) return null;

  // Sync active dot on scroll/swipe
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const firstChild = scrollRef.current.children[0] as HTMLElement;
        const stepWidth = firstChild ? firstChild.offsetWidth + 24 : clientWidth;
        const newIndex = Math.min(
          Math.max(0, Math.round(scrollLeft / stepWidth)),
          cards.length - 1
        );
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  // Scroll to slide when clicking dot
  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      const stepWidth = firstChild ? firstChild.offsetWidth + 24 : scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: stepWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Grid configuration for cards.length <= 4
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
    <section className="py-2 mt-2 max-[541px]:!bg-[#121E2D] bg-[#C7D1D9]">
      <h2 className="text-center font-bold text-xl sm:text-2xl mb-6 text-[#121E2D] max-[541px]:text-white">
        {title ?? "Standard Package Checklist"}
      </h2>

      {isCarousel ? (
        /* Carousel View for cards.length >= 5 (3 visible cards on desktop) */
        <div className="px-4 max-w-7xl mx-auto">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth gap-6 pb-4 items-stretch"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="snap-start flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] min-[542px]:w-[calc((100%-3rem)/3)]"
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

          {/* Dynamic Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-3">
            {[1, 2, 3].map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                  ? "w-2.5 bg-[#0075FF] scale-110"
                  : "w-2.5 bg-[#1C2C3E] opacity-60"
                  }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Grid & Mobile Carousel View for cards.length <= 4 */
        <>
          {/* Desktop & Tablet Grid View */}
          <div className={`hidden min-[542px]:grid ${gridConfig.gridCols} justify-items-center gap-6 px-4 items-stretch ${gridConfig.containerMax} mx-auto`}>
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

          {/* Mobile Swipeable Carousel */}
          <div className="block min-[542px]:hidden px-4">
            {/* Scroll Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 snap-center px-1"
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

            {/* Dynamic Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-3">
              {cards.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                    ? "w-2.5 bg-[#0075FF] scale-110"
                    : "w-2.5 bg-[#1C2C3E] opacity-60"
                    }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
