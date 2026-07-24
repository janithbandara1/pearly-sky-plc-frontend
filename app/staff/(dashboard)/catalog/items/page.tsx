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
import type { CatalogItem } from "@/lib/catalog-api";
import {
  CreateItemPayload,
  createItem,
  deleteItem,
  listItemsAdmin,
  setItemPrices,
  updateItem,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const ITEM_TYPES = ["Cleaning Solvents", "Cleaning Equipments"] as const;

const emptyForm: CreateItemPayload = { name: "", sku: "", type: "", image: "" };

export default function AdminCatalogItemsPage() {
  const { accessToken } = useStaffAuth();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [form, setForm] = useState<CreateItemPayload>(emptyForm);
  const [prices, setPrices] = useState<CountryPricesForm>(EMPTY_COUNTRY_PRICES);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const data = await listItemsAdmin();
    setItems(data);
  }, []);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load items."),
    );
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setPrices(EMPTY_COUNTRY_PRICES);
    setOpen(true);
  }

  function openEdit(item: CatalogItem) {
    setEditing(item);
    setForm({ name: item.name, sku: item.sku, type: item.type, image: item.image ?? "" });
    setPrices(fromCountryPricesPayload(item.prices));
    setOpen(true);
  }

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      const saved = editing
        ? await updateItem(accessToken, editing.id, form)
        : await createItem(accessToken, form);
      const updated = await setItemPrices(accessToken, saved.id, toCountryPricesPayload(prices));
      setItems((prev) =>
        editing ? prev.map((i) => (i.id === updated.id ? updated : i)) : [...prev, updated],
      );
      toast.success(`Item "${updated.name}" ${editing ? "updated" : "created"}.`);
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save item.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: CatalogItem) {
    if (!accessToken) return;
    try {
      await deleteItem(accessToken, item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success(`Item "${item.name}" deleted.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete item.");
    }
  }

  const columns: ColumnDef<CatalogItem>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "type", header: "Type" },
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
            <Button onClick={openCreate}>Add item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit item" : "Add item"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => setForm({ ...form, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <CountryPricesField prices={prices} onChange={setPrices} />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
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
                {saving ? "Saving…" : editing ? "Save changes" : "Create item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={items} emptyMessage="No items yet." />
    </div>
  );
}
