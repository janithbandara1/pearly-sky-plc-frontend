"use client";

import Image from "next/image";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import type { Booking, BookingStatusSummary } from "@/lib/booking-api";
import { loadBookingDraft } from "@/lib/booking-draft";
import Link from "next/link";

export interface BookingPdfData {
  referenceNumber: string;
  paymentStatus?: "PAID" | "PENDING" | "CANCELLED" | string;
  messageDate?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  location: {
    address: string;
    serviceDate: string;
    startTime: string;
  };
  serviceConfig: {
    serviceType: string;
    apartmentSize: string;
    cleaningSolvents: string;
    cleaningEquipment: string;
    baseDuration: string;
    specialInstructions: string;
    serviceUpgrade: string;
  };
  equipmentUpgrades: Array<{
    name: string;
    price: string;
  }>;
  paymentInfo: {
    paymentMethod: string;
    estimatedTotal: string;
    advancePaid: string;
  };
  metrics: {
    propertyScale: string;
    serviceDuration: string;
    cleanerDuration: string;
  };
  allocation: {
    professionals: string;
    classification: string;
    continuityPlan: string;
  };
  preferences: {
    genderPreference: string;
    linguisticCoordination: string;
    serviceRequirements: string;
  };
  qrValue?: string;
}

export function buildBookingPdfData(
  statusSummary?: BookingStatusSummary | null,
  fullBooking?: Booking | null,
  currencySymbol = "EUR"
): BookingPdfData {
  const draft = typeof window !== "undefined" ? loadBookingDraft() : null;
  const details = fullBooking?.serviceDetails?.[0];

  const ref =
    statusSummary?.referenceNumber ||
    fullBooking?.referenceNumber ||
    `SER/EN/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/000119`;

  const status =
    fullBooking?.status === "confirmed" || statusSummary?.status === "confirmed"
      ? "PAID"
      : fullBooking?.status === "cancelled" || statusSummary?.status === "cancelled"
        ? "CANCELLED"
        : "PAID";

  const customerName = fullBooking
    ? `${fullBooking.customer.firstName} ${fullBooking.customer.lastName ?? ""}`.trim()
    : "Tyson Etienne";

  const customerEmail = fullBooking?.customer.email || "tyetienne1@gmail.com";
  const customerPhone = fullBooking?.customer.contact || "+19173550074";

  let addressStr = "42 Boulevard de la Marne, Nogent-sur-Marne, 94130, FR";
  if (fullBooking?.address) {
    const a = fullBooking.address;
    addressStr = [a.streetAddress, a.unit, a.city, a.postalCode, a.country || a.state]
      .filter(Boolean)
      .join(", ");
  } else if (statusSummary?.address) {
    const a = statusSummary.address;
    addressStr = [a.streetAddress, a.city, a.state, a.country].filter(Boolean).join(", ");
  }

  const sDate = details?.date || statusSummary?.date || draft?.date || "2026-09-09";
  const sTime = details?.time || statusSummary?.time || draft?.time || "07:00:00";

  const sType =
    details?.service?.label || statusSummary?.service?.label || draft?.serviceLabel || "Deep Cleaning";

  const propertySize =
    details?.propertySizeSqm || draft?.propertySizeSqm || 43;

  const supply =
    details?.supplySource || draft?.supplySource || "company";
  const supplyLabel = supply === "customer" ? "Customer" : "Company";

  const minH = details?.minHours || statusSummary?.minHours || "2.30";
  const maxH = details?.maxHours || statusSummary?.maxHours || "5.00";
  const durationLabel = `${Number(minH).toFixed(2)} - ${Number(maxH).toFixed(2)} hours`;

  const specialInst =
    details?.note || draft?.note || "None Provided";

  const addOnsList = details?.addOns || draft?.packages || [];
  const serviceUpgrade =
    addOnsList.length > 0 ? addOnsList.map((a) => a.name).join(", ") : "None Selected";

  const equipmentList: Array<{ name: string; price: string }> = [];
  if (details?.equipmentItems && details.equipmentItems.length > 0) {
    details.equipmentItems.forEach((item) => {
      equipmentList.push({
        name: item.name,
        price: item.price != null ? `${currencySymbol} ${item.price}` : "Included",
      });
    });
  } else if (draft?.items && draft.items.length > 0) {
    draft.items.forEach((item) => {
      equipmentList.push({
        name: item.name,
        price: item.price != null ? `${currencySymbol} ${item.price}` : "Included",
      });
    });
  } else {
    equipmentList.push(
      { name: "Bio - Solvent", price: `${currencySymbol} 14` },
      { name: "Mop (1 Mop)", price: `${currencySymbol} 6` },
      { name: "Materials (1 Kit)", price: `${currencySymbol} 7` },
      { name: "Vacuum (1 Vac)", price: `${currencySymbol} 8` }
    );
  }

  const advanceNum = fullBooking?.price ? Number(fullBooking.price) : statusSummary?.price ? Number(statusSummary.price) : 30;
  const estimatedMin = Math.round(Number(minH) * advanceNum + 40);
  const estimatedMax = Math.round(Number(maxH) * advanceNum + 40);

  const cleanerCount = details?.cleanerCount || statusSummary?.cleanerCount || 1;
  const professionals = `${cleanerCount} Professional Cleaner assigned`;

  const classification =
    details?.propertyType || draft?.propertyType || draft?.propertyClassification || "Apt Studio";

  const continuityPlan =
    draft?.serviceContinuityPlan ||
    "Standard Ad-Hoc On-Demand Coverage (No active subscription)";

  const genderPrefRaw = details?.genderPreference || draft?.genderPreference || "female";
  const genderPref =
    genderPrefRaw.toLowerCase() === "female"
      ? "Female"
      : genderPrefRaw.toLowerCase() === "male"
        ? "Male"
        : "No Preference";

  const langPref = details?.languagePreference || draft?.languagePreference || "English";
  const linguistic = `${langPref} Speaking Crew Preferred`;

  const requirements =
    details?.specialRequirements ||
    draft?.specialRequirements ||
    draft?.serviceSpecifics ||
    "Standard service checklist";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const messageDate = `${dateStr} at ${timeStr}`;

  return {
    referenceNumber: ref,
    paymentStatus: status,
    messageDate,
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    },
    location: {
      address: addressStr,
      serviceDate: String(sDate),
      startTime: String(sTime),
    },
    serviceConfig: {
      serviceType: sType,
      apartmentSize: `${propertySize}m²`,
      cleaningSolvents: supplyLabel,
      cleaningEquipment: supplyLabel,
      baseDuration: durationLabel,
      specialInstructions: specialInst,
      serviceUpgrade: serviceUpgrade,
    },
    equipmentUpgrades: equipmentList,
    paymentInfo: {
      paymentMethod: "Stripe",
      estimatedTotal: `${currencySymbol} ${estimatedMin} - ${estimatedMax}`,
      advancePaid: `${currencySymbol} ${advanceNum}`,
    },
    metrics: {
      propertyScale: `${propertySize}m²`,
      serviceDuration: durationLabel,
      cleanerDuration: `${Number(minH).toFixed(1)} - ${Number(maxH).toFixed(0)} hours`,
    },
    allocation: {
      professionals,
      classification,
      continuityPlan,
    },
    preferences: {
      genderPreference: genderPref,
      linguisticCoordination: linguistic,
      serviceRequirements: requirements,
    },
    qrValue: `https://pearlysky.com/bookings/verify?ref=${ref}`,
  };
}

function GmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  width="40" height="40" viewBox="0 -31.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
        <g>
            <path d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z" fill="#4285F4">

            </path>
              <path d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z" fill="#34A853">

            </path>
            <polygon fill="#EA4335" points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061">

            </polygon>
            <path d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z" fill="#FBBC04">

          </path>
                  <path d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z" fill="#C5221F">

          </path>
        </g>
    </svg>
  );
}

export function SvgQrCode({ value, size }: { value: string; size?: number }) {
  const dim = size ?? 96;
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        style={{ width: dim, height: dim }}
        aria-label={`QR Code for ${value}`}
      >
        <rect width="100" height="100" fill="#ffffff" />
        {/* Top-Left Finder */}
        <rect x="10" y="10" width="24" height="24" fill="#000000" />
        <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
        <rect x="18" y="18" width="8" height="8" fill="#000000" />

        {/* Top-Right Finder */}
        <rect x="66" y="10" width="24" height="24" fill="#000000" />
        <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
        <rect x="74" y="18" width="8" height="8" fill="#000000" />

        {/* Bottom-Left Finder */}
        <rect x="10" y="66" width="24" height="24" fill="#000000" />
        <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
        <rect x="18" y="74" width="8" height="8" fill="#000000" />

        {/* Timing and Pattern Data Cells */}
        <rect x="38" y="10" width="4" height="4" fill="#000000" />
        <rect x="46" y="10" width="4" height="4" fill="#000000" />
        <rect x="54" y="10" width="4" height="4" fill="#000000" />
        <rect x="38" y="18" width="4" height="4" fill="#000000" />
        <rect x="50" y="18" width="4" height="4" fill="#000000" />
        <rect x="42" y="26" width="4" height="4" fill="#000000" />
        <rect x="50" y="26" width="4" height="4" fill="#000000" />
        <rect x="58" y="26" width="4" height="4" fill="#000000" />

        <rect x="10" y="38" width="4" height="4" fill="#000000" />
        <rect x="18" y="38" width="4" height="4" fill="#000000" />
        <rect x="26" y="38" width="4" height="4" fill="#000000" />
        <rect x="34" y="38" width="4" height="4" fill="#000000" />
        <rect x="42" y="38" width="4" height="4" fill="#000000" />
        <rect x="50" y="38" width="4" height="4" fill="#000000" />
        <rect x="58" y="38" width="4" height="4" fill="#000000" />
        <rect x="66" y="38" width="4" height="4" fill="#000000" />
        <rect x="74" y="38" width="4" height="4" fill="#000000" />
        <rect x="82" y="38" width="4" height="4" fill="#000000" />

        <rect x="10" y="46" width="4" height="4" fill="#000000" />
        <rect x="22" y="46" width="4" height="4" fill="#000000" />
        <rect x="30" y="46" width="4" height="4" fill="#000000" />
        <rect x="46" y="46" width="4" height="4" fill="#000000" />
        <rect x="54" y="46" width="4" height="4" fill="#000000" />
        <rect x="62" y="46" width="4" height="4" fill="#000000" />
        <rect x="78" y="46" width="4" height="4" fill="#000000" />
        <rect x="86" y="46" width="4" height="4" fill="#000000" />

        <rect x="14" y="54" width="4" height="4" fill="#000000" />
        <rect x="26" y="54" width="4" height="4" fill="#000000" />
        <rect x="38" y="54" width="4" height="4" fill="#000000" />
        <rect x="42" y="54" width="4" height="4" fill="#000000" />
        <rect x="50" y="54" width="4" height="4" fill="#000000" />
        <rect x="70" y="54" width="4" height="4" fill="#000000" />
        <rect x="82" y="54" width="4" height="4" fill="#000000" />

        <rect x="38" y="66" width="4" height="4" fill="#000000" />
        <rect x="46" y="66" width="4" height="4" fill="#000000" />
        <rect x="54" y="66" width="4" height="4" fill="#000000" />
        <rect x="66" y="66" width="4" height="4" fill="#000000" />
        <rect x="74" y="66" width="4" height="4" fill="#000000" />
        <rect x="86" y="66" width="4" height="4" fill="#000000" />

        <rect x="42" y="74" width="4" height="4" fill="#000000" />
        <rect x="50" y="74" width="4" height="4" fill="#000000" />
        <rect x="62" y="74" width="4" height="4" fill="#000000" />
        <rect x="78" y="74" width="4" height="4" fill="#000000" />

        <rect x="38" y="82" width="4" height="4" fill="#000000" />
        <rect x="46" y="82" width="4" height="4" fill="#000000" />
        <rect x="58" y="82" width="4" height="4" fill="#000000" />
        <rect x="70" y="82" width="4" height="4" fill="#000000" />
        <rect x="82" y="82" width="4" height="4" fill="#000000" />
      </svg>
      <span className="mt-1 text-[11px] font-medium tracking-tight text-slate-700">QR Code</span>
    </div>
  );
}

export function BookingPdfDocument({ data }: { data: BookingPdfData }) {
  const isPaid = data.paymentStatus?.toUpperCase() === "PAID";
  const badgeText = isPaid
    ? "PAYMENT STATUS: PAID"
    : `PAYMENT STATUS: ${data.paymentStatus?.toUpperCase() || "PENDING"}`;

  return (
    <div className="booking-pdf-root mx-auto w-full max-w-[840px] bg-white font-sans text-slate-800 antialiased print:max-w-none">
      {/* -------------------- PAGE 1 CONTAINER -------------------- */}
      <div className="booking-pdf-page page-break-after p-4 sm:p-8 print:p-6">
        {/* Email Header Mockup */}
        <div className="mb-6 border-b border-slate-300 pb-4">
          <div className="flex items-center gap-3">
            <GmailIcon />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Service Order Confirmation
              </h1>
              <p className="text-xs text-slate-500">1 message</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1 text-[13px] text-slate-700 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <span className="font-bold text-slate-900">PearlySky Global Clean</span>{" "}
              <span className="text-slate-500">&lt;no-reply@pearlyskyglobalclean.com&gt;</span>
            </div>
            <div className="text-xs text-slate-500 sm:text-right">
              {data.messageDate || "Tue, 8 Sept 2026 at 00:09"}
            </div>
          </div>

          <div className="mt-1 text-[12px] text-slate-600">
            <div>
              Reply to:{" "}
              <a
                href="mailto:management@pearlyskyglobalclean.com"
                className="text-slate-700 hover:underline"
              >
                management@pearlyskyglobalclean.com
              </a>
            </div>
            <div>
              To:{" "}
              <a href={`mailto:${data.customer.email}`} className="text-slate-700 hover:underline">
                {data.customer.email}
              </a>
            </div>
          </div>
        </div>

        {/* Main Document Box (Page 1) */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm print:border-none print:shadow-none">
          {/* Top Navy Header with Logo & QR Code */}
          <div className="relative flex items-center justify-between border-b-[3.5px] border-[#D4AF37] bg-[#0B1B3D] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-36 sm:h-16 sm:w-44">
                <Image
                  src="/images/brand/logo.webp"
                  alt="Pearly Sky Logo"
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            <div className="rounded-md bg-white p-2 shadow-md">
              <SvgQrCode value={data.qrValue || data.referenceNumber} />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Title & Payment Status Badge */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-slate-900 sm:text-2xl">
                  PEARLY SKY CLEANING SERVICES
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-[13px]">
                  Extended Service Booking &amp; Technical Specifications Order Summary
                </p>
              </div>

              <div className="self-start">
                <span className="inline-block rounded-md bg-[#C69214] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  {badgeText}
                </span>
              </div>
            </div>

            {/* Golden Horizontal Divider */}
            <div className="my-5 h-[2px] w-full bg-[#D4AF37]" />

            {/* 2-Column: Customer Information vs Service Location & Timing */}
            <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-6 sm:grid-cols-2">
              {/* Column 1 */}
              <div className="sm:border-r sm:border-slate-200 sm:pr-6">
                <h3 className="mb-3 text-[14px] font-bold text-[#C5A85A]">Customer Information</h3>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex items-baseline">
                    <span className="w-20 shrink-0 font-bold text-slate-900">Name:</span>
                    <span className="text-slate-800">{data.customer.name}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-20 shrink-0 font-bold text-slate-900">Email:</span>
                    <a
                      href={`mailto:${data.customer.email}`}
                      className="text-sky-600 hover:underline"
                    >
                      {data.customer.email}
                    </a>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-20 shrink-0 font-bold text-slate-900">Phone:</span>
                    <a
                      href={`tel:${data.customer.phone.replace(/\s/g, "")}`}
                      className="text-slate-800 hover:underline"
                    >
                      {data.customer.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="sm:pl-2">
                <h3 className="mb-3 text-[14px] font-bold text-[#C5A85A]">
                  Service Location &amp; Timing
                </h3>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex items-start">
                    <span className="w-28 shrink-0 font-bold text-slate-900">Address:</span>
                    <span className="text-slate-800 leading-snug">{data.location.address}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-28 shrink-0 font-bold text-slate-900">Service Date:</span>
                    <span className="text-slate-800">{data.location.serviceDate}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-28 shrink-0 font-bold text-slate-900">Start Time:</span>
                    <span className="text-slate-800">{data.location.startTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Service Configuration */}
            <div className="border-b border-slate-200 ">
               <div className="py-6  ">
                <h3 className="mb-4 text-[14px] font-bold text-[#C5A85A]">
                  Core Service Configuration
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Left col */}
                  <div className="flex flex-col gap-2 text-[13px] sm:border-r sm:border-slate-200 sm:pr-6">
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">Service Type:</span>
                      <span className="text-slate-800">{data.serviceConfig.serviceType}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">Apartment Size:</span>
                      <span className="text-slate-800">{data.serviceConfig.apartmentSize}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">
                        Cleaning Solvents:
                      </span>
                      <span className="text-slate-800">{data.serviceConfig.cleaningSolvents}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">
                        Cleaning Equipment:
                      </span>
                      <span className="text-slate-800">{data.serviceConfig.cleaningEquipment}</span>
                    </div>
                  </div>

                  {/* Right col */}
                  <div className="flex flex-col gap-2 text-[13px] sm:pl-2">
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">Base Duration:</span>
                      <span className="text-slate-800">{data.serviceConfig.baseDuration}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">
                        Special Instructions:
                      </span>
                      <span className="text-slate-800">
                        {data.serviceConfig.specialInstructions || "None Provided"}
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="w-36 shrink-0 font-bold text-slate-900">Service Upgrade:</span>
                      <span className="text-slate-800">
                        {data.serviceConfig.serviceUpgrade || "None Selected"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
           
            {/* 2-Column: Equipment Items & Upgrades vs Payment Information */}
            <div className="grid grid-cols-1 pt-2 gap-6 pb-6 border-b border-slate-200  sm:grid-cols-2">
              {/* Left col: Equipment Items & Upgrades */}
              <div className="sm:border-r sm:border-slate-200 sm:pr-6">
                <h3 className="mb-3 text-[14px] font-bold text-[#C5A85A]">
                  Equipment Items &amp; Upgrades
                </h3>
                <div className="flex flex-col gap-1.5 text-[13px] text-slate-800">
                  {data.equipmentUpgrades.length > 0 ? (
                    data.equipmentUpgrades.map((item, idx) => (
                      <div key={idx} className="flex items-baseline gap-1.5">
                        <span className="text-slate-500">•</span>
                        <span>
                          {item.name}: <span className="font-semibold">{item.price}</span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">None Provided</p>
                  )}
                </div>
              </div>

              {/* Right col: Payment Information */}
              <div className="sm:pl-2">
                <h3 className="mb-3 text-[14px] font-bold text-[#C5A85A]">Payment Information</h3>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex items-baseline">
                    <span className="w-32 shrink-0 font-bold text-slate-900">Payment Method:</span>
                    <span className="text-slate-800">{data.paymentInfo.paymentMethod}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-32 shrink-0 font-bold text-slate-900">
                      Estimated Total:
                    </span>
                    <span className="text-slate-800">{data.paymentInfo.estimatedTotal}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-32 shrink-0 font-bold text-slate-900">Advance Paid:</span>
                    <span className="text-slate-800">{data.paymentInfo.advancePaid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- PAGE 2 CONTAINER -------------------- */}
      <div className="booking-pdf-page p-4 sm:p-8 print:p-6 print:pt-8">
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm print:border-none print:shadow-none">
          <div className="p-6 sm:p-8">
            

            {/* 3 Numbered Specification Metric Blocks */}
            <div className="mt-6 flex flex-col gap-4">
              {/* 1. Property & Operational Scale Metrics */}
              <div className="rounded-md border border-slate-200/80 bg-[#FFFDF8] p-4 text-[13px]">
                <h4 className="mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                  1. PROPERTY &amp; OPERATIONAL SCALE METRICS
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Estimated Property Scale:
                    </span>
                    <span className="text-slate-800">{data.metrics.propertyScale}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Estimated Service Duration:
                    </span>
                    <span className="text-slate-800">{data.metrics.serviceDuration}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Cleaner Duration (On-Site):
                    </span>
                    <span className="text-slate-800">{data.metrics.cleanerDuration}</span>
                  </div>
                </div>
              </div>

              {/* 2. Allocation & Categorization Specs */}
              <div className="rounded-md border border-slate-200/80 bg-[#FFFDF8] p-4 text-[13px]">
                <h4 className="mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                  2. ALLOCATION &amp; CATEGORIZATION SPECS
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Allocated Professionals:
                    </span>
                    <span className="text-slate-800">{data.allocation.professionals}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Property Classification:
                    </span>
                    <span className="text-slate-800">{data.allocation.classification}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Service Continuity Plan:
                    </span>
                    <span className="text-slate-800">{data.allocation.continuityPlan}</span>
                  </div>
                </div>
              </div>

              {/* 3. Preferences & Logistics Coordination */}
              <div className="rounded-md border border-slate-200/80 bg-[#FFFDF8] p-4 text-[13px]">
                <h4 className="mb-2.5 text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                  3. PREFERENCES &amp; LOGISTICS COORDINATION
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Staff Gender Preference:
                    </span>
                    <span className="text-slate-800">{data.preferences.genderPreference}</span>
                  </div>
                  <div className="flex items-baseline justify-between sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Linguistic Coordination:
                    </span>
                    <span className="text-slate-800">
                      {data.preferences.linguisticCoordination}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-start">
                    <span className="w-56 shrink-0 font-bold text-slate-900">
                      Service Requirements &amp; Specifics:
                    </span>
                    <span className="text-slate-800">{data.preferences.serviceRequirements}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Emails Line */}
            <div className="mt-5 text-[12px] text-slate-600">
              <span>System Emails: Support: </span>
              <a
                href="mailto:administration@pearlyskyglobalclean.com"
                className="font-medium text-[#C5A85A] hover:underline"
              >
                administration@pearlyskyglobalclean.com
              </a>
              <span> | Operations: </span>
              <a
                href="mailto:operations@pearlyskyglobalclean.com"
                className="font-medium text-[#C5A85A] hover:underline"
              >
                operations@pearlyskyglobalclean.com
              </a>
            </div>
          </div>

          {/* Footer Banner */}
          <div className="border-t-[3.5px] border-[#D4AF37] bg-[#0B1B3D] px-6 py-6 text-center text-white sm:px-8">
            <h5 className="text-[14px] font-bold tracking-wide text-white">
              Thank you for choosing PEARLY SKY COMPANY PRIVATE LTD
            </h5>
            <p className="mt-1 text-[11px] font-medium tracking-wider text-slate-300">
              PEARLY SKY COMPANY PRIVATE LTD
            </p>

            {/* Clickable Social Media Links */}
            <div className="my-4 flex items-center justify-center gap-3 sm:gap-4">
              {/* Facebook */}
              <Link
                href={SOCIAL_URLS.facebook}
                target="_blank"
                rel="noopener noreferrer" 
                className="group relative flex h-8 w-8 items-center justify-center rounded-md bg-[#1877F2] text-white shadow-sm transition hover:scale-110"
                aria-label="Facebook"
              >
                <Image
                  src="/images/email/social-facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>

              {/* Instagram */}
              <Link
                href={SOCIAL_URLS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-sm transition hover:scale-110"
                aria-label="Instagram"
              >
                <Image
                  src="/images/email/social-instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>

              {/* X / Twitter */}
              <Link
                href={SOCIAL_URLS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 items-center justify-center rounded-md bg-black text-white shadow-sm transition hover:scale-110"
                aria-label="X (Twitter)"
              >
                <Image
                  src="/images/email/social-x.png"
                  alt="X"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>

              {/* YouTube */}
              <Link
                href={SOCIAL_URLS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 items-center justify-center rounded-md bg-[#FF0000] text-white shadow-sm transition hover:scale-110"
                aria-label="YouTube"
              >
                <Image
                  src="/images/email/social-youtube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>

              {/* TikTok */}
              <Link
                href={SOCIAL_URLS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 z-1 items-center justify-center rounded-md bg-black text-white shadow-sm transition hover:scale-110"
                aria-label="TikTok"
              >
                <Image
                  src="/images/email/social-tiktok.png"
                  alt="TikTok"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>

              {/* LinkedIn */}
              <Link
                href={SOCIAL_URLS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 items-center justify-center rounded-md bg-[#0A66C2] text-white shadow-sm transition hover:scale-110"
                aria-label="LinkedIn"
              >
                <Image
                  src="/images/email/social-linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  sizes="(max-width: 768px) 150px, 200px"
                  priority
                  className="h-5 w-5 object-contain"
                />
              </Link>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]">
              PEARLY SKY COMPANY PRIVATE LTD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
