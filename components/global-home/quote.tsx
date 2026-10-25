"use client";

import { useEffect, useRef, useState } from "react";
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
import { GLOBAL_SERVICES } from "./services";

const quoteSchema = z.object({
  service: z.string().check(z.minLength(1, "Please select a service.")),
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your full name.")),
  email: z.pipe(z.string().check(z.trim()), z.email("Please enter a valid email address.")),
  phone: z.string().check(z.trim(), z.minLength(6, "Please enter a valid phone number.")),
  size: z.string(),
  date: z.string(),
  message: z.string(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const STEPS = [
  { title: "Choose Your Service", description: "Select from our 20+ premium services." },
  { title: "Get a Free Quote", description: "Quick and easy online form." },
  { title: "Confirm Your Booking", description: "Choose date and time." },
  { title: "Relax & Enjoy", description: "We take care of the rest." },
];

const fieldClass =
  "w-full rounded-xl border border-slate-700 bg-navy-900/80 px-4 py-3 text-xs text-slate-200 transition-colors placeholder:text-slate-500 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400/70";

/**
 * The gateway has no backend of its own — the enquiry goes through the same
 * /contact endpoint as the country sites' contact form (allowed cross-origin
 * via ADDITIONAL_CORS_ORIGINS), with the quote details folded into the message.
 */
export function GlobalQuote() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [turnstileVisible, setTurnstileVisible] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

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
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: "", name: "", email: "", phone: "", size: "", date: "", message: "" },
  });

  const onSubmit = async ({ service, name, email, phone, size, date, message }: QuoteFormValues) => {
    if (!turnstileToken) {
      setSendError("Please complete the verification challenge.");
      return;
    }
    setSendError(null);
    const serviceTitle = GLOBAL_SERVICES.find((s) => s.value === service)?.title ?? service;
    const body = [
      "Free quote request (global site)",
      `Service: ${serviceTitle}`,
      size && `Property size: ${size} m²`,
      date && `Preferred date: ${date}`,
      message.trim() && `Message: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendContactMessage({ name, email, phone, message: body, turnstileToken });
      toast.success("Enquiry sent!", { description: `Thank you — your ${serviceTitle} quote request is on its way.` });
      reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : "Failed to send your enquiry. Please try again.");
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <section id="quote" ref={sectionRef} className="relative scroll-mt-20 bg-navy-800 px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-slate-700/60 p-6 shadow-2xl lg:col-span-4 lg:min-h-full">
          <Image
            src="/images/hero/hero-2.webp"
            alt="Pearly Sky housekeeper preparing a luxury bedroom"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/40 to-transparent" />
          <div className="relative z-10">
            <span className="gold-gradient-bg mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">
              Instant Estimate
            </span>
            <h2 className="font-display text-2xl font-bold text-white">Get a Free Quote</h2>
            <p className="mt-1 text-xs text-slate-300">Quick, easy and no obligation</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border-gold-500/30! p-6 sm:p-8 lg:col-span-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <select aria-label="Service" aria-invalid={!!errors.service} className={fieldClass} {...register("service")}>
                <option value="" disabled>
                  Select Service
                </option>
                {GLOBAL_SERVICES.map(({ value, title }) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-[11px] text-red-400">{errors.service.message}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Your Name"
                aria-label="Your name"
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
                placeholder="Email Address"
                aria-label="Email address"
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
                    placeholder="Phone Number"
                    aria-invalid={!!errors.phone}
                    className="h-11 text-slate-200"
                  />
                )}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={0}
                placeholder="Property Size (m²)"
                aria-label="Property size in square metres"
                className={fieldClass}
                {...register("size")}
              />
              <input
                type="date"
                aria-label="Preferred date"
                className={`${fieldClass} scheme-dark`}
                {...register("date")}
              />
            </div>

            <textarea
              rows={3}
              placeholder="Message (Optional)"
              aria-label="Message"
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
              <span>{isSubmitting ? "Sending…" : "Send Enquiry"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {sendError && <p className="text-xs text-red-400">{sendError}</p>}
          </form>
        </div>

        <div className="glass-card flex flex-col justify-center rounded-3xl border-slate-700/60! p-6 lg:col-span-3">
          <h3 className="mb-6 font-display text-lg font-bold text-white">Simple Booking Process</h3>
          <ol className="relative space-y-6 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-0.5 before:bg-slate-700">
            {STEPS.map(({ title, description }, index) => (
              <li key={title} className="relative z-10 flex items-start gap-4">
                <span className="gold-gradient-bg flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-navy-900 shadow-md">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">{title}</h4>
                  <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
