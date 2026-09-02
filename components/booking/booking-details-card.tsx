"use client";

import type { ReactNode } from "react";
import Link from "next/link";
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
  /** healthguard-sanitization only — the disinfection level selected above. */
  serviceLevel?: BookingDraftPackage;
  /** steam-cleaning only — the General Steam items selected above. */
  generalSteamItems?: string[];
  /** steam-cleaning only — the Industrial & Commercial Steam items selected above. */
  industrialSteamItems?: string[];
  /** high-security-property-care / luxury-yacht-cleaning only — the Job type selected above. */
  serviceCategory?: string;
  /** post-event-cleaning only — the event types selected above. */
  eventTypes?: string[];
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
  /**
   * Present only on the checkout page — renders the required "I agree to the
   * Terms and Conditions and Privacy Policy" checkbox and gates the Book Now
   * button on it. Omitted on the live booking page, where Book Now just
   * proceeds to checkout rather than submitting a booking.
   */
  agreedToTerms?: boolean;
  onAgreedToTermsChange?: (value: boolean) => void;
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
  serviceLevel,
  generalSteamItems,
  industrialSteamItems,
  serviceCategory,
  eventTypes,
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
  agreedToTerms,
  onAgreedToTermsChange,
}: BookingDetailsCardProps) {
  const { symbol } = useCurrency();
  const money = (n: number) => `${symbol}${n.toFixed(2)}`;

  const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
  const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
  const estimatedMin = hasPrice ? (quote!.priceMin as number) + addOnsTotal : null;
  const estimatedMax = hasPrice ? (quote!.priceMax as number) + addOnsTotal : null;

  const termsRequired = !!onAgreedToTermsChange;
  const bookNowDisabled =
    submitting ||
    !!bookDisabledReason ||
    quoteLoading ||
    !quote?.bookable ||
    (termsRequired && !agreedToTerms);

  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">Booking Details</h3>
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SummaryRow label="Service" value={serviceLabel} />
          <SummaryRow label="Date" value={date} />
          <SummaryRow label="Time" value={time} />
          {propertyType && <SummaryRow label="Property type" value={propertyType} />}
          <SummaryRow label="Property size" value={`${propertySizeSqm} m²`} />
          <SummaryRow
            label="Duration"
            value={hasDuration ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}` : "—"}
          />
          <SummaryRow label="Cleaners" value={quote?.cleanerCount ?? "—"} />
          <SummaryRow label="Price per cleaner" value={hourlyRate ? `${money(Number(hourlyRate))}/h` : "—"} />
        </div>

        {facilities && facilities.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Facilities" />
            {facilities.map((facility) => (
              <SummaryRow key={facility} label={facility} value="" />
            ))}
          </div>
        )}

        {serviceLevel && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Package" />
            <SummaryRow
              label={serviceLevel.name}
              value={serviceLevel.price !== null ? money(serviceLevel.price) : "Included"}
            />
          </div>
        )}

        {serviceCategory && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Job type" />
            <SummaryRow label={serviceCategory} value="" />
          </div>
        )}

        {generalSteamItems && generalSteamItems.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="General Steam Cleaning Job Types" />
            {generalSteamItems.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        {industrialSteamItems && industrialSteamItems.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Industrial & Commercial Steam Cleaning Job Types" />
            {industrialSteamItems.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        {eventTypes && eventTypes.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Event Types" />
            {eventTypes.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label="Preferences" />
          <SummaryRow label="Gender Preference" value={genderLabel} />
          <SummaryRow label="Language Preference" value={languageLabel} />
          <SummaryRow label="Special Requirements" value={specialRequirements || "—"} />
        </div>

        {packages.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Add-Ons" />
            {packages.map((pkg) => (
              <SummaryRow
                key={pkg.name}
                label={pkg.name}
                value={`+${money(pkg.price ?? 0)}`}
              />
            ))}
          </div>
        )}

        {(onSupplySourceChange || (equipmentOptions && equipmentOptions.length > 0) || items.length > 0) && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label="Cleaning Solvents & Equipment" />

            {onSupplySourceChange &&
              SUPPLY_SOURCE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`supply-source-${opt.value}`}
                  className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm"
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

            {equipmentOptions && equipmentOptions.length > 0 ? (
              equipmentOptions.map((item) => {
                const isSelected = selectedEquipmentIds?.has(item.id) ?? false;
                const price = item.price !== null ? Number(item.price) : 0;
                return (
                  <SummaryRow
                    key={item.id}
                    label={item.name}
                    icon={item.image}
                    value={
                      <div className="flex items-center gap-2">
                        <span className="text-brand-navy-foreground">{`+${money(price)}`}</span>
                        <button
                          type="button"
                          onClick={() => onToggleEquipment?.(item.id)}
                          aria-pressed={isSelected}
                          className={`shrink-0 rounded-[6px] border-[1.5px] border-brand-gold px-2.5 py-1 text-xs ${isSelected ? "bg-brand-gold text-brand-navy" : "text-brand-gold"
                            }`}
                        >
                          {isSelected ? "Added" : "Add"}
                        </button>
                      </div>
                    }
                  />
                );
              })
            ) : supplySource === "customer" ? null : (
              items.map((item) => (
                <SummaryRow
                  key={item.name}
                  label={item.name}
                  icon={item.image}
                  value={`+${money(item.price ?? 0)}`}
                />
              ))
            )}
          </div>
        )}

        <div className="flex flex-col border-t border-brand-gold/20">
          {hourlyRate && <SummaryRow label="Due at booking" value={money(Number(hourlyRate))} />}
          {hasPrice ? (
            <>
              <SummaryRow
                label="Total price (estimate)"
                value={`${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
              />
              {hourlyRate && (
                <SummaryRow
                  label="Remaining balance"
                  value={`${money((estimatedMin as number) - Number(hourlyRate))} – ${money((estimatedMax as number) - Number(hourlyRate))}`}
                />
              )}
            </>
          ) : (
            <div className="px-4 py-3 text-sm text-brand-navy-foreground/70">
              {quote?.bookable
                ? "Your cleaning professional will confirm exact pricing after reviewing your space."
                : "Online booking isn't available for this property size yet — please contact us directly for a quote."}
            </div>
          )}
        </div>

        <div className="p-4">
          {onAgreedToTermsChange && (
            <label
              htmlFor="agreed-to-terms"
              className="mb-3 flex cursor-pointer items-center gap-2 text-xs text-brand-navy-foreground/70"
            >
              <Checkbox
                id="agreed-to-terms"
                checked={agreedToTerms ?? false}
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
          )}
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
      <span>{value}</span>
    </div>
  );
}
