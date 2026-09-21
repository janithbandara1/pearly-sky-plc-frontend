"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/i18n/language-context";
import { getJob, getTranslatedJob } from "@/lib/content/jobs";

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";

const applySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(6, "Please enter a valid phone number."),
  message: z.string().trim().min(10, "Tell us a little about yourself (min. 10 characters)."),
});

type ApplyFormValues = z.infer<typeof applySchema>;

export default function JobApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const { translate } = useLanguage();
  const rawJob = getJob(jobId);
  const job = rawJob ? getTranslatedJob(rawJob, translate) : null;
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormValues>({ resolver: zodResolver(applySchema), mode: "onChange" });

  if (!job) notFound();

  const onSubmit = (values: ApplyFormValues) => {
    const subject = encodeURIComponent(`Job application: ${job.title}`);
    const body = encodeURIComponent(
      `Role: ${job.title}\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}\n\n(Please remember to attach your CV/resume before sending.)`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    reset();
  };

  return (
    <main className="flex-1">
      <PageHero image="/images/careers/hero.webp" title={translate("careersApplyPageTitle")} subtitle={job.title} hidePriceSelector />

      <section className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <p className="mb-6 rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          {translate("careersApplyInstructions")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label>{translate("careersRoleLabel")}</Label>
            <Input value={job.title} disabled />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="apply-name">{translate("contactNameLabel")}</Label>
            <Input id="apply-name" placeholder={translate("contactNamePlaceholder")} aria-invalid={!!errors.name} {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="apply-email">{translate("contactEmailLabel")}</Label>
            <Input id="apply-email" type="email" placeholder={translate("contactEmailPlaceholder")} aria-invalid={!!errors.email} {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="apply-phone">{translate("contactPhoneLabel")}</Label>
            <Input id="apply-phone" type="tel" placeholder={translate("contactPhonePlaceholder")} aria-invalid={!!errors.phone} {...register("phone")} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="apply-message">{translate("contactMessageLabel")}</Label>
            <Textarea id="apply-message" rows={5} placeholder={translate("contactMessagePlaceholder")} aria-invalid={!!errors.message} {...register("message")} />
            {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-navy text-brand-navy-foreground hover:bg-brand-navy/90">
            {translate("careersApplySend")}
          </Button>

          {sent && (
            <p className="text-sm text-muted-foreground">
              Your email app should have opened with your application pre-filled — attach your CV and hit send.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
