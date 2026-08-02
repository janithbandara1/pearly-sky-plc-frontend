"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { ApiError } from "@/lib/auth-context";
import { AdminOrder, getOrderAdmin, updateOrderAdmin } from "@/lib/admin-api";
import { AdminUser, listUsers } from "@/lib/admin-users-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const SUPPLY_SOURCE_LABEL: Record<string, string> = {
  customer: "Provided by the Customer",
  company: "Request the Company",
};

function optionLabel(options: { value: string; label: string }[], value: string | null): string {
  if (!value) return "No Preference";
  return options.find((o) => o.value === value)?.label ?? value;
}

const STATUS_VARIANT: Record<AdminOrder["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

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

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!loading && order && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Reference</p>
            <p>{order.referenceNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant={STATUS_VARIANT[order.status]} className="capitalize">
              {order.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p>
              {order.price ? `${order.price} ${order.currency?.toUpperCase() ?? ""}` : "Unpriced"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cleaner</p>
            <p>
              {order.cleaner
                ? `${order.cleaner.firstName} ${order.cleaner.lastName ?? ""}`
                : "Unassigned"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Customer</p>
            <p>
              {order.customer.firstName} {order.customer.lastName ?? ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contact</p>
            <p>{order.customer.contact ?? order.customer.email}</p>
          </div>
          {order.serviceDetails[0] && (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p>{order.serviceDetails[0].service.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date & time</p>
                <p>
                  {order.serviceDetails[0].date} · {order.serviceDetails[0].time}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property size</p>
                <p>{order.serviceDetails[0].propertySizeSqm} m²</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property type</p>
                <p>{order.serviceDetails[0].propertyType ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p>
                  {order.serviceDetails[0].minHours}-{order.serviceDetails[0].maxHours} hours
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cleaners</p>
                <p>
                  {order.serviceDetails[0].cleanerCount +
                    order.serviceDetails[0].extraCleanerCount}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Frequency</p>
                <p className="capitalize">{order.serviceDetails[0].frequency}</p>
              </div>
              {order.serviceDetails[0].note && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p>{order.serviceDetails[0].note}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!loading && order && order.serviceDetails[0] && (
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Add-ons</p>
            {order.serviceDetails[0].addOns?.length ? (
              <ul className="list-inside list-disc">
                {order.serviceDetails[0].addOns.map((addOn) => (
                  <li key={addOn.name}>
                    {addOn.name}
                    {addOn.price !== null ? ` — ${addOn.price}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Cleaning Solvents & Equipments</p>
            <p>
              {order.serviceDetails[0].supplySource
                ? (SUPPLY_SOURCE_LABEL[order.serviceDetails[0].supplySource] ?? order.serviceDetails[0].supplySource)
                : "Not specified"}
            </p>
            {order.serviceDetails[0].equipmentItems?.length ? (
              <ul className="list-inside list-disc">
                {order.serviceDetails[0].equipmentItems.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {order.serviceDetails[0].facilities?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Facilities</p>
              <ul className="list-inside list-disc">
                {order.serviceDetails[0].facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {order.serviceDetails[0].disinfectionLevel ? (
            <div>
              <p className="text-xs text-muted-foreground">Disinfection Level</p>
              <p>
                {order.serviceDetails[0].disinfectionLevel.name}
                {order.serviceDetails[0].disinfectionLevel.price
                  ? ` — +${order.serviceDetails[0].disinfectionLevel.price}`
                  : ""}
              </p>
            </div>
          ) : null}

          {order.serviceDetails[0].steamItems?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Steam Items</p>
              <ul className="list-inside list-disc">
                {order.serviceDetails[0].steamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {order.serviceDetails[0].eventTypes?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Event Types</p>
              <ul className="list-inside list-disc">
                {order.serviceDetails[0].eventTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <p className="text-xs text-muted-foreground">Gender Preference</p>
            <p>{optionLabel(GENDER_OPTIONS, order.serviceDetails[0].genderPreference)}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Language Preference</p>
            <p>{optionLabel(LANGUAGE_OPTIONS, order.serviceDetails[0].languagePreference)}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-muted-foreground">Special Requirements</p>
            <p>{order.serviceDetails[0].specialRequirements || "—"}</p>
          </div>
        </div>
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
