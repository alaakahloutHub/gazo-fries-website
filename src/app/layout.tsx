import type { Metadata } from "next";
import { Baloo_Bhaijaan_2, Caveat } from "next/font/google";
import "./globals.css";

const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-baloo",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "GAZO FRIES | جازو فرايز",
  description: "أطيب برجر وقرمشة لا تُقاوم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${baloo.variable} ${caveat.variable}`}>
      <body className="font-sans bg-[#0A0A0A] text-white antialiased selection:bg-[#FF6D00] selection:text-white">
        {children}
      </body>
    </html>
  );
}