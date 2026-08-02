"use client";

import Image from "next/image";

export interface SteamEquipmentCard {
  name: string;
  icon: string;
}

export const STEAM_EQUIPMENT_CARDS: SteamEquipmentCard[] = [
  { name: "Carpet Steam Extractors", icon: "/images/steam/carpetsteam.png" },
  { name: "Vapor Steam Cleaners", icon: "/images/steam/vapor.png" },
  { name: "Steam Mops (Industrial)", icon: "/images/steam/steammaps.png" },
  { name: "Cylinder Steamers", icon: "/images/steam/cylinder.png" },
];

export interface SteamEquipmentSectionProps {
  selectedNames: Set<string>;
  onToggle: (name: string) => void;
}

export function SteamEquipmentSection({ selectedNames, onToggle }: SteamEquipmentSectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Equipment</h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {STEAM_EQUIPMENT_CARDS.map((item) => {
            const isChecked = selectedNames.has(item.name);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onToggle(item.name)}
                aria-pressed={isChecked}
                className={`flex flex-col items-center gap-2 rounded-[10px] bg-white px-3 py-3 text-center transition ${
                  isChecked
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <div className="relative h-20 w-20">
                  <Image src={item.icon} alt={item.name} fill className="object-contain" />
                  <span
                    className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border-2 shadow-sm ${
                      isChecked ? "border-[#A98B4B] bg-[#A98B4B]" : "border-[#9CA3AF] bg-[#F3F4F6]"
                    }`}
                  >
                    {isChecked && <span className="text-xs font-bold text-[#121E2D]">✓</span>}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#121E2D]">{item.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
