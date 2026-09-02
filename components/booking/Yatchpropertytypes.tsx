"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export interface PropertyCategory {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  locked: boolean;
  /** Explicit, non-uniform size list. When present, overrides min/max/step for building options. */
  sizes?: number[];
  /** Fully pre-formatted dropdown text. When present, overrides the default "label/sublabel (range)" rendering. */
  dropdownLabel?: string;
}

const LUXURY_YATCH_CLEANING_SLUG = new Set(["luxury-yacht-cleaning"])
export const YACHT_PROPERTY_TYPES: PropertyCategory[] = [
  {
    id: "motorboat-day-cruiser",
    label: "Motorboat / Day Cruiser",
    icon: "🛥️",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "luxury-express",
    label: "Luxury Express...",
    icon: "🛳️",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "flybridge-motor-yacht",
    label: "Flybridge Motor Yacht",
    icon: "🚢",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "superyacht",
    label: "Superyacht",
    icon: "⚓",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "megayacht",
    label: "Megayacht",
    icon: "🔱",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "sailing-yacht-catamaran",
    label: "Sailing Yacht / Catamaran",
    icon: "⛵",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
];



export function getPropertyCategoriesForService(serviceSlug: string) {
  if (LUXURY_YATCH_CLEANING_SLUG.has(serviceSlug)) return YACHT_PROPERTY_TYPES;
  
}

function getPropertyCategory(value: number, categories: PropertyCategory[]): PropertyCategory {
  return categories.find((c) => value >= c.min && value <= c.max) ?? categories[0];
}

function buildSizeOptions(cat: PropertyCategory): number[] {
  if (cat.sizes) return cat.sizes;
  const sizes: number[] = [];
  for (let s = cat.min; s <= cat.max; s += cat.step) sizes.push(s);
  if (sizes[sizes.length - 1] !== cat.max) sizes.push(cat.max);
  return sizes;
}

function formatSizeRange(cat: PropertyCategory): string {
  if (cat.sizes) {
    const last = cat.sizes[cat.sizes.length - 1];
    return `${cat.sizes[0]} m² - ${last} m²`;
  }
  return `${cat.min} m² - ${cat.max} m²`;
}

function formatFt2(m2: number): string {
  return Math.round(m2 * 10.7639).toLocaleString();
}

export interface PropertyTypeSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  categories?: PropertyCategory[];
  /** Fires with the active category whenever it changes (including on mount). */
  onCategoryChange?: (category: PropertyCategory) => void;
}

export function PropertyTypeSizeSelector({
  value,
  onChange,
  categories = YACHT_PROPERTY_TYPES,
  onCategoryChange,
}: PropertyTypeSizeSelectorProps) {
  const selectableCategories = categories.filter((c) => !c.locked);

  // Tracked explicitly (not re-derived from `value` every render) because some schemes have
  // overlapping category ranges — re-deriving would silently snap back to a different category.
  const [activeCategoryId, setActiveCategoryId] = useState(() => getPropertyCategory(value, categories).id);
  const [categoriesForActiveId, setCategoriesForActiveId] = useState(categories);

  if (categories !== categoriesForActiveId) {
    setCategoriesForActiveId(categories);
    setActiveCategoryId(getPropertyCategory(value, categories).id);
  }

  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
  const sizeOptions = buildSizeOptions(activeCategory);

  useEffect(() => {
    onCategoryChange?.(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  const handleCardClick = useCallback((id: string) => {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      onChange(nextCat.sizes ? nextCat.sizes[0] : nextCat.min);
    }
  }, [selectableCategories, onChange]);

  // Scroll active item into view when active category changes
  useEffect(() => {
    if (!emblaApi) return;
    const activeIdx = selectableCategories.findIndex((c) => c.id === activeCategoryId);
    if (activeIdx >= 0) {
      emblaApi.scrollTo(activeIdx);
    }
  }, [activeCategoryId, emblaApi, selectableCategories]);

  // Calculate current size index & surrounding options for the wheel
  const currentIndex = Math.max(
    0,
    sizeOptions.indexOf(value) !== -1 ? sizeOptions.indexOf(value) : 0
  );
  const prevSize = currentIndex > 0 ? sizeOptions[currentIndex - 1] : null;
  const nextSize = currentIndex < sizeOptions.length - 1 ? sizeOptions[currentIndex + 1] : null;

  function handleNext() {
    if (currentIndex < sizeOptions.length - 1) {
      onChange(sizeOptions[currentIndex + 1]);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      onChange(sizeOptions[currentIndex - 1]);
    }
  }

  return (
    <section className="rounded-2xl border border-[#C6A868] bg-[#FAF8F5] p-5 sm:p-6 shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Property Type */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-3">Property Type</h3>

          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none pb-2">
              <div className="flex gap-3">
                {selectableCategories.map((cat) => {
                  const isSelected = cat.id === activeCategory.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCardClick(cat.id)}
                      className={`shrink-0 w-[110px] sm:w-[118px] h-[118px] rounded-xl flex flex-col items-center justify-center p-2.5 cursor-pointer transition-all duration-200 select-none ${isSelected
                          ? "bg-[#0B1527] border-2 border-[#B89642] ring-1 ring-[#B89642] text-white shadow-md scale-[1.02]"
                          : "bg-white border border-[#C6A868]/60 hover:border-[#B89642] text-[#1E293B] shadow-sm hover:shadow"
                        }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl mb-1.5 transition-colors ${isSelected ? "bg-[#1E2B42]" : "bg-[#F1F3F5]"
                          }`}
                      >
                        <span>{cat.icon}</span>
                      </div>
                      <span
                        className={`text-xs text-center leading-tight line-clamp-2 px-1 ${isSelected ? "font-bold text-white" : "font-semibold text-[#1E293B]"
                          }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#94A3B8] text-center mt-1.5 font-medium tracking-wide select-none">
            ‹ Swipe to browse ›
          </p>
        </div>

        {/* Right Column: Property Size */}
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-3">Property Size</h3>

          <div className="flex items-center gap-3">
            {/* Wheel Display Container */}
            <div
              className="flex-1 h-[122px] rounded-xl border border-[#C6A868] bg-white overflow-hidden shadow-sm flex flex-col justify-between select-none"
              onWheel={(e) => {
                if (e.deltaY > 0) handleNext();
                else handlePrev();
              }}
            >
              {/* Top Row: Previous size preview */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={prevSize === null}
                className="h-[34px] flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
              >
                {prevSize !== null ? `${formatFt2(prevSize)} ft²` : "\u00A0"}
              </button>

              {/* Middle Row: Active selected size */}
              <div className="h-[54px] bg-[#D9E2EC] flex flex-col items-center justify-center py-1 border-y border-[#C6A868]/40 shadow-inner">
                <span className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight">
                  {value} m²
                </span>
                <span className="text-xs font-semibold text-[#B89642] leading-none mt-0.5">
                  {formatFt2(value)} ft²
                </span>
              </div>

              {/* Bottom Row: Next size preview */}
              <button
                type="button"
                onClick={handleNext}
                disabled={nextSize === null}
                className="h-[34px] flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
              >
                {nextSize !== null ? `${nextSize} m²` : "\u00A0"}
              </button>
            </div>

            {/* Right Buttons Stack */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleNext}
                disabled={nextSize === null}
                className="w-[52px] h-[56px] rounded-xl border border-[#C6A868] bg-white hover:bg-[#FAF7F2] active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase Property Size"
              >
                <span className="text-sm leading-none font-bold">↑</span>
                <span className="text-[9px] font-bold tracking-wider text-[#1E293B] mt-1">UP</span>
              </button>

              <button
                type="button"
                onClick={handlePrev}
                disabled={prevSize === null}
                className="w-[52px] h-[56px] rounded-xl border border-[#C6A868] bg-white hover:bg-[#FAF7F2] active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Decrease Property Size"
              >
                <span className="text-sm leading-none font-bold">↓</span>
                <span className="text-[9px] font-bold tracking-wider text-[#1E293B] mt-1">DOWN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

