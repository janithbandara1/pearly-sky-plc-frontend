"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft, LucideIcon, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export interface ConfirmationStatusRow {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}

export interface ConfirmationDetailRow {
  label: string;
  value: ReactNode;
}

export interface ConfirmationCardProps {
  backHref?: string;
  headline: string;
  description: string;
  statusRows: ConfirmationStatusRow[];
  detailsTitle: string;
  detailsRows: ConfirmationDetailRow[];
  infoTitle: string;
  infoBody: string;
  primaryAction: { label: string; href: string };
  /** Extra buttons rendered above the primary green action (e.g. "Complete payment", "Download PDF"). */
  secondaryActions?: ReactNode;
}

export function ConfirmationCard({
  backHref = "/",
  headline,
  description,
  statusRows,
  detailsTitle,
  detailsRows,
  infoTitle,
  infoBody,
  primaryAction,
  secondaryActions,
}: ConfirmationCardProps) {
  const { translate } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-3xl border border-brand-gold-dark/30 bg-white shadow-2xl">
      {/* Top header */}
      <div className="relative flex items-center justify-center bg-brand-navy px-6 py-5">
        <Link
          href={backHref}
          className="absolute left-5 flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-gold">{translate("confirmBrandName")}</h1>
          <p className="text-xs font-medium text-white/80">{translate("confirmBrandTagline")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        {/* Headline */}
        <div className="text-center">
          <h2 className="text-lg font-bold text-brand-gold sm:text-xl">{headline}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">{description}</p>
        </div>

        {/* Status card */}
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          {statusRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <row.icon className="size-4 text-brand-gold" />
                {row.label}:
              </span>
              <span className="font-bold text-brand-navy">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Details block */}
        <div className="overflow-hidden rounded-2xl border border-brand-gold-dark/30">
          <div className="bg-brand-gold-dark px-4 py-2.5">
            <h3 className="text-sm font-bold text-white">{detailsTitle}</h3>
          </div>
          <div>
            {detailsRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${
                  i % 2 === 1 ? "bg-slate-100/80" : "bg-white"
                }`}
              >
                <span className="text-slate-600">{row.label}:</span>
                <span className="font-bold text-brand-navy">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-left">
          <p className="text-xs font-bold text-brand-gold-dark">{infoTitle}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-sky-900">{infoBody}</p>
        </div>

        {secondaryActions}

        <Link
          href={primaryAction.href}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold tracking-wider text-white shadow-md transition hover:bg-emerald-800"
        >
          {primaryAction.label.toUpperCase()}
        </Link>

        <p className="text-center text-xs text-slate-500">
          {translate("confirmNeedHelp")}{" "}
          <Link href="/contact-us" className="font-semibold text-brand-gold-dark hover:underline">
            {translate("confirmContactSupport")}
          </Link>{" "}
          <Sparkles className="ml-0.5 inline-block size-3 text-brand-gold-dark" />
        </p>
      </div>
    </div>
  );
}
