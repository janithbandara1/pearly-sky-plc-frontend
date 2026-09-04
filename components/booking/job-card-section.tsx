"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { ServiceAddOnPackage } from "@/lib/catalog-api";

export interface JobCardAddOnItem {
  id: number;
  name: string;
  icon: string;
  categoryId: string;
}

export interface JobCardCategory {
  id: string;
  label: string;
  items: JobCardAddOnItem[];
}

export const JOB_CARD_CATEGORIES: JobCardCategory[] = [
  {
    id: "deep-specialized",
    label: "Deep & Specialized Cleaning",
    items: [
      { id: 101, name: "Professional Oven & Fridge Restoration", icon: "👩‍🍳", categoryId: "deep-specialized" },
      { id: 102, name: "Heavy Limescale & Mold Remediation", icon: "🧽", categoryId: "deep-specialized" },
      { id: 103, name: "High-Altitude Window Polishing", icon: "🪜", categoryId: "deep-specialized" },
      { id: 104, name: "Kitchen Exhaust & Filter Soak", icon: "🍳", categoryId: "deep-specialized" },
      { id: 105, name: "Inside Microwave & Small Appliances", icon: "🍿", categoryId: "deep-specialized" },
      { id: 106, name: "Wall Spot & Scuff Removal", icon: "🧱", categoryId: "deep-specialized" },
      { id: 107, name: "Mirror & Glass Detail Polishing", icon: "🪞", categoryId: "deep-specialized" },
      { id: 108, name: "Internal Cupboard & Drawer Detail", icon: "🗄️", categoryId: "deep-specialized" },
    ],
  },
  {
    id: "general-interior",
    label: "General Interior Maintenance",
    items: [
      { id: 201, name: "AC Filter & Intake Grille Wash", icon: "❄️", categoryId: "general-interior" },
      { id: 202, name: "Light Fixture & Chandelier Polishing", icon: "💡", categoryId: "general-interior" },
      { id: 203, name: "Smart Home Device Setup", icon: "📱", categoryId: "general-interior" },
      { id: 204, name: "Squeak & Hinge Repair", icon: "🚪", categoryId: "general-interior" },
      { id: 205, name: "Flat-Pack Furniture Assembly", icon: "🪑", categoryId: "general-interior" },
      { id: 206, name: "Vent & Air Register Vacuuming", icon: "🌪️", categoryId: "general-interior" },
      { id: 207, name: "Curtain & Blind Track Repair", icon: "🪟", categoryId: "general-interior" },
      { id: 208, name: "Hardware & Fitting Buffing", icon: "🔑", categoryId: "general-interior" },
    ],
  },
  {
    id: "lifestyle-home",
    label: "Lifestyle & Home Care",
    items: [
      { id: 301, name: "Hotel-Style Bed Making & Styling", icon: "🛏️", categoryId: "lifestyle-home" },
      { id: 302, name: "Pantry Organization & Labeling", icon: "🥫", categoryId: "lifestyle-home" },
      { id: 303, name: "Wardrobe Color-Coding & Sorting", icon: "👔", categoryId: "lifestyle-home" },
      { id: 304, name: "Shoe Cleaning & Polishing", icon: "👞", categoryId: "lifestyle-home" },
      { id: 305, name: "Indoor Plant Watering & Leaf Shining", icon: "🪴", categoryId: "lifestyle-home" },
      { id: 306, name: "Grocery Restock & Storage", icon: "🛒", categoryId: "lifestyle-home" },
      { id: 307, name: "Pet Station & Bedding Sanitization", icon: "🐶", categoryId: "lifestyle-home" },
      { id: 308, name: "Laundry, Folding & Ironing", icon: "🧺", categoryId: "lifestyle-home" },
    ],
  },
  {
    id: "outdoor-exterior",
    label: "Outdoor & Exterior Spaces",
    items: [
      { id: 401, name: "Trash & Recycling Bin Sanitization", icon: "🗑️", categoryId: "outdoor-exterior" },
      { id: 402, name: "Front Door & Entryway Polishing", icon: "🚪", categoryId: "outdoor-exterior" },
      { id: 403, name: "Patio Furniture Detailing", icon: "🪑", categoryId: "outdoor-exterior" },
      { id: 404, name: "BBQ & Outdoor Grill Deep Clean", icon: "🥩", categoryId: "outdoor-exterior" },
      { id: 405, name: "Pool Deck & Perimeter Clearing", icon: "🏊", categoryId: "outdoor-exterior" },
      { id: 406, name: "Garage Threshold & Cobweb Sweep", icon: "🚗", categoryId: "outdoor-exterior" },
      { id: 407, name: "Exterior Window & Screen Wipe", icon: "🪟", categoryId: "outdoor-exterior" },
      { id: 408, name: "Driveway Oil Spot Treatment", icon: "⛽", categoryId: "outdoor-exterior" },
    ],
  },
];

export interface JobCardSectionProps {
  packages?: ServiceAddOnPackage[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  maxSelectionsPerCategory?: number;
}

export function JobCardSection({
  selectedIds,
  onToggle,
  maxSelectionsPerCategory = 2,
}: JobCardSectionProps) {
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const activeCategory =
    JOB_CARD_CATEGORIES.find((c) => c.id === activeTabId) ?? JOB_CARD_CATEGORIES[0];

  return (
    <section className="w-full md:px-6 mt-10 px-1">
      {/* Component Header Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] text-center mb-6 tracking-tight">
        Service Upgrade Option (JobCard)
      </h2>

      {/* Mobile View Layout (< md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {JOB_CARD_CATEGORIES.map((category) => {
          const isSelectedCategory = category.id === activeTabId;
          const selectedInCatCount = category.items.filter((item) => selectedIds.has(item.id)).length;
          const isCatMaxReached = selectedInCatCount >= maxSelectionsPerCategory;

          return (
            <div key={category.id} className="flex flex-col gap-3">
              {/* Category Header Bar */}
              <button
                type="button"
                onClick={() => setActiveTabId((prev) => (prev === category.id ? null : category.id))}
                className={`w-full px-4 py-3.5 rounded-xl bg-[#0B1527] border-2 border-[#B89642] flex items-center justify-between transition-all select-none ${isSelectedCategory ? "ring-1 ring-[#B89642] shadow-md" : "hover:border-[#B89642]"
                  }`}
              >
                <span className="text-sm font-normal text-white text-left leading-snug">
                  {category.label}
                </span>

                {isSelectedCategory ? (
                  <span className="px-2.5 py-1 rounded-lg bg-[#B89642] text-white text-[11px] font-bold shrink-0">
                    Selected
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg border border-[#B89642] text-[#B89642] text-[11px] font-bold shrink-0">
                    Select
                  </span>
                )}
              </button>

              {/* Expanded Add-On List on Mobile (if selected) */}
              {isSelectedCategory && (
                <div className="flex flex-col gap-3 pt-1 pb-2">
                  {category.items.map((item) => {
                    const isSelected = selectedIds.has(item.id);
                    const isDisabled = !isSelected && isCatMaxReached;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => onToggle(item.id)}
                        aria-pressed={isSelected}
                        className={`min-h-[64px] px-3.5 py-3.5 rounded-xl  bg-white flex items-center justify-between text-left transition-all duration-200 select-none group 
                          ${isSelected
                            ? "border-2 border-[#B89642] ring-1 ring-[#B89642] shadow-sm"
                            : isDisabled
                              ? "border border-gray-200 bg-gray-50/60 opacity-50 cursor-not-allowed"
                              : "border border-[#C6A868]/60 hover:border-[#B89642] shadow-sm cursor-pointer"
                          }`}
                      >
                        {/* Left soft badge icon + title */}
                        <div className="flex items-center min-w-0 flex-1 pr-2">
                          <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] flex items-center justify-center text-lg shrink-0 mr-3 border border-slate-100">
                            <span>{item.icon}</span>
                          </div>
                          <span
                            className={`text-xs sm:text-sm leading-snug font-semibold text-[#1E293B] ${isDisabled ? "text-slate-400" : ""
                              }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        {/* Right Action Icon Button */}
                        {isSelected ? (
                          <div className="w-7 h-7 rounded-full bg-[#B89642] border border-[#B89642] flex items-center justify-center text-white shrink-0 shadow-sm">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </div>
                        ) : (
                          <div
                            className={`w-7 h-7 rounded-full border border-[#B89642] flex items-center justify-center text-[#B89642] shrink-0 ${isDisabled ? "border-gray-300 text-gray-300" : ""
                              }`}
                          >
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop View Layout (≥ md) */}
      <div className="hidden md:block">
        {/* Category Tabs Header */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {JOB_CARD_CATEGORIES.map((category) => {
            const isActive = category.id === activeTabId;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTabId(category.id)}
                className={`py-3.5 px-4 rounded-[7px] text-[12px] sm:text-sm text-[rgb(85,85,85)] font-normal transition-all duration-200 text-center select-none 
                  ${isActive
                    ? "bg-[#0B1527] border-2 border-[#B89642] ring-1 ring-[#B89642] text-white shadow-md"
                    : "bg-white border border-[#C6A868]/60 hover:border-[#B89642] text-[#1E293B] hover:bg-slate-50 shadow-sm"
                  }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Add-Ons 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 items-center md:mx-2">
          {(() => {
            const selectedInCatCount = activeCategory.items.filter((item) => selectedIds.has(item.id)).length;
            const isCatMaxReached = selectedInCatCount >= maxSelectionsPerCategory;

            return activeCategory.items.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const isDisabled = !isSelected && isCatMaxReached;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onToggle(item.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[72px] border-[1.5px] border-[rgb(169,139,75)] px-3 py-3.5 rounded-xl bg-white flex items-center justify-between text-left transition-all duration-200 select-none group ${isSelected
                    ? "border-2 border-[#B89642] ring-1 ring-[#B89642] shadow-sm"
                    : isDisabled
                      ? "border border-gray-200 bg-gray-50/60 opacity-50 cursor-not-allowed"
                      : "border border-[#C6A868]/60 hover:border-[#B89642] shadow-sm cursor-pointer hover:shadow"
                    }`}
                >
                  {/* Left soft badge icon + title */}
                  <div className="flex items-center min-w-0 flex-1 pr-2">
                    <div className="w-11 h-11 rounded-lg bg-[#F4F5F7] flex items-center justify-center text-xl shrink-0 mr-3.5 border border-slate-100">
                      <span>{item.icon}</span>
                    </div>
                    <span
                      className={`text-sm sm:text-[15px] leading-snug font-semibold text-[#1E293B] ${isDisabled ? "text-slate-400" : ""
                        }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Right Action Icon Button */}
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-[#B89642] border border-[#B89642] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      className={`w-7 h-7 rounded-full border border-[#B89642] flex items-center justify-center text-[#B89642] shrink-0 transition-transform ${isDisabled ? "border-gray-300 text-gray-300" : "group-hover:scale-105"
                        }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  )}
                </button>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
}


