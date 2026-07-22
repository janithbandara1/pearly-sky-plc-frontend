"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CatalogItem } from "@/lib/catalog-api";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";

function priceSummary(prices: CatalogItem["prices"]): string | null {
  const set = prices.filter((p) => p.price !== null);
  if (set.length === 0) return null;
  return SUPPORTED_COUNTRIES.map((code) => {
    const price = prices.find((p) => p.country === code)?.price;
    return `${code.toUpperCase()} ${price ?? "—"}`;
  }).join(" · ");
}

interface ServiceItemsFieldProps {
  allItems: CatalogItem[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function ServiceItemsField({ allItems, selectedIds, onChange }: ServiceItemsFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Items</Label>
      <div className="flex flex-col gap-2 rounded-lg border p-3">
        {allItems.map((item) => (
          <label key={item.id} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={(checked) =>
                onChange(
                  checked
                    ? [...selectedIds, item.id]
                    : selectedIds.filter((id) => id !== item.id),
                )
              }
            />
            {item.name}
            {priceSummary(item.prices) && (
              <span className="text-muted-foreground">{priceSummary(item.prices)}</span>
            )}
          </label>
        ))}
        {allItems.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No items exist yet — create one under Catalog → Items first.
          </p>
        )}
      </div>
    </div>
  );
}
