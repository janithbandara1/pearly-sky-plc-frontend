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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={24}
            height={24}
            className="rounded-full"
          />
          Pearly Sky Cleaning
        </Link>
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
  );
}
