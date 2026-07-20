"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupplySource } from "@/components/booking/equipment-section";
import type { BookingDraftItem, BookingDraftPackage } from "@/lib/booking-draft";
import type { BookingFrequency } from "@/lib/booking-api";
import type { SizeQuote } from "@/lib/catalog-api";

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function money(n: number): string {
  return `€${n.toFixed(2)}`;
}

const SUPPLY_SOURCE_LABEL: Record<Exclude<SupplySource, "">, string> = {
  customer: "Provided by you",
  company: "Provided by the company",
};

export interface OrderSummaryCardProps {
  serviceLabel: string;
  frequency: BookingFrequency;
  hourlyRate: string | null;
  quote: SizeQuote | null;
  quoteLoading: boolean;
  date: string;
  time: string;
  propertySizeSqm: number;
  packages: BookingDraftPackage[];
  items: BookingDraftItem[];
  supplySource: SupplySource;
  addOnsTotal: number;
  onBookNow: () => void;
  submitting: boolean;
  bookDisabledReason?: string;
}

export function OrderSummaryCard({
  serviceLabel,
  frequency,
  hourlyRate,
  quote,
  quoteLoading,
  date,
  time,
  propertySizeSqm,
  packages,
  items,
  supplySource,
  addOnsTotal,
  onBookNow,
  submitting,
  bookDisabledReason,
}: OrderSummaryCardProps) {
  const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
  const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
  const estimatedMin = hasPrice ? (quote!.priceMin as number) + addOnsTotal : null;
  const estimatedMax = hasPrice ? (quote!.priceMax as number) + addOnsTotal : null;

  const bookNowDisabled = submitting || !!bookDisabledReason || quoteLoading || !quote?.bookable;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="flex flex-col">
          <SummaryRow label="Service" value={<span className="font-semibold">{serviceLabel}</span>} />
          <SummaryRow label="Frequency" value={<span className="capitalize">{frequency}</span>} />
          <SummaryRow label="Cleaners" value={quote?.cleanerCount ?? "—"} />
          <SummaryRow label="Date" value={date} />
          <SummaryRow label="Time" value={time} />
          <SummaryRow
            label="Duration"
            value={hasDuration ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}` : "—"}
          />
          <SummaryRow label="Price per cleaner" value={hourlyRate ? `${money(Number(hourlyRate))}/h` : "—"} last />
        </div>

        <div className="flex flex-col border-t">
          <SummaryRow label="Property size" value={`${propertySizeSqm} m²`} />
          {packages.map((pkg) => (
            <SummaryRow
              key={pkg.name}
              label={pkg.name}
              value={pkg.price !== null ? `+${money(pkg.price)}` : "Included"}
            />
          ))}
          {items.length > 0 && (
            <>
              <SummaryRow label="Equipment" value="" />
              {items.map((item, i) => (
                <SummaryRow
                  key={item.name}
                  label={item.name}
                  value={supplySource ? SUPPLY_SOURCE_LABEL[supplySource] : "—"}
                  last={i === items.length - 1}
                />
              ))}
            </>
          )}
        </div>

        <div className="flex flex-col border-t">
          {hasPrice ? (
            <SummaryRow
              label="Total price (estimate)"
              value={`${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
              emphasize
              last
            />
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              {quote?.bookable
                ? "Your cleaning professional will confirm exact pricing after reviewing your space."
                : "Online booking isn't available for this property size yet — please contact us directly for a quote."}
            </div>
          )}
        </div>

        <div className="p-4">
          <Button type="button" onClick={onBookNow} disabled={bookNowDisabled} className="w-full">
            {submitting ? "Booking…" : "Confirm booking"}
          </Button>
          {bookDisabledReason && (
            <p className="mt-2 text-center text-xs text-muted-foreground">{bookDisabledReason}</p>
          )}
        </div>
      </CardContent>
    </Card>
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
      className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${last ? "" : "border-b"}`}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className={emphasize ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
