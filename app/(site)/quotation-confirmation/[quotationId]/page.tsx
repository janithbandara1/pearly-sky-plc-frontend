"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { AlertTriangle, CalendarClock, Clock, Download, FileText, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationCard, ConfirmationStatusRow } from "@/components/booking/confirmation-card";
import { useAuth } from "@/lib/auth-context";
import {
  QuotationStatusSummary,
  getQuotationPdfUrl,
  getQuotationStatus,
} from "@/lib/quotation-api";

function formatLocation(streetAddress: string, city: string): string {
  return [streetAddress, city].filter(Boolean).join(", ") || "—";
}

const STATUS_BADGE: Record<QuotationStatusSummary["status"], { label: string; className: string }> = {
  new: { label: "Under Review", className: "bg-slate-200 text-slate-700" },
  contacted: { label: "In Progress", className: "bg-sky-100 text-sky-700" },
  closed: { label: "Closed", className: "bg-emerald-100 text-emerald-700" },
};

function QuotationStatus({ quotationId }: { quotationId: number }) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  const { status: authStatus } = useAuth();

  const [quotation, setQuotation] = useState<QuotationStatusSummary | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!reference) {
      setNotFound(true);
      return;
    }
    getQuotationStatus(quotationId, reference)
      .then(setQuotation)
      .catch(() => setNotFound(true));
  }, [quotationId, reference]);

  if (notFound) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <AlertTriangle className="mb-1 h-10 w-10 text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">Quotation not found</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          We couldn&rsquo;t find a quotation request matching this link.
        </p>
        <Button asChild variant="outline" className="mt-2 w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Clock className="mb-1 h-10 w-10 animate-pulse text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">Loading…</h1>
      </div>
    );
  }

  const statusMeta = STATUS_BADGE[quotation.status];
  const teamPreference = quotation.numCleaners
    ? `${quotation.numCleaners} Specialist${quotation.numCleaners === 1 ? "" : "s"}`
    : "No Preference";

  const statusRows: ConfirmationStatusRow[] = [
    { icon: FileText, label: "Reference Number", value: quotation.referenceNumber },
    {
      icon: Clock,
      label: "Payment Status",
      value: <Badge className="bg-amber-100 text-amber-700">Pending</Badge>,
    },
    {
      icon: UserCheck,
      label: "Quotation Status",
      value: <Badge className={statusMeta.className}>{statusMeta.label}</Badge>,
    },
    { icon: CalendarClock, label: "Estimated Response", value: "Within 24 Hours" },
  ];

  const detailsRows = [
    { label: "Service Requested", value: quotation.service.label },
    { label: "Location", value: formatLocation(quotation.streetAddress, quotation.city) },
    { label: "Team Preference", value: teamPreference },
    { label: "Proposed Date", value: quotation.date ?? "—" },
  ];

  const dashboardHref = authStatus === "authenticated" ? "/quotations" : "/signup";

  const downloadAction = (
    <a
      href={getQuotationPdfUrl(quotationId, quotation.referenceNumber)}
      download
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-gold-dark/50 text-sm font-bold tracking-wider text-brand-navy transition hover:bg-brand-cream/60"
    >
      <Download className="size-4" />
      DOWNLOAD REQUEST DETAILS
    </a>
  );

  return (
    <ConfirmationCard
      headline="We've Received Your Quotation Request!"
      description="Thank you for your interest in our premium services. Our team is reviewing your requirements. A dedicated service specialist will contact you very soon."
      statusRows={statusRows}
      detailsTitle="Request Summary"
      detailsRows={detailsRows}
      infoTitle="Important Contact Information"
      infoBody="A copy of your request has been sent to your registered email. If you have urgent questions, please use our support channels."
      primaryAction={{ label: "View My Requests", href: dashboardHref }}
      secondaryActions={downloadAction}
    />
  );
}

export default function QuotationStatusPage({
  params,
}: {
  params: Promise<{ quotationId: string }>;
}) {
  const { quotationId } = use(params);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[rgb(199,209,217)] p-4 sm:p-6">
      <Suspense fallback={null}>
        <QuotationStatus quotationId={Number(quotationId)} />
      </Suspense>
    </main>
  );
}
