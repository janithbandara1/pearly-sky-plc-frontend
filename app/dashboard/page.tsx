"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, Eye } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/admin/data-table";
import { ApiError, useAuth } from "@/lib/auth-context";
import { Booking, initiateCheckout, listMyBookings } from "@/lib/booking-api";

const STATUS_VARIANT: Record<Booking["status"], "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  cancelled: "destructive",
};

const STATUS_OPTIONS: Booking["status"][] = ["pending", "confirmed", "cancelled"];

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
  const { accessToken } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const bookingData = await listMyBookings(accessToken);
    setBookings(bookingData);
  }, [accessToken]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [loadData]);

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      if (statusFilter !== "all" && booking.status !== statusFilter) return false;
      if (!search) return true;
      const query = search.toLowerCase();
      const service = booking.serviceDetails[0]?.service.label ?? "";
      return (
        booking.referenceNumber.toLowerCase().includes(query) ||
        service.toLowerCase().includes(query)
      );
    });
  }, [bookings, search, statusFilter]);

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

  const columns: ColumnDef<Booking>[] = [
    { accessorKey: "referenceNumber", header: "Reference" },
    {
      id: "service",
      header: "Service",
      cell: ({ row }) => {
        const details = row.original.serviceDetails[0];
        return details?.service.label ?? <span className="text-muted-foreground">—</span>;
      },
    },
    {
      id: "datetime",
      header: "Date & time",
      cell: ({ row }) => {
        const details = row.original.serviceDetails[0];
        if (!details) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="text-muted-foreground">
            {details.date} · {details.time}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <div className="flex justify-end gap-1">
            <Button size="icon-sm" variant="ghost" asChild title="View details">
              <Link href={`/dashboard/bookings/${booking.id}`}>
                <Eye />
                <span className="sr-only">View details</span>
              </Link>
            </Button>
            {booking.status === "pending" && booking.price && (
              <Button
                size="icon-sm"
                variant="ghost"
                disabled={payingId === booking.id}
                onClick={() => handlePayNow(booking.id)}
                title={`Pay now (${booking.price} ${booking.currency ?? ""})`}
              >
                <CreditCard />
                <span className="sr-only">Pay now</span>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My bookings</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {bookings.length} bookings
        </p>
      </div>

      <Suspense fallback={null}>
        <BookingConfirmationBanner />
      </Suspense>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search reference or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="ml-auto w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filtered} emptyMessage="No bookings found." />
      {bookings.length === 0 && (
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-2">
            Browse services
          </Link>{" "}
          to make your first booking.
        </p>
      )}
    </div>
  );
}
