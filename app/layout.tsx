import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import AuthProvider from "@frontend/components/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TinyLink — Free URL Shortener",
  description:
    "Shorten long URLs instantly with TinyLink. Add custom aliases, password protection, expiry dates, and QR codes — all for free.",
  keywords: ["url shortener", "link shortener", "custom alias", "qr code", "tinylink"],
  openGraph: {
    title: "TinyLink — Free URL Shortener",
    description: "Shorten links with custom aliases, passwords, expiry dates, and QR codes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-slate-950 text-white min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Sonner toast provider — positioned at bottom-center */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast:
                "bg-slate-900 border border-white/10 text-white shadow-2xl shadow-black/40",
              title: "text-white font-medium",
              description: "text-slate-400",
              error: "border-red-500/30 bg-red-950/60",
              success: "border-emerald-500/30 bg-emerald-950/60",
            },
          }}
          richColors={false}
        />
      </body>
    </html>
  );
}
