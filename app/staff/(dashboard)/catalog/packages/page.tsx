"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
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
import { DataTable } from "@/components/staff/data-table";
import { ConfirmDeleteDialog } from "@/components/staff/confirm-delete-dialog";
import {
  CountryPricesField,
  CountryPricesForm,
  EMPTY_COUNTRY_PRICES,
  fromCountryPricesPayload,
  toCountryPricesPayload,
} from "@/components/staff/country-prices-field";
import { ApiError } from "@/lib/auth-context";
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

const emptyForm: CreatePackagePayload = { name: "", image: "" };

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
    setForm({ name: pkg.name, image: pkg.image ?? "" });
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
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
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
