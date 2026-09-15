"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { useStaffAuth } from "@/lib/staff-auth-context";
import { useLanguage } from "@/lib/i18n/language-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useStaffAuth();
  const { translate } = useLanguage();

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
          description={translate("loginDescription")}
          footer={`© 2026 Pearly Sky. ${translate("footerRights")}`}
          onLogin={async (email, password) => {
            await login(email, password);
            router.push("/staff/dashboard");
          }}
        />
      </div>
    </div>
  );
}
