"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { FieldInput } from "@/components/booking/quote-items-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatQuoteItem, POOL_ITEM_OPTIONS, type QuoteItem, type QuoteItemOption } from "@/lib/content/quote-items";

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
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-[10px] bg-white px-3 py-2.5 transition ${
        checked ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]" : "border-[1.5px] border-[#A98B4B]"
      }`}
    >
      <span className="text-sm font-medium text-[#121E2D]">{option.label}</span>
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        className="border-[#A98B4B] data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
      />
    </label>
  );
}

export interface PoolJobSelectionProps {
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function PoolJobSelection({ items, onItemsChange }: PoolJobSelectionProps) {
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
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Pool Details</h2>
      </div>

      <div className="flex flex-col gap-4 bg-[#F8F9FA] p-4 sm:p-5">
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

          <div className="relative hidden min-h-[280px] overflow-hidden rounded-[12px] border border-[#A98B4B] md:block">
            <Image
              src="/images/services/updated-home-property-cleaning-services-13-pool-cleaning.webp"
              alt="Pool cleaning"
              fill
              className="object-cover"
            />
            {items.length > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 overflow-y-auto p-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg bg-white/90 px-3 py-1.5 text-center text-xs text-[#121E2D]"
                  >
                    {formatQuoteItem(item, POOL_ITEM_OPTIONS)}
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
        <DialogContent className="gap-0 overflow-hidden border-0 bg-[#F9F7F2] p-0 ring-0 sm:max-w-md">
          <DialogHeader className="pt-4">
            <DialogTitle className="text-center text-sm font-bold text-[#121E2D]">{activeOption?.label}</DialogTitle>
            <DialogDescription className="sr-only">Pool service details</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 p-4">
            {activeOption?.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                values={values}
                onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
              />
            ))}

            <div className="space-y-1.5">
              <span className="text-sm font-medium text-[#121E2D]">Quantity</span>
              <div className="flex h-9 w-full items-center justify-between rounded-lg border border-[#A98B4B] bg-white px-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B]/40 text-[#121E2D] transition hover:brightness-95"
                >
                  <Minus className="size-3" />
                </button>
                <span className="text-sm font-semibold text-[#121E2D]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-95"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSaveDetails}
              size="lg"
              variant="outline"
              className="mt-2 w-full border-0 bg-[#A98B4B] text-sm font-semibold text-white hover:bg-[#A98B4B]/90"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
