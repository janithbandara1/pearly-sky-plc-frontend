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

export interface JobCardSectionProps {
  packages?: ServiceAddOnPackage[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  maxSelectionsPerCategory?: number;
}


const categoryItemsMapping:Record<string, TranslationKey>={
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

}


export function JobCardSection({
  packages = [],
  selectedIds,
  onToggle,
  maxSelectionsPerCategory = 2,
}: JobCardSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<PackageCategory | null>(null);

  const categories = PACKAGE_CATEGORIES.map((id) => ({
    id,
    label: PACKAGE_CATEGORY_LABELS[id],
    items: packages.filter((pkg) => pkg.category === id),
  })).filter((category) => category.items.length > 0);

  if (categories.length === 0) return null;

  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
  const { translate } = useLanguage();

  const translatePackageName = (name: string) =>
    translate(name as TranslationKey);

  return (
    <section className="w-full md:px-6 mt-10 px-1">
      {/* Component Header Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] text-center mb-6 tracking-tight">
        {translate("jobCardSectionTitle")}
      </h2>

      {/* Mobile View Layout (< md) */}
      <div className="flex flex-col gap-3 md:hidden">
        {categories.map((category) => {
          const isSelectedCategory = category.id === activeCategoryId;
          const selectedInCatCount = category.items.filter((item) => selectedIds.has(item.id)).length;
          const isCatMaxReached = selectedInCatCount >= maxSelectionsPerCategory;

          return (
            <div key={category.id} className="flex flex-col gap-3">
              {/* Category Header Bar */}
              <button
                type="button"
                onClick={() => setActiveCategoryId((prev) => (prev === category.id ? null : category.id))}
                className={`w-full px-4 py-3.5 rounded-xl bg-[#0B1527] border-2 border-[#B89642] flex items-center justify-between transition-all select-none ${isSelectedCategory ? "ring-1 ring-[#B89642] shadow-md" : "hover:border-[#B89642]"
                  }`}
              >
                <span className="text-sm font-normal text-white text-left leading-snug">
                  {translate(category.label)}
                </span>

                {isSelectedCategory ? (
                  <span className="px-4 min-h-[48px] py-3  rounded-lg bg-[#B89642] text-white text-[11px] font-bold ">
                    {translate("securitySelected")}
                  </span>
                ) : (
                  <span className="px-4 min-h-[48px] py-3 rounded-lg border border-[#B89642] text-[#B89642] text-[11px] font-bold ">
                    {translate("securitySelect")}
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
                        className={`min-h-[48px] px-4 py-3 rounded-xl  bg-white flex items-center justify-between text-left transition-all duration-200 select-none group
                          ${isSelected
                            ? "border-2 border-[#B89642] ring-1 ring-[#B89642] shadow-sm"
                            : isDisabled
                              ? "border border-gray-200 bg-gray-50/60 opacity-50 cursor-not-allowed"
                              : "border border-[#C6A868]/60 hover:border-[#B89642] shadow-sm cursor-pointer"
                          }`}
                      >
                        {/* Left soft badge icon + title */}
                        <div className="flex items-center min-w-0 flex-1 pr-2">
                          <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] flex items-center justify-center text-lg shrink-0 mr-3 border border-slate-100 overflow-hidden">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <PackageIcon className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <span
                            className={`text-xs sm:text-sm leading-snug font-semibold text-[#1E293B] ${isDisabled ? "text-slate-400" : ""
                              }`}
                          >
                            {translate(categoryItemsMapping[item.name] as TranslationKey)}
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
          {categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`py-3.5 px-4 rounded-[7px] text-[12px] sm:text-sm text-[rgb(85,85,85)] font-normal transition-all duration-200 text-center select-none
                  ${isActive
                    ? "bg-[#0B1527] border-2 border-[#B89642] ring-1 ring-[#B89642] text-white shadow-md"
                    : "bg-white border border-[#C6A868]/60 hover:border-[#B89642] text-[#1E293B] hover:bg-slate-50 shadow-sm"
                  }`}
              >
                {translate(category.label)}
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
                    <div className="w-11 h-11 rounded-lg bg-[#F4F5F7] flex items-center justify-center text-xl shrink-0 mr-3.5 border border-slate-100 overflow-hidden">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <PackageIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <span
                      className={`text-sm sm:text-[15px] leading-snug font-semibold text-[#1E293B] ${isDisabled ? "text-slate-400" : ""
                        }`}
                    >
                      {translate(categoryItemsMapping[item.name] as TranslationKey)}
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
