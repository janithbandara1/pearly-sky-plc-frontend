"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";

const CUSTOMER_NAV_LINKS = [
  { href: "/bookings", label: "Bookings" },
  { href: "/quotations", label: "Quotations" },
  { href: "/profile", label: "Profile" },
  { href: "/addresses", label: "Addresses" },
];

export function CustomerDashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <>
      <SiteHeader navLinks={CUSTOMER_NAV_LINKS} showServicesMenu={false} />
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      <SiteFooter />
    </>
  );
}
