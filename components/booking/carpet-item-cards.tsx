"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { FieldInput } from "@/components/booking/quote-items-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
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
    <Card className="relative h-56 gap-0 rounded-2xl border-2 border-[#A98B4B] bg-white py-0 ring-0">
      {option.image && (
        <Image
          src={option.image}
          alt={option.label}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      )}

      <div className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-md border-2 border-[#A98B4B] bg-[#FFFDF4] px-4 py-1.5">
        <span className="text-sm font-bold whitespace-nowrap text-[#A98B4B]">{option.label}</span>
      </div>

      <div className="absolute inset-x-2 bottom-2 z-10 flex flex-col items-center gap-2">
        {added && !open && (
          <p className="rounded bg-white/90 px-2.5 py-1 text-center text-sm text-[#555]">
            {formatQuoteItem(added, CARPET_ITEM_OPTIONS)}
          </p>
        )}

        <Button
          type="button"
          onClick={handleToggle}
          size="lg"
          variant="outline"
          className={`px-8 text-sm font-bold ${
            added
              ? "border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]"
              : "border-2 border-[#A98B4B] bg-[#A98B4B] text-white hover:bg-[#A98B4B]/90"
          }`}
        >
          {added ? "Remove" : "Add"}
        </Button>
      </div>

      {open && (
        <div className="absolute inset-3 z-20 flex flex-col gap-3 overflow-y-auto rounded-xl bg-[#F9F7F2] p-3 shadow-lg">
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
            onClick={handleConfirm}
            size="lg"
            variant="outline"
            className="mt-auto w-full border-2 border-[#A98B4B] bg-[#A98B4B] text-sm font-semibold text-white hover:bg-[#A98B4B]/90"
          >
            Add
          </Button>
        </div>
      )}
    </Card>
  );
}

export interface CarpetItemCardsProps {
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function CarpetItemCards({ items, onItemsChange }: CarpetItemCardsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
    api.on("reInit", () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <Carousel opts={{ align: "start" }} setApi={setApi} className="px-9">
          <CarouselContent className="-ml-5">
            {CARPET_ITEM_OPTIONS.map((option) => (
              <CarouselItem key={option.value} className="basis-full pl-5 sm:basis-1/2 lg:basis-1/3">
                <CarpetItemCard
                  option={option}
                  added={items.find((item) => item.optionValue === option.value)}
                  onAdd={handleAdd}
                  onRemove={() => handleRemove(option.value)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
          <CarouselNext className="right-0 border-2 border-[#A98B4B] bg-[#FFFDF4] text-[#A98B4B] hover:bg-[#FFFDF4]" />
        </Carousel>

        {count > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`size-2.5 rounded-full transition-colors ${
                  index === current ? "bg-[#A98B4B]" : "bg-[#A98B4B]/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
