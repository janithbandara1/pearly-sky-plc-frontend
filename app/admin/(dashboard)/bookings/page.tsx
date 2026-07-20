"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
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
import { DataTable } from "@/components/admin/data-table";
import { ApiError } from "@/lib/auth-context";
import { AdminOrder, listAllOrdersAdmin, updateOrderAdmin } from "@/lib/admin-api";
import { AdminUser, listUsers } from "@/lib/admin-users-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

interface EditState {
  price: string;
  currency: string;
  status: AdminOrder["status"];
  cleanerId: string;
}

function toEditState(order: AdminOrder): EditState {
  return {
    price: order.price ?? "",
    currency: order.currency ?? "",
    status: order.status,
    cleanerId: order.cleanerId ? String(order.cleanerId) : "",
  };
}

const STATUS_OPTIONS: AdminOrder["status"][] = ["pending", "confirmed", "cancelled"];

export default function AdminOrdersPage() {
  const { accessToken } = useStaffAuth();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [cleaners, setCleaners] = useState<AdminUser[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminOrder | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = await listAllOrdersAdmin(accessToken);
    setOrders(data);
  }, [accessToken]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load bookings."),
    );
  }, [load]);

  useEffect(() => {
    if (!accessToken) return;
    listUsers(accessToken)
      .then((users) => setCleaners(users.filter((u) => u.type === "cleaner")))
      .catch(() => undefined);
  }, [accessToken]);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!search) return true;
      const haystack = `${order.referenceNumber} ${order.customer.firstName} ${order.customer.lastName ?? ""} ${order.customer.email}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [orders, statusFilter, search]);

  function openEdit(order: AdminOrder) {
    setEditing(order);
    setEdit(toEditState(order));
  }

  async function handleSave() {
    if (!accessToken || !editing || !edit) return;
    setSaving(true);
    setError(null);
    try {
      const payload: Parameters<typeof updateOrderAdmin>[2] = { status: edit.status };
      if (edit.price !== "") payload.price = Number(edit.price);
      if (edit.currency !== "") payload.currency = edit.currency;
      if (edit.cleanerId !== "") payload.cleanerId = Number(edit.cleanerId);

      const updated = await updateOrderAdmin(accessToken, editing.id, payload);
      setOrders((prev) => prev.map((o) => (o.id === editing.id ? { ...o, ...updated } : o)));
      toast.success(`Booking ${updated.referenceNumber} updated.`);
      setEditing(null);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to save booking.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const columns: ColumnDef<AdminOrder>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const c = row.original.customer;
        return (
          <div>
            <p>{c.firstName} {c.lastName ?? ""}</p>
            <p className="text-xs text-muted-foreground">{c.email}</p>
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
      id: "price",
      header: "Price",
      cell: ({ row }) =>
        row.original.price ? (
          `${row.original.price} ${row.original.currency?.toUpperCase() ?? ""}`
        ) : (
          <span className="text-muted-foreground">Unpriced</span>
        ),
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
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => openEdit(row.original)}
        >
          <Pencil />
          <span className="sr-only">Edit</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {orders.length} bookings
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

      <DataTable columns={columns} data={filtered} emptyMessage="No bookings match your filters." />

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit booking {editing?.referenceNumber}</DialogTitle>
          </DialogHeader>
          {edit && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={edit.price}
                  onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  placeholder="eur"
                  value={edit.currency}
                  onChange={(e) => setEdit({ ...edit, currency: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={edit.status}
                  onValueChange={(value) =>
                    setEdit({ ...edit, status: value as AdminOrder["status"] })
                  }
                >
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
              <div className="flex flex-col gap-1">
                <Label htmlFor="cleanerId">Cleaner</Label>
                <Select
                  value={edit.cleanerId}
                  onValueChange={(value) => setEdit({ ...edit, cleanerId: value })}
                >
                  <SelectTrigger id="cleanerId">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    {cleaners.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.firstName} {c.lastName ?? ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
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
