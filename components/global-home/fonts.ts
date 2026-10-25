import { Great_Vibes, Playfair_Display } from "next/font/google";

// Only the global gateway's home page uses these — applied on its <main>, so
// the `font-display` / `font-script` utilities (globals.css) resolve there.
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});
