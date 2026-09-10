"use client";
import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { useLanguage } from "@/lib/i18n/language-context";

export default function SignupPage() {
  const{translate}= useLanguage()
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky Cleaning"
            width={24}
            height={24}
            className="rounded-full"
          />
          Pearly Sky Cleaning
        </Link>
        <div className="">
                  <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">
                    ← {translate("navHome")}
                  </Link>
                </div>
        <SignupForm />
      </div>
    </div>
  );
}
