"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { ApiError, useAuth } from "@/lib/auth-context";
import { Booking, getMyBooking, initiateCheckout } from "@/lib/booking-api";

const STATUS_VARIANT: Record<Booking["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

const SUPPLY_SOURCE_LABEL: Record<string, string> = {
  customer: "Provided by the Customer",
  company: "Request the Company",
};

function optionLabel(options: { value: string; label: string }[], value: string | null): string {
  if (!value) return "No Preference";
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const bookingId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await getMyBooking(accessToken, bookingId);
    setBooking(data);
  }, [accessToken, bookingId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load booking."))
      .finally(() => setLoading(false));
  }, [loadData]);

  async function handlePayNow() {
    if (!accessToken || !booking) return;
    setError(null);
    setPaying(true);
    try {
      const { redirectUrl } = await initiateCheckout(accessToken, booking.id);
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to start checkout.");
      setPaying(false);
    }
  }

  // `booking.price` is the flat per-country rate charged up front ("due at
  // booking"). The full job cost isn't known until minHours/maxHours × that
  // rate (plus any priced add-ons) is estimated — the remaining balance is
  // that estimate minus what's already been paid.
  const details = booking?.serviceDetails?.[0];
  const dueAtBooking = booking?.price ? Number(booking.price) : null;
  const minHours = details ? Number(details.minHours) : null;
  const maxHours = details ? Number(details.maxHours) : null;
  const addOnsTotal = details?.addOns?.reduce((sum, a) => sum + (a.price ?? 0), 0) ?? 0;
  const hasEstimate = dueAtBooking !== null && minHours !== null && maxHours !== null;
  const estimatedMin = hasEstimate ? minHours! * dueAtBooking! + addOnsTotal : null;
  const estimatedMax = hasEstimate ? maxHours! * dueAtBooking! + addOnsTotal : null;
  const remainingMin = hasEstimate ? (estimatedMin as number) - (dueAtBooking as number) : null;
  const remainingMax = hasEstimate ? (estimatedMax as number) - (dueAtBooking as number) : null;
  const money = (n: number) => `${n.toFixed(2)} ${booking?.currency ?? ""}`.trim();

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
        <h1 className="text-2xl font-semibold tracking-tight">Booking details</h1>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {!loading && booking && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Reference</p>
            <p>{booking.referenceNumber}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge variant={STATUS_VARIANT[booking.status]} className="capitalize">
              {booking.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Due at booking</p>
            <p>{dueAtBooking !== null ? money(dueAtBooking) : "Awaiting a price from our team"}</p>
          </div>
          {hasEstimate && (
            <div>
              <p className="text-xs text-muted-foreground">Total price (estimate)</p>
              <p>
                {money(estimatedMin as number)} – {money(estimatedMax as number)}
              </p>
            </div>
          )}
          {hasEstimate && (
            <div>
              <p className="text-xs text-muted-foreground">Remaining balance</p>
              <p>
                {money(remainingMin as number)} – {money(remainingMax as number)}
              </p>
            </div>
          )}
          {booking.serviceDetails[0] && (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p>{booking.serviceDetails[0].service.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date & time</p>
                <p>
                  {booking.serviceDetails[0].date} · {booking.serviceDetails[0].time}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property size</p>
                <p>{booking.serviceDetails[0].propertySizeSqm} m²</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Property type</p>
                <p>{booking.serviceDetails[0].propertyType ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p>
                  {booking.serviceDetails[0].minHours}-{booking.serviceDetails[0].maxHours} hours
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cleaners</p>
                <p>
                  {booking.serviceDetails[0].cleanerCount +
                    booking.serviceDetails[0].extraCleanerCount}
                </p>
              </div>
              {booking.serviceDetails[0].note && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p>{booking.serviceDetails[0].note}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!loading && booking && booking.serviceDetails[0] && (
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Add-ons</p>
            {booking.serviceDetails[0].addOns?.length ? (
              <ul className="list-inside list-disc">
                {booking.serviceDetails[0].addOns.map((addOn) => (
                  <li key={addOn.name}>
                    {addOn.name}
                    {addOn.price !== null ? ` — ${addOn.price}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Cleaning Solvents & Equipments</p>
            <p>
              {booking.serviceDetails[0].supplySource
                ? (SUPPLY_SOURCE_LABEL[booking.serviceDetails[0].supplySource] ??
                  booking.serviceDetails[0].supplySource)
                : "Not specified"}
            </p>
            {booking.serviceDetails[0].equipmentItems?.length ? (
              <ul className="list-inside list-disc">
                {booking.serviceDetails[0].equipmentItems.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {booking.serviceDetails[0].facilities?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Facilities</p>
              <ul className="list-inside list-disc">
                {booking.serviceDetails[0].facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {booking.serviceDetails[0].disinfectionLevel ? (
            <div>
              <p className="text-xs text-muted-foreground">Disinfection Level</p>
              <p>
                {booking.serviceDetails[0].disinfectionLevel.name}
                {booking.serviceDetails[0].disinfectionLevel.price
                  ? ` — +${booking.serviceDetails[0].disinfectionLevel.price}`
                  : ""}
              </p>
            </div>
          ) : null}

          {booking.serviceDetails[0].steamItems?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Steam Items</p>
              <ul className="list-inside list-disc">
                {booking.serviceDetails[0].steamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {booking.serviceDetails[0].eventTypes?.length ? (
            <div>
              <p className="text-xs text-muted-foreground">Event Types</p>
              <ul className="list-inside list-disc">
                {booking.serviceDetails[0].eventTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <p className="text-xs text-muted-foreground">Gender Preference</p>
            <p>{optionLabel(GENDER_OPTIONS, booking.serviceDetails[0].genderPreference)}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Language Preference</p>
            <p>{optionLabel(LANGUAGE_OPTIONS, booking.serviceDetails[0].languagePreference)}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-muted-foreground">Special Requirements</p>
            <p>{booking.serviceDetails[0].specialRequirements || "—"}</p>
          </div>
        </div>
      )}

      {!loading && booking && booking.status === "pending" && booking.price && (
        <div className="border-t pt-4">
          <Button disabled={paying} onClick={handlePayNow}>
            <CreditCard />
            {paying ? "Starting checkout…" : `Pay now (${money(Number(booking.price))})`}
          </Button>
        </div>
      )}
    </div>
  );
}
