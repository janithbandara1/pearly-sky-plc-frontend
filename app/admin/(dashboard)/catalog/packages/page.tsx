"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import {
  CountryPricesField,
  CountryPricesForm,
  EMPTY_COUNTRY_PRICES,
  fromCountryPricesPayload,
  toCountryPricesPayload,
} from "@/components/admin/country-prices-field";
import { ApiError } from "@/lib/auth-context";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import {
  AdminPackage,
  CreatePackagePayload,
  createPackage,
  deletePackage,
  listPackagesAdmin,
  setPackagePrices,
  updatePackage,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const emptyForm: CreatePackagePayload = { name: "", status: "active" };

export default function AdminCatalogPackagesPage() {
  const { accessToken } = useStaffAuth();
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [form, setForm] = useState<CreatePackagePayload>(emptyForm);
  const [prices, setPrices] = useState<CountryPricesForm>(EMPTY_COUNTRY_PRICES);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const data = await listPackagesAdmin();
    setPackages(data);
  }, []);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load packages."),
    );
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setPrices(EMPTY_COUNTRY_PRICES);
    setOpen(true);
  }

  function openEdit(pkg: AdminPackage) {
    setEditing(pkg);
    setForm({ name: pkg.name, status: pkg.status });
    setPrices(fromCountryPricesPayload(pkg.prices));
    setOpen(true);
  }

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      const saved = editing
        ? await updatePackage(accessToken, editing.id, form)
        : await createPackage(accessToken, form);
      const updated = await setPackagePrices(accessToken, saved.id, toCountryPricesPayload(prices));
      setPackages((prev) =>
        editing
          ? prev.map((p) => (p.id === updated.id ? updated : p))
          : [...prev, updated],
      );
      toast.success(`Package "${updated.name}" ${editing ? "updated" : "created"}.`);
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save package.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(pkg: AdminPackage) {
    if (!accessToken) return;
    try {
      await deletePackage(accessToken, pkg.id);
      setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
      toast.success(`Package "${pkg.name}" deleted.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete package.");
    }
  }

  const columns: ColumnDef<AdminPackage>[] = [
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "prices",
      header: "Price",
      cell: ({ row }) => (
        <span className="text-sm">
          {SUPPORTED_COUNTRIES.map((code) => {
            const price = row.original.prices.find((p) => p.country === code)?.price;
            return `${code.toUpperCase()} ${price ?? "—"}`;
          }).join(" · ")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "outline"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button size="icon-sm" variant="ghost" onClick={() => openEdit(row.original)}>
            <Pencil />
            <span className="sr-only">Edit</span>
          </Button>
          <ConfirmDeleteDialog
            trigger={
              <Button size="icon-sm" variant="ghost">
                <Trash2 />
                <span className="sr-only">Delete</span>
              </Button>
            }
            title={`Delete "${row.original.name}"?`}
            description="This cannot be undone."
            onConfirm={() => handleDelete(row.original)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>Add package</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit package" : "Add package"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <CountryPricesField prices={prices} onChange={setPrices} />
              <div className="flex flex-col gap-1">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as CreatePackagePayload["status"] })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving…" : editing ? "Save changes" : "Create package"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={packages} emptyMessage="No packages yet." />
    </div>
  );
}
