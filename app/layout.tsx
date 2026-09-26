import type { Metadata } from "next";
import { Noto_Serif, Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const mackinac = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-mackinac",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ViewMarket · Non-Custodial Trading Workflow & Computational Analytics",
  description:
    "SEBI-compliant non-custodial trading software, visual strategy builder, and computational analytics for Indian markets (Zerodha, Upstox, Dhan, Angel One).",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(mackinac.variable, bricolage.variable, "font-sans", geist.variable, "dark")}>
      <body className="antialiased min-h-screen text-zinc-100 bg-[#09090b] selection:bg-zinc-800 selection:text-white">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
