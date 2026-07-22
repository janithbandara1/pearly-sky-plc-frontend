"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { SizeQuote } from "@/lib/catalog-api";
import { useCurrency } from "@/lib/currency-context";

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export interface SelectedServicesSummaryProps {
  value: number;
  quote: SizeQuote | null;
  quoteLoading: boolean;
  addOnsTotal: number;
  onBookNow: () => void;
  submitting: boolean;
  bookDisabledReason?: string;
}

export function SelectedServicesSummary({
  value,
  quote,
  quoteLoading,
  addOnsTotal,
  onBookNow,
  submitting,
  bookDisabledReason,
}: SelectedServicesSummaryProps) {
  const { symbol } = useCurrency();
  const money = (n: number) => `${symbol}${n.toFixed(2)}`;

  const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
  const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
  const cleanerCount = quote?.cleanerCount ?? 1;
  const cleanerMin = hasDuration ? formatHM((quote!.minHours as number) / cleanerCount) : null;
  const cleanerMax = hasDuration ? formatHM((quote!.maxHours as number) / cleanerCount) : null;
  const estimatedMin = hasPrice ? (quote!.priceMin as number) + addOnsTotal : null;
  const estimatedMax = hasPrice ? (quote!.priceMax as number) + addOnsTotal : null;
  const professionalsMax = quote?.extraCleanerCount ? cleanerCount + quote.extraCleanerCount : cleanerCount;

  const bookNowDisabled = submitting || !!bookDisabledReason || quoteLoading || !quote?.bookable;

  return (
    <div className="flex h-full flex-col bg-[#0B1B34]">
      <div className="flex items-center justify-between px-[22px] py-[18px]">
        <span className="text-base font-extrabold tracking-[1.5px] text-[#FFFDF4] uppercase">
          Selected Services
        </span>
        <span className="text-[17px] font-extrabold text-[#A98B4B]">{value} m²</span>
      </div>
      <div className="h-px bg-[#A98B4B]/50" />

      <SummaryRow label="Property Scale" value={`${value} m²`} />
      <SummaryRow
        label="Total Service Duration"
        value={hasDuration ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}` : "—"}
      />
      <SummaryRow
        label="Cleaner Duration (On-Site)"
        value={
          cleanerMin && cleanerMax ? (
            <span className="rounded-[20px] border-[1.5px] border-[#A98B4B] px-3.5 py-1 text-[13px] font-bold whitespace-nowrap text-[#A98B4B]">
              {cleanerMin} – {cleanerMax}
            </span>
          ) : (
            "—"
          )
        }
      />
      <SummaryRow
        label="Allocated Professionals"
        value={quote?.bookable ? (professionalsMax > cleanerCount ? `${cleanerCount}–${professionalsMax}` : `${cleanerCount}`) : "—"}
      />
      {hasPrice && (
        <SummaryRow
          label="Cleaning Duration Price Range"
          value={`${money(quote!.priceMin as number)} – ${money(quote!.priceMax as number)}`}
          emphasizeLabel
          last
        />
      )}

      {!quote?.bookable && !quoteLoading && (
        <div className="px-[22px] py-4 text-[13px] text-[#FFFDF4]/70">
          Online booking isn&rsquo;t available for this property size yet — please contact us directly for a
          quote.
        </div>
      )}

      {hasPrice ? (
        <div className="mx-[18px] mt-2 flex flex-nowrap items-center justify-between gap-2 rounded-[10px] border-[1.5px] border-[#A98B4B]/50 bg-[#A98B4B]/14 px-[18px] py-3.5">
          <span className="text-sm font-extrabold text-[#D4A843]">ESTIMATED PRICE RANGE</span>
          <span className="text-[15px] font-extrabold whitespace-nowrap text-[#FFFDF4] sm:text-lg">
            {money(estimatedMin as number)} – {money(estimatedMax as number)}
          </span>
        </div>
      ) : quote?.bookable ? (
        <div className="mx-[18px] mt-2 rounded-[10px] border-[1.5px] border-[#A98B4B]/50 bg-[#A98B4B]/14 px-[18px] py-3.5 text-[13px] text-[#FFFDF4]/80">
          Your cleaning professional will confirm exact pricing after reviewing your space.
        </div>
      ) : null}

      <div className="mt-auto px-[18px] pt-4 pb-5">
        <Button
          type="button"
          onClick={onBookNow}
          disabled={bookNowDisabled}
          className="h-auto w-full rounded-[10px] bg-[#A98B4B] py-[15px] text-[15px] font-extrabold tracking-[2px] text-[#121E2D] uppercase transition-colors hover:bg-[#8F7440]"
        >
          {submitting ? "Booking…" : "Book Now"}
        </Button>
        {bookDisabledReason && (
          <p className="mt-2 text-center text-xs text-[#A98B4B]">{bookDisabledReason}</p>
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  last = false,
  emphasizeLabel = false,
}: {
  label: string;
  value: ReactNode;
  last?: boolean;
  emphasizeLabel?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-[22px] py-[15px] ${
        last ? "" : "border-b border-[#A98B4B]/18"
      }`}
    >
      <span
        className={`text-xs font-semibold tracking-[0.09em] uppercase ${
          emphasizeLabel ? "text-[#FFFDF4]" : "text-[#A8C0D6]"
        }`}
      >
        {label}
      </span>
      <span className="text-[15px] font-bold whitespace-nowrap text-[#FFFDF4]">{value}</span>
    </div>
  );
}
