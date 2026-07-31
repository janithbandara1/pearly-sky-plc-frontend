"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useStaffAuth();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/images/brand/logo.webp"
              alt="Pearly Sky"
              width={24}
              height={24}
              className="rounded-full"
            />
            Pearly Sky Cleaning
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              title="Login to your account"
              description="Enter your email below to login to your account"
              submitLabel="Login"
              footer="© 2026 Pearly Sky. All rights reserved."
              onLogin={async (email, password) => {
                await login(email, password);
                router.push("/staff/dashboard");
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/hero/hero-2.webp"
          alt="Pearly Sky cleaning service"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
