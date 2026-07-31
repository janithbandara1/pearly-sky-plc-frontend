"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";

export type SupplySource = "" | "customer" | "company";

const OPTIONS = [
  { value: "customer" as const, label: "Provided by the Customer" },
  { value: "company" as const, label: "Request the Company" },
];

interface CustomSelectProps {
  value: SupplySource;
  onChange: (value: SupplySource) => void;
}

function CustomSelect({ value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((p) => !p)}
        onKeyDown={(e) => e.key === "Enter" && setOpen((p) => !p)}
        className="flex cursor-pointer items-center justify-between rounded-lg border border-[#A98B4B] bg-[#121E2D] px-4 py-3"
      >
        <span className="text-sm text-white/60">{selected?.label ?? "Select a cleaning solvents & equipments option"}</span>
        <ChevronDown className={`h-4 w-4 text-[#A98B4B] transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#A98B4B] bg-[#121E2D]">
          {OPTIONS.map((opt, i) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`cursor-pointer px-4 py-3 text-sm text-white hover:bg-white/5 ${
                i < OPTIONS.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface EquipmentSectionProps {
  items: CatalogItem[];
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  selectedItemIds: Set<number>;
  onToggleItem: (id: number) => void;
}

export function EquipmentSection({
  items,
  supplySource,
  onSupplySourceChange,
  selectedItemIds,
  onToggleItem,
}: EquipmentSectionProps) {
  const { symbol } = useCurrency();

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Cleaning Solvents &amp; Equipments</h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="mb-4">
          <CustomSelect value={supplySource} onChange={onSupplySourceChange} />
        </div>

        {items.length === 0 ? (
          <p className="rounded-[10px] border border-dashed border-[#A98B4B]/50 bg-white p-6 text-center text-sm text-[#555]">
            No cleaning solvents & equipments are configured yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {items.map((item) => {
              const isChecked = selectedItemIds.has(item.id);
              const price = item.price !== null ? Number(item.price) : NaN;
              const isDisabled = supplySource !== "company" && !isChecked;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onToggleItem(item.id)}
                  disabled={isDisabled}
                  aria-pressed={isChecked}
                  className={`flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${
                    isDisabled ? "cursor-not-allowed opacity-50" : ""
                  } ${
                    isChecked
                      ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                      : "border-[1.5px] border-[#A98B4B]"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#121E2D]">{item.name}</p>
                    {!Number.isNaN(price) && <p className="text-xs text-[#555]">Price: {symbol}{price.toFixed(2)}</p>}
                  </div>
                  <span
                    className={`shrink-0 rounded-[6px] border-[1.5px] border-[#A98B4B] px-2.5 py-1 text-xs font-semibold ${
                      isChecked ? "bg-[#A98B4B] text-white" : "text-[#A98B4B]"
                    }`}
                  >
                    {isChecked ? "Added" : "Add"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
