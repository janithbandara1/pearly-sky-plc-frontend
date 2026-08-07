"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingSummaryCard } from "@/components/booking/booking-summary-card";
import { ApiError, useAuth } from "@/lib/auth-context";
import { getMyBooking, initiateCheckout, type Booking } from "@/lib/booking-api";

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

  // `booking.price` is the flat per-country rate charged up front ("due at
  // booking"). The full job cost isn't known until minHours/maxHours × that
  // rate (plus any priced add-ons/equipment) is estimated — the remaining
  // balance is that estimate minus what's already been paid.
  const details = booking?.serviceDetails?.[0];
  const dueAtBooking = booking?.price ? Number(booking.price) : null;
  const minHours = details ? Number(details.minHours) : null;
  const maxHours = details ? Number(details.maxHours) : null;
  const addOnsTotal = details?.addOns?.reduce((sum, a) => sum + (a.price ?? 0), 0) ?? 0;
  const equipmentTotal =
    details?.supplySource === "company"
      ? (details.equipmentItems?.reduce((sum, i) => sum + (i.price ?? 0), 0) ?? 0)
      : 0;
  const extrasTotal = addOnsTotal + equipmentTotal;
  const hasEstimate = dueAtBooking !== null && minHours !== null && maxHours !== null;
  const estimatedMin = hasEstimate ? minHours! * dueAtBooking! + extrasTotal : null;
  const estimatedMax = hasEstimate ? maxHours! * dueAtBooking! + extrasTotal : null;
  const remainingMin = hasEstimate ? (estimatedMin as number) - (dueAtBooking as number) : null;
  const remainingMax = hasEstimate ? (estimatedMax as number) - (dueAtBooking as number) : null;
  const money = (n: number) => `${n.toFixed(2)} ${booking?.currency ?? ""}`.trim();

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

      {!loading && booking && (
        <BookingSummaryCard
          referenceNumber={booking.referenceNumber}
          status={booking.status}
          dueAtBooking={dueAtBooking}
          estimatedMin={hasEstimate ? estimatedMin : null}
          estimatedMax={hasEstimate ? estimatedMax : null}
          remainingMin={hasEstimate ? remainingMin : null}
          remainingMax={hasEstimate ? remainingMax : null}
          money={money}
          details={details}
          customerEmail={booking.customer.email}
          customerPhone={booking.customer.contact ?? undefined}
          address={booking.address}
          footer={
            booking.status === "pending" && booking.price ? (
              <div className="border-t pt-4">
                <Button disabled={paying} onClick={handlePayNow}>
                  <CreditCard />
                  {paying ? "Starting checkout…" : "Pay now"}
                </Button>
              </div>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
