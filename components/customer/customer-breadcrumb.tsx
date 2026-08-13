"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CUSTOMER_NAV_LINKS } from "@/lib/customer-nav";

export function CustomerBreadcrumb() {
  const pathname = usePathname();
  const section = CUSTOMER_NAV_LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
  const isDetail = section ? pathname !== section.href : false;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {section && (
          <BreadcrumbItem>
            {isDetail ? (
              <BreadcrumbLink href={section.href}>{section.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{section.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        )}
        {isDetail && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
