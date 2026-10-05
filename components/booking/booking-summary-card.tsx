"use client";

import type { ReactNode } from "react";
import {
  Building2,
  ClipboardList,
  Info,
  type LucideIcon,
  MapPin,
  Megaphone,
  PartyPopper,
  PlusCircle,
  ShieldCheck,
  SlidersHorizontal,
  SprayCan,
  Tag,
  Users,
  Wallet,
  Wind,
  Paperclip,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { GENERAL_STEAM_CARDS } from "@/components/booking/steam/general-steam-section";
import { INDUSTRIAL_STEAM_CATEGORIES } from "@/components/booking/steam/industrial-commercial-steam-section";
import { SummaryAttachments } from "@/components/booking/summary-attachments";
import type { AttachmentLink } from "@/lib/upload-api";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { CATEGORY_LABEL_KEYS } from "@/components/booking/sanitize-like-common-flow/sanitize-property-types";

const GENERAL_STEAM_TITLES = new Set(GENERAL_STEAM_CARDS.map((card) => card.title));
const INDUSTRIAL_STEAM_TITLES = new Set(INDUSTRIAL_STEAM_CATEGORIES.map((category) => category.title));

const STATUS_BADGE_VARIANT: Record<
  "pending" | "confirmed" | "cancelled",
  "default" | "secondary" | "destructive"
> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

export interface BookingSummaryLineItem {
  name: string;
  price?: number | null;
}

export interface BookingSummaryServiceDetails {
  date: string;
  time: string;
  propertySizeSqm: number;
  minHours: string;
  maxHours: string;
  cleanerCount: number;
  extraCleanerCount: number;
  note: string | null;
  addOns: BookingSummaryLineItem[] | null;
  equipmentItems: BookingSummaryLineItem[] | null;
  supplySource: string | null;
  genderPreference: string | null;
  languagePreference: string | null;
  specialRequirements: string | null;
  howGetIn: string | null;
  howHeard: string | null;
  propertyType: string | null;
  facilities: string[] | null;
  disinfectionLevel: BookingSummaryLineItem | null;
  steamItems: string[] | null;
  eventTypes: string[] | null;
  category: string | null;
  /** steam/sanitization/post-construction only — "Deep Clean" (+40%, already in the price). */
  deepClean?: boolean;
  /** steam/sanitization/post-construction only — the Residential / Industrial switch. */
  serviceCategory?: "residential" | "industrial" | null;
  service: { label: string };
}

export interface BookingSummaryAddress {
  streetAddress: string;
  unit: string | null;
  city: string;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface BookingSummaryCardProps {
  referenceNumber: string;
  status: "pending" | "confirmed" | "cancelled";
  dueAtBooking: number | null;
  estimatedMin: number | null;
  estimatedMax: number | null;
  remainingMin: number | null;
  remainingMax: number | null;
  money: (n: number) => string;
  details?: BookingSummaryServiceDetails;
  /** staff view only */
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** staff view only — pass "" for unassigned */
  cleanerName?: string;
  address?: BookingSummaryAddress | null;
  /** e.g. a Pay now / Edit button rendered under the payment summary */
  footer?: ReactNode;
  /** default true — set false to hide pricing from viewers who shouldn't see it (e.g. cleaners) */
  showPaymentInfo?: boolean;
  /** Files attached at checkout, with short-lived open links. */
  attachmentLinks?: AttachmentLink[];
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function LineItemRow({
  name,
  price,
  money,
}: {
  name: string;
  price?: number | null;
  money: (n: number) => string;
}) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span>{name}</span>
      {price != null && <span className="font-medium">{money(price)}</span>}
    </li>
  );
}

function PaymentRow({ label, value, emphasize = false }: { label: string; value: ReactNode; emphasize?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className={`shrink-0 ${emphasize ? "text-sm font-medium" : "text-sm text-muted-foreground"}`}>{label}</p>
      <p className={`text-right ${emphasize ? "text-base font-semibold" : "text-sm font-medium"}`}>{value}</p>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
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

export function BookingSummaryCard({
  referenceNumber,
  status,
  dueAtBooking,
  estimatedMin,
  estimatedMax,
  remainingMin,
  remainingMax,
  money,
  details,
  customerName,
  customerEmail,
  customerPhone,
  cleanerName,
  address,
  footer,
  showPaymentInfo = true,
  attachmentLinks,
}: BookingSummaryCardProps) {
  const { translate } = useLanguage();
  const hasEstimate = estimatedMin !== null && estimatedMax !== null;
  const hasRemaining = remainingMin !== null && remainingMax !== null;
  const hasContact =
    customerName !== undefined || customerEmail !== undefined || customerPhone !== undefined;
  const generalSteamItems = details?.steamItems?.filter((item) => GENERAL_STEAM_TITLES.has(item)) ?? [];
  const industrialSteamItems =
    details?.steamItems?.filter((item) => INDUSTRIAL_STEAM_TITLES.has(item)) ?? [];

  const supplyLabels: Record<string, string> = {
    customer: translate("summarySupplySourceCustomer"),
    company: translate("summarySupplySourceCompany"),
  };

  function getOptionLabel(options: { value: string; label: string }[], value: string | null): string {
    if (!value) return translate("summaryNoPreference");
    return options.find((o) => o.value === value)?.label ?? value;
  }

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
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Field label={translate("summaryReference")} value={referenceNumber} />
              <Badge variant={STATUS_BADGE_VARIANT[status]} className="capitalize">
                {status}
              </Badge>
            </div>
            {cleanerName !== undefined && (
              <Field label={translate("summaryCleaner")} value={cleanerName || translate("summaryUnassigned")} />
            )}
          </CardContent>
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

        {address && (
          <SectionCard icon={MapPin} label={translate("summaryAddress")}>
            <div className="flex flex-col gap-3">
              <Field label={translate("summaryStreetAddress")} value={address.streetAddress} />
              {address.unit && <Field label={translate("summaryUnitAptSuite")} value={address.unit} />}
              <Field label={translate("summaryCity")} value={address.city} />
              {address.state && <Field label={translate("summaryProvinceState")} value={address.state} />}
              {address.country && <Field label={translate("summaryCountry")} value={address.country} />}
              {address.postalCode && <Field label={translate("summaryPostalCode")} value={address.postalCode} />}
            </div>
          </SectionCard>
        )}

        {showPaymentInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="size-4 text-muted-foreground" />
                {translate("summaryPaymentInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <PaymentRow
                label={translate("summaryDueAtBooking")}
                value={dueAtBooking !== null ? money(dueAtBooking) : translate("summaryAwaitingPrice")}
              />
              {hasEstimate && (
                <PaymentRow
                  label={translate("summaryTotalPriceEstimate")}
                  value={`${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
                />
              )}
              {hasRemaining && (
                <PaymentRow
                  label={translate("summaryRemainingBalance")}
                  value={`${money(remainingMin as number)} – ${money(remainingMax as number)}`}
                />
              )}
            </CardContent>
            {footer && <CardFooter className="flex-col items-stretch bg-transparent border-t-0 pt-0">{footer}</CardFooter>}
          </Card>
        )}
      </div>

      {details && (
        <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <SectionCard icon={ClipboardList} label={translate("summaryServiceDetails")}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={translate("summaryService")} value={details.service.label} />
              <Field label={translate("summaryDateTime")} value={`${details.date} · ${details.time}`} />
              {details.serviceCategory && (
                <Field
                  label={translate("propServiceCatagory")}
                  value={translate(details.serviceCategory === "industrial" ? "propCatIndustrial" : "propCatResidential")}
                />
              )}
              {details.propertyType && (
                <Field
                  label={translate("summaryPropertyType")}
                  value={translate((CATEGORY_LABEL_KEYS[details.propertyType] ?? details.propertyType) as TranslationKey)}
                />
              )}
              <Field label={translate("summaryPropertySize")} value={`${details.propertySizeSqm} m²`} />
              {details.deepClean && <Field label={translate("deepCleanName")} value="+40%" />}
              <Field label={translate("summaryDuration")} value={`${details.minHours}-${details.maxHours} ${translate("summaryHours")}`} />
              <Field label={translate("summaryCleaners")} value={details.cleanerCount + details.extraCleanerCount} />
              {showPaymentInfo && (
                <Field
                  label={translate("summaryPricePerCleaner")}
                  value={dueAtBooking !== null ? `${money(dueAtBooking)}/h` : "—"}
                />
              )}
              {details.note && (
                <div className="col-span-full">
                  <Field label={translate("summaryNote")} value={details.note} />
                </div>
              )}
            </div>
          </SectionCard>

          {details.facilities?.length ? (
            <SectionCard icon={Building2} label={translate("summaryFacilities")}>
              <ul className="list-inside list-disc text-sm">
                {details.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.disinfectionLevel && (
            <SectionCard icon={ShieldCheck} label={translate("summaryDisinfectionLevel")}>
              <ul className="text-sm">
                <LineItemRow
                  name={details.disinfectionLevel.name}
                  price={details.disinfectionLevel.price}
                  money={money}
                />
              </ul>
            </SectionCard>
          )}

          {generalSteamItems.length ? (
            <SectionCard icon={Wind} label={translate("summaryGeneralSteam")}>
              <ul className="list-inside list-disc text-sm">
                {generalSteamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {industrialSteamItems.length ? (
            <SectionCard icon={Wind} label={translate("summaryIndustrialSteam")}>
              <ul className="list-inside list-disc text-sm">
                {industrialSteamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.eventTypes?.length ? (
            <SectionCard icon={PartyPopper} label={translate("summaryEventTypes")}>
              <ul className="list-inside list-disc text-sm">
                {details.eventTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.category && (
            <SectionCard icon={Tag} label={translate("summaryJobType")}>
              <p className="text-sm">{details.category}</p>
            </SectionCard>
          )}

          <SectionCard icon={SlidersHorizontal} label={translate("summaryPreferences")}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label={translate("summaryGenderPreference")}
                value={getOptionLabel(GENDER_OPTIONS, details.genderPreference)}
              />
              <Field
                label={translate("summaryLanguagePreference")}
                value={getOptionLabel(LANGUAGE_OPTIONS, details.languagePreference)}
              />
              <div className="sm:col-span-2">
                <Field label={translate("summarySpecialRequirements")} value={details.specialRequirements || "—"} />
              </div>
            </div>
          </SectionCard>

          {(details.howGetIn || details.howHeard) && (
            <SectionCard icon={Megaphone} label={translate("summaryLogisticsMarketing")}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.howGetIn && <Field label={translate("summaryHowGetIn")} value={details.howGetIn} />}
                {details.howHeard && <Field label={translate("summaryHowHeard")} value={details.howHeard} />}
              </div>
            </SectionCard>
          )}

          {details.addOns?.length ? (
            <SectionCard icon={PlusCircle} label={translate("summaryAddOns")}>
              <ul className="flex flex-col gap-2 text-sm">
                {details.addOns.map((addOn) => (
                  <LineItemRow key={addOn.name} name={addOn.name} price={addOn.price} money={money} />
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.supplySource || details.equipmentItems?.length ? (
            <SectionCard icon={SprayCan} label={translate("summaryEquipment")}>
              <p className="text-sm">
                {details.supplySource
                  ? (supplyLabels[details.supplySource] ?? details.supplySource)
                  : translate("summaryNotSpecified")}
              </p>
              {details.supplySource === "company" && details.equipmentItems?.length ? (
                <ul className="mt-2 flex flex-col gap-2 text-sm">
                  {details.equipmentItems.map((item) => (
                    <LineItemRow
                      key={item.name}
                      name={item.name}
                      price={showPaymentInfo ? item.price : undefined}
                      money={money}
                    />
                  ))}
                </ul>
              ) : null}
            </SectionCard>
          ) : null}

          {attachmentLinks?.length ? (
            <SectionCard icon={Paperclip} label={translate("summaryAttachments")}>
              <SummaryAttachments attachments={attachmentLinks} />
            </SectionCard>
          ) : null}
        </div>
      )}
    </div>
  );
}

