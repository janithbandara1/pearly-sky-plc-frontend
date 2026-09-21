"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { DataTable } from "@/components/staff/data-table";
import { ConfirmDeleteDialog } from "@/components/staff/confirm-delete-dialog";
import { ApiError } from "@/lib/auth-context";
import {
  AdminPackage,
  CreatePackagePayload,
  createPackage,
  deletePackage,
  listPackagesAdmin,
  updatePackage,
} from "@/lib/admin-catalog-api";
import { PACKAGE_CATEGORY_LABELS, type PackageCategory } from "@/lib/catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const emptyForm: CreatePackagePayload = {
  name: "",
  image: "",
  category: "deep_and_specialized_cleaning",
};

export default function AdminCatalogPackagesPage() {
  const { accessToken } = useStaffAuth();
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [form, setForm] = useState<CreatePackagePayload>(emptyForm);
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
    setOpen(true);
  }

  function openEdit(pkg: AdminPackage) {
    setEditing(pkg);
    setForm({ name: pkg.name, image: pkg.image ?? "", category: pkg.category });
    setOpen(true);
  }

  function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      const saved = editing
        ? await updatePackage(accessToken, editing.id, form)
        : await createPackage(accessToken, form);
      setPackages((prev) =>
        editing ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved],
      );
      toast.success(`Package "${saved.name}" ${editing ? "updated" : "created"}.`);
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => PACKAGE_CATEGORY_LABELS[row.original.category],
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
              <div className="flex flex-col gap-1">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value as PackageCategory })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PACKAGE_CATEGORY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image</Label>
                {form.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt=""
                    className="h-24 w-24 rounded-lg border object-cover"
                  />
                )}
                <Input id="image" type="file" accept="image/*" onChange={handleImageFileChange} />
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
