"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import { Booking, initiateCheckout, listMyBookings } from "@/lib/booking-api";
import {
  AddressPayload,
  CustomerAddress,
  CustomerProfile,
  createMyAddress,
  deleteMyAddress,
  getMyProfile,
  listMyAddresses,
  updateMyProfile,
} from "@/lib/customers-api";

function BookingConfirmationBanner() {
  const searchParams = useSearchParams();
  const justBooked = searchParams.get("booked");
  if (!justBooked) return null;
  return (
    <p className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
      Booking confirmed — reference <strong>{justBooked}</strong>. We&rsquo;ll be in
      touch to confirm your price.
    </p>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { status, accessToken, logout } = useAuth();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
  });
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const [profileData, addressData, bookingData] = await Promise.all([
      getMyProfile(accessToken),
      listMyAddresses(accessToken),
      listMyBookings(accessToken),
    ]);
    setProfile(profileData);
    setAddresses(addressData);
    setBookings(bookingData);
    setProfileForm({
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? "",
      contact: profileData.contact ?? "",
    });
  }, [accessToken]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
    if (status === "authenticated") {
      loadData().catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load profile."),
      );
    }
  }, [status, router, loadData]);

  async function handleProfileSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setSavingProfile(true);
    try {
      const updated = await updateMyProfile(accessToken, profileForm);
      setProfile(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleAddAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setAddingAddress(true);
    try {
      const created = await createMyAddress(accessToken, addressForm);
      setAddresses((prev) => [...prev, created]);
      setAddressForm({ streetAddress: "", city: "", country: "", postalCode: "" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to add address.");
    } finally {
      setAddingAddress(false);
    }
  }

  async function handleDeleteAddress(id: number) {
    if (!accessToken) return;
    await deleteMyAddress(accessToken, id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  async function handlePayNow(orderId: number) {
    if (!accessToken) return;
    setError(null);
    setPayingId(orderId);
    try {
      const { redirectUrl } = await initiateCheckout(accessToken, orderId);
      window.location.href = redirectUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to start checkout.");
      setPayingId(null);
    }
  }

  if (status !== "authenticated" || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <Suspense fallback={null}>
        <BookingConfirmationBanner />
      </Suspense>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle>My bookings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {bookings.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No bookings yet.{" "}
              <Link href="/" className="underline underline-offset-2">
                Browse services
              </Link>
              .
            </p>
          )}
          {bookings.map((booking) => {
            const details = booking.serviceDetails[0];
            return (
              <div key={booking.id} className="rounded-lg border p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{details?.service.label}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                    {booking.status}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Ref {booking.referenceNumber} · {details?.date} at {details?.time}
                </p>
                {details && (
                  <p className="text-muted-foreground">
                    {details.propertySizeSqm} m² · {details.minHours}-{details.maxHours}{" "}
                    hours · {details.cleanerCount + details.extraCleanerCount} cleaner
                    {details.cleanerCount + details.extraCleanerCount > 1 ? "s" : ""}
                  </p>
                )}
                {booking.status === "pending" && (
                  <div className="mt-2 flex items-center gap-2">
                    {booking.price ? (
                      <Button
                        size="sm"
                        disabled={payingId === booking.id}
                        onClick={() => handlePayNow(booking.id)}
                      >
                        {payingId === booking.id
                          ? "Starting checkout…"
                          : `Pay now (${booking.price} ${booking.currency ?? ""})`}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Awaiting a price from our team
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleProfileSave}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={profileForm.firstName}
                  onChange={(e) =>
                    setProfileForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={profileForm.lastName}
                  onChange={(e) =>
                    setProfileForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} disabled readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact">Contact number</Label>
              <Input
                id="contact"
                value={profileForm.contact}
                onChange={(e) =>
                  setProfileForm((f) => ({ ...f, contact: e.target.value }))
                }
              />
            </div>
            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Addresses</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {addresses.length === 0 && (
            <p className="text-sm text-muted-foreground">No addresses saved yet.</p>
          )}
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm"
            >
              <span>
                {address.streetAddress}
                {address.unit ? `, ${address.unit}` : ""}, {address.city}
                {address.country ? `, ${address.country}` : ""}
                {address.postalCode ? ` ${address.postalCode}` : ""}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteAddress(address.id)}
              >
                Remove
              </Button>
            </div>
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
  );
}
