"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// zod/mini: the full "zod" build added ~70 KiB (gzip) to the home page for four string checks.
import * as z from "zod/mini";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineTikTok, AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import { ApiError } from "@/lib/api";
import { sendContactMessage } from "@/lib/contact-api";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";

const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.x, label: "X", Icon: RiTwitterXFill },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
];

const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your full name.")),
  email: z.pipe(z.string().check(z.trim()), z.email("Please enter a valid email address.")),
  phone: z.string().check(z.trim(), z.minLength(6, "Please enter a valid phone number.")),
  message: z.string().check(z.trim(), z.minLength(10, "Please enter a message (min. 10 characters).")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { translate } = useLanguage();
  const { country } = useCountry();
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [turnstileVisible, setTurnstileVisible] = useState(false);

  // This section sits below the fold on the homepage — deferring the
  // Turnstile mount until it's about to scroll into view keeps Cloudflare's
  // challenge script (and its main-thread cost) out of initial page load
  // for the common case of visitors who never reach the contact form.
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

  const office = getCountryOffice(country);
  const hotline = office.contactNo ?? "";
  const whatsappUrl = getWhatsappUrl(hotline);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (!turnstileToken) {
      setSendError("Please complete the verification challenge.");
      return;
    }
    setSendError(null);
    try {
      await sendContactMessage({ ...values, turnstileToken });
      setSent(true);
      reset();
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : "Failed to send your message. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="w-full scroll-mt-16">
      <div className="bg-[#0a1530] py-10 w-full">
        <h2 className="text-center text-brand-gold font-bold text-2xl  tracking-wide lg:text-3xl md:text-3xl">
          {translate("contactTitle")}
        </h2>
      </div>
      
      <div className="bg-[#0a1530] pb-16 px-4 md:px-8">
        <div className="w-full max-w-4xl bg-[#0a1530] mx-auto rounded-3xl overflow-hidden border-2 border-brand-gold bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0a1530] overflow-hidden space-y-5 p-8 sm:p-10" noValidate>
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="block text-white font-semibold text-sm">{translate("contactNameLabel")}</Label>
              <Input
                id="contact-name"
                placeholder={translate("contactNamePlaceholder")}
                aria-invalid={!!errors.name}
                className="bg-brand-navy/10 border border-[#C9B678]/80 text-white placeholder:text-white/60 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                {...register("name")}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="block text-white font-semibold text-sm">{translate("contactEmailLabel")}</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder={translate("contactEmailPlaceholder")}
                aria-invalid={!!errors.email}
                className="bg-brand-navy/10 border border-[#C9B678] text-white placeholder:text-white/60 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="block text-white font-semibold text-sm">{translate("contactPhoneLabel")}</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="contact-phone"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={translate("contactPhonePlaceholder")}
                    aria-invalid={!!errors.phone}
                    initialCountry={country ?? "fr"}
                    className="bg-brand-navy/10  text-white placeholder:text-white/60 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                )}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message" className="block text-white font-semibold text-sm">{translate("contactMessageLabel")}</Label>
              <Textarea
                id="contact-message"
                rows={5}
                placeholder={translate("contactMessagePlaceholder")}
                aria-invalid={!!errors.message}
                className="bg-brand-navy/10 border border-[#C9B678]/80 text-white placeholder:text-white/60 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none"
                {...register("message")}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>

            {turnstileVisible && (
              <TurnstileWidget
                ref={turnstileRef}
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                className="flex justify-center"
              />
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="bg-brand-gold p-4 text-black hover:bg-brand-gold/90 font-normal uppercase tracking-wide shadow-lg transition-all"
            >
              {translate("contactSend")}
            </Button>

            {sent && (
              <p className="text-sm text-green-600 font-medium">
                Your message has been sent. We&apos;ll get back to you soon.
              </p>
            )}
            {sendError && <p className="text-sm text-destructive">{sendError}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
