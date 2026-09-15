import { CalendarDays, FileText, UserRound, type LucideIcon } from "lucide-react";

export interface CustomerNavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const CUSTOMER_NAV_LINKS: CustomerNavLink[] = [
  { href: "/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/quotations", label: "Quotations", icon: FileText },
  { href: "/profile", label: "Profile", icon: UserRound },
  // Addresses hidden for now — re-add once the add-address flow is ready.
];
