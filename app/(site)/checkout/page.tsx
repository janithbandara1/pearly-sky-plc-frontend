"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadBookingDraft } from "@/lib/booking-draft";

export default function GlobalCheckoutRedirect() {
  const router = useRouter();

  useEffect(() => {
    const draft = loadBookingDraft();
    if (draft?.serviceSlug) {
      router.replace(`/services/${draft.serviceSlug}/checkout`);
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6 text-sm text-muted-foreground">
      Loading checkout…
    </div>
  );
}
