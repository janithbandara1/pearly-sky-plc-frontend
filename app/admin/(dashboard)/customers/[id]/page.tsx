"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/auth-context";
import {
  AdminCustomer,
  getCustomerAdmin,
  updateCustomerAdmin,
} from "@/lib/admin-customers-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminCustomerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { accessToken } = useStaffAuth();
  const [customer, setCustomer] = useState<AdminCustomer | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", company: "", country: "", contact: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const data = await getCustomerAdmin(accessToken, Number(params.id));
    setCustomer(data);
    setForm({
      firstName: data.firstName,
      lastName: data.lastName ?? "",
      company: data.company ?? "",
      country: data.country ?? "",
      contact: data.contact ?? "",
    });
  }, [accessToken, params.id]);

  useEffect(() => {
    load().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load customer."),
    );
  }, [load]);

  async function handleSave() {
    if (!accessToken || !customer) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateCustomerAdmin(accessToken, customer.id, form);
      setCustomer((prev) => (prev ? { ...prev, ...updated } : updated));
      toast.success("Customer updated.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to update customer.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (!customer) {
    return <p className="text-sm text-muted-foreground">{error ?? "Loading…"}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/customers")}>
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {customer.firstName} {customer.lastName ?? ""}
          </h1>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>
          {error && <p className="col-span-2 text-sm text-destructive">{error}</p>}
          <div className="col-span-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          {!customer.addresses || customer.addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved addresses.</p>
          ) : (
            <div className="flex flex-col divide-y">
              {customer.addresses.map((address) => (
                <div key={address.id} className="py-2 text-sm">
                  <p>
                    {address.streetAddress}
                    {address.unit ? `, ${address.unit}` : ""}
                  </p>
                  <p className="text-muted-foreground">
                    {address.city}
                    {address.state ? `, ${address.state}` : ""} {address.postalCode ?? ""}{" "}
                    {address.country ?? ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
