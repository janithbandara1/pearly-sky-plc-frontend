"use client";

import type { ReactNode } from "react";
import {
  ClipboardList,
  Info,
  type LucideIcon,
  MapPin,
  SlidersHorizontal,
  SprayCan,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import type { QuotationStatus } from "@/lib/quotation-api";

const SUPPLY_SOURCE_LABEL: Record<string, string> = {
  customer: "Provided by the Customer",
  company: "Request the Company",
};

const STATUS_BADGE_VARIANT: Record<QuotationStatus, "default" | "secondary" | "outline"> = {
  contacted: "default",
  new: "secondary",
  closed: "outline",
};

function optionLabel(options: { value: string; label: string }[], value: string | null): string {
  if (!value) return "No Preference";
  return options.find((o) => o.value === value)?.label ?? value;
}

export interface QuotationSummaryAddress {
  streetAddress: string;
  city: string;
  country: string | null;
  postalCode: string | null;
}

function formatAddress(address: QuotationSummaryAddress): string {
  const line2 = [address.city, address.postalCode].filter(Boolean).join(", ");
  return [address.streetAddress, line2, address.country].filter(Boolean).join("\n");
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
  supplySource: string | null;
  equipmentItems: { name: string; price?: number | null }[] | null;
  /** staff view only */
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address: QuotationSummaryAddress;
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
  supplySource,
  equipmentItems,
  customerName,
  customerEmail,
  customerPhone,
  address,
  footer,
}: QuotationSummaryCardProps) {
  const hasContact = customerName !== undefined || customerEmail !== undefined || customerPhone !== undefined;

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
          <CardContent className="flex items-center justify-between gap-4">
            <Field label="Reference" value={referenceNumber} />
            <Badge variant={STATUS_BADGE_VARIANT[status]} className="capitalize">
              {status}
            </Badge>
          </CardContent>
          {footer && <CardFooter className="flex-col items-stretch bg-transparent border-t-0 pt-0">{footer}</CardFooter>}
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

        <SectionCard icon={MapPin} label="Address">
          <p className="text-sm whitespace-pre-line">{formatAddress(address)}</p>
        </SectionCard>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
        <SectionCard icon={ClipboardList} label="Service Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Service" value={serviceLabel} />
            <Field label="Date & time" value={date ? `${date}${time ? ` · ${time}` : ""}` : "Not specified"} />
            {quoteItemsTitle ? (
              <div className="col-span-full">
                <Field
                  label={quoteItemsTitle}
                  value={
                    quoteItems?.length ? (
                      <ul className="list-inside list-disc">
                        {quoteItems.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not specified"
                    )
                  }
                />
              </div>
            ) : (
              <>
                {propertyType && <Field label="Property type" value={propertyType} />}
                {propertySizeSqm != null && <Field label="Property size" value={`${propertySizeSqm} m²`} />}
              </>
            )}
            {numCleaners != null && <Field label="Cleaners" value={numCleaners} />}
            {durationHours != null && <Field label="Duration" value={`${Number(durationHours)} hours`} />}
          </div>
        </SectionCard>

        <SectionCard icon={SlidersHorizontal} label="Preferences">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Gender Preference" value={optionLabel(GENDER_OPTIONS, genderPreference)} />
            <Field label="Language Preference" value={optionLabel(LANGUAGE_OPTIONS, languagePreference)} />
            <div className="sm:col-span-2">
              <Field label="Special Requirements" value={specialRequirements || "—"} />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={SprayCan} label="Cleaning Solvents & Equipments">
          <p className="text-sm">
            {supplySource ? (SUPPLY_SOURCE_LABEL[supplySource] ?? supplySource) : "Not specified"}
          </p>
          {equipmentItems?.length ? (
            <ul className="mt-2 flex flex-col gap-2 text-sm">
              {equipmentItems.map((item) => (
                <LineItemRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          ) : null}
        </SectionCard>
      </div>
    </div>
  );
}
