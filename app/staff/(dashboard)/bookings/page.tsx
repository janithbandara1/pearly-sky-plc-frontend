"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
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
import { DataTable } from "@/components/staff/data-table";
import { ApiError } from "@/lib/auth-context";
import {
  AdminBooking,
  CleanerBooking,
  listAllBookingsAdmin,
  listCleanerBookings,
  updateBookingAdmin,
} from "@/lib/admin-api";
import { AdminUser, listUsers } from "@/lib/admin-users-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

type BookingRow = AdminBooking | CleanerBooking;

interface EditState {
  cleanerId: string;
}

function toEditState(booking: AdminBooking): EditState {
  return {
    cleanerId: booking.cleanerId ? String(booking.cleanerId) : "",
  };
}

const STATUS_OPTIONS: AdminBooking["status"][] = ["pending", "confirmed", "cancelled"];

export default function BookingsPage() {
  const { accessToken, staff } = useStaffAuth();
  const isAdmin = staff?.roles.includes("admin") ?? false;
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [cleaners, setCleaners] = useState<AdminUser[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminBooking | null>(null);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = isAdmin ? await listAllBookingsAdmin(accessToken) : await listCleanerBookings(accessToken);
    setBookings(data);
  }, [accessToken, isAdmin]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load bookings."),
    );
  }, [load]);

  useEffect(() => {
    if (!accessToken || !isAdmin) return;
    listUsers(accessToken)
      .then((users) => setCleaners(users.filter((u) => u.type === "cleaner")))
      .catch(() => undefined);
  }, [accessToken, isAdmin]);

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      if (statusFilter !== "all" && booking.status !== statusFilter) return false;
      if (!search) return true;
      const haystack = `${booking.referenceNumber} ${booking.customer.firstName} ${booking.customer.lastName ?? ""} ${booking.customer.email}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [bookings, statusFilter, search]);

  function openEdit(booking: AdminBooking) {
    setEditing(booking);
    setEdit(toEditState(booking));
  }

  async function handleSave() {
    if (!accessToken || !editing || !edit) return;
    setSaving(true);
    setError(null);
    try {
      const payload: Parameters<typeof updateBookingAdmin>[2] = {};
      if (edit.cleanerId !== "") payload.cleanerId = Number(edit.cleanerId);

      const updated = await updateBookingAdmin(accessToken, editing.id, payload);
      setBookings((prev) => prev.map((b) => (b.id === editing.id ? { ...b, ...updated } : b)));
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

  const columns: ColumnDef<BookingRow>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        const c = row.original.customer;
        return `${c.firstName} ${c.lastName ?? ""}`.trim();
      },
    },
    {
      id: "service",
      header: "Service",
      cell: ({ row }) => {
        const details = row.original.serviceDetails[0];
        return details?.service.label ?? <span className="text-muted-foreground">—</span>;
      },
    },
    {
      id: "datetime",
      header: "Date & time",
      cell: ({ row }) => {
        const details = row.original.serviceDetails[0];
        if (!details) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="text-muted-foreground">
            {details.date} · {details.time}
          </span>
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
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button size="icon-sm" variant="ghost" asChild title="View details">
            <Link href={`/staff/bookings/${row.original.id}`}>
              <Eye />
              <span className="sr-only">View details</span>
            </Link>
          </Button>
          {isAdmin && (
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => openEdit(row.original as AdminBooking)}
              title="Edit"
            >
              <Pencil />
              <span className="sr-only">Edit</span>
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {bookings.length} bookings
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

      {isAdmin && (
        <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit booking</DialogTitle>
            </DialogHeader>
            {edit && (
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
      )}
    </div>
  );
}
