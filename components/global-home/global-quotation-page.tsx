"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  CloudUpload,
  Crown,
  FileImage,
  FilePen,
  FileText,
  Globe,
  House,
  Info,
  KeyRound,
  Loader2,
  Mail,
  Map as MapIcon,
  MapPin,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Minus,
  Paperclip,
  Plus,
  Ruler,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { PhoneInput } from "@/components/phone-input";
import { ApiError } from "@/lib/api";
import { REGIONAL_DATA } from "@/lib/content/global-countries";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizedCountryName } from "@/lib/i18n/global/country-names";
import type { GlobalKey } from "@/lib/i18n/global/en";
import { localizeHref } from "@/lib/locale";
import { createQuotation } from "@/lib/quotation-api";
import {
  CHECKOUT_ATTACHMENT_ACCEPT,
  CHECKOUT_ATTACHMENT_MAX_BYTES,
  CHECKOUT_ATTACHMENT_MAX_COUNT,
  uploadCheckoutAttachment,
} from "@/lib/upload-api";
import { cn } from "@/lib/utils";
import { playfair } from "./fonts";
import {
  ACCESS_OPTIONS,
  CONTACT_OPTIONS,
  FREQUENCIES,
  FREQUENCY_SERVICES,
  GENDER_OPTIONS,
  INTENSIVE_SERVICES,
  NO_AREA_SERVICES,
  PROPERTY_CATEGORIES,
  PROPERTY_COUNT,
  SERVICE_ICONS,
  STAFF_LANGUAGES,
  SUPPLIES,
  UPHOLSTERY_PRESETS,
  UPHOLSTERY_SERVICE,
  type SupplyOption,
} from "./quotation-wizard-data";
import { BOOKABLE_COUNTRY_IDS } from "./service-availability-dialog";

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/** A quotable service as this page shows it — built on the server from the catalog and the Our Services copy. */
export interface QuotationServiceOption {
  /** Catalog id, sent as the quotation's serviceId. */
  id: number;
  /** Base English slug (e.g. "deep-cleaning"). */
  name: string;
  title: string;
  headline: string;
  image: string;
  category: string;
}

const AREA_MIN = 20;
const AREA_MAX = 500_000;
const DEFAULT_AREA = 100;
const SQFT_PER_SQM = 10.7639;
/**
 * The slider's marks, evenly spaced along the track. Between two marks the area
 * grows linearly, so 20 m² and 500,000 m² both stay reachable.
 */
const AREA_TICKS = [20, 1_000, 10_000, 50_000, 100_000, 500_000];
const SEGMENT_STEPS = 200;
const SLIDER_MAX = SEGMENT_STEPS * (AREA_TICKS.length - 1);
/** What the −/+ buttons add or remove in each stretch between two marks (20–1,000 m², 1,000–10,000 m², …). */
const SEGMENT_AREA_STEPS = [25, 250, 1_000, 2_500, 10_000];

/**
 * The −/+ step at `area`: the stretch it is moving into sets the size, so at
 * exactly 1,000 m² "+" adds 250 but "−" still removes 25.
 */
function areaStep(area: number, direction: 1 | -1): number {
  const segment = AREA_TICKS.findLastIndex((tick) => (direction > 0 ? tick <= area : tick < area));
  return SEGMENT_AREA_STEPS[clamp(segment, 0, SEGMENT_AREA_STEPS.length - 1)];
}

const CLEANERS_MAX = 50;
const HOURS_MIN = 2;
const HOURS_MAX = 48;
const REQUIREMENTS_MAX = 500;
/** Supplies are requested by count only; the quotation still records a unit for each line. */
const SUPPLY_UNIT = "Units";

type SlotFilter = "all" | "morning" | "afternoon";

const SLOT_FILTERS: { id: SlotFilter; labelKey: GlobalKey }[] = [
  { id: "all", labelKey: "gq.schedule.all" },
  { id: "morning", labelKey: "gq.schedule.morning" },
  { id: "afternoon", labelKey: "gq.schedule.afternoon" },
];

const FIRST_SLOT_MINUTES = 5 * 60 + 30;
const LAST_SLOT_MINUTES = 17 * 60 + 30;
const SLOT_STEP_MINUTES = 30;

/** Start times every 30 minutes from 05:30 to 17:30, as "HH:mm". */
const SLOTS = Array.from(
  { length: (LAST_SLOT_MINUTES - FIRST_SLOT_MINUTES) / SLOT_STEP_MINUTES + 1 },
  (_, index) => {
    const minutes = FIRST_SLOT_MINUTES + index * SLOT_STEP_MINUTES;
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  },
);

/** Morning is every start before noon; afternoon is noon onwards. */
function slotPeriod(slot: string): Exclude<SlotFilter, "all"> {
  return Number(slot.slice(0, 2)) < 12 ? "morning" : "afternoon";
}

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|heic|heif)$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRIES = REGIONAL_DATA.flatMap((group) => group.countries).filter((country) =>
  BOOKABLE_COUNTRY_IDS.includes(country.id),
);

const STEPS: { navKey: GlobalKey; icon: LucideIcon }[] = [
  { navKey: "gq.nav.service", icon: Star },
  { navKey: "gq.nav.property", icon: Building2 },
  { navKey: "gq.nav.size", icon: Ruler },
  { navKey: "gq.nav.schedule", icon: UsersRound },
  { navKey: "gq.nav.addons", icon: Sparkles },
  { navKey: "gq.nav.details", icon: UserRound },
  { navKey: "gq.nav.review", icon: FileText },
];
const REVIEW_STEP = STEPS.length - 1;

interface SupplyState {
  quantity: number;
}

interface Attachment {
  id: string;
  name: string;
  /** Local object URL for an image's thumbnail; null for documents. */
  previewUrl: string | null;
  /** R2 object key once uploaded. */
  key: string | null;
  status: "uploading" | "done" | "error";
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function areaToSlider(area: number): number {
  const value = clamp(area, AREA_MIN, AREA_MAX);
  const segment = Math.max(0, AREA_TICKS.findIndex((tick, i) => value <= AREA_TICKS[i + 1]));
  const [from, to] = [AREA_TICKS[segment], AREA_TICKS[segment + 1]];
  return Math.round((segment + (value - from) / (to - from)) * SEGMENT_STEPS);
}

/** The slider position's area, rounded to a step that suits its magnitude. */
function sliderToArea(position: number): number {
  const segment = Math.min(Math.floor(position / SEGMENT_STEPS), AREA_TICKS.length - 2);
  const fraction = position / SEGMENT_STEPS - segment;
  const raw = AREA_TICKS[segment] + fraction * (AREA_TICKS[segment + 1] - AREA_TICKS[segment]);
  const step = raw < 1_000 ? 5 : raw < 10_000 ? 50 : raw < 100_000 ? 500 : 5_000;
  return clamp(Math.round(raw / step) * step, AREA_MIN, AREA_MAX);
}

/** Solo and two-person completion estimates for the intensive-service notice. */
function completionEstimate(area: number) {
  const min = Math.max(2, Math.round(area / 18));
  const max = Math.max(min + 1, Math.round(area / 13));
  return { min, max, teamMin: Math.ceil(min / 2), teamMax: Math.ceil(max / 2) };
}

function revokePreview(attachment: Attachment) {
  if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
}

const inputClass =
  "h-12 w-full min-w-0 flex-1 bg-transparent px-4 text-sm font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none";
const labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-300";
const panelClass = "rounded-2xl border border-white/10 bg-navy-900/70 p-5";

/**
 * The global gateway's quotation request page (/request-quotation on
 * IS_GLOBAL_SITE): a step-by-step wizard for one service — property, size,
 * crew and schedule, eco supplies and preferences, contact and address — that
 * ends on an overview and sends a quotation. No prices anywhere.
 */
export function GlobalQuotationPage({
  services,
  initialServiceName,
  initialLocation,
  defaultDate,
  minDate,
}: {
  services: QuotationServiceOption[];
  /** Preselected from the page's `?service=` param (a Book Now button). */
  initialServiceName?: string;
  /** Prefilled from the availability dialog's `country`, `city` and `postal` params. */
  initialLocation?: { country?: string; city?: string; postalCode?: string };
  /** Tomorrow, as YYYY-MM-DD. */
  defaultDate: string;
  /** Today, as YYYY-MM-DD. */
  minDate: string;
}) {
  const { language, urlLanguage, translateGlobal: t } = useLanguage();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const [serviceId, setServiceId] = useState<number | null>(
    () => services.find((s) => s.name === initialServiceName)?.id ?? null,
  );
  const [categoryId, setCategoryId] = useState(PROPERTY_CATEGORIES[0].id);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [area, setArea] = useState(DEFAULT_AREA);
  const [areaUnit, setAreaUnit] = useState<"sqm" | "sqft">("sqm");
  const [presetId, setPresetId] = useState<string | null>(null);

  const [cleaners, setCleaners] = useState(1);
  const [hours, setHours] = useState(HOURS_MIN);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [date, setDate] = useState(defaultDate);
  const [slot, setSlot] = useState<string | null>(null);
  const [slotFilter, setSlotFilter] = useState<SlotFilter>("all");

  const [supplies, setSupplies] = useState<Record<string, SupplyState>>({});
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [staffLanguage, setStaffLanguage] = useState("no-preference");
  const [requirements, setRequirements] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentsRef = useRef(attachments);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactChannel, setContactChannel] = useState(CONTACT_OPTIONS[0].value);

  const [country, setCountry] = useState(
    () => COUNTRIES.find((c) => c.name === initialLocation?.country)?.name ?? "",
  );
  const [postalCode, setPostalCode] = useState(initialLocation?.postalCode ?? "");
  const [city, setCity] = useState(initialLocation?.city ?? "");
  const [province, setProvince] = useState("");
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
  const [access, setAccess] = useState(ACCESS_OPTIONS[0].value);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Revoke every image thumbnail's object URL when the page goes away.
  useEffect(() => () => attachmentsRef.current.forEach(revokePreview), []);

  // Bring the step card into view on every step change (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const service = services.find((s) => s.id === serviceId) ?? null;
  const hasArea = !!service && !NO_AREA_SERVICES.has(service.name);
  const isUpholstery = service?.name === UPHOLSTERY_SERVICE;
  const offersFrequency = !!service && FREQUENCY_SERVICES.has(service.name);
  const selectedSupplies = SUPPLIES.filter((s) => supplies[s.id]);
  const uploadedAttachments = attachments.filter((a) => a.status === "done" && a.key);

  const propertyLabel = useMemo(() => {
    for (const category of PROPERTY_CATEGORIES) {
      const item = category.items.find((i) => i.value === propertyType);
      if (item) return t(item.labelKey);
    }
    return null;
  }, [propertyType, t]);

  const languageNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([language ?? "en"], { type: "language" });
    } catch {
      return null;
    }
  }, [language]);
  const staffLanguageLabel = (value: string) => {
    if (value === "no-preference") return t("gq.prefs.noPreference");
    const option = STAFF_LANGUAGES.find((l) => l.value === value);
    const name = option && languageNames?.of(option.code);
    return name ? name.charAt(0).toLocaleUpperCase(language ?? "en") + name.slice(1) : value;
  };

  const formatNumber = (value: number) => value.toLocaleString(language ?? "en");
  const areaText = (sqm: number) => `${formatNumber(sqm)} m² (${formatNumber(Math.round(sqm * SQFT_PER_SQM))} ft²)`;

  function selectService(next: QuotationServiceOption) {
    setServiceId(next.id);
    if (next.name === UPHOLSTERY_SERVICE) {
      setArea(6);
      setPresetId("3seater");
    } else if (presetId) {
      setArea(DEFAULT_AREA);
      setPresetId(null);
    }
    if (!FREQUENCY_SERVICES.has(next.name)) setFrequency(null);
  }

  function changeArea(next: number) {
    setArea(clamp(Math.round(next), isUpholstery ? 1 : AREA_MIN, AREA_MAX));
    setPresetId(null);
  }

  function toggleSupply(supply: SupplyOption) {
    setSupplies((current) => {
      if (current[supply.id]) {
        const rest = { ...current };
        delete rest[supply.id];
        return rest;
      }
      return { ...current, [supply.id]: { quantity: 1 } };
    });
  }

  function updateSupply(id: string, patch: Partial<SupplyState>) {
    setSupplies((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  }

  function addAttachments(files: FileList | null) {
    if (!files?.length) return;
    setAttachmentError(null);
    const room = CHECKOUT_ATTACHMENT_MAX_COUNT - attachments.length;
    const picked = Array.from(files);
    if (picked.length > room) setAttachmentError(t("gq.images.tooMany", { max: CHECKOUT_ATTACHMENT_MAX_COUNT }));

    for (const file of picked.slice(0, Math.max(0, room))) {
      if (file.size > CHECKOUT_ATTACHMENT_MAX_BYTES) {
        setAttachmentError(t("gq.images.tooLarge", { name: file.name }));
        continue;
      }
      const id = crypto.randomUUID();
      const isImage = file.type.startsWith("image/") || IMAGE_EXTENSION.test(file.name);
      setAttachments((current) => [
        ...current,
        { id, name: file.name, previewUrl: isImage ? URL.createObjectURL(file) : null, key: null, status: "uploading" },
      ]);
      uploadCheckoutAttachment(file)
        .then((key) =>
          setAttachments((current) => current.map((a) => (a.id === id ? { ...a, key, status: "done" } : a))),
        )
        .catch(() => {
          setAttachments((current) => current.map((a) => (a.id === id ? { ...a, status: "error" } : a)));
          setAttachmentError(t("gq.images.failed", { name: file.name }));
        });
    }
  }

  function removeAttachment(id: string) {
    setAttachments((current) => {
      const attachment = current.find((a) => a.id === id);
      if (attachment) revokePreview(attachment);
      return current.filter((a) => a.id !== id);
    });
  }

  /** What still blocks leaving each step, in the visitor's language. */
  const missingByStep: string[][] = [
    [!service && t("gq.error.service")],
    [!propertyType && t("gq.error.propertyType")],
    [],
    [!date && t("gq.error.date")],
    [attachments.some((a) => a.status === "uploading") && t("gq.error.uploading")],
    [
      !firstName.trim() && t("gq.error.firstName"),
      !lastName.trim() && t("gq.error.lastName"),
      !EMAIL_PATTERN.test(email.trim()) && t("gq.error.email"),
      phone.trim().length < 6 && t("gq.error.phone"),
      !country && t("gq.error.country"),
      !postalCode.trim() && t("gq.error.postal"),
      !city.trim() && t("gq.error.city"),
      !street.trim() && t("gq.error.street"),
    ],
    [],
  ].map((messages) => messages.filter((message): message is string => !!message));
  const missingHere = missingByStep[step];
  const missingAll = missingByStep.flat();

  function goTo(next: number) {
    setShowErrors(false);
    setSubmitError(null);
    setStep(next);
    setVisited((current) => Math.max(current, next));
  }

  function next() {
    if (missingHere.length) {
      setShowErrors(true);
      return;
    }
    goTo(step + 1);
  }

  async function submit() {
    if (!service || submitting) return;
    if (missingAll.length) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const quotation = await createQuotation({
        serviceId: service.id,
        serviceLines: [
          {
            serviceId: service.id,
            numCleaners: cleaners,
            durationHours: hours,
            propertySizeSqm: hasArea ? area : undefined,
            upholsteryPreset: isUpholstery ? UPHOLSTERY_PRESETS.find((p) => p.id === presetId)?.value : undefined,
          },
        ],
        supplyLines: selectedSupplies.map((supply) => ({
          name: supply.name,
          quantity: supplies[supply.id].quantity,
          unit: SUPPLY_UNIT,
          msds: false,
        })),
        propertyType: propertyType ?? undefined,
        frequency: offersFrequency ? (frequency ?? undefined) : undefined,
        genderPreference: gender,
        languagePreference: staffLanguage,
        preferredContactChannel: contactChannel,
        howGetIn: access,
        date,
        time: slot ?? undefined,
        attachments: uploadedAttachments.map((a) => ({ key: a.key as string, name: a.name })),
        specialRequirements: requirements.trim() || undefined,
        language,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim(),
        contact: phone.trim(),
        country,
        postalCode: postalCode.trim() || undefined,
        city: city.trim(),
        state: province.trim() || undefined,
        streetAddress: street.trim(),
        unit: unit.trim() || undefined,
      });
      const target = `/quotation-confirmation/${quotation.id}?ref=${encodeURIComponent(quotation.accessToken)}`;
      router.push(urlLanguage ? localizeHref(target, urlLanguage) : target);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : t("gq.error.failed"));
      setSubmitting(false);
    }
  }

  const stepHeads: { title: string; subtitle: string; icon: LucideIcon }[] = [
    { title: t("gq.service.title"), subtitle: t("gq.service.subtitle"), icon: Star },
    { title: t("gq.property.title"), subtitle: t("gq.property.subtitle", { count: PROPERTY_COUNT }), icon: Building2 },
    { title: t("gq.size.title"), subtitle: t("gq.size.subtitle"), icon: Ruler },
    { title: t("gq.crew.title"), subtitle: t("gq.crew.subtitle"), icon: UsersRound },
    { title: t("gq.addons.title"), subtitle: t("gq.addons.subtitle"), icon: Sparkles },
    { title: t("gq.details.title"), subtitle: t("gq.details.subtitle"), icon: UserRound },
    { title: t("gq.review.title"), subtitle: t("gq.review.subtitle"), icon: FilePen },
  ];
  const head = stepHeads[step];

  return (
    <main className={cn(playfair.variable, "flex-1 bg-navy-900 font-sans text-slate-100")}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/services/updated-images/request-quotation-hero-image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/75 via-navy-900/80 to-navy-900" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-28 pt-12 text-center sm:pb-32 sm:pt-16">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/50 bg-navy-900/60 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400 backdrop-blur-md sm:text-xs">
            <Crown className="h-4 w-4 shrink-0" aria-hidden />
            {t("gq.hero.badge")}
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">Pearly Sky</h1>
          <p className="mt-2 font-display text-xl italic text-gold-400 sm:text-3xl">{t("gq.hero.tagline")}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {t("gq.hero.subtitle")}
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-3 pb-16 sm:px-6 lg:px-8">
        <StepTracker step={step} visited={visited} onSelect={goTo} t={t} />

        <div
          ref={cardRef}
          className="mt-5 scroll-mt-24 rounded-3xl border border-gold-500/25 bg-navy-800/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-8"
        >
          <header className="mb-7 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-navy-900 text-gold-400 shadow-lg sm:flex">
              <head.icon className="h-6 w-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                {t("gq.step", { n: step + 1, total: STEPS.length })}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{head.title}</h2>
              <span className="mt-3 block h-0.5 w-16 rounded-full bg-gold-500" aria-hidden />
              <p className="mt-3 text-sm text-slate-400">{head.subtitle}</p>
            </div>
          </header>

          {step === 0 && (
            <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {services.map((option) => {
                const Icon = SERVICE_ICONS[option.name] ?? Sparkles;
                const selected = option.id === serviceId;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectService(option)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all",
                        selected
                          ? "border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/10"
                          : "border-white/10 bg-navy-900/60 hover:border-gold-500/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          selected ? "bg-gold-500/20 text-gold-400" : "bg-white/5 text-gold-400",
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className={cn("flex-1 text-sm font-semibold", selected ? "text-gold-300" : "text-slate-100")}>
                        {option.title}
                      </span>
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                          selected ? "border-gold-500 bg-gold-500 text-navy-900" : "border-slate-500",
                        )}
                        aria-hidden
                      >
                        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {step === 1 && (
            <div>
              <div className="scrollbar-hide -mx-1 overflow-x-auto px-1 pb-3">
                <div role="tablist" aria-label={t("gq.property.title")} className="flex min-w-max gap-2">
                  {PROPERTY_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={categoryId === category.id}
                      onClick={() => setCategoryId(category.id)}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                        categoryId === category.id
                          ? "gold-gradient-bg text-navy-900 shadow-md"
                          : "border border-white/15 bg-white/5 text-slate-200 hover:border-gold-500/40",
                      )}
                    >
                      {t(category.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-5 h-px bg-white/10" />
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {PROPERTY_CATEGORIES.find((c) => c.id === categoryId)?.items.map((item) => {
                  const selected = propertyType === item.value;
                  return (
                    <li key={item.value}>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setPropertyType(item.value)}
                        className={cn(
                          "flex min-h-12 w-full items-center justify-between gap-2 rounded-full border px-5 py-2.5 text-left text-sm font-medium transition-all",
                          selected
                            ? "border-gold-500 bg-gold-500/10 font-bold text-gold-300"
                            : "border-white/15 bg-navy-900/60 text-slate-200 hover:border-gold-500/40",
                        )}
                      >
                        {t(item.labelKey)}
                        {selected && <Check className="h-4 w-4 shrink-0 text-gold-400" aria-hidden />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {propertyLabel && (
                <p className="mt-5 text-xs text-slate-400">
                  {t("gq.property.selected")} <strong className="text-gold-400">{propertyLabel}</strong>
                </p>
              )}
            </div>
          )}

          {step === 2 && service && (
            <>
              {!hasArea ? (
                <p className="flex items-start gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 text-sm text-slate-300">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  {t("gq.services.noArea")}
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_22rem]">
                  <div className="space-y-5">
                    <div className={cn(panelClass, "space-y-6")}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gold-500/20 bg-gold-500/10 text-gold-400">
                            <House className="h-8 w-8" aria-hidden />
                          </span>
                          <div aria-live="polite">
                            <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                              {areaUnit === "sqm"
                                ? `${formatNumber(area)} m²`
                                : `${formatNumber(Math.round(area * SQFT_PER_SQM))} ft²`}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-gold-400">
                              {areaUnit === "sqm"
                                ? `${formatNumber(Math.round(area * SQFT_PER_SQM))} ft²`
                                : `${formatNumber(area)} m²`}
                            </p>
                          </div>
                        </div>
                        <div role="group" aria-label={t("gq.size.unit")} className="flex shrink-0 rounded-full border border-white/15 bg-navy-900 p-1">
                          {(["sqm", "sqft"] as const).map((u) => (
                            <button
                              key={u}
                              type="button"
                              aria-pressed={areaUnit === u}
                              onClick={() => setAreaUnit(u)}
                              className={cn(
                                "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
                                areaUnit === u ? "gold-gradient-bg text-navy-900" : "text-slate-300 hover:text-white",
                              )}
                            >
                              {u === "sqm" ? "m²" : "ft²"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StepButton
                          kind="minus"
                          label={t("gq.decrease", { label: t("gq.size.title") })}
                          disabled={area <= (isUpholstery ? 1 : AREA_MIN)}
                          onClick={() => changeArea(area - (isUpholstery ? 1 : areaStep(area, -1)))}
                        />
                        <label className="flex h-14 flex-1 items-center rounded-xl border border-white/15 bg-navy-900 focus-within:border-gold-500/60">
                          <span className="sr-only">{t("gq.size.title")}</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={1}
                            value={areaUnit === "sqm" ? area : Math.round(area * SQFT_PER_SQM)}
                            onChange={(event) => {
                              const value = Number.parseInt(event.target.value, 10) || 1;
                              changeArea(areaUnit === "sqm" ? value : value / SQFT_PER_SQM);
                            }}
                            className="h-full w-full min-w-0 bg-transparent text-center text-xl font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <span className="pr-4 text-sm font-semibold text-slate-400">{areaUnit === "sqm" ? "m²" : "ft²"}</span>
                        </label>
                        <StepButton
                          kind="plus"
                          label={t("gq.increase", { label: t("gq.size.title") })}
                          disabled={area >= AREA_MAX}
                          onClick={() => changeArea(area + (isUpholstery ? 1 : areaStep(area, 1)))}
                        />
                      </div>

                      {isUpholstery ? (
                        <div>
                          <p className={labelClass}>{t("gq.services.upholstery")}</p>
                          <div className="flex flex-wrap gap-2">
                            {UPHOLSTERY_PRESETS.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                aria-pressed={presetId === p.id}
                                onClick={() => {
                                  setArea(p.area);
                                  setPresetId(p.id);
                                }}
                                className={cn(
                                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                                  presetId === p.id
                                    ? "border-gold-500 bg-gold-500/15 text-gold-300"
                                    : "border-white/15 bg-navy-900 text-slate-300 hover:border-gold-500/40",
                                )}
                              >
                                {t(p.labelKey)} (~{p.area} m²)
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="px-3 sm:px-5">
                          <input
                            type="range"
                            min={0}
                            max={SLIDER_MAX}
                            value={areaToSlider(area)}
                            onChange={(event) => {
                              setArea(sliderToArea(Number(event.target.value)));
                              setPresetId(null);
                            }}
                            aria-label={t("gq.size.title")}
                            aria-valuetext={areaText(area)}
                            style={{
                              background: `linear-gradient(to right, var(--color-gold-500) ${(areaToSlider(area) / SLIDER_MAX) * 100}%, rgb(255 255 255 / 0.15) ${(areaToSlider(area) / SLIDER_MAX) * 100}%)`,
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold-300 [&::-moz-range-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold-300 [&::-webkit-slider-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gold-500/40"
                          />
                          {/* Marks sit under the thumb's centre: inset by half the 24px thumb at each end. */}
                          <div className="relative mt-2 h-14 text-[8px] leading-tight text-slate-400 sm:text-[10px]" aria-hidden>
                            {AREA_TICKS.map((tick, index) => (
                              <span
                                key={tick}
                                className="absolute top-0 flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-center"
                                style={{ left: `calc(12px + ${index / (AREA_TICKS.length - 1)} * (100% - 24px))` }}
                              >
                                <span className="mb-1.5 h-2 w-px bg-slate-500" />
                                <span className="text-[10px] font-bold text-slate-200 sm:text-xs">{formatNumber(tick)}</span>
                                <span className="text-slate-300">m²</span>
                                <span>{formatNumber(Math.round(tick * SQFT_PER_SQM))} ft²</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {!isUpholstery && (
                      <>
                        <p className="flex items-start gap-3 rounded-2xl border border-gold-500/40 bg-navy-900/60 p-4 text-sm">
                          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                          <span>
                            <strong className="block text-white">
                              {t("gq.size.range", { min: `${formatNumber(AREA_MIN)} m²`, max: `${formatNumber(AREA_MAX)} m²` })}
                            </strong>
                            <span className="text-slate-400">{t("gq.size.rangeText")}</span>
                          </span>
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {([1, -1] as const).map((direction) => (
                            <button
                              key={direction}
                              type="button"
                              onClick={() => changeArea(area + direction * areaStep(area, direction))}
                              disabled={direction > 0 ? area >= AREA_MAX : area <= AREA_MIN}
                              className="flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-navy-900/60 p-4 text-left transition-colors hover:border-gold-500 disabled:opacity-40"
                            >
                              <span
                                className={cn(
                                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                                  direction > 0 ? "bg-gold-500/15 text-gold-400" : "bg-white/5 text-slate-300",
                                )}
                              >
                                {direction > 0 ? <ArrowUp className="h-5 w-5" aria-hidden /> : <ArrowDown className="h-5 w-5" aria-hidden />}
                              </span>
                              <span>
                                <span className="block text-sm font-bold text-white">
                                  {direction > 0 ? t("gq.size.increase") : t("gq.size.decrease")}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {direction > 0 ? "+" : "−"}
                                  {formatNumber(areaStep(area, direction))} m²
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative hidden min-h-72 overflow-hidden rounded-2xl border border-white/10 lg:block">
                    <Image src={service.image} alt="" fill sizes="22rem" className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-900/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-gold-500/40 bg-navy-900/85 px-4 py-2.5 backdrop-blur-md">
                      <House className="h-6 w-6 text-gold-400" aria-hidden />
                      <span>
                        <span className="block text-sm font-bold text-white">{formatNumber(area)} m²</span>
                        <span className="text-xs text-slate-400">{formatNumber(Math.round(area * SQFT_PER_SQM))} ft²</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 3 && service && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CounterCard
                  title={t("gq.crew.cleaners")}
                  text={t("gq.crew.cleanersText")}
                  unit={t("gq.crew.cleanersUnit")}
                  value={cleaners}
                  max={CLEANERS_MAX}
                  onChange={setCleaners}
                  t={t}
                />
                <CounterCard
                  title={t("gq.crew.hours")}
                  text={t("gq.crew.hoursText")}
                  unit={t("gq.crew.hoursUnit")}
                  value={hours}
                  min={HOURS_MIN}
                  max={HOURS_MAX}
                  onChange={setHours}
                  t={t}
                />
              </div>

              {hasArea && INTENSIVE_SERVICES.has(service.name) && (
                <CompletionNotice serviceTitle={service.title} area={area} formatNumber={formatNumber} t={t} />
              )}

              {offersFrequency && (
                <section aria-labelledby="gq-frequency-title">
                  <h3 id="gq-frequency-title" className="font-display text-2xl font-bold text-white">
                    {t("gq.freq.title")}
                  </h3>
                  <p className="mb-4 mt-1 text-sm text-slate-400">{t("gq.freq.subtitle")}</p>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {FREQUENCIES.map((option) => {
                      const selected = frequency === option.value;
                      return (
                        <li key={option.value}>
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setFrequency(selected ? null : option.value)}
                            className={cn(
                              "relative flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-all",
                              selected
                                ? "border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/15"
                                : "border-white/10 bg-navy-900/60 hover:border-gold-500/40",
                            )}
                          >
                            {option.popular && (
                              <span className="gold-gradient-bg absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-2xl px-3 py-1 text-[11px] font-bold text-navy-900">
                                <Crown className="h-3 w-3" aria-hidden />
                                {t("gq.freq.popular")}
                              </span>
                            )}
                            <span className="flex items-center gap-3">
                              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-400">
                                <CalendarDays className="h-6 w-6" aria-hidden />
                              </span>
                              <span>
                                <span className="block font-display text-xl font-bold text-white">{t(option.titleKey)}</span>
                                <span className="text-xs text-slate-400">{t(option.tagKey)}</span>
                              </span>
                            </span>
                            <ul className="mt-4 hidden space-y-2 text-xs text-slate-300 sm:block">
                              {option.pointKeys.map((key) => (
                                <li key={key} className="flex items-start gap-2">
                                  <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden />
                                  {t(key)}
                                </li>
                              ))}
                            </ul>
                            <span
                              className={cn(
                                "mt-auto flex h-9 w-9 items-center justify-center self-center rounded-full border pt-0 sm:mt-5",
                                selected ? "gold-gradient-bg border-transparent text-navy-900" : "border-gold-500/50 text-gold-400",
                              )}
                              aria-hidden
                            >
                              {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : <ArrowRight className="h-4 w-4" />}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              <section aria-labelledby="gq-schedule-title" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-3">
                  <h3 id="gq-schedule-title" className="font-display text-2xl font-bold text-white">
                    {t("gq.schedule.title")}
                  </h3>
                  <label htmlFor="gq-date" className={labelClass}>
                    {t("gq.schedule.date")} <Required t={t} />
                  </label>
                  <IconField icon={CalendarCheck}>
                    <input
                      id="gq-date"
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className={cn(inputClass, "cursor-pointer [color-scheme:dark]")}
                    />
                  </IconField>
                  <p className="flex gap-1.5 text-[11px] italic leading-relaxed text-slate-400">
                    <Info className="mt-0.5 h-3 w-3 shrink-0 text-gold-400" aria-hidden />
                    {t("gq.schedule.dateHint")}
                  </p>
                </div>

                <div className="space-y-3 lg:col-span-2">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      <Clock className="mr-1.5 inline h-3.5 w-3.5 text-gold-400" aria-hidden />
                      {t("gq.schedule.window")}
                    </p>
                    <span
                      aria-live="polite"
                      className="self-start rounded-full border border-gold-500/40 bg-navy-900 px-3.5 py-1 text-xs font-bold text-gold-400 sm:self-auto"
                    >
                      {slot ? t("gq.schedule.selected", { time: slot }) : t("gq.schedule.none")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    {SLOT_FILTERS.map(({ id, labelKey }) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={slotFilter === id}
                        onClick={() => setSlotFilter(id)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 transition-colors",
                          slotFilter === id
                            ? "border-gold-500 bg-gold-500/15 text-gold-300"
                            : "border-white/15 text-slate-300 hover:border-gold-500/40",
                        )}
                      >
                        {t(labelKey)}
                      </button>
                    ))}
                  </div>
                  <div className="grid max-h-52 grid-cols-4 gap-2 overflow-y-auto rounded-2xl border border-white/10 bg-navy-900/60 p-3 sm:grid-cols-6 md:grid-cols-8">
                    {SLOTS.filter((s) => slotFilter === "all" || slotPeriod(s) === slotFilter).map((time) => (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={slot === time}
                        onClick={() => setSlot(slot === time ? null : time)}
                        className={cn(
                          "rounded-lg border px-1 py-2 text-xs font-bold transition-all",
                          slot === time
                            ? "gold-gradient-bg border-transparent text-navy-900 shadow-md"
                            : "border-white/10 bg-navy-800 text-slate-200 hover:border-gold-500/50",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-10">
              <section aria-labelledby="gq-eco-title">
                <h3 id="gq-eco-title" className="font-display text-2xl font-bold text-white">
                  {t("gq.eco.title")}
                </h3>
                <p className="mb-5 mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">{t("gq.eco.text")}</p>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {SUPPLIES.map((supply) => {
                    const state = supplies[supply.id];
                    return (
                      <li
                        key={supply.id}
                        className={cn(
                          "rounded-2xl border p-5 transition-all",
                          state ? "border-gold-500 bg-gold-500/5" : "border-white/10 bg-navy-900/60",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                            <supply.icon className="h-7 w-7" aria-hidden />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-white">{supply.name}</p>
                            <p className="text-sm text-slate-400">({t(supply.descKey)})</p>
                          </div>
                          <button
                            type="button"
                            aria-pressed={!!state}
                            aria-label={state ? t("gq.eco.removeItem", { item: supply.name }) : t("gq.eco.addItem", { item: supply.name })}
                            onClick={() => toggleSupply(supply)}
                            className={cn(
                              "shrink-0 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition",
                              state
                                ? "border border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
                                : "gold-gradient-bg text-navy-900 shadow-md hover:brightness-110",
                            )}
                          >
                            {state ? t("gq.eco.remove") : t("gq.eco.add")}
                          </button>
                        </div>
                        {state && (
                          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-xs">
                            <span className="font-bold uppercase tracking-wider text-slate-300">{t("gq.supplies.quantity")}</span>
                            <SmallStepper
                              value={state.quantity}
                              max={999}
                              label={t("gq.supplies.quantity")}
                              onChange={(quantity) => updateSupply(supply.id, { quantity })}
                              t={t}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" aria-hidden />
                  <span>
                    <strong className="block text-emerald-300">{t("gq.eco.noteTitle")}</strong>
                    <span className="text-slate-300">{t("gq.eco.noteText")}</span>
                  </span>
                </p>
              </section>

              <section aria-labelledby="gq-prefs-title">
                <h3 id="gq-prefs-title" className="font-display text-2xl font-bold text-white">
                  {t("gq.prefs.title")}
                </h3>
                <p className="mb-5 mt-1 text-sm text-slate-400">{t("gq.prefs.subtitle")}</p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <PrefCard icon={Users} label={t("gq.prefs.gender")} htmlFor="gq-gender">
                      <SelectField id="gq-gender" value={gender} onChange={setGender}>
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.labelKey)}
                          </option>
                        ))}
                      </SelectField>
                    </PrefCard>
                    <PrefCard icon={MessageSquareText} label={t("gq.prefs.language")} htmlFor="gq-staff-language">
                      <SelectField id="gq-staff-language" value={staffLanguage} onChange={setStaffLanguage}>
                        {["no-preference", ...STAFF_LANGUAGES.map((l) => l.value)].map((value) => (
                          <option key={value} value={value}>
                            {staffLanguageLabel(value)}
                          </option>
                        ))}
                      </SelectField>
                    </PrefCard>
                    <PrefCard icon={FilePen} label={t("gq.prefs.requirements")} htmlFor="gq-requirements">
                      <div className="relative">
                        <textarea
                          id="gq-requirements"
                          rows={5}
                          maxLength={REQUIREMENTS_MAX}
                          value={requirements}
                          onChange={(event) => setRequirements(event.target.value)}
                          placeholder={t("gq.prefs.requirementsPlaceholder")}
                          className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 pb-7 text-sm text-slate-100 placeholder:text-slate-500 focus:border-gold-500/60 focus:outline-none"
                        />
                        <span className="pointer-events-none absolute bottom-2.5 right-3 text-[11px] text-slate-500">
                          {requirements.length}/{REQUIREMENTS_MAX}
                        </span>
                      </div>
                    </PrefCard>
                  </div>

                  <div className="space-y-4">
                    <div className={panelClass}>
                      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                        <FileImage className="h-5 w-5 text-gold-400" aria-hidden />
                        {t("gq.images.title")}
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={attachments.length >= CHECKOUT_ATTACHMENT_MAX_COUNT}
                        className="w-full rounded-2xl border-2 border-dashed border-gold-500/40 bg-navy-800 p-6 text-center transition-colors hover:border-gold-500 hover:bg-gold-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <CloudUpload className="mx-auto mb-2 h-9 w-9 text-gold-400" aria-hidden />
                        <span className="block text-sm font-bold text-gold-300">{t("gq.images.upload")}</span>
                        <span className="mt-1 block text-[11px] text-slate-400">
                          {t("gq.images.hint", { max: CHECKOUT_ATTACHMENT_MAX_COUNT })}
                        </span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={CHECKOUT_ATTACHMENT_ACCEPT}
                        className="hidden"
                        onChange={(event) => {
                          addAttachments(event.target.files);
                          event.target.value = "";
                        }}
                      />
                      {attachmentError && (
                        <p role="alert" className="mt-3 text-xs font-semibold text-red-400">
                          {attachmentError}
                        </p>
                      )}
                      {attachments.length > 0 && (
                        <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                          {attachments.map((attachment) => (
                            <AttachmentTile
                              key={attachment.id}
                              attachment={attachment}
                              onRemove={() => removeAttachment(attachment.id)}
                              t={t}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="flex items-start gap-3 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-4 text-sm">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" aria-hidden />
                      <span>
                        <strong className="block text-sky-200">{t("gq.prefs.formatsTitle")}</strong>
                        <span className="text-slate-300">{t("gq.prefs.formatsText")}</span>
                      </span>
                    </p>
                    <p className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                      <span>
                        <strong className="block text-emerald-300">{t("gq.prefs.privacyTitle")}</strong>
                        <span className="text-slate-300">{t("gq.prefs.privacyText")}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/10">
                <section aria-labelledby="gq-client-title" className="space-y-5 lg:pr-8">
                  <h3 id="gq-client-title" className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
                    <UserRound className="h-5 w-5 text-gold-400" aria-hidden />
                    {t("gq.details.client")}
                  </h3>
                  <TextField id="gq-first-name" icon={UserRound} label={t("gq.details.firstName")} required value={firstName} onChange={setFirstName} autoComplete="given-name" t={t} />
                  <TextField id="gq-last-name" icon={UserRound} label={t("gq.details.lastName")} required value={lastName} onChange={setLastName} autoComplete="family-name" t={t} />
                  <TextField
                    id="gq-email"
                    icon={Mail}
                    type="email"
                    label={t("gq.details.email")}
                    required
                    value={email}
                    onChange={setEmail}
                    placeholder={t("gq.details.emailPlaceholder")}
                    autoComplete="email"
                    t={t}
                  />
                  <div>
                    <span className={labelClass}>
                      {t("gq.details.phone")} <Required t={t} />
                    </span>
                    <PhoneInput name="phone" value={phone} onChange={setPhone} placeholder={t("gq.details.phone")} className="h-12 text-slate-100" />
                  </div>
                </section>

                <section aria-labelledby="gq-address-title" className="space-y-5 lg:pl-8">
                  <h3 id="gq-address-title" className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
                    <House className="h-5 w-5 text-gold-400" aria-hidden />
                    {t("gq.details.address")}
                  </h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="gq-country" className={labelClass}>
                        {t("gq.location.country")} <Required t={t} />
                      </label>
                      <IconField icon={Globe}>
                        <SelectField id="gq-country" bare value={country} onChange={setCountry}>
                          <option value="" disabled>
                            {t("gq.location.countryPlaceholder")}
                          </option>
                          {COUNTRIES.map((option) => (
                            <option key={option.id} value={option.name}>
                              {localizedCountryName(option, language)}
                            </option>
                          ))}
                        </SelectField>
                      </IconField>
                    </div>
                    <TextField id="gq-postal" icon={MapPin} label={t("gq.location.postal")} required value={postalCode} onChange={setPostalCode} autoComplete="postal-code" t={t} />
                    <TextField id="gq-city" icon={Building2} label={t("gq.location.city")} required value={city} onChange={setCity} autoComplete="address-level2" t={t} />
                    <TextField id="gq-street" icon={Building2} label={t("gq.location.street")} required value={street} onChange={setStreet} autoComplete="address-line1" t={t} />
                  </div>
                  <TextField id="gq-province" icon={MapIcon} label={t("gq.location.state")} value={province} onChange={setProvince} autoComplete="address-level1" t={t} />
                  <TextField id="gq-unit" icon={House} label={t("gq.location.unit")} value={unit} onChange={setUnit} autoComplete="address-line2" t={t} />
                </section>
              </div>

              <section aria-labelledby="gq-logistics-title" className="space-y-5 border-t border-white/10 pt-6">
                <h3 id="gq-logistics-title" className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
                  <Megaphone className="h-5 w-5 text-gold-400" aria-hidden />
                  {t("gq.details.logistics")}
                </h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gq-contact" className={labelClass}>
                      {t("gq.details.contactMethod")} <Required t={t} />
                    </label>
                    <IconField icon={MessageCircle}>
                      <SelectField id="gq-contact" bare value={contactChannel} onChange={(value) => setContactChannel(value as typeof contactChannel)}>
                        {CONTACT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.labelKey)}
                          </option>
                        ))}
                      </SelectField>
                    </IconField>
                  </div>
                  <div>
                    <label htmlFor="gq-access" className={labelClass}>
                      {t("gq.access.label")} <Required t={t} />
                    </label>
                    <IconField icon={KeyRound}>
                      <SelectField id="gq-access" bare value={access} onChange={setAccess}>
                        {ACCESS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.labelKey)}
                          </option>
                        ))}
                      </SelectField>
                    </IconField>
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === REVIEW_STEP && service && (
            <div className="mx-auto max-w-3xl">
              <dl className="divide-y divide-white/10 rounded-2xl border border-gold-500/30 bg-navy-900/60 px-5">
                <OverviewRow icon={Star} label={t("gq.review.service")} value={service.title} accent onEdit={() => goTo(0)} t={t} />
                <OverviewRow icon={House} label={t("gq.review.category")} value={propertyLabel ?? t("gq.review.notSelected")} onEdit={() => goTo(1)} t={t} />
                {hasArea && (
                  <OverviewRow
                    icon={Ruler}
                    label={t("gq.review.scale")}
                    value={
                      isUpholstery && presetId
                        ? `${areaText(area)} · ${t(UPHOLSTERY_PRESETS.find((p) => p.id === presetId)!.labelKey)}`
                        : areaText(area)
                    }
                    accent
                    onEdit={() => goTo(2)}
                    t={t}
                  />
                )}
                <OverviewRow
                  icon={Users}
                  label={t("gq.review.staffing")}
                  value={t("gq.review.staffingValue", { cleaners, hours })}
                  onEdit={() => goTo(3)}
                  t={t}
                />
                {offersFrequency && (
                  <OverviewRow
                    icon={CalendarDays}
                    label={t("gq.review.frequency")}
                    value={
                      frequency
                        ? t(FREQUENCIES.find((f) => f.value === frequency)!.titleKey)
                        : t("gq.review.notSelected")
                    }
                    muted={!frequency}
                    onEdit={() => goTo(3)}
                    t={t}
                  />
                )}
                <OverviewRow
                  icon={CalendarCheck}
                  label={t("gq.review.schedule")}
                  value={slot ? `${date} (${slot})` : `${date} (${t("gq.review.timeToArrange")})`}
                  onEdit={() => goTo(3)}
                  t={t}
                />
                <OverviewRow
                  icon={Sparkles}
                  label={t("gq.review.supplies")}
                  value={
                    selectedSupplies.length
                      ? selectedSupplies
                          .map((s) => `${s.name} × ${supplies[s.id].quantity}`)
                          .join(", ")
                      : t("gq.review.notSelected")
                  }
                  muted={!selectedSupplies.length}
                  onEdit={() => goTo(4)}
                  t={t}
                />
                <OverviewRow
                  icon={MessageSquareText}
                  label={t("gq.review.preferences")}
                  value={`${t(GENDER_OPTIONS.find((g) => g.value === gender)!.labelKey)} · ${staffLanguageLabel(staffLanguage)}`}
                  onEdit={() => goTo(4)}
                  t={t}
                />
                <OverviewRow
                  icon={Paperclip}
                  label={t("gq.review.attachmentsLabel")}
                  value={String(uploadedAttachments.length)}
                  onEdit={() => goTo(4)}
                  t={t}
                />
                <OverviewRow
                  icon={UserRound}
                  label={t("gq.review.contact")}
                  value={[`${firstName} ${lastName}`.trim(), email, phone].filter(Boolean).join(" · ") || "—"}
                  onEdit={() => goTo(5)}
                  t={t}
                />
                <OverviewRow
                  icon={MapPin}
                  label={t("gq.review.address")}
                  value={
                    [street, unit, city, province, postalCode, country]
                      .map((part) => part.trim())
                      .filter(Boolean)
                      .join(", ") || "—"
                  }
                  onEdit={() => goTo(5)}
                  t={t}
                />
              </dl>

              {requirements.trim() && (
                <p className="mt-4 whitespace-pre-line rounded-2xl border border-white/10 bg-navy-900/60 p-4 text-sm text-slate-300">
                  <strong className="mb-1 block text-xs uppercase tracking-wider text-gold-400">{t("gq.prefs.requirements")}</strong>
                  {requirements.trim()}
                </p>
              )}

              <p className="mt-5 flex items-start gap-4 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-5 text-sm leading-relaxed text-slate-200">
                <Shield className="mt-0.5 h-7 w-7 shrink-0 text-sky-300" aria-hidden />
                {t("gq.review.note")}
              </p>
            </div>
          )}

          {(showErrors && missingHere.length > 0) || (step === REVIEW_STEP && missingAll.length > 0) ? (
            <div role="alert" className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
              <p className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                <CircleAlert className="h-4 w-4" aria-hidden />
                {step === REVIEW_STEP ? t("gq.review.missing") : t("gq.stepMissing")}
              </p>
              <ul className="list-inside list-disc space-y-0.5 text-xs">
                {(step === REVIEW_STEP ? missingAll : missingHere).map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {submitError && (
            <p role="alert" className="mt-4 text-sm font-semibold text-red-400">
              {submitError}
            </p>
          )}

          <footer className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl border border-gold-500/50 px-5 py-3 text-sm font-bold text-gold-400 transition hover:bg-gold-500/10 disabled:opacity-50 sm:px-7"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t("gq.back")}
              </button>
            ) : (
              <span />
            )}
            {step < REVIEW_STEP ? (
              <button
                type="button"
                onClick={next}
                className="gold-gradient-bg flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/20 transition hover:brightness-110 sm:px-8"
              >
                {step === REVIEW_STEP - 1 ? t("gq.continueReview") : t("gq.continue")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting || missingAll.length > 0}
                className="gold-gradient-bg flex flex-1 items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-base font-bold text-navy-900 shadow-lg shadow-gold-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-10 sm:text-lg"
              >
                {submitting ? t("gq.review.submitting") : t("gq.review.submit")}
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
              </button>
            )}
          </footer>
        </div>
      </div>
    </main>
  );
}

function StepTracker({
  step,
  visited,
  onSelect,
  t,
}: {
  step: number;
  visited: number;
  onSelect: (step: number) => void;
  t: Translate;
}) {
  return (
    <nav aria-label={t("gq.nav.label")} className="rounded-2xl border border-white/10 bg-navy-800/90 px-2 py-4 backdrop-blur-md sm:px-6">
      <ol className="flex items-start">
        {STEPS.map(({ navKey }, index) => {
          const current = index === step;
          const done = index < step;
          const reachable = index <= visited && !current;
          return (
            <li key={navKey} className="relative flex flex-1 flex-col items-center">
              {index > 0 && (
                <span
                  className={cn(
                    "absolute right-1/2 top-4 h-px w-full -translate-y-1/2",
                    index <= step ? "bg-gold-500/70" : "bg-white/15",
                  )}
                  aria-hidden
                />
              )}
              <button
                type="button"
                onClick={() => onSelect(index)}
                disabled={!reachable}
                aria-current={current ? "step" : undefined}
                className="relative z-10 flex flex-col items-center gap-1.5 disabled:cursor-default"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors sm:h-9 sm:w-9 sm:text-sm",
                    current
                      ? "gold-gradient-bg border-transparent text-navy-900 shadow-lg shadow-gold-500/30"
                      : done || reachable
                        ? "border-gold-500 bg-navy-900 text-gold-400"
                        : "border-white/20 bg-navy-900 text-slate-500",
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-center text-[10px] leading-tight sm:block sm:text-xs",
                    current ? "font-bold text-gold-400" : done || reachable ? "text-slate-200" : "text-slate-500",
                  )}
                >
                  {t(navKey)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-center text-xs font-bold text-gold-400 sm:hidden">{t(STEPS[step].navKey)}</p>
    </nav>
  );
}

function Required({ t }: { t: Translate }) {
  return (
    <span className="text-gold-400" aria-label={t("gq.required")}>
      *
    </span>
  );
}

function IconField({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-white/15 bg-navy-900 transition-colors focus-within:border-gold-500/60">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center border-r border-white/10 text-slate-400">
        <Icon className="h-4.5 w-4.5" aria-hidden />
      </span>
      {children}
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  bare,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  /** Inside an IconField — no border of its own. */
  bare?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative min-w-0 flex-1", !bare && "rounded-xl border border-white/15 bg-navy-900 focus-within:border-gold-500/60")}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClass, "cursor-pointer appearance-none pr-10 [&>option]:bg-navy-900")}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
    </div>
  );
}

function TextField({
  id,
  icon,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  autoComplete,
  t,
}: {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  t: Translate;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <Required t={t} />}
      </label>
      <IconField icon={icon}>
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
        />
      </IconField>
    </div>
  );
}

function PrefCard({ icon: Icon, label, htmlFor, children }: { icon: LucideIcon; label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className={cn(panelClass, "flex gap-4")}>
      <span className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 sm:flex">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-white">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}

function StepButton({
  kind,
  label,
  disabled,
  onClick,
}: {
  kind: "plus" | "minus";
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
        kind === "plus"
          ? "gold-gradient-bg text-navy-900 shadow-md hover:brightness-110"
          : "border border-white/15 bg-navy-700 text-white hover:bg-navy-600",
      )}
    >
      {kind === "plus" ? <Plus className="h-5 w-5" strokeWidth={3} aria-hidden /> : <Minus className="h-5 w-5" strokeWidth={3} aria-hidden />}
    </button>
  );
}

function CounterCard({
  title,
  text,
  unit,
  value,
  min = 1,
  max,
  onChange,
  t,
}: {
  title: string;
  text: string;
  unit: string;
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  t: Translate;
}) {
  return (
    <div className={panelClass}>
      <p className="text-sm font-bold uppercase tracking-wider text-white">{title}</p>
      <p className="mb-5 mt-1 text-sm text-slate-400">{text}</p>
      <div className="flex items-center justify-between gap-3">
        <StepButton kind="minus" label={t("gq.decrease", { label: title })} disabled={value <= min} onClick={() => onChange(clamp(value - 1, min, max))} />
        <p className="text-center" aria-live="polite">
          <span className="block font-display text-4xl font-bold leading-none text-gold-400">{value}</span>
          <span className="mt-1 block text-sm text-slate-300">{unit}</span>
        </p>
        <StepButton kind="plus" label={t("gq.increase", { label: title })} disabled={value >= max} onClick={() => onChange(clamp(value + 1, min, max))} />
      </div>
    </div>
  );
}

function SmallStepper({
  value,
  max,
  label,
  onChange,
  t,
}: {
  value: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
  t: Translate;
}) {
  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-navy-700 text-white transition hover:bg-navy-600 disabled:opacity-40";
  return (
    <span className="flex items-center gap-1.5">
      <button type="button" onClick={() => onChange(clamp(value - 1, 1, max))} disabled={value <= 1} aria-label={t("gq.decrease", { label })} className={buttonClass}>
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(clamp(Number.parseInt(event.target.value, 10) || 1, 1, max))}
        className="h-8 w-14 rounded-lg border border-white/15 bg-navy-900 text-center text-sm font-bold text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => onChange(clamp(value + 1, 1, max))} disabled={value >= max} aria-label={t("gq.increase", { label })} className={buttonClass}>
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </span>
  );
}

function CompletionNotice({
  serviceTitle,
  area,
  formatNumber,
  t,
}: {
  serviceTitle: string;
  area: number;
  formatNumber: (value: number) => string;
  t: Translate;
}) {
  const estimate = completionEstimate(area);
  return (
    <section className="rounded-2xl border border-gold-500/60 bg-gold-500/5 shadow-lg shadow-gold-500/5">
      <h3 className="flex items-center gap-3 border-b border-gold-500/20 px-5 py-4 font-display text-xl font-bold text-gold-400 sm:text-2xl">
        <span className="gold-gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-lg font-black text-navy-900" aria-hidden>
          !
        </span>
        {t("gq.notice.title", { service: serviceTitle, area: formatNumber(area) })}
      </h3>
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex gap-3 p-5">
          <Clock className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" aria-hidden />
          <p className="text-sm text-slate-300">
            {t("gq.notice.standard")}
            <strong className="my-0.5 block text-2xl font-bold text-gold-400">
              {t("gq.notice.hours", { min: estimate.min, max: estimate.max })}
            </strong>
            {t("gq.notice.team", { min: estimate.teamMin, max: estimate.teamMax })}
          </p>
        </div>
        <div className="flex gap-3 p-5">
          <Users className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" aria-hidden />
          <p className="text-sm text-slate-300">
            <strong className="block text-white">{t("gq.notice.shortenTitle")}</strong>
            {t("gq.notice.shortenText")}
          </p>
        </div>
        <div className="flex gap-3 p-5">
          <FileText className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" aria-hidden />
          <p className="text-sm text-slate-300">
            <strong className="block text-white">{t("gq.notice.reducedTitle")}</strong>
            {t("gq.notice.reducedText")}
          </p>
        </div>
      </div>
    </section>
  );
}

function AttachmentTile({ attachment, onRemove, t }: { attachment: Attachment; onRemove: () => void; t: Translate }) {
  return (
    <li
      className={cn(
        "group relative aspect-square overflow-hidden rounded-xl border bg-navy-700",
        attachment.status === "error" ? "border-red-500" : "border-gold-500/40",
      )}
    >
      {attachment.previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
        <img src={attachment.previewUrl} alt={attachment.name} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-gold-400">
          <FileText className="h-8 w-8" aria-hidden />
        </span>
      )}
      {attachment.status === "uploading" && (
        <span className="absolute inset-0 flex items-center justify-center bg-navy-900/60">
          <Loader2 className="h-5 w-5 animate-spin text-gold-400" aria-label={t("gq.images.uploading")} />
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label={t("gq.images.remove", { name: attachment.name })}
        className="absolute right-1 top-1 rounded-full bg-red-600 p-1.5 text-white opacity-90 transition hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <Trash2 className="h-3 w-3" aria-hidden />
      </button>
      <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-navy-900/80 px-1 py-0.5 text-center text-[8px] font-bold text-gold-400">
        {attachment.name}
      </span>
    </li>
  );
}

function OverviewRow({
  icon: Icon,
  label,
  value,
  accent,
  muted,
  onEdit,
  t,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
  onEdit: () => void;
  t: Translate;
}) {
  return (
    <div className="flex items-center gap-4 py-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-800 text-gold-400">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <dt className="w-32 shrink-0 text-sm text-slate-400 sm:w-44">{label}:</dt>
      <dd
        className={cn(
          "min-w-0 flex-1 break-words text-right text-sm font-bold",
          muted ? "font-normal text-slate-500" : accent ? "text-gold-400" : "text-white",
        )}
      >
        {value}
      </dd>
      <button
        type="button"
        onClick={onEdit}
        aria-label={t("gq.review.editItem", { item: label })}
        className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-gold-400"
      >
        <FilePen className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
