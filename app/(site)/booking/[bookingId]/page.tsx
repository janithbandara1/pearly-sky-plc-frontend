"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, XCircle, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  Booking,
  getMyBooking,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { useCurrency } from "@/lib/currency-context";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "neutral";

interface StatusMeta {
  title: string;
  description: string;
  tone: StatusTone;
  icon: LucideIcon;
  badge: string;
}

const STATUS_META: Record<string, StatusMeta> = {
  confirmed: {
    title: "Payment successful",
    description: "Thank you! We've received your payment and confirmed your booking.",
    tone: "success",
    icon: CheckCircle2,
    badge: "Confirmed",
  },
  cancelled: {
    title: "Payment cancelled",
    description: "Your booking is saved, but it isn't confirmed until payment is completed.",
    tone: "warning",
    icon: XCircle,
    badge: "Cancelled",
  },
  failed: {
    title: "Payment not completed",
    description: "The payment didn't go through. Your booking is saved — you can try again below.",
    tone: "danger",
    icon: AlertTriangle,
    badge: "Failed",
  },
  error: {
    title: "Payment unavailable",
    description:
      "Online payment isn't available right now. Your booking is saved — we'll be in touch shortly.",
    tone: "neutral",
    icon: AlertTriangle,
    badge: "Pending",
  },
  pending: {
    title: "Booking received",
    description: "Your booking is saved. We'll confirm your price and payment details shortly.",
    tone: "neutral",
    icon: Clock,
    badge: "Pending",
  },
};

const TONE_STYLES: Record<StatusTone, { icon: string; badge: string }> = {
  success: { icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-800" },
  warning: { icon: "text-amber-600", badge: "bg-amber-100 text-amber-800" },
  danger: { icon: "text-destructive", badge: "bg-destructive/10 text-destructive" },
  neutral: { icon: "text-muted-foreground", badge: "bg-muted text-muted-foreground" },
};

function DetailRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: React.ReactNode;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", capitalize && "capitalize")}>{value}</span>
    </div>
  );
}

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

  const meta = STATUS_META[status] ?? STATUS_META.pending;
  const tone = TONE_STYLES[meta.tone];
  const Icon = meta.icon;
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
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <Icon className={cn("mb-1 h-10 w-10", tone.icon)} />
        <CardTitle className="text-xl">{meta.title}</CardTitle>
        <CardDescription className="max-w-xs">{meta.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {(reference || booking) && (
          <div>
            {reference && <DetailRow label="Reference" value={reference} />}
            <DetailRow label="Status" value={<Badge className={tone.badge}>{meta.badge}</Badge>} />
            {details && (
              <>
                <DetailRow label="Service" value={details.service.label} />
                <DetailRow label="Date & time" value={`${details.date} at ${details.time}`} />
              </>
            )}
            {booking?.price && <DetailRow label="Price" value={formatPrice(booking.price)} />}
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {canRetryPayment && (
          <Button onClick={handleRetryPayment} disabled={paying} className="w-full">
            {paying ? "Redirecting…" : "Complete payment"}
          </Button>
        )}
        {authStatus === "authenticated" ? (
          <Button asChild variant={canRetryPayment ? "outline" : "default"} className="w-full">
            <Link href="/bookings">Go to my bookings</Link>
          </Button>
        ) : (
          <Button asChild variant={canRetryPayment ? "outline" : "default"} className="w-full">
            <Link href="/signup">Create an account</Link>
          </Button>
        )}
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </CardFooter>
    </Card>
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
