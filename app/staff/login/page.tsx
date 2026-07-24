"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useStaffAuth();

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
