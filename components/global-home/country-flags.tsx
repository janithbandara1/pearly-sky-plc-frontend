import type { ComponentProps } from "react";
import {
  AE, AT, AU, BE, BH, CA, CH, DE, DK, FI, FR, GB, IE, IS, IT, LI, LK, LU, MC, MT, NL, NO, NZ, OM, QA, SE, US,
} from "country-flag-icons/react/3x2";

/** Keyed by the `flagCode` of each country in lib/content/global-countries.ts. */
const FLAGS: Record<string, typeof FR> = {
  ae: AE, at: AT, au: AU, be: BE, bh: BH, ca: CA, ch: CH, de: DE, dk: DK, fi: FI, fr: FR, gb: GB, ie: IE,
  is: IS, it: IT, li: LI, lk: LK, lu: LU, mc: MC, mt: MT, nl: NL, no: NO, nz: NZ, om: OM, qa: QA, se: SE,
  us: US,
};

/** Decorative — the country's name is always shown next to it. Extra props (e.g. preserveAspectRatio) go to the <svg>. */
export function CountryFlagIcon({ code, ...props }: { code: string } & ComponentProps<typeof FR>) {
  const Flag = FLAGS[code];
  return Flag ? <Flag aria-hidden {...props} /> : null;
}
