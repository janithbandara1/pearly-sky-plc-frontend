"use client";

import { useState, useCallback, useMemo } from "react";
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";

// ─── Types ───────────────────────────────────────────────────────────────────

/** Form data snapshot representing all location & access fields. */
export interface LocationAccessFormData {
  titlePrefix: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  phone: string;
  selectedCountry: string;
  postalCode: string;
  city: string;
  province: string;
  streetAddress: string;
  unit: string;
  address: string;
  gateCode: string;
  waterSource: string;
  entryNotes: string;
}

/**
 * Prop bindings passed to `<LocationAccessSection>`.
 * Can be passed directly as `form={locationForm}`, or spread with `{...locationBindings}`,
 * or destructured individually (as required by pressure-washing JSX).
 */
export interface LocationAccessSectionBindings {
  // Common legacy bindings (used by pressure-washing L428-L455 & confirmation/review)
  titlePrefix: string;
  setTitlePrefix: (v: string) => void;
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;

  // Granular contact profile fields
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;

  // Granular location of residence fields
  selectedCountry: string;
  setSelectedCountry: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  province: string;
  setProvince: (v: string) => void;
  streetAddress: string;
  setStreetAddress: (v: string) => void;
  unit: string;
  setUnit: (v: string) => void;

  // Access & entry details
  gateCode: string;
  setGateCode: (v: string) => void;
  waterSource: string;
  setWaterSource: (v: string) => void;
  entryNotes: string;
  setEntryNotes: (v: string) => void;

  // Error management
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  clearFieldError: (field: string) => void;
}

export interface UseLocationAccessFormReturn {
  bindings: LocationAccessSectionBindings;
  formData: LocationAccessFormData;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  clearFieldError: (field: string) => void;
  validateContactFields: (
    translateFn?: (key: string) => string
  ) => { valid: boolean; message?: string; errors: Record<string, string> };
  reset: () => void;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Manages all state, synchronized two-way bindings, and validation for
 * `LocationAccessSection` across Pool, Carpet, and Pressure Washing services.
 *
 * @param onFieldChange Optional callback fired whenever any field value changes (e.g., to clear parent validation error banner).
 */
export function useLocationAccessForm(
  onFieldChange?: () => void
): UseLocationAccessFormReturn {
  // Title & Name
  const [titlePrefix, setTitlePrefixRaw] = useState<string>("Mr.");
  const [firstName, setFirstNameRaw] = useState<string>("");
  const [lastName, setLastNameRaw] = useState<string>("");

  // Contact
  const [email, setEmailRaw] = useState<string>("");
  const [phoneNumber, setPhoneNumberRaw] = useState<string>("");

  // Location
  const defaultCountry = FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY] || "Sri Lanka";
  const [selectedCountry, setSelectedCountryRaw] = useState<string>(defaultCountry);
  const [postalCode, setPostalCodeRaw] = useState<string>("");
  const [city, setCityRaw] = useState<string>("");
  const [province, setProvinceRaw] = useState<string>("");
  const [streetAddress, setStreetAddressRaw] = useState<string>("");
  const [unit, setUnitRaw] = useState<string>("");

  // Access & Notes
  const [gateCode, setGateCodeRaw] = useState<string>("");
  const [waterSource, setWaterSourceRaw] = useState<string>("Outdoor Hose Spigot Ready");
  const [entryNotes, setEntryNotesRaw] = useState<string>("");

  // Error state map: field name -> error message
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearFieldError = useCallback(
    (field: string) => {
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
      onFieldChange?.();
    },
    [onFieldChange]
  );

  // Computed compound fields
  const fullName = useMemo(() => {
    return `${firstName} ${lastName}`.trim();
  }, [firstName, lastName]);

  const address = useMemo(() => {
    const parts = [
      streetAddress ? `${streetAddress}${unit ? `, ${unit}` : ""}` : "",
      city,
      province,
      postalCode,
      selectedCountry,
    ].filter(Boolean);
    return parts.join(", ");
  }, [streetAddress, unit, city, province, postalCode, selectedCountry]);

  // Setters that auto-clear corresponding errors and trigger onFieldChange
  const setTitlePrefix = useCallback(
    (v: string) => {
      setTitlePrefixRaw(v);
      onFieldChange?.();
    },
    [onFieldChange]
  );

  const setFirstName = useCallback(
    (v: string) => {
      setFirstNameRaw(v);
      clearFieldError("firstName");
      clearFieldError("fullName");
    },
    [clearFieldError]
  );

  const setLastName = useCallback(
    (v: string) => {
      setLastNameRaw(v);
      clearFieldError("lastName");
      clearFieldError("fullName");
    },
    [clearFieldError]
  );

  const setFullName = useCallback(
    (v: string) => {
      const trimmed = v.trim();
      const firstSpaceIndex = trimmed.indexOf(" ");
      if (firstSpaceIndex === -1) {
        setFirstNameRaw(trimmed);
        setLastNameRaw("");
      } else {
        setFirstNameRaw(trimmed.slice(0, firstSpaceIndex));
        setLastNameRaw(trimmed.slice(firstSpaceIndex + 1).trim());
      }
      clearFieldError("firstName");
      clearFieldError("lastName");
      clearFieldError("fullName");
    },
    [clearFieldError]
  );

  const setEmail = useCallback(
    (v: string) => {
      setEmailRaw(v);
      clearFieldError("email");
    },
    [clearFieldError]
  );

  const setPhoneNumber = useCallback(
    (v: string) => {
      setPhoneNumberRaw(v);
      clearFieldError("phoneNumber");
      clearFieldError("phone");
    },
    [clearFieldError]
  );

  const setPhone = setPhoneNumber;

  const setSelectedCountry = useCallback(
    (v: string) => {
      setSelectedCountryRaw(v);
      clearFieldError("selectedCountry");
    },
    [clearFieldError]
  );

  const setPostalCode = useCallback(
    (v: string) => {
      setPostalCodeRaw(v);
      clearFieldError("postalCode");
    },
    [clearFieldError]
  );

  const setCity = useCallback(
    (v: string) => {
      setCityRaw(v);
      clearFieldError("city");
    },
    [clearFieldError]
  );

  const setProvince = useCallback(
    (v: string) => {
      setProvinceRaw(v);
      clearFieldError("province");
    },
    [clearFieldError]
  );

  const setStreetAddress = useCallback(
    (v: string) => {
      setStreetAddressRaw(v);
      clearFieldError("streetAddress");
      clearFieldError("address");
    },
    [clearFieldError]
  );

  const setAddress = useCallback(
    (v: string) => {
      // Only update the street address raw value.
      // Do NOT parse the combined address back into individual fields —
      // that causes a feedback loop when syncCombinedAddress builds the
      // combined string and triggers this setter.
      setStreetAddressRaw(v);
      clearFieldError("streetAddress");
      clearFieldError("address");
    },
    [clearFieldError]
  );

  const setUnit = useCallback(
    (v: string) => {
      setUnitRaw(v);
      onFieldChange?.();
    },
    [onFieldChange]
  );

  const setGateCode = useCallback(
    (v: string) => {
      setGateCodeRaw(v);
      onFieldChange?.();
    },
    [onFieldChange]
  );

  const setWaterSource = useCallback(
    (v: string) => {
      setWaterSourceRaw(v);
      onFieldChange?.();
    },
    [onFieldChange]
  );

  const setEntryNotes = useCallback(
    (v: string) => {
      setEntryNotesRaw(v);
      onFieldChange?.();
    },
    [onFieldChange]
  );

  // ── Validation ────────────────────────────────────────────────────────────
  const validateContactFields = useCallback(
    (
      translateFn?: (key: string) => string
    ): { valid: boolean; message?: string; errors: Record<string, string> } => {
      const nextErrors: Record<string, string> = {};
      const t = (key: string, fallback: string) =>
        translateFn ? translateFn(key) || fallback : fallback;

      // 1. First Name / Full Name
      const effectiveFullName = (fullName || `${firstName} ${lastName}`).trim();
      if (!firstName && !lastName && !effectiveFullName) {
        nextErrors.firstName = t(
          "quotationErrFirstName",
          "Please enter your first name."
        );
      } else if (effectiveFullName.length < 2) {
        nextErrors.firstName = t(
          "quotationErrFirstName",
          "Please enter your full legal name."
        );
      } else if (firstName && firstName.trim().length < 2) {
        nextErrors.firstName = t(
          "quotationErrFirstName",
          "Please enter your first name."
        );
      }

      // 2. Last Name (checked if firstName is granularly tracked)
      if (firstName && (!lastName || lastName.trim().length < 1)) {
        nextErrors.lastName = t(
          "quotationErrLastName",
          "Please enter your last name."
        );
      }

      // 3. Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !email.trim()) {
        nextErrors.email = t(
          "quotationErrEmail",
          "Email address is required."
        );
      } else if (!emailRegex.test(email.trim())) {
        nextErrors.email = t(
          "quotationErrEmailInvalid",
          "Please enter a valid email address."
        );
      }

      // 4. Phone Number
      const effectivePhone = (phoneNumber || "").trim();
      const cleanedPhone = effectivePhone.replace(/\D/g, "");
      if (!effectivePhone) {
        nextErrors.phoneNumber = t(
          "quotationErrPhone",
          "Phone number is required."
        );
      } else if (cleanedPhone.length < 7) {
        nextErrors.phoneNumber = t(
          "quotationErrPhone",
          "Please enter a valid phone number with area code."
        );
      }

      // 5. Street Address — simple emptiness check
      if (!streetAddress || !streetAddress.trim()) {
        nextErrors.streetAddress = t(
          "quotationErrStreet",
          "Street address is required."
        );
      }

      // 6. Country
      if (!selectedCountry || !selectedCountry.trim()) {
        nextErrors.selectedCountry = t(
          "quotationErrCountry",
          "Country is required."
        );
      }

      // 7. Postal Code — simple emptiness check
      if (!postalCode || !postalCode.trim()) {
        nextErrors.postalCode = t(
          "quotationErrPostal",
          "Postal code is required."
        );
      }

      // 8. City — simple emptiness check
      if (!city || !city.trim()) {
        nextErrors.city = t("quotationErrCity", "City is required.");
      }

      // 9. Province / State — simple emptiness check
      if (!province || !province.trim()) {
        nextErrors.province = t(
          "quotationErrProvince",
          "Province / State is required."
        );
      }

      setErrors(nextErrors);

      const isValid = Object.keys(nextErrors).length === 0;
      const firstErrorMessage = isValid
        ? undefined
        : Object.values(nextErrors)[0];

      return {
        valid: isValid,
        message: firstErrorMessage,
        errors: nextErrors,
      };
    },
    [
      firstName,
      lastName,
      fullName,
      email,
      phoneNumber,
      streetAddress,
      selectedCountry,
      postalCode,
      city,
      province,
    ]
  );

  // ── Reset ─────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setTitlePrefixRaw("Mr.");
    setFirstNameRaw("");
    setLastNameRaw("");
    setEmailRaw("");
    setPhoneNumberRaw("");
    setSelectedCountryRaw(defaultCountry);
    setPostalCodeRaw("");
    setCityRaw("");
    setProvinceRaw("");
    setStreetAddressRaw("");
    setUnitRaw("");
    setGateCodeRaw("");
    setWaterSourceRaw("Outdoor Hose Spigot Ready");
    setEntryNotesRaw("");
    setErrors({});
  }, [defaultCountry]);

  // ── Bindings object ───────────────────────────────────────────────────────
  const bindings: LocationAccessSectionBindings = useMemo(
    () => ({
      titlePrefix,
      setTitlePrefix,
      fullName,
      setFullName,
      email,
      setEmail,
      phone: phoneNumber,
      setPhone,
      address,
      setAddress,

      firstName,
      setFirstName,
      lastName,
      setLastName,
      phoneNumber,
      setPhoneNumber,

      selectedCountry,
      setSelectedCountry,
      postalCode,
      setPostalCode,
      city,
      setCity,
      province,
      setProvince,
      streetAddress,
      setStreetAddress,
      unit,
      setUnit,

      gateCode,
      setGateCode,
      waterSource,
      setWaterSource,
      entryNotes,
      setEntryNotes,

      errors,
      setErrors,
      clearFieldError,
    }),
    [
      titlePrefix,
      setTitlePrefix,
      fullName,
      setFullName,
      email,
      setEmail,
      phoneNumber,
      setPhone,
      address,
      setAddress,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      setPhoneNumber,
      selectedCountry,
      setSelectedCountry,
      postalCode,
      setPostalCode,
      city,
      setCity,
      province,
      setProvince,
      streetAddress,
      setStreetAddress,
      unit,
      setUnit,
      gateCode,
      setGateCode,
      waterSource,
      setWaterSource,
      entryNotes,
      setEntryNotes,
      errors,
      clearFieldError,
    ]
  );

  // ── Form Data Snapshot ────────────────────────────────────────────────────
  const formData: LocationAccessFormData = useMemo(
    () => ({
      titlePrefix,
      firstName,
      lastName,
      fullName,
      email,
      phoneNumber,
      phone: phoneNumber,
      selectedCountry,
      postalCode,
      city,
      province,
      streetAddress,
      unit,
      address,
      gateCode,
      waterSource,
      entryNotes,
    }),
    [
      titlePrefix,
      firstName,
      lastName,
      fullName,
      email,
      phoneNumber,
      selectedCountry,
      postalCode,
      city,
      province,
      streetAddress,
      unit,
      address,
      gateCode,
      waterSource,
      entryNotes,
    ]
  );

  return {
    bindings,
    formData,
    errors,
    setErrors,
    clearFieldError,
    validateContactFields,
    reset,
  };
}
