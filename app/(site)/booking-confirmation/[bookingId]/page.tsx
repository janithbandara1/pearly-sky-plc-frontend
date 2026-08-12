"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Download, type LucideIcon } from "lucide-react";
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
  BookingStatusSummary,
  getBookingPdfUrl,
  getBookingStatus,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { useCurrency } from "@/lib/currency-context";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "neutral";

interface StatusMeta {
  title: string;
  description: string;
  tone: StatusTone;
  icon: LucideIcon;
  badge: string;
}

const STATUS_META: Record<BookingStatusSummary["status"], StatusMeta> = {
  confirmed: {
    title: "Payment successful",
    description: "Thank you! We've received your payment and confirmed your booking.",
    tone: "success",
    icon: CheckCircle2,
    badge: "Confirmed",
  },
  pending: {
    title: "Booking received",
    description: "Your booking is saved. Complete payment below to confirm it.",
    tone: "neutral",
    icon: Clock,
    badge: "Pending",
  },
  cancelled: {
    title: "Booking cancelled",
    description: "This booking has been cancelled.",
    tone: "warning",
    icon: AlertTriangle,
    badge: "Cancelled",
  },
};

const TONE_STYLES: Record<StatusTone, { icon: string; badge: string }> = {
  success: { icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-800" },
  warning: { icon: "text-amber-600", badge: "bg-amber-100 text-amber-800" },
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
  const reference = searchParams.get("ref");

  const { status: authStatus, accessToken } = useAuth();
  const { formatPrice } = useCurrency();

  const [booking, setBooking] = useState<BookingStatusSummary | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!reference) {
      setNotFound(true);
      return;
    }
    getBookingStatus(bookingId, reference)
      .then(setBooking)
      .catch(() => setNotFound(true));
  }, [bookingId, reference]);

  async function handleRetryPayment() {
    setError(null);
    setPaying(true);
    try {
      const { redirectUrl } = accessToken
        ? await initiateCheckout(accessToken, bookingId)
        : await initiateGuestCheckout(bookingId, reference as string);
      window.location.assign(redirectUrl);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not start the payment.");
      setPaying(false);
    }
  }

  if (notFound) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <AlertTriangle className="mb-1 h-10 w-10 text-muted-foreground" />
          <CardTitle className="text-xl">Booking not found</CardTitle>
          <CardDescription className="max-w-xs">
            We couldn&rsquo;t find a booking matching this link.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!booking) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <Clock className="mb-1 h-10 w-10 text-muted-foreground animate-pulse" />
          <CardTitle className="text-xl">Loading…</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const meta = STATUS_META[booking.status];
  const tone = TONE_STYLES[meta.tone];
  const Icon = meta.icon;
  const canRetryPayment = booking.status === "pending";

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <Icon className={cn("mb-1 h-10 w-10", tone.icon)} />
        <CardTitle className="text-xl">{meta.title}</CardTitle>
        <CardDescription className="max-w-xs">{meta.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div>
          <DetailRow label="Reference" value={booking.referenceNumber} />
          <DetailRow label="Status" value={<Badge className={tone.badge}>{meta.badge}</Badge>} />
          {booking.service && (
            <>
              <DetailRow label="Service" value={booking.service.label} />
              <DetailRow label="Date & time" value={`${booking.date} at ${booking.time}`} />
            </>
          )}
          {booking.price && <DetailRow label="Price" value={formatPrice(booking.price)} />}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {canRetryPayment && (
          <Button onClick={handleRetryPayment} disabled={paying} className="w-full">
            {paying ? "Redirecting…" : "Complete payment"}
          </Button>
        )}
        <Button asChild variant="outline" className="w-full">
          <a href={getBookingPdfUrl(bookingId, booking.referenceNumber)} download>
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </Button>
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
