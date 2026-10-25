import Image from "next/image";
import { CalendarCheck, Globe, Headset, Send, UserCog } from "lucide-react";
import { officeLocations } from "@/lib/content/locations";
import { COUNTRY_HERO_IMAGES } from "@/lib/countries/config";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { greatVibes, playfair } from "./fonts";
import { ContactOffices } from "./contact-offices";
import { ContactFormPanel } from "./contact-form-panel";

const HERO_FEATURES = [
  { Icon: Headset, title: "24/7", subtitle: "Customer Support" },
  { Icon: CalendarCheck, title: "Online", subtitle: "Booking" },
  { Icon: Send, title: "Quick", subtitle: "Response" },
  { Icon: UserCog, title: "Dedicated", subtitle: "Account Managers" },
];

/** The global gateway's Contact Us page (IS_GLOBAL_SITE). */
export function GlobalContact() {
  const liveCountries = officeLocations.filter((office) => office.country);

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-navy-900 font-sans text-slate-100`}>
      <section className="relative flex min-h-[460px] items-center overflow-hidden border-b border-gold-500/20 px-4 py-12 sm:px-8">
        <Image
          src="/images/locations/contact-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,12,27,0.95)_40%,rgba(2,12,27,0.55)_75%,rgba(2,12,27,0.8)_100%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <span className="block text-xs font-bold uppercase tracking-widest text-gold-400">Get in Touch</span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl">Contact Us</h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
              We&apos;re here to help. Contact our teams in France, United Kingdom or Sri Lanka for bookings, enquiries
              and partnerships.
            </p>

            <ul className="grid max-w-2xl grid-cols-1 gap-3 pt-4 min-[420px]:grid-cols-2 sm:grid-cols-4">
              {HERO_FEATURES.map(({ Icon, title, subtitle }) => (
                <li
                  key={subtitle}
                  className="flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-navy-800/80 px-3 py-2.5 transition-colors hover:border-gold-400"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] leading-tight">
                    <span className="block font-bold text-white">{title}</span>
                    <span className="text-[10px] text-slate-400">{subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden items-center justify-end lg:col-span-5 lg:flex">
            <div className="space-y-1 pr-4 text-right">
              <Image
                src="/images/brand/logo.webp"
                alt=""
                width={64}
                height={64}
                className="mb-3 ml-auto h-16 w-16 rounded-full border border-gold-500/40 bg-navy-800/80 shadow-2xl"
              />
              <span className="block font-display text-xl font-bold uppercase tracking-widest text-white">Pearly Sky</span>
              <span className="mb-4 block text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                Eco-Luxury Cleaning Global
              </span>
              <p className="pt-2 font-script text-4xl text-gold-300 drop-shadow-md">
                Cleaner Spaces <br /> Brighter Days
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactOffices />

      <section className="bg-cream px-4 py-10 text-navy-900 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-md">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold leading-snug">Our Global Presence</h2>
              <p className="text-xs text-slate-600">
                Professional cleaning services across {TOTAL_COUNTRIES} countries. Expanding to more destinations soon.
              </p>
            </div>
          </div>

          <ul className="flex max-w-full items-start gap-6 overflow-x-auto pb-2 md:pb-0">
            {liveCountries.map((office) => (
              <li key={office.id} className="group shrink-0 text-center">
                <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-full border-2 border-gold-500 shadow-md transition-transform group-hover:scale-105">
                  <Image src={COUNTRY_HERO_IMAGES[office.country!]} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <span className="mt-1 block text-[11px] font-bold text-navy-900">{office.name}</span>
              </li>
            ))}
            <li className="group shrink-0 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-200 text-sm font-bold text-slate-700 transition-transform group-hover:scale-105">
                +{TOTAL_COUNTRIES - liveCountries.length}
              </div>
              <span className="mt-1 block text-[10px] font-semibold leading-tight text-slate-600">
                More Countries
                <br />
                Coming Soon
              </span>
            </li>
          </ul>
        </div>
      </section>

      <ContactFormPanel />
    </main>
  );
}
