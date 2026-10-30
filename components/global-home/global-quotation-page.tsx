"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookMarked,
  BriefcaseBusiness,
  Brush,
  CalendarDays,
  CircleAlert,
  Clock,
  CloudUpload,
  FileText,
  FlaskConical,
  Gem,
  Images,
  Info,
  Loader2,
  MapPinned,
  Minus,
  NotebookPen,
  PackageOpen,
  Paperclip,
  Plus,
  RotateCcw,
  Ruler,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  Trash2,
  UserCheck,
  Wind,
  X,
  type LucideIcon,
} from "lucide-react";
import { PhoneInput } from "@/components/phone-input";
import { ApiError } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/language-context";
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
import { SERVICE_CATEGORIES } from "./services-catalog";

type Translate = (key: GlobalKey, vars?: Record<string, string | number>) => string;

/** A quotable service as this page shows it — built on the server from the catalog and the Our Services copy. */
export interface QuotationServiceOption {
  /** Catalog id, sent as the quotation line's serviceId. */
  id: number;
  /** Base English slug (e.g. "deep-cleaning"). */
  name: string;
  title: string;
  headline: string;
  image: string;
  category: string;
}

const AREA_MIN = 20;
const AREA_MAX = 10000;
const AREA_STEPS = [10, 50, 500];
const DEFAULT_AREA = 100;

/** Personal-support services — priced by people and hours, never by area. */
const NO_AREA_SERVICES = new Set(["child-care-service", "elder-care-service", "laundry-service"]);
const UPHOLSTERY_SERVICE = "carpet-upholstery-cleaning";

/** `value` is the English wording saved on the quotation the team reads. */
const UPHOLSTERY_PRESETS: { id: string; area: number; labelKey: GlobalKey; value: string }[] = [
  { id: "1seater", area: 2, labelKey: "gq.preset.1seater", value: "1-seater armchair" },
  { id: "2seater", area: 4, labelKey: "gq.preset.2seater", value: "2-seater loveseat" },
  { id: "3seater", area: 6, labelKey: "gq.preset.3seater", value: "3-seater sofa" },
  { id: "lshape", area: 10, labelKey: "gq.preset.lshape", value: "L-shaped corner sofa" },
  { id: "modular", area: 15, labelKey: "gq.preset.modular", value: "Modular sectional" },
  { id: "mattress", area: 3, labelKey: "gq.preset.mattress", value: "Mattress" },
  { id: "dining", area: 4, labelKey: "gq.preset.dining", value: "Dining chairs (x4)" },
];

interface UnitOption {
  value: string;
  labelKey: GlobalKey;
}

interface SupplyOption {
  id: string;
  /** The catalog's own item name — shown and saved on the quotation as-is. */
  name: string;
  badgeKey: GlobalKey;
  descKey: GlobalKey;
  icon: LucideIcon;
  units: UnitOption[];
}

const UNIT = {
  liters: { value: "Litres", labelKey: "gq.unit.liters" },
  gallons: { value: "Gallons", labelKey: "gq.unit.gallons" },
  bottles: { value: "Bottles", labelKey: "gq.unit.bottles" },
  mops: { value: "Mops", labelKey: "gq.unit.mops" },
  sets: { value: "Sets", labelKey: "gq.unit.sets" },
  kits: { value: "Kits", labelKey: "gq.unit.kits" },
  boxes: { value: "Boxes", labelKey: "gq.unit.boxes" },
  vacuums: { value: "Vacuums", labelKey: "gq.unit.vacuums" },
  units: { value: "Units", labelKey: "gq.unit.units" },
} satisfies Record<string, UnitOption>;

const SUPPLIES: SupplyOption[] = [
  {
    id: "bioSolvent",
    name: "BIO - SOLVENT",
    badgeKey: "gq.supply.bioSolvent.badge",
    descKey: "gq.supply.bioSolvent.desc",
    icon: FlaskConical,
    units: [UNIT.liters, UNIT.gallons, UNIT.bottles],
  },
  {
    id: "mop",
    name: "MOP (1 MOP)",
    badgeKey: "gq.supply.mop.badge",
    descKey: "gq.supply.mop.desc",
    icon: Brush,
    units: [UNIT.mops, UNIT.sets],
  },
  {
    id: "materials",
    name: "MATERIALS (1 KIT)",
    badgeKey: "gq.supply.materials.badge",
    descKey: "gq.supply.materials.desc",
    icon: PackageOpen,
    units: [UNIT.kits, UNIT.boxes],
  },
  {
    id: "vacuum",
    name: "VACUUM (1 VAC)",
    badgeKey: "gq.supply.vacuum.badge",
    descKey: "gq.supply.vacuum.desc",
    icon: Wind,
    units: [UNIT.vacuums, UNIT.units],
  },
];

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

interface ServiceLineState {
  serviceId: number;
  cleaners: number;
  hours: number;
  /** Null for personal-support services. */
  area: number | null;
  /** Carpet & upholstery only — the chosen UPHOLSTERY_PRESETS id. */
  presetId: string | null;
}

interface SupplyState {
  quantity: number;
  unit: string;
  msds: boolean;
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

const STEP_SECTIONS: { id: string; navKey: GlobalKey; icon: LucideIcon }[] = [
  { id: "gq-schedule", navKey: "gq.nav.schedule", icon: CalendarDays },
  { id: "gq-services", navKey: "gq.nav.services", icon: BriefcaseBusiness },
  { id: "gq-supplies", navKey: "gq.nav.supplies", icon: FlaskConical },
  { id: "gq-requirements", navKey: "gq.nav.requirements", icon: BookMarked },
  { id: "gq-details", navKey: "gq.nav.details", icon: UserCheck },
  { id: "gq-location", navKey: "gq.nav.location", icon: MapPinned },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function revokePreview(attachment: Attachment) {
  if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
}

/** A freshly ticked service's defaults — 1 professional × 1 hour, 100 m² (a 3-seater sofa for upholstery). */
function newLine(service: QuotationServiceOption): ServiceLineState {
  const isUpholstery = service.name === UPHOLSTERY_SERVICE;
  return {
    serviceId: service.id,
    cleaners: 1,
    hours: 1,
    area: NO_AREA_SERVICES.has(service.name) ? null : isUpholstery ? 6 : DEFAULT_AREA,
    presetId: isUpholstery ? "3seater" : null,
  };
}

const fieldClass =
  "w-full rounded-xl border border-gold-600/40 bg-cream px-4 py-3 text-sm font-semibold text-navy-900 shadow-sm placeholder:font-normal placeholder:text-navy-900/40 focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wider text-navy-900";
const cardClass = "rounded-3xl border border-gold-600/30 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8";

/**
 * The global gateway's quotation request page (/request-quotation
 * on IS_GLOBAL_SITE): several services at once, each with its own crew, hours
 * and area, plus supplies, notes, reference photos and contact/location
 * details — sent as one multi-service quotation. No prices anywhere.
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

  const [date, setDate] = useState(defaultDate);
  const [slot, setSlot] = useState<string | null>(null);
  const [slotFilter, setSlotFilter] = useState<SlotFilter>("all");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [lines, setLines] = useState<ServiceLineState[]>(() => {
    const initial = services.find((s) => s.name === initialServiceName);
    return initial ? [newLine(initial)] : [];
  });

  const [supplies, setSupplies] = useState<Record<string, SupplyState>>({});

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

  const [country, setCountry] = useState(initialLocation?.country ?? "");
  const [postalCode, setPostalCode] = useState(initialLocation?.postalCode ?? "");
  const [city, setCity] = useState(initialLocation?.city ?? "");
  const [province, setProvince] = useState("");
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");

  const reviewRef = useRef<HTMLDialogElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Revoke every image thumbnail's object URL when the page goes away.
  useEffect(() => () => attachmentsRef.current.forEach(revokePreview), []);

  const servicesById = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  const visibleServices = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return services.filter(
      (s) =>
        (category === "all" || s.category === category) &&
        (!query || s.title.toLocaleLowerCase().includes(query) || s.headline.toLocaleLowerCase().includes(query)),
    );
  }, [services, search, category]);

  const visibleSlots = SLOTS.filter((s) => slotFilter === "all" || slotPeriod(s) === slotFilter);
  const selectedSupplies = SUPPLIES.filter((s) => supplies[s.id]);
  const uploadedAttachments = attachments.filter((a) => a.status === "done" && a.key);

  function toggleService(service: QuotationServiceOption) {
    setLines((current) =>
      current.some((line) => line.serviceId === service.id)
        ? current.filter((line) => line.serviceId !== service.id)
        : [...current, newLine(service)],
    );
  }

  function updateLine(serviceId: number, patch: Partial<ServiceLineState>) {
    setLines((current) => current.map((line) => (line.serviceId === serviceId ? { ...line, ...patch } : line)));
  }

  function toggleSupply(supply: SupplyOption) {
    setSupplies((current) => {
      if (current[supply.id]) {
        const rest = { ...current };
        delete rest[supply.id];
        return rest;
      }
      return {
        ...current,
        [supply.id]: {
          quantity: 1,
          unit: supply.units[0].value,
          msds: true,
        },
      };
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
        {
          id,
          name: file.name,
          previewUrl: isImage ? URL.createObjectURL(file) : null,
          key: null,
          status: "uploading",
        },
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

  function resetForm() {
    attachments.forEach(revokePreview);
    setDate(defaultDate);
    setSlot(null);
    setSlotFilter("all");
    setSearch("");
    setCategory("all");
    setLines([]);
    setSupplies({});
    setRequirements("");
    setAttachments([]);
    setAttachmentError(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setPostalCode("");
    setCity("");
    setProvince("");
    setStreet("");
    setUnit("");
    setSubmitError(null);
  }

  const missing: string[] = [
    !lines.length && t("gq.error.service"),
    !date && t("gq.error.date"),
    !firstName.trim() && t("gq.error.firstName"),
    !EMAIL_PATTERN.test(email.trim()) && t("gq.error.email"),
    phone.trim().length < 6 && t("gq.error.phone"),
    country.trim().length < 2 && t("gq.error.country"),
    !city.trim() && t("gq.error.city"),
    !street.trim() && t("gq.error.street"),
    attachments.some((a) => a.status === "uploading") && t("gq.error.uploading"),
  ].filter((message): message is string => !!message);

  function openReview() {
    setSubmitError(null);
    reviewRef.current?.showModal();
  }

  async function submit() {
    if (missing.length || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const quotation = await createQuotation({
        serviceId: lines[0].serviceId,
        serviceLines: lines.map((line) => ({
          serviceId: line.serviceId,
          numCleaners: line.cleaners,
          durationHours: line.hours,
          propertySizeSqm: line.area ?? undefined,
          upholsteryPreset: UPHOLSTERY_PRESETS.find((p) => p.id === line.presetId)?.value,
        })),
        supplyLines: selectedSupplies.map((supply) => {
          const state = supplies[supply.id];
          return {
            name: supply.name,
            quantity: state.quantity,
            unit: state.unit,
            msds: state.msds,
          };
        }),
        date,
        time: slot ?? undefined,
        attachments: uploadedAttachments.map((a) => ({ key: a.key as string, name: a.name })),
        specialRequirements: requirements.trim() || undefined,
        language,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim(),
        contact: phone.trim(),
        country: country.trim(),
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

  const unitLabel = (supply: SupplyOption, value: string) => {
    const option = supply.units.find((u) => u.value === value);
    return option ? t(option.labelKey) : value;
  };
  const areaText = (line: ServiceLineState) => {
    if (line.area == null) return "—";
    const preset = UPHOLSTERY_PRESETS.find((p) => p.id === line.presetId);
    return preset ? `${line.area} m² (${t(preset.labelKey)})` : `${line.area} m²`;
  };

  return (
    <main className={cn(playfair.variable, "flex-1 bg-cream font-sans text-navy-900")}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-gold-500/30 bg-navy-700 px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-5xl space-y-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            <Gem className="h-3.5 w-3.5" aria-hidden />
            {t("gq.hero.badge")}
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {t("gq.hero.title")}{" "}
            <span className="bg-linear-to-br from-gold-300 via-gold-500 to-gold-700 bg-clip-text font-normal italic text-transparent">
              {t("gq.hero.titleAccent")}
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-gold-300/90 sm:text-lg">
            {t("gq.hero.subtitle")}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-semibold sm:gap-6">
            {(
              [
                [ShieldCheck, "gq.hero.pill1"],
                [SlidersHorizontal, "gq.hero.pill2"],
                [Images, "gq.hero.pill3"],
              ] as const
            ).map(([Icon, key]) => (
              <li
                key={key}
                className="flex items-center gap-2 rounded-2xl border border-gold-500/20 bg-navy-600/80 px-4 py-2 shadow-inner"
              >
                <Icon className="h-4 w-4 text-gold-400" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="space-y-12 py-12 sm:space-y-16 sm:py-16">
        {/* 2. Short description */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gold-600/40 bg-white p-6 shadow-xl shadow-navy-900/10 sm:p-8">
            <div className="grid grid-cols-1 gap-6 divide-y divide-gold-600/20 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
              {(
                [
                  [BriefcaseBusiness, "gq.intro.pros.title", "gq.intro.pros.text"],
                  [Ruler, "gq.intro.scale.title", "gq.intro.scale.text"],
                  [BookMarked, "gq.intro.notes.title", "gq.intro.notes.text"],
                ] as const
              ).map(([Icon, titleKey, textKey]) => (
                <div key={titleKey} className="px-4 pt-4 first:pt-0 md:pt-0">
                  <IconTile icon={Icon} className="mx-auto mb-3" />
                  <h2 className="font-display text-lg font-bold">{t(titleKey)}</h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-900/70">{t(textKey)}</p>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label={t("gq.nav.label")} className="mt-6">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              {STEP_SECTIONS.map(({ id, navKey, icon: Icon }, index) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex items-center gap-1.5 rounded-full border border-gold-600/30 bg-navy-700 px-3 py-1.5 text-gold-400 transition-colors hover:border-gold-500"
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {index + 1}. {t(navKey)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* 3. Date & time */}
        <StepSection id="gq-schedule" step={1} icon={CalendarDays} title={t("gq.schedule.title")} t={t}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <label htmlFor="gq-date" className={labelClass}>
                {t("gq.schedule.date")} <Required t={t} />
              </label>
              <input
                id="gq-date"
                type="date"
                min={minDate}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={cn(fieldClass, "cursor-pointer py-3.5")}
              />
              <p className="flex gap-1.5 text-[11px] italic leading-relaxed text-navy-900/60">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-gold-600" aria-hidden />
                {t("gq.schedule.dateHint")}
              </p>
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <p className="text-xs font-bold uppercase tracking-wider">
                  <Clock className="mr-1.5 inline h-3.5 w-3.5 text-gold-600" aria-hidden />
                  {t("gq.schedule.window")}
                </p>
                <span
                  aria-live="polite"
                  className="self-start rounded-full border border-gold-500/40 bg-navy-700 px-3.5 py-1 text-xs font-bold text-gold-400 sm:self-auto"
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
                      "rounded-xl border px-3.5 py-1.5 transition-colors",
                      slotFilter === id
                        ? "border-gold-500/40 bg-navy-700 text-gold-400"
                        : "border-gold-600/20 bg-cream hover:bg-gold-500/15",
                    )}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>
              <div className="grid max-h-52 grid-cols-4 gap-2.5 overflow-y-auto rounded-2xl border border-gold-600/25 bg-cream/60 p-3 sm:grid-cols-6 md:grid-cols-8">
                {visibleSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={slot === time}
                    onClick={() => setSlot(slot === time ? null : time)}
                    className={cn(
                      "rounded-xl border px-1 py-2 text-xs font-bold transition-all",
                      slot === time
                        ? "scale-105 border-gold-500 bg-gold-500 text-navy-900 shadow-md"
                        : "border-gold-600/25 bg-white hover:bg-gold-500/20",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </StepSection>

        {/* 4. Services */}
        <StepSection
          id="gq-services"
          step={2}
          icon={BriefcaseBusiness}
          title={t("gq.services.title", { count: services.length })}
          t={t}
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:min-w-60">
                <Search
                  className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold-600"
                  aria-hidden
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("gq.services.search")}
                  aria-label={t("gq.services.search")}
                  className={cn(fieldClass, "py-2.5 pl-9 pr-3 text-xs")}
                />
              </div>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label={t("gq.services.allCategories", { count: services.length })}
                className={cn(fieldClass, "cursor-pointer py-2.5 text-xs font-bold")}
              >
                <option value="all">{t("gq.services.allCategories", { count: services.length })}</option>
                {SERVICE_CATEGORIES.map(({ id, labelKey }) => (
                  <option key={id} value={id}>
                    {t(labelKey)}
                  </option>
                ))}
              </select>
            </div>
          }
        >
          {visibleServices.length ? (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((service) => {
                const line = lines.find((l) => l.serviceId === service.id);
                return (
                  <li key={service.id}>
                    <ServiceCard
                      service={service}
                      line={line}
                      onToggle={() => toggleService(service)}
                      onChange={(patch) => updateLine(service.id, patch)}
                      t={t}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="py-12 text-center text-xs italic text-navy-900/50">{t("gq.services.empty")}</p>
          )}
        </StepSection>

        {/* 5. Supplies */}
        <StepSection
          id="gq-supplies"
          step={3}
          icon={FlaskConical}
          title={t("gq.supplies.title")}
          t={t}
          actions={
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-gold-500/40 bg-navy-700 px-3.5 py-1.5 text-xs font-bold text-gold-400 sm:self-auto">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {t("gq.supplies.badge")}
            </span>
          }
        >
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SUPPLIES.map((supply) => {
              const state = supplies[supply.id];
              const name = supply.name;
              return (
                <li
                  key={supply.id}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl border border-l-4 border-l-gold-500 p-5 transition-all",
                    state
                      ? "border-gold-500 bg-gold-500/15 shadow-lg ring-1 ring-gold-500/60"
                      : "border-gold-600/25 bg-white hover:border-gold-600/50",
                  )}
                >
                  <label className="flex cursor-pointer items-start justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-600/30",
                          state ? "bg-navy-700 text-gold-400 shadow-md" : "bg-gold-500/15",
                        )}
                      >
                        <supply.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <span className="mb-1 inline-block rounded-md border border-gold-600/30 bg-navy-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-400">
                          {t(supply.badgeKey)}
                        </span>
                        <span className="block font-display text-base font-bold leading-tight">{name}</span>
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={!!state}
                      onChange={() => toggleSupply(supply)}
                      aria-label={t("gq.supplies.select", { item: name })}
                      className="mt-1 h-5 w-5 cursor-pointer accent-gold-500"
                    />
                  </label>
                  <p className="mt-2.5 text-[11px] font-light leading-relaxed text-navy-900/70">{t(supply.descKey)}</p>

                  {state && (
                    <div className="mt-4 space-y-3 border-t border-gold-600/30 pt-4 text-xs">
                      <div className="rounded-xl border border-gold-600/30 bg-cream/90 p-3 shadow-inner">
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider">
                            {t("gq.supplies.quantity")}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <NumberStepper
                              value={state.quantity}
                              min={1}
                              max={999}
                              label={t("gq.supplies.quantity")}
                              onChange={(quantity) => updateSupply(supply.id, { quantity })}
                              t={t}
                            />
                            <select
                              value={state.unit}
                              onChange={(event) => updateSupply(supply.id, { unit: event.target.value })}
                              aria-label={t("gq.supplies.unit")}
                              className="cursor-pointer rounded-lg border border-gold-600/30 bg-white px-1.5 py-1 font-bold"
                            >
                              {supply.units.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {t(option.labelKey)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <label className="inline-flex cursor-pointer items-center gap-2 text-[11px] font-bold">
                        <input
                          type="checkbox"
                          checked={state.msds}
                          onChange={(event) => updateSupply(supply.id, { msds: event.target.checked })}
                          className="h-4 w-4 accent-gold-500"
                        />
                        <FileText className="h-3.5 w-3.5 text-gold-600" aria-hidden />
                        {t("gq.supplies.msds")}
                      </label>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </StepSection>

        {/* 6. Special requirements & attachments */}
        <StepSection id="gq-requirements" step={4} icon={BookMarked} title={t("gq.notes.title")} t={t}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-gold-600/30 bg-cream/80 p-6">
              <SubHeading icon={NotebookPen} title={t("gq.notebook.title")} />
              <p className="text-xs leading-relaxed text-navy-900/70">{t("gq.notebook.text")}</p>
              <textarea
                id="gq-requirements-text"
                rows={6}
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                placeholder={t("gq.notebook.placeholder")}
                aria-label={t("gq.notebook.title")}
                className={cn(fieldClass, "bg-white text-xs shadow-inner")}
              />
            </div>

            <div className="space-y-4 rounded-2xl border border-gold-600/30 bg-cream/80 p-6">
              <SubHeading icon={Paperclip} title={t("gq.images.title")} />
              <p className="text-xs leading-relaxed text-navy-900/70">{t("gq.images.text")}</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachments.length >= CHECKOUT_ATTACHMENT_MAX_COUNT}
                className="w-full rounded-2xl border-2 border-dashed border-gold-600/50 bg-white/80 p-4 text-center transition-colors hover:bg-gold-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CloudUpload className="mx-auto mb-2 h-8 w-8 text-gold-600" aria-hidden />
                <span className="block text-xs font-bold">{t("gq.images.upload")}</span>
                <span className="mt-1 block text-[10px] text-navy-900/60">
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
                <p role="alert" className="text-xs font-semibold text-red-700">
                  {attachmentError}
                </p>
              )}
              {attachments.length > 0 && (
                <ul className="grid grid-cols-3 gap-2.5 pt-2 sm:grid-cols-4">
                  {attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-xl border bg-navy-700 shadow-sm",
                        attachment.status === "error" ? "border-red-500" : "border-gold-600/40",
                      )}
                    >
                      {attachment.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
                        <img
                          src={attachment.previewUrl}
                          alt={attachment.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-gold-400">
                          <FileText className="h-8 w-8" aria-hidden />
                        </span>
                      )}
                      {attachment.status === "uploading" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-navy-900/60">
                          <Loader2
                            className="h-5 w-5 animate-spin text-gold-400"
                            aria-label={t("gq.images.uploading")}
                          />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        aria-label={t("gq.images.remove", { name: attachment.name })}
                        className="absolute right-1 top-1 rounded-full bg-red-600 p-1.5 text-white opacity-90 transition hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden />
                      </button>
                      <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-navy-900/80 px-1 py-0.5 text-center text-[8px] font-bold text-gold-400">
                        {attachment.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </StepSection>

        {/* 7. Customer details */}
        <StepSection id="gq-details" step={5} icon={UserCheck} title={t("gq.details.title")} t={t}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              id="gq-first-name"
              label={t("gq.details.firstName")}
              required
              value={firstName}
              onChange={setFirstName}
              autoComplete="given-name"
              t={t}
            />
            <TextField
              id="gq-last-name"
              label={t("gq.details.lastName")}
              value={lastName}
              onChange={setLastName}
              autoComplete="family-name"
              t={t}
            />
            <TextField
              id="gq-email"
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
              <PhoneInput
                name="phone"
                value={phone}
                onChange={setPhone}
                placeholder={t("gq.details.phone")}
                className="h-12 text-navy-900"
              />
            </div>
          </div>
        </StepSection>

        {/* 8. Location */}
        <StepSection id="gq-location" step={6} icon={MapPinned} title={t("gq.location.title")} t={t}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TextField
              id="gq-country"
              label={t("gq.location.country")}
              required
              value={country}
              onChange={setCountry}
              placeholder={t("gq.location.countryPlaceholder")}
              autoComplete="country-name"
              t={t}
            />
            <TextField
              id="gq-postal"
              label={t("gq.location.postal")}
              value={postalCode}
              onChange={setPostalCode}
              autoComplete="postal-code"
              t={t}
            />
            <TextField
              id="gq-city"
              label={t("gq.location.city")}
              required
              value={city}
              onChange={setCity}
              autoComplete="address-level2"
              t={t}
            />
            <TextField
              id="gq-province"
              label={t("gq.location.state")}
              value={province}
              onChange={setProvince}
              autoComplete="address-level1"
              t={t}
            />
            <TextField
              id="gq-street"
              label={t("gq.location.street")}
              required
              value={street}
              onChange={setStreet}
              autoComplete="address-line1"
              t={t}
            />
            <TextField
              id="gq-unit"
              label={t("gq.location.unit")}
              value={unit}
              onChange={setUnit}
              autoComplete="address-line2"
              t={t}
            />
          </div>
        </StepSection>
      </div>

      {/* Sticky summary bar */}
      <div className="sticky bottom-0 z-40 border-t-2 border-gold-500 bg-navy-700 px-4 py-4 text-white shadow-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500 bg-gold-500/20 text-gold-400 shadow-lg sm:flex">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div aria-live="polite">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400">{t("gq.bar.title")}</p>
              <p className="mt-0.5 font-display text-xs font-bold sm:text-sm">
                {t("gq.bar.summary", {
                  services: lines.length,
                  supplies: selectedSupplies.length,
                  attachments: uploadedAttachments.length,
                })}
                {slot && ` · ${t("gq.schedule.selected", { time: slot })}`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={resetForm}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-navy-600 px-4 py-3 text-xs font-bold text-white/80 transition hover:border-gold-500 hover:text-gold-400 sm:w-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              {t("gq.bar.clear")}
            </button>
            <button
              type="button"
              onClick={openReview}
              className="gold-gradient-bg flex w-1/2 items-center justify-center gap-2 rounded-xl px-7 py-3 text-xs font-bold uppercase tracking-wider text-navy-900 shadow-lg shadow-gold-500/30 transition hover:brightness-110 sm:w-auto"
            >
              <Send className="h-3.5 w-3.5" aria-hidden />
              {t("gq.bar.review")}
            </button>
          </div>
        </div>
      </div>

      {/* Review & submit */}
      <dialog
        ref={reviewRef}
        aria-labelledby="gq-review-title"
        onClick={(event) => event.target === reviewRef.current && !submitting && reviewRef.current?.close()}
        onCancel={(event) => submitting && event.preventDefault()}
        className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-3xl border border-gold-500 bg-white p-0 text-navy-900 shadow-2xl backdrop:bg-navy-900/85 backdrop:backdrop-blur-md"
      >
        <div className="flex items-center justify-between border-b border-gold-500/30 bg-navy-700 p-6 text-white">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/20 text-gold-400">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 id="gq-review-title" className="font-display text-lg font-bold">
                {t("gq.review.title")}
              </h2>
              <p className="text-[11px] text-gold-400">{t("gq.review.subtitle")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => reviewRef.current?.close()}
            disabled={submitting}
            aria-label={t("gq.review.close")}
            className="text-white/60 transition hover:text-gold-400"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-10">
          {missing.length > 0 && (
            <div role="alert" className="rounded-2xl border-2 border-red-500/40 bg-red-50 p-5 text-red-900">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                <CircleAlert className="h-4 w-4" aria-hidden />
                {t("gq.review.missing")}
              </p>
              <ul className="list-inside list-disc space-y-1 text-xs">
                {missing.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gold-600/30 bg-cream p-5 text-xs md:grid-cols-2">
            <div className="space-y-1.5">
              <h3 className="border-b border-gold-600/20 pb-1 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                {t("gq.review.customer")}
              </h3>
              <ReviewRow label={t("gq.details.firstName")} value={firstName} />
              <ReviewRow label={t("gq.details.lastName")} value={lastName} />
              <ReviewRow label={t("gq.details.email")} value={email} />
              <ReviewRow label={t("gq.details.phone")} value={phone} />
            </div>
            <div className="space-y-1.5">
              <h3 className="border-b border-gold-600/20 pb-1 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                {t("gq.review.schedule")}
              </h3>
              <ReviewRow label={t("gq.review.date")} value={date || t("gq.review.toArrange")} />
              <ReviewRow label={t("gq.review.time")} value={slot ?? t("gq.review.toArrange")} />
              <ReviewRow
                label={t("gq.review.address")}
                value={[street, unit, city, province, postalCode, country]
                  .map((part) => part.trim())
                  .filter(Boolean)
                  .join(", ")}
              />
            </div>
          </div>

          {lines.length > 0 && (
            <ReviewTable
              title={t("gq.review.servicesTitle", { count: lines.length })}
              headers={[t("gq.review.service"), t("gq.review.headcount"), t("gq.review.duration"), t("gq.review.area")]}
              rows={lines.map((line, index) => [
                `${index + 1}. ${servicesById.get(line.serviceId)?.title ?? ""}`,
                String(line.cleaners),
                String(line.hours),
                areaText(line),
              ])}
            />
          )}

          {selectedSupplies.length > 0 && (
            <ReviewTable
              title={t("gq.review.suppliesTitle", { count: selectedSupplies.length })}
              headers={[
                t("gq.review.supply"),
                t("gq.review.quantity"),
              ]}
              rows={selectedSupplies.map((supply, index) => {
                const state = supplies[supply.id];
                return [
                  `${index + 1}. ${supply.name}`,
                  `${state.quantity} ${unitLabel(supply, state.unit)}`,
                ];
              })}
            />
          )}

          <div className="rounded-xl border border-gold-600/30 bg-cream/80 p-4 text-xs text-navy-900/80">
            <strong className="mb-1 block text-gold-700">{t("gq.notebook.title")}</strong>
            <span className="whitespace-pre-line">{requirements.trim() || "—"}</span>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-gold-600/20 pt-3 text-xs font-bold sm:flex-row">
            <span>{t("gq.review.attachments", { count: uploadedAttachments.length })}</span>
            <span className="uppercase tracking-wider text-gold-700">{t("gq.review.noPrice")}</span>
          </div>

          {submitError && (
            <p role="alert" className="text-sm font-semibold text-red-700">
              {submitError}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-gold-600/30 bg-cream p-5">
          <button
            type="button"
            onClick={() => reviewRef.current?.close()}
            disabled={submitting}
            className="rounded-xl bg-navy-900/10 px-5 py-2.5 text-xs font-bold transition hover:bg-navy-900/20 disabled:opacity-60"
          >
            {t("gq.review.edit")}
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={missing.length > 0 || submitting}
            className="flex items-center gap-2 rounded-xl border border-gold-500/40 bg-navy-700 px-5 py-2.5 text-xs font-bold text-gold-400 shadow-sm transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Send className="h-3.5 w-3.5" aria-hidden />}
            {submitting ? t("gq.review.submitting") : t("gq.review.submit")}
          </button>
        </div>
      </dialog>
    </main>
  );
}

function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/30 bg-navy-700 text-gold-400 shadow-lg",
        className,
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

function StepSection({
  id,
  step,
  icon,
  title,
  actions,
  t,
  children,
}: {
  id: string;
  step: number;
  icon: LucideIcon;
  title: string;
  actions?: ReactNode;
  t: Translate;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className={cn(cardClass, "space-y-6")}>
        <div className="flex flex-col justify-between gap-4 border-b border-gold-600/20 pb-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3.5">
            <IconTile icon={icon} />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-700">
                {t("gq.step", { n: step, total: STEP_SECTIONS.length })}
              </span>
              <h2 id={`${id}-title`} className="font-display text-2xl font-bold sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>
          {actions}
        </div>
        {children}
      </div>
    </section>
  );
}

function SubHeading({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-lg font-bold">
      <Icon className="h-4 w-4 text-gold-600" aria-hidden />
      {title}
    </h3>
  );
}

function Required({ t }: { t: Translate }) {
  return (
    <span className="text-gold-600" aria-label={t("gq.required")}>
      *
    </span>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  autoComplete,
  className,
  t,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  className?: string;
  t: Translate;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <Required t={t} />}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}

function NumberStepper({
  value,
  min,
  max,
  label,
  onChange,
  t,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
  t: Translate;
}) {
  const buttonClass =
    "flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/20 font-bold transition hover:bg-gold-500/30 disabled:opacity-40";
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1, min, max))}
        disabled={value <= min}
        aria-label={t("gq.decrease", { label })}
        className={buttonClass}
      >
        <Minus className="h-3 w-3" aria-hidden />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(clamp(Number.parseInt(event.target.value, 10) || min, min, max))}
        className="w-12 rounded-lg border border-gold-600/30 bg-white py-1 text-center text-xs font-bold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1, min, max))}
        disabled={value >= max}
        aria-label={t("gq.increase", { label })}
        className={buttonClass}
      >
        <Plus className="h-3 w-3" aria-hidden />
      </button>
    </div>
  );
}

function ServiceCard({
  service,
  line,
  onToggle,
  onChange,
  t,
}: {
  service: QuotationServiceOption;
  line: ServiceLineState | undefined;
  onToggle: () => void;
  onChange: (patch: Partial<ServiceLineState>) => void;
  t: Translate;
}) {
  const selected = !!line;
  const isUpholstery = service.name === UPHOLSTERY_SERVICE;
  const preset = UPHOLSTERY_PRESETS.find((p) => p.id === line?.presetId);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        selected
          ? "border-gold-500 bg-gold-500/15 shadow-lg ring-1 ring-gold-500/60"
          : "border-gold-600/25 bg-white hover:border-gold-600/50",
      )}
    >
      <label className="relative block h-36 w-full cursor-pointer overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md border border-gold-500/40 bg-navy-900/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gold-400 backdrop-blur-md">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          {t("gq.services.badge")}
        </span>
        <span className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 text-white">
          <span className="font-display text-base font-bold leading-tight">{service.title}</span>
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            aria-label={t("gq.services.select", { service: service.title })}
            className="h-5 w-5 shrink-0 cursor-pointer accent-gold-500"
          />
        </span>
      </label>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-light leading-relaxed text-navy-900/70">{service.headline}</p>

        {line && (
          <div className="mt-4 border-t border-gold-600/30 pt-4 text-xs">
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-gold-600/30 bg-cream/90 p-3.5 shadow-inner">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider">{t("gq.services.cleaners")}</p>
                <NumberStepper
                  value={line.cleaners}
                  min={1}
                  max={50}
                  label={t("gq.services.cleaners")}
                  onChange={(cleaners) => onChange({ cleaners })}
                  t={t}
                />
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider">{t("gq.services.hours")}</p>
                <NumberStepper
                  value={line.hours}
                  min={1}
                  max={48}
                  label={t("gq.services.hours")}
                  onChange={(hours) => onChange({ hours })}
                  t={t}
                />
              </div>

              {line.area == null ? (
                <p className="col-span-2 rounded-lg border border-gold-600/20 bg-cream/80 p-2 text-center text-[10px] italic text-navy-900/60">
                  {t("gq.services.noArea")}
                </p>
              ) : (
                <div className="col-span-2 space-y-2 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t("gq.services.area")}</span>
                    <span className="rounded-md bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-700">
                      {t("gq.services.areaRange")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={AREA_MIN}
                      max={AREA_MAX}
                      step={10}
                      value={Math.max(line.area, AREA_MIN)}
                      aria-label={t("gq.services.area")}
                      onChange={(event) => onChange({ area: Number(event.target.value), presetId: null })}
                      className="w-full cursor-pointer accent-gold-500"
                    />
                    <span className="flex shrink-0 items-center gap-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={AREA_MAX}
                        value={line.area}
                        aria-label={t("gq.services.area")}
                        onChange={(event) =>
                          onChange({
                            area: clamp(Number.parseInt(event.target.value, 10) || 1, 1, AREA_MAX),
                            presetId: null,
                          })
                        }
                        className="w-20 rounded-lg border border-gold-600/40 bg-white px-2 py-1 text-center text-xs font-bold shadow-inner"
                      />
                      <span className="font-bold">m²</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
                    {[-1, 1].map((direction) => (
                      <div key={direction} className="flex items-center gap-1">
                        {(direction < 0 ? [...AREA_STEPS].reverse() : AREA_STEPS).map((step) => (
                          <button
                            key={step}
                            type="button"
                            onClick={() =>
                              onChange({
                                area: clamp((line.area ?? DEFAULT_AREA) + direction * step, AREA_MIN, AREA_MAX),
                                presetId: null,
                              })
                            }
                            className={cn(
                              "rounded-md border border-gold-600/30 px-2 py-0.5 text-[10px] font-bold transition",
                              direction < 0
                                ? "bg-navy-900/10 hover:bg-gold-500/30"
                                : "bg-navy-700 text-gold-400 hover:bg-navy-600",
                            )}
                          >
                            {direction < 0 ? "−" : "+"}
                            {step} m²
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUpholstery && (
                <div className="col-span-2 mt-2 border-t border-gold-600/25 pt-2">
                  <p className="mb-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                    <Sofa className="h-3 w-3 text-gold-600" aria-hidden />
                    {t("gq.services.upholstery")}
                  </p>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {UPHOLSTERY_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={line.presetId === p.id}
                        onClick={() => onChange({ area: p.area, presetId: p.id })}
                        className={cn(
                          "rounded-lg border px-2 py-1 text-[10px] font-semibold transition",
                          line.presetId === p.id
                            ? "border-gold-500 bg-gold-500/30"
                            : "border-gold-600/30 bg-white hover:bg-gold-500/20",
                        )}
                      >
                        {t(p.labelKey)} (~{p.area} m²)
                      </button>
                    ))}
                  </div>
                  <p className="rounded-lg border border-gold-600/30 bg-gold-500/15 p-2 text-[10px] italic">
                    {t("gq.services.upholsteryCurrent", {
                      label: preset ? t(preset.labelKey) : t("gq.services.upholsteryCustom"),
                      area: line.area ?? 0,
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <strong>{label}:</strong> {value.trim() || "—"}
    </p>
  );
}

function ReviewTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-gold-700">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b-2 border-gold-600/40 bg-cream text-[10px] uppercase tracking-wider">
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={cn("px-2 py-2.5 font-bold", index > 0 && "text-center", index === headers.length - 1 && "text-right")}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-gold-600/20">
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className={cn(
                      "px-2 py-3 font-bold",
                      index > 0 && "text-center",
                      index === row.length - 1 && "text-right text-gold-700",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
