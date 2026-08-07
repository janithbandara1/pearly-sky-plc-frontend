"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Users,
  UserCog,
  Layers,
  CreditCard,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { useStaffAuth } from "@/lib/staff-auth-context";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchPrefix?: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/staff/quotations", label: "Quotations", icon: FileText },
  { href: "/staff/customers", label: "Customers", icon: Users },
  { href: "/staff/services", label: "Services", icon: Layers },
  { href: "/staff/catalog/packages", matchPrefix: "/staff/catalog", label: "Catalog", icon: Layers },
  { href: "/staff/users", label: "Users", icon: UserCog },
  { href: "/staff/payments", label: "Payments", icon: CreditCard },
];

const CLEANER_NAV_ITEMS: NavItem[] = [
  { href: "/staff/my-bookings", label: "My Bookings", icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, staff } = useStaffAuth();
  const isAdmin = staff?.roles.includes("admin") ?? false;
  const navItems = useMemo(
    () => (isAdmin ? ADMIN_NAV_ITEMS : CLEANER_NAV_ITEMS),
    [isAdmin],
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/staff/dashboard">
                <div className="relative aspect-square size-8 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/brand/logo.webp"
                    alt="Pearly Sky"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Pearly Sky Cleaning</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === "/staff/dashboard"
                    ? pathname === "/staff/dashboard"
                    : pathname.startsWith(item.matchPrefix ?? item.href);
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await logout();
                router.push("/staff/login");
              }}
            >
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
