"use client";

import Image from "next/image";

export interface GeneralSteamCard {
  title: string;
  image: string;
}

export const GENERAL_STEAM_CARDS: GeneralSteamCard[] = [
  { title: "Rooms & Areas", image: "/images/steam/roomsareas.jpeg" },
  { title: "Kitchen & Appliances", image: "/images/steam/kitchen.jpeg" },
  { title: "Furniture & Soft Furnishings", image: "/images/steam/furniture.jpeg" },
  { title: "Surface Cleaning", image: "/images/steam/surface.jpeg" },
  { title: "Speciality Cleaning", image: "/images/steam/speciality.jpeg" },
];

export interface GeneralSteamSectionProps {
  selectedTitles: Set<string>;
  onToggle: (title: string) => void;
}

export function GeneralSteamSection({ selectedTitles, onToggle }: GeneralSteamSectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">
          General Steam Cleaning for a Deep Clean
        </h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {GENERAL_STEAM_CARDS.map((card) => {
            const isChecked = selectedTitles.has(card.title);
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onToggle(card.title)}
                aria-pressed={isChecked}
                className={`flex flex-col overflow-hidden rounded-[10px] bg-white text-left transition ${
                  isChecked
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <div className="relative aspect-square w-full">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                  <span
                    className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-md border-2 shadow-sm ${
                      isChecked ? "border-[#A98B4B] bg-[#A98B4B]" : "border-[#9CA3AF] bg-[#F3F4F6]"
                    }`}
                  >
                    {isChecked && <span className="text-xs font-bold text-[#121E2D]">✓</span>}
                  </span>
                </div>
                <p className="px-2 py-2 text-xs font-medium text-[#121E2D]">{card.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
