"use client";

import { useState } from "react";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { Label } from "@frontend/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";

interface PasswordFormProps {
  shortCode: string;
}

export default function PasswordForm({ shortCode }: PasswordFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortCode, password }),
      });

      const data = await res.json();

      if (res.ok && data.originalUrl) {
        window.location.href = data.originalUrl;
      } else {
        setError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="glass-card border-white/10 shadow-2xl">
          <CardHeader className="pb-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30">
                <Lock className="h-7 w-7 text-amber-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Protected Link</CardTitle>
            <CardDescription className="text-slate-400">
              This link requires a password to access.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" id="password-gate-form">
              <div className="space-y-2">
                <Label htmlFor="link-password" className="text-slate-300 text-sm">
                  Password
                </Label>
                <Input
                  id="link-password"
                  type="password"
                  placeholder="Enter the password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50"
                  required
                  autoFocus
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/25">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                id="password-submit-button"
                disabled={loading || !password}
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Access Link
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-slate-600">
                Don&apos;t have the password?{" "}
                <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors">
                  Create your own link
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
