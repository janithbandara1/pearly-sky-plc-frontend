"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { OrderSummaryCard } from "@/components/booking/order-summary-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import { createBooking } from "@/lib/booking-api";
import { BookingDraft, clearBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import {
  CatalogServiceDetail,
  SizeQuote,
  getServiceBySlug,
  getServiceQuote,
} from "@/lib/catalog-api";
import {
  AddressPayload,
  CustomerAddress,
  CustomerProfile,
  createMyAddress,
  getMyProfile,
  listMyAddresses,
} from "@/lib/customers-api";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const emptyAddressForm: AddressPayload = {
  streetAddress: "",
  city: "",
  country: "",
  postalCode: "",
};

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { status, accessToken } = useAuth();

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddressForm);
  const [addingAddress, setAddingAddress] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?next=/services/${serviceSlug}/checkout`);
    }
  }, [status, router, serviceSlug]);

  useEffect(() => {
    const stored = loadBookingDraft();
    if (!stored || stored.serviceSlug !== serviceSlug) {
      router.replace(`/services/${serviceSlug}`);
      return;
    }
    setDraft(stored);
    setDraftChecked(true);
  }, [serviceSlug, router]);

  useEffect(() => {
    getServiceBySlug(serviceSlug)
      .then(setService)
      .catch(() => undefined);
  }, [serviceSlug]);

  useEffect(() => {
    if (!draft) return;
    setQuoteLoading(true);
    getServiceQuote(draft.serviceId, draft.propertySizeSqm)
      .then(setQuote)
      .catch(() => setQuote({ bookable: false }))
      .finally(() => setQuoteLoading(false));
  }, [draft]);

  const loadCustomerData = useCallback(async () => {
    if (!accessToken) return;
    const [profileData, addressData] = await Promise.all([
      getMyProfile(accessToken),
      listMyAddresses(accessToken),
    ]);
    setProfile(profileData);
    setAddresses(addressData);
    setSelectedAddressId((prev) => prev ?? addressData[0]?.id ?? null);
  }, [accessToken]);

  useEffect(() => {
    loadCustomerData().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load your details."),
    );
  }, [loadCustomerData]);

  async function handleAddAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setAddingAddress(true);
    try {
      const created = await createMyAddress(accessToken, addressForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created.id);
      setAddressForm(emptyAddressForm);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to add address.");
    } finally {
      setAddingAddress(false);
    }
  }

  async function handleConfirm() {
    if (!accessToken || !draft) return;
    setError(null);
    setSubmitting(true);
    try {
      const booking = await createBooking(accessToken, {
        serviceId: draft.serviceId,
        propertySizeSqm: draft.propertySizeSqm,
        date: draft.date,
        time: draft.time,
        frequency: draft.frequency,
        addressId: selectedAddressId ?? undefined,
        note: draft.note,
      });
      clearBookingDraft();
      router.push(`/dashboard?booked=${booking.referenceNumber}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create booking.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status !== "authenticated" || !draftChecked || !draft || !service || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const bookDisabledReason = !selectedAddressId
    ? "Select or add an address to continue."
    : undefined;

  return (
    <div className={poppins.className}>
      <PageHero
        image={
          service.imageUrl ??
          "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"
        }
        eyebrow="Checkout"
        title={service.label}
        subtitle={`${draft.date} at ${draft.time}`}
      />

      <div className="mx-auto grid w-full max-w-[1150px] flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="flex flex-col gap-6">
          {error && <p className="text-sm text-destructive">{error}</p>}

          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-sm">
              <p className="font-medium">
                {profile.firstName} {profile.lastName ?? ""}
              </p>
              <p className="text-muted-foreground">{profile.email}</p>
              {profile.contact && <p className="text-muted-foreground">{profile.contact}</p>}
              <Link href="/dashboard" className="mt-2 text-xs underline underline-offset-2">
                Edit profile
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {addresses.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No saved addresses yet — add one below.
                </p>
              )}
              {addresses.map((address) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                    selectedAddressId === address.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted"
                  }`}
                >
                  {address.streetAddress}
                  {address.unit ? `, ${address.unit}` : ""}, {address.city}
                  {address.country ? `, ${address.country}` : ""}
                  {address.postalCode ? ` ${address.postalCode}` : ""}
                </button>
              ))}

              <form className="flex flex-col gap-3 border-t pt-4" onSubmit={handleAddAddress}>
                <p className="text-sm font-medium">Add a new address</p>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="streetAddress">Street address</Label>
                  <Input
                    id="streetAddress"
                    required
                    value={addressForm.streetAddress}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, streetAddress: e.target.value }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="postalCode">Postal code</Label>
                    <Input
                      id="postalCode"
                      value={addressForm.postalCode}
                      onChange={(e) =>
                        setAddressForm((f) => ({ ...f, postalCode: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="addressCountry">Country</Label>
                  <Input
                    id="addressCountry"
                    value={addressForm.country}
                    onChange={(e) =>
                      setAddressForm((f) => ({ ...f, country: e.target.value }))
                    }
                  />
                </div>
                <Button type="submit" disabled={addingAddress} variant="outline">
                  {addingAddress ? "Adding…" : "Add address"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-6">
          <OrderSummaryCard
            serviceLabel={service.label}
            frequency={draft.frequency}
            hourlyRate={service.price}
            quote={quote}
            quoteLoading={quoteLoading}
            date={draft.date}
            time={draft.time}
            propertySizeSqm={draft.propertySizeSqm}
            packages={draft.packages}
            items={draft.items}
            supplySource={draft.supplySource}
            addOnsTotal={draft.addOnsTotal}
            onBookNow={handleConfirm}
            submitting={submitting}
            bookDisabledReason={bookDisabledReason}
          />
        </div>
      </div>
    </div>
  );
}
