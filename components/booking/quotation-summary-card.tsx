"use client";

import type { ReactNode } from "react";
import {
  ClipboardList,
  Info,
  type LucideIcon,
  MapPin,
  Megaphone,
  SlidersHorizontal,
  SprayCan,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import type { QuotationStatus } from "@/lib/quotation-api";
import { useLanguage } from "@/lib/i18n/language-context";

/** Matches the quoteItemsTitle set for child/elder care quotations — see careQuoteItemsTitle in request-quotation/page.tsx. */
const CARE_QUOTE_TITLES = new Set(["Child Details", "Elder Details"]);

/** Matches HIDE_QUOTE_ITEMS_IF_EMPTY_SLUGS' titles in request-quotation/page.tsx — hidden entirely instead of "Not specified" when empty. */
const HIDE_IF_EMPTY_QUOTE_TITLES = new Set([
  "Carpet & Upholstery Details",
  "Pool Details",
  "Job Details",
]);

const STATUS_BADGE_VARIANT: Record<QuotationStatus, "default" | "secondary" | "outline"> = {
  contacted: "default",
  new: "secondary",
  closed: "outline",
};

export interface QuotationSummaryAddress {
  streetAddress: string;
  unit?: string | null;
  city: string;
  state?: string | null;
  country: string | null;
  postalCode: string | null;
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function LineItemRow({ name, price }: { name: string; price?: number | null }) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span>{name}</span>
      {price != null && <span className="font-medium">{price}</span>}
    </li>
  );
}

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function SectionCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export interface QuotationSummaryCardProps {
  referenceNumber: string;
  status: QuotationStatus;
  serviceLabel: string;
  date: string | null;
  time: string | null;
  propertyType: string | null;
  propertySizeSqm: number | null;
  quoteItemsTitle: string | null;
  quoteItems: string[] | null;
  numCleaners: number | null;
  durationHours: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  specialRequirements: string | null;
  howGetIn: string | null;
  howHeard: string | null;
  supplySource: string | null;
  equipmentItems: { name: string; price?: number | null }[] | null;
  /** staff view only */
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address: QuotationSummaryAddress;
  /** Laundry / move-in-out transport quotations only — shown as a separate "Delivery Address" card alongside the pickup address above. */
  deliveryAddress?: QuotationSummaryAddress | null;
  /** e.g. a status-change action rendered under the overview card */
  footer?: ReactNode;
}

export function QuotationSummaryCard({
  referenceNumber,
  status,
  serviceLabel,
  date,
  time,
  propertyType,
  propertySizeSqm,
  quoteItemsTitle,
  quoteItems,
  numCleaners,
  durationHours,
  genderPreference,
  languagePreference,
  specialRequirements,
  howGetIn,
  howHeard,
  supplySource,
  equipmentItems,
  customerName,
  customerEmail,
  customerPhone,
  address,
  deliveryAddress,
  footer,
}: QuotationSummaryCardProps) {
  const { translate } = useLanguage();
  const hasContact = customerName !== undefined || customerEmail !== undefined || customerPhone !== undefined;
  const professionalsLabel = quoteItemsTitle && CARE_QUOTE_TITLES.has(quoteItemsTitle)
    ? translate("summaryCaregivers")
    : translate("summaryCleaners");
  const isCareProfileQuote = !!quoteItemsTitle && CARE_QUOTE_TITLES.has(quoteItemsTitle);
  const hideQuoteItems =
    !!quoteItemsTitle && HIDE_IF_EMPTY_QUOTE_TITLES.has(quoteItemsTitle) && !quoteItems?.length;

  const getOptionLabel = (options: { value: string; label: string }[], value: string | null): string => {
    if (!value || value === "no-preference") return translate("summaryNoPreference");
    return options.find((o) => o.value === value)?.label ?? value;
  };

  const getSupplyLabel = (source: string | null) => {
    if (!source) return translate("summaryNotSpecified");
    if (source === "customer") return translate("summarySupplySourceCustomer");
    if (source === "company") return translate("summarySupplySourceCompany");
    return source;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:col-start-3 lg:row-start-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="size-4 text-muted-foreground" />
              {translate("summaryOverview")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Field label={translate("summaryReference")} value={referenceNumber} />
            <Badge variant={STATUS_BADGE_VARIANT[status]} className="capitalize">
              {status}
            </Badge>
          </CardContent>
          {footer && <CardFooter className="flex-col items-stretch bg-transparent border-t-0 pt-0">{footer}</CardFooter>}
        </Card>

        {hasContact && (
          <SectionCard icon={Users} label={translate("summaryContactInfo")}>
            <div className="flex flex-col gap-4">
              {customerName && <Field label={translate("summaryName")} value={customerName} />}
              {customerEmail && <Field label={translate("summaryEmail")} value={customerEmail} />}
              {customerPhone && <Field label={translate("summaryPhone")} value={customerPhone} />}
            </div>
          </SectionCard>
        )}

        <SectionCard icon={MapPin} label={deliveryAddress ? translate("summaryPickupAddress") : translate("summaryAddress")}>
          <div className="flex flex-col gap-3">
            <Field label={translate("summaryStreetAddress")} value={address.streetAddress} />
            {address.unit && <Field label={translate("summaryUnitAptSuite")} value={address.unit} />}
            <Field label={translate("summaryCity")} value={address.city} />
            {address.state && <Field label={translate("summaryProvinceState")} value={address.state} />}
            {address.country && <Field label={translate("summaryCountry")} value={address.country} />}
            {address.postalCode && <Field label={translate("summaryPostalCode")} value={address.postalCode} />}
          </div>
        </SectionCard>

        {deliveryAddress && (
          <SectionCard icon={MapPin} label={translate("summaryDeliveryAddress")}>
            <div className="flex flex-col gap-3">
              <Field label={translate("summaryStreetAddress")} value={deliveryAddress.streetAddress} />
              {deliveryAddress.unit && <Field label={translate("summaryUnitAptSuite")} value={deliveryAddress.unit} />}
              <Field label={translate("summaryCity")} value={deliveryAddress.city} />
              {deliveryAddress.state && <Field label={translate("summaryProvinceState")} value={deliveryAddress.state} />}
              {deliveryAddress.country && <Field label={translate("summaryCountry")} value={deliveryAddress.country} />}
              {deliveryAddress.postalCode && <Field label={translate("summaryPostalCode")} value={deliveryAddress.postalCode} />}
            </div>
          </SectionCard>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
        <SectionCard icon={ClipboardList} label={translate("summaryServiceDetails")}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={translate("summaryService")} value={serviceLabel} />
            <Field label={translate("summaryDateTime")} value={date ? `${date}${time ? ` · ${time}` : ""}` : translate("summaryNotSpecified")} />
            {!(quoteItemsTitle && !hideQuoteItems) && (
              <>
                {propertyType && <Field label={translate("summaryPropertyType")} value={propertyType} />}
                {propertySizeSqm != null && <Field label={translate("summaryPropertySize")} value={`${propertySizeSqm} m²`} />}
              </>
            )}
            {durationHours != null && <Field label={translate("summaryDuration")} value={`${Number(durationHours)} ${translate("summaryHours")}`} />}
            {numCleaners != null && <Field label={professionalsLabel} value={numCleaners} />}
          </div>
        </SectionCard>

        {quoteItemsTitle && !hideQuoteItems && (
          <SectionCard icon={ClipboardList} label={quoteItemsTitle}>
            {quoteItems?.length ? (
              isCareProfileQuote ? (
                <div className="flex flex-col gap-1 text-sm">
                  {quoteItems.map((line) => {
                    const separatorIndex = line.indexOf(": ");
                    return separatorIndex === -1 ? (
                      <p key={line}>{line}</p>
                    ) : (
                      <KeyValueRow
                        key={line}
                        label={line.slice(0, separatorIndex)}
                        value={line.slice(separatorIndex + 2)}
                      />
                    );
                  })}
                </div>
              ) : (
                <ul className="list-inside list-disc text-sm">
                  {quoteItems.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )
            ) : (
              <p className="text-sm">{translate("summaryNotSpecified")}</p>
            )}
          </SectionCard>
        )}

        <SectionCard icon={SlidersHorizontal} label={translate("summaryPreferences")}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={translate("summaryGenderPreference")} value={getOptionLabel(GENDER_OPTIONS, genderPreference)} />
            <Field label={translate("summaryLanguagePreference")} value={getOptionLabel(LANGUAGE_OPTIONS, languagePreference)} />
            <div className="sm:col-span-2">
              <Field label={translate("summarySpecialRequirements")} value={specialRequirements || "—"} />
            </div>
          </div>
        </SectionCard>

        {(howGetIn || howHeard) && (
          <SectionCard icon={Megaphone} label={translate("summaryLogisticsMarketing")}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {howGetIn && <Field label={translate("summaryHowGetIn")} value={howGetIn} />}
              {howHeard && <Field label={translate("summaryHowHeard")} value={howHeard} />}
            </div>
          </SectionCard>
        )}

        {supplySource || equipmentItems?.length ? (
          <SectionCard icon={SprayCan} label={translate("summaryEquipment")}>
            <p className="text-sm">
              {getSupplyLabel(supplySource)}
            </p>
            {supplySource === "company" && equipmentItems?.length ? (
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                {equipmentItems.map((item) => (
                  <LineItemRow key={item.name} name={item.name} />
                ))}
              </ul>
            ) : null}
          </SectionCard>
        ) : null}
      </div>
    </div>
  );
}
