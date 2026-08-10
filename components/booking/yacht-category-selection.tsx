"use client";

export interface YachtServiceCategory {
  title: string;
  description: string;
}

export const YACHT_SERVICE_CATEGORIES: YachtServiceCategory[] = [
  {
    title: "Full Exterior Marine Detail",
    description: "Hull wash, salt removal, gelcoat waxing & stainless polishing",
  },
  {
    title: "VIP Interior Housekeeping",
    description: "Staterooms, salons, fine fabric, marble & leather treatment",
  },
  {
    title: "Teak Deck Restoration & Care",
    description: "Gentle teak brightening, deep scrubbing & protective sealing",
  },
  {
    title: "Engine Room & Bilge Cleaning",
    description: "Heavy degreasing, machinery wiping & bilge sanitation",
  },
  {
    title: "Post-Charter Rapid Reset",
    description: "High-speed turnaround service between private bookings",
  },
  {
    title: "Pre-Season / Winterization Clean",
    description: "Deep protective cleaning for long storage or launch prep",
  },
  {
    title: "Galley & Sanitation Sterilization",
    description: "Deep kitchen sanitization, cold storage & food safety prep",
  },
  {
    title: "Tender & Water Toys Detailing",
    description: "Jet skis, tenders, inflatables & water sports gear washdown",
  },
  {
    title: "Underwater Hull & Propeller Clean",
    description: "Diver hull scraping, barnacle removal & prop polishing",
  },
  {
    title: "Emergency Spill & Stain Remediation",
    description: "24/7 emergency carpet stain, oil leak, or biohazard cleanup",
  },
];

export interface YachtCategorySelectionProps {
  selected: string | null;
  onSelect: (category: string) => void;
}

export function YachtCategorySelection({ selected, onSelect }: YachtCategorySelectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">
          Service type
        </h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {YACHT_SERVICE_CATEGORIES.map((category) => {
            const isSelected = selected === category.title;
            return (
              <div
                key={category.title}
                className={`flex items-center justify-between gap-2.5 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${
                  isSelected
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#121E2D]">{category.title}</p>
                  <p className="mt-0.5 truncate text-xs text-[#121E2D]/60">{category.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(category.title)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-[6px] border-[1.5px] border-[#A98B4B] px-2.5 py-1 text-xs font-semibold ${
                    isSelected ? "bg-[#A98B4B] text-white" : "text-[#A98B4B]"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
