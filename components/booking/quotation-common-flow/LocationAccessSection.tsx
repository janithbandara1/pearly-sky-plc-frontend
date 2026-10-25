"use client";

import React, { useState, useEffect } from "react";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceConfig } from "@/lib/booking";
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { useLanguage } from "@/lib/i18n/language-context";
import type { UseLocationAccessFormReturn } from "./useLocationAccessForm";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { isCommonPropertyTypeFlow } from "@/lib/service-flows";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import BookingValidationModal, { type ValidationModalItem } from "@/components/booking/BookingValidationModal";

export interface LocationAccessSectionProps {
  config: ServiceConfig;
  /** Pass the hook directly to eliminate all prop drilling across schedule components */
  form?: UseLocationAccessFormReturn;

  // Individual props for backward compatibility (e.g. pressure-washing L428-L455)
  titlePrefix?: string | null;
  setTitlePrefix?: (data: string) => void;
  fullName?: string | null;
  setFullName?: (data: string) => void;
  email?: string | null;
  setEmail?: (data: string) => void;
  phone?: string | null;
  setPhone?: (data: string) => void;
  address?: string | null;
  setAddress?: (data: string) => void;

  // Granular props if spread via {...locationBindings}
  firstName?: string;
  setFirstName?: (data: string) => void;
  lastName?: string;
  setLastName?: (data: string) => void;
  phoneNumber?: string;
  setPhoneNumber?: (data: string) => void;
  selectedCountry?: string;
  setSelectedCountry?: (data: string) => void;
  postalCode?: string;
  setPostalCode?: (data: string) => void;
  city?: string;
  setCity?: (data: string) => void;
  province?: string;
  setProvince?: (data: string) => void;
  streetAddress?: string;
  setStreetAddress?: (data: string) => void;
  unit?: string;
  setUnit?: (data: string) => void;
  gateCode?: string | number;
  setGateCode?: (data: string) => void;
  waterSource?: string | number;
  setWaterSource?: (data: string) => void;
  entryNotes?: string | number;
  setEntryNotes?: (data: string) => void;

  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  clearFieldError?: (field: string) => void;

  theme?: "dark" | "light";
  onProceedNext: () => void;
  onPrevStep: () => void;
  serviceSlug?: string;
  showWaterSource?: boolean;
}

export default function LocationAccessSection({
  config,
  form,
  titlePrefix: propTitlePrefix,
  setTitlePrefix: propSetTitlePrefix,
  fullName: propFullName,
  setFullName: propSetFullName,
  email: propEmail,
  setEmail: propSetEmail,
  phone: propPhone,
  setPhone: propSetPhone,
  address: propAddress,
  setAddress: propSetAddress,
  firstName: propFirstName,
  setFirstName: propSetFirstName,
  lastName: propLastName,
  setLastName: propSetLastName,
  phoneNumber: propPhoneNumber,
  setPhoneNumber: propSetPhoneNumber,
  selectedCountry: propCountry,
  setSelectedCountry: propSetCountry,
  postalCode: propPostalCode,
  setPostalCode: propSetPostalCode,
  city: propCity,
  setCity: propSetCity,
  province: propProvince,
  setProvince: propSetProvince,
  streetAddress: propStreetAddress,
  setStreetAddress: propSetStreetAddress,
  unit: propUnit,
  setUnit: propSetUnit,
  gateCode: propGateCode,
  setGateCode: propSetGateCode,
  waterSource: propWaterSource,
  setWaterSource: propSetWaterSource,
  entryNotes: propEntryNotes,
  setEntryNotes: propSetEntryNotes,
  errors: propErrors,
  clearFieldError: propClearFieldError,
  theme = "dark",
  onProceedNext,
  onPrevStep,
  serviceSlug,
  showWaterSource,
}: LocationAccessSectionProps) {
  const isLight = theme === "light";
  const { translate } = useLanguage();

  const defaultCountry = FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY] || "Sri Lanka";

  // If `form` is provided, use its bindings directly; otherwise fall back to passed props or local state.
  const fb = form?.bindings;

  // Local fallback states for when neither form hook nor explicit props are supplied
  const [localTitlePrefix, setLocalTitlePrefix] = useState<string>("Mr.");
  const [localFirstName, setLocalFirstName] = useState<string>("");
  const [localLastName, setLocalLastName] = useState<string>("");
  const [localEmail, setLocalEmail] = useState<string>("");
  const [localPhoneNumber, setLocalPhoneNumber] = useState<string>("");
  const [localCountry, setLocalCountry] = useState<string>(defaultCountry);
  const [localPostalCode, setLocalPostalCode] = useState<string>("");
  const [localCity, setLocalCity] = useState<string>("");
  const [localProvince, setLocalProvince] = useState<string>("");
  const [localStreetAddress, setLocalStreetAddress] = useState<string>("");
  const [localUnit, setLocalUnit] = useState<string>("");
  const [localGateCode, setLocalGateCode] = useState<string>("");
  const [localWaterSource, setLocalWaterSource] = useState<string>("Outdoor Hose Spigot Ready");
  const [localEntryNotes, setLocalEntryNotes] = useState<string>("");
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Validation modal state
  const [isValidationModalOpen, setIsValidationModalOpen] = useState<boolean>(false);
  const [validationModalErrors, setValidationModalErrors] = useState<string[]>([]);
  const [validationModalItems, setValidationModalItems] = useState<ValidationModalItem[]>([]);

  // Synchronize initial prop values (like legacy fullName or address) into local state if needed
  useEffect(() => {
    if (!form && propFullName && !localFirstName && !localLastName) {
      const trimmed = propFullName.trim();
      const firstSpace = trimmed.indexOf(" ");
      if (firstSpace === -1) {
        setLocalFirstName(trimmed);
      } else {
        setLocalFirstName(trimmed.slice(0, firstSpace));
        setLocalLastName(trimmed.slice(firstSpace + 1).trim());
      }
    }
  }, [form, propFullName, localFirstName, localLastName]);

  useEffect(() => {
    if (!form && propAddress && !localStreetAddress) {
      setLocalStreetAddress(propAddress);
    }
  }, [form, propAddress, localStreetAddress]);

  useEffect(() => {
    if (!form && propPhone && !localPhoneNumber) {
      setLocalPhoneNumber(propPhone);
    }
  }, [form, propPhone, localPhoneNumber]);

  // Active values
  const activeTitlePrefix = fb?.titlePrefix ?? propTitlePrefix ?? localTitlePrefix;
  const activeFirstName = fb?.firstName ?? propFirstName ?? localFirstName;
  const activeLastName = fb?.lastName ?? propLastName ?? localLastName;
  const activeEmail = fb?.email ?? propEmail ?? localEmail;
  const activePhoneNumber = fb?.phoneNumber ?? propPhoneNumber ?? propPhone ?? localPhoneNumber;
  const activeCountry = fb?.selectedCountry ?? propCountry ?? localCountry;
  const activePostalCode = fb?.postalCode ?? propPostalCode ?? localPostalCode;
  const activeCity = fb?.city ?? propCity ?? localCity;
  const activeProvince = fb?.province ?? propProvince ?? localProvince;
  const activeStreetAddress = fb?.streetAddress ?? propStreetAddress ?? propAddress ?? localStreetAddress;
  const activeUnit = fb?.unit ?? propUnit ?? localUnit;
  const activeGateCode = String(fb?.gateCode ?? propGateCode ?? localGateCode);
  const activeWaterSource = String(fb?.waterSource ?? propWaterSource ?? localWaterSource);
  const activeEntryNotes = String(fb?.entryNotes ?? propEntryNotes ?? localEntryNotes);
  const activeErrors = form?.errors ?? propErrors ?? localErrors;

  // Active setters with two-way sync
  const clearFieldErr = (field: string) => {
    if (form) {
      form.clearFieldError(field);
    } else if (propClearFieldError) {
      propClearFieldError(field);
    } else {
      setLocalErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleTitlePrefixChange = (val: string) => {
    if (fb?.setTitlePrefix) fb.setTitlePrefix(val);
    else if (propSetTitlePrefix) propSetTitlePrefix(val);
    else setLocalTitlePrefix(val);
  };

  const handleFirstNameChange = (val: string) => {
    if (fb?.setFirstName) {
      fb.setFirstName(val);
    } else if (propSetFirstName) {
      propSetFirstName(val);
      clearFieldErr("firstName");
    } else {
      setLocalFirstName(val);
      clearFieldErr("firstName");
    }

    if (propSetFullName) {
      const newFullName = `${val} ${activeLastName}`.trim();
      propSetFullName(newFullName);
    }
  };

  const handleLastNameChange = (val: string) => {
    if (fb?.setLastName) {
      fb.setLastName(val);
    } else if (propSetLastName) {
      propSetLastName(val);
      clearFieldErr("lastName");
    } else {
      setLocalLastName(val);
      clearFieldErr("lastName");
    }

    if (propSetFullName) {
      const newFullName = `${activeFirstName} ${val}`.trim();
      propSetFullName(newFullName);
    }
  };

  const handleEmailChange = (val: string) => {
    if (fb?.setEmail) fb.setEmail(val);
    else if (propSetEmail) {
      propSetEmail(val);
      clearFieldErr("email");
    } else {
      setLocalEmail(val);
      clearFieldErr("email");
    }
  };

  const handlePhoneNumberChange = (val: string) => {
    if (fb?.setPhoneNumber) {
      fb.setPhoneNumber(val);
    } else {
      if (propSetPhoneNumber) propSetPhoneNumber(val);
      if (propSetPhone) propSetPhone(val);
      setLocalPhoneNumber(val);
      clearFieldErr("phoneNumber");
      clearFieldErr("phone");
    }
  };

  const syncCombinedAddress = (
    street: string,
    u: string,
    c: string,
    prov: string,
    post: string,
    ctry: string
  ) => {
    if (propSetAddress && !fb?.setStreetAddress) {
      const parts = [
        street ? `${street}${u ? `, ${u}` : ""}` : "",
        c,
        prov,
        post,
        ctry,
      ].filter(Boolean);
      propSetAddress(parts.join(", "));
    }
  };

  const handleCountryChange = (val: string) => {
    if (fb?.setSelectedCountry) fb.setSelectedCountry(val);
    else if (propSetCountry) {
      propSetCountry(val);
      clearFieldErr("selectedCountry");
    } else {
      setLocalCountry(val);
      clearFieldErr("selectedCountry");
    }
    //syncCombinedAddress(activeStreetAddress, activeUnit, activeCity, activeProvince, activePostalCode, val);
  };

  const handlePostalCodeChange = (val: string) => {
    if (fb?.setPostalCode) fb.setPostalCode(val);
    else if (propSetPostalCode) {
      propSetPostalCode(val);
      clearFieldErr("postalCode");
    } else {
      setLocalPostalCode(val);
      clearFieldErr("postalCode");
    }
   //syncCombinedAddress(activeStreetAddress, activeUnit, activeCity, activeProvince, val, activeCountry);
  };

  const handleCityChange = (val: string) => {
    if (fb?.setCity) fb.setCity(val);
    else if (propSetCity) {
      propSetCity(val);
      clearFieldErr("city");
    } else {
      setLocalCity(val);
      clearFieldErr("city");
    }
    //syncCombinedAddress(activeStreetAddress, activeUnit, val, activeProvince, activePostalCode, activeCountry);
  };

  const handleProvinceChange = (val: string) => {
    if (fb?.setProvince) fb.setProvince(val);
    else if (propSetProvince) {
      propSetProvince(val);
      clearFieldErr("province");
    } else {
      setLocalProvince(val);
      clearFieldErr("province");
    }
    //syncCombinedAddress(activeStreetAddress, activeUnit, activeCity, val, activePostalCode, activeCountry);
  };

  const handleStreetAddressChange = (val: string) => {
    if (fb?.setStreetAddress) {
      fb.setStreetAddress(val);
    } else {
      if (propSetStreetAddress) propSetStreetAddress(val);
      setLocalStreetAddress(val);
      clearFieldErr("streetAddress");
      clearFieldErr("address");
    }
    //syncCombinedAddress(val, activeUnit, activeCity, activeProvince, activePostalCode, activeCountry);
  };

  const handleUnitChange = (val: string) => {
    if (fb?.setUnit) fb.setUnit(val);
    else if (propSetUnit) propSetUnit(val);
    else setLocalUnit(val);
    //syncCombinedAddress(activeStreetAddress, val, activeCity, activeProvince, activePostalCode, activeCountry);
  };

  const handleGateCodeChange = (val: string) => {
    if (fb?.setGateCode) fb.setGateCode(val);
    else if (propSetGateCode) propSetGateCode(val);
    else setLocalGateCode(val);
  };

  const handleWaterSourceChange = (val: string) => {
    if (fb?.setWaterSource) fb.setWaterSource(val);
    else if (propSetWaterSource) propSetWaterSource(val);
    else setLocalWaterSource(val);
  };

  const handleEntryNotesChange = (val: string) => {
    if (fb?.setEntryNotes) fb.setEntryNotes(val);
    else if (propSetEntryNotes) propSetEntryNotes(val);
    else setLocalEntryNotes(val);
  };

  // Local validation fallback
  const getLocalValidationErrors = (): Record<string, string> => {
    const next: Record<string, string> = {};
    if (!activeFirstName.trim()) next.firstName = translate("quotationErrFirstName");
    if (!activeLastName.trim()) next.lastName = translate("quotationErrLastName");
    if (!activeEmail.trim()) next.email = translate("quotationErrEmail");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeEmail.trim())) {
      next.email = translate("quotationErrEmailInvalid");
    }
    const cleanPhone = activePhoneNumber.replace(/\D/g, "");
    if (!activePhoneNumber.trim() || cleanPhone.length < 7) {
      next.phoneNumber = translate("quotationErrPhone");
    } 
    if (!activeCountry.trim()) next.selectedCountry = translate("quotationErrCountry");
    if (!activePostalCode.trim()) next.postalCode = translate("quotationErrPostal");
    if (!activeCity.trim()) next.city = translate("quotationErrCity");
    if (!activeProvince.trim()) next.province = translate("quotationErrProvince");
    if (!activeStreetAddress.trim() || activeStreetAddress.trim().length < 3) {
      next.streetAddress = translate("quotationErrStreet");
    }

    return next;
  };

  const runLocalValidation = (): boolean => {
    const next = getLocalValidationErrors();
    setLocalErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildValidationItems = (fieldErrors: Record<string, string>): ValidationModalItem[] => {
    return [
      {
        icon: User,
        title: "First Name",
        description: !fieldErrors.firstName && activeFirstName.trim()
          ? "Your first name has been entered."
          : (fieldErrors.firstName || "Please enter your first name."),
        isConfirmed: !fieldErrors.firstName && !!activeFirstName.trim(),
        status: !fieldErrors.firstName && !!activeFirstName.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: User,
        title: "Last Name",
        description: !fieldErrors.lastName && activeLastName.trim()
          ? "Your last name has been entered."
          : (fieldErrors.lastName || "Please enter your last name."),
        isConfirmed: !fieldErrors.lastName && !!activeLastName.trim(),
        status: !fieldErrors.lastName && !!activeLastName.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: Mail,
        title: "Email Address",
        description: !fieldErrors.email && activeEmail.trim()
          ? "Your email address has been entered."
          : (fieldErrors.email || "Please enter your email address."),
        isConfirmed: !fieldErrors.email && !!activeEmail.trim(),
        status: !fieldErrors.email && !!activeEmail.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: Phone,
        title: "Phone Number",
        description: !fieldErrors.phoneNumber && activePhoneNumber.trim()
          ? "Your contact phone number has been entered."
          : (fieldErrors.phoneNumber || "Please enter your contact phone number."),
        isConfirmed: !fieldErrors.phoneNumber && !!activePhoneNumber.trim(),
        status: !fieldErrors.phoneNumber && !!activePhoneNumber.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: MapPin,
        title: "Street Address",
        description: !fieldErrors.streetAddress && activeStreetAddress.trim()
          ? "Your street address has been entered."
          : (fieldErrors.streetAddress || "Please enter your street address."),
        isConfirmed: !fieldErrors.streetAddress && !!activeStreetAddress.trim(),
        status: !fieldErrors.streetAddress && !!activeStreetAddress.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: Building2,
        title: "City",
        description: !fieldErrors.city && activeCity.trim()
          ? "Your city has been entered."
          : (fieldErrors.city || "Please enter your city."),
        isConfirmed: !fieldErrors.city && !!activeCity.trim(),
        status: !fieldErrors.city && !!activeCity.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: Building2,
        title: "Province / State",
        description: !fieldErrors.province && activeProvince.trim()
          ? "Your province/state has been entered."
          : (fieldErrors.province || "Please enter your province/state."),
        isConfirmed: !fieldErrors.province && !!activeProvince.trim(),
        status: !fieldErrors.province && !!activeProvince.trim() ? "Confirmed" : "Missing",
      },
      {
        icon: MapPin,
        title: "Postal Code",
        description: !fieldErrors.postalCode && activePostalCode.trim()
          ? "Your postal code has been entered."
          : (fieldErrors.postalCode || "Please enter your postal code."),
        isConfirmed: !fieldErrors.postalCode && !!activePostalCode.trim(),
        status: !fieldErrors.postalCode && !!activePostalCode.trim() ? "Confirmed" : "Missing",
      },
    ];
  };

  const handleProceedClick = () => {
    if (form) {
      const result = form.validateContactFields((t) => translate(t as TranslationKey));
      if (!result.valid) {
        const errorList = Object.values(result.errors).filter(Boolean);
        setValidationModalItems(buildValidationItems(result.errors));
        setValidationModalErrors(
          errorList.length > 0
            ? errorList
            : [result.message || "Please complete all required contact & location fields."]
        );
        setIsValidationModalOpen(true);
        return;
      }
    } else {
      const validationErrors = getLocalValidationErrors();
      if (Object.keys(validationErrors).length > 0) {
        setLocalErrors(validationErrors);
        setValidationModalItems(buildValidationItems(validationErrors));
        setValidationModalErrors(Object.values(validationErrors));
        setIsValidationModalOpen(true);
        return;
      }
      syncCombinedAddress(activeStreetAddress, activeUnit, activeCity, activeProvince, activePostalCode, activeCountry);
      if (propSetFullName) {
        propSetFullName(`${activeFirstName} ${activeLastName}`.trim());
      }
      if (propSetPhone) {
        propSetPhone(activePhoneNumber);
      }
    }
    onProceedNext();
  };

  // Conditionals: Water source access is shown for pool cleaning or when explicitly flagged
  const shouldShowWaterSource =
    showWaterSource ??
    (serviceSlug === "pool-cleaning");

  const COUNTRY_OPTIONS = [
    {
      code: CURRENT_COUNTRY.toUpperCase(),
      name: FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY] || "Sri Lanka",
      Flag: COUNTRY_FLAGS[CURRENT_COUNTRY],
    },
  ];

  const inputBaseClass = isLight
    ? "h-11 rounded-lg border border-[#D9DDE5] bg-white text-[#1A2238] placeholder:text-[#687386]/60 focus-visible:ring-2 focus-visible:ring-[#002F6D]/30 focus-visible:border-[#002F6D] shadow-sm transition-all"
    : "h-11 rounded-lg border border-[#718096] bg-[#152238] text-white placeholder:text-[#C3CDDC]/50 shadow-inner focus-visible:ring-2 focus-visible:ring-[#FFD766]/30 focus-visible:border-[#FFD766] transition-all";

  const getInputClass = (hasError?: boolean) => {
    if (hasError) {
      return `${inputBaseClass} border-red-500 ring-1 ring-red-500/40 focus-visible:border-red-500 focus-visible:ring-red-500/50`;
    }
    return inputBaseClass;
  };

  const goldLabelClass = isLight
    ? "text-[10px] font-bold tracking-wider text-[#002F6D] uppercase block mb-1.5"
    : "text-[10px] font-bold tracking-wider text-[#FFD766] uppercase block mb-1.5";

    //const isCommonPropertyTypeServices = isCommonPropertyTypeFlow(serviceSlug);

    const showStep = serviceSlug === "pool-cleaning" || serviceSlug === "precision-pressure-washing" || 
                      serviceSlug === "carpet-upholstery-cleaning"

  
  return (
    <div className={`space-y-6 transition-colors duration-300 ${isLight ? "text-[#1A2238]" : "text-white"}`}>
      {/* Title & Description */}
      <div>
        <h3
          className={`text-2xl font-bold tracking-wide mb-1 font-serif ${
            isLight ? "text-[#1A2238]" : "text-white"
          }`}
        >
          Contact & Service Location
        </h3>
        <p className={`text-sm ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
          Enter service address and entry credentials for our technician team.
        </p>
      </div>

      {/* 1. CONTACT PROFILE SECTION */}
      <div
        className="rounded-2xl border border-[#D9DDE5] dark:border-[#718096]/50 bg-white dark:bg-[#1B2A40] shadow-sm overflow-hidden transition-colors"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 border-b border-[#D9DDE5] dark:border-[#718096]/40 bg-[#F7F5F0] dark:bg-[#152238] px-4 py-3.5"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#002F6D]/20 bg-[#002F6D]/10 text-[#002F6D] dark:border-[#FFD766]/30 dark:bg-[#FFD766]/15 dark:text-[#FFD766]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-[#1A2238] dark:text-white">
              {translate("quotationContactProfile")}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 sm:grid-cols-2 w-full bg-white dark:bg-[#1B2A40]">
          <div className="flex w-full justify-between gap-3">
            {/* Title Prefix */}
            <div className="space-y-1.5 w-[28%]">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
                Title
              </label>
              <Select value={activeTitlePrefix} onValueChange={handleTitlePrefixChange}>
                <SelectTrigger className={getInputClass()}>
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent className={isLight ? "bg-white text-[#1A2238] border-[#D9DDE5]" : "bg-[#152238] border-[#718096] text-white"}>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Estate Manager">Estate Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* First Name */}
            <div className="space-y-1.5 flex-1">
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
                <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {translate("quotationFirstName")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
              </label>
              <Input
                value={activeFirstName || ""}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                placeholder={translate("quotationFirstNamePlaceholder")}
                className={getInputClass(!!activeErrors.firstName)}
              />
              {activeErrors.firstName && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{activeErrors.firstName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {translate("quotationLastName")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              value={activeLastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              placeholder={translate("quotationLastNamePlaceholder")}
              className={getInputClass(!!activeErrors.lastName)}
            />
            {activeErrors.lastName && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.lastName}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {translate("quotationEmail")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              type="email"
              value={activeEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={translate("quotationEmailPlaceholder")}
              className={getInputClass(!!activeErrors.email)}
            />
            {activeErrors.email && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.email}</span>
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {translate("quotationPhoneNumber")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              type="tel"
              value={activePhoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              placeholder={translate("quotationPhonePlaceholder")}
              className={getInputClass(!!activeErrors.phoneNumber || !!activeErrors.phone)}
            />
            {(activeErrors.phoneNumber || activeErrors.phone) && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.phoneNumber || activeErrors.phone}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. LOCATION OF RESIDENCE SECTION */}
      <div
        className="rounded-2xl border border-[#D9DDE5] dark:border-[#718096]/50 bg-white dark:bg-[#1B2A40] shadow-sm overflow-hidden transition-colors"
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 border-b border-[#D9DDE5] dark:border-[#718096]/40 bg-[#F7F5F0] dark:bg-[#152238] px-4 py-3.5"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#002F6D]/20 bg-[#002F6D]/10 text-[#002F6D] dark:border-[#FFD766]/30 dark:bg-[#FFD766]/15 dark:text-[#FFD766]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-[#1A2238] dark:text-white">
              {translate("quotationLocationResidence")}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 sm:grid-cols-2 bg-white dark:bg-[#1B2A40]">
          {/* Country */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              {translate("quotationSelectCountry")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Select value={activeCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className={getInputClass(!!activeErrors.selectedCountry)}>
                <SelectValue placeholder={translate("quotationSelectCountry")} />
              </SelectTrigger>
              <SelectContent className={isLight ? "bg-white text-[#1A2238] border-[#D9DDE5]" : "bg-[#152238] border-[#718096] text-white"}>
                {COUNTRY_OPTIONS.map((c) => (
                  <SelectItem key={c.code} value={c.name} className="focus:bg-[#002F6D]/10 dark:focus:bg-[#FFD766]/20 text-[#1A2238] dark:text-white cursor-pointer">
                    <span className="flex items-center gap-2">
                      <c.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeErrors.selectedCountry && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.selectedCountry}</span>
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              {translate("quotationPostalCode")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              value={activePostalCode || ""}
              onChange={(e) => handlePostalCodeChange(e.target.value)}
              placeholder={translate("quotationPostalCodePlaceholder")}
              className={getInputClass(!!activeErrors.postalCode)}
            />
            {activeErrors.postalCode && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.postalCode}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {translate("quotationCity")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input 
              value={activeCity || ""}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder={translate("quotationCityPlaceholder")}
              className={getInputClass(!!activeErrors.city)}
            />
            {activeErrors.city && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.city}</span>
              </p>
            )}
          </div>

          {/* Province / State */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {translate("quotationProvinceState")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              value={activeProvince || ""}
              onChange={(e) => handleProvinceChange(e.target.value)}
              placeholder={translate("quotationProvincePlaceholder")}
              className={getInputClass(!!activeErrors.province)}
            />
            {activeErrors.province && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.province}</span>
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {translate("quotationStreetAddress")} <span className="text-[#D8B63F] dark:text-[#FFD766]">*</span>
            </label>
            <Input
              value={activeStreetAddress || ""}
              onChange={(e) => handleStreetAddressChange(e.target.value)}
              placeholder={translate("quotationStreetPlaceholder")}
              className={getInputClass(!!activeErrors.streetAddress || !!activeErrors.address)}
            />
            {(activeErrors.streetAddress || activeErrors.address) && (
              <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{activeErrors.streetAddress || activeErrors.address}</span>
              </p>
            )}
          </div>

          {/* Unit / Apt / Suite (Optional) */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#687386] dark:text-[#C3CDDC]">
              <svg className="h-3 w-3 text-[#002F6D] dark:text-[#FFD766]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {translate("quotationUnit")}
              <span className={`ml-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${isLight ? "bg-[#002F6D]/10 text-[#002F6D]" : "bg-[#FFD766]/20 text-[#FFD766]"}`}>
                Optional
              </span>
            </label>
            <Input
              value={activeUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
              placeholder={translate("quotationUnitPlaceholder")}
              className={getInputClass()}
            />
          </div>
        </div>
      </div>

      {/* 3. CONDITIONAL SECTION: Water Source Access (e.g. pool cleaning) */}
      {shouldShowWaterSource && (
        <div className="rounded-2xl border border-[#D9DDE5] dark:border-[#718096]/50 bg-white dark:bg-[#1B2A40] p-4 sm:p-5 shadow-sm space-y-2">
          <label className={goldLabelClass}>Water Source Access</label>
          <Select value={activeWaterSource} onValueChange={handleWaterSourceChange}>
            <SelectTrigger className={getInputClass()}>
              <SelectValue placeholder="Select water source" />
            </SelectTrigger>
            <SelectContent className={isLight ? "bg-white text-[#1A2238] border-[#D9DDE5]" : "bg-[#152238] border-[#718096] text-white"}>
              <SelectItem value="Outdoor Hose Spigot Ready">Outdoor Hose Spigot Ready</SelectItem>
              <SelectItem value="Technician Needs Own Hose Extension">Technician Needs Own Hose Extension</SelectItem>
              <SelectItem value="Well Water System">Well Water System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 4. ACCESS & ENTRY DETAILS */}
      <div className="rounded-2xl border border-[#D9DDE5] dark:border-[#718096]/50 bg-white dark:bg-[#1B2A40] p-4 sm:p-5 shadow-sm space-y-4">
        {/* Gate Code */}
        <div>
          <label className={goldLabelClass}>Side Gate Code / Access</label>
          <Input
            value={activeGateCode}
            onChange={(e) => handleGateCodeChange(e.target.value)}
            placeholder="e.g. #4821 or Key under mat"
            className={getInputClass()}
          />
        </div>

        {/* Technician Entry Notes */}
        <div>
          <label className={goldLabelClass}>Technician Entry Notes</label>
          <textarea
            rows={3}
            value={activeEntryNotes}
            onChange={(e) => handleEntryNotesChange(e.target.value)}
            placeholder="e.g. Friendly Golden Retriever in yard, beware of loose pavers near infinity pump..."
            className={`w-full rounded-xl p-4 text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-white border border-[#D9DDE5] text-[#1A2238] placeholder-[#687386]/60 focus:border-[#002F6D]"
                : "bg-[#152238] border border-[#718096] text-white placeholder-[#C3CDDC]/50 focus:border-[#FFD766]"
            }`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      {showStep && (
        <div className={`flex gap-4 pt-4 border-t ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
          <button
            type="button"
            onClick={onPrevStep}
            className={`px-6 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer ${
              isLight
                ? "border-[#D9DDE5] text-[#1A2238] hover:bg-[#F7F5F0]"
                : "border-[#718096] text-[#C3CDDC] hover:bg-[#152238]"
            }`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleProceedClick}
            className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLight
                ? "bg-[#002F6D] text-white hover:bg-[#002F6D]/90 shadow-[#002F6D]/20"
                : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90 shadow-[#FFD766]/20 font-bold"
            }`}
          >
            Proceed to Step 5
          </button>
        </div>
      )}

      {/* Booking Validation Modal */}
      <BookingValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        items={validationModalItems}
        errors={validationModalErrors}
        theme={isLight ? "light" : "dark"}
        title="Please complete the required details before submitting:"
        actionText="Review Missing Details"
      />
    </div>
  );
}