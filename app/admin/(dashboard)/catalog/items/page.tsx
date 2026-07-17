"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { ApiError } from "@/lib/auth-context";
import type { CatalogItem } from "@/lib/catalog-api";
import {
  CreateItemPayload,
  createItem,
  deleteItem,
  listItemsAdmin,
  updateItem,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const emptyForm: CreateItemPayload = { name: "", sku: "", price: "", type: "", image: "" };

export default function AdminCatalogItemsPage() {
  const { accessToken } = useStaffAuth();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [form, setForm] = useState<CreateItemPayload>(emptyForm);
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
    setOpen(true);
  }

  function openEdit(item: CatalogItem) {
    setEditing(item);
    setForm({ name: item.name, sku: item.sku, price: item.price, type: item.type, image: item.image ?? "" });
    setOpen(true);
  }

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateItem(accessToken, editing.id, form);
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        toast.success(`Item "${updated.name}" updated.`);
      } else {
        const created = await createItem(accessToken, form);
        setItems((prev) => [...prev, created]);
        toast.success(`Item "${created.name}" created.`);
      }
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
    { accessorKey: "price", header: "Price" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => openEdit(row.original)}>
            Edit
          </Button>
          <ConfirmDeleteDialog
            trigger={
              <Button size="sm" variant="destructive">
                Delete
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
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="type">Type</Label>
                <Input id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
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
