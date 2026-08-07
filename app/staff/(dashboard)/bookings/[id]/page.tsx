"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { ApiError } from "@/lib/auth-context";
import { AdminOrder, getOrderAdmin, updateOrderAdmin } from "@/lib/admin-api";
import { AdminUser, listUsers } from "@/lib/admin-users-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

interface EditState {
  cleanerId: string;
}

function toEditState(order: AdminOrder): EditState {
  return {
    cleanerId: order.cleanerId ? String(order.cleanerId) : "",
  };
}

export default function StaffBookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useStaffAuth();

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [cleaners, setCleaners] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await getOrderAdmin(accessToken, orderId);
    setOrder(data);
  }, [accessToken, orderId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load booking."))
      .finally(() => setLoading(false));
  }, [loadData]);

  useEffect(() => {
    if (!accessToken) return;
    listUsers(accessToken)
      .then((users) => setCleaners(users.filter((u) => u.type === "cleaner")))
      .catch(() => undefined);
  }, [accessToken]);

  function openEdit() {
    if (!order) return;
    setEdit(toEditState(order));
    setEditing(true);
  }

  async function handleSave() {
    if (!accessToken || !order || !edit) return;
    setSaving(true);
    try {
      const payload: Parameters<typeof updateOrderAdmin>[2] = {};
      if (edit.cleanerId !== "") payload.cleanerId = Number(edit.cleanerId);

      const updated = await updateOrderAdmin(accessToken, order.id, payload);
      setOrder((prev) => (prev ? { ...prev, ...updated } : updated));
      toast.success(`Booking ${updated.referenceNumber} updated.`);
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save booking.");
    } finally {
      setSaving(false);
    }
  }

  // `order.price` is the flat per-country rate charged up front ("due at
  // booking"). The full job cost isn't known until minHours/maxHours × that
  // rate (plus any priced add-ons/equipment) is estimated — the remaining
  // balance is that estimate minus what's already been paid.
  const details = order?.serviceDetails?.[0];
  const dueAtBooking = order?.price ? Number(order.price) : null;
  const minHours = details ? Number(details.minHours) : null;
  const maxHours = details ? Number(details.maxHours) : null;
  const addOnsTotal = details?.addOns?.reduce((sum, a) => sum + (a.price ?? 0), 0) ?? 0;
  const equipmentTotal = details?.equipmentItems?.reduce((sum, i) => sum + (i.price ?? 0), 0) ?? 0;
  const extrasTotal = addOnsTotal + equipmentTotal;
  const hasEstimate = dueAtBooking !== null && minHours !== null && maxHours !== null;
  const estimatedMin = hasEstimate ? minHours! * dueAtBooking! + extrasTotal : null;
  const estimatedMax = hasEstimate ? maxHours! * dueAtBooking! + extrasTotal : null;
  const remainingMin = hasEstimate ? (estimatedMin as number) - (dueAtBooking as number) : null;
  const remainingMax = hasEstimate ? (estimatedMax as number) - (dueAtBooking as number) : null;
  const money = (n: number) => `${n.toFixed(2)} ${order?.currency?.toUpperCase() ?? ""}`.trim();

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go back"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
      </Button>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Booking details</h1>
        {order && <Button onClick={openEdit}>Edit</Button>}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-start-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      )}

      {!loading && order && (
        <BookingSummaryCard
          referenceNumber={order.referenceNumber}
          status={order.status}
          dueAtBooking={dueAtBooking}
          estimatedMin={hasEstimate ? estimatedMin : null}
          estimatedMax={hasEstimate ? estimatedMax : null}
          remainingMin={hasEstimate ? remainingMin : null}
          remainingMax={hasEstimate ? remainingMax : null}
          money={money}
          details={order.serviceDetails[0]}
          customerName={`${order.customer.firstName} ${order.customer.lastName ?? ""}`.trim()}
          customerEmail={order.customer.email}
          customerPhone={order.customer.contact ?? undefined}
          cleanerName={order.cleaner ? `${order.cleaner.firstName} ${order.cleaner.lastName ?? ""}`.trim() : ""}
          address={order.address}
        />
      )}

      <Dialog open={editing} onOpenChange={setEditing}>
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
            <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
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
