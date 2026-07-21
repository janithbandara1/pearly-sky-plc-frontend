"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function ConfirmationDetails() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking confirmed</CardTitle>
        <CardDescription>
          {reference ? (
            <>
              Your reference number is <strong>{reference}</strong>. We&rsquo;ve emailed you a
              copy of this confirmation.
            </>
          ) : (
            "We've emailed you a copy of this confirmation."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
        <p>We&rsquo;ll be in touch shortly to confirm your price and cleaner assignment.</p>
        <p>
          Create an account with the same email to track this booking, save your details for next
          time, and manage future bookings from your dashboard.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/signup">Create an account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BookingConfirmationPage() {
  return (
    <div className="mx-auto w-full max-w-lg flex-1 p-6">
      <Suspense fallback={null}>
        <ConfirmationDetails />
      </Suspense>
    </div>
  );
}
