"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, UserRound, XIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { CUSTOMER_NAV_LINKS } from "@/lib/customer-nav";
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

export function CustomerHeader() {
  const { translate } = useLanguage();
  const { status, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

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

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher className="hidden sm:block" />

          {status === "authenticated" ? (
            <div className="relative hidden sm:block" ref={accountRef}>
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
                <div className="absolute top-full right-0 z-50 mt-1.5 flex w-48 flex-col gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow ring-1 ring-foreground/10">
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
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden border-brand-gold bg-transparent font-semibold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold sm:inline-flex"
            >
              <Link href="/login">{translate("navLogin")}</Link>
            </Button>
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
            <SheetContent side="right" className="w-[85vw] max-w-sm" showCloseButton={false}>
              <SheetHeader className="flex-row items-center justify-between">
                <SheetTitle>{translate("navMenu")}</SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon-sm">
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm font-medium">
                {CUSTOMER_NAV_LINKS.map((link) => (
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

                {status === "authenticated" ? (
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
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 hover:bg-muted"
                  >
                    {translate("navLogin")}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
