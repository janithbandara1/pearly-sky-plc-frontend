"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { AlertTriangle, CalendarClock, Clock, Download, FileText, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationCard, ConfirmationStatusRow } from "@/components/booking/confirmation-card";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import {
  QuotationStatusSummary,
  getQuotationPdfUrl,
  getQuotationStatus,
} from "@/lib/quotation-api";

function formatLocation(streetAddress: string, city: string): string {
  return [streetAddress, city].filter(Boolean).join(", ") || "—";
}

const STATUS_BADGE: Record<QuotationStatusSummary["status"], { labelKey: TranslationKey; className: string }> = {
  new: { labelKey: "quotConfirmStatusUnderReview", className: "bg-slate-200 text-slate-700" },
  contacted: { labelKey: "quotConfirmStatusInProgress", className: "bg-sky-100 text-sky-700" },
  closed: { labelKey: "quotConfirmStatusClosed", className: "bg-emerald-100 text-emerald-700" },
};

function QuotationStatus({ quotationId }: { quotationId: number }) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  const { status: authStatus } = useAuth();
  const { translate } = useLanguage();

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
        <h1 className="text-xl font-bold text-brand-navy">{translate("confirmNotFoundTitle")}</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          {translate("confirmNotFoundDesc")}
        </p>
        <Button asChild variant="outline" className="mt-2 w-full">
          <Link href="/">{translate("confirmBackToHome")}</Link>
        </Button>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Clock className="mb-1 h-10 w-10 animate-pulse text-muted-foreground" />
        <h1 className="text-xl font-bold text-brand-navy">{translate("confirmLoading")}</h1>
      </div>
    );
  }

  const statusMeta = STATUS_BADGE[quotation.status];
  const teamPreference = quotation.numCleaners
    ? `${quotation.numCleaners} ${
        quotation.numCleaners === 1
          ? translate("quotConfirmTeamSpecialist")
          : translate("quotConfirmTeamSpecialists")
      }`
    : translate("quotConfirmTeamNoPreference");

  const statusRows: ConfirmationStatusRow[] = [
    { icon: FileText, label: translate("quotConfirmRefLabel"), value: quotation.referenceNumber },
    {
      icon: Clock,
      label: translate("quotConfirmPaymentLabel"),
      value: <Badge className="bg-amber-100 text-amber-700">{translate("quotConfirmPaymentPending")}</Badge>,
    },
    {
      icon: UserCheck,
      label: translate("quotConfirmStatusLabel"),
      value: <Badge className={statusMeta.className}>{translate(statusMeta.labelKey)}</Badge>,
    },
    { icon: CalendarClock, label: translate("quotConfirmResponseLabel"), value: translate("quotConfirmResponseValue") },
  ];

  const hasDeliveryLocation = Boolean(quotation.deliveryStreetAddress);

  const detailsRows = [
    { label: translate("quotConfirmServiceLabel"), value: quotation.service.label },
    {
      label: translate(hasDeliveryLocation ? "quotConfirmPickupLabel" : "quotConfirmLocationLabel"),
      value: formatLocation(quotation.streetAddress, quotation.city),
    },
    ...(hasDeliveryLocation
      ? [
          {
            label: translate("quotConfirmDeliveryLabel"),
            value: formatLocation(quotation.deliveryStreetAddress ?? "", quotation.deliveryCity ?? ""),
          },
        ]
      : []),
    { label: translate("quotConfirmTeamLabel"), value: teamPreference },
    { label: translate("quotConfirmDateLabel"), value: quotation.date ?? "—" },
  ];

  const dashboardHref = authStatus === "authenticated" ? "/quotations" : "/signup";

  const downloadAction = (
    <a
      href={getQuotationPdfUrl(quotationId, quotation.referenceNumber)}
      download
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-gold-dark/50 text-sm font-bold tracking-wider text-brand-navy transition hover:bg-brand-cream/60"
    >
      <Download className="size-4" />
      {translate("quotConfirmDownload")}
    </a>
  );

  return (
    <ConfirmationCard
      headline={translate("quotConfirmHeadline")}
      description={translate("quotConfirmDescription")}
      statusRows={statusRows}
      detailsTitle={translate("quotConfirmDetailTitle")}
      detailsRows={detailsRows}
      infoTitle={translate("quotConfirmInfoTitle")}
      infoBody={translate("quotConfirmInfoBody")}
      primaryAction={{ label: translate("quotConfirmPrimaryAction"), href: dashboardHref }}
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
