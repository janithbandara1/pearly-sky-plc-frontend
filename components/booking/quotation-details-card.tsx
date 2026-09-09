"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SUPPLY_SOURCE_OPTIONS, type SupplySource } from "@/components/booking/equipment-section";

import { useLanguage } from "@/lib/i18n/language-context";

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
  /** When true, hides the quote items section entirely instead of showing "Not specified" if the customer hasn't filled in any details. */
  hideQuoteItemsIfEmpty?: boolean;
  propertyType?: string;
  propertySizeSqm?: number;
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  equipmentItems: { id: number; name: string; image?: string | null }[];
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
  /** Explains why the submit button is disabled; shown beneath it and used to gate submission. */
  disabledReason?: string;
}

export function QuotationDetailsCard({
  serviceLabel,
  date,
  time,
  quoteItemLines,
  quoteItemsTitle,
  structuredQuoteItems,
  hideQuoteItemsIfEmpty,
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
  disabledReason,
}: QuotationDetailsCardProps) {
  const { translate } = useLanguage();

  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">{translate("quoteDetailsTitle")}</h3>
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SummaryRow label={translate("quoteDetailService")} value={serviceLabel} />
          <SummaryRow label={translate("quoteDetailDate")} value={date || "—"} />
          <SummaryRow label={translate("quoteDetailTime")} value={time || "—"} />
        </div>

        {!(hideQuoteItemsIfEmpty && quoteItemLines?.length === 0) && (
          <div className="flex flex-col">
            {quoteItemLines ? (
              <>
                <SectionHeading label={quoteItemsTitle ?? translate("quoteDetailJobDetails")} />
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
                  <SummaryRow label={translate("quoteDetailNotSpecified")} value="" />
                )}
              </>
            ) : (
              <>
                {propertyType && <SummaryRow label={translate("quoteDetailPropertyType")} value={propertyType} />}
                <SummaryRow label={translate("quoteDetailPropertySize")} value={`${propertySizeSqm} m²`} />
              </>
            )}
          </div>
        )}

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label={translate("quoteDetailPreferences")} />
          <SummaryRow label={translate("quoteDetailDuration")} value={formatHM(durationHours)} />
          <SummaryRow label={professionalsLabel} value={numCleaners} />
          <SummaryRow label={translate("quoteDetailGenderPreference")} value={genderLabel} />
          <SummaryRow label={translate("quoteDetailLanguagePreference")} value={languageLabel} />
          <SummaryRow label={translate("quoteDetailSpecialRequirements")} value={requirements || "—"} />
        </div>

        {equipmentItems.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("quoteDetailEquipment")} />
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
                    icon={item.image}
                    value={
                      <button
                        type="button"
                        onClick={() => onToggleEquipment?.(item.id)}
                        aria-pressed={isSelected}
                        className={`shrink-0 rounded-[6px] border-[1.5px] border-brand-gold px-2.5 py-1 text-xs ${
                          isSelected ? "bg-brand-gold text-brand-navy" : "text-brand-gold"
                        }`}
                      >
                        {isSelected ? translate("quoteDetailAdded") : translate("quoteDetailAdd")}
                      </button>
                    }
                  />
                );
              })}
          </div>
        )}

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
              {translate("quoteFormAgreeTerms")}
            </span>
          </label>
          <Button
            type="submit"
            disabled={submitting || !!disabledReason}
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          >
            {submitting ? translate("quoteDetailSending") : ctaLabel}
          </Button>
          {disabledReason && (
            <p className="mt-2 text-center text-xs text-brand-navy-foreground/70">{disabledReason}</p>
          )}
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

function SummaryRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  /** Optional item image/icon shown before the label (e.g. equipment items). */
  icon?: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
      <span className="flex min-w-0 items-center gap-2 text-brand-navy-foreground/70">
        {icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt="" className="size-5 shrink-0 rounded object-cover" />
        )}
        <span className="truncate">{label}</span>
      </span>
      <span className="text-right">{value}</span>
    </div>
  );
}
