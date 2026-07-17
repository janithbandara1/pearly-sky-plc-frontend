"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ApiError } from "@/lib/auth-context";
import { getService } from "@/lib/catalog-api";
import type { CatalogService } from "@/lib/catalog-api";
import {
  AdminPackage,
  CreateServicePayload,
  createService,
  deleteService,
  listPackagesAdmin,
  listServicesAdmin,
  setServicePackages,
  updateService,
} from "@/lib/admin-catalog-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const emptyForm: CreateServicePayload = {
  name: "",
  label: "",
  price: "",
  status: "active",
  category: "property_care",
  description: "",
  imageUrl: "",
};

export default function AdminCatalogServicesPage() {
  const { accessToken } = useStaffAuth();
  const [services, setServices] = useState<CatalogService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogService | null>(null);
  const [form, setForm] = useState<CreateServicePayload>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [allPackages, setAllPackages] = useState<AdminPackage[]>([]);
  const [packagesEditingFor, setPackagesEditingFor] = useState<CatalogService | null>(null);
  const [editPackageIds, setEditPackageIds] = useState<number[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [savingPackages, setSavingPackages] = useState(false);

  const load = useCallback(async () => {
    const [servicesData, packagesData] = await Promise.all([
      listServicesAdmin(),
      listPackagesAdmin(),
    ]);
    setServices(servicesData);
    setAllPackages(packagesData);
  }, []);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load services."),
    );
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(service: CatalogService) {
    setEditing(service);
    setForm({
      name: service.name,
      label: service.label,
      price: service.price ?? "",
      status: service.status,
      category: service.category,
      description: service.description ?? "",
      imageUrl: service.imageUrl ?? "",
    });
    setOpen(true);
  }

  async function handleSubmit() {
    if (!accessToken) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateService(accessToken, editing.id, form);
        setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        toast.success(`Service "${updated.label}" updated.`);
      } else {
        const created = await createService(accessToken, form);
        setServices((prev) => [...prev, created]);
        toast.success(`Service "${created.label}" created.`);
      }
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: CatalogService) {
    if (!accessToken) return;
    try {
      await deleteService(accessToken, service.id);
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      toast.success(`Service "${service.label}" deleted.`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to delete service.");
    }
  }

  async function openPackagesEditor(service: CatalogService) {
    setPackagesEditingFor(service);
    setEditPackageIds([]);
    setLoadingPackages(true);
    try {
      const detail = await getService(service.id);
      setEditPackageIds(detail.servicePackages.map((sp) => sp.package.id));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to load linked packages.");
    } finally {
      setLoadingPackages(false);
    }
  }

  async function handleSavePackages() {
    if (!accessToken || !packagesEditingFor) return;
    setSavingPackages(true);
    try {
      await setServicePackages(accessToken, packagesEditingFor.id, editPackageIds);
      toast.success(`Upgrade options updated for "${packagesEditingFor.label}".`);
      setPackagesEditingFor(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update packages.");
    } finally {
      setSavingPackages(false);
    }
  }

  const columns: ColumnDef<CatalogService>[] = [
    { accessorKey: "label", header: "Label" },
    { accessorKey: "name", header: "Slug" },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category.replace("_", " "),
    },
    {
      accessorKey: "price",
      header: "Hourly rate",
      cell: ({ row }) => row.original.price ?? <span className="text-muted-foreground">Unset</span>,
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
          <Button size="sm" variant="outline" onClick={() => openPackagesEditor(row.original)}>
            Upgrade options
          </Button>
          <Button size="sm" variant="outline" onClick={() => openEdit(row.original)}>
            Edit
          </Button>
          <ConfirmDeleteDialog
            trigger={
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            }
            title={`Delete "${row.original.label}"?`}
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
            <Button onClick={openCreate}>Add service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit service" : "Add service"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Slug</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Hourly rate</Label>
                <Input
                  id="price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value as CreateServicePayload["category"] })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property_care">Property care</SelectItem>
                    <SelectItem value="bespoke_lifestyle">Bespoke lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as CreateServicePayload["status"] })
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
              <div className="col-span-2 flex flex-col gap-1">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving…" : editing ? "Save changes" : "Create service"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={services} emptyMessage="No services yet." />

      <Dialog
        open={!!packagesEditingFor}
        onOpenChange={(isOpen) => !isOpen && setPackagesEditingFor(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade options for {packagesEditingFor?.label}</DialogTitle>
          </DialogHeader>
          {loadingPackages ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="flex flex-col gap-2">
              {allPackages.map((pkg) => (
                <label key={pkg.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={editPackageIds.includes(pkg.id)}
                    onCheckedChange={(checked) =>
                      setEditPackageIds((prev) =>
                        checked ? [...prev, pkg.id] : prev.filter((id) => id !== pkg.id),
                      )
                    }
                  />
                  {pkg.name}
                  {pkg.price && (
                    <span className="text-muted-foreground">+€{pkg.price}</span>
                  )}
                </label>
              ))}
              {allPackages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No packages exist yet — create one under Catalog → Packages first.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPackagesEditingFor(null)}
              disabled={savingPackages}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePackages} disabled={savingPackages || loadingPackages}>
              {savingPackages ? "Saving…" : "Save upgrade options"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
