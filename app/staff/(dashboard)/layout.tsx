"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useStaffAuth } from "@/lib/staff-auth-context";

const CLEANER_HOME = "/staff/my-bookings";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, staff } = useStaffAuth();
  const isAdmin = staff?.roles.includes("admin") ?? false;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/staff/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !isAdmin && !pathname.startsWith(CLEANER_HOME)) {
      router.replace(CLEANER_HOME);
    }
  }, [status, isAdmin, pathname, router]);

  if (status !== "authenticated" || (!isAdmin && !pathname.startsWith(CLEANER_HOME))) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
