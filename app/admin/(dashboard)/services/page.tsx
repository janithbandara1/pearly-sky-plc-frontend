"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { ApiError } from "@/lib/auth-context";
import type { CatalogService } from "@/lib/catalog-api";
import { deleteService, listServicesAdmin } from "@/lib/admin-catalog-api";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminServicesPage() {
  const { accessToken } = useStaffAuth();
  const [services, setServices] = useState<CatalogService[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const servicesData = await listServicesAdmin();
    setServices(servicesData);
  }, []);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load services."),
    );
  }, [load]);

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

  const columns: ColumnDef<CatalogService>[] = [
    { accessorKey: "label", header: "Label" },
    { accessorKey: "name", header: "Slug" },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category.replace("_", " "),
    },
    {
      accessorKey: "prices",
      header: "Hourly rate",
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
          <Button size="icon-sm" variant="ghost" asChild>
            <Link href={`/admin/services/${row.original.id}/edit`}>
              <Pencil />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <ConfirmDeleteDialog
            trigger={
              <Button size="icon-sm" variant="ghost">
                <Trash2 />
                <span className="sr-only">Delete</span>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground">
            Manage the services customers can book.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/add">Add service</Link>
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={services} emptyMessage="No services yet." />
    </div>
  );
}
