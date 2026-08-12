"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

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
        <LoginForm
          description="Enter your email below to login to your account"
          onLogin={async (email, password) => {
            await login(email, password);
            router.push("/bookings");
          }}
          footer={
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
