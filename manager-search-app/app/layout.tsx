import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Institutional Investment Manager Intelligence Dashboard",
  description: "Resolve institutional managers, inspect Form ADV and 13F filings, and generate a clean narrative briefing."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="text-foreground antialiased">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(214,153,92,0.14),transparent_55%)]" />
          <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(127,151,170,0.18),transparent_70%)] blur-3xl" />
          {children}
        </div>
      </body>
    </html>
  );
}

