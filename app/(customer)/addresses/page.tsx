"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  AddressPayload,
  CustomerAddress,
  createMyAddress,
  deleteMyAddress,
  listMyAddresses,
} from "@/lib/customers-api";

const emptyAddressForm: AddressPayload = {
  streetAddress: "",
  city: "",
  country: "",
  postalCode: "",
};

export default function AddressesPage() {
  const { accessToken } = useAuth();

  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddressForm);
  const [addingAddress, setAddingAddress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const addressData = await listMyAddresses(accessToken);
    setAddresses(addressData);
  }, [accessToken]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load addresses."))
      .finally(() => setLoading(false));
  }, [loadData]);

  function openCreate() {
    setAddressForm(emptyAddressForm);
    setOpen(true);
  }

  async function handleAddAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setAddingAddress(true);
    try {
      const created = await createMyAddress(accessToken, addressForm);
      setAddresses((prev) => [...prev, created]);
      setAddressForm(emptyAddressForm);
      setOpen(false);
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

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Addresses</h1>
          <p className="text-sm text-muted-foreground">{addresses.length} addresses saved</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" onClick={openCreate}>
              Add address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add address</DialogTitle>
            </DialogHeader>
            <form
              id="add-address-form"
              className="flex flex-col gap-3"
              onSubmit={handleAddAddress}
            >
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
            </form>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={addingAddress}
              >
                Cancel
              </Button>
              <Button type="submit" form="add-address-form" disabled={addingAddress}>
                {addingAddress ? "Adding…" : "Add address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
