"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <div className="relative flex flex-1 items-center justify-center p-6">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        aria-label="Go back"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
      </Button>
      <div className="w-full max-w-sm">
        <LoginForm
          description="Welcome back to Pearly Sky."
          onLogin={async (email, password) => {
            await login(email, password);
            router.push("/dashboard");
          }}
          footer={
            <>
              No account?{" "}
              <Link href="/signup" className="underline underline-offset-2">
                Sign up
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
