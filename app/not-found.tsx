import Link from "next/link";
import { Link2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-6 space-y-6 max-w-lg">
        {/* 404 Number */}
        <div className="space-y-1">
          <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 leading-none select-none">
            404
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            Link not found
          </p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">This link doesn&apos;t exist</h1>
          <p className="text-slate-400 leading-relaxed">
            The short URL you followed doesn&apos;t match any link in our system.
            It may have been mistyped or never created.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.99]"
          >
            <Link2 className="h-4 w-4" />
            Shorten a new link
          </Link>
        </div>
      </div>
    </main>
  );
}
