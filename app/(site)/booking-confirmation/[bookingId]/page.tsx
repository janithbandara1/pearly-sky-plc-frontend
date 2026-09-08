"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  FileText,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationCard, ConfirmationStatusRow } from "@/components/booking/confirmation-card";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  BookingStatusSummary,
  getBookingPdfUrl,
  getBookingStatus,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { useCurrency } from "@/lib/currency-context";

function formatLocation(address: BookingStatusSummary["address"]): string {
  if (!address) return "—";
  return [address.streetAddress, address.city].filter(Boolean).join(", ");
}

function formatDuration(minHours: string | null, maxHours: string | null): string {
  if (!minHours) return "—";
  const min = Number(minHours);
  const max = maxHours ? Number(maxHours) : min;
  return min === max ? `${min} Hours` : `${min}-${max} Hours`;
}

function formatTeamSize(cleanerCount: number | null): string {
  if (!cleanerCount) return "—";
  return `${cleanerCount} Cleaning Specialist${cleanerCount === 1 ? "" : "s"}`;
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
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <AlertTriangle className="mb-1 h-10 w-10 text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">Booking not found</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          We couldn&rsquo;t find a booking matching this link.
        </p>
        <Button asChild variant="outline" className="mt-2 w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Clock className="mb-1 h-10 w-10 animate-pulse text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">Loading…</h1>
      </div>
    );
  }

  const location = formatLocation(booking.address);
  const teamSize = formatTeamSize(booking.cleanerCount);
  const duration = formatDuration(booking.minHours, booking.maxHours);
  const priceLabel = booking.price ? formatPrice(booking.price) : "—";

  const detailsRows = [
    { label: "Service Type", value: booking.service?.label ?? "—" },
    { label: "Location", value: location },
    { label: "Team Size", value: teamSize },
    { label: "Estimated Duration", value: duration },
  ];

  const dashboardHref = authStatus === "authenticated" ? "/bookings" : "/signup";

  const downloadAction = (
    <a
      href={getBookingPdfUrl(bookingId, reference as string)}
      download
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-gold-dark/50 text-sm font-bold tracking-wider text-brand-navy transition hover:bg-brand-cream/60"
    >
      <Download className="size-4" />
      DOWNLOAD PDF
    </a>
  );

  if (booking.status === "confirmed") {
    const statusRows: ConfirmationStatusRow[] = [
      { icon: FileText, label: "Reference Number", value: booking.referenceNumber },
      {
        icon: DollarSign,
        label: "Payment Status",
        value: <Badge className="bg-emerald-100 text-emerald-700">Successful</Badge>,
      },
      {
        icon: CheckCircle2,
        label: "Order Status",
        value: <Badge className="bg-brand-navy text-white">Confirmed</Badge>,
      },
      { icon: Tag, label: "Price", value: priceLabel },
      { icon: CalendarDays, label: "Date", value: booking.date ?? "—" },
    ];

    return (
      <ConfirmationCard
        headline="Thank You for Your Order!"
        description="Your cleaning experience is confirmed. A dedicated specialist team is preparing for your service."
        statusRows={statusRows}
        detailsTitle="Booking Details"
        detailsRows={detailsRows}
        infoTitle="Important Information - Dashboard Email Confirmation"
        infoBody="A detailed booking confirmation has been sent to your registered email."
        primaryAction={{ label: "View My Bookings", href: dashboardHref }}
        secondaryActions={downloadAction}
      />
    );
  }

  if (booking.status === "pending") {
    const statusRows: ConfirmationStatusRow[] = [
      { icon: FileText, label: "Reference Number", value: booking.referenceNumber },
      {
        icon: DollarSign,
        label: "Payment Status",
        value: <Badge className="bg-amber-100 text-amber-700">Pending</Badge>,
      },
      {
        icon: Clock,
        label: "Order Status",
        value: <Badge className="bg-slate-200 text-slate-700">Awaiting Payment</Badge>,
      },
      { icon: Tag, label: "Price", value: priceLabel },
      { icon: CalendarDays, label: "Date", value: booking.date ?? "—" },
    ];

    return (
      <ConfirmationCard
        headline="Booking Received!"
        description="Your booking is saved. Complete the payment below to confirm your cleaning experience."
        statusRows={statusRows}
        detailsTitle="Booking Details"
        detailsRows={detailsRows}
        infoTitle="Important Information - Dashboard Email Confirmation"
        infoBody="A detailed copy of this booking has been sent to your registered email."
        primaryAction={{ label: "View My Bookings", href: dashboardHref }}
        secondaryActions={
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleRetryPayment}
              disabled={paying}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-brand-gold-dark text-sm font-bold tracking-wider text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {paying ? "REDIRECTING…" : "COMPLETE PAYMENT"}
            </button>
            {error && <p className="text-center text-xs text-destructive">{error}</p>}
            {downloadAction}
          </div>
        }
      />
    );
  }

  // cancelled
  const statusRows: ConfirmationStatusRow[] = [
    { icon: FileText, label: "Reference Number", value: booking.referenceNumber },
    {
      icon: AlertTriangle,
      label: "Order Status",
      value: <Badge className="bg-rose-100 text-rose-700">Cancelled</Badge>,
    },
    { icon: Tag, label: "Price", value: priceLabel },
    { icon: CalendarDays, label: "Date", value: booking.date ?? "—" },
  ];

  return (
    <ConfirmationCard
      headline="Booking Cancelled"
      description="This booking has been cancelled. If this wasn't expected, please contact our support team."
      statusRows={statusRows}
      detailsTitle="Booking Details"
      detailsRows={detailsRows}
      infoTitle="Important Information - Dashboard Email Confirmation"
      infoBody="A copy of this cancellation has been sent to your registered email."
      primaryAction={{ label: "View My Bookings", href: dashboardHref }}
    />
  );
}

export default function BookingStatusPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = use(params);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[rgb(199,209,217)] p-4 sm:p-6">
      <Suspense fallback={null}>
        <BookingStatus bookingId={Number(bookingId)} />
      </Suspense>
    </main>
  );
}
