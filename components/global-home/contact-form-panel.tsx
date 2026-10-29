"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// zod/mini, as in home-contact-us.tsx — the full build is ~70 KiB heavier.
import * as z from "zod/mini";
import {
  ArrowRight,
  CircleHelp,
  Handshake,
  MessagesSquare,
  Network,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage } from "@/lib/contact-api";
import { ApiError } from "@/lib/api";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

const FAQS: { questionKey: GlobalKey; answerKey: GlobalKey }[] = [
  { questionKey: "faq.q1", answerKey: "faq.a1" },
  { questionKey: "faq.q2", answerKey: "faq.a2" },
  { questionKey: "faq.q3", answerKey: "faq.a3" },
];

const PARTNER_BADGES: { Icon: typeof Zap; labelKey: GlobalKey }[] = [
  { Icon: Zap, labelKey: "partner.fast" },
  { Icon: Users, labelKey: "partner.support" },
  { Icon: Network, labelKey: "partner.network" },
  { Icon: ShieldCheck, labelKey: "partner.trusted" },
];

/** Built per language so the validation messages are shown in it. */
const makeContactSchema = (t: Translate) =>
  z.object({
    name: z.string().check(z.trim(), z.minLength(2, t("form.errorName"))),
    email: z.pipe(z.string().check(z.trim()), z.email(t("form.errorEmail"))),
    phone: z.string().check(z.trim(), z.minLength(6, t("form.errorPhone"))),
    message: z.string().check(z.trim(), z.minLength(10, t("contactForm.errorMessage"))),
  });

type ContactFormValues = z.infer<ReturnType<typeof makeContactSchema>>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 transition-colors placeholder:text-slate-400 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400";

/**
 * The global gateway's contact form plus the partnership and FAQ cards beside
 * it. Sends through the same /contact endpoint as the country sites, with the
 * origin prefixed to the message — in English, since the team reads it, not
 * the visitor.
 */
export function ContactFormPanel() {
  const { translateGlobal: t } = useLanguage();
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const faqRef = useRef<HTMLDialogElement>(null);
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
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const startPartnershipEnquiry = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setFocus("name");
  };

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
        message: `Subject: Contact page enquiry (global site)\n\n${message.trim()}`,
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
    <section ref={sectionRef} id="contact-form" className="scroll-mt-20 bg-navy-900 px-4 py-14 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 text-navy-900 shadow-2xl sm:p-8 lg:col-span-7">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("contactForm.title")}</h2>
            <p className="mt-1 text-xs text-slate-600">{t("contactForm.subtitle")}</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="gc-name" label={t("contactForm.fullName")} error={errors.name?.message}>
                <input
                  id="gc-name"
                  type="text"
                  placeholder={t("contactForm.namePlaceholder")}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={inputClass}
                  {...register("name")}
                />
              </Field>
              <Field id="gc-email" label={t("form.emailAddress")} error={errors.email?.message}>
                <input
                  id="gc-email"
                  type="email"
                  placeholder={t("contactForm.emailPlaceholder")}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  {...register("email")}
                />
              </Field>
            </div>

            <Field id="gc-phone" label={t("form.phoneNumber")} error={errors.phone?.message}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="gc-phone"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={t("contactForm.phonePlaceholder")}
                    aria-invalid={!!errors.phone}
                    className="h-10 rounded-xl bg-white text-slate-800"
                  />
                )}
              />
            </Field>

            <Field id="gc-message" label={t("form.message")} error={errors.message?.message}>
              <textarea
                id="gc-message"
                rows={4}
                placeholder={t("contactForm.messagePlaceholder")}
                aria-invalid={!!errors.message}
                className={`${inputClass} resize-none`}
                {...register("message")}
              />
            </Field>

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
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-navy-900 shadow-md transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isSubmitting ? t("common.sending") : t("contactForm.send")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {sendError && <p className="text-xs text-red-600">{sendError}</p>}
          </form>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-5 rounded-3xl border border-gold-500/30 bg-navy-800 p-6 text-white shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/40 bg-gold-500/20 text-gold-400 shadow-md">
              <Handshake className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{t("partner.title")}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{t("partner.description")}</p>
            </div>
            <button
              type="button"
              onClick={startPartnershipEnquiry}
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-navy-900 transition-all hover:brightness-110"
            >
              <span>{t("partner.cta")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <ul className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-300">
              {PARTNER_BADGES.map(({ Icon, labelKey }) => (
                <li key={labelKey} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-gold-400" />
                  <span>{t(labelKey)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 text-navy-900 shadow-xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/20 text-gold-700">
              <MessagesSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{t("faq.title")}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{t("faq.description")}</p>
            </div>
            <button
              type="button"
              onClick={() => faqRef.current?.showModal()}
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-navy-900 transition-all hover:brightness-110"
            >
              <span>{t("faq.view")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={faqRef}
        aria-labelledby="gc-faq-title"
        onClick={(event) => event.target === faqRef.current && faqRef.current?.close()}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl border border-gold-500/30 bg-navy-800 p-6 text-slate-100 shadow-2xl backdrop:bg-navy-900/80 backdrop:backdrop-blur-md"
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 id="gc-faq-title" className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <CircleHelp className="h-5 w-5 text-gold-400" />
            {t("faq.title")}
          </h3>
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={() => faqRef.current?.close()}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <dl className="space-y-3 text-xs">
          {FAQS.map(({ questionKey, answerKey }) => (
            <div key={questionKey} className="rounded-xl border border-slate-800 bg-navy-700 p-3">
              <dt className="mb-1 font-bold text-gold-400">{t(questionKey)}</dt>
              <dd className="text-slate-300">{t(answerKey)}</dd>
            </div>
          ))}
        </dl>
      </dialog>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] font-bold text-navy-900">
        {label} *
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
