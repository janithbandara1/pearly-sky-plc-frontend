"use client";

import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CUSTOMER_NAV_LINKS } from "@/lib/customer-nav";

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden w-56 shrink-0 flex-col gap-1 lg:flex">
      {CUSTOMER_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              isActive && "bg-brand-gold/10 text-brand-gold-dark",
            )}
          >
            <link.icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
