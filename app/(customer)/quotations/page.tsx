"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/staff/data-table";
import { ApiError, useAuth } from "@/lib/auth-context";
import { listMyQuotations, Quotation } from "@/lib/quotation-api";

const STATUS_VARIANT: Record<Quotation["status"], "default" | "secondary" | "outline"> = {
  contacted: "default",
  new: "secondary",
  closed: "outline",
};

const STATUS_OPTIONS: Quotation["status"][] = ["new", "contacted", "closed"];

export default function QuotationsPage() {
  const { accessToken } = useAuth();

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await listMyQuotations(accessToken);
    setQuotations(data);
  }, [accessToken]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load quotations."))
      .finally(() => setLoading(false));
  }, [loadData]);

  const filtered = useMemo(() => {
    return quotations.filter((quotation) => {
      if (statusFilter !== "all" && quotation.status !== statusFilter) return false;
      if (!search) return true;
      const query = search.toLowerCase();
      return (
        quotation.referenceNumber.toLowerCase().includes(query) ||
        quotation.service.label.toLowerCase().includes(query)
      );
    });
  }, [quotations, search, statusFilter]);

  const columns: ColumnDef<Quotation>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "service",
      header: "Service",
      cell: ({ row }) => row.original.service.label,
    },
    {
      id: "datetime",
      header: "Date & time",
      cell: ({ row }) => {
        const { date, time } = row.original;
        if (!date) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="text-muted-foreground">
            {date} {time ? `· ${time}` : ""}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button size="icon-sm" variant="ghost" asChild title="View details">
            <Link href={`/quotations/${row.original.id}`}>
              <Eye />
              <span className="sr-only">View details</span>
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quotations</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {quotations.length} quotations
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search reference or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="ml-auto w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filtered} emptyMessage="No quotations found." />
      {quotations.length === 0 && (
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-2">
            Browse services
          </Link>{" "}
          to request your first quotation.
        </p>
      )}
    </div>
  );
}
