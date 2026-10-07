"use client";

import Link from "@/components/locale-link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPassword, resetPassword, verifyResetOtp } from "@/lib/auth-api";
import { ApiError } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";

type Step = "email" | "otp" | "password" | "done";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { translate } = useLanguage();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleRequestCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await forgotPassword(email);
      setStep("otp");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : translate("forgotPasswordGenericError"));
    } finally {
      setPending(false);
    }
  }

  async function handleVerifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await verifyResetOtp({ email, otp });
      setStep("password");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : translate("forgotPasswordGenericError"));
    } finally {
      setPending(false);
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError(translate("forgotPasswordMismatch"));
      return;
    }
    setError(null);
    setPending(true);
    try {
      await resetPassword({ email, otp, newPassword });
      setStep("done");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : translate("forgotPasswordGenericError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{translate("forgotPasswordTitle")}</CardTitle>
          <CardDescription>
            {step === "email" && translate("forgotPasswordEmailStep")}
            {step === "otp" && translate("forgotPasswordOtpStep")}
            {step === "password" && translate("forgotPasswordPasswordStep")}
            {step === "done" && translate("forgotPasswordDoneStep")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleRequestCode}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">{translate("forgotPasswordEmailLabel")}</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                {error && <FieldError>{error}</FieldError>}
                <Field>
                  <Button type="submit" disabled={pending}>
                    {pending ? translate("forgotPasswordSendingCode") : translate("forgotPasswordSendCode")}
                  </Button>
                  <FieldDescription className="text-center">
                    {translate("forgotPasswordRemember")}{" "}
                    <Link href="/login" className="underline underline-offset-4">
                      {translate("forgotPasswordLogInLink")}
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">{translate("forgotPasswordCodeLabel")}</FieldLabel>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center"
                  />
                </Field>
                {error && <FieldError>{error}</FieldError>}
                <Field>
                  <Button type="submit" disabled={pending}>
                    {pending ? translate("forgotPasswordVerifying") : translate("forgotPasswordVerify")}
                  </Button>
                  <FieldDescription className="text-center">
                    {translate("forgotPasswordNoCode")}{" "}
                    <button
                      type="button"
                      className="underline underline-offset-4"
                      disabled={pending}
                      onClick={async () => {
                        setError(null);
                        setOtp("");
                        setPending(true);
                        try {
                          await forgotPassword(email);
                        } catch (err) {
                          setError(
                            err instanceof ApiError
                              ? err.message
                              : translate("forgotPasswordGenericError"),
                          );
                        } finally {
                          setPending(false);
                        }
                      }}
                    >
                      {translate("forgotPasswordResend")}
                    </button>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handleResetPassword}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="newPassword">{translate("forgotPasswordNewPassword")}</FieldLabel>
                  <Input
                    id="newPassword"
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <FieldDescription>
                    {translate("forgotPasswordMinLength")}
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    {translate("forgotPasswordConfirm")}
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Field>
                {error && <FieldError>{error}</FieldError>}
                <Field>
                  <Button type="submit" disabled={pending}>
                    {pending ? translate("forgotPasswordResetting") : translate("forgotPasswordSubmit")}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === "done" && (
            <Button asChild className="w-full">
              <Link href="/login">{translate("forgotPasswordLoginButton")}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
