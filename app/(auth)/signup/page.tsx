"use client";
import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowLeft } from "lucide-react";

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
          Pearly Sky Eco Luxury Cleaning Service
        </Link>
        <div className="flex w-full  flex-col gap-6 px-4 py-5 sm:px-6 md:mx-auto">
          <Link href="/" title="Back to home" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-gold-dark hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {translate("commonBack")}
          </Link>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
