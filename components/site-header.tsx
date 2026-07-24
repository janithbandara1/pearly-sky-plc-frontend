"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { ServicesNavList } from "@/components/services-nav-list";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinkClass =
  "rounded-lg p-2 text-sm font-medium text-brand-navy-foreground transition-colors hover:bg-brand-gold/10 hover:text-brand-gold";
const navLinkActiveClass = "bg-brand-gold/10 text-brand-gold";

export function SiteHeader() {
  const { translate } = useLanguage();
  const { status, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/about", label: translate("navAbout") },
    { href: "/customers", label: translate("navCustomers") },
    { href: "/locations", label: translate("navLocations") },
    { href: "/blog", label: translate("navBlog") },
    { href: "/careers", label: translate("navCareers") },
    { href: "/contact", label: translate("navContact") },
  ];

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    function handlePointerDown(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={36}
            height={36}
            className="rounded-full bg-brand-navy"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(navLinkClass, pathname === "/" && navLinkActiveClass)}
          >
            {translate("navHome")}
          </Link>

          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
              aria-expanded={servicesOpen}
              className={cn(
                navLinkClass,
                "inline-flex items-center gap-1",
                servicesOpen && navLinkActiveClass,
              )}
            >
              {translate("navServices")}
              <ChevronDown
                className={cn("size-3 transition-transform", servicesOpen && "rotate-180")}
              />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 z-50 mt-1.5 w-[320px] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 sm:w-[420px]">
                <ServicesNavList
                  onNavigate={() => setServicesOpen(false)}
                  className="w-full sm:grid-cols-2"
                />
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(navLinkClass, pathname === link.href && navLinkActiveClass)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {status === "authenticated" ? (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10 sm:inline-flex"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="hidden text-brand-navy-foreground hover:bg-brand-gold/10 sm:inline-flex"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-brand-gold bg-transparent font-semibold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
              >
                <Link href="/login">{translate("navLogin")}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
              >
                <Link href="/signup">{translate("navSignup")}</Link>
              </Button>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-brand-navy-foreground hover:bg-brand-gold/10 lg:hidden"
                aria-label={translate("navMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm gap-0">
              <SheetHeader>
                <SheetTitle>{translate("navMenu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm font-medium">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg p-2 hover:bg-muted",
                    pathname === "/" && "bg-muted/50 text-brand-gold-dark",
                  )}
                >
                  {translate("navHome")}
                </Link>

                <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {translate("navServices")}
                </p>
                <ServicesNavList
                  onNavigate={() => setMobileOpen(false)}
                  className="w-full grid-cols-1"
                />
                <Link
                  href="/#services"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-brand-gold-dark hover:bg-muted"
                >
                  {translate("navViewAllServices")}
                </Link>

                <div className="my-2 border-t" />

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg p-2 hover:bg-muted",
                      pathname === link.href && "bg-muted/50 text-brand-gold-dark",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {status === "authenticated" && (
                  <>
                    <div className="my-2 border-t" />
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg p-2 hover:bg-muted"
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="rounded-lg p-2 text-left hover:bg-muted"
                    >
                      Log out
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
