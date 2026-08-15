import UrlShortenerForm from "@frontend/components/url-shortener-form";
import HeaderAuth from "@frontend/components/header-auth";
import { Link2, Zap, Lock, QrCode, BarChart2, Clock } from "lucide-react";


const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Links resolve in milliseconds with Redis edge caching.",
  },
  {
    icon: Lock,
    title: "Password Protection",
    description: "Secure your links with a password before sharing.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description: "Instantly generate a scannable QR code for any link.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description: "Track how many times your link has been visited.",
  },
  {
    icon: Clock,
    title: "Expiration Dates",
    description: "Set links to automatically expire after a specific date.",
  },
  {
    icon: Link2,
    title: "Custom Aliases",
    description: "Choose your own memorable short code instead of a random one.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-64 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-0 right-0 p-4 z-50">
        <HeaderAuth />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-16 sm:py-24">

        <header className="text-center mb-12 space-y-4 max-w-2xl">

          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-violet-500/30 blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-2xl shadow-violet-600/30">
                <Link2 className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white tracking-tight">TinyLink</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
            Shorten. Share.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Track.
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
            Transform unwieldy URLs into clean, shareable links — with custom aliases,
            password protection, expiry dates, and QR codes built in.
          </p>
        </header>


        <section aria-label="URL shortener" className="w-full max-w-2xl">
          <UrlShortenerForm />
        </section>


        <section
          aria-label="Features"
          className="mt-20 w-full max-w-4xl"
        >
          <h2 className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">
            Everything you need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-5 rounded-2xl border border-white/8 hover:border-violet-500/30 hover:bg-white/6 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/15 group-hover:bg-violet-500/25 transition-colors shrink-0">
                    <feature.icon className="h-4 w-4 text-violet-400" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        <footer className="mt-20 text-center text-slate-600 text-xs">
          <p>Built with Next.js, Prisma, Supabase &amp; Upstash Redis</p>
        </footer>
      </div>
    </main>
  );
}
