"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function Welcome() {

    const { translate } = useLanguage();

    return (
        <section
            className="relative flex w-full items-center justify-center overflow-hidden border-t-2 border-[#A98B4B] bg-cover lg:bg-cover md:bg-cover bg-center px-4 py-12 sm:py-16 lg:min-h-[390px] lg:py-20"
            style={{ backgroundImage: "url('/images/hero/bg-welcom.png')" }}
        >
            <div className="absolute inset-0" />
            <div className="relative z-10 w-full max-w-4xl text-center">
                <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-7 sm:gap-3">
                    <div className="h-px w-10 bg-[#A98B4B] sm:w-16"></div>
                    <span className="text-sm text-[#C9B678] sm:text-lg">◆</span>
                    <div className="h-px w-10 bg-[#A98B4B] sm:w-16"></div>
                </div>
                <h2 className="mb-2 text-xl font-serif font-bold tracking-[0.04em] text-white sm:text-3xl lg:text-4xl">
                    {translate("heroWelcome")}
                </h2>
                <h3 className="mb-4 text-[10px] font-semibold tracking-wide text-[#C9B678] sm:mb-5 sm:text-sm lg:text-base">
                    {translate("heroWelcomeSubText")}
                </h3>
                <p className="mx-auto max-w-3xl text-[9px] leading-[1.55] text-gray-200 sm:text-xs sm:leading-[1.65] lg:text-sm">
                    {translate("heroWelcomeContent")}
                </p>
            </div>
        </section>
    )
}