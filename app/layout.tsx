import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { getRequestLanguage } from "@/lib/i18n/server";
import { GLOBAL_META } from "@/lib/countries/meta-data";
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
  title: GLOBAL_META.title,
  description: GLOBAL_META.description,
  openGraph: {
    title: GLOBAL_META.title,
    description: GLOBAL_META.description,
    siteName: GLOBAL_META.title,
    type: "website",
    images: [{ url: "/images/hero/hero-1.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: GLOBAL_META.title,
    description: GLOBAL_META.description,
    images: ["/images/hero/hero-1.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getRequestLanguage();

  return (
    <html
      lang={language ?? "en"}
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
