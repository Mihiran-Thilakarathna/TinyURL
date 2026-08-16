import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import AuthProvider from "@frontend/components/auth-provider";
import Navbar from "@frontend/components/navbar";
import Footer from "@frontend/components/footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TinyURL — Free URL Shortener",
  description:
    "Shorten long URLs instantly with TinyURL. Add custom aliases, password protection, expiry dates, and QR codes — all for free.",
  keywords: ["url shortener", "link shortener", "custom alias", "qr code", "tinyurl"],
  openGraph: {
    title: "TinyURL — Free URL Shortener",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
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
