"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function Welcome() {

 const { translate, language } = useLanguage();

    return (
        <section className="bg-[#0A1530] w-full py-16 px-4 flex flex-col items-center border-t-2 border-[#A98B4B]">
            <div className="w-full max-w-5xl text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px w-16 bg-[#A98B4B]"></div>
                    <span className="text-[#C9B678] text-lg">◆</span>
                    <div className="h-px w-16 bg-[#A98B4B]"></div>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-wide mb-3">
                    {translate("heroWelcome")}
                </h2>
                <h3 className="text-[#C9B678] font-bold text-lg md:text-xl mb-5">
                    {translate("heroWelcomeSubText")}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                    {translate("heroWelcomeContent")}
                </p>
            </div>
        </section>
    )
}