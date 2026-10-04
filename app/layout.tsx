import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { getRequestLanguage } from "@/lib/i18n/server";
import { SITE_META } from "@/lib/countries/meta-data";
import { CURRENT_COUNTRY, IS_GLOBAL_SITE } from "@/lib/countries/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Lets country-aware pages use relative paths in `alternates.languages`
// (see lib/countries/seo.ts) instead of hardcoding the full domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_META.title,
  description: SITE_META.description,
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    siteName: SITE_META.title,
    type: "website",
    images: [{ url: "/images/hero/hero-1.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: ["/images/hero/hero-1.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = (await getRequestLanguage()) ?? "en";
  // Region-qualified on a country site ("en-FR"), matching the hreflang this
  // page lists for itself (see lib/countries/seo.ts) — a bare "en" there
  // reads as a mismatch with the self-referencing alternate. The global
  // gateway has no country, so it stays a bare language.
  const htmlLang = IS_GLOBAL_SITE ? language : `${language}-${CURRENT_COUNTRY.toUpperCase()}`;

  return (
    <html
      lang={htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
