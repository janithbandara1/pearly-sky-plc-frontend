"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { ApiError } from "@/lib/auth-context";
import { listAllQuotationsAdmin, Quotation, updateQuotationAdmin } from "@/lib/quotation-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const STATUS_VARIANT: Record<Quotation["status"], "default" | "secondary" | "outline"> = {
  contacted: "default",
  new: "secondary",
  closed: "outline",
};

const STATUS_OPTIONS: Quotation["status"][] = ["new", "contacted", "closed"];

export default function AdminQuotationsPage() {
  const { accessToken } = useStaffAuth();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [editStatus, setEditStatus] = useState<Quotation["status"]>("new");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = await listAllQuotationsAdmin(accessToken);
    setQuotations(data);
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load quotations."),
    );
  }, [load]);

  const filtered = useMemo(() => {
    return quotations.filter((quotation) => {
      if (statusFilter !== "all" && quotation.status !== statusFilter) return false;
      if (!search) return true;
      const c = quotation.customer;
      const haystack = `${quotation.referenceNumber} ${c?.firstName ?? ""} ${c?.lastName ?? ""} ${c?.email ?? ""}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [quotations, statusFilter, search]);

  function openEdit(quotation: Quotation) {
    setEditing(quotation);
    setEditStatus(quotation.status);
  }

  async function handleSave() {
    if (!accessToken || !editing) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateQuotationAdmin(accessToken, editing.id, { status: editStatus });
      setQuotations((prev) => prev.map((q) => (q.id === editing.id ? { ...q, ...updated } : q)));
      toast.success(`Quotation ${updated.referenceNumber} updated.`);
      setEditing(null);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to save quotation.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const columns: ColumnDef<Quotation>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const c = row.original.customer;
        return c ? `${c.firstName} ${c.lastName ?? ""}`.trim() : <span className="text-muted-foreground">—</span>;
      },
    },
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
            <Link href={`/staff/quotations/${row.original.id}`}>
              <Eye />
              <span className="sr-only">View details</span>
            </Link>
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => openEdit(row.original)}
            title="Edit"
          >
            <Pencil />
            <span className="sr-only">Edit</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quotations</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {quotations.length} quotations
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search reference, name, or email…"
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

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DataTable columns={columns} data={filtered} emptyMessage="No quotations match your filters." />

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit quotation</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <Label htmlFor="status">Status</Label>
            <Select value={editStatus} onValueChange={(value) => setEditStatus(value as Quotation["status"])}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
