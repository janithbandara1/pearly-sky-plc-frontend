"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin/catalog/services", label: "Services" },
  { href: "/admin/catalog/packages", label: "Packages" },
  { href: "/admin/catalog/items", label: "Items" },
];

export default function AdminCatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Catalog</h1>
        <p className="text-sm text-muted-foreground">
          Manage the services, add-on packages, and items customers can book.
        </p>
      </div>
      <div className="flex gap-1 border-b">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "border-b-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground",
              pathname === tab.href
                ? "border-primary text-foreground"
                : "border-transparent",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
