"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/auth-context";
import {
  AdminOrder,
  listAllOrdersAdmin,
  updateOrderAdmin,
} from "@/lib/admin-api";
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

export default function AdminOrdersPage() {
  const router = useRouter();
  const { status, staff, accessToken, logout } = useStaffAuth();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [edits, setEdits] = useState<Record<number, EditState>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = await listAllOrdersAdmin(accessToken);
    setOrders(data);
    setEdits(Object.fromEntries(data.map((o) => [o.id, toEditState(o)])));
  }, [accessToken]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
    if (status === "authenticated") {
      load().catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load orders."),
      );
    }
  }, [status, router, load]);

  async function handleSave(orderId: number) {
    if (!accessToken) return;
    const edit = edits[orderId];
    setError(null);
    setSavingId(orderId);
    try {
      const payload: Parameters<typeof updateOrderAdmin>[2] = {
        status: edit.status,
      };
      if (edit.price !== "") payload.price = Number(edit.price);
      if (edit.currency !== "") payload.currency = edit.currency;
      if (edit.cleanerId !== "") payload.cleanerId = Number(edit.cleanerId);

      const updated = await updateOrderAdmin(accessToken, orderId, payload);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...updated } : o)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save booking.");
    } finally {
      setSavingId(null);
    }
  }

  if (status !== "authenticated") {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as staff #{staff?.id} ({staff?.roles.join(", ")})
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await logout();
            router.push("/admin/login");
          }}
        >
          Log out
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {orders.length === 0 && (
        <p className="text-sm text-muted-foreground">No bookings yet.</p>
      )}

      {orders.map((order) => {
        const details = order.serviceDetails[0];
        const edit = edits[order.id] ?? toEditState(order);
        return (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{order.referenceNumber}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-normal capitalize">
                  {order.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                {order.customer.firstName} {order.customer.lastName ?? ""} ·{" "}
                {order.customer.email}
              </p>
              {details && (
                <p className="text-sm text-muted-foreground">
                  {details.service.label} · {details.date} at {details.time} ·{" "}
                  {details.propertySizeSqm} m² · {details.minHours}-{details.maxHours} hours
                  · {details.cleanerCount + details.extraCleanerCount} cleaner
                  {details.cleanerCount + details.extraCleanerCount > 1 ? "s" : ""}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 border-t pt-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`price-${order.id}`}>Price</Label>
                  <Input
                    id={`price-${order.id}`}
                    type="number"
                    step="0.01"
                    value={edit.price}
                    onChange={(e) =>
                      setEdits((prev) => ({
                        ...prev,
                        [order.id]: { ...edit, price: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`currency-${order.id}`}>Currency</Label>
                  <Input
                    id={`currency-${order.id}`}
                    placeholder="eur"
                    value={edit.currency}
                    onChange={(e) =>
                      setEdits((prev) => ({
                        ...prev,
                        [order.id]: { ...edit, currency: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`status-${order.id}`}>Status</Label>
                  <select
                    id={`status-${order.id}`}
                    className="h-9 rounded-lg border border-border bg-background px-2 text-sm"
                    value={edit.status}
                    onChange={(e) =>
                      setEdits((prev) => ({
                        ...prev,
                        [order.id]: {
                          ...edit,
                          status: e.target.value as AdminOrder["status"],
                        },
                      }))
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`cleaner-${order.id}`}>Cleaner (staff ID)</Label>
                  <Input
                    id={`cleaner-${order.id}`}
                    type="number"
                    value={edit.cleanerId}
                    onChange={(e) =>
                      setEdits((prev) => ({
                        ...prev,
                        [order.id]: { ...edit, cleanerId: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
              {order.cleaner && (
                <p className="text-xs text-muted-foreground">
                  Currently assigned: {order.cleaner.firstName} {order.cleaner.lastName ?? ""}
                </p>
              )}
              <Button
                size="sm"
                className="w-fit"
                disabled={savingId === order.id}
                onClick={() => handleSave(order.id)}
              >
                {savingId === order.id ? "Saving…" : "Save"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
