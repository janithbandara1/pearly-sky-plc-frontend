"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/auth-context";
import { DashboardSummary, getDashboardSummary } from "@/lib/admin-dashboard-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { accessToken } = useStaffAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    getDashboardSummary(accessToken)
      .then(setSummary)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load dashboard."),
      );
  }, [accessToken]);

  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (!summary) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of bookings, customers, and revenue.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total bookings" value={String(summary.bookings.total)} />
        <StatCard label="Pending" value={String(summary.bookings.pending)} />
        <StatCard label="Confirmed" value={String(summary.bookings.confirmed)} />
        <StatCard label="Cancelled" value={String(summary.bookings.cancelled)} />
        <StatCard label="Customers" value={String(summary.customers.total)} />
        <StatCard label="Users" value={String(summary.staff.total)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {summary.recentBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <div className="flex flex-col divide-y">
              {summary.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium">{booking.referenceNumber}</p>
                    <p className="text-muted-foreground">
                      {booking.customer.firstName} {booking.customer.lastName ?? ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
