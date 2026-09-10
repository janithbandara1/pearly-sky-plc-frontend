"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  Home,
  Printer,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BookingPdfDocument,
  SvgQrCode,
  buildBookingPdfData,
} from "@/components/booking/booking-pdf-document";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  Booking,
  BookingStatusSummary,
  getBookingStatus,
  getMyBooking,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { useLanguage } from "@/lib/i18n/language-context";

function BookingStatus({ bookingId }: { bookingId: number }) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  const { status: authStatus, accessToken } = useAuth();
  const { translate } = useLanguage();

  const [bookingSummary, setBookingSummary] = useState<BookingStatusSummary | null>(null);
  const [fullBooking, setFullBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!reference) {
      setNotFound(true);
      return;
    }
    getBookingStatus(bookingId, reference)
      .then(setBookingSummary)
      .catch(() => setNotFound(true));

    if (accessToken) {
      getMyBooking(accessToken, bookingId)
        .then(setFullBooking)
        .catch(() => {});
    }
  }, [bookingId, reference, accessToken]);

  function handleDownloadPDF() {
    window.print();
  }

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

  if (!bookingSummary) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Clock className="mb-1 h-10 w-10 animate-pulse text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">{translate("confirmLoading")}</h1>
      </div>
    );
  }

  const pdfData = buildBookingPdfData(bookingSummary, fullBooking);
  const dashboardHref = authStatus === "authenticated" ? "/bookings" : "/signup";
  const isPending = bookingSummary.status === "pending";
  const isPaid = bookingSummary.status === "confirmed";

  // Derived display values
  const serviceLabel = bookingSummary.service?.label || "Cleaning Service";
  const serviceDate = bookingSummary.date || "—";
  const cleanerCount = bookingSummary.cleanerCount ?? 1;
  const specialistLabel =
    cleanerCount === 1
      ? `${cleanerCount} ${translate("bookConfirmCleaningSpecialist")}`
      : `${cleanerCount} ${translate("bookConfirmCleaningSpecialists")}`;
  const minH = bookingSummary.minHours ? Number(bookingSummary.minHours).toFixed(1) : null;
  const maxH = bookingSummary.maxHours ? Number(bookingSummary.maxHours).toFixed(0) : null;
  const durationLabel =
    minH && maxH ? `${minH}-${maxH} ${translate("bookConfirmHours")}` : "—";
  const currency = fullBooking?.currency || bookingSummary.currency || "EUR";
  const currencySymbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  const price = bookingSummary.price
    ? `${currencySymbol}${Number(bookingSummary.price).toFixed(2)}`
    : "—";
  const addressParts = bookingSummary.address
    ? [
        bookingSummary.address.streetAddress,
        bookingSummary.address.city,
        bookingSummary.address.state,
        bookingSummary.address.country,
      ].filter(Boolean)
    : [];
  const addressStr = addressParts.length > 0 ? addressParts.join(", ") : "—";
  const qrValue = `https://pearlysky.com/bookings/verify?ref=${bookingSummary.referenceNumber}`;

  return (
    <div className="flex w-full flex-col items-center">
      {/* ── Top Action Bar (hidden on print) ── */}
      <div className="mb-6 md:hidden hidden w-full max-w-[420px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/80 bg-white/95 px-4 py-3 shadow-md backdrop-blur print:hidden">
        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="gap-1 text-slate-700">
            <Link href="/">
              <Home className="size-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-slate-700">
            <Link href={dashboardHref}>
              <ArrowLeft className="size-4" />
              {authStatus === "authenticated" ? "My Bookings" : "Back"}
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {isPending && (
            <Button
              onClick={handleRetryPayment}
              disabled={paying}
              size="sm"
              className="gap-1.5 bg-[#C69214] text-white hover:bg-[#b08110]"
            >
              <CreditCard className="size-4" />
              {paying ? translate("bookConfirmRedirecting") : "Pay Now"}
            </Button>
          )}
          <Button
            onClick={handleDownloadPDF}
            size="sm"
            variant="outline"
            className="gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 max-w-[420px] rounded-lg bg-rose-50 p-3 text-center text-xs text-rose-700 shadow-sm print:hidden">
          {error}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          SCREEN VIEW — matches uploaded screenshot exactly
          Hidden on print via print:hidden
      ══════════════════════════════════════════════════ */}
      <div className="w-full max-w-[480px] print:hidden">
        <div className="overflow-hidden rounded-3xl border border-brand-gold-dark/20 bg-white shadow-2xl">

          {/* Navy header with back arrow */}
          <div className="relative flex items-center justify-center bg-brand-navy px-6 py-5">
            <Link
              href="/"
              aria-label="Back"
              className="absolute left-5 flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-brand-gold">
                {translate("confirmBrandName")}
              </h1>
              <p className="text-xs font-medium tracking-wide text-white/75">
                {translate("confirmBrandTagline")}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-5 px-5 py-6">

            {/* Headline + description */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-brand-gold">
                {translate("confirmBookingHeadline")}
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500">
                {translate("confirmBookingDesc")}
              </p>
            </div>

            {/* QR Code card */}
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white py-5 shadow-sm">
              <SvgQrCode value={qrValue} size={140} />
              <p className="mt-3 text-sm font-bold text-slate-800">{translate("scanQrTitle")}</p>
              <p className="mt-0.5 max-w-[200px] text-center text-[11px] leading-snug text-slate-500">
               {translate("scanQrDesc")}
              </p>
            </div>

            {/* Status rows with lucide icons */}
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Reference Number */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <FileText className="size-4 shrink-0 text-brand-gold" />
                  {translate("confirmRefLabel")}:
                </span>
                <span className="font-bold text-slate-900">{bookingSummary.referenceNumber}</span>
              </div>
              {/* Payment Status */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <CreditCard className="size-4 shrink-0 text-brand-gold" />
                  {translate("confirmStatusLabel")}:
                </span>
                {isPaid ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">Successful</span>
                ) : isPending ? (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">Pending</span>
                ) : (
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-700">Cancelled</span>
                )}
              </div>
              {/* Order Status */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-gold" />
                  {translate("bookConfirmOrderLabel")}:
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isPaid ? "bg-slate-900 text-white" : isPending ? "bg-amber-500 text-white" : "bg-rose-600 text-white"
                }`}>
                  {bookingSummary.status.charAt(0).toUpperCase() + bookingSummary.status.slice(1)}
                </span>
              </div>
              {/* Price */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <Tag className="size-4 shrink-0 text-brand-gold" />
                  {translate("bookConfirmPriceLabel")}:
                </span>
                <span className="font-bold text-slate-900">{price}</span>
              </div>
              {/* Date */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <Calendar className="size-4 shrink-0 text-brand-gold" />
                  {translate("bookConfirmDateLabel")}:
                </span>
                <span className="font-bold text-slate-900">{serviceDate}</span>
              </div>
            </div>

            {/* Booking Details block */}
            <div className="overflow-hidden rounded-2xl border border-brand-gold-dark/30">
              <div className="bg-brand-gold-dark px-4 py-2.5">
                <h3 className="text-sm font-bold text-white">{translate("checkoutBookingDetails")}</h3>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">

                  <span className="text-slate-500">{translate("bookConfirmServiceType")}</span>
                  <span className="text-right font-bold text-slate-900">{serviceLabel}</span>
                </div>
                <div className="flex items-start justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="shrink-0 text-slate-500">{translate("bookConfirmLocationLabel")}:</span>
                  <span className="text-right font-bold text-slate-900">{addressStr}</span>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="text-slate-500">{translate("bookConfirmTeamSize")}:</span>
                  <span className="font-bold text-slate-900">{specialistLabel}</span>
                </div>

                <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="text-slate-500">{translate("bookConfirmDuration")}:</span>
                  <span className="font-bold text-slate-900">{durationLabel}</span>
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-left">
              <p className="text-xs font-bold text-brand-gold-dark">
                {translate("bookConfirmInfoTitle")}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-sky-900">
                {translate("bookConfirmInfoBodyConfirmed")}  
              </p>
            </div>

            {/* Pay Now — pending only */}
            {isPending && (
              <Button
                onClick={handleRetryPayment}
                disabled={paying}
                className="h-11 w-full gap-2 bg-[#C69214] text-sm font-bold tracking-wider text-white hover:bg-[#b08110]"
              >
                <CreditCard className="size-4" />
                {paying ? translate("bookConfirmRedirecting") : translate("bookConfirmCompletePayment")}
              </Button>
            )}

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-sm font-bold tracking-wider text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="size-4" />
              {translate("bookConfirmDownloadPdf")}
            </button>

            {/* Primary CTA */}
            <Link
              href={dashboardHref}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold tracking-widest text-white shadow-md transition hover:bg-emerald-800"
            >
              {authStatus === "authenticated"
                ? (translate("confirmViewBookings") || "VIEW MY BOOKINGS")
                : (translate("confirmBackToHome") || "BACK TO HOME").toUpperCase()}
            </Link>

            {/* Help link */}
            <p className="text-center text-xs text-slate-500">
              {translate("confirmNeedHelp")}{" "}
              <Link
                href="/contact-us"
                className="font-semibold text-brand-gold-dark hover:underline"
              >
                {translate("confirmContactSupport")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PRINT / PDF VIEW — BookingPdfDocument (full 2-page)
          Hidden on screen, shown only when printing
      ══════════════════════════════════════════════════ */}
      <div className="hidden w-full max-w-[840px] print:block print:shadow-none">
        <BookingPdfDocument data={pdfData} />
      </div>
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
    <main className="flex min-h-screen items-center justify-center bg-[#E5E9EE] p-3 sm:p-6 print:bg-white print:p-0">
      <Suspense fallback={null}>
        <BookingStatus bookingId={Number(bookingId)} />
      </Suspense>
    </main>
  );
}
