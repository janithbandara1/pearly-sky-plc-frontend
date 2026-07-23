"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  Booking,
  getMyBooking,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { useCurrency } from "@/lib/currency-context";

const STATUS_COPY: Record<string, { title: string; description: string }> = {
  confirmed: {
    title: "Payment successful — booking confirmed",
    description: "Thank you! We've received your payment and confirmed your booking.",
  },
  cancelled: {
    title: "Payment cancelled",
    description:
      "Your booking is saved, but it isn't confirmed until payment is completed.",
  },
  failed: {
    title: "Payment not completed",
    description:
      "The payment didn't go through. Your booking is saved — you can try again below.",
  },
  error: {
    title: "Payment unavailable",
    description:
      "Online payment isn't available right now. Your booking is saved — we'll be in touch shortly.",
  },
  pending: {
    title: "Booking received",
    description:
      "Your booking is saved. We'll confirm your price and payment details shortly.",
  },
};

function BookingStatus({ bookingId }: { bookingId: number }) {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "pending";
  const refFromQuery = searchParams.get("ref");

  const { status: authStatus, accessToken } = useAuth();
  const { formatPrice } = useCurrency();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    getMyBooking(accessToken, bookingId)
      .then(setBooking)
      .catch(() => undefined);
  }, [accessToken, bookingId]);

  const copy = STATUS_COPY[status] ?? STATUS_COPY.pending;
  const reference = booking?.referenceNumber ?? refFromQuery;
  const details = booking?.serviceDetails?.[0];
  const canRetryPayment =
    (status === "cancelled" || status === "failed") &&
    (accessToken !== null || refFromQuery !== null);

  async function handleRetryPayment() {
    setError(null);
    setPaying(true);
    try {
      const { redirectUrl } = accessToken
        ? await initiateCheckout(accessToken, bookingId)
        : await initiateGuestCheckout(bookingId, refFromQuery as string);
      window.location.assign(redirectUrl);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not start the payment.");
      setPaying(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>
          {reference ? (
            <>
              Reference number <strong>{reference}</strong>. {copy.description}
            </>
          ) : (
            copy.description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
        {booking && (
          <div className="flex flex-col divide-y rounded-lg border">
            {details && (
              <>
                <DetailRow label="Service" value={details.service.label} />
                <DetailRow label="Date" value={`${details.date} at ${details.time}`} />
                <DetailRow label="Frequency" value={details.frequency} />
              </>
            )}
            <DetailRow label="Status" value={booking.status} />
            {booking.price && (
              <DetailRow label="Price" value={formatPrice(booking.price)} />
            )}
          </div>
        )}

        {error && <p className="text-destructive">{error}</p>}

        <div className="flex flex-wrap gap-3">
          {canRetryPayment && (
            <Button onClick={handleRetryPayment} disabled={paying}>
              {paying ? "Redirecting…" : "Complete payment"}
            </Button>
          )}
          {authStatus === "authenticated" ? (
            <Button asChild variant={canRetryPayment ? "outline" : "default"}>
              <Link href="/dashboard">Go to my bookings</Link>
            </Button>
          ) : (
            <Button asChild variant={canRetryPayment ? "outline" : "default"}>
              <Link href="/signup">Create an account to track this booking</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5">
      <span>{label}</span>
      <span className="font-medium capitalize text-foreground">{value}</span>
    </div>
  );
}

export default function BookingStatusPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = use(params);

  return (
    <div className="mx-auto w-full max-w-lg flex-1 p-6">
      <Suspense fallback={null}>
        <BookingStatus bookingId={Number(bookingId)} />
      </Suspense>
    </div>
  );
}
