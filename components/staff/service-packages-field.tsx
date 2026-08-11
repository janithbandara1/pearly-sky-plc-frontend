"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { AdminPackage } from "@/lib/admin-catalog-api";

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
