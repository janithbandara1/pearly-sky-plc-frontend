"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/staff/data-table";
import { ApiError } from "@/lib/auth-context";
import type { CatalogService } from "@/lib/catalog-api";
import { listServicesAdmin } from "@/lib/admin-catalog-api";

export default function AdminServicesPage() {
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

  const columns: ColumnDef<CatalogService>[] = [
    { accessorKey: "label", header: "Label" },
    { accessorKey: "name", header: "Slug" },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category.replace("_", " "),
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
            <Link href={`/staff/services/${row.original.id}/edit`}>
              <Pencil />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage the services customers can book.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={services} emptyMessage="No services yet." />
    </div>
  );
}
