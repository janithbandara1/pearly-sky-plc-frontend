"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QuotationSummaryCard } from "@/components/booking/quotation-summary-card";
import { symbolForCurrencyCode } from "@/lib/currency-context";
import { ApiError, useAuth } from "@/lib/auth-context";
import { getMyQuotation, type Quotation } from "@/lib/quotation-api";

export default function QuotationDetailsPage() {
  const params = useParams<{ id: string }>();
  const quotationId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useAuth();

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await getMyQuotation(accessToken, quotationId);
    setQuotation(data);
  }, [accessToken, quotationId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load quotation."))
      .finally(() => setLoading(false));
  }, [loadData]);

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go back"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
      </Button>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quotation details</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-start-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      )}

      {!loading && quotation && (
        <QuotationSummaryCard
          referenceNumber={quotation.referenceNumber}
          attachmentLinks={quotation.attachmentLinks}
          status={quotation.status}
          serviceLabel={quotation.service.label}
          date={quotation.date}
          time={quotation.time}
          propertyType={quotation.propertyType}
          propertySizeSqm={quotation.propertySizeSqm}
          quoteItemsTitle={quotation.quoteItemsTitle}
          quoteItems={quotation.quoteItems}
          numCleaners={quotation.numCleaners}
          durationHours={quotation.durationHours}
          genderPreference={quotation.genderPreference}
          languagePreference={quotation.languagePreference}
          specialRequirements={quotation.specialRequirements}
          howGetIn={quotation.howGetIn}
          howHeard={quotation.howHeard}
          supplySource={quotation.supplySource}
          equipmentItems={quotation.equipmentItems}
          money={(n) => `${symbolForCurrencyCode(quotation.currency)}${n.toFixed(2)}`}
          rooms={quotation.rooms}
          frequency={quotation.frequency}
          serviceCategory={quotation.serviceCategory}
          deepClean={quotation.deepClean}
          disinfection={quotation.disinfection}
          customerName={
            quotation.customer ? `${quotation.customer.firstName} ${quotation.customer.lastName ?? ""}`.trim() : undefined
          }
          customerEmail={quotation.customer?.email}
          customerPhone={quotation.customer?.contact ?? undefined}
          address={{
            streetAddress: quotation.streetAddress,
            unit: quotation.unit,
            city: quotation.city,
            state: quotation.state,
            country: quotation.country,
            postalCode: quotation.postalCode,
          }}
          deliveryAddress={
            quotation.deliveryStreetAddress
              ? {
                  streetAddress: quotation.deliveryStreetAddress,
                  unit: quotation.deliveryUnit,
                  city: quotation.deliveryCity ?? "",
                  state: quotation.deliveryState,
                  country: quotation.deliveryCountry,
                  postalCode: quotation.deliveryPostalCode,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
