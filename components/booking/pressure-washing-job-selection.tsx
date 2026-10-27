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
    <section className="overflow-hidden rounded-[16px] border border-[#D9DDE5] dark:border-[#718096]/60 bg-white dark:bg-[#1B2A40] p-4 sm:p-6 text-[#1A2238] dark:text-white shadow-xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider text-[#1A2238] dark:text-white sm:text-2xl">
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
                ? "bg-amber-50/70 border-2 border-[#D8B63F] text-[#1A2238] dark:bg-[#3A3423] dark:border-[#FFD766] dark:text-white shadow-lg scale-[1.02]"
                : "bg-white border border-[#D9DDE5] text-[#1A2238] hover:border-[#D8B63F] dark:bg-[#152238] dark:border-[#718096]/70 dark:text-[#C3CDDC] dark:hover:border-[#FFD766]/60 dark:hover:text-white"
                }`}
            >
              <div
                className={`flex size-14 items-center justify-center rounded-full transition-colors ${isSelected
                  ? "bg-[#002F6D]/10 text-[#002F6D] dark:bg-[#FFD766]/20 dark:text-[#FFD766]"
                  : "bg-[#F7F5F0] text-[#687386] group-hover:text-[#002F6D] dark:bg-[#1B2A40] dark:text-[#C3CDDC] dark:group-hover:text-[#FFD766]"
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
                  ? "bg-[#002F6D] text-white dark:bg-[#FFD766] dark:text-[#002F6D]"
                  : "bg-white border border-[#D9DDE5] text-[#002F6D] group-hover:border-[#002F6D] dark:bg-[#1B2A40] dark:border-[#718096] dark:text-[#C3CDDC] dark:group-hover:border-[#FFD766]/60 dark:group-hover:text-[#FFD766]"
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
          <h3 className="mb-5 text-base font-bold uppercase tracking-wider text-[#002F6D] dark:text-[#FFD766] sm:text-lg">
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
                  className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer ${existingItem
                    ? "border-2 border-[#D8B63F] bg-amber-50/50 text-[#1A2238] dark:border-[#FFD766] dark:bg-[#3A3423] dark:text-white shadow-[0_0_12px_rgba(255,215,102,0.2)]"
                    : "border-[#D9DDE5] bg-white text-[#1A2238] hover:border-[#D8B63F] dark:border-[#718096]/60 dark:bg-[#152238] dark:text-[#C3CDDC] dark:hover:border-[#FFD766]/60 dark:hover:text-white"
                    }`}
                >
                  {existingItem && (
                    <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-[#002F6D] text-white dark:bg-[#FFD766] dark:text-[#002F6D]">
                      <Check className="size-3.5" />
                    </span>
                  )}
                  <div className={`flex size-11 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${existingItem ? "bg-[#002F6D]/15 text-[#002F6D] dark:bg-[#FFD766]/20 dark:text-[#FFD766]" : "bg-[#F7F5F0] text-[#002F6D] dark:bg-[#1B2A40] dark:text-[#FFD766]"}`}>
                    <IconComp className="size-5" />
                  </div>
                  <span className="text-sm font-bold leading-snug">
                    {getOptionLabel(option.value, option.label)}
                  </span>
                  {existingItem && (
                    <span className="text-xs font-semibold text-[#002F6D] dark:text-[#FFD766]">
                      {existingItem.values.size
                        ? `${existingItem.values.size} ${existingItem.values.sizeUnit ?? "ft²"}`
                        : `Qty: ${existingItem.quantity}`}
                    </span>
                  )}
                  <span
                    className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${existingItem
                      ? "border border-[#002F6D] bg-[#002F6D] text-white dark:border-[#FFD766] dark:bg-[#FFD766] dark:text-[#002F6D]"
                      : "bg-[#002F6D] text-white hover:bg-[#002F6D]/90 dark:bg-[#1B2A40] dark:border dark:border-[#718096] dark:text-[#C3CDDC] dark:group-hover:border-[#FFD766] dark:group-hover:text-[#FFD766]"
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
        <div className="mt-8 border-t border-[#D9DDE5] dark:border-[#718096]/40 pt-4">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#002F6D] dark:text-[#FFD766]">
            {translate("pressureSelectedJobsTitle")} ({items.length})
          </h4>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#D9DDE5] dark:border-[#718096]/60 bg-white dark:bg-[#152238] px-4 py-2.5 text-sm text-[#1A2238] dark:text-white"
              >
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-[#167A57] dark:text-[#36D6A0] shrink-0" />
                  <span className="font-medium">
                    {formatQuoteItem(item, PRESSURE_WASHING_ITEM_OPTIONS)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                  className="rounded-full p-1 text-[#687386] dark:text-[#C3CDDC] hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors cursor-pointer"
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
        <DialogContent className="gap-0 overflow-hidden border border-[#D8B63F]/50 dark:border-[#FFD766]/50 bg-white dark:bg-[#1B2A40] p-0 text-[#1A2238] dark:text-white ring-0 sm:max-w-md rounded-2xl shadow-2xl">
          <DialogHeader className="pt-6 pb-2 text-center border-b border-[#D9DDE5] dark:border-[#718096]/30">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-[#002F6D]/10 dark:bg-[#FFD766]/20 text-[#002F6D] dark:text-[#FFD766]">
              <ActiveDialogIcon className="size-6" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-[#1A2238] dark:text-white">
              {activeOption ? getOptionLabel(activeOption.value, activeOption.label) : ""}
            </DialogTitle>
            <DialogDescription className="sr-only">Configure pressure washing job details</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 p-6 pt-3 bg-[#F7F5F0]/40 dark:bg-[#152238]/50">
            {/* Quantity and Size Input Fields Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1A2238] dark:text-white">{translate("pressureDialogQuantity")}</Label>
                <div className="flex h-10 w-full items-center justify-between rounded-lg border border-[#D9DDE5] dark:border-[#718096] bg-white dark:bg-[#152238] px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex size-7 items-center justify-center rounded-full bg-[#002F6D]/10 dark:bg-[#718096]/30 text-[#002F6D] dark:text-[#C3CDDC] transition hover:brightness-95 cursor-pointer"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="text-sm font-bold text-[#1A2238] dark:text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex size-7 items-center justify-center rounded-full bg-[#002F6D] dark:bg-[#FFD766] text-white dark:text-[#002F6D] transition hover:brightness-110 cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Size */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1A2238] dark:text-white">{translate("pressureDialogSize")}</Label>
                <div className="flex gap-1.5">
                  <Input
                    type="number"
                    min="0"
                    placeholder={translate("pressureDialogSquarePlaceholder")}
                    value={sizeValue}
                    onChange={(e) => setSizeValue(e.target.value)}
                    className="h-10 border border-[#D9DDE5] dark:border-[#718096] bg-white dark:bg-[#152238] text-sm text-[#1A2238] dark:text-white placeholder:text-muted-foreground/60 focus-visible:ring-[#002F6D] dark:focus-visible:ring-[#FFD766]"
                  />
                  <Select value={sizeUnit} onValueChange={setSizeUnit}>
                    <SelectTrigger className="h-10 w-24 border border-[#D9DDE5] dark:border-[#718096] bg-white dark:bg-[#152238] text-xs font-semibold text-[#1A2238] dark:text-white focus:ring-[#002F6D] dark:focus:ring-[#FFD766]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#1B2A40] border border-[#D9DDE5] dark:border-[#718096] text-[#1A2238] dark:text-white">
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
              <Label className="text-xs font-bold text-[#1A2238] dark:text-white">{translate("pressureDialogSurfaceCondition")}</Label>
              <p className="text-[11px] font-medium text-[#687386] dark:text-[#C3CDDC]">{translate("pressureDialogSpecificReqs")}</p>

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
                      className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#1A2238] dark:text-white"
                    >
                      <div
                        className={`flex size-4 items-center justify-center rounded-full border-2 border-[#D9DDE5] dark:border-[#718096] transition ${isChecked ? "border-[#002F6D] dark:border-[#FFD766] bg-[#002F6D] dark:bg-[#FFD766]" : "bg-white dark:bg-[#152238]"
                          }`}
                      >
                        {isChecked && <div className="size-1.5 rounded-full bg-white dark:bg-[#002F6D]" />}
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
              className="mt-2 h-11 w-full rounded-xl bg-[#002F6D] text-white hover:bg-[#002F6D]/90 dark:bg-[#FFD766] dark:text-[#002F6D] dark:hover:bg-[#FFD766]/90 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              {translate("pressureDialogSave")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
