"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { translate } = useLanguage();
  const { status, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={36}
            height={36}
            className="rounded-full bg-brand-navy"
            priority
          />
          <span className="hidden font-semibold tracking-wide sm:inline">Pearly Sky</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/services" className="hover:text-brand-gold">
            {translate("navServices")}
          </Link>
          <Link href="#contact" className="hover:text-brand-gold">
            {translate("navContact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {status === "authenticated" ? (
            <>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-brand-navy-foreground hover:bg-brand-gold/10"
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
                className="border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10"
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
        </div>
      </div>
    </header>
  );
}
