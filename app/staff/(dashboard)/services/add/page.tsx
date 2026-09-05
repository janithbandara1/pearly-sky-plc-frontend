"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ServiceFormFields } from "@/components/staff/service-form-fields";
import { ServiceItemsField } from "@/components/staff/service-items-field";
import { ServicePackagesField } from "@/components/staff/service-packages-field";
import {
  EMPTY_COUNTRY_PRICES,
  CountryPricesField,
  CountryPricesForm,
  toCountryPricesPayload,
} from "@/components/staff/country-prices-field";
import { ApiError } from "@/lib/auth-context";
import type { CatalogItem } from "@/lib/catalog-api";
import {
  AdminPackage,
  CreateServicePayload,
  createService,
  listItemsAdmin,
  listPackagesAdmin,
  setServiceItems,
  setServicePackages,
  setServicePrices,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const emptyForm: CreateServicePayload = {
  name: "",
  label: "",
  status: "active",
  category: "residential_cleaning",
  description: "",
  imageUrl: "",
};

export default function AddServicePage() {
  const router = useRouter();
  const { accessToken } = useStaffAuth();
  const [form, setForm] = useState<CreateServicePayload>(emptyForm);
  const [prices, setPrices] = useState<CountryPricesForm>(EMPTY_COUNTRY_PRICES);
  const [allPackages, setAllPackages] = useState<AdminPackage[]>([]);
  const [packageIds, setPackageIds] = useState<number[]>([]);
  const [allItems, setAllItems] = useState<CatalogItem[]>([]);
  const [itemIds, setItemIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [packagesData, itemsData] = await Promise.all([listPackagesAdmin(), listItemsAdmin()]);
    setAllPackages(packagesData);
    setAllItems(itemsData);
  }, []);

  useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      const created = await createService(accessToken, form);
      await setServicePrices(accessToken, created.id, toCountryPricesPayload(prices));
      if (packageIds.length > 0) {
        await setServicePackages(accessToken, created.id, packageIds);
      }
      if (itemIds.length > 0) {
        await setServiceItems(accessToken, created.id, itemIds);
      }
      toast.success(`Service "${created.label}" created.`);
      router.push("/staff/services");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Add service</h1>
        <p className="text-sm text-muted-foreground">
          Create a new service customers can book.
        </p>
      </div>

      <ServiceFormFields form={form} onChange={setForm} />

      <CountryPricesField prices={prices} onChange={setPrices} label="Hourly rate by country" />

      <ServicePackagesField
        allPackages={allPackages}
        selectedIds={packageIds}
        onChange={setPackageIds}
      />

      <ServiceItemsField allItems={allItems} selectedIds={itemIds} onChange={setItemIds} />

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/staff/services">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving…" : "Create service"}
        </Button>
      </div>
    </div>
  );
}
