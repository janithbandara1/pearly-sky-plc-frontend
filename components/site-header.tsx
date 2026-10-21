"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, FileText, LogOut, Menu, UserRound, XIcon, Sun, Moon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { IS_GLOBAL_SITE } from "@/lib/countries/config";
import { buildLocalePath } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { ServicesNavList } from "@/components/services-nav-list";
import { LanguageSelect } from "@/components/language-select";
import { Button } from "@/components/ui/button";
import { usePoolTheme } from "@/lib/pool-theme-context";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { id } from "zod/v4/locales";

//test cmd
const navLinkClass =
  "rounded-lg p-1 text-sm font-medium text-brand-navy-foreground transition-colors hover:bg-brand-gold/10 hover:text-brand-gold";
const navLinkActiveClass = "bg-brand-gold/10 text-brand-gold";

export interface SiteHeaderProps {
  /** Links shown after "Home" (and after the Services menu, if shown). Defaults to the marketing site's nav. */
  navLinks?: { href: string; label: string }[];
  /** Set to false to hide the Services mega-menu, e.g. on dashboard-style pages. */
  showServicesMenu?: boolean;
}

export function SiteHeader({ navLinks: navLinksProp, showServicesMenu: showServicesMenuProp = true }: SiteHeaderProps = {}) {
  // The global gateway has no catalog or accounts behind it at all — never
  // show the services menu or login/signup/account UI there.
  const showServicesMenu = showServicesMenuProp && !IS_GLOBAL_SITE;
  const { translate, language } = useLanguage();
  /**
   * Internal nav links are built with this instead of a raw path — a plain
   * unprefixed href (e.g. "/") relies on proxy.ts's cookie-based redirect to
   * land back on the current language, which is one extra round trip that
   * can resolve to the wrong language (or momentarily render a stale cached
   * shell for the wrong one, e.g. the switcher still showing English right
   * after landing on /fr). Pointing straight at `/{language}/...` matches
   * what the switcher itself shows and skips that round trip entirely.
   */
  const localeHref = (href: string) => buildLocalePath(href, language);
  const { status, logout } = useAuth();
  const pathname = usePathname();
  const isPoolPage = Boolean(pathname && (pathname.includes("pool-cleaning") || pathname.includes("pool") || pathname.includes("precision-pressure") || pathname.includes("carpet-upholstery-cleaning")));
  const { theme: poolTheme, toggleTheme: togglePoolTheme } = usePoolTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const accountDesktopRef = useRef<HTMLDivElement>(null);
  const accountMobileRef = useRef<HTMLDivElement>(null);

  const defaultNavLinks = IS_GLOBAL_SITE ? [
    { href: "/about-us", label: translate("navAbout") },
    { href: "/our-services", label: translate("navServices") },
    { href: "/our-customers", label: translate("navCustomers") },
    { href: "/our-locations", label: translate("navLocations") },
    { href: "/blog", label: translate("navBlog") },
    { href: "/careers", label: translate("navCareers") },
    { href: "/contact-us", label: translate("navContact") },
  ]:[
    { href: "/about-us", label: translate("navAbout") },
    { href: "/our-customers", label: translate("navCustomers") },
    { href: "/our-locations", label: translate("navLocations") },
    { href: "/blog", label: translate("navBlog") },
    // Careers is France-only hiring, but shown in nav everywhere — the UK/Sri
    // Lanka sites' /careers renders a "no openings" notice instead of a listing
    // (see IS_CAREERS_ENABLED), rather than hiding the link entirely.
    { href: "/careers", label: translate("navCareers") },
    { href: "/contact-us", label: translate("navContact") },
  ] ;

  

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
      const target = event.target as Node;
      if (accountDesktopRef.current?.contains(target)) return;
      if (accountMobileRef.current?.contains(target)) return;
      setAccountOpen(false);
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

  let textContent = [{id:1,text:"Pearly Sky Eco Luxury Cleaning Service"},{id:2,text:"Pearly Sky Eco Luxury Cleaning Service"}];
  const marqueeList=[...textContent]

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-1 px-1 ">

        <Link href={localeHref("/")} className="min-w-0 flex-1 md:flex-none md:w-[30%] lg:w-[16%] flex items-center gap-3.5 overflow-hidden">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={40}
            height={40}
            className="rounded-full bg-brand-navy z-20"
            priority
          /> 

          <div className="w-max-[50px] md:w-max-[150px] lg:w-max-[50px] relative ml-2  animate-marquee-header group-hover:[animation-play-state:paused]">
           {/* The second copy only completes the marquee loop; its text comes
               from CSS (attr(data-text)) so the logo link's anchor text isn't
               the name twice. */}
           {marqueeList.map((text,index)=>(
            <span
              key={index}
              aria-hidden={index > 0 || undefined}
              data-text={index > 0 ? text.text : undefined}
              className="inline w-max z-10 text-sm sm:text-base px-[2px] font-semibold whitespace-nowrap text-white before:content-[attr(data-text)]"
            >
              {index === 0 ? text.text : null}
              </span>
            ))}
              
          </div>

        </Link>

        <nav className="hidden bg-brand-navy max-w-full border border-[#C9B678] px-2 py-1 rounded-3xl items-center gap-1 lg:flex">
          <Link
            href={localeHref("/")}
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
              href={localeHref(link.href)}
              className={cn(navLinkClass, pathname === link.href && navLinkActiveClass)}
            >
              {link.label}
            </Link>
          ))}

          {!IS_GLOBAL_SITE && (status === "authenticated" ? (
            <div className="relative ml-3" ref={accountDesktopRef}>
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
                    className="flex w-full items-center gap-2.5 rounded-3xl p-2 text-left text-sm text-destructive hover:bg-muted"
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
                className="border-brand-gold rounded-2xl ml-3 bg-transparent font-semibold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
              >
                <Link href="/login">{translate("navLogin")}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-brand-gold rounded-2xl text-brand-navy hover:bg-brand-gold/90"
              >
                <Link href="/signup">{translate("navSignup")}</Link>
              </Button>
            </>
          ))}
        </nav>


        <div className="flex items-center gap-2 sm:gap-3 ">
          {/* Light Mode / Dark Mode Toggle on Site Header strictly for pool-cleaning */}
          {isPoolPage && (
            <button
              type="button"
              onClick={togglePoolTheme}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md transition-all border cursor-pointer",
                poolTheme === "dark"
                  ? "bg-[#121e2d] text-[#c9a858] border-[#c9a858]/60 hover:bg-[#121e2d]/80 hover:border-[#c9a858]"
                  : "bg-white text-[#1B2E4B] border-[#C5A059] hover:bg-[#F5F5DC]"
              )}
              title={poolTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark/light mode"
            >
              {poolTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 text-[#c9a858]" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-[#C5A059]" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>
          )}

          <div className="flex items-center gap-1.5 ">
            <LanguageSelect className="h-8  min-h-[48px] py-3 gap-1.5 border-brand-gold/70 bg-transparent  text-xs" />
          </div>

          {!IS_GLOBAL_SITE && status === "authenticated" && (
            <div className="md:hidden lg:hidden flex">
              <div className="relative" ref={accountMobileRef}>
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
            </div>
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
                className="px-4 py-3 min-h-[48px] min-w-[48px] text-brand-navy-foreground hover:bg-brand-gold/10 lg:hidden"
                aria-label={translate("navMenu")}
              >
                <Menu className="h-5 w-5 " />
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
                  href={localeHref("/")}
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
                    href={localeHref(link.href)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(navLinkClass, pathname === link.href && navLinkActiveClass)}
                  >
                    {link.label}
                  </Link>
                ))}

                {isPoolPage && (
                  <div className="my-2 border-t border-brand-gold/20 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        togglePoolTheme();
                        setMobileOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold border transition-all",
                        poolTheme === "dark"
                          ? "bg-[#121e2d] text-[#c9a858] border-[#c9a858]/40"
                          : "bg-white text-[#1B2E4B] border-[#C5A059]"
                      )}
                    >
                      <span>{poolTheme === "dark" ? "Theme: Dark Mode" : "Theme: Light Mode"}</span>
                      {poolTheme === "dark" ? (
                        <Sun className="h-4 w-4 text-[#c9a858]" />
                      ) : (
                        <Moon className="h-4 w-4 text-[#C5A059]" />
                      )}
                    </button>
                  </div>
                )}

                {!IS_GLOBAL_SITE && status !== "authenticated" && (
                  <div className="mt-2 flex flex-col gap-2">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-brand-gold rounded-lg bg-transparent font-semibold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
                    >
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        {translate("navLogin")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-brand-gold rounded-lg text-brand-navy hover:bg-brand-gold/90"
                    >
                      <Link href="/signup" onClick={() => setMobileOpen(false)}>
                        {translate("navSignup")}
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
