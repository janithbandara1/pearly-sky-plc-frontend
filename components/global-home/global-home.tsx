import { greatVibes, playfair } from "./fonts";
import { GlobalHero } from "./hero";
import { GlobalNetwork } from "./global-network";
import { GlobalServices } from "./services";
import { GlobalSectors } from "./sectors";
import { GlobalWhyChoose } from "./why-choose";
import { GlobalQuote } from "./quote";

/** The global gateway's home page (IS_GLOBAL_SITE) — dark navy/gold, linking out to each country site. */
export function GlobalHome() {
  return (
    <main className={`${playfair.variable} ${greatVibes.variable} flex-1 bg-navy-900 font-sans text-slate-100`}>
      <GlobalHero />
      <GlobalNetwork />
      <GlobalServices />
      <GlobalSectors />
      <GlobalWhyChoose />
      <GlobalQuote />
    </main>
  );
}
