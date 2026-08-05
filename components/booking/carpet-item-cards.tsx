"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { FieldInput } from "@/components/booking/quote-items-section";
import { CARPET_ITEM_OPTIONS, formatQuoteItem, type QuoteItem, type QuoteItemOption } from "@/lib/content/quote-items";

function CarpetItemCard({
  option,
  added,
  onAdd,
  onRemove,
}: {
  option: QuoteItemOption;
  added: QuoteItem | undefined;
  onAdd: (item: QuoteItem) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});

  function handleToggle() {
    if (added) {
      onRemove();
      setOpen(false);
      return;
    }
    setOpen((o) => !o);
  }

  function handleConfirm() {
    onAdd({ id: crypto.randomUUID(), optionValue: option.value, quantity, values });
    setOpen(false);
    setQuantity(1);
    setValues({});
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#A98B4B] bg-white">
      <div className="relative h-40 w-full shrink-0">
        {option.image && (
          <Image
            src={option.image}
            alt={option.label}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-md border-2 border-[#A98B4B] bg-[#FFFDF4] px-3 py-1">
          <span className="text-xs font-bold whitespace-nowrap text-[#A98B4B]">{option.label}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <button
          type="button"
          onClick={handleToggle}
          className={`self-center rounded px-6 py-1.5 text-xs font-bold transition-colors ${
            added
              ? "border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B]"
              : "border-2 border-[#A98B4B] bg-[#A98B4B] text-white"
          }`}
        >
          {added ? "Remove" : "Add"}
        </button>

        {added && !open && (
          <p className="text-center text-xs text-[#555]">{formatQuoteItem(added, CARPET_ITEM_OPTIONS)}</p>
        )}

        {open && (
          <div className="flex flex-col gap-3 rounded-xl bg-[#F9F7F2] p-3">
            {option.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                values={values}
                onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
              />
            ))}

            <div className="space-y-1.5">
              <span className="text-sm font-medium text-[#121E2D]">Quantity</span>
              <div className="flex h-9 w-28 items-center justify-between rounded-lg border border-[#A98B4B] bg-white px-1.5">
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

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full rounded-lg bg-[#A98B4B] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A98B4B]/90"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export interface CarpetItemCardsProps {
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function CarpetItemCards({ items, onItemsChange }: CarpetItemCardsProps) {
  function handleAdd(item: QuoteItem) {
    onItemsChange([...items, item]);
  }

  function handleRemove(optionValue: string) {
    onItemsChange(items.filter((item) => item.optionValue !== optionValue));
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
      <div className="bg-brand-navy px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">Carpet &amp; Upholstery Items</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {CARPET_ITEM_OPTIONS.map((option) => (
          <CarpetItemCard
            key={option.value}
            option={option}
            added={items.find((item) => item.optionValue === option.value)}
            onAdd={handleAdd}
            onRemove={() => handleRemove(option.value)}
          />
        ))}
      </div>
    </section>
  );
}
