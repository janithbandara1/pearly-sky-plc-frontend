"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { useStaffAuth } from "@/lib/staff-auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useStaffAuth();

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <LoginForm
          title="Login to your account"
          description="Enter your email below to login to your account"
          submitLabel="Login"
          footer="Pearly Sky admin"
          onLogin={async (email, password) => {
            await login(email, password);
            router.push("/admin");
          }}
        />
      </div>
    </div>
  );
}
