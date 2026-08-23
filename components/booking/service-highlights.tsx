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

  // Sync active dot on scroll/swipe
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const newIndex = Math.round(scrollLeft / clientWidth);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  // Scroll to slide when clicking dot
  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-6 mt-8 max-[541px]:!bg-[#121E2D] bg-[#C7D1D9]">
      <h2 className="text-center font-bold text-xl sm:text-2xl mb-6 text-[#121E2D] max-[541px]:text-white">
        {title ?? "Standard Package Checklist"}
      </h2>

      {/* Desktop & Tablet Grid View */}
      <div className="hidden min-[542px]:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 items-stretch max-w-7xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.title}
            className="hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] h-full bg-[#F8F9FA] p-5 shadow-[rgba(169,139,75,0.15)_0px_4px_15px]"
          >
            <div className="rounded-3xl p-4 h-full flex flex-col bg-[#F8F9FA] border-3 border-[#A98B4B] min-h-[320px]">
              <h3 className="font-semibold text-lg text-center mb-4 text-[#A98B4B] min-h-[50px]">
                {card.title}
              </h3>
              <ul className="text-sm sm:text-base leading-relaxed list-disc flex-1 text-[#151E2D] pl-5 space-y-1">
                {card.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
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

        {/* Dynamic Pagination Dots (Blue for Active) */}
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
    </section>
  );
}