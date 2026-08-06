"use client";

import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { BookingDetailsCard } from "@/components/booking/booking-details-card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { GENERAL_STEAM_CARDS } from "@/components/booking/steam/general-steam-section";
import { INDUSTRIAL_STEAM_CATEGORIES } from "@/components/booking/steam/industrial-commercial-steam-section";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  createBooking,
  createGuestBooking,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
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
import { useCountry } from "@/lib/countries/country-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const emptyAddressForm: AddressPayload = {
  streetAddress: "",
  city: "",
  country: "",
  postalCode: "",
};

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

const emptyContactForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
};

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { status, accessToken } = useAuth();
  const isAuthenticated = status === "authenticated";
  const { country: currentCountry } = useCountry();

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddressForm);
  const [addingAddress, setAddingAddress] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    getServiceBySlug(serviceSlug, currentCountry)
      .then(setService)
      .catch(() => undefined);
  }, [serviceSlug, currentCountry]);

  useEffect(() => {
    if (!draft) return;
    setQuoteLoading(true);
    getServiceQuote(draft.serviceId, draft.propertySizeSqm, currentCountry)
      .then(setQuote)
      .catch(() => setQuote({ bookable: false }))
      .finally(() => setQuoteLoading(false));
  }, [draft, currentCountry]);

  const loadCustomerData = useCallback(async () => {
    if (!accessToken) return;
    const [profileData, addressData] = await Promise.all([
      getMyProfile(accessToken),
      listMyAddresses(accessToken),
    ]);
    setProfile(profileData);
    setContactForm({
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? "",
      email: profileData.email,
      contact: profileData.contact ?? "",
    });
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
    if (!draft) return;
    setError(null);
    setSubmitting(true);
    try {
      if (isAuthenticated && accessToken) {
        const booking = await createBooking(accessToken, {
          serviceId: draft.serviceId,
          propertySizeSqm: draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          addressId: selectedAddressId ?? undefined,
          note: draft.note,
          country: currentCountry ?? undefined,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name })),
          supplySource: draft.supplySource || undefined,
          genderPreference: draft.genderPreference,
          languagePreference: draft.languagePreference,
          specialRequirements: draft.specialRequirements,
          propertyType: draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
        });
        clearBookingDraft();
        try {
          const { redirectUrl } = await initiateCheckout(accessToken, booking.id);
          window.location.assign(redirectUrl);
        } catch {
          // Booking exists but payment couldn't start (e.g. no rate configured
          // for this country) — land on the booking page in its pending state.
          router.push(`/booking/${booking.id}?ref=${booking.referenceNumber}`);
        }
      } else {
        const booking = await createGuestBooking({
          serviceId: draft.serviceId,
          propertySizeSqm: draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          note: draft.note,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name })),
          supplySource: draft.supplySource || undefined,
          genderPreference: draft.genderPreference,
          languagePreference: draft.languagePreference,
          specialRequirements: draft.specialRequirements,
          propertyType: draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
          firstName: contactForm.firstName.trim(),
          lastName: contactForm.lastName.trim() || undefined,
          email: contactForm.email.trim(),
          contact: contactForm.contact.trim(),
          streetAddress: addressForm.streetAddress.trim(),
          city: addressForm.city.trim(),
          country: addressForm.country?.trim() || undefined,
          postalCode: addressForm.postalCode?.trim() || undefined,
          pricingCountry: currentCountry ?? undefined,
        });
        clearBookingDraft();
        try {
          const { redirectUrl } = await initiateGuestCheckout(
            booking.id,
            booking.referenceNumber,
          );
          window.location.assign(redirectUrl);
        } catch {
          router.push(`/booking-confirmation?ref=${booking.referenceNumber}`);
        }
      }
      // Keep `submitting` true — we're navigating away to Stripe or the booking page.
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create booking.");
      setSubmitting(false);
    }
  }

  if (
    status === "loading" ||
    !draftChecked ||
    !draft ||
    !service ||
    (isAuthenticated && !profile)
  ) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const genderLabel = GENDER_OPTIONS.find((o) => o.value === draft.genderPreference)?.label ?? "No Preference";
  const languageLabel = LANGUAGE_OPTIONS.find((o) => o.value === draft.languagePreference)?.label ?? "None";

  const generalSteamTitles = new Set(GENERAL_STEAM_CARDS.map((c) => c.title));
  const industrialSteamTitles = new Set(INDUSTRIAL_STEAM_CATEGORIES.map((c) => c.title));
  const generalSteamItems = draft.steamItems?.filter((item) => generalSteamTitles.has(item));
  const industrialSteamItems = draft.steamItems?.filter((item) => industrialSteamTitles.has(item));

  const guestDetailsMissing =
    !contactForm.firstName.trim() ||
    !contactForm.email.trim() ||
    !contactForm.contact.trim() ||
    !addressForm.streetAddress.trim() ||
    !addressForm.city.trim();

  const bookDisabledReason = isAuthenticated
    ? !selectedAddressId
      ? "Select or add an address to continue."
      : undefined
    : guestDetailsMissing
      ? "Fill in your contact details and address to continue."
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
              <CardTitle>Contact information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-first-name">First name</Label>
                  <Input
                    id="contact-first-name"
                    required
                    disabled={isAuthenticated}
                    value={contactForm.firstName}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-last-name">Last name</Label>
                  <Input
                    id="contact-last-name"
                    disabled={isAuthenticated}
                    value={contactForm.lastName}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isAuthenticated}
                  value={contactForm.email}
                  onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  required
                  disabled={isAuthenticated}
                  value={contactForm.contact}
                  onChange={(e) => setContactForm((f) => ({ ...f, contact: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <p className="text-sm font-medium">Select an address</p>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-6">
          <BookingDetailsCard
            serviceLabel={service.label}
            hourlyRate={service.price}
            quote={quote}
            quoteLoading={quoteLoading}
            date={draft.date}
            time={draft.time}
            propertyType={draft.propertyType}
            propertySizeSqm={draft.propertySizeSqm}
            genderLabel={genderLabel}
            languageLabel={languageLabel}
            specialRequirements={draft.specialRequirements}
            packages={draft.packages}
            serviceLevel={draft.disinfectionLevel}
            generalSteamItems={generalSteamItems}
            industrialSteamItems={industrialSteamItems}
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
