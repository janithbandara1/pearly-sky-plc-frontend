"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// zod/mini, as in contact-form-panel.tsx — the full build is ~70 KiB heavier.
import * as z from "zod/mini";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BrainCircuit,
  Check,
  CircleCheck,
  Clock,
  ListChecks,
  RotateCcw,
  Send,
  ShieldCheck,
  Trophy,
  Upload,
  X,
} from "lucide-react";
import { sendContactMessage } from "@/lib/contact-api";
import { ApiError } from "@/lib/api";
import {
  CHECKOUT_ATTACHMENT_MAX_BYTES,
  attachmentContentType,
  uploadCheckoutAttachment,
} from "@/lib/upload-api";
import { PhoneInput } from "@/components/phone-input";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile";
import { useLanguage } from "@/lib/i18n/language-context";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { cn } from "@/lib/utils";
import {
  CAREER_JOBS,
  GENERAL_APPLICATION,
  QUIZ_CORRECT,
  QUIZ_MARKS_PER_QUESTION,
  QUIZ_OPTIONS,
  QUIZ_PASS_MARKS,
  QUIZ_QUESTION_COUNT,
  QUIZ_SECONDS,
  REGION_LOCATIONS,
} from "./careers-data";

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;
type Step = "intro" | "quiz" | "pass" | "fail" | "form" | "done";
type Answer = (typeof QUIZ_OPTIONS)[number];

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/** Which of the four hiring-process steps the dialog is on. */
const STEP_NUMBER: Record<Step, number> = { intro: 1, quiz: 1, fail: 2, pass: 2, form: 3, done: 4 };
const PROCESS_STEPS: GlobalKey[] = [
  "careers.process.step1",
  "careers.process.step2",
  "careers.process.step3",
  "careers.process.step4",
];

const quizKey = (question: number, part: "question" | Answer) => `careers.quiz.q${question + 1}.${part}` as GlobalKey;

const makeApplySchema = (t: Translate) =>
  z.object({
    name: z.string().check(z.trim(), z.minLength(2, t("form.errorName"))),
    email: z.pipe(z.string().check(z.trim()), z.email(t("form.errorEmail"))),
    phone: z.string().check(z.trim(), z.minLength(6, t("form.errorPhone"))),
    position: z.string(),
  });

type ApplyFormValues = z.infer<ReturnType<typeof makeApplySchema>>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 transition-colors placeholder:text-slate-400 focus:border-gold-500 focus:outline-none aria-invalid:border-red-400";

const primaryButton =
  "gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-navy-900 shadow-md transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60";

const formatTime = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

/**
 * The application flow behind every "Apply Now": a short IQ test (90 of 100
 * marks to pass), then the details + CV form, then a thank-you screen. The test
 * is a screening step, not a security boundary — it runs in the browser.
 *
 * The CV is uploaded straight to R2 (the same presigned upload checkout uses)
 * and the application itself goes through the /contact endpoint, with the
 * position, test score and CV reference folded into the message in English.
 */
export function CareerApplyDialog({ jobId, onClose }: { jobId: string; onClose: () => void }) {
  const { language, translateGlobal: t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("intro");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // ── IQ test ──────────────────────────────────────────────────────────────
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => Array(QUIZ_QUESTION_COUNT).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_SECONDS);
  const [score, setScore] = useState(0);

  // Mirrors `answers` for the countdown below, which fires outside any render.
  const answersRef = useRef(answers);

  const finishTest = useCallback((given: (Answer | null)[]) => {
    const marks = given.filter((answer, index) => answer === QUIZ_CORRECT[index]).length * QUIZ_MARKS_PER_QUESTION;
    setScore(marks);
    setStep(marks >= QUIZ_PASS_MARKS ? "pass" : "fail");
  }, []);

  const startTest = () => {
    const blank = Array<Answer | null>(QUIZ_QUESTION_COUNT).fill(null);
    answersRef.current = blank;
    setAnswers(blank);
    setQuestion(0);
    setSecondsLeft(QUIZ_SECONDS);
    setStep("quiz");
  };

  const selectAnswer = (option: Answer) => {
    const next = answersRef.current.map((answer, index) => (index === question ? option : answer));
    answersRef.current = next;
    setAnswers(next);
  };

  // Time's up: score whatever has been answered so far.
  useEffect(() => {
    if (step !== "quiz") return;
    let left = QUIZ_SECONDS;
    const timer = window.setInterval(() => {
      left -= 1;
      setSecondsLeft(left);
      if (left <= 0) finishTest(answersRef.current);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [step, finishTest]);

  // ── CV form ──────────────────────────────────────────────────────────────
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [submittedPosition, setSubmittedPosition] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const schema = useMemo(() => makeApplySchema(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: CAREER_JOBS.some((job) => job.id === jobId) ? jobId : GENERAL_APPLICATION,
    },
  });

  const chooseFile = (chosen: File | undefined) => {
    if (!chosen) return;
    const type = attachmentContentType(chosen);
    if (!CV_TYPES.includes(type)) {
      setFile(null);
      setCvError(t("careers.form.errorCvType"));
    } else if (chosen.size > CHECKOUT_ATTACHMENT_MAX_BYTES) {
      setFile(null);
      setCvError(t("careers.form.errorCvSize"));
    } else {
      setFile(chosen);
      setCvError(null);
    }
  };

  const positionLabel = (id: string) => {
    const job = CAREER_JOBS.find((item) => item.id === id);
    if (!job) return t("careers.dialog.general");
    const note = job.genderNote ? ` ${t("careers.genderNote")}` : "";
    return `${t(job.titleKey)}${note} · ${t(REGION_LOCATIONS[job.region].titleKey)}`;
  };

  const onSubmit = async ({ name, email, phone, position }: ApplyFormValues) => {
    if (!file) setCvError(t("careers.form.errorCv"));
    setConfirmError(!confirmed);
    if (!file || !confirmed) return;
    if (!turnstileToken) {
      setSendError(t("form.verify"));
      return;
    }
    setSendError(null);

    const job = CAREER_JOBS.find((item) => item.id === position);
    try {
      const key = await uploadCheckoutAttachment(file);
      await sendContactMessage({
        name,
        email,
        phone,
        message: [
          "Job application (global site)",
          `Position: ${job ? `${job.title} - ${REGION_LOCATIONS[job.region].title}` : "General Application"}`,
          `IQ test: ${score} / 100`,
          `CV: ${file.name} (${key})`,
        ].join("\n"),
        turnstileToken,
      });
      setSubmittedPosition(positionLabel(position));
      setStep("done");
    } catch (err) {
      setSendError(err instanceof ApiError ? err.message : t("careers.form.sendFailed"));
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  const currentStep = STEP_NUMBER[step];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="career-apply-title"
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
      className="m-auto max-h-[92vh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-3xl border border-gold-500/30 bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-navy-900/80 backdrop:backdrop-blur-md"
    >
      <div className="sticky top-0 z-10 bg-navy-900 px-5 pb-4 pt-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p id="career-apply-title" className="font-display text-base font-bold">
              {t("careers.dialog.title")}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-gold-400">{positionLabel(jobId)}</p>
          </div>
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={() => dialogRef.current?.close()}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ol
          aria-label={t("careers.dialog.stepLabel", { n: currentStep, total: PROCESS_STEPS.length })}
          className="mt-4 grid grid-cols-4 gap-2"
        >
          {PROCESS_STEPS.map((key, index) => {
            const number = index + 1;
            const reached = number <= currentStep;
            return (
              <li key={key} aria-current={number === currentStep ? "step" : undefined} className="text-center">
                <span
                  className={cn(
                    "mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                    reached ? "gold-gradient-bg text-navy-900" : "bg-navy-600 text-slate-400",
                  )}
                >
                  {number < currentStep ? <Check className="h-3 w-3" /> : number}
                </span>
                <span className={cn("mt-1 block text-[9px] leading-tight", reached ? "text-slate-200" : "text-slate-500")}>
                  {t(key)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5">
        {step === "intro" && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">{t("careers.test.title")}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{t("careers.test.subtitle")}</p>
            </div>
            <ul className="space-y-2.5">
              {(
                [
                  [ListChecks, "careers.test.spec1.title", "careers.test.spec1.text"],
                  [Award, "careers.test.spec2.title", "careers.test.spec2.text"],
                  [ShieldCheck, "careers.test.spec3.title", "careers.test.spec3.text"],
                  [BrainCircuit, "careers.test.spec4.title", "careers.test.spec4.text"],
                ] as const
              ).map(([Icon, titleKey, textKey]) => (
                <li key={titleKey} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-navy-900">{t(titleKey)}</span>
                    <span className="text-[10px] text-slate-500">{t(textKey)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={startTest} className={primaryButton}>
              <span>{t("careers.test.start")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {step === "quiz" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-xl border border-navy-900/10 bg-navy-900/5 px-3 py-2 text-xs font-medium text-navy-900">
              <span>{t("careers.test.questionOf", { n: question + 1, total: QUIZ_QUESTION_COUNT })}</span>
              <span
                className={cn(
                  "flex items-center gap-1.5 font-semibold tabular-nums",
                  secondsLeft <= 60 ? "text-red-600" : "text-amber-600",
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                {t("careers.test.timeLeft", { time: formatTime(Math.max(secondsLeft, 0)) })}
              </span>
            </div>

            <div className="rounded-2xl bg-navy-900 p-4 text-white shadow-md">
              <p className="mb-1 text-[10px] font-semibold uppercase text-gold-400">{t("careers.test.module")}</p>
              <p className="text-xs font-medium leading-relaxed">{t(quizKey(question, "question"))}</p>
            </div>

            <div role="radiogroup" aria-label={t(quizKey(question, "question"))} className="space-y-2.5">
              {QUIZ_OPTIONS.map((option) => {
                const selected = answers[question] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectAnswer(option)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition",
                      selected
                        ? "border-gold-500 bg-amber-50 shadow-sm"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold uppercase",
                        selected ? "border-gold-500 bg-gold-500 text-navy-900" : "border-slate-300 text-slate-500",
                      )}
                    >
                      {selected ? <Check className="h-3 w-3" /> : option}
                    </span>
                    <span className="flex-1 text-xs font-medium text-slate-800">{t(quizKey(question, option))}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                disabled={question === 0}
                onClick={() => setQuestion((current) => current - 1)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t("careers.test.previous")}</span>
              </button>
              <button
                type="button"
                onClick={() => (question === QUIZ_QUESTION_COUNT - 1 ? finishTest(answers) : setQuestion((current) => current + 1))}
                className={cn(primaryButton, "flex-1")}
              >
                <span>{question === QUIZ_QUESTION_COUNT - 1 ? t("careers.test.finish") : t("careers.test.next")}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === "pass" && (
          <div className="flex flex-col gap-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full gold-gradient-bg text-navy-900 shadow-lg">
              <Trophy className="h-9 w-9" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">{t("careers.test.passTitle")}</h2>
              <p className="mt-1 text-xs text-slate-600">{t("careers.test.passSubtitle")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{t("careers.test.scoreLabel")}</p>
              <p className="my-2 text-4xl font-extrabold text-navy-900">{score} / 100</p>
              <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-left text-xs text-emerald-800">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{t("careers.test.passMessage")}</span>
              </p>
            </div>
            <button type="button" onClick={() => setStep("form")} className={primaryButton}>
              <span>{t("careers.test.passCta")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {step === "fail" && (
          <div className="flex flex-col gap-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-lg">
              <X className="h-9 w-9" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">{t("careers.test.failTitle")}</h2>
              <p className="mt-1 text-xs text-slate-600">{t("careers.test.failScore", { score })}</p>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-left shadow-sm">
              <p className="text-xs font-semibold leading-relaxed text-red-900">{t("careers.test.failMessage")}</p>
              <p className="mt-2 text-xs text-slate-600">{t("careers.test.failHint")}</p>
            </div>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={startTest}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-navy-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t("careers.test.retake")}</span>
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700 transition hover:bg-slate-200"
              >
                {t("careers.done.back")}
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">{t("careers.form.title")}</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{t("careers.form.subtitle")}</p>
            </div>

            <FormField id="ca-name" label={t("contactForm.fullName")} error={errors.name?.message}>
              <input
                id="ca-name"
                type="text"
                autoComplete="name"
                placeholder={t("contactForm.namePlaceholder")}
                aria-invalid={!!errors.name}
                className={inputClass}
                {...register("name")}
              />
            </FormField>

            <FormField id="ca-email" label={t("form.emailAddress")} error={errors.email?.message}>
              <input
                id="ca-email"
                type="email"
                autoComplete="email"
                placeholder={t("contactForm.emailPlaceholder")}
                aria-invalid={!!errors.email}
                className={inputClass}
                {...register("email")}
              />
            </FormField>

            <FormField id="ca-phone" label={t("form.phoneNumber")} error={errors.phone?.message}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="ca-phone"
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
            </FormField>

            <FormField id="ca-position" label={t("careers.form.position")}>
              <select id="ca-position" className={inputClass} {...register("position")}>
                {CAREER_JOBS.map((job) => (
                  <option key={job.id} value={job.id}>
                    {positionLabel(job.id)}
                  </option>
                ))}
                <option value={GENERAL_APPLICATION}>{t("careers.dialog.general")}</option>
              </select>
            </FormField>

            <FormField id="ca-cv" label={t("careers.form.cv")} error={cvError ?? undefined}>
              <input
                ref={fileInputRef}
                id="ca-cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => chooseFile(event.target.files?.[0])}
                className="sr-only"
              />
              {file ? (
                <div className="flex items-center gap-3 rounded-xl border border-gold-500/50 bg-amber-50 p-3 text-xs">
                  <Check className="h-4 w-4 shrink-0 text-gold-700" />
                  <span className="min-w-0 flex-1 truncate font-semibold text-navy-900">{file.name}</span>
                  <button
                    type="button"
                    aria-label={t("careers.form.cvRemove")}
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-slate-500 transition-colors hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="ca-cv"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    chooseFile(event.dataTransfer.files?.[0]);
                  }}
                  className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-gold-500 focus-within:border-gold-500"
                >
                  <span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-800">{t("careers.form.cvDrop")}</span>
                  <span className="block text-[10px] text-slate-500">{t("careers.form.cvBrowse")}</span>
                  <span className="mt-1 block text-[9px] text-slate-400">{t("careers.form.cvHint")}</span>
                </label>
              )}
            </FormField>

            <div>
              <label className="flex items-start gap-2 text-[10px] leading-tight text-slate-600">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    if (event.target.checked) setConfirmError(false);
                  }}
                  className="mt-0.5 rounded accent-gold-600"
                />
                <span>{t("careers.form.confirm")}</span>
              </label>
              {confirmError && <p className="mt-1 text-[11px] text-red-600">{t("careers.form.errorConfirm")}</p>}
            </div>

            <TurnstileWidget
              ref={turnstileRef}
              onVerify={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
              className="flex justify-center"
            />

            <button type="submit" disabled={isSubmitting || !turnstileToken} className={cn(primaryButton, "mt-1")}>
              <span>{isSubmitting ? t("common.sending") : t("careers.form.submit")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {sendError && <p className="text-xs text-red-600">{sendError}</p>}
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-col gap-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full gold-gradient-bg text-navy-900 shadow-lg">
              <Send className="h-9 w-9" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">{t("careers.done.title")}</h2>
              <p className="mt-1 text-xs text-slate-600">{t("careers.done.subtitle")}</p>
            </div>
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs leading-relaxed text-slate-600">
              {t("careers.done.message")}
            </p>
            <dl className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-xs shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2.5">
                <dt className="text-slate-500">{t("careers.done.position")}</dt>
                <dd className="text-right font-bold text-navy-900">{submittedPosition}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2.5">
                <dt className="text-slate-500">{t("careers.done.date")}</dt>
                <dd className="font-bold text-navy-900">
                  {new Date().toLocaleDateString(language, { day: "numeric", month: "long", year: "numeric" })}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">{t("careers.done.status")}</dt>
                <dd className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-800">
                  {t("careers.done.statusValue")}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-700 transition hover:bg-slate-200"
            >
              {t("careers.done.back")}
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
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
