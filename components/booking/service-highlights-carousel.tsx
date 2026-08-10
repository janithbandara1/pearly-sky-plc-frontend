"use client";

import { useEffect, useState } from "react";
import type { ServiceHighlightCard } from "@/lib/content/service-details";
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
}

/** Swipeable variant of ServiceHighlights — same content shape, carousel presentation instead of a static grid. */
export function ServiceHighlightsCarousel({ title, cards }: ServiceHighlightsCarouselProps) {
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
    <section>
      <h2 className="mb-4 text-center text-xl font-bold text-[#A98B4B] sm:text-2xl">{title ?? "What's Included"}</h2>

      <Carousel opts={{ align: "start" }} setApi={setApi} className="px-9">
        <CarouselContent className="-ml-4">
          {cards.map((card) => (
            <CarouselItem key={card.title} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
              <div className="flex h-full flex-col rounded-[20px] border-[1.5px] border-[#A98B4B] bg-white p-4">
                <h3 className="mb-2 text-center text-sm font-semibold text-[#A98B4B]">{card.title}</h3>
                <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-[#151E2D] sm:text-sm">
                  {card.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
        <CarouselNext className="right-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
      </Carousel>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`size-2.5 rounded-full transition-colors ${
                index === current ? "bg-[#A98B4B]" : "bg-[#A98B4B]/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
