"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { translate } = useLanguage();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium decoration-none  text-muted-foreground hover:text-brand-gold">
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
        <LoginForm
          description={translate("loginDescription")}
          onLogin={async (email, password, turnstileToken) => {
            await login(email, password, turnstileToken);
            router.push("/bookings");
          }}
          footer={
            <>
              {translate("signupAlreadyAccount")} {" "}
              <Link href="/signup" className="underline underline-offset-4">
                {translate("signupSubmit")}
              </Link>
            </>
          }
        />

      </div>
    </div>
  );
}
