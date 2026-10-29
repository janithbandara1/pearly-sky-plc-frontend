"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// zod/mini, as in home-contact-us.tsx — the full build is ~70 KiB heavier.
import * as z from "zod/mini";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact-api";
import { ApiError } from "@/lib/api";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/** Built per language so the validation messages are shown in it. */
const makeContactSchema = (t: Translate) =>
  z.object({
    name: z.string().check(z.trim(), z.minLength(2, t("form.errorName"))),
    email: z.pipe(z.string().check(z.trim()), z.email(t("form.errorEmail"))),
    phone: z.string().check(z.trim(), z.minLength(6, t("form.errorPhone"))),
    message: z.string().check(z.trim(), z.minLength(10, t("contactForm.errorMessage"))),
  });

type ContactFormValues = z.infer<ReturnType<typeof makeContactSchema>>;

const fieldClass =
  "w-full rounded-xl border border-white/20 bg-navy-900 px-4 py-3.5 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400/70";

/**
 * "Get a Free Quote Today" on the services page: the contact us form, sent
 * through the same /contact endpoint as contact-form-panel.tsx.
 */
export function ServicesContactForm() {
  const { translateGlobal: t } = useLanguage();
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [turnstileVisible, setTurnstileVisible] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const schema = useMemo(() => makeContactSchema(t), [t]);

  // Below the fold — defer Turnstile's script until the form is near view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTurnstileVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async ({ name, email, phone, message }: ContactFormValues) => {
    if (!turnstileToken) {
      setSendError(t("form.verify"));
      return;
    }
    setSendError(null);
    try {
      await sendContactMessage({
        name,
        email,
        phone,
        message: `Subject: Services page enquiry (global site)\n\n${message.trim()}`,
        turnstileToken,
      });
      toast.success(t("contactForm.successTitle"), { description: t("contactForm.successText") });
      reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : t("contactForm.sendFailed"));
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="quote-section"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-b from-navy-800 to-navy-900 py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-7">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              {t("svc.form.eyebrow")}
            </span>
            <h2 className="mb-2 mt-1 font-display text-3xl font-bold text-white sm:text-4xl">{t("svc.form.title")}</h2>
            <p className="text-sm text-slate-400">{t("svc.form.description")}</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder={t("contactForm.namePlaceholder")}
                  aria-label={t("contactForm.fullName")}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={fieldClass}
                  {...register("name")}
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t("contactForm.emailPlaceholder")}
                  aria-label={t("form.emailAddress")}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={fieldClass}
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t("contactForm.phonePlaceholder")}
                    aria-invalid={!!errors.phone}
                    className="h-12 text-slate-200"
                  />
                )}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone.message}</p>}
            </div>

            <div>
              <textarea
                rows={4}
                placeholder={t("contactForm.messagePlaceholder")}
                aria-label={t("form.message")}
                aria-invalid={!!errors.message}
                className={`${fieldClass} resize-none`}
                {...register("message")}
              />
              {errors.message && <p className="mt-1 text-[11px] text-red-400">{errors.message.message}</p>}
            </div>

            {turnstileVisible && (
              <TurnstileWidget
                ref={turnstileRef}
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                className="flex justify-center"
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? t("common.sending") : t("contactForm.send")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {sendError && <p className="text-xs text-red-400">{sendError}</p>}
          </form>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src="/images/hero/hero-2.webp"
              alt={t("quote.imageAlt")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 font-script text-3xl text-gold-400">{t("svc.form.script")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
