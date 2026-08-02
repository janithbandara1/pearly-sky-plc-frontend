"use client";

import { useCurrency } from "@/lib/currency-context";

export interface EventProduct {
  name: string;
  price: number;
  icon: string;
}

export const EVENT_EQUIPMENT_PRODUCTS: EventProduct[] = [
  { name: "Commercial-Grade Vacuum Cleaners", price: 25, icon: "🧹" },
  { name: "Floor Polishers / Buffers", price: 25, icon: "✨" },
  { name: "Carpet Cleaners / Extractors", price: 25, icon: "🧺" },
  { name: "Mops and Buckets", price: 25, icon: "🪣" },
  { name: "Janitorial Carts", price: 25, icon: "🛒" },
  { name: "Trash Bags & Recycling Bins", price: 25, icon: "🗑️" },
  { name: "Wet Floor Signs", price: 25, icon: "⚠️" },
  { name: "Microfiber Cloths", price: 25, icon: "🧽" },
  { name: "Electrostatic Sprayers (For Disinfection)", price: 25, icon: "🧴" },
];

export const EVENT_CHEMICAL_PRODUCTS: EventProduct[] = [
  { name: "All-Purpose Cleaners", price: 45, icon: "🧪" },
  { name: "Disinfectants", price: 45, icon: "🦠" },
  { name: "Glass Cleaners", price: 45, icon: "🪟" },
  { name: "Floor Cleaners & Strippers", price: 45, icon: "🧫" },
  { name: "Carpet Cleaning Solutions", price: 45, icon: "🧴" },
  { name: "Odor Eliminators", price: 45, icon: "🌬️" },
  { name: "Hand Sanitizers", price: 45, icon: "🧴" },
];

export interface SelectedEventProduct {
  name: string;
  price: number;
}

export interface ProductsSuppliesSectionProps {
  quantities: Record<string, number>;
  onQuantitiesChange: (quantities: Record<string, number>) => void;
}

function ProductGrid({
  title,
  products,
  quantities,
  onQuantitiesChange,
  symbol,
}: {
  title: string;
  products: EventProduct[];
  quantities: Record<string, number>;
  onQuantitiesChange: (quantities: Record<string, number>) => void;
  symbol: string;
}) {
  function setQty(name: string, qty: number) {
    onQuantitiesChange({ ...quantities, [name]: Math.max(0, qty) });
  }

  return (
    <div>
      <p className="mb-2.5 text-sm font-semibold text-[#121E2D]">{title}</p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const qty = quantities[product.name] ?? 0;
          const isSelected = qty > 0;
          return (
            <div
              key={product.name}
              className={`flex items-center gap-3 rounded-[10px] bg-white px-3 py-2.5 transition ${
                isSelected
                  ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                  : "border-[1.5px] border-[#A98B4B]"
              }`}
            >
              <span className="text-xl">{product.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#121E2D]">{product.name}</p>
                <p className="text-xs text-[#555]">
                  {symbol}
                  {product.price.toFixed(2)} each
                  {qty > 0 && (
                    <>
                      {" "}
                      • <span className="font-semibold text-[#A98B4B]">{symbol}{(product.price * qty).toFixed(2)}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty(product.name, qty - 1)}
                  disabled={qty === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-[#A98B4B] font-bold text-[#A98B4B] disabled:opacity-40"
                >
                  −
                </button>
                <span className="min-w-[1.25rem] text-center text-sm font-semibold text-[#121E2D]">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(product.name, qty + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-[#A98B4B] font-bold text-[#A98B4B]"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductsSuppliesSection({ quantities, onQuantitiesChange }: ProductsSuppliesSectionProps) {
  const { symbol } = useCurrency();

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Products & Supplies</h2>
        <p className="mt-1 text-xs text-[#FFFDF4]/70 sm:text-sm">Choose your specialized tools.</p>
      </div>

      <div className="flex flex-col gap-6 bg-[#F8F9FA] p-4 sm:p-5">
        <ProductGrid
          title="Equipment"
          products={EVENT_EQUIPMENT_PRODUCTS}
          quantities={quantities}
          onQuantitiesChange={onQuantitiesChange}
          symbol={symbol}
        />
        <ProductGrid
          title="Chemicals"
          products={EVENT_CHEMICAL_PRODUCTS}
          quantities={quantities}
          onQuantitiesChange={onQuantitiesChange}
          symbol={symbol}
        />
      </div>
    </section>
  );
}

/** Derives the {name, price} line items (qty already folded into price) from a quantities map. */
export function selectedEventProductsFromQuantities(quantities: Record<string, number>): SelectedEventProduct[] {
  return [...EVENT_EQUIPMENT_PRODUCTS, ...EVENT_CHEMICAL_PRODUCTS]
    .filter((product) => (quantities[product.name] ?? 0) > 0)
    .map((product) => ({ name: product.name, price: product.price * quantities[product.name] }));
}
