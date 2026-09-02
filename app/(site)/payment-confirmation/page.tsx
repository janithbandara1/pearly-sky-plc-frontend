"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import { ArrowLeft, Check, Download, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "45088";
  const refNumber =
    searchParams.get("ref") ||
    `SER/EN/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/000119`;

  const { status } = useAuth();
  const todayStr = new Date().toISOString().split("T")[0];

  function handleDownloadPDF() {
    window.print();
  }

  return (
    <div className="mx-auto my-10 w-full max-w-[480px] overflow-hidden rounded-3xl border border-[#A98B4B]/30 bg-white shadow-2xl">
      {/* Top Navy Header */}
      <div className="relative flex items-center justify-center bg-[#121E2D] px-6 py-5 text-white">
        <Link
          href="/"
          className="absolute left-5 flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="text-center">
          <h2 className="text-base font-extrabold tracking-widest text-[#A98B4B] uppercase">
            Pearly Sky
          </h2>
          <p className="text-[10px] font-semibold tracking-wider text-white/80 uppercase">
            Eco-Luxury Cleaning Care
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col items-center p-6 text-center sm:p-8">
        {/* Green Check Icon */}
        <div className="mb-4 flex size-14 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-500 shadow-sm">
          <Check className="size-7 stroke-[2.5]" />
        </div>

        <h1 className="text-xl font-bold text-brand-navy sm:text-2xl">
          Quotation Requested
        </h1>
        <p className="mt-2 max-w-xs text-xs text-slate-600 sm:text-sm">
          Thank you for your request. Your quotation has been successfully submitted. We will get back to you shortly.
        </p>

        {/* QR Code Container */}
        <div className="my-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4 shadow-inner">
          <div className="relative flex size-32 items-center justify-center rounded-xl bg-white p-2 shadow-sm border border-slate-100">
            {/* SVG stylized QR code */}
            <svg
              viewBox="0 0 100 100"
              className="size-28 text-brand-navy"
              fill="currentColor"
            >
              <path d="M0 0h35v35H0V0zm5 5v25h25V5H5z" />
              <path d="M10 10h15v15H10V10zM65 0h35v35H65V0zm5 5v25h25V5H70z" />
              <path d="M75 10h15v15H75V10zM0 65h35v35H0V65zm5 5v25h25V70H5z" />
              <path d="M10 75h15v15H10V75zM45 10h10v10H45V10zM45 45h10v10H45V45zM10 45h10v10H10V45zM75 45h10v10H75V45zM65 65h10v10H65V65zM85 65h15v10H85V65zM65 85h10v15H65V85zM85 85h15v15H85V85zM45 75h10v25H45V75z" />
            </svg>
          </div>

          {/* Download Order Details Button */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#A98B4B] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:brightness-110"
          >
            <Download className="size-3.5" />
            Download Order Details
          </button>
        </div>

        {/* Reference and Date Box */}
        <div className="w-full space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs font-semibold sm:text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Reference Number:</span>
            <span className="font-bold text-[#002F6D]">{refNumber}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Date:</span>
            <span className="font-bold text-slate-800">{todayStr}</span>
          </div>
        </div>

        {/* Blue Info Box */}
        <div className="mt-4 w-full rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-left">
          <p className="text-xs font-bold text-sky-900">
            Important Information - Dashboard Email Confirmation
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-sky-800">
            A detailed copy of your booking confirmation has been sent to your registered email.
          </p>
        </div>

        {/* Login to Dashboard */}
        <div className="mt-6 w-full">
          <Button asChild className="h-11 w-full rounded-xl bg-[#A98B4B] text-sm font-bold tracking-wider text-white shadow-md transition hover:brightness-110">
            <Link href={status === "authenticated" ? "/bookings" : "/login"}>
              LOGIN TO DASHBOARD
            </Link>
          </Button>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Need Help?{" "}
          <Link href="/contact-us" className="font-semibold text-[#A98B4B] hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <main className={`${poppins.className} flex min-h-screen items-center justify-center bg-[rgb(199,209,217)] p-4 sm:p-6`}>
      <Suspense fallback={<div className="text-sm text-slate-600">Loading confirmation…</div>}>
        <ConfirmationContent />
      </Suspense>
    </main>
  );
}
