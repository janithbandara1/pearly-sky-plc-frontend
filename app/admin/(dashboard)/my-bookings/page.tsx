"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { ApiError } from "@/lib/auth-context";
import { MyOrder, listMyOrders } from "@/lib/admin-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function MyBookingsPage() {
  const { accessToken } = useStaffAuth();
  const [orders, setOrders] = useState<MyOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setOrders(await listMyOrders(accessToken));
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load bookings."),
    );
  }, [load]);

  const columns: ColumnDef<MyOrder>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const c = row.original.customer;
        return (
          <div>
            <p>{c.firstName} {c.lastName ?? ""}</p>
            <p className="text-xs text-muted-foreground">{c.contact ?? c.email}</p>
          </div>
        );
      },
    },
    {
      id: "service",
      header: "Service",
      cell: ({ row }) => {
        const details = row.original.serviceDetails[0];
        if (!details) return <span className="text-muted-foreground">—</span>;
        return (
          <div>
            <p>{details.service.label}</p>
            <p className="text-xs text-muted-foreground">
              {details.date} · {details.time}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
          {row.original.status}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Bookings</h1>
        <p className="text-sm text-muted-foreground">{orders.length} bookings assigned to you</p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={orders} emptyMessage="No bookings assigned to you yet." />
    </div>
  );
}
