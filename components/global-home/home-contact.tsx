"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// zod/mini, as in home-contact-us.tsx — the full build is ~70 KiB heavier.
import * as z from "zod/mini";
import { ArrowRight, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact-api";
import { ApiError } from "@/lib/api";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";

/** `title` is shown to the visitor; `englishTitle` goes into the enquiry the team reads. */
export interface QuoteServiceOption {
  value: string;
  title: string;
  englishTitle: string;
}

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/** Built per language so the validation messages are shown in it. */
const makeQuoteSchema = (t: Translate) =>
  z.object({
    service: z.string().check(z.minLength(1, t("form.errorService"))),
    name: z.string().check(z.trim(), z.minLength(2, t("form.errorName"))),
    email: z.pipe(z.string().check(z.trim()), z.email(t("form.errorEmail"))),
    phone: z.string().check(z.trim(), z.minLength(6, t("form.errorPhone"))),
    propertySize: z.string(),
    date: z.string(),
    message: z.string().check(z.trim()),
  });

type QuoteFormValues = z.infer<ReturnType<typeof makeQuoteSchema>>;

const fieldClass =
  "w-full rounded-xl border border-slate-700 bg-navy-900/80 px-4 py-3 text-xs text-slate-200 transition-colors placeholder:text-slate-500 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400/70";

const BOOKING_STEPS = [
  { titleKey: "quote.step1.title", descriptionKey: "quote.step1.description" },
  { titleKey: "quote.step2.title", descriptionKey: "quote.step2.description" },
  { titleKey: "quote.step3.title", descriptionKey: "quote.step3.description" },
  { titleKey: "quote.step4.title", descriptionKey: "quote.step4.description" },
] as const satisfies readonly { titleKey: GlobalKey; descriptionKey: GlobalKey }[];

/**
 * "Get a Free Quote" on the global home page: a quote form (sent through the
 * same /contact endpoint as contact-form-panel.tsx) beside the booking steps.
 */
export function GlobalHomeContact({ services }: { services: QuoteServiceOption[] }) {
  const { translateGlobal: t } = useLanguage();
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [turnstileVisible, setTurnstileVisible] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [minDate, setMinDate] = useState("");
  const schema = useMemo(() => makeQuoteSchema(t), [t]);

  // Set after mount so the server and client markup agree.
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

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
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: "", name: "", email: "", phone: "", propertySize: "", date: "", message: "" },
  });

  const onSubmit = async ({ service, name, email, phone, propertySize, date, message }: QuoteFormValues) => {
    if (!turnstileToken) {
      setSendError(t("form.verify"));
      return;
    }
    setSendError(null);
    const selected = services.find(({ value }) => value === service);
    const details = [
      `Service: ${selected?.englishTitle ?? service}`,
      propertySize && `Property size: ${propertySize} m²`,
      date && `Preferred date: ${date}`,
    ].filter(Boolean);
    try {
      await sendContactMessage({
        name,
        email,
        phone,
        message: `Subject: Free quote request (global site)\n\n${details.join("\n")}${message.trim() ? `\n\n${message.trim()}` : ""}`,
        turnstileToken,
      });
      toast.success(t("form.successTitle"), {
        description: t("form.successQuote", { service: selected?.title ?? service }),
      });
      reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : t("form.sendFailed"));
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <section ref={sectionRef} id="quote" className="relative scroll-mt-20 bg-navy-800 px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-700/60 p-6 shadow-2xl lg:col-span-4 lg:min-h-full">
          <Image
            src="/images/global-home/hero-villa.webp"
            alt={t("quote.imageAlt")}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/40 to-transparent" />
          <div className="relative z-10">
            <span className="gold-gradient-bg mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
              {t("quote.badge")}
            </span>
            <h2 className="font-display text-2xl font-bold text-white">{t("quote.title")}</h2>
            <p className="mt-1 text-xs text-slate-300">{t("quote.subtitle")}</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border-gold-500/30! p-6 sm:p-8 lg:col-span-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <input
                type="text"
                placeholder={t("form.yourName")}
                aria-label={t("form.yourName")}
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
                placeholder={t("form.emailAddress")}
                aria-label={t("form.emailAddress")}
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={fieldClass}
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>}
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
                    placeholder={t("form.phoneNumber")}
                    aria-invalid={!!errors.phone}
                    className="h-11 text-slate-200"
                  />
                )}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone.message}</p>}
            </div>

            <div>
              <div className="relative">
                <select
                  aria-label={t("form.service")}
                  aria-invalid={!!errors.service}
                  className={`${fieldClass} appearance-none pr-10`}
                  {...register("service")}
                >
                  <option value="">{t("form.selectService")}</option>
                  {services.map(({ value, title }) => (
                    <option key={value} value={value}>
                      {title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.service && <p className="mt-1 text-[11px] text-red-400">{errors.service.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                inputMode="numeric"
                min={1}
                placeholder={t("form.propertySize")}
                aria-label={t("form.propertySizeLabel")}
                className={fieldClass}
                {...register("propertySize")}
              />
              <input
                type="date"
                min={minDate}
                aria-label={t("form.preferredDate")}
                className={`${fieldClass} text-slate-300`}
                {...register("date")}
              />
            </div>

            <textarea
              rows={3}
              placeholder={t("form.messageOptional")}
              aria-label={t("form.messageOptional")}
              className={`${fieldClass} resize-none`}
              {...register("message")}
            />

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
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold text-navy-900 shadow-lg shadow-gold-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? t("common.sending") : t("form.send")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {sendError && <p className="text-xs text-red-400">{sendError}</p>}
          </form>
        </div>

        <div className="glass-card flex flex-col justify-center rounded-3xl border border-slate-700/60 p-6 lg:col-span-3">
          <h3 className="mb-6 font-display text-lg font-bold text-white">{t("quote.steps.title")}</h3>
          <ol className="relative space-y-6">
            <span aria-hidden className="absolute bottom-4 left-4 top-4 w-0.5 bg-slate-700" />
            {BOOKING_STEPS.map(({ titleKey, descriptionKey }, index) => (
              <li key={titleKey} className="relative flex items-start gap-4">
                <span className="gold-gradient-bg flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-navy-900 shadow-md">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{t(titleKey)}</h4>
                  <p className="mt-0.5 text-[11px] text-slate-400">{t(descriptionKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
