"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(6, "Please enter a valid phone number."),
  message: z.string().trim().min(10, "Please enter a message (min. 10 characters)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { translate } = useLanguage();
  const { country } = useCountry();
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

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
    setSendError(null);
    try {
      await sendContactMessage(values);
      setSent(true);
      reset();
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : "Failed to send your message. Please try again.");
    }
  };

  return (
    <section id="contact" className=" w-full  scroll-mt-16 ">
      <div className="bg-[#0a1530] py-10 w-full">
        <h2 className="text-center text-white text-2xl font-bold tracking-tight  sm:text-3xl">
          {translate("contactTitle")}
        </h2>
      </div>
      
      <div className="md:py-4 md:px-8">
          <div className="grid gap-0 overflow-hidden rounded-2xl   border-2 border-brand-gold lg:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 sm:p-8" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="block text-[#002F6D] font-semibold mb-1 text-[17px]">{translate("contactNameLabel")}</Label>
              <Input
                id="contact-name"
                placeholder={translate("contactNamePlaceholder")}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-email" className="block text-[#002F6D] font-semibold mb-1 text-[17px]">{translate("contactEmailLabel")}</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder={translate("contactEmailPlaceholder")}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-phone" className="block text-[#002F6D] font-semibold mb-1 text-[17px]">{translate("contactPhoneLabel")}</Label>
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
                  />
                )}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="block text-[#002F6D] font-semibold mb-1 text-[17px]">{translate("contactMessageLabel")}</Label>
              <Textarea
                id="contact-message"
                rows={4}
                placeholder={translate("contactMessagePlaceholder")}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/90 sm:w-auto"
            >
              {translate("contactSend")}
            </Button>

            {sent && (
              <p className="text-sm text-muted-foreground">
                Your message has been sent. We&apos;ll get back to you soon.
              </p>
            )}
            {sendError && <p className="text-sm text-destructive">{sendError}</p>}
          </form>

          <div className="flex flex-col items-center justify-center gap-6 bg-brand-navy p-6 text-center text-brand-navy-foreground sm:p-8">
            <h3 className="text-sm font-bold tracking-widest">{translate("contactSupportTitle")}</h3>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-navy-foreground/70">
                {translate("contactCallAnytime")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="h-4 w-4" />
                    {translate("contactWhatsapp")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10"
                >
                  <a href={`tel:${hotline.replace(/\s/g, "")}`}>
                    <Phone className="h-4 w-4" />
                    {translate("contactHotline")}
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-navy-foreground/70">
                {translate("contactWriteToUs")}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-brand-gold bg-transparent text-brand-navy-foreground hover:bg-brand-gold/10"
              >
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail className="h-4 w-4" />
                  {translate("contactMail")}
                </a>
              </Button>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-navy-foreground/70">
                {translate("contactConnect")}
              </p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/50 text-brand-navy-foreground transition-colors hover:bg-brand-gold hover:text-brand-navy"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
