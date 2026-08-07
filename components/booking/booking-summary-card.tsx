"use client";

import type { ReactNode } from "react";
import {
  Building2,
  ClipboardList,
  Info,
  type LucideIcon,
  MapPin,
  PartyPopper,
  PlusCircle,
  ShieldCheck,
  SlidersHorizontal,
  SprayCan,
  Users,
  Wallet,
  Wind,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";

const SUPPLY_SOURCE_LABEL: Record<string, string> = {
  customer: "Provided by the Customer",
  company: "Request the Company",
};

const STATUS_BADGE_VARIANT: Record<
  "pending" | "confirmed" | "cancelled",
  "default" | "secondary" | "destructive"
> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

function optionLabel(options: { value: string; label: string }[], value: string | null): string {
  if (!value) return "No Preference";
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatAddress(address: BookingSummaryAddress): string {
  const line1 = address.unit ? `${address.streetAddress}, ${address.unit}` : address.streetAddress;
  const line2 = [address.city, address.state, address.postalCode].filter(Boolean).join(", ");
  return [line1, line2, address.country].filter(Boolean).join("\n");
}

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
  propertyType: string | null;
  facilities: string[] | null;
  disinfectionLevel: BookingSummaryLineItem | null;
  steamItems: string[] | null;
  eventTypes: string[] | null;
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
}: BookingSummaryCardProps) {
  const hasEstimate = estimatedMin !== null && estimatedMax !== null;
  const hasRemaining = remainingMin !== null && remainingMax !== null;
  const hasContact =
    customerName !== undefined || customerEmail !== undefined || customerPhone !== undefined;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:col-start-3 lg:row-start-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="size-4 text-muted-foreground" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Field label="Reference" value={referenceNumber} />
              <Badge variant={STATUS_BADGE_VARIANT[status]} className="capitalize">
                {status}
              </Badge>
            </div>
            {cleanerName !== undefined && (
              <Field label="Cleaner" value={cleanerName || "Unassigned"} />
            )}
          </CardContent>
        </Card>

        {hasContact && (
          <SectionCard icon={Users} label="Contact Information">
            <div className="flex flex-col gap-4">
              {customerName && <Field label="Customer" value={customerName} />}
              {customerEmail && <Field label="Email" value={customerEmail} />}
              {customerPhone && <Field label="Phone" value={customerPhone} />}
            </div>
          </SectionCard>
        )}

        {address && (
          <SectionCard icon={MapPin} label="Address">
            <p className="text-sm whitespace-pre-line">{formatAddress(address)}</p>
          </SectionCard>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="size-4 text-muted-foreground" />
              Payment Info
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <PaymentRow
              label="Due at booking"
              value={dueAtBooking !== null ? money(dueAtBooking) : "Awaiting a price from our team"}
            />
            {hasEstimate && (
              <PaymentRow
                label="Total price (estimate)"
                value={`${money(estimatedMin as number)} – ${money(estimatedMax as number)}`}
              />
            )}
            {hasRemaining && (
              <PaymentRow
                label="Remaining balance"
                value={`${money(remainingMin as number)} – ${money(remainingMax as number)}`}
              />
            )}
          </CardContent>
          {footer && <CardFooter className="flex-col items-stretch bg-transparent border-t-0 pt-0">{footer}</CardFooter>}
        </Card>
      </div>

      {details && (
        <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <SectionCard icon={ClipboardList} label="Service Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Service" value={details.service.label} />
              <Field label="Date & time" value={`${details.date} · ${details.time}`} />
              {details.propertyType && <Field label="Property type" value={details.propertyType} />}
              <Field label="Property size" value={`${details.propertySizeSqm} m²`} />
              <Field label="Duration" value={`${details.minHours}-${details.maxHours} hours`} />
              <Field label="Cleaners" value={details.cleanerCount + details.extraCleanerCount} />
              {details.note && (
                <div className="col-span-full">
                  <Field label="Note" value={details.note} />
                </div>
              )}
            </div>
          </SectionCard>

          {details.facilities?.length ? (
            <SectionCard icon={Building2} label="Facilities">
              <ul className="list-inside list-disc text-sm">
                {details.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.disinfectionLevel && (
            <SectionCard icon={ShieldCheck} label="Disinfection Level">
              <p className="text-sm">
                {details.disinfectionLevel.name}
                {details.disinfectionLevel.price ? ` — +${details.disinfectionLevel.price}` : ""}
              </p>
            </SectionCard>
          )}

          {details.steamItems?.length ? (
            <SectionCard icon={Wind} label="Steam Items">
              <ul className="list-inside list-disc text-sm">
                {details.steamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {details.eventTypes?.length ? (
            <SectionCard icon={PartyPopper} label="Event Types">
              <ul className="list-inside list-disc text-sm">
                {details.eventTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          <SectionCard icon={SlidersHorizontal} label="Preferences">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Gender Preference"
                value={optionLabel(GENDER_OPTIONS, details.genderPreference)}
              />
              <Field
                label="Language Preference"
                value={optionLabel(LANGUAGE_OPTIONS, details.languagePreference)}
              />
              <div className="sm:col-span-2">
                <Field label="Special Requirements" value={details.specialRequirements || "—"} />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={PlusCircle} label="Add-Ons">
            {details.addOns?.length ? (
              <ul className="flex flex-col gap-2 text-sm">
                {details.addOns.map((addOn) => (
                  <LineItemRow key={addOn.name} name={addOn.name} price={addOn.price} money={money} />
                ))}
              </ul>
            ) : (
              <p className="text-sm">None</p>
            )}
          </SectionCard>

          <SectionCard icon={SprayCan} label="Cleaning Solvents & Equipments">
            <p className="text-sm">
              {details.supplySource
                ? (SUPPLY_SOURCE_LABEL[details.supplySource] ?? details.supplySource)
                : "Not specified"}
            </p>
            {details.equipmentItems?.length ? (
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                {details.equipmentItems.map((item) => (
                  <LineItemRow key={item.name} name={item.name} price={item.price} money={money} />
                ))}
              </ul>
            ) : null}
          </SectionCard>
        </div>
      )}
    </div>
  );
}
