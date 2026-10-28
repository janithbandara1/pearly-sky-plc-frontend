"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { useStaffAuth } from "@/lib/staff-auth-context";
import { canViewStaffPath, STAFF_ADMIN_HOME, STAFF_CLEANER_HOME } from "@/lib/staff-sections";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, staff } = useStaffAuth();
  const isAdmin = staff?.roles.includes("admin") ?? false;
  // The global gateway has no bookings, so a cleaner has nothing to see there.
  const noAccess = status === "authenticated" && IS_GLOBAL_SITE && !isAdmin;
  const allowed = canViewStaffPath(pathname, isAdmin);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/staff/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !noAccess && !allowed) {
      router.replace(isAdmin ? STAFF_ADMIN_HOME : STAFF_CLEANER_HOME);
    }
  }, [status, noAccess, allowed, isAdmin, router]);

  if (noAccess) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        This dashboard is for admins only.
      </div>
    );
  }

  if (status !== "authenticated" || !allowed) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <StaffSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
