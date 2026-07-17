"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCog,
  ShieldCheck,
  Layers,
  CreditCard,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useStaffAuth } from "@/lib/staff-auth-context";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Bookings", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/staff", label: "Staff", icon: UserCog },
  { href: "/admin/roles", label: "Roles & Permissions", icon: ShieldCheck },
  { href: "/admin/catalog/services", label: "Catalog", icon: Layers },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { staff, logout } = useStaffAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/admin" className="px-2 py-1.5 text-sm font-semibold">
          Pearly Sky Admin
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 px-2 py-1.5 text-xs text-muted-foreground">
          <span className="truncate">
            {staff?.roles.join(", ") ?? "Staff"} · #{staff?.id}
          </span>
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-foreground hover:underline"
            onClick={async () => {
              await logout();
              router.push("/admin/login");
            }}
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
