"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ServiceFormFields } from "@/components/admin/service-form-fields";
import { ServiceItemsField } from "@/components/admin/service-items-field";
import { ServicePackagesField } from "@/components/admin/service-packages-field";
import { ApiError } from "@/lib/auth-context";
import { getService } from "@/lib/catalog-api";
import type { CatalogItem } from "@/lib/catalog-api";
import {
  AdminPackage,
  CreateServicePayload,
  listItemsAdmin,
  listPackagesAdmin,
  setServiceItems,
  setServicePackages,
  updateService,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function EditServicePage() {
  const params = useParams<{ id: string }>();
  const serviceId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useStaffAuth();
  const [form, setForm] = useState<CreateServicePayload | null>(null);
  const [allPackages, setAllPackages] = useState<AdminPackage[]>([]);
  const [packageIds, setPackageIds] = useState<number[]>([]);
  const [allItems, setAllItems] = useState<CatalogItem[]>([]);
  const [itemIds, setItemIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [detail, packagesData, itemsData] = await Promise.all([
      getService(serviceId),
      listPackagesAdmin(),
      listItemsAdmin(),
    ]);
    setForm({
      name: detail.name,
      label: detail.label,
      price: detail.price ?? "",
      status: detail.status,
      category: detail.category,
      description: detail.description ?? "",
      imageUrl: detail.imageUrl ?? "",
    });
    setAllPackages(packagesData);
    setPackageIds(detail.servicePackages.map((sp) => sp.package.id));
    setAllItems(itemsData);
    setItemIds(detail.serviceItems.map((si) => si.item.id));
  }, [serviceId]);

  useEffect(() => {
    setLoading(true);
    load()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load service."))
      .finally(() => setLoading(false));
  }, [load]);

  async function handleSubmit() {
    if (!accessToken || !form) return;
    setSaving(true);
    try {
      const updated = await updateService(accessToken, serviceId, form);
      await setServicePackages(accessToken, serviceId, packageIds);
      await setServiceItems(accessToken, serviceId, itemIds);
      toast.success(`Service "${updated.label}" updated.`);
      router.push("/admin/services");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit service</h1>
        <p className="text-sm text-muted-foreground">Update this service's details.</p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {form && (
        <>
          <ServiceFormFields form={form} onChange={setForm} />

          <ServicePackagesField
            allPackages={allPackages}
            selectedIds={packageIds}
            onChange={setPackageIds}
          />

          <ServiceItemsField allItems={allItems} selectedIds={itemIds} onChange={setItemIds} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/services">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
