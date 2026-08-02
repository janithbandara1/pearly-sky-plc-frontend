"use client";

import Image from "next/image";

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
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Event Type Selection</h2>
        <p className="mt-1 text-xs text-[#FFFDF4]/70 sm:text-sm">Book your pristine cleaning service.</p>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {EVENT_TYPE_CARDS.map((card) => {
            const isChecked = selectedLabels.has(card.label);
            return (
              <button
                key={card.label}
                type="button"
                onClick={() => onToggle(card.label)}
                aria-pressed={isChecked}
                className={`flex flex-col items-center gap-1.5 rounded-[10px] bg-white px-2 py-3 text-center transition ${
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
