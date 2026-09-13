"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { ApiError, useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n/language-context";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { signup } = useAuth();
  const { translate } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError(translate("signupErrorPasswordMismatch"));
      return;
    }
    if (!agreedToTerms) {
      setError(translate("signupErrorTermsRequired"));
      return;
    }
    setError(null);
    setPending(true);
    try {
      await signup({
        firstName,
        lastName: lastName || undefined,
        email,
        contact: phone || undefined,
        password,
      });
      router.push("/bookings");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : translate("signupGenericError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{translate("signupTitle")}</CardTitle>
          <CardDescription>
            {translate("signupDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="firstName">{translate("signupFirstName")}</FieldLabel>
                  <Input
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">{translate("signupLastName")}</FieldLabel>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">{translate("signupEmail")}</FieldLabel>
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
                <FieldLabel htmlFor="phone">{translate("signupPhone")}</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel htmlFor="password">{translate("signupPassword")}</FieldLabel>
                    <PasswordInput
                      id="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      {translate("signupConfirmPassword")}
                    </FieldLabel>
                    <PasswordInput
                      id="confirmPassword"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  {translate("signupPasswordHelper")}
                </FieldDescription>
              </Field>
              <Field>
                <label
                  htmlFor="agreedToTerms"
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    id="agreedToTerms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked === true)
                    }
                  />
                  <span className="text-muted-foreground">
                    {translate("signupAgreeText")}{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="underline underline-offset-4"
                    >
                      {translate("signupTerms")}
                    </Link>{" "}
                    {translate("signupAnd")}{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="underline underline-offset-4"
                    >
                      {translate("signupPrivacy")}
                    </Link>
                    .
                  </span>
                </label>
              </Field>
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button type="submit" disabled={pending || !agreedToTerms}>
                  {pending ? translate("signupPending") : translate("signupSubmit")}
                </Button>
                <FieldDescription className="text-center">
                  {translate("signupAlreadyAccount")}{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    {translate("signupLoginLink")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

