"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SUPPLY_SOURCE_OPTIONS, type SupplySource } from "@/components/booking/equipment-section";

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export interface QuotationDetailsCardProps {
  serviceLabel: string;
  date: string;
  time: string;
  /** Present for custom-quote services (pool, pressure washing, carpet) instead of property size. */
  quoteItemLines?: string[];
  quoteItemsTitle?: string;
  propertyType?: string;
  propertySizeSqm?: number;
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  equipmentItems: { name: string }[];
  numCleaners: number;
  durationHours: number;
  genderLabel: string;
  languageLabel: string;
  requirements: string;
  ctaLabel: string;
  submitting?: boolean;
}

export function QuotationDetailsCard({
  serviceLabel,
  date,
  time,
  quoteItemLines,
  quoteItemsTitle,
  propertyType,
  propertySizeSqm,
  supplySource,
  onSupplySourceChange,
  equipmentItems,
  numCleaners,
  durationHours,
  genderLabel,
  languageLabel,
  requirements,
  ctaLabel,
  submitting,
}: QuotationDetailsCardProps) {
  const equipmentValueLabel = supplySource === "customer" ? "Provided by you" : "Requested the Company";

  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">Quotation Details</h3>
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SummaryRow label="Service" value={serviceLabel} />
          <SummaryRow label="Date" value={date || "—"} />
          <SummaryRow label="Time" value={time || "—"} />
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          {quoteItemLines ? (
            <>
              <SectionHeading label={quoteItemsTitle ?? "Job Details"} />
              {quoteItemLines.length > 0 ? (
                quoteItemLines.map((line, i) => <SummaryRow key={i} label={line} value="" />)
              ) : (
                <SummaryRow label="Not specified" value="" />
              )}
            </>
          ) : (
            <>
              {propertyType && <SummaryRow label="Property type" value={propertyType} />}
              <SummaryRow label="Property size" value={`${propertySizeSqm} m²`} />
            </>
          )}
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label="Preferences" />
          <SummaryRow label="Duration" value={formatHM(durationHours)} />
          <SummaryRow label="Cleaners" value={numCleaners} />
          <SummaryRow label="Gender Preference" value={genderLabel} />
          <SummaryRow label="Language Preference" value={languageLabel} />
          <SummaryRow label="Special Requirements" value={requirements || "—"} />
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label="Cleaning Solvents & Equipments" />
          {SUPPLY_SOURCE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              htmlFor={`quote-supply-source-${opt.value}`}
              className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm"
            >
              <span className="text-brand-navy-foreground/70">{opt.label}</span>
              <Checkbox
                id={`quote-supply-source-${opt.value}`}
                checked={supplySource === opt.value}
                onCheckedChange={(checked) => onSupplySourceChange(checked ? opt.value : "")}
                className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
              />
            </label>
          ))}

          {supplySource &&
            equipmentItems.map((item) => (
              <SummaryRow key={item.name} label={item.name} value={equipmentValueLabel} />
            ))}
        </div>

        <div className="p-4">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          >
            {submitting ? "Sending…" : ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="px-4 pt-3 pb-1">
      <span className="text-xs font-semibold tracking-wide text-brand-gold/80 uppercase">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
      <span className="text-brand-navy-foreground/70">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
