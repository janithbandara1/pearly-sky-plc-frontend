"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { ApiError } from "@/lib/auth-context";
import { AdminCustomer, listCustomersAdmin } from "@/lib/admin-customers-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminCustomersPage() {
  const { accessToken } = useStaffAuth();
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (query?: string) => {
      if (!accessToken) return;
      const data = await listCustomersAdmin(accessToken, query);
      setCustomers(data);
    },
    [accessToken],
  );

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load customers."),
    );
  }, [load]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      load(search || undefined).catch(() => undefined);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const columns: ColumnDef<AdminCustomer>[] = [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => `${row.original.firstName} ${row.original.lastName ?? ""}`,
    },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => row.original.contact ?? <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => row.original.country ?? <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "isGuest",
      header: "Type",
      cell: ({ row }) => (row.original.isGuest ? "Guest" : "Registered"),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="text-sm text-muted-foreground">{customers.length} customers</p>
      </div>

      <Input
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={customers} emptyMessage="No customers found." />
    </div>
  );
}
