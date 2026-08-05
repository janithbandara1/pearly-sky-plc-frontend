"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SUPPLY_SOURCE_OPTIONS, type SupplySource } from "@/components/booking/equipment-section";
import type { BookingDraftItem, BookingDraftPackage } from "@/lib/booking-draft";
import type { CatalogItem, SizeQuote } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export interface BookingDetailsCardProps {
  serviceLabel: string;
  hourlyRate: string | null;
  quote: SizeQuote | null;
  quoteLoading: boolean;
  date: string;
  time: string;
  propertyType?: string;
  propertySizeSqm: number;
  genderLabel: string;
  languageLabel: string;
  specialRequirements?: string;
  packages: BookingDraftPackage[];
  /** healthguard-sanitization only — the facility types selected above. */
  facilities?: string[];
  items: BookingDraftItem[];
  /**
   * Drives the read-only `items` list's value text: "Provided by you" when the
   * customer supplies their own equipment, blank otherwise. Not used once
   * `equipmentOptions` takes over (the interactive "Request the Company" picker).
   */
  supplySource?: SupplySource;
  /**
   * Present only on the live booking page — renders the interactive
   * "Provided by the Customer" / "Request the Company" picker inline instead of
   * the read-only summary used by checkout/staff/customer views.
   */
  onSupplySourceChange?: (value: SupplySource) => void;
  /**
   * Cleaning solvents & equipment catalog, shown as add/remove toggles instead of
   * the plain `items` list when present — used on the live booking page once
   * "Request the Company" is selected. Omitted (checkout's frozen summary) falls
   * back to the read-only `items` list.
   */
  equipmentOptions?: CatalogItem[];
  selectedEquipmentIds?: Set<number>;
  onToggleEquipment?: (id: number) => void;
  addOnsTotal: number;
  onBookNow: () => void;
  submitting: boolean;
  bookDisabledReason?: string;
}

export function BookingDetailsCard({
  serviceLabel,
  hourlyRate,
  quote,
  quoteLoading,
  date,
  time,
  propertyType,
  propertySizeSqm,
  genderLabel,
  languageLabel,
  specialRequirements,
  packages,
  facilities,
  items,
  supplySource,
  onSupplySourceChange,
  equipmentOptions,
  selectedEquipmentIds,
  onToggleEquipment,
  addOnsTotal,
  onBookNow,
  submitting,
  bookDisabledReason,
}: BookingDetailsCardProps) {
  const { symbol } = useCurrency();
  const money = (n: number) => `${symbol}${n.toFixed(2)}`;

  const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
  const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
  const estimatedMin = hasPrice ? (quote!.priceMin as number) + addOnsTotal : null;
  const estimatedMax = hasPrice ? (quote!.priceMax as number) + addOnsTotal : null;

  const bookNowDisabled = submitting || !!bookDisabledReason || quoteLoading || !quote?.bookable;

  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">Booking Details</h3>
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SummaryRow label="Service" value={<span className="font-semibold">{serviceLabel}</span>} />
          <SummaryRow label="Date" value={date} />
          <SummaryRow label="Time" value={time} />
          {propertyType && <SummaryRow label="Property type" value={propertyType} />}
          <SummaryRow label="Property size" value={`${propertySizeSqm} m²`} />
          <SummaryRow
            label="Duration"
            value={hasDuration ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}` : "—"}
          />
          <SummaryRow label="Cleaners" value={quote?.cleanerCount ?? "—"} />
          <SummaryRow label="Price per cleaner" value={hourlyRate ? `${money(Number(hourlyRate))}/h` : "—"} last />
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label="Preferences" />
          <SummaryRow label="Gender Preference" value={genderLabel} />
          <SummaryRow label="Language Preference" value={languageLabel} />
          <SummaryRow label="Special Requirements" value={specialRequirements || "—"} last />
        </div>

        {packages.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Add-Ons" />
            {packages.map((pkg, i) => (
              <SummaryRow
                key={pkg.name}
                label={pkg.name}
                value={pkg.price !== null ? money(pkg.price) : "Included"}
                last={i === packages.length - 1}
              />
            ))}
          </div>
        )}

        {facilities && facilities.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Facilities" />
            {facilities.map((facility, i) => (
              <SummaryRow key={facility} label={facility} value="" last={i === facilities.length - 1} />
            ))}
          </div>
        )}

        {onSupplySourceChange && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Cleaning Solvents & Equipments" />
            {SUPPLY_SOURCE_OPTIONS.map((opt, index) => (
              <label
                key={opt.value}
                htmlFor={`supply-source-${opt.value}`}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${
                  index === SUPPLY_SOURCE_OPTIONS.length - 1 ? "" : "border-b border-brand-gold/20"
                }`}
              >
                <span className="text-brand-navy-foreground/70">{opt.label}</span>
                <Checkbox
                  id={`supply-source-${opt.value}`}
                  checked={supplySource === opt.value}
                  onCheckedChange={(checked) => onSupplySourceChange(checked ? opt.value : "")}
                  className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
                />
              </label>
            ))}
          </div>
        )}

        {equipmentOptions && equipmentOptions.length > 0 ? (
          <div className="flex flex-col border-t border-brand-gold/20">
            {!onSupplySourceChange && <SectionHeading label="Cleaning Solvents & Equipments" />}
            {equipmentOptions.map((item, i) => {
              const isSelected = selectedEquipmentIds?.has(item.id) ?? false;
              const price = item.price !== null ? Number(item.price) : NaN;
              return (
                <SummaryRow
                  key={item.id}
                  label={item.name}
                  value={
                    <div className="flex items-center gap-2">
                      {!Number.isNaN(price) && (
                        <span className="text-brand-navy-foreground/70">{money(price)}</span>
                      )}
                      <button
                        type="button"
                        onClick={() => onToggleEquipment?.(item.id)}
                        aria-pressed={isSelected}
                        className={`shrink-0 rounded-[6px] border-[1.5px] border-brand-gold px-2.5 py-1 text-xs font-semibold ${
                          isSelected ? "bg-brand-gold text-brand-navy" : "text-brand-gold"
                        }`}
                      >
                        {isSelected ? "Added" : "Add"}
                      </button>
                    </div>
                  }
                  last={i === equipmentOptions.length - 1}
                />
              );
            })}
          </div>
        ) : (
          items.length > 0 && (
            <div className="flex flex-col border-t border-brand-gold/20">
              {!onSupplySourceChange && <SectionHeading label="Cleaning Solvents & Equipments" />}
              {items.map((item, i) => (
                <SummaryRow
                  key={item.name}
                  label={item.name}
                  value={supplySource === "customer" ? "Provided by you" : ""}
                  last={i === items.length - 1}
                />
              ))}
            </div>
          )
        )}

        <div className="flex flex-col border-t border-brand-gold/20">
          {hourlyRate && (
            <SummaryRow label="Due at booking" value={money(Number(hourlyRate))} emphasize />
          )}
          {hasPrice ? (
            <SummaryRow
              label="Total price (estimate)"
              value={`${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
              last
            />
          ) : (
            <div className="px-4 py-3 text-sm text-brand-navy-foreground/70">
              {quote?.bookable
                ? "Your cleaning professional will confirm exact pricing after reviewing your space."
                : "Online booking isn't available for this property size yet — please contact us directly for a quote."}
            </div>
          )}
        </div>

        <div className="p-4">
          <Button
            type="button"
            onClick={onBookNow}
            disabled={bookNowDisabled}
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
          >
            {submitting ? "Booking…" : "Book Now"}
          </Button>
          {bookDisabledReason && (
            <p className="mt-2 text-center text-xs text-brand-navy-foreground/70">{bookDisabledReason}</p>
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
  last = false,
  emphasize = false,
}: {
  label: string;
  value: ReactNode;
  last?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${last ? "" : "border-b border-brand-gold/20"}`}
    >
      <span className="text-brand-navy-foreground/70">{label}</span>
      <span className={emphasize ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
