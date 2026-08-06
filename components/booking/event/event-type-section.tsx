"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export interface EventTypeCard {
  label: string;
  image: string;
}

export const EVENT_TYPE_CARDS: EventTypeCard[] = [
  { label: "Conferences", image: "/images/event/service-eventcleaning-conferences.gif" },
  { label: "Red Carpet Events", image: "/images/event/service-eventcleaning-red-carpet-events.gif" },
  { label: "Music Concerts & Festivals", image: "/images/event/service-eventcleaning-music-concerts-and-festivals.gif" },
  { label: "Trade Shows", image: "/images/event/service-eventcleaning-trade-shows.gif" },
  { label: "Product Launches", image: "/images/event/service-eventcleaning-product-launches.gif" },
  { label: "Seminars", image: "/images/event/service-eventcleaning-seminars.gif" },
  { label: "Networking Events", image: "/images/event/service-eventcleaning-networking-events.gif" },
  { label: "Sports", image: "/images/event/service-eventcleaning-sports.gif" },
  { label: "Festivals", image: "/images/event/service-eventcleaning-festivals.gif" },
  { label: "Team Building Events", image: "/images/event/service-eventcleaning-66.gif" },
  { label: "Company Parties", image: "/images/event/service-eventcleaning-company-parties.gif" },
  { label: "Corporate Events", image: "/images/event/service-eventcleaning-corporate-events.gif" },
  { label: "Weddings", image: "/images/event/service-eventcleaning-weddings.gif" },
  { label: "Charity Events", image: "/images/event/service-eventcleaning-charity-events.gif" },
  { label: "Cultural Events", image: "/images/event/service-eventcleaning-cultural-events.gif" },
  { label: "Meetings", image: "/images/event/service-eventcleaning-meetings.gif" },
  { label: "Social Events", image: "/images/event/service-eventcleaning-social-events.gif" },
  { label: "Theatre Performance", image: "/images/event/service-eventcleaning-theatre-performance.gif" },
  { label: "Career Fairs", image: "/images/event/service-eventcleaning-career-fairs.gif" },
  { label: "Exhibition", image: "/images/event/service-eventcleaning-exhibition.gif" },
  { label: "Fashion Events", image: "/images/event/service-eventcleaning-fashion-events.gif" },
  { label: "Internal Events", image: "/images/event/service-eventcleaning-internal-events.gif" },
  { label: "Company Meetings & Off-Sites", image: "/images/event/service-eventcleaning-company-meetings-and-off-sites.gif" },
  { label: "Workshops", image: "/images/event/service-eventcleaning-workshops.gif" },
  { label: "VIP Events", image: "/images/event/service-eventcleaning-vip-event.gif" },
  { label: "Other", image: "/images/event/service-eventcleaning-other.gif" },
];

export interface EventTypeSectionProps {
  selectedLabels: Set<string>;
  onToggle: (label: string) => void;
}

export function EventTypeSection({ selectedLabels, onToggle }: EventTypeSectionProps) {
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
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Event Type Selection</h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <Carousel opts={{ align: "start" }} setApi={setApi} className="px-9">
          <CarouselContent className="-ml-2.5">
            {EVENT_TYPE_CARDS.map((card) => {
              const isChecked = selectedLabels.has(card.label);
              return (
                <CarouselItem key={card.label} className="basis-1/2 pl-2.5 sm:basis-1/3 lg:basis-1/4">
                  <button
                    type="button"
                    onClick={() => onToggle(card.label)}
                    aria-pressed={isChecked}
                    className={`flex w-full flex-col items-center gap-1.5 rounded-[10px] bg-white px-2 py-3 text-center transition ${
                      isChecked
                        ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                        : "border-[1.5px] border-[#A98B4B]"
                    }`}
                  >
                    <div className="relative h-16 w-16">
                      <Image src={card.image} alt={card.label} fill unoptimized className="object-contain" />
                    </div>
                    <p className="text-xs font-medium text-[#121E2D]">{card.label}</p>
                  </button>
                </CarouselItem>
              );
            })}
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
                className={`size-2 rounded-full transition-colors ${
                  index === current ? "bg-[#A98B4B]" : "bg-[#A98B4B]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
