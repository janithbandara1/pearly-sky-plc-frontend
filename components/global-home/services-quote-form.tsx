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

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/** `value` is the English wording that goes into the message the team reads; visitors see `labelKey`. */
const PROPERTY_SIZES: { value: string; labelKey: GlobalKey }[] = [
  { value: "Under 50m²", labelKey: "svc.form.size1" },
  { value: "50m² - 100m²", labelKey: "svc.form.size2" },
  { value: "100m² - 200m²", labelKey: "svc.form.size3" },
  { value: "200m² - 400m²", labelKey: "svc.form.size4" },
  { value: "400m² + (Luxury Estate)", labelKey: "svc.form.size5" },
];

/** Built per language so the validation messages are shown in it. */
const makeQuoteSchema = (t: Translate) =>
  z.object({
    name: z.string().check(z.trim(), z.minLength(2, t("form.errorName"))),
    email: z.pipe(z.string().check(z.trim()), z.email(t("form.errorEmail"))),
    phone: z.string().check(z.trim(), z.minLength(6, t("form.errorPhone"))),
    size: z.string(),
    date: z.string(),
  });

type QuoteFormValues = z.infer<ReturnType<typeof makeQuoteSchema>>;

const fieldClass =
  "w-full rounded-xl border border-white/20 bg-navy-900 px-4 py-3.5 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400/70";

interface ServicesQuoteFormProps {
  /** The services on offer, in the order shown in the select, titled in the visitor's language. */
  services: { id: string; title: string }[];
  /** English title per service id, for the enquiry the team reads. */
  englishTitles: Record<string, string>;
  /** Id of the chosen service, or "". */
  serviceId: string;
  onServiceChange: (serviceId: string) => void;
}

/**
 * "Get a Free Quote Today". The gateway has no backend of its own, so the
 * enquiry goes through the same /contact endpoint as the country sites'
 * contact form (see quote.tsx), with the details folded into the message.
 */
export function ServicesQuoteForm({ services, englishTitles, serviceId, onServiceChange }: ServicesQuoteFormProps) {
  const { translateGlobal: t } = useLanguage();
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [turnstileVisible, setTurnstileVisible] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState(false);
  const schema = useMemo(() => makeQuoteSchema(t), [t]);

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
    defaultValues: { name: "", email: "", phone: "", size: "", date: "" },
  });

  const onSubmit = async ({ name, email, phone, size, date }: QuoteFormValues) => {
    if (!serviceId) {
      setServiceError(true);
      return;
    }
    if (!turnstileToken) {
      setSendError(t("form.verify"));
      return;
    }
    setSendError(null);
    const body = [
      "Free quote request (global site)",
      `Service: ${englishTitles[serviceId] ?? serviceId}`,
      size && `Property size: ${size}`,
      date && `Preferred date: ${date}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendContactMessage({ name, email, phone, message: body, turnstileToken });
      const shown = services.find((service) => service.id === serviceId)?.title ?? serviceId;
      toast.success(t("form.successTitle"), { description: t("form.successQuote", { service: shown }) });
      reset();
      onServiceChange("");
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : t("form.sendFailed"));
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
                <div className="relative">
                  <select
                    value={serviceId}
                    onChange={(event) => {
                      onServiceChange(event.target.value);
                      setServiceError(false);
                    }}
                    aria-label={t("form.service")}
                    aria-invalid={serviceError}
                    className={`${fieldClass} cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>
                      {t("form.selectService")}
                    </option>
                    {services.map(({ id, title }, index) => (
                      <option key={id} value={id}>
                        {index + 1}. {title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
                {serviceError && <p className="mt-1 text-[11px] text-red-400">{t("form.errorService")}</p>}
              </div>
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <select
                  aria-label={t("form.propertySizeLabel")}
                  defaultValue=""
                  className={`${fieldClass} cursor-pointer appearance-none`}
                  {...register("size")}
                >
                  <option value="" disabled>
                    {t("form.propertySize")}
                  </option>
                  {PROPERTY_SIZES.map(({ value, labelKey }) => (
                    <option key={value} value={value}>
                      {t(labelKey)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="date"
                aria-label={t("form.preferredDate")}
                className={`${fieldClass} scheme-dark cursor-pointer`}
                {...register("date")}
              />
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
                      className="h-12 text-slate-200"
                    />
                  )}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone.message}</p>}
              </div>
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
              <span>{isSubmitting ? t("common.sending") : t("form.send")}</span>
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
