"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { AdminPackage } from "@/lib/admin-catalog-api";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";

function priceSummary(prices: AdminPackage["prices"]): string | null {
  const set = prices.filter((p) => p.price !== null);
  if (set.length === 0) return null;
  return SUPPORTED_COUNTRIES.map((code) => {
    const price = prices.find((p) => p.country === code)?.price;
    return `${code.toUpperCase()} ${price ?? "—"}`;
  }).join(" · ");
}

interface ServicePackagesFieldProps {
  allPackages: AdminPackage[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function ServicePackagesField({
  allPackages,
  selectedIds,
  onChange,
}: ServicePackagesFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Packages</Label>
      <div className="flex flex-col gap-2 rounded-lg border p-3">
        {allPackages.map((pkg) => (
          <label key={pkg.id} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selectedIds.includes(pkg.id)}
              onCheckedChange={(checked) =>
                onChange(
                  checked
                    ? [...selectedIds, pkg.id]
                    : selectedIds.filter((id) => id !== pkg.id),
                )
              }
            />
            {pkg.name}
            {priceSummary(pkg.prices) && (
              <span className="text-muted-foreground">{priceSummary(pkg.prices)}</span>
            )}
          </label>
        ))}
        {allPackages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No packages exist yet — create one under Catalog → Packages first.
          </p>
        )}
      </div>
    </div>
  );
}
