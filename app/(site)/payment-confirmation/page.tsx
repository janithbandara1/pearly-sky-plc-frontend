"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CalendarClock, Clock, Download, FileText, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConfirmationCard, ConfirmationStatusRow } from "@/components/booking/confirmation-card";
import { useAuth } from "@/lib/auth-context";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { status: authStatus } = useAuth();

  const refNumber =
    searchParams.get("ref") ||
    `SER/EN/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/000119`;
  const service = searchParams.get("service") || "Your Requested Service";
  const location = searchParams.get("location") || "—";
  const team = searchParams.get("team") || "No Preference";
  const date = searchParams.get("date") || "—";

  function handleDownloadPDF() {
    window.print();
  }

  const statusRows: ConfirmationStatusRow[] = [
    { icon: FileText, label: "Reference Number", value: refNumber },
    {
      icon: Clock,
      label: "Payment Status",
      value: <Badge className="bg-amber-100 text-amber-700">Pending</Badge>,
    },
    {
      icon: UserCheck,
      label: "Quotation Status",
      value: <Badge className="bg-slate-200 text-slate-700">Under Review</Badge>,
    },
    { icon: CalendarClock, label: "Estimated Response", value: "Within 24 Hours" },
  ];

  const detailsRows = [
    { label: "Service Requested", value: service },
    { label: "Location", value: location },
    { label: "Team Preference", value: team },
    { label: "Proposed Date", value: date },
  ];

  return (
    <ConfirmationCard
      headline="We've Received Your Quotation Request!"
      description="Thank you for your interest in our premium services. Our team is reviewing your requirements. A dedicated service specialist will contact you very soon."
      statusRows={statusRows}
      detailsTitle="Request Summary"
      detailsRows={detailsRows}
      infoTitle="Important Contact Information"
      infoBody="A copy of your request has been sent to your registered email. If you have urgent questions, please use our support channels."
      primaryAction={{ label: "View My Requests", href: authStatus === "authenticated" ? "/quotations" : "/signup" }}
      secondaryActions={
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-gold-dark/50 text-sm font-bold tracking-wider text-brand-navy transition hover:bg-brand-cream/60"
        >
          <Download className="size-4" />
          DOWNLOAD REQUEST DETAILS
        </button>
      }
    />
  );
}

export default function PaymentConfirmationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[rgb(199,209,217)] p-4 sm:p-6">
      <Suspense fallback={<div className="text-sm text-slate-600">Loading confirmation…</div>}>
        <ConfirmationContent />
      </Suspense>
    </main>
  );
}
