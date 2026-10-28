"use client";

import type { ReactNode } from "react";
import {
  ClipboardList,
  DoorOpen,
  Info,
  type LucideIcon,
  MapPin,
  Megaphone,
  SlidersHorizontal,
  SprayCan,
  Users,
  Paperclip,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import type {
  ContactChannel,
  QuotationServiceLine,
  QuotationStatus,
  QuotationSupplyLine,
} from "@/lib/quotation-api";
import { SummaryAttachments } from "@/components/booking/summary-attachments";
import type { AttachmentLink } from "@/lib/upload-api";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";
import { CATEGORY_LABEL_KEYS, serviceCategoryLabelKey } from "@/components/booking/common-flows-propertis-and-equipments/common-property-types";
import { frequencyNameKey } from "@/components/booking/common-flows-propertis-and-equipments/service-frequency";

/** Matches the quoteItemsTitle set for child/elder care quotations — see careQuoteItemsTitle in request-quotation/page.tsx. */
const CARE_QUOTE_TITLES = new Set(["Child Details", "Elder Details"]);

/** Matches HIDE_QUOTE_ITEMS_IF_EMPTY_SLUGS' titles in request-quotation/page.tsx — hidden entirely instead of "Not specified" when empty. */
const HIDE_IF_EMPTY_QUOTE_TITLES = new Set([
  "Carpet & Upholstery Details",
  "Pool Details",
  "Job Details",
]);

const CONTACT_CHANNEL_KEYS: Record<ContactChannel, TranslationKey> = {
  whatsapp: "summaryContactWhatsapp",
  phone: "summaryContactPhone",
  email: "summaryContactEmail",
};

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

function LineItemRow({ name, price }: { name: string; price?: string | null }) {
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
  /** Formats an equipment price in the quotation's own currency. */
  money: (n: number) => string;
  /** Room-component services only — `key` is a RoomKey (e.g. "bedrooms"), also its translation key. */
  rooms?: { key: string; count: number }[] | null;
  /** Selected service frequency id (e.g. "weekly"). */
  frequency?: string | null;
  /** The service's Service Category tab id (e.g. "residential", "yatch-cleaning"). */
  serviceCategory?: string | null;
  deepClean?: boolean;
  disinfection?: boolean;
  /** staff view only */
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address: QuotationSummaryAddress;
  /** Laundry / move-in-out transport quotations only — shown as a separate "Delivery Address" card alongside the pickup address above. */
  deliveryAddress?: QuotationSummaryAddress | null;
  /** e.g. a status-change action rendered under the overview card */
  footer?: ReactNode;
  /** Files attached at checkout, with short-lived open links. */
  attachmentLinks?: AttachmentLink[];
  /** Multi-service quotations (global gateway) — replaces the single "Service" field with one row per service. */
  serviceLines?: QuotationServiceLine[] | null;
  supplyLines?: QuotationSupplyLine[] | null;
  preferredContactChannel?: ContactChannel | null;
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
  money,
  rooms,
  frequency,
  serviceCategory,
  deepClean,
  disinfection,
  customerName,
  customerEmail,
  customerPhone,
  address,
  deliveryAddress,
  footer,
  attachmentLinks,
  serviceLines,
  supplyLines,
  preferredContactChannel,
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
    return translate((options.find((o) => o.value === value)?.label ?? value) as TranslationKey);
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
              {preferredContactChannel && (
                <Field
                  label={translate("summaryPreferredContact")}
                  value={translate(CONTACT_CHANNEL_KEYS[preferredContactChannel] ?? preferredContactChannel)}
                />
              )}
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
            {!serviceLines?.length && <Field label={translate("summaryService")} value={serviceLabel} />}
            <Field label={translate("summaryDateTime")} value={date ? `${date}${time ? ` · ${time}` : ""}` : translate("summaryNotSpecified")} />
            {frequency && (
              <Field
                label={translate("bookingDetailFrequency")}
                value={translate(frequencyNameKey(frequency) ?? (frequency as TranslationKey))}
              />
            )}
            {serviceCategory && (
              <Field
                label={translate("propServiceCatagory")}
                value={translate(serviceCategoryLabelKey(serviceCategory) ?? (serviceCategory as TranslationKey))}
              />
            )}
            {!(quoteItemsTitle && !hideQuoteItems) && (
              <>
                {propertyType && (
                  <Field
                    label={translate("summaryPropertyType")}
                    value={translate((CATEGORY_LABEL_KEYS[propertyType] ?? propertyType) as TranslationKey)}
                  />
                )}
                {propertySizeSqm != null && <Field label={translate("summaryPropertySize")} value={`${propertySizeSqm} m²`} />}
              </>
            )}
            {deepClean && <Field label={translate("deepCleanName")} value="+40%" />}
            {disinfection && (
              <Field label={translate("DisinfectionName")} value={translate("HospitalGradeName")} />
            )}
            {durationHours != null && <Field label={translate("summaryDuration")} value={`${Number(durationHours)} ${translate("summaryHours")}`} />}
            {numCleaners != null && <Field label={professionalsLabel} value={numCleaners} />}
          </div>
        </SectionCard>

        {serviceLines?.length ? (
          <SectionCard icon={ClipboardList} label={translate("summaryServicesRequested")}>
            <ul className="flex flex-col gap-2 text-sm">
              {serviceLines.map((line, index) => (
                <li key={`${line.serviceId}-${index}`} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium">{line.label}</span>
                  <span className="text-muted-foreground">
                    {[
                      `${line.numCleaners} ${translate("summaryCleaners")}`,
                      `${line.durationHours} ${translate("summaryHours")}`,
                      line.propertySizeSqm != null &&
                        `${line.propertySizeSqm} m²${line.upholsteryPreset ? ` (${line.upholsteryPreset})` : ""}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>
        ) : null}

        {rooms?.length ? (
          <SectionCard icon={DoorOpen} label={translate("bookingDetailRooms")}>
            <ul className="text-sm">
              {rooms.map((room) => (
                <li key={room.key} className="flex justify-between gap-4">
                  <span>{translate(room.key as TranslationKey)}</span>
                  <span>× {room.count}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        ) : null}

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
                  <LineItemRow
                    key={item.name}
                    name={item.name}
                    price={item.price != null ? `+${money(item.price)}` : null}
                  />
                ))}
              </ul>
            ) : null}
          </SectionCard>
        ) : null}

        {supplyLines?.length ? (
          <SectionCard icon={SprayCan} label={translate("summarySupplies")}>
            <ul className="flex flex-col gap-2 text-sm">
              {supplyLines.map((supply) => (
                <KeyValueRow
                  key={supply.name}
                  label={supply.name}
                  value={[
                    `${supply.quantity} ${supply.unit}`,
                    supply.concentration,
                    supply.msds && translate("summaryMsdsRequired"),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                />
              ))}
            </ul>
          </SectionCard>
        ) : null}

        {attachmentLinks?.length ? (
          <SectionCard icon={Paperclip} label={translate("summaryAttachments")}>
            <SummaryAttachments attachments={attachmentLinks} />
          </SectionCard>
        ) : null}
      </div>
    </div>
  );
}
