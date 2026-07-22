"use client";

import type { ServiceAddOnPackage } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";

export interface JobCardSectionProps {
  packages: ServiceAddOnPackage[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
}

export function JobCardSection({ packages, selectedIds, onToggle }: JobCardSectionProps) {
  const { symbol } = useCurrency();

  return (
    <section className="rounded-[10px] bg-[#f5f5f5] px-4 py-6 sm:px-6">
      <p className="mx-auto mb-4 max-w-[1150px] px-4 text-center text-[24px] font-semibold text-[#121E2D]">
        Service Upgrade Option
      </p>

      {packages.length === 0 ? (
        <p className="mx-auto max-w-[1150px] rounded-[10px] border border-dashed border-[#A98B4B]/50 bg-white p-6 text-center text-sm text-[#555]">
          No service upgrade options are configured yet.
        </p>
      ) : (
        <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-2.5 sm:grid-cols-2">
          {packages.map((pkg) => {
            const isChecked = selectedIds.has(pkg.id);
            const price = pkg.price !== null ? Number(pkg.price) : null;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => onToggle(pkg.id)}
                aria-pressed={isChecked}
                className={`flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${
                  isChecked
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#121E2D]">{pkg.name}</p>
                  {price !== null && !Number.isNaN(price) && (
                    <p className="text-xs text-[#555]">Price: {symbol}{price.toFixed(2)}</p>
                  )}
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
    </section>
  );
}
