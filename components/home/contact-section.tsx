"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";
const HOTLINE = "+33 743 708 780";
const WHATSAPP_URL = "https://wa.me/33743708780";

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com", label: "TikTok", Icon: AiOutlineTikTok },
  { href: "https://www.facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com", label: "Instagram", Icon: AiFillInstagram },
  { href: "https://x.com", label: "X", Icon: RiTwitterXFill },
  { href: "https://www.youtube.com", label: "YouTube", Icon: FaYoutube },
  { href: "https://www.linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
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
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = (values: ContactFormValues) => {
    const subject = encodeURIComponent(`New inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
        {translate("contactTitle")}
      </h2>

      <div className="grid gap-0 overflow-hidden rounded-2xl border-2 border-brand-gold lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 sm:p-8" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="contact-name">{translate("contactNameLabel")}</Label>
            <Input
              id="contact-name"
              placeholder={translate("contactNamePlaceholder")}
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email">{translate("contactEmailLabel")}</Label>
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
            <Label htmlFor="contact-phone">{translate("contactPhoneLabel")}</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder={translate("contactPhonePlaceholder")}
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message">{translate("contactMessageLabel")}</Label>
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
              Your email app should have opened with your message pre-filled — just hit send.
            </p>
          )}
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
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
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
                <a href={`tel:${HOTLINE.replace(/\s/g, "")}`}>
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
    </section>
  );
}
