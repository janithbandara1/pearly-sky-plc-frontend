"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const EVENT_IMAGE_BASE = "/images/event";

export interface EventTypeCard {
  title: string;
  image: string;
}

export const EVENT_TYPE_CARDS: EventTypeCard[] = [
  { title: "Conferences", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-conferences.gif` },
  { title: "Red Carpet Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-red-carpet-events.gif` },
  { title: "Music Concerts & Festivals", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-music-concerts-and-festivals.gif` },
  { title: "Trade Shows", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-trade-shows.gif` },
  { title: "Product Launches", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-product-launches.gif` },
  { title: "Seminars", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-seminars.gif` },
  { title: "Networking Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-networking-events.gif` },
  { title: "Sports", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-sports.gif` },
  { title: "Festivals", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-festivals.gif` },
  { title: "Team Building Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-66.gif` },
  { title: "Company Parties", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-company-parties.gif` },
  { title: "Corporate Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-corporate-events.gif` },
  { title: "Weddings", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-weddings.gif` },
  { title: "Charity Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-charity-events.gif` },
  { title: "Cultural Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-cultural-events.gif` },
  { title: "Meetings", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-meetings.gif` },
  { title: "Social Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-social-events.gif` },
  { title: "Theatre Performance", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-theatre-performance.gif` },
  { title: "Career Fairs", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-career-fairs.gif` },
  { title: "Exhibition", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-exhibition.gif` },
  { title: "Fashion Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-fashion-events.gif` },
  { title: "Internal Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-internal-events.gif` },
  { title: "Company Meetings & Off-Sites", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-company-meetings-and-off-sites.gif` },
  { title: "Workshops", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-workshops.gif` },
  { title: "VIP Events", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-vip-event.gif` },
  { title: "Other", image: `${EVENT_IMAGE_BASE}/service-eventcleaning-other.gif` },
];

function EventTypeCardTile({
  card,
  isChecked,
  onToggle,
}: {
  card: EventTypeCard;
  isChecked: boolean;
  onToggle: (title: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(card.title)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(card.title);
        }
      }}
      aria-pressed={isChecked}
      className="flex cursor-pointer flex-col items-center gap-1.5 text-center transition hover:opacity-95"
    >
      <div
        className={`relative h-[150px] w-full bg-white overflow-hidden rounded-[10px] ${isChecked
          ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
          : "border-[1.5px] border-[#A98B4B] bg-white"
          }`}
      >
        <Image src={card.image} alt={card.title} fill unoptimized className="object-cover" />
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => onToggle(card.title)}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 border-black bg-white/80 shadow-sm data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
        />
      </div>
      <p className="px-0.5 text-xs font-semibold text-[#121E2D] line-clamp-2">{card.title}</p>
    </div>
  );
}

export interface EventTypeSectionProps {
  selectedTitles: Set<string>;
  onToggle: (title: string) => void;
}

export function EventTypeSection({ selectedTitles, onToggle }: EventTypeSectionProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageSize = mounted && isMobile ? 4 : 9;

  const pages = useMemo(() => {
    const chunks: EventTypeCard[][] = [];
    for (let i = 0; i < EVENT_TYPE_CARDS.length; i += pageSize) {
      chunks.push(EVENT_TYPE_CARDS.slice(i, i + pageSize));
    }
    return chunks;
  }, [pageSize]);

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
        <h1 className="md:text-[1.7rem] font-bold text-[#A98B4B] text-[1.3rem]">
          EVENT TYPE SELECTION
        </h1>
        <p className="text-white">Book Your Pristine Cleaning Service</p>
      </div>

      <div className="bg-[#121E2D] p-4 sm:p-6">
        <Carousel opts={{ align: "start" }} setApi={setApi} className="px-7 sm:px-10">
          <CarouselContent className="-ml-3">
            {pages.map((pageCards, pageIdx) => (
              <CarouselItem key={pageIdx} className="basis-full pl-3">
                <div
                  className={`grid gap-3 sm:gap-5 ${pageSize === 4 ? "grid-cols-2" : "grid-cols-3"
                    }`}
                >
                  {pageCards.map((card) => (
                    <EventTypeCardTile
                      key={card.title}
                      card={card}
                      isChecked={selectedTitles.has(card.title)}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
          <CarouselNext className="right-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
        </Carousel>

        {count > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`size-2.5 rounded-full transition-colors ${index === current ? "bg-[#A98B4B]" : "bg-[#A98B4B]/30"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

