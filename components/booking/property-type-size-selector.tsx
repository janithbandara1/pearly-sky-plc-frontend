"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

/** Generic scale used by services without a dedicated sizing scheme (e.g. commercial, post-construction). */
export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", sublabel: "Apt", icon: "🏢", min: 20, max: 80, step: 1, locked: false },
  { id: "home", label: "Home", icon: "🏡", min: 81, max: 400, step: 5, locked: false },
  { id: "villa", label: "Villa", icon: "🏰", min: 401, max: 1000, step: 20, locked: false },
  { id: "estate", label: "Estate", icon: "🏛️", min: 1001, max: 5000, step: 50, locked: true },
  { id: "vip", label: "VIP", sublabel: "Diamond", icon: "💎", min: 5001, max: 9999, step: 100, locked: true },
];

/**
 * Residential sizing scheme (m² / ft²) for standard-residential, deep-cleaning, end-of-tenancy,
 * last-minute, express-refresh, premium-rental-concierge, and steam-cleaning services.
 * Ranges intentionally overlap (e.g. a 120m² unit is both a "Home" and a "Townhouse") so the
 * active category is tracked explicitly rather than re-derived from the size on every render.
 */
export const RESIDENTIAL_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", icon: "🏢", min: 20, max: 50, step: 1, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", min: 40, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", min: 100, max: 250, step: 5, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", min: 120, max: 350, step: 10, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    min: 150,
    max: 400,
    step: 0,
    sizes: [150, 175, 200, 225, 250, 275, 300, 350, 400],
    locked: false,
  },
  {
    id: "villa",
    label: "Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
];

const RESIDENTIAL_SCHEME_SERVICE_SLUGS = new Set([
  "regular-maintenance-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "same-day-priority-cleaning",
  "quick-touch-up-cleaning",
  "premium-rental-concierge-cleaning",
  "steam-cleaning",
]);

/** Post-construction sizing scheme, tracked by clean-up phase rather than property type. */
export const POST_CONSTRUCTION_PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    id: "rough-clean",
    label: "Rough Clean",
    dropdownLabel: "Rough Clean (Initial Debris & Dust Removal)",
    icon: "🧱",
    min: 20,
    max: 1000,
    step: 20,
    locked: false,
  },
  {
    id: "touch-up-clean",
    label: "Touch-Up Clean",
    dropdownLabel: "Touch-Up Clean (20 m² - 100 m² / 215 ft² - 1,076 ft²)",
    icon: "🧽",
    min: 20,
    max: 100,
    step: 5,
    locked: false,
  },
  {
    id: "final-post-build-clean",
    label: "Final Post-Build Clean",
    dropdownLabel: "Final Post-Build Clean (101 m² - 300 m² / 1,087 ft² - 3,229 ft²)",
    icon: "✨",
    min: 101,
    max: 300,
    step: 10,
    locked: false,
  },
  {
    id: "heavy-duty-construction-clean",
    label: "Heavy-Duty Deep Clean",
    dropdownLabel: "Heavy-Duty Deep Clean (301 m² - 1,000 m² / 3,240 ft² - 10,764 ft²)",
    icon: "🏗️",
    min: 301,
    max: 1000,
    step: 20,
    locked: false,
  },
];

const POST_CONSTRUCTION_SERVICE_SLUGS = new Set(["post-construction-renovation-cleaning"]);

/** Venue-scale sizing scheme for post-event-cleaning, tracked by event type rather than property type. */
export const EVENT_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "private-parties", label: "Private Parties & Celebrations", icon: "🎈", min: 20, max: 150, step: 5, locked: false },
  { id: "weddings", label: "Weddings & Large Receptions", icon: "💒", min: 150, max: 600, step: 25, locked: false },
  { id: "corporate-events", label: "Corporate Events & Galas", icon: "💼", min: 100, max: 1000, step: 25, locked: false },
  { id: "concerts-festivals", label: "Concerts, Festivals & Live Venues", icon: "🎤", min: 300, max: 1000, step: 25, locked: false },
  { id: "pop-up-shops", label: "Pop-Up Shops & Retail Exhibitions", icon: "🛍️", min: 50, max: 300, step: 10, locked: false },
  { id: "art-galleries", label: "Art Galleries & Cultural Exhibitions", icon: "🎨", min: 50, max: 500, step: 25, locked: false },
  { id: "fashion-shows", label: "Fashion Shows & Runway Events", icon: "👗", min: 100, max: 800, step: 25, locked: false },
  { id: "film-tv-shoots", label: "Film, TV & Commercial Shoots", icon: "📽️", min: 50, max: 1000, step: 25, locked: false },
  { id: "charity-auctions", label: "Charity Auctions & Fundraisers", icon: "🤝", min: 150, max: 800, step: 25, locked: false },
];

const EVENT_SCHEME_SERVICE_SLUGS = new Set(["post-event-cleaning"]);

export function getPropertyCategoriesForService(serviceSlug: string): PropertyCategory[] {
  if (RESIDENTIAL_SCHEME_SERVICE_SLUGS.has(serviceSlug)) return RESIDENTIAL_PROPERTY_CATEGORIES;
  if (POST_CONSTRUCTION_SERVICE_SLUGS.has(serviceSlug)) return POST_CONSTRUCTION_PROPERTY_CATEGORIES;
  if (EVENT_SCHEME_SERVICE_SLUGS.has(serviceSlug)) return EVENT_PROPERTY_CATEGORIES;
  return PROPERTY_CATEGORIES;
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
  categories = PROPERTY_CATEGORIES,
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

  function handleTypeChange(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      onChange(nextCat.sizes ? nextCat.sizes[0] : nextCat.min);
    }
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Property Type &amp; Size</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-[#121E2D]">Property Type</p>
          <Select value={activeCategory.id} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectableCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.dropdownLabel ? (
                    <>
                      {cat.icon} {cat.dropdownLabel}
                    </>
                  ) : (
                    <>
                      {cat.icon} {cat.label}
                      {cat.sublabel ? `/${cat.sublabel}` : ""} ({formatSizeRange(cat)})
                    </>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-[#121E2D]">Property Size</p>
          <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s} m² / {formatFt2(s)} ft²
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
