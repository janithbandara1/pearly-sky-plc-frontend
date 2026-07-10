"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError, useAuth } from "@/lib/auth-context";
import { BookingFrequency, createBooking } from "@/lib/booking-api";
import { getServices } from "@/lib/catalog-api";

const FREQUENCIES: { value: BookingFrequency; label: string }[] = [
  { value: "one-time", label: "One-time" },
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function BookServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = use(params);
  const router = useRouter();
  const { status, accessToken } = useAuth();

  const [propertySizeSqm, setPropertySizeSqm] = useState("90");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [frequency, setFrequency] = useState<BookingFrequency>("one-time");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serviceLabel, setServiceLabel] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?next=/book/${serviceId}`);
    }
  }, [status, router, serviceId]);

  useEffect(() => {
    getServices()
      .then((services) => {
        const match = services.find((s) => s.id === Number(serviceId));
        setServiceLabel(match?.label ?? null);
      })
      .catch(() => setServiceLabel(null));
  }, [serviceId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setSubmitting(true);
    try {
      const booking = await createBooking(accessToken, {
        serviceId: Number(serviceId),
        propertySizeSqm: Number(propertySizeSqm),
        date,
        time,
        frequency,
        note: note || undefined,
      });
      router.push(`/dashboard?booked=${booking.referenceNumber}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create booking.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status !== "authenticated") {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book {serviceLabel ?? "this service"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="propertySizeSqm">Property size (m²)</Label>
              <Input
                id="propertySizeSqm"
                type="number"
                min={20}
                max={1000}
                required
                value={propertySizeSqm}
                onChange={(e) => setPropertySizeSqm(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We&rsquo;ll work out how long the clean takes and how many cleaners
                you need from this — no need to guess.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as BookingFrequency)}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="note">Notes (optional)</Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. pet in the house, gate code, etc."
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Booking…" : "Confirm booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
