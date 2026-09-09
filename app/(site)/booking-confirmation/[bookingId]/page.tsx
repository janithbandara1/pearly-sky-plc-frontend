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
import { useLanguage } from "@/lib/i18n/language-context";

function formatLocation(address: BookingStatusSummary["address"]): string {
  if (!address) return "—";
  return [address.streetAddress, address.city].filter(Boolean).join(", ");
}

function formatDuration(
  minHours: string | null,
  maxHours: string | null,
  hoursLabel: string
): string {
  if (!minHours) return "—";
  const min = Number(minHours);
  const max = maxHours ? Number(maxHours) : min;
  return min === max ? `${min} ${hoursLabel}` : `${min}-${max} ${hoursLabel}`;
}

function formatTeamSize(
  cleanerCount: number | null,
  singularLabel: string,
  pluralLabel: string
): string {
  if (!cleanerCount) return "—";
  return `${cleanerCount} ${cleanerCount === 1 ? singularLabel : pluralLabel}`;
}

function BookingStatus({ bookingId }: { bookingId: number }) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  const { status: authStatus, accessToken } = useAuth();
  const { formatPrice } = useCurrency();
  const { translate } = useLanguage();

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
      setError(
        err instanceof ApiError ? err.message : translate("bookConfirmPaymentError")
      );
      setPaying(false);
    }
  }

  if (notFound) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <AlertTriangle className="mb-1 h-10 w-10 text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">
          {translate("confirmBookingNotFoundTitle")}
        </h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          {translate("confirmBookingNotFoundDesc")}
        </p>
        <Button asChild variant="outline" className="mt-2 w-full">
          <Link href="/">{translate("confirmBackToHome")}</Link>
        </Button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Clock className="mb-1 h-10 w-10 animate-pulse text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">{translate("confirmLoading")}</h1>
      </div>
    );
  }

  const location = formatLocation(booking.address);
  const teamSize = formatTeamSize(
    booking.cleanerCount,
    translate("bookConfirmCleaningSpecialist"),
    translate("bookConfirmCleaningSpecialists")
  );
  const duration = formatDuration(
    booking.minHours,
    booking.maxHours,
    translate("bookConfirmHours")
  );
  const priceLabel = booking.price ? formatPrice(booking.price) : "—";

  const detailsRows = [
    { label: translate("bookConfirmServiceType"), value: booking.service?.label ?? "—" },
    { label: translate("bookConfirmLocationLabel"), value: location },
    { label: translate("bookConfirmTeamSize"), value: teamSize },
    { label: translate("bookConfirmDuration"), value: duration },
  ];

  const dashboardHref = authStatus === "authenticated" ? "/bookings" : "/signup";

  const downloadAction = (
    <a
      href={getBookingPdfUrl(bookingId, reference as string)}
      download
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-gold-dark/50 text-sm font-bold tracking-wider text-brand-navy transition hover:bg-brand-cream/60"
    >
      <Download className="size-4" />
      {translate("bookConfirmDownloadPdf")}
    </a>
  );

  if (booking.status === "confirmed") {
    const statusRows: ConfirmationStatusRow[] = [
      { icon: FileText, label: translate("bookConfirmRefLabel"), value: booking.referenceNumber },
      {
        icon: DollarSign,
        label: translate("bookConfirmPaymentLabel"),
        value: <Badge className="bg-emerald-100 text-emerald-700">{translate("bookConfirmPaymentSuccessful")}</Badge>,
      },
      {
        icon: CheckCircle2,
        label: translate("bookConfirmOrderLabel"),
        value: <Badge className="bg-brand-navy text-white">{translate("bookConfirmOrderConfirmed")}</Badge>,
      },
      { icon: Tag, label: translate("bookConfirmPriceLabel"), value: priceLabel },
      { icon: CalendarDays, label: translate("bookConfirmDateLabel"), value: booking.date ?? "—" },
    ];

    return (
      <ConfirmationCard
        headline={translate("bookConfirmHeadlineConfirmed")}
        description={translate("bookConfirmDescConfirmed")}
        statusRows={statusRows}
        detailsTitle={translate("bookConfirmDetailTitle")}
        detailsRows={detailsRows}
        infoTitle={translate("bookConfirmInfoTitle")}
        infoBody={translate("bookConfirmInfoBodyConfirmed")}
        primaryAction={{ label: translate("bookConfirmPrimaryAction"), href: dashboardHref }}
        secondaryActions={downloadAction}
      />
    );
  }

  if (booking.status === "pending") {
    const statusRows: ConfirmationStatusRow[] = [
      { icon: FileText, label: translate("bookConfirmRefLabel"), value: booking.referenceNumber },
      {
        icon: DollarSign,
        label: translate("bookConfirmPaymentLabel"),
        value: <Badge className="bg-amber-100 text-amber-700">{translate("bookConfirmPaymentPending")}</Badge>,
      },
      {
        icon: Clock,
        label: translate("bookConfirmOrderLabel"),
        value: <Badge className="bg-slate-200 text-slate-700">{translate("bookConfirmOrderAwaiting")}</Badge>,
      },
      { icon: Tag, label: translate("bookConfirmPriceLabel"), value: priceLabel },
      { icon: CalendarDays, label: translate("bookConfirmDateLabel"), value: booking.date ?? "—" },
    ];

    return (
      <ConfirmationCard
        headline={translate("bookConfirmHeadlinePending")}
        description={translate("bookConfirmDescPending")}
        statusRows={statusRows}
        detailsTitle={translate("bookConfirmDetailTitle")}
        detailsRows={detailsRows}
        infoTitle={translate("bookConfirmInfoTitle")}
        infoBody={translate("bookConfirmInfoBodyPending")}
        primaryAction={{ label: translate("bookConfirmPrimaryAction"), href: dashboardHref }}
        secondaryActions={
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleRetryPayment}
              disabled={paying}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-brand-gold-dark text-sm font-bold tracking-wider text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {paying ? translate("bookConfirmRedirecting") : translate("bookConfirmCompletePayment")}
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
    { icon: FileText, label: translate("bookConfirmRefLabel"), value: booking.referenceNumber },
    {
      icon: AlertTriangle,
      label: translate("bookConfirmOrderLabel"),
      value: <Badge className="bg-rose-100 text-rose-700">{translate("bookConfirmOrderCancelled")}</Badge>,
    },
    { icon: Tag, label: translate("bookConfirmPriceLabel"), value: priceLabel },
    { icon: CalendarDays, label: translate("bookConfirmDateLabel"), value: booking.date ?? "—" },
  ];

  return (
    <ConfirmationCard
      headline={translate("bookConfirmHeadlineCancelled")}
      description={translate("bookConfirmDescCancelled")}
      statusRows={statusRows}
      detailsTitle={translate("bookConfirmDetailTitle")}
      detailsRows={detailsRows}
      infoTitle={translate("bookConfirmInfoTitle")}
      infoBody={translate("bookConfirmInfoBodyCancelled")}
      primaryAction={{ label: translate("bookConfirmPrimaryAction"), href: dashboardHref }}
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
