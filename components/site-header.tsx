"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, FileText, LogOut, Menu, UserRound, XIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { ServicesNavList } from "@/components/services-nav-list";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinkClass =
  "rounded-lg p-2 text-sm font-medium text-brand-navy-foreground transition-colors hover:bg-brand-gold/10 hover:text-brand-gold";
const navLinkActiveClass = "bg-brand-gold/10 text-brand-gold";

export interface SiteHeaderProps {
  /** Links shown after "Home" (and after the Services menu, if shown). Defaults to the marketing site's nav. */
  navLinks?: { href: string; label: string }[];
  /** Set to false to hide the Services mega-menu, e.g. on dashboard-style pages. */
  showServicesMenu?: boolean;
}

export function SiteHeader({ navLinks: navLinksProp, showServicesMenu = true }: SiteHeaderProps = {}) {
  const { translate } = useLanguage();
  const { status, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const defaultNavLinks = [
    { href: "/about-us", label: translate("navAbout") },
    { href: "/our-customers", label: translate("navCustomers") },
    { href: "/our-locations", label: translate("navLocations") },
    { href: "/blog", label: translate("navBlog") },
    { href: "/careers", label: translate("navCareers") },
    { href: "/contact-us", label: translate("navContact") },
  ];
  const navLinks = navLinksProp ?? defaultNavLinks;

  useEffect(() => {
    setServicesOpen(false);
    setAccountOpen(false);
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

  useEffect(() => {
    if (!accountOpen) return;
    function handlePointerDown(event: MouseEvent) {
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen]);

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={36}
            height={36}
            className="rounded-full bg-brand-navy"
            priority
          />
          <span className="hidden text-base font-semibold whitespace-nowrap text-brand-gold sm:inline">
            Pearly Sky Cleaning
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(navLinkClass, pathname === "/" && navLinkActiveClass)}
          >
            {translate("navHome")}
          </Link>

          {showServicesMenu && (
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
          )}

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
          <LocaleSwitcher />

          {status === "authenticated" ? (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                aria-label="Account menu"
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10 text-brand-gold transition-colors hover:bg-brand-gold/20",
                  accountOpen && "bg-brand-gold/20",
                )}
              >
                <UserRound className="size-5" />
              </button>
              {accountOpen && (
                <div className="absolute top-full right-0 z-50 mt-1.5 flex w-56 flex-col gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow ring-1 ring-foreground/10">
                  <Link
                    href="/bookings"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-muted"
                  >
                    <CalendarDays className="size-4" />
                    Bookings
                  </Link>
                  <Link
                    href="/quotations"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-muted"
                  >
                    <FileText className="size-4" />
                    Quotations
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg p-2 text-sm hover:bg-muted"
                  >
                    <UserRound className="size-4" />
                    Profile
                  </Link>
                  <div className="my-1 border-t" />
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left text-sm text-destructive hover:bg-muted"
                  >
                    <LogOut className="size-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
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

          <Sheet
            open={mobileOpen}
            onOpenChange={(open) => {
              setMobileOpen(open);
              if (!open) setMobileServicesOpen(false);
            }}
          >
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
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm border-none bg-brand-navy text-brand-navy-foreground"
              showCloseButton={false}
            >
              <SheetHeader className="flex-row items-center justify-between">
                <SheetTitle className="text-brand-gold">{translate("navMenu")}</SheetTitle>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-brand-navy-foreground hover:bg-brand-gold/10 hover:text-brand-gold"
                  >
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm font-medium">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(navLinkClass, pathname === "/" && navLinkActiveClass)}
                >
                  {translate("navHome")}
                </Link>

                {showServicesMenu && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      aria-expanded={mobileServicesOpen}
                      className={cn(
                        navLinkClass,
                        "flex w-full items-center justify-between",
                        mobileServicesOpen && navLinkActiveClass,
                      )}
                    >
                      {translate("navServices")}
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-1 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10">
                        <ServicesNavList
                          onNavigate={() => setMobileOpen(false)}
                          className="w-full grid-cols-1"
                          scrollable={false}
                        />
                      </div>
                    )}
                  </div>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(navLinkClass, pathname === link.href && navLinkActiveClass)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
