"use client";

import Link from "@/components/locale-link";
import { useRef, useState } from "react";
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
import { PasswordInput } from "@/components/password-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";
import { useLanguage } from "@/lib/i18n/language-context";

export function LoginForm({
  className,
  title,
  description,
  submitLabel,
  pendingLabel,
  footer,
  onLogin,
  /** Off for the internal staff login page — the backend doesn't Turnstile-check staff logins. */
  showTurnstile = true,
  ...props
}: Omit<React.ComponentProps<"div">, "onSubmit"> & {
  title?: string;
  description?: string;
  submitLabel?: string;
  pendingLabel?: string;
  footer?: React.ReactNode;
  showTurnstile?: boolean;
  onLogin: (email: string, password: string, turnstileToken: string) => Promise<void>;
}) {
  const { translate } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const resolvedTitle = title ?? translate("loginTitle");
  const resolvedSubmitLabel = submitLabel ?? translate("loginSubmit");
  const resolvedPendingLabel = pendingLabel ?? translate("loginPending");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (showTurnstile && !turnstileToken) {
      setError(translate("loginTurnstileRequired"));
      return;
    }
    setError(null);
    setPending(true);
    try {
      await onLogin(email, password, turnstileToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : translate("loginGenericError"));
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{resolvedTitle}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{translate("loginEmailLabel")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{translate("loginPasswordLabel")}</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline underline-offset-4"
                  >
                    {translate("loginForgotPassword")}
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              {showTurnstile && (
                <Field>
                  <TurnstileWidget
                    ref={turnstileRef}
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken("")}
                    className="flex justify-center"
                  />
                </Field>
              )}
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button type="submit" disabled={pending || (showTurnstile && !turnstileToken)}>
                  {pending ? resolvedPendingLabel : resolvedSubmitLabel}
                </Button>
                {footer && (
                  <FieldDescription className="text-center">
                    {footer}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

