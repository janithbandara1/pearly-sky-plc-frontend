"use client";

import { useEffect, useState } from "react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";
import { usePoolTheme } from "@/lib/pool-theme-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export interface ServiceHighlightsCarouselProps {
  title?: string;
  cards: ServiceHighlightCard[];
  theme?: "dark" | "light";
}

/** Swipeable variant of ServiceHighlights — same content shape, carousel presentation instead of a static grid. */
export function ServiceHighlightsCarousel({
  title,
  cards,
  theme: themeProp,
}: ServiceHighlightsCarouselProps) {
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
    api.on("reInit", () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="transition-colors duration-300">
      <h2
        className={`mb-5 text-center text-xl sm:text-2xl font-serif font-bold tracking-wide ${
          isLight ? "text-[#1B2E4B]" : "text-[#e4cc8c]"
        }`}
      >
        {title ?? "What's Included"}
      </h2>

      <Carousel opts={{ align: "start" }} setApi={setApi} className="px-9">
        <CarouselContent className="-ml-4">
          {cards.map((card) => (
            <CarouselItem
              key={card.title}
              className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <div
                className={`flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                  isLight
                    ? "bg-white/95 border border-[#C5A059]/30 shadow-[0_4px_20px_rgba(197,160,89,0.12)] hover:border-[#C5A059]/60"
                    : "bg-[#121E2D]/90 backdrop-blur-md border border-[#c9a858]/35 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-[#c9a858]/60"
                }`}
              >
                <div>
                  <h3
                    className={`mb-3 text-center text-base font-serif font-bold ${
                      isLight ? "text-[#1B2E4B]" : "text-[#e4cc8c]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span
                          className={`mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                            isLight
                              ? "bg-[#C5A059]/15 text-[#C5A059]"
                              : "bg-[#c9a858]/20 text-[#e4cc8c]"
                          }`}
                        >
                          <svg
                            className="h-2 w-2"
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
                          className={isLight ? "text-[#2D3748]" : "text-slate-200"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={`left-0 border ${
            isLight
              ? "border-[#C5A059] bg-white text-[#C5A059] hover:bg-[#F8F9FA]"
              : "border-[#c9a858]/50 bg-[#121E2D] text-[#e4cc8c] hover:bg-[#1f305e]"
          }`}
        />
        <CarouselNext
          className={`right-0 border ${
            isLight
              ? "border-[#C5A059] bg-white text-[#C5A059] hover:bg-[#F8F9FA]"
              : "border-[#c9a858]/50 bg-[#121E2D] text-[#e4cc8c] hover:bg-[#1f305e]"
          }`}
        />
      </Carousel>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 ${
                index === current
                  ? isLight
                    ? "w-6 h-2 rounded-full bg-[#C5A059]"
                    : "w-6 h-2 rounded-full bg-gradient-to-r from-[#c9a858] to-[#e4cc8c]"
                  : isLight
                  ? "w-2 h-2 rounded-full bg-gray-300"
                  : "w-2 h-2 rounded-full bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
