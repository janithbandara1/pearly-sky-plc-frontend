"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiError, useAuth } from "@/lib/auth-context";
import { Booking, getMyBooking, initiateCheckout } from "@/lib/booking-api";

const STATUS_VARIANT: Record<Booking["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const bookingId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await getMyBooking(accessToken, bookingId);
    setBooking(data);
  }, [accessToken, bookingId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load booking."))
      .finally(() => setLoading(false));
  }, [loadData]);

  async function handlePayNow() {
    if (!accessToken || !booking) return;
    setError(null);
    setPaying(true);
    try {
      const { redirectUrl } = await initiateCheckout(accessToken, booking.id);
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to start checkout.");
      setPaying(false);
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

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Booking details</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!loading && booking && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Reference</p>
            <p>{booking.referenceNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant={STATUS_VARIANT[booking.status]} className="capitalize">
              {booking.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p>
              {booking.price
                ? `${booking.price} ${booking.currency ?? ""}`
                : "Awaiting a price from our team"}
            </p>
          </div>
          {booking.serviceDetails[0] && (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p>{booking.serviceDetails[0].service.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date & time</p>
                <p>
                  {booking.serviceDetails[0].date} · {booking.serviceDetails[0].time}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property size</p>
                <p>{booking.serviceDetails[0].propertySizeSqm} m²</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p>
                  {booking.serviceDetails[0].minHours}-{booking.serviceDetails[0].maxHours} hours
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cleaners</p>
                <p>
                  {booking.serviceDetails[0].cleanerCount +
                    booking.serviceDetails[0].extraCleanerCount}
                </p>
              </div>
              {booking.serviceDetails[0].note && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p>{booking.serviceDetails[0].note}</p>
                </div>
              )}
            </>
          )}

          {booking.status === "pending" && booking.price && (
            <div className="col-span-2 border-t pt-4">
              <Button disabled={paying} onClick={handlePayNow}>
                <CreditCard />
                {paying
                  ? "Starting checkout…"
                  : `Pay now (${booking.price} ${booking.currency ?? ""})`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
