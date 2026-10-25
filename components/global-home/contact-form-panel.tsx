"use client";

import { useEffect, useRef, useState } from "react";
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

const SUBJECTS = [
  { value: "booking", label: "General Booking Enquiry" },
  { value: "partnership", label: "Corporate Partnership" },
  { value: "concierge", label: "Concierge & Property Care" },
  { value: "feedback", label: "Feedback or Complaint" },
];

const FAQS = [
  {
    question: "What are your support operating hours?",
    answer: "We offer 24/7 online customer support across France, UK, and Sri Lanka time zones.",
  },
  {
    question: "Are all cleaning agents pet-safe and eco-certified?",
    answer: "Yes, 100% of our solutions are Green Compass eco-certified, non-toxic, and hypoallergenic for pets and kids.",
  },
  {
    question: "How quickly can I book a team?",
    answer: "Same-day and next-day concierge bookings are available depending on your location and property size.",
  },
];

const PARTNER_BADGES = [
  { Icon: Zap, label: "Fast Response" },
  { Icon: Users, label: "Dedicated Support" },
  { Icon: Network, label: "Global Network" },
  { Icon: ShieldCheck, label: "Trusted Partner" },
];

const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your full name.")),
  email: z.pipe(z.string().check(z.trim()), z.email("Please enter a valid email address.")),
  phone: z.string().check(z.trim(), z.minLength(6, "Please enter a valid phone number.")),
  subject: z.string().check(z.minLength(1, "Please select a subject.")),
  message: z.string().check(z.trim(), z.minLength(10, "Please enter a message (min. 10 characters).")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 transition-colors placeholder:text-slate-400 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400";

/**
 * The global gateway's contact form plus the partnership and FAQ cards beside
 * it. Sends through the same /contact endpoint as the country sites (see
 * quote.tsx), with the chosen subject prefixed to the message.
 */
export function ContactFormPanel() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const faqRef = useRef<HTMLDialogElement>(null);
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
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const startPartnershipEnquiry = () => {
    setValue("subject", "partnership", { shouldValidate: true });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setFocus("name");
  };

  const onSubmit = async ({ name, email, phone, subject, message }: ContactFormValues) => {
    if (!turnstileToken) {
      setSendError("Please complete the verification challenge.");
      return;
    }
    setSendError(null);
    const subjectLabel = SUBJECTS.find((s) => s.value === subject)?.label ?? subject;
    try {
      await sendContactMessage({
        name,
        email,
        phone,
        message: `Subject: ${subjectLabel} (global site)\n\n${message.trim()}`,
        turnstileToken,
      });
      toast.success("Message sent!", { description: "Thank you for contacting Pearly Sky. Our team will get back to you shortly." });
      reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : "Failed to send your message. Please try again.");
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
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Send Us a Message</h2>
            <p className="mt-1 text-xs text-slate-600">Fill in the form and our team will get back to you shortly.</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="gc-name" label="Full Name" error={errors.name?.message}>
                <input
                  id="gc-name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={inputClass}
                  {...register("name")}
                />
              </Field>
              <Field id="gc-email" label="Email Address" error={errors.email?.message}>
                <input
                  id="gc-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  {...register("email")}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="gc-phone" label="Phone Number" error={errors.phone?.message}>
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
                      placeholder="Enter your phone number"
                      aria-invalid={!!errors.phone}
                      className="h-10 rounded-xl bg-white text-slate-800"
                    />
                  )}
                />
              </Field>
              <Field id="gc-subject" label="Subject" error={errors.subject?.message}>
                <select id="gc-subject" aria-invalid={!!errors.subject} className={inputClass} {...register("subject")}>
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {SUBJECTS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="gc-message" label="Message" error={errors.message?.message}>
              <textarea
                id="gc-message"
                rows={4}
                placeholder="Type your message here..."
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
              <span>{isSubmitting ? "Sending…" : "Send Message"}</span>
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
              <h3 className="font-display text-xl font-bold">Business Enquiries &amp; Partnerships</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                We welcome enquiries from property owners, concierge companies and corporate clients.
              </p>
            </div>
            <button
              type="button"
              onClick={startPartnershipEnquiry}
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-navy-900 transition-all hover:brightness-110"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <ul className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-300">
              {PARTNER_BADGES.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-gold-400" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 text-navy-900 shadow-xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/20 text-gold-700">
              <MessagesSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Frequently Asked Questions</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Find quick answers to common questions about our services, bookings and partnerships.
              </p>
            </div>
            <button
              type="button"
              onClick={() => faqRef.current?.showModal()}
              className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-navy-900 transition-all hover:brightness-110"
            >
              <span>View FAQ</span>
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
            Frequently Asked Questions
          </h3>
          <button
            type="button"
            aria-label="Close"
            onClick={() => faqRef.current?.close()}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <dl className="space-y-3 text-xs">
          {FAQS.map(({ question, answer }) => (
            <div key={question} className="rounded-xl border border-slate-800 bg-navy-700 p-3">
              <dt className="mb-1 font-bold text-gold-400">{question}</dt>
              <dd className="text-slate-300">{answer}</dd>
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
