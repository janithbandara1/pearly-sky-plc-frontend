"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import type { SupplySource } from "@/components/booking/equipment-section";
import {
  getPropertyCategoriesForService,
  PropertyTypeSizeSelector,
} from "@/components/booking/property-type-size-selector";
import {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  QuotationPreferencesSection,
} from "@/components/booking/quotation-preferences-section";
import { QuoteItemsSection } from "@/components/booking/quote-items-section";
import { CarpetItemCards } from "@/components/booking/carpet-item-cards";
import { QuotationDetailsCard } from "@/components/booking/quotation-details-card";
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import { PageHero } from "@/components/page-hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiError } from "@/lib/auth-context";
import { CatalogServiceDetail, getServiceBySlug } from "@/lib/catalog-api";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import {
  CARPET_ITEM_OPTIONS,
  formatQuoteItem,
  POOL_ITEM_OPTIONS,
  PRESSURE_WASHING_ITEM_OPTIONS,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";

/** These services are priced per-project — they get a domain-specific item picker instead of the generic property size/type fields. */
const CUSTOM_QUOTE_ITEMS: Record<string, { title: string; options: QuoteItemOption[] }> = {
  "pool-cleaning": { title: "Pool Details", options: POOL_ITEM_OPTIONS },
  "precision-pressure-washing": { title: "Pressure Washing Job Details", options: PRESSURE_WASHING_ITEM_OPTIONS },
  "carpet-upholstery-cleaning": { title: "Carpet & Upholstery Items", options: CARPET_ITEM_OPTIONS },
};

const COUNTRY_NAMES: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lk: "Sri Lanka",
};

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function RequestQuotationPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const { translate } = useLanguage();
  const { country } = useCountry();
  const customQuote = CUSTOM_QUOTE_ITEMS[serviceSlug];
  const serviceContent = SERVICE_CONTENT[serviceSlug];

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [supplySource, setSupplySource] = useState<SupplySource>("");

  const [propertySizeSqm, setPropertySizeSqm] = useState(20);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const [numCleaners, setNumCleaners] = useState(1);
  const [durationHours, setDurationHours] = useState(3);
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [requirements, setRequirements] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>(country ?? SUPPORTED_COUNTRIES[0]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then(setService)
      .catch((err) => setServiceError(err instanceof ApiError ? err.message : "Service not found."));
  }, [serviceSlug, country]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    if (!streetAddress.trim()) next.streetAddress = "Street address is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!postalCode.trim()) next.postalCode = "Postal code is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service || !validate()) return;

    const items = (service.serviceItems ?? []).map((si) => si.item);
    const selectedItems = supplySource === "company" || supplySource === "customer" ? items : [];
    const supplySourceLabel =
      supplySource === "company" ? "Request the Company" : supplySource === "customer" ? "Provided by the Customer" : "Not specified";
    const genderLabel = GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "No Preference";
    const languageLabel = LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "None";

    const quoteItemLines = customQuote
      ? quoteItems.map((item) => `- ${formatQuoteItem(item, customQuote.options)}`)
      : [];

    const bodyLines = [
      `Service: ${service.label}`,
      `Preferred Date & Time: ${date || "Not specified"} ${time}`.trim(),
      `Cleaning Solvents & Equipment: ${supplySourceLabel}`,
      selectedItems.length ? `Equipment: ${selectedItems.map((i) => i.name).join(", ")}` : "",
      customQuote
        ? `${customQuote.title}:\n${quoteItemLines.length ? quoteItemLines.join("\n") : "Not specified"}`
        : `Property Scale: ${propertySizeSqm} m²`,
      `Cleaners: ${numCleaners}`,
      `Duration: ${formatHM(durationHours)}`,
      `Gender Preference: ${genderLabel}`,
      `Language Preference: ${languageLabel}`,
      `Special Requirements: ${requirements || "-"}`,
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Address: ${streetAddress}, ${city}, ${COUNTRY_NAMES[countryCode]} (${postalCode})`,
    ].filter(Boolean);

    const subject = encodeURIComponent(`Detailed quotation request: ${service.label}`);
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (serviceError) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-destructive">{serviceError}</div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const genderLabel = GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "No Preference";
  const languageLabel = LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "None";
  const quoteItemLines = customQuote
    ? quoteItems.map((item) => formatQuoteItem(item, customQuote.options))
    : undefined;
  const equipmentItems = (service.serviceItems ?? []).map((si) => si.item);

  return (
    <main className="flex-1">
      <PageHero
        image={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"}
        eyebrow="Request a quotation"
        title={service.label}
        subtitle={service.description ?? undefined}
      />

      <div className="mx-auto flex w-full max-w-[1150px] flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border-[1.5px] border-brand-gold-dark bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>

        {serviceContent?.introduction && <ServiceIntroduction {...serviceContent.introduction} />}

        {serviceContent?.highlights?.map((group, index) => (
          <ServiceHighlights key={index} title={group.title} cards={group.cards} />
        ))}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          <DateTimeSection date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />

          {serviceSlug === "carpet-upholstery-cleaning" ? (
            <CarpetItemCards items={quoteItems} onItemsChange={setQuoteItems} />
          ) : customQuote ? (
            <QuoteItemsSection
              title={customQuote.title}
              itemOptions={customQuote.options}
              items={quoteItems}
              onItemsChange={setQuoteItems}
            />
          ) : (
            <PropertyTypeSizeSelector
              value={propertySizeSqm}
              onChange={setPropertySizeSqm}
              categories={getPropertyCategoriesForService(serviceSlug)}
            />
          )}

          <QuotationPreferencesSection
            numCleaners={numCleaners}
            onNumCleanersChange={setNumCleaners}
            durationHours={durationHours}
            onDurationHoursChange={setDurationHours}
            gender={gender}
            onGenderChange={setGender}
            language={language}
            onLanguageChange={setLanguage}
            requirements={requirements}
            onRequirementsChange={setRequirements}
          />

          <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
            <div className="bg-brand-navy px-5 py-4 text-center">
              <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5">
              <div className="space-y-1.5">
                <Label htmlFor="quote-first-name">First Name *</Label>
                <Input
                  id="quote-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-invalid={!!errors.firstName}
                  className="bg-brand-cream"
                />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-last-name">Last Name *</Label>
                <Input
                  id="quote-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-invalid={!!errors.lastName}
                  className="bg-brand-cream"
                />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-email">{translate("contactEmailLabel")}</Label>
                <Input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  className="bg-brand-cream"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-phone">Phone *</Label>
                <Input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!!errors.phone}
                  className="bg-brand-cream"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
            <div className="bg-brand-navy px-5 py-4 text-center">
              <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">Address</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="quote-street-address">Street Address *</Label>
                <Input
                  id="quote-street-address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  aria-invalid={!!errors.streetAddress}
                  className="bg-brand-cream"
                />
                {errors.streetAddress && <p className="text-xs text-destructive">{errors.streetAddress}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-city">City *</Label>
                <Input
                  id="quote-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-invalid={!!errors.city}
                  className="bg-brand-cream"
                />
                {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-postal-code">Postal Code *</Label>
                <Input
                  id="quote-postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  aria-invalid={!!errors.postalCode}
                  className="bg-brand-cream"
                />
                {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-country">Country *</Label>
                <Select value={countryCode} onValueChange={(value) => setCountryCode(value as CountryCode)}>
                  <SelectTrigger id="quote-country" className="w-full bg-brand-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_COUNTRIES.map((code) => (
                      <SelectItem key={code} value={code}>
                        {COUNTRY_NAMES[code]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <QuotationDetailsCard
            serviceLabel={service.label}
            date={date}
            time={time}
            quoteItemLines={quoteItemLines}
            quoteItemsTitle={customQuote?.title}
            propertySizeSqm={propertySizeSqm}
            supplySource={supplySource}
            onSupplySourceChange={setSupplySource}
            equipmentItems={equipmentItems}
            numCleaners={numCleaners}
            durationHours={durationHours}
            genderLabel={genderLabel}
            languageLabel={languageLabel}
            requirements={requirements}
            ctaLabel={translate("servicesRequestQuotation")}
            sent={sent}
          />
        </form>
      </div>
    </main>
  );
}
