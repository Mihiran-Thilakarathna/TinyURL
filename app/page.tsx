import UrlShortenerForm from "@frontend/components/url-shortener-form";
import ScrollTopCta from "@frontend/components/scroll-top-cta";
import {
  Link2, Zap, Lock, QrCode, BarChart2, Clock,
  ArrowRight, Sparkles, Shield, Globe2, Layers,
} from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Every link resolves in single-digit milliseconds via Redis edge caching.",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    border: "hover:border-amber-500/30",
  },
  {
    icon: Lock,
    title: "Password Protection",
    description: "Gate any link behind a password. Only the people you trust get through.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/30",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description: "Instantly generate a high-resolution QR code for any shortened link.",
    color: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-400",
    border: "hover:border-sky-500/30",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description: "See exactly how many times your link has been clicked in real time.",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    border: "hover:border-violet-500/30",
  },
  {
    icon: Clock,
    title: "Expiration Dates",
    description: "Set any link to expire automatically — perfect for time-sensitive campaigns.",
    color: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-400",
    border: "hover:border-rose-500/30",
  },
  {
    icon: Link2,
    title: "Custom Aliases",
    description: "Pick your own short code instead of a random string. Make it memorable.",
    color: "from-indigo-500/20 to-violet-500/10",
    iconColor: "text-indigo-400",
    border: "hover:border-indigo-500/30",
  },
];

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="relative overflow-x-hidden">

      <div className="fixed inset-0 -z-10 bg-[hsl(var(--background))]" />
      <div className="blob-1 fixed -top-56 -left-56 -z-10 h-[700px] w-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(263 70% 58% / 0.22) 0%, transparent 68%)" }} />
      <div className="blob-2 fixed -top-20 right-0 -z-10 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(239 84% 67% / 0.15) 0%, transparent 68%)" }} />
      <div className="blob-3 fixed top-[60vh] -left-24 -z-10 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(263 70% 58% / 0.12) 0%, transparent 68%)" }} />
      <div className="blob-4 fixed bottom-0 -right-40 -z-10 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(270 60% 65% / 0.14) 0%, transparent 68%)" }} />
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

      <section
        className="relative flex flex-col items-center justify-center text-center px-4 pt-12 pb-12"
        style={{ minHeight: "calc(100dvh - 4rem)" }}
      >
        {!session && (
          <div className="fade-up-1 hero-badge animate-pulse inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-5 text-xs font-semibold tracking-wide"
            style={{
              borderColor: "hsl(263 70% 58% / 0.35)",
              background: "hsl(263 70% 58% / 0.08)",
              color: "hsl(263 70% 70%)",
            }}>
            <Sparkles className="h-3 w-3" />
            Free · No signup required for basic links
            <ArrowRight className="h-3 w-3" />
          </div>
        )}

        <h1 className="fade-up-2 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.08] mb-4">
          <span className="hero-gradient-text">The smartest way</span>
          <br />
          <span className="shimmer-text">to shorten links.</span>
        </h1>

        <p className="fade-up-3 max-w-lg text-sm sm:text-base leading-relaxed mb-8"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          Custom aliases, password protection, QR codes, click analytics, and
          auto-expiry — all in one elegant tool.
        </p>

        <div className="fade-up-5 w-full max-w-2xl">
          <UrlShortenerForm />
        </div>

      </section>

      <section
        id="features"
        aria-label="Features"
        className="relative px-4 pt-12 pb-16 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "hsl(263 70% 68%)",
                borderColor: "hsl(263 70% 58% / 0.3)",
                background: "hsl(263 70% 58% / 0.07)",
              }}>
              <Sparkles className="h-3 w-3" />
              Features
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
              <span className="hero-gradient-text">Everything your links need.</span>
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              A complete toolkit to create, secure, and track your URLs — without the bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`feature-card glass-card rounded-xl p-4 flex items-start gap-4 border ${feature.border} group cursor-default`}
              >
                <div className={`shrink-0 inline-flex p-2.5 rounded-lg bg-gradient-to-br ${feature.color} border border-white/10 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="feature-title text-sm font-bold mb-1 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="feature-desc text-[13px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              Ready to shorten your first link?
            </p>
          <ScrollTopCta />
          </div>

        </div>
      </section>

    </main>
  );
}
