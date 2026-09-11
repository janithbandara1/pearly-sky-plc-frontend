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
import { useLanguage } from "@/lib/i18n/language-context";

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
  /** Child/elder care has no property-size concept — hides that summary row (propertySizeSqm is still required, but goes unused). */
  hidePropertySize?: boolean;
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
  onOpenTermsModal?: () => void;
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
  hidePropertySize,
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
  onOpenTermsModal,
}: BookingDetailsCardProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();
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

  const supplyLabels: Record<string, string> = {
    customer: translate("summarySupplySourceCustomer"),
    company: translate("summarySupplySourceCompany"),
  };

  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">{translate("bookingDetailsTitle")}</h3>
        </div>

        <div className="flex flex-col border-t border-brand-gold/20">
          <SummaryRow label={translate("bookingDetailService")} value={serviceLabel} />
          <SummaryRow label={translate("bookingDetailDate")} value={date} />
          <SummaryRow label={translate("bookingDetailTime")} value={time} />
          {propertyType && <SummaryRow label={translate("bookingDetailPropertyType")} value={propertyType} />}
          {!hidePropertySize && (
            <SummaryRow label={translate("bookingDetailPropertySize")} value={`${propertySizeSqm} m²`} />
          )}
          <SummaryRow
            label={translate("bookingDetailDuration")}
            value={
              !hasDuration
                ? "—"
                : quote!.minHours === quote!.maxHours
                  ? formatHM(quote!.minHours as number)
                  : `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}`
            }
          />
          <SummaryRow label={translate("bookingDetailCleaners")} value={quote?.cleanerCount ?? "—"} />
          <SummaryRow label={translate("bookingDetailPricePerCleaner")} value={hourlyRate ? `${money(Number(hourlyRate))}/h` : "—"} />
        </div>

        {facilities && facilities.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailFacilities")} />
            {facilities.map((facility) => (
              <SummaryRow key={facility} label={facility} value="" />
            ))}
          </div>
        )}

        {serviceLevel && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailPackage")} />
            <SummaryRow
              label={serviceLevel.name}
              value={serviceLevel.price !== null ? money(serviceLevel.price) : translate("bookingDetailIncluded")}
            />
          </div>
        )}

        {serviceCategory && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailJobType")} />
            <SummaryRow label={serviceCategory} value="" />
          </div>
        )}

        {generalSteamItems && generalSteamItems.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailGeneralSteam")} />
            {generalSteamItems.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        {industrialSteamItems && industrialSteamItems.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailIndustrialSteam")} />
            {industrialSteamItems.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        {eventTypes && eventTypes.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailEventTypes")} />
            {eventTypes.map((item) => (
              <SummaryRow key={item} label={item} value="" />
            ))}
          </div>
        )}

        <div className="flex flex-col border-t border-brand-gold/20">
          <SectionHeading label={translate("bookingDetailPreferences")} />
          <SummaryRow label={translate("bookingDetailGenderPreference")} value={genderLabel} />
          <SummaryRow label={translate("bookingDetailLanguagePreference")} value={languageLabel} />
          <SummaryRow label={translate("bookingDetailSpecialRequirements")} value={specialRequirements || "—"} />
        </div>

        {packages.length > 0 && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailAddOns")} />
            {packages.map((pkg) => (
              <SummaryRow
                key={pkg.name}
                label={pkg.name}
                value={pkg.price !== null ? `+${money(pkg.price)}` : translate("bookingDetailIncluded")}
              />
            ))}
          </div>
        )}

        {(onSupplySourceChange ||
          (equipmentOptions && equipmentOptions.length > 0) ||
          (supplySource !== "customer" && items.length > 0)) && (
          <div className="flex flex-col border-t border-brand-gold/20">
            <SectionHeading label={translate("bookingDetailEquipment")} />

            {onSupplySourceChange &&
              SUPPLY_SOURCE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`supply-source-${opt.value}`}
                  className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="text-brand-navy-foreground/70">{supplyLabels[opt.value] ?? opt.label}</span>
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
                          {isSelected ? translate("bookingDetailAdded") : translate("bookingDetailAdd")}
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
                  value={`+${money(item.price ?? 0)}`}
                />
              ))
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-brand-gold/20 p-4">
          {hasPrice ? (
            <>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-brand-gold bg-brand-gold/10 px-4 py-3 text-sm">
                <span className="text-brand-gold">{translate("bookingDetailEstimatedPriceRange")}</span>
                <span>
                  {estimatedMin === estimatedMax
                    ? money(estimatedMin as number)
                    : `${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
                </span>
              </div>
              {hourlyRate && (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-brand-gold bg-brand-gold/10 px-4 py-3 text-sm">
                  <span className="text-brand-gold">{translate("bookingDetailAdvancePayment")}</span>
                  <span>{money(Number(hourlyRate))}</span>
                </div>
              )}
            </>
          ) : (
            <>
              {hourlyRate && (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-brand-gold bg-brand-gold/10 px-4 py-3 text-sm">
                  <span className="text-brand-gold">{translate("bookingDetailAdvancePayment")}</span>
                  <span>{money(Number(hourlyRate))}</span>
                </div>
              )}
              <div className="text-sm text-brand-navy-foreground/70">
                {quote?.bookable
                  ? translate("bookingDetailConfirmPricing")
                  : translate("bookingDetailOnlineNotAvailable")}
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          {onAgreedToTermsChange && (
            <label
              htmlFor="agreed-to-terms"
              className="mb-3 flex cursor-pointer items-center gap-2 text-xs text-brand-navy-foreground/70 select-none"
              onClick={(e) => {
                if (onOpenTermsModal && !agreedToTerms) {
                  e.preventDefault();
                  onOpenTermsModal();
                } else if (agreedToTerms) {
                  e.preventDefault();
                  onAgreedToTermsChange(false);
                }
              }}
            >
              <Checkbox
                id="agreed-to-terms"
                checked={agreedToTerms ?? false}
                onCheckedChange={(checked) => {
                  if (onOpenTermsModal && !agreedToTerms) {
                    onOpenTermsModal();
                  } else {
                    onAgreedToTermsChange(checked === true);
                  }
                }}
                className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
              />
              <span>
                {translate("bookingDetailAgreeTo")}{" "}
                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  className="underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {translate("bookingDetailTermsAndConditions")}
                </Link>{" "}
                {translate("bookingDetailAnd")}{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {translate("bookingDetailPrivacyPolicy")}
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
            {submitting ? translate("bookingDetailBookingInProgress") : translate("bookingDetailBookNow")}
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

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
      <span className="min-w-0 truncate text-brand-navy-foreground/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}

