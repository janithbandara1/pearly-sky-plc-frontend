"use client";

import React, { useState } from "react";
import {
  Home,
  Layers,
  Armchair,
  Wrench,
  Building2,
  Fence,
  Droplets,
  Car,
  Footprints,
  LayoutGrid,
  Sun,
  Warehouse,
  Paintbrush,
  Smile,
  Sparkles,
  Minus,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  formatQuoteItem,
  PRESSURE_WASHING_ITEM_OPTIONS,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

interface CategoryMeta {
  key: string;
  labelKey: TranslationKey;
  icon: React.ComponentType<{ className?: string }>;
}

const MAIN_CATEGORIES: CategoryMeta[] = [
  { key: "Residential Care", labelKey: "pressureCatResidential", icon: Home },
  { key: "Concrete & Surfaces", labelKey: "pressureCatConcrete", icon: Layers },
  { key: "Outdoor Living", labelKey: "pressureCatOutdoor", icon: Armchair },
  { key: "Specialized Jobs", labelKey: "pressureCatSpecialized", icon: Wrench },
];

const ITEM_LABEL_KEYS: Record<string, TranslationKey> = {
  "Home Exterior Cleaning": "pressureItemHomeExterior",
  "Fencing Cleaning": "pressureItemFencing",
  "Building Exterior Cleaning": "pressureItemBuildingExterior",
  "Gutter/Drains Cleaning": "pressureItemGutterDrains",
  "Driveway Cleaning": "pressureItemDriveway",
  "Sidewalk Cleaning": "pressureItemSidewalk",
  "Walkway Cleaning": "pressureItemWalkway",
  "Pavers Cleaning": "pressureItemPavers",
  "Deck/Patio Cleaning": "pressureItemDeckPatio",
  "Outdoor Furniture Cleaning": "pressureItemOutdoorFurniture",
  "Outdoor Equipment Cleaning": "pressureItemOutdoorEquipment",
  "Parking Garage Cleaning": "pressureItemParkingGarage",
  "Surface Preparation": "pressureItemSurfacePrep",
  "Playground Cleaning": "pressureItemPlayground",
  "Other Specialized Cleaning Services": "pressureItemOtherSpecialized",
};

const JOB_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Home Exterior Cleaning": Home,
  "Fencing Cleaning": Fence,
  "Building Exterior Cleaning": Building2,
  "Gutter/Drains Cleaning": Droplets,
  "Driveway Cleaning": Car,
  "Sidewalk Cleaning": Footprints,
  "Walkway Cleaning": Footprints,
  "Pavers Cleaning": LayoutGrid,
  "Deck/Patio Cleaning": Sun,
  "Outdoor Furniture Cleaning": Armchair,
  "Outdoor Equipment Cleaning": Wrench,
  "Parking Garage Cleaning": Warehouse,
  "Surface Preparation": Paintbrush,
  "Playground Cleaning": Smile,
  "Other Specialized Cleaning Services": Sparkles,
};

export interface PressureWashingJobSelectionProps {
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function PressureWashingJobSelection({ items, onItemsChange }: PressureWashingJobSelectionProps) {
  const { translate } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<QuoteItemOption | null>(null);

  const [isActiveCategory, setIsActiveCategory] = useState<Boolean>(false) //hide categories by-default

  // Form state inside dialog
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeValue, setSizeValue] = useState<string>("");
  const [sizeUnit, setSizeUnit] = useState<string>("ft²");
  const [condition, setCondition] = useState<string>("Heavy (Oil / Deep grime)");

  const categorySubcategories = PRESSURE_WASHING_ITEM_OPTIONS.filter(
    (opt) => opt.group === activeCategory
  );

  const handleCategoryActivation = (key: string) => {
    setActiveCategory(key)
    setIsActiveCategory(true) //show  catagories
  }

  function handleOpenDialog(option: QuoteItemOption) {
    setActiveOption(option);
    // Find existing item if already added to prefill
    const existing = items.find((i) => i.optionValue === option.value);
    if (existing) {
      setQuantity(existing.quantity);
      setSizeValue(existing.values.size ?? "");
      setSizeUnit(existing.values.sizeUnit ?? "ft²");
      setCondition(existing.values.condition ?? "Heavy (Oil / Deep grime)");
    } else {
      setQuantity(1);
      setSizeValue("");
      setSizeUnit("ft²");
      setCondition("Heavy (Oil / Deep grime)");
    }
  }

  function handleSaveDetails() {
    if (!activeOption) return;

    const values: Record<string, string> = {
      size: sizeValue.trim(),
      sizeUnit,
      condition,
    };

    const existingIndex = items.findIndex((i) => i.optionValue === activeOption.value);
    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity,
        values,
      };
      onItemsChange(updated);
    } else {
      onItemsChange([
        ...items,
        {
          id: crypto.randomUUID(),
          optionValue: activeOption.value,
          quantity,
          values,
        },
      ]);
    }

    setActiveOption(null);
  }

  function handleRemoveItem(id: string) {
    onItemsChange(items.filter((i) => i.id !== id));
  }

  const ActiveDialogIcon = activeOption ? JOB_ICONS[activeOption.value] ?? Sparkles : Sparkles;

  const getOptionLabel = (val: string, fallback: string) => {
    const key = ITEM_LABEL_KEYS[val];
    return key ? translate(key) : fallback;
  };

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#A98B4B] bg-[#101A26] p-4 sm:p-6 text-white shadow-xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          {translate("pressureSelectJobTitle")}
        </h2>
      </div>

      {/* Main Categories Row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 justify-items-center">
        {MAIN_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.key;
          const CatIcon = cat.icon;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryActivation(cat.key)}
              className={`group flex flex-col w-[80%] h-full items-center justify-center gap-3.5 rounded-2xl p-4 sm:p-5 text-center transition-all duration-200 cursor-pointer ${isSelected
                ? "bg-[#A98B4B] text-white shadow-lg scale-[1.02] border-2 border-[#A98B4B]"
                : "bg-[#FFFDF4] text-[#121E2D] hover:bg-white border-2 border-[#A98B4B]/80 hover:border-[#A98B4B]"
                }`}
            >
              <div
                className={`flex size-14 items-center justify-center rounded-full transition-colors ${isSelected
                  ? "bg-white/20 text-white"
                  : "bg-[#F3EAD8] text-[#A98B4B]"
                  }`}
              >
                <CatIcon className="size-7" />
              </div>
              <span className="whitespace-pre-line text-sm font-bold leading-tight sm:text-base">
                {translate(cat.labelKey)}
              </span>
              {/* Styled span, not a <button> — the whole card is already the button. */}
              <span
                className={`mt-auto inline-flex items-center justify-center gap-1 rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${isSelected
                  ? "bg-white text-[#A98B4B]"
                  : "bg-[#A98B4B] text-white group-hover:bg-[#967A3E]"
                  }`}
              >
                {isSelected && <Check className="size-3.5" />}
                {translate(isSelected ? "pressureSelectedBtn" : "pressureSelectBtn")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Subcategories Section */}
      {isActiveCategory && (
        <div className="mt-8 text-center">
          <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-[#A98B4B] sm:text-lg">
            {(() => {
              const activeCatMeta = MAIN_CATEGORIES.find((c) => c.key === activeCategory);
              return activeCatMeta ? translate(activeCatMeta.labelKey).replace("\n", " ") : activeCategory;
            })()}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {categorySubcategories.map((option) => {
              const IconComp = JOB_ICONS[option.value] ?? Sparkles;
              const existingItem = items.find((i) => i.optionValue === option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOpenDialog(option)}
                  className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-[#FFFDF4] p-4 text-[#121E2D] transition-all duration-200 hover:border-[#A98B4B] hover:shadow-md cursor-pointer ${existingItem
                    ? "border-[#A98B4B] ring-2 ring-[#A98B4B]/50"
                    : "border-[#A98B4B]/80"
                    }`}
                >
                  {existingItem && (
                    <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white">
                      <Check className="size-3.5" />
                    </span>
                  )}
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#F3EAD8] text-[#A98B4B] transition-transform group-hover:scale-110">
                    <IconComp className="size-5" />
                  </div>
                  <span className="text-sm font-bold leading-snug text-[#121E2D]">
                    {getOptionLabel(option.value, option.label)}
                  </span>
                  {existingItem && (
                    <span className="text-xs font-semibold text-[#A98B4B]">
                      {existingItem.values.size
                        ? `${existingItem.values.size} ${existingItem.values.sizeUnit ?? "ft²"}`
                        : `Qty: ${existingItem.quantity}`}
                    </span>
                  )}
                  <span
                    className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${existingItem
                      ? "border-2 border-[#A98B4B] bg-white text-[#A98B4B]"
                      : "bg-[#A98B4B] text-white group-hover:bg-[#967A3E]"
                      }`}
                  >
                    {translate(existingItem ? "pressureEditBtn" : "pressureSelectBtn")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* Selected Items Summary List */}
      {items.length > 0 && (
        <div className="mt-8 border-t border-[#A98B4B]/30 pt-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#A98B4B]">
            {translate("pressureSelectedJobsTitle")} ({items.length})
          </h4>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#A98B4B] bg-[#FFFDF4] px-4 py-2.5 text-sm text-[#121E2D]"
              >
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#A98B4B] shrink-0" />
                  <span className="font-medium">
                    {formatQuoteItem(item, PRESSURE_WASHING_ITEM_OPTIONS)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                  className="rounded-full p-1 text-[#555] hover:bg-[#F0E6D2] hover:text-destructive transition-colors"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Item Configuration Dialog Popup (Image 5) */}
      <Dialog open={activeOption !== null} onOpenChange={(open) => !open && setActiveOption(null)}>
        <DialogContent className="gap-0 overflow-hidden border-2 border-[#A98B4B] bg-[#FFFDF4] p-0 text-[#121E2D] ring-0 sm:max-w-md rounded-2xl shadow-2xl">
          <DialogHeader className="pt-6 pb-2 text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#F3EAD8] text-[#A98B4B]">
              <ActiveDialogIcon className="size-6" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-[#121E2D]">
              {activeOption ? getOptionLabel(activeOption.value, activeOption.label) : ""}
            </DialogTitle>
            <DialogDescription className="sr-only">Configure pressure washing job details</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 p-6 pt-2">
            {/* Quantity and Size Input Fields Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#121E2D]">{translate("pressureDialogQuantity")}</Label>
                <div className="flex h-10 w-full items-center justify-between rounded-lg border-2 border-[#A98B4B] bg-white px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:bg-[#967A3E]"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="text-sm font-bold text-[#121E2D]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:bg-[#967A3E]"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Size */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#121E2D]">{translate("pressureDialogSize")}</Label>
                <div className="flex gap-1.5">
                  <Input
                    type="number"
                    min="0"
                    placeholder={translate("pressureDialogSquarePlaceholder")}
                    value={sizeValue}
                    onChange={(e) => setSizeValue(e.target.value)}
                    className="h-10 border-2 border-[#A98B4B] bg-white text-sm text-[#121E2D] placeholder:text-muted-foreground/60 focus-visible:ring-[#A98B4B]"
                  />
                  <Select value={sizeUnit} onValueChange={setSizeUnit}>
                    <SelectTrigger className="h-10 w-24 border-2 border-[#A98B4B] bg-white text-xs font-semibold text-[#121E2D] focus:ring-[#A98B4B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-[#A98B4B]">
                      <SelectItem value="ft²">ft²</SelectItem>
                      <SelectItem value="m²">m²</SelectItem>
                      <SelectItem value="cm²">cm²</SelectItem>
                      <SelectItem value="ft">ft</SelectItem>
                      <SelectItem value="unit">unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Surface Condition Section */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-[#121E2D]">{translate("pressureDialogSurfaceCondition")}</Label>
              <p className="text-[11px] font-medium text-[#777]">{translate("pressureDialogSpecificReqs")}</p>

              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { value: "Heavy (Oil / Deep grime)", label: translate("pressureConditionHeavy") },
                  { value: "Normal", label: translate("pressureConditionNormal") },
                ].map((opt) => {
                  const isChecked = condition === opt.value;
                  return (
                    <label
                      key={opt.value}
                      onClick={() => setCondition(opt.value)}
                      className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#121E2D]"
                    >
                      <div
                        className={`flex size-4 items-center justify-center rounded-full border-2 border-[#A98B4B] transition ${isChecked ? "bg-[#A98B4B]" : "bg-white"
                          }`}
                      >
                        {isChecked && <div className="size-1.5 rounded-full bg-white" />}
                      </div>
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <Button
              type="button"
              onClick={handleSaveDetails}
              className="mt-2 h-11 w-full rounded-xl bg-[#A98B4B] text-sm font-bold uppercase tracking-wider text-white hover:bg-[#967A3E] transition-colors cursor-pointer"
            >
              {translate("pressureDialogSave")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
