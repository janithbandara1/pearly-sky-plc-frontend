"use client";

import { useState } from "react";
import { Check, Package as PackageIcon, Plus } from "lucide-react";
import {
  PACKAGE_CATEGORIES,
  PACKAGE_CATEGORY_LABELS,
  type PackageCategory,
  type ServiceAddOnPackage,
} from "@/lib/catalog-api";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { usePoolTheme } from "@/lib/pool-theme-context";

export interface JobCardSectionProps {
  packages?: ServiceAddOnPackage[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  maxSelectionsPerCategory?: number;
  theme?: string;
}

const categoryItemsMapping: Record<string, TranslationKey> = {
  "Professional Oven & Fridge Restoration": "AddsOnCategoryOvenFridgeRestoration",
  "Heavy Limescale & Mold Remediation": "AddsOnCategoryLimescaleMoldRemediation",
  "High-Altitude Window Polishing": "AddsOnCategoryHighAltitudeWindowPolishing",
  "Kitchen Exhaust & Filter Soak": "AddsOnCategoryKitchenExhaustFilterSoak",
  "Inside Microwave & Small Appliances": "AddsOnCategoryMicrowaveAppliancesCleaning",
  "Wall Spot & Scuff Removal": "AddsOnCategoryWallSpotScuffRemoval",
  "Mirror & Glass Detail Polishing": "AddsOnCategoryWallSpotScuffRemoval",
  "Internal Cupboard & Drawer Detail": "AddsOnCategoryWallSpotScuffRemoval",
  "AC Filter & Intake Grille Wash": "AddsOnCategoryWallSpotScuffRemoval",
  "Light Fixture & Chandelier Polishing": "AddsOnCategoryLightFixtureChandelierPolishing",
  "Smart Home Device Setup": "AddsOnCategorySmartHomeDeviceSetup",
  "Squeak & Hinge Repair": "AddsOnCategorySqueakHingeRepair",
  "Flat-Pack Furniture Assembly": "AddsOnCategoryFlatPackFurnitureAssembly",
  "Vent & Air Register Vacuuming": "AddsOnCategoryVentAirRegisterVacuuming",
  "Curtain & Blind Track Repair": "AddsOnCategoryCurtainBlindTrackRepair",
  "Hardware & Fitting Buffing": "AddsOnCategoryHardwareFittingBuffing",
  "Hotel-Style Bed Making & Styling": "AddsOnCategoryHotelStyleBedMaking",
  "Pantry Organization & Labeling": "AddsOnCategoryPantryOrganizationLabeling",
  "Wardrobe Color-Coding & Sorting": "AddsOnCategoryWardrobeColorCodingSorting",
  "Shoe Cleaning & Polishing": "AddsOnCategoryShoeCleaningPolishing",
  "Indoor Plant Watering & Leaf Shining": "AddsOnCategoryIndoorPlantWateringShining",
  "Grocery Restock & Storage": "AddsOnCategoryGroceryRestockStorage",
  "Pet Station & Bedding Sanitization": "AddsOnCategoryPetStationBeddingSanitization",
  "Laundry, Folding & Ironing": "AddsOnCategoryLaundryFoldingIroning",
  "Trash & Recycling Bin Sanitization": "AddsOnCategoryTrashBinSanitization",
  "Front Door & Entryway Polishing": "AddsOnCategoryFrontDoorEntrywayPolishing",
  "Patio Furniture Detailing": "AddsOnCategoryPatioFurnitureDetailing",
  "BBQ & Outdoor Grill Deep Clean": "AddsOnCategoryBbqOutdoorGrillDeepClean",
  "Pool Deck & Perimeter Clearing": "AddsOnCategoryPoolDeckPerimeterClearing",
  "Garage Threshold & Cobweb Sweep": "AddsOnCategoryGarageThresholdCobwebSweep",
  "Exterior Window & Screen Wipe": "AddsOnCategoryExteriorWindowScreenWipe",
  "Driveway Oil Spot Treatment": "AddsOnCategoryDrivewayOilSpotTreatment",
};

export function JobCardSection({
  packages = [],
  selectedIds,
  onToggle,
  maxSelectionsPerCategory = 2,
  theme: themeProp,
}: JobCardSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<PackageCategory | null>(null);

  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  const { translate } = useLanguage();

  const categories = PACKAGE_CATEGORIES.map((id) => ({
    id,
    label: PACKAGE_CATEGORY_LABELS[id],
    items: packages.filter((pkg) => pkg.category === id),
  })).filter((category) => category.items.length > 0);

  if (categories.length === 0) return null;

  // Fallback to first category if none selected
  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
  
  const getPackageItemLabel = (name: string) => {
    const mappedKey = categoryItemsMapping[name];
    if (mappedKey) return translate(mappedKey);
    return translate(name as TranslationKey);
  };

  return (
    <section id="upgrades" className={`w-full md:px-6 px-2 py-6 rounded-2xl sm:rounded-3xl shadow-2xl border transition-all duration-300 ${
      isLight ? "bg-white border-[#D9DDE5] text-[#1A2238]" : "bg-[#1B2A40]/80 backdrop-blur-xl border-[#718096]/30 text-white"
    }`}>
      <span className={`text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
        isLight ? "text-[#002F6D]" : "text-[#FFD766]"
      }`}>
        Step 3 of 6
      </span>
      {/* Component Header Title */}
      <h2 className={`text-xl md:text-2xl mb-3 font-serif mt-1 font-normal tracking-wide leading-tight ${
        isLight ? "text-[#1A2238]" : "text-white"
      }`}>
        {translate("jobCardSectionTitle")}
      </h2>

      {/* Unified Category Tabs & Content Layout (Responsive across Mobile & Desktop) */}
      <div className={`border-t py-6 ${isLight ? "border-t-[#D9DDE5]": "border-t-[#718096]/30"}`}>
        
        {/* Category Tabs Header: horizontally scrollable on mobile, grid/flex layout */}
        <div className={`flex md:grid md:grid-cols-4 gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none border-b ${
          isLight ? "border-b-[#D9DDE5]" : "border-b-[#718096]/30"
        }`}>
          {categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`py-2.5 px-3 rounded-[9px] text-xs sm:text-[13px] font-normal text-center select-none shrink-0 md:shrink transition-all ${
                  isActive
                    ? isLight
                      ? "bg-[#002F6D] border-2 border-[#002F6D] text-white font-bold ring-1 ring-[#002F6D]/30"
                      : "bg-[#FFD766] border-2 border-[#FFD766] text-[#002F6D] font-bold ring-1 ring-[#FFD766]/30"
                    : isLight
                    ? "text-[#1A2238] hover:bg-[#F7F5F0] border border-transparent hover:border-[#D8B63F]"
                    : "text-[#C3CDDC] hover:bg-[#152238] border border-transparent hover:border-[#FFD766]/50"
                }`}
              >
                {translate(category.label as TranslationKey)}
              </button>
            );
          })}
        </div>

        {/* Add-Ons Grid (1 column on mobile, 2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-center md:mx-2">
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
                  className={`min-h-[72px] px-3.5 py-3.5 rounded-xl flex items-center justify-between text-left transition-all duration-200 select-none group ${
                    isSelected
                      ? isLight
                        ? "bg-[#F7F5F0] border-2 border-[#D8B63F] ring-1 ring-[#D8B63F]/30 shadow-xs"
                        : "bg-[#1B2A40] border-2 border-[#FFD766] ring-1 ring-[#FFD766]/30 shadow-[0_0_15px_rgba(255,215,102,0.15)]"
                      : isDisabled
                      ? isLight
                        ? "border border-[#D9DDE5] bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
                        : "border border-[#718096]/20 bg-[#111C2E]/50 text-slate-500 opacity-50 cursor-not-allowed"
                      : isLight
                      ? "bg-white border border-[#D9DDE5] hover:border-[#D8B63F] hover:bg-[#F7F5F0] shadow-xs cursor-pointer"
                      : "bg-[#152238] border border-[#718096]/30 hover:border-[#FFD766]/50 hover:bg-[#1B2A40] shadow-xs cursor-pointer"
                  }`}
                >
                  {/* Left soft badge icon + title */}
                  <div className="flex items-center min-w-0 flex-1 pr-2">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0 mr-3.5 border overflow-hidden ${
                      isLight ? "bg-[#F7F5F0] border-[#D9DDE5]" : "bg-[#111C2E] border-[#718096]/30"
                    }`}>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <PackageIcon className={`h-5 w-5 ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`} />
                      )}
                    </div>
                    <span
                      className={`text-[13px] sm:text-[14px] leading-snug font-semibold ${
                        isLight ? "text-[#1A2238]" : "text-white"
                      } ${isDisabled ? (isLight ? "text-slate-400" : "text-slate-500") : ""}`}
                    >
                      {translate(getPackageItemLabel(item.name) as TranslationKey)}
                    </span>
                  </div>

                  {/* Right Action Icon Button */}
                  {isSelected ? (
                    <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 shadow-xs ${
                      isLight ? "bg-[#002F6D] border border-[#002F6D] text-white" : "bg-[#FFD766] border border-[#FFD766] text-[#002F6D]"
                    }`}>
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-[10px] border flex items-center justify-center shrink-0 transition-transform ${
                        isDisabled
                          ? isLight
                            ? "border-gray-300 text-gray-300"
                            : "border-slate-700 text-slate-700"
                          : isLight
                          ? "border-[#002F6D] text-[#002F6D] group-hover:scale-105"
                          : "border-[#FFD766] text-[#FFD766] group-hover:scale-105"
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