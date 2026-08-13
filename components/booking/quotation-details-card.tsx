"use client";

import type { ReactNode } from "react";
import Link from "next/link";
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
  /** When true, splits each quoteItemLines entry on its first ": " into a label/value row instead of showing the whole line as the label. */
  structuredQuoteItems?: boolean;
  propertyType?: string;
  propertySizeSqm?: number;
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  equipmentItems: { id: number; name: string }[];
  selectedEquipmentIds?: Set<number>;
  onToggleEquipment?: (id: number) => void;
  numCleaners: number;
  /** Label for the numCleaners row. Defaults to "Cleaners". */
  professionalsLabel?: string;
  durationHours: number;
  genderLabel: string;
  languageLabel: string;
  requirements: string;
  ctaLabel: string;
  submitting?: boolean;
  agreedToTerms: boolean;
  onAgreedToTermsChange: (value: boolean) => void;
}

export function QuotationDetailsCard({
  serviceLabel,
  date,
  time,
  quoteItemLines,
  quoteItemsTitle,
  structuredQuoteItems,
  propertyType,
  propertySizeSqm,
  supplySource,
  onSupplySourceChange,
  equipmentItems,
  selectedEquipmentIds,
  onToggleEquipment,
  numCleaners,
  professionalsLabel = "Cleaners",
  durationHours,
  genderLabel,
  languageLabel,
  requirements,
  ctaLabel,
  submitting,
  agreedToTerms,
  onAgreedToTermsChange,
}: QuotationDetailsCardProps) {
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
                quoteItemLines.map((line, i) => {
                  const separatorIndex = structuredQuoteItems ? line.indexOf(": ") : -1;
                  return separatorIndex === -1 ? (
                    <SummaryRow key={i} label={line} value="" />
                  ) : (
                    <SummaryRow
                      key={i}
                      label={line.slice(0, separatorIndex)}
                      value={line.slice(separatorIndex + 2)}
                    />
                  );
                })
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
          <SummaryRow label={professionalsLabel} value={numCleaners} />
          <SummaryRow label="Gender Preference" value={genderLabel} />
          <SummaryRow label="Language Preference" value={languageLabel} />
          <SummaryRow label="Special Requirements" value={requirements || "—"} />
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label="Cleaning Solvents & Equipment" />
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

          {supplySource === "company" &&
            equipmentItems.map((item) => {
              const isSelected = selectedEquipmentIds?.has(item.id) ?? false;
              return (
                <SummaryRow
                  key={item.id}
                  label={item.name}
                  value={
                    <button
                      type="button"
                      onClick={() => onToggleEquipment?.(item.id)}
                      aria-pressed={isSelected}
                      className={`shrink-0 rounded-[6px] border-[1.5px] border-brand-gold px-2.5 py-1 text-xs ${
                        isSelected ? "bg-brand-gold text-brand-navy" : "text-brand-gold"
                      }`}
                    >
                      {isSelected ? "Added" : "Add"}
                    </button>
                  }
                />
              );
            })}
        </div>

        <div className="p-4">
          <label
            htmlFor="quote-agreed-to-terms"
            className="mb-3 flex cursor-pointer items-center gap-2 text-xs text-brand-navy-foreground/70"
          >
            <Checkbox
              id="quote-agreed-to-terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => onAgreedToTermsChange(checked === true)}
              className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms-and-conditions" target="_blank" className="underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" target="_blank" className="underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <Button
            type="submit"
            disabled={submitting || !agreedToTerms}
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
