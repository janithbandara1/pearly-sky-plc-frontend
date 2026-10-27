"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { FieldInput } from "@/components/booking/quote-items-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  formatQuoteItem,
  POOL_ITEM_OPTIONS,
  POOL_TRANSLATION_KEYS,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";
import { useLanguage } from "@/lib/i18n/language-context"; 
import { PoolBlueprintDiagram } from "./common-flows-propertis-and-equipments/common-property-types";

const POOL_TYPE_OPTIONS = POOL_ITEM_OPTIONS.filter((o) => o.group === "Pool Type");
const ADDITIONAL_SERVICE_OPTIONS = POOL_ITEM_OPTIONS.filter((o) => o.group === "Additional Services");
const LEFT_TYPES = POOL_TYPE_OPTIONS.slice(0, 8);
const RIGHT_TYPES = POOL_TYPE_OPTIONS.slice(8);

function CheckRow({
  option,
  checked,
  onToggle,
}: {
  option: QuoteItemOption;
  checked: boolean;
  onToggle: () => void;
}) {
  const { translate } = useLanguage();
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 transition ${
        checked
          ? "border-2 border-[#D8B63F] bg-amber-50/50 text-[#1A2238] dark:border-[#FFD766] dark:bg-[#3A3423] dark:text-white shadow-[0_0_12px_rgba(255,215,102,0.25)]"
          : "border border-[#D9DDE5] bg-white text-[#1A2238] hover:border-[#D8B63F] dark:border-[#718096]/60 dark:bg-[#152238] dark:text-[#C3CDDC] dark:hover:border-[#FFD766]/60 dark:hover:text-white"
      }`}
    >
      <span className="text-sm font-medium">
        {translate(POOL_TRANSLATION_KEYS[option.label])}
      </span>
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        className="border-[#D9DDE5] dark:border-[#718096] data-checked:border-[#002F6D] dark:data-checked:border-[#FFD766] data-checked:bg-[#002F6D] dark:data-checked:bg-[#FFD766] data-checked:text-white dark:data-checked:text-[#002F6D]"
      />
    </label>
  );
}

export interface PoolJobSelectionProps {
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function PoolJobSelection({ items, onItemsChange }: PoolJobSelectionProps) {
  const { translate } = useLanguage();
  const [activeOption, setActiveOption] = useState<QuoteItemOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});

  const selectedValues = new Set(items.map((i) => i.optionValue));

  function handleRowToggle(option: QuoteItemOption) {
    if (selectedValues.has(option.value)) {
      onItemsChange(items.filter((i) => i.optionValue !== option.value));
      return;
    }
    setActiveOption(option);
    setQuantity(1);

    const defaultValues: Record<string, string> = {};
    for (const field of option.fields) {
      if (field.kind === "size") {
        defaultValues[field.key] = "20";
        defaultValues[`${field.key}Unit`] = field.units[0];
      } else if (field.kind === "radio") {
        defaultValues[field.key] = field.options[0];
      }
    }
    setValues(defaultValues);
  }

  function handleSaveDetails() {
    if (!activeOption) return;
    onItemsChange([...items, { id: crypto.randomUUID(), optionValue: activeOption.value, quantity, values }]);
    setActiveOption(null);
  }

  return (
    <section className="overflow-hidden rounded-[14px] border border-[#D9DDE5] dark:border-[#718096]/50 bg-white dark:bg-[#1B2A40] shadow-xl">
      <div className="bg-white dark:bg-[#152238] border-b border-[#D9DDE5] dark:border-[#718096]/40 px-5 py-4 text-center">
        <h1 className="md:text-[1.4rem] font-bold text-[#1A2238] dark:text-white text-[1.3rem]">
          {translate("poolSectionTitle")}</h1>
        <p className="text-sm text-[#687386] dark:text-[#C3CDDC] mt-1">{translate("poolSelectingJob")}</p>
      </div>
      

      <div className="flex flex-col gap-4 bg-[#F7F5F0]/60 dark:bg-[#1B2A40] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.1fr_1fr]">
          <div className="flex flex-col gap-2.5">
            {LEFT_TYPES.map((option) => (
              <CheckRow
                key={option.value}
                option={option}
                checked={selectedValues.has(option.value)}
                onToggle={() => handleRowToggle(option)}
              />
            ))}
          </div>

          <div className="relative hidden min-h-[280px] overflow-hidden rounded-[12px] border border-[#D9DDE5] dark:border-[#718096]/50 md:block">
            <Image
              src="/images/services/updated-home-property-cleaning-services-13-pool-cleaning.webp"
              alt={translate("servicePoolCleaning")}
              fill
              className="object-cover"
            />
            {items.length > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 overflow-y-auto p-4 bg-black/25 backdrop-blur-[2px]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg px-3 py-1.5 text-center text-xs font-semibold bg-white/95 dark:bg-[#152238]/95 border border-[#D9DDE5] dark:border-[#718096] text-[#1A2238] dark:text-[#C3CDDC] shadow-md"
                  >
                    {formatQuoteItem(item, POOL_ITEM_OPTIONS, (value) =>
                      POOL_TRANSLATION_KEYS[value] ? translate(POOL_TRANSLATION_KEYS[value]) : value,
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            {RIGHT_TYPES.map((option) => (
              <CheckRow
                key={option.value}
                option={option}
                checked={selectedValues.has(option.value)}
                onToggle={() => handleRowToggle(option)}
              />
            ))}
            {ADDITIONAL_SERVICE_OPTIONS.map((option) => (
              <CheckRow
                key={option.value}
                option={option}
                checked={selectedValues.has(option.value)}
                onToggle={() => handleRowToggle(option)}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={activeOption !== null} onOpenChange={(next) => !next && setActiveOption(null)}>
        <DialogContent className="gap-0 overflow-hidden border border-[#D8B63F]/50 dark:border-[#FFD766]/50 bg-white dark:bg-[#1B2A40] p-0 ring-0 sm:max-w-md shadow-2xl">
          <DialogHeader className="pt-5 pb-3 border-b border-[#D9DDE5] dark:border-[#718096]/30">
            <DialogTitle className="text-center text-base font-bold text-[#1A2238] dark:text-white">
              {activeOption && translate(POOL_TRANSLATION_KEYS[activeOption.label])}
            </DialogTitle>
            <DialogDescription className="sr-only">{translate("poolServiceDetails")}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 p-5 bg-[#F7F5F0]/40 dark:bg-[#152238]/50">
            {activeOption?.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                translateText={(value) =>
                  POOL_TRANSLATION_KEYS[value] ? translate(POOL_TRANSLATION_KEYS[value]) : value
                }
                values={values}
                onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
              />
            ))}

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A2238] dark:text-white">{translate("poolQuantity")}</span>
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

            <Button
              type="button"
              onClick={handleSaveDetails}
              size="lg"
              className="mt-2 w-full bg-[#002F6D] text-white hover:bg-[#002F6D]/90 dark:bg-[#FFD766] dark:text-[#002F6D] dark:hover:bg-[#FFD766]/90 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              {translate("poolSave")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

