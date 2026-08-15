"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Link2,
  Scissors,
  Lock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { Label } from "@frontend/components/ui/label";
import { Switch } from "@frontend/components/ui/switch";
import { Badge } from "@frontend/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@frontend/components/ui/card";
import { Separator } from "@frontend/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@frontend/components/ui/popover";
import { Calendar as CalendarPicker } from "@frontend/components/ui/calendar";
import { format } from "date-fns";
import ResultCard from "@frontend/components/result-card";
import { useSession, signIn } from "next-auth/react";


export interface ShortenResult {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  expiresAt: string | null;
  passwordProtected: boolean;
  clicks: number;
  createdAt: string;
}


export default function UrlShortenerForm() {
  // Form state
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Auth State
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  // Advanced options visibility
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useCustomCode, setUseCustomCode] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [useExpiry, setUseExpiry] = useState(false);

  // Submission state
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenResult | null>(null);

  const urlInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      toast.error("Please enter a URL to shorten.");
      urlInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const payload: Record<string, string> = {
        originalUrl: originalUrl.trim(),
      };

      if (useCustomCode && customCode.trim()) {
        payload.customCode = customCode.trim();
      }
      if (usePassword && password.trim()) {
        payload.password = password.trim();
      }
      if (useExpiry && expiresAt) {
        payload.expiresAt = expiresAt.toISOString();
      }

      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setAuthMessage(data.error || "Please log in to continue.");
          setShowAuthModal(true);
          return;
        }
        // Show the server's error message in a toast
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setResult(data as ShortenResult);
      toast.success("Link shortened successfully! 🎉");

      // Reset form after success
      setOriginalUrl("");
      setCustomCode("");
      setPassword("");
      setExpiresAt(undefined);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setOriginalUrl("");
    setCustomCode("");
    setPassword("");
    setExpiresAt(undefined);
    setTimeout(() => urlInputRef.current?.focus(), 100);
  };


  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">

      <Card className="glass-card border-white/10 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Shorten a Link</CardTitle>
              <CardDescription className="text-slate-400 text-sm">
                Paste your long URL and get a clean, shareable link instantly
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5" id="shorten-form">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="original-url" className="text-slate-300 text-sm font-medium">
                Long URL
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  ref={urlInputRef}
                  id="original-url"
                  type="url"
                  placeholder="https://example.com/your-very-long-url..."
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors group"
            >
              <Sparkles className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              Advanced Options
              {showAdvanced ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Advanced Options Panel */}
            {showAdvanced && (
              <div className="space-y-4 p-4 rounded-xl bg-white/3 border border-white/8 animate-in slide-in-from-top-2 duration-200 relative overflow-hidden">
                {!session && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 text-center">
                    <Lock className="h-6 w-6 text-violet-400 mb-2" />
                    <p className="text-sm text-white font-medium mb-3">Login to unlock advanced features</p>
                    <Button type="button" size="sm" onClick={() => signIn("google")} className="bg-white text-slate-900 hover:bg-slate-200">
                      Sign in with Google
                    </Button>
                  </div>
                )}
                {/* Custom Alias */}
                <div className="flex items-start gap-3">
                  <Switch
                    id="use-custom-code"
                    checked={useCustomCode}
                    onCheckedChange={setUseCustomCode}
                    className="mt-0.5 data-[state=checked]:bg-violet-600"
                  />
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor="use-custom-code"
                      className="text-slate-300 text-sm font-medium cursor-pointer"
                    >
                      Custom Alias
                    </Label>
                    {useCustomCode && (
                      <div className="relative animate-in fade-in duration-200">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">
                          /
                        </span>
                        <Input
                          id="custom-code"
                          placeholder="my-custom-link"
                          value={customCode}
                          onChange={(e) => setCustomCode(e.target.value)}
                          className="pl-6 h-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500/50 text-sm"
                          disabled={isLoading}
                          maxLength={32}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-white/8" />

                {/* Password Protection */}
                <div className="flex items-start gap-3">
                  <Switch
                    id="use-password"
                    checked={usePassword}
                    onCheckedChange={setUsePassword}
                    className="mt-0.5 data-[state=checked]:bg-violet-600"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="use-password"
                        className="text-slate-300 text-sm font-medium cursor-pointer"
                      >
                        Password Protection
                      </Label>
                      <Lock className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    {usePassword && (
                      <div className="relative animate-in fade-in duration-200">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter a password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500/50 text-sm"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-white/8" />

                {/* Expiration Date */}
                <div className="flex items-start gap-3">
                  <Switch
                    id="use-expiry"
                    checked={useExpiry}
                    onCheckedChange={setUseExpiry}
                    className="mt-0.5 data-[state=checked]:bg-violet-600"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="use-expiry"
                        className="text-slate-300 text-sm font-medium cursor-pointer"
                      >
                        Expiration Date
                      </Label>
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    {useExpiry && (
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="expiry-date-picker"
                            className="h-10 w-full justify-start bg-white/5 border-white/10 text-left text-sm hover:bg-white/10 hover:text-white animate-in fade-in duration-200"
                          >
                            <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                            {expiresAt ? (
                              <span className="text-white">{format(expiresAt, "PPP")}</span>
                            ) : (
                              <span className="text-slate-500">Pick a date...</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-900 border-white/10" align="start">
                          <CalendarPicker
                            mode="single"
                            selected={expiresAt}
                            onSelect={(date) => {
                              setExpiresAt(date);
                              setCalendarOpen(false);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              id="shorten-button"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-violet-500/25 transition-all duration-200 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Shortening...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Scissors className="h-4 w-4" />
                  Shorten Link
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>


      {result && <ResultCard result={result} onReset={handleReset} />}

      {/* Auth Modal for Rate Limits / Feature Gates */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-sm glass-card border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-2 border border-violet-500/30">
                <Lock className="h-6 w-6 text-violet-400" />
              </div>
              <CardTitle className="text-xl text-white">Action Required</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                {authMessage}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 mt-4">
              <Button
                type="button"
                onClick={() => signIn("google")}
                className="w-full h-11 bg-white text-slate-900 hover:bg-slate-200 font-semibold"
              >
                Sign in with Google
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAuthModal(false)}
                className="w-full h-11 text-slate-400 hover:text-white hover:bg-white/5"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
