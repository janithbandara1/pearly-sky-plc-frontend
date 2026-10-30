import { getOurServicesContent } from "@/lib/content/our-services";
import { getRequestLanguage } from "@/lib/i18n/server";
import { greatVibes, playfair } from "./fonts";
import { GlobalHero } from "./hero";
import { GlobalNetwork } from "./global-network";
import { GlobalServices } from "./services";
import { GlobalSectors } from "./sectors";
import { GlobalWhyChoose } from "./why-choose";
import { GlobalHomeContact, type QuoteServiceOption } from "./home-contact";
import { SERVICE_ORDER } from "./services-order";

/** The global gateway's home page (IS_GLOBAL_SITE) — dark navy/gold, linking out to each country site. */
export async function GlobalHome() {
  const language = await getRequestLanguage();
  const englishTitles = new Map(getOurServicesContent("en").services.map(({ id, title }) => [id, title]));
  // Every service, titled in the visitor's language, in the Our Services order.
  const quoteServices: QuoteServiceOption[] = getOurServicesContent(language)
    .services.filter(({ id }) => englishTitles.has(id))
    .sort((a, b) => SERVICE_ORDER.indexOf(a.id) - SERVICE_ORDER.indexOf(b.id))
    .map(({ id, title }) => ({ value: id, title, englishTitle: englishTitles.get(id)! }));

  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-navy-900 font-sans text-slate-100`}>
      <GlobalHero />
      <GlobalNetwork />
      <GlobalServices />
      <GlobalSectors />
      <GlobalWhyChoose />
      <GlobalHomeContact services={quoteServices} />
    </main>
  );
}
