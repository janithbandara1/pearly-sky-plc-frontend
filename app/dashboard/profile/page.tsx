"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import { CustomerProfile, getMyProfile, updateMyProfile } from "@/lib/customers-api";

export default function ProfilePage() {
  const { accessToken } = useAuth();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const profileData = await getMyProfile(accessToken);
    setProfile(profileData);
    setProfileForm({
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? "",
      contact: profileData.contact ?? "",
    });
  }, [accessToken]);

  useEffect(() => {
    loadData().catch((err) =>
      setError(err instanceof ApiError ? err.message : "Failed to load profile."),
    );
  }, [loadData]);

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

  if (!profile) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal details.</p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

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
        <Button type="submit" disabled={savingProfile} className="w-fit">
          {savingProfile ? "Saving…" : "Save profile"}
        </Button>
      </form>
    </div>
  );
}
