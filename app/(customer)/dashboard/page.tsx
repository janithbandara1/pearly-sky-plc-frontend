"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError, useAuth } from "@/lib/auth-context";
import { Booking, listMyBookings } from "@/lib/booking-api";

const STATUS_VARIANT: Record<Booking["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

function BookingConfirmationBanner() {
  const searchParams = useSearchParams();
  const justBooked = searchParams.get("booked");
  if (!justBooked) return null;
  return (
    <p className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
      Booking confirmed — reference <strong>{justBooked}</strong>. We&rsquo;ll be in
      touch to confirm your price.
    </p>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

export default function CustomerDashboardPage() {
  const { accessToken } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    setBookings(await listMyBookings(accessToken));
  }, [accessToken]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [loadData]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const recent = bookings.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your bookings.</p>
      </div>

      <Suspense fallback={null}>
        <BookingConfirmationBanner />
      </Suspense>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total bookings" value={String(total)} />
        <StatCard label="Pending" value={String(pending)} />
        <StatCard label="Confirmed" value={String(confirmed)} />
        <StatCard label="Cancelled" value={String(cancelled)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No bookings yet.{" "}
              <Link href="/" className="underline underline-offset-2">
                Browse services
              </Link>
              .
            </p>
          ) : (
            <div className="flex flex-col divide-y">
              {recent.map((booking) => {
                const details = booking.serviceDetails[0];
                return (
                  <Link
                    key={booking.id}
                    href={`/bookings/${booking.id}`}
                    className="-mx-2 flex items-center justify-between rounded px-2 py-3 text-sm hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{details?.service.label ?? "Booking"}</p>
                      <p className="text-muted-foreground">
                        Ref {booking.referenceNumber}
                        {details ? ` · ${details.date}` : ""}
                      </p>
                    </div>
                    <Badge variant={STATUS_VARIANT[booking.status]} className="capitalize">
                      {booking.status}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
