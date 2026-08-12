"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/staff/data-table";
import { ApiError } from "@/lib/auth-context";
import { AdminPayment, listPaymentsAdmin } from "@/lib/admin-payments-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const STATUS_VARIANT: Record<AdminPayment["status"], "default" | "outline" | "destructive"> = {
  succeeded: "default",
  pending: "outline",
  failed: "destructive",
  cancelled: "outline",
};

export default function AdminPaymentsPage() {
  const { accessToken } = useStaffAuth();
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = await listPaymentsAdmin(accessToken);
    setPayments(data);
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load payments."),
    );
  }, [load]);

  const columns: ColumnDef<AdminPayment>[] = [
    {
      id: "reference",
      header: "Booking",
      cell: ({ row }) => row.original.booking?.referenceNumber ?? `#${row.original.bookingId}`,
    },
    {
      id: "amount",
      header: "Amount",
      cell: ({ row }) => `${row.original.amount} ${row.original.currency.toUpperCase()}`,
    },
    { accessorKey: "provider", header: "Provider" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
        <p className="text-sm text-muted-foreground">{payments.length} payments</p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={payments} emptyMessage="No payments yet." />
    </div>
  );
}
