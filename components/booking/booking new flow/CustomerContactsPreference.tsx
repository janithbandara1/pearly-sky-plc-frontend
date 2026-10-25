"use client";

import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, FileText, Loader2, RotateCw, X, ChevronDown, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { AddressPayload } from "@/lib/customers-api";
import {
  CHECKOUT_ATTACHMENT_ACCEPT,
  CHECKOUT_ATTACHMENT_MAX_BYTES,
  CHECKOUT_ATTACHMENT_MAX_COUNT,
  CHECKOUT_ATTACHMENT_TYPES,
  attachmentContentType,
  uploadCheckoutAttachment,
} from "@/lib/upload-api";
import { CheckoutAttachment } from "@/components/booking/checkout-attachment-upload";
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

export interface CustomerContactsPreferenceProps {
  theme?: "dark" | "light";
  stepLabel?: string;
  title?: string;
  
  // Preferences
  gender: string;
  onGenderChange: (val: string) => void;
  language: string;
  onLanguageChange: (val: string) => void;
  requirements: string;
  onRequirementsChange: (val: string) => void;
  
  // Uploads
  attachments: CheckoutAttachment[];
  onAttachmentsChange: (update: (prev: CheckoutAttachment[]) => CheckoutAttachment[]) => void;
  
  // Client Identity & Address
  contactForm: ContactFormData;
  onContactFormChange: React.Dispatch<React.SetStateAction<ContactFormData>>;
  addressForm: AddressPayload;
  onAddressFormChange: React.Dispatch<React.SetStateAction<AddressPayload>>;
  
  // Access & Marketing Logistics
  howGetIn?: string;
  onHowGetInChange?: (val: string) => void;
  howHeard?: string;
  onHowHeardChange?: (val: string) => void;
  isQuote?:boolean
}

const PREVIEWABLE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const HOW_GET_IN_OPTIONS: { value: string; labelKey: TranslationKey }[] = [
  { value: "I'll be at home", labelKey: "checkoutGetInAtHome" },
  { value: "The key is with doorman", labelKey: "checkoutGetInDoorman" },
  { value: "Lockbox on premises", labelKey: "checkoutGetInLockbox" },
  { value: "Call to organize", labelKey: "checkoutGetInCall" },
  { value: "Other", labelKey: "checkoutOptionOther" },
];

const HOW_HEARD_OPTIONS: { value: string; labelKey?: TranslationKey }[] = [
  { value: "Google" },
  { value: "Yelp" },
  { value: "Instagram" },
  { value: "Facebook" },
  { value: "Friend/Referred", labelKey: "checkoutHeardFriend" },
  { value: "Real Estate Professional", labelKey: "checkoutHeardRealEstate" },
  { value: "Other", labelKey: "checkoutOptionOther" },
];

const COUNTRY_OPTIONS = [
  {
    code: CURRENT_COUNTRY.toUpperCase(),
    name: FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY],
    Flag: COUNTRY_FLAGS[CURRENT_COUNTRY],
  },
];

export default function CustomerContactsPreference({
  theme = "dark",
  stepLabel = "STEP 6 OF 6",
  title = "Preferences, Layout Upload & Client Information",
  gender,
  onGenderChange,
  language,
  onLanguageChange,
  requirements,
  onRequirementsChange,
  attachments,
  onAttachmentsChange,
  contactForm,
  onContactFormChange,
  addressForm,
  onAddressFormChange,
  howGetIn,
  onHowGetInChange,
  howHeard,
  onHowHeardChange,
  isQuote=false,
}: CustomerContactsPreferenceProps) {
  const { translate } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isLight = theme === "light";

  // Clean up object URLs on unmount
  const attachmentsRef = useRef(attachments);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);
  useEffect(
    () => () =>
      attachmentsRef.current.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      }),
    [],
  );

  function setStatus(id: string, patch: Partial<CheckoutAttachment>) {
    onAttachmentsChange((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function startUpload(attachment: CheckoutAttachment) {
    uploadCheckoutAttachment(attachment.file)
      .then((key) => setStatus(attachment.id, { status: "done", key }))
      .catch(() => setStatus(attachment.id, { status: "error" }));
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setUploadError(null);

    const room = CHECKOUT_ATTACHMENT_MAX_COUNT - attachments.length;
    const files = Array.from(fileList);
    if (files.length > room) {
      setUploadError(`Maximum ${CHECKOUT_ATTACHMENT_MAX_COUNT} files allowed.`);
    }

    const accepted: CheckoutAttachment[] = [];
    for (const file of files.slice(0, Math.max(room, 0))) {
      const type = attachmentContentType(file);
      if (!CHECKOUT_ATTACHMENT_TYPES.includes(type)) {
        setUploadError("Unsupported file type. Please upload images, PDFs, or documents.");
        continue;
      }
      if (file.size > CHECKOUT_ATTACHMENT_MAX_BYTES) {
        setUploadError("File exceeds 5MB limit.");
        continue;
      }
      accepted.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: PREVIEWABLE_TYPES.has(type) ? URL.createObjectURL(file) : null,
        status: "uploading",
      });
    }

    if (accepted.length) {
      onAttachmentsChange((prev) => [...prev, ...accepted]);
      accepted.forEach(startUpload);
    }
  }

  function retry(attachment: CheckoutAttachment) {
    setStatus(attachment.id, { status: "uploading" });
    startUpload(attachment);
  }

  function remove(attachment: CheckoutAttachment) {
    if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
    onAttachmentsChange((prev) => prev.filter((a) => a.id !== attachment.id));
  }

  // Dynamic Theme Styling Classes
  const containerClasses = isLight
    ? "bg-white border-[#C5A059]/40 text-[#1B2E4B]"
    : "bg-[rgba(13,20,36,0.7)] backdrop-blur-xl border-white/10 text-white";

  const dividerClasses = isLight ? "border-gray-200" : "border-white/10";
  const stepLabelClasses = isLight ? "text-[#A88238]" : "text-[#DFB96C]";
  const titleClasses = isLight ? "text-[#1B2E4B]" : "text-white";
  const labelClasses = isLight
    ? "text-[11px] font-semibold tracking-wider text-[#1B2E4B]/80 uppercase mb-2 block"
    : "text-[11px] font-semibold tracking-wider text-slate-300 uppercase mb-2 block";

  const inputClasses = isLight
    ? "w-full bg-[#FBF9F4] border border-[#C5A059]/35 hover:border-[#C5A059]/70 focus:border-[#A88238] focus:ring-1 focus:ring-[#A88238] text-[#1B2E4B] placeholder:text-slate-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
    : "w-full bg-[#0B1524] border border-white/15 hover:border-white/25 focus:border-[#DFB96C] focus:ring-1 focus:ring-[#DFB96C] text-white placeholder:text-slate-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors";

  const selectClasses = isLight
    ? "w-full appearance-none bg-[#FBF9F4] border border-[#C5A059]/35 hover:border-[#C5A059]/70 focus:border-[#A88238] focus:ring-1 focus:ring-[#A88238] text-[#1B2E4B] rounded-lg px-4 py-3 text-sm outline-none transition-colors pr-10 cursor-pointer"
    : "w-full appearance-none bg-[#0B1524] border border-white/15 hover:border-white/25 focus:border-[#DFB96C] focus:ring-1 focus:ring-[#DFB96C] text-white rounded-lg px-4 py-3 text-sm outline-none transition-colors pr-10 cursor-pointer";

  const selectOptionClasses = isLight ? "bg-white text-[#1B2E4B]" : "bg-[#0B1524] text-white";
  const chevronClasses = isLight ? "text-[#A88238]" : "text-slate-400";

  const textareaClasses = isLight
    ? "w-full bg-[#FBF9F4] border border-[#C5A059]/35 hover:border-[#C5A059]/70 focus:border-[#A88238] focus:ring-1 focus:ring-[#A88238] text-[#1B2E4B] placeholder:text-slate-400 rounded-lg p-3.5 text-sm outline-none transition-colors resize-y min-h-[90px]"
    : "w-full bg-[#0B1524] border border-white/15 hover:border-white/25 focus:border-[#DFB96C] focus:ring-1 focus:ring-[#DFB96C] text-white placeholder:text-slate-500 rounded-lg p-3.5 text-sm outline-none transition-colors resize-y min-h-[90px]";

  const dropzoneClasses = isLight
    ? isDragging
      ? "border-[#A88238] bg-[#A88238]/10"
      : "border-[#C5A059]/50 hover:border-[#A88238] bg-[#FBF9F4] hover:bg-[#F7F3E8]"
    : isDragging
      ? "border-[#DFB96C] bg-[#DFB96C]/10"
      : "border-[#DFB96C]/40 hover:border-[#DFB96C] bg-[#0B1524]/60 hover:bg-[#0B1524]/90";

  const dropzoneTitleClasses = isLight ? "text-[#1B2E4B]" : "text-white";
  const dropzoneSubtitleClasses = isLight ? "text-slate-500" : "text-slate-400";
  const tileClasses = isLight
    ? "border-[#C5A059]/40 bg-[#FBF9F4] text-[#1B2E4B]"
    : "border-[#DFB96C]/40 bg-[#0B1524] text-white";

  return (
    <div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 ${containerClasses}`}>
      {/* Top Header */}
      {isQuote ? 
      (
            <div className="flex items-center space-x-3.5 ">
              <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] shrink-0">
                <User className="w-5 h-5" />
              </div>
            <div>
              <h2
                 className={`font-serif text-2xl font-bold tracking-tight ${
                   isLight ? "text-slate-900" : "text-white"
                 }`}
                >
                6 & 7. Contact & Location Details
              </h2>
              <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  Provide client info and property address across 27 global destinations
              </p>
            </div>
            </div> )
      : (<div className={`pb-6 border-b ${dividerClasses}`}>
        <span className={`text-[11px] font-bold tracking-[0.2em] uppercase block mb-2 ${stepLabelClasses}`}>
          {stepLabel}
        </span>
        <h2 className={`font-serif text-2xl sm:text-3xl font-medium tracking-tight ${titleClasses}`}>
          {title}
        </h2>
      </div>)}



      {/* Preferences & Layout Upload */}
      <div className="pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Gender Preference */}
          <div>
            <label className={labelClasses}>
              STAFF GENDER PREFERENCE
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => onGenderChange(e.target.value)}
                className={selectClasses}
              >
                <option value="none" className={selectOptionClasses}>
                  No Preference (First Available Specialist)
                </option>
                <option value="female" className={selectOptionClasses}>
                  Female Specialist Preferred
                </option>
                <option value="male" className={selectOptionClasses}>
                  Male Specialist Preferred
                </option>
              </select>
              <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none ${chevronClasses}`} />
            </div>
          </div>

          {/* Language Preference */}
          <div>
            <label className={labelClasses}>
              STAFF LANGUAGE PREFERENCE
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className={selectClasses}
              >
                <option value="en" className={selectOptionClasses}>English Speaking</option>
                <option value="fr" className={selectOptionClasses}>French Speaking</option>
                <option value="de" className={selectOptionClasses}>German Speaking</option>
                <option value="it" className={selectOptionClasses}>Italian Speaking</option>
                <option value="es" className={selectOptionClasses}>Spanish Speaking</option>
                <option value="no-preference" className={selectOptionClasses}>No Preference</option>
              </select>
              <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none ${chevronClasses}`} />
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div>
          <label className={labelClasses}>
            SPECIAL REQUIREMENTS / SECURITY / PET PROTOCOLS
          </label>
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => onRequirementsChange(e.target.value)}
            placeholder="e.g. Alarm code #4092, gate access instructions, friendly Golden Retriever in laundry room..."
            className={textareaClasses}
          />
        </div>

        {/* Layout Blueprint Upload */}
        <div>
          <label className={labelClasses}>
            LAYOUT BLUEPRINT / SITE PHOTOS UPLOAD (MAX 5 FILES, 5MB EACH)
          </label>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 text-center group ${dropzoneClasses}`}
          >
            {/* Gold Cloud Icon with Up Arrow */}
            <div className="flex items-center justify-center size-10 rounded-xl bg-[#DFB96C] text-[#0B1524] mb-3 shadow-lg shadow-[#DFB96C]/20 group-hover:scale-105 transition-transform">
              <UploadCloud className="size-5 stroke-[2.5]" />
            </div>

            <p className={`text-sm font-medium tracking-wide ${dropzoneTitleClasses}`}>
              Click to upload or drag & drop property photos or floorplans
            </p>
            <p className={`text-xs mt-1 ${dropzoneSubtitleClasses}`}>
              PNG, JPG, WEBP, or PDF up to 5MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={CHECKOUT_ATTACHMENT_ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />

          {uploadError && (
            <p className="mt-2 text-xs text-rose-500 font-medium">{uploadError}</p>
          )}

          {/* Attached Files List */}
          {attachments.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  title={attachment.file.name}
                  className={`relative size-20 overflow-hidden rounded-lg border ${tileClasses}`}
                >
                  {attachment.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={attachment.previewUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-1 p-1.5 text-center">
                      <FileText className={`size-6 shrink-0 ${isLight ? "text-slate-600" : "text-slate-300"}`} />
                      <span className={`w-full truncate text-[10px] leading-tight ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                        {attachment.file.name}
                      </span>
                    </div>
                  )}

                  {attachment.status === "uploading" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <Loader2 className="size-5 animate-spin text-[#DFB96C]" />
                    </div>
                  )}

                  {attachment.status === "error" && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        retry(attachment);
                      }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-950/80 text-[10px] font-semibold text-rose-200"
                    >
                      <RotateCw className="size-4" />
                      Retry
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(attachment);
                    }}
                    className={`absolute right-1 top-1 flex size-5 items-center justify-center rounded-full transition ${
                      isLight
                        ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                        : "bg-black/70 text-white hover:bg-black"
                    }`}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className={`my-8 border-t ${dividerClasses}`} />

      {/* Client Identity & Access Address */}
      <div>
        <h3 className={`font-serif text-xl sm:text-2xl font-medium tracking-tight mb-6 ${titleClasses}`}>
          Client Identity & Access Address
        </h3>

        <div className="space-y-4">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
              <div>
                <label className={labelClasses}>
                  COUNTRY
                </label>
                <div className="relative">
                  <select
                    value={addressForm.country || COUNTRY_OPTIONS[0]?.name || "France"}
                    onChange={(e) =>
                      onAddressFormChange((f) => ({ ...f, country: e.target.value }))
                    }
                    className={selectClasses}
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.name} className={selectOptionClasses}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none ${chevronClasses}`} />
                </div>
              </div>
              <div> 
              <label className={labelClasses}>
                POSTAL CODE *
              </label>
              <input
                required
                type="text"
                value={addressForm.postalCode || ""}
                onChange={(e) =>
                  onAddressFormChange((f) => ({ ...f, postalCode: e.target.value }))
                }
                placeholder="75001"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>
                CITY *
              </label>
              <input
                required
                type="text"
                value={addressForm.city}
                onChange={(e) =>
                  onAddressFormChange((f) => ({ ...f, city: e.target.value }))
                }
                placeholder="Paris"
                className={inputClasses}
              />
            </div>

            
          </div>
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                FIRST NAME *
              </label>
              <input
                required
                type="text"
                value={contactForm.firstName}
                onChange={(e) =>
                  onContactFormChange((f) => ({ ...f, firstName: e.target.value }))
                }
                placeholder="Lord / Lady / Mr. Alexandre"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>
                LAST NAME *
              </label>
              <input
                type="text"
                value={contactForm.lastName}
                onChange={(e) =>
                  onContactFormChange((f) => ({ ...f, lastName: e.target.value }))
                }
                placeholder="de Rothschild"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                EMAIL ADDRESS *
              </label>
              <input
                required
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  onContactFormChange((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="alexandre@concierge.com"
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>
                PHONE NUMBER *
              </label>
              <input
                required
                type="tel"
                value={contactForm.contact}
                onChange={(e) =>
                  onContactFormChange((f) => ({ ...f, contact: e.target.value }))
                }
                placeholder="+33 6 12 34 56 78"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Row 3: Street Address & Apt / Villa / Suite */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClasses}>
                STREET ADDRESS *
              </label>
              <input
                required
                type="text"
                value={addressForm.streetAddress}
                onChange={(e) =>
                  onAddressFormChange((f) => ({ ...f, streetAddress: e.target.value }))
                }
                placeholder="15 Rue Des Halles"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>
                PROVINCE / REGION
              </label>
              <input
                type="text"
                value={addressForm.state || ""}
                onChange={(e) =>
                  onAddressFormChange((f) => ({ ...f, state: e.target.value }))
                }
                placeholder="Île-de-France"
                className={inputClasses}
              />
            </div>
            
          </div>

          {/* Row 4: Postal Code, City, Province / Region */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          </div> */}

          {/* Row 5: Country & Access / Marketing Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            

            <div>
              <label className={labelClasses}>
                APT / VILLA / SUITE
              </label>
              <input
                type="text"
                value={addressForm.unit || ""}
                onChange={(e) =>
                  onAddressFormChange((f) => ({ ...f, unit: e.target.value }))
                }
                placeholder="Penthouse 4B"
                className={inputClasses}
              />
            </div>

            {onHowGetInChange && (
              <div>
                <label className={labelClasses}>
                  PROPERTY ACCESS *
                </label>
                <div className="relative">
                  <select
                    value={howGetIn || "someone_home"}
                    onChange={(e) => onHowGetInChange(e.target.value)}
                    className={selectClasses}
                  >
                    {HOW_GET_IN_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className={selectOptionClasses}>
                        {translate(opt.labelKey)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none ${chevronClasses}`} />
                </div>
              </div>
            )}

            {onHowHeardChange && (
              <div>
                <label className={labelClasses}>
                  HOW HEARD ABOUT US *
                </label>
                <div className="relative">
                  <select
                    value={howHeard || "Google"}
                    onChange={(e) => onHowHeardChange(e.target.value)}
                    className={selectClasses}
                  >
                    {HOW_HEARD_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className={selectOptionClasses}>
                        {opt.labelKey ? translate(opt.labelKey) : opt.value}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none ${chevronClasses}`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
