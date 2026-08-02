"use client";

import { useCurrency } from "@/lib/currency-context";

export interface DisinfectionLevel {
  id: string;
  title: string;
  description: string;
  priceAdder: number;
}

export const DISINFECTION_LEVELS: DisinfectionLevel[] = [
  {
    id: "quat",
    title: "Quaternary Ammonium (Quat) – Standard",
    description: "Cost-effective, proven, low odor.",
    priceAdder: 0,
  },
  {
    id: "peroxide",
    title: "Hydrogen Peroxide (H₂O₂) – Premium",
    description: "Fast kill time, no chemical residue.",
    priceAdder: 25,
  },
  {
    id: "hypochlorous",
    title: "Hypochlorous Acid (HOCl) – Advanced",
    description: "Non-toxic, powerful for fogging / air treatment.",
    priceAdder: 50,
  },
  {
    id: "botanical",
    title: "Botanical / Thyme-Based – Eco Friendly",
    description: "Certified green, natural ingredients.",
    priceAdder: 75,
  },
];

export interface DisinfectionLevelSectionProps {
  selectedId: string;
  onSelect: (level: DisinfectionLevel) => void;
}

export function DisinfectionLevelSection({ selectedId, onSelect }: DisinfectionLevelSectionProps) {
  const { symbol } = useCurrency();

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Service Level</h2>
      </div>

      <div className="flex flex-col gap-2.5 bg-[#F8F9FA] p-4 sm:p-5">
        {DISINFECTION_LEVELS.map((level) => {
          const isChecked = level.id === selectedId;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelect(level)}
              aria-pressed={isChecked}
              className={`flex items-center gap-3 rounded-[10px] bg-white px-4 py-3 text-left transition ${
                isChecked
                  ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                  : "border-[1.5px] border-[#A98B4B]"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#121E2D]">{level.title}</p>
                <p className="text-xs text-[#555]">
                  {level.description}
                  {level.priceAdder > 0 && (
                    <>
                      {" "}
                      • <span className="font-semibold text-[#A98B4B]">+{symbol}{level.priceAdder.toFixed(2)}</span>
                    </>
                  )}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
