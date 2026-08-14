"use client";

export const SECURITY_SERVICE_CATEGORIES = [
  "Commercial & Office Security",
  "SCIF & High-Security Areas",
  "Healthcare & Medical Sanitation",
  "Post-Construction Site Safety",
  "VIP & Executive Residential",
  "Event Security & Rapid Clean",
  "Emergency Hazmat & Biohazard",
  "Post-Incident Site Restoration",
  "Digital Device Malware Clean",
  "SMB Network & Cyber Audit",
];

export interface SecurityCategorySelectionProps {
  selected: string | null;
  onSelect: (category: string) => void;
}

export function SecurityCategorySelection({ selected, onSelect }: SecurityCategorySelectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">
          Job type
        </h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SECURITY_SERVICE_CATEGORIES.map((category) => {
            const isSelected = selected === category;
            return (
              <div
                key={category}
                className={`flex items-center justify-between gap-2.5 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${
                  isSelected
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#121E2D]">{category}</p>
                <button
                  type="button"
                  onClick={() => onSelect(category)}
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
