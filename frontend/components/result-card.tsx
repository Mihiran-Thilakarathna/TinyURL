"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  Check,
  ExternalLink,
  Lock,
  Clock,
  RotateCcw,
  Link2,
  QrCode,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@frontend/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@frontend/components/ui/card";
import { Badge } from "@frontend/components/ui/badge";
import { Separator } from "@frontend/components/ui/separator";
import { format } from "date-fns";
import type { ShortenResult } from "@frontend/components/url-shortener-form";
import QrCodeCard from "@frontend/components/qr-code-card";

interface ResultCardProps {
  result: ShortenResult;
  onReset: () => void;
}


export default function ResultCard({ result, onReset }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = result.shortUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Card className="glass-card border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
          <CardTitle className="text-base font-semibold text-emerald-400">
            Link Created Successfully
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
          <Link2 className="h-4 w-4 text-violet-400 shrink-0" />
          <span
            className="flex-1 text-violet-300 font-mono text-sm truncate select-all"
            title={result.shortUrl}
          >
            {result.shortUrl}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              id="copy-short-url-button"
              onClick={handleCopy}
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              id="open-short-url-button"
              asChild
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title="Open link"
            >
              <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>


        {(result.passwordProtected || result.expiresAt) && (
          <div className="flex flex-wrap gap-2">
            {result.passwordProtected && (
              <Badge
                variant="outline"
                className="gap-1.5 border-amber-500/40 text-amber-400 bg-amber-500/10 text-xs"
              >
                <Lock className="h-3 w-3" />
                Password protected
              </Badge>
            )}
            {result.expiresAt && (
              <Badge
                variant="outline"
                className="gap-1.5 border-sky-500/40 text-sky-400 bg-sky-500/10 text-xs"
              >
                <Clock className="h-3 w-3" />
                Expires {format(new Date(result.expiresAt), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
        )}


        <div className="text-xs text-slate-500 truncate" title={result.originalUrl}>
          <span className="text-slate-600">Original: </span>
          {result.originalUrl}
        </div>

        <Separator className="bg-white/8" />


        <button
          type="button"
          id="toggle-qr-button"
          onClick={() => setShowQr((v) => !v)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors w-full"
        >
          <QrCode className="h-4 w-4" />
          <span className="flex-1 text-left">QR Code</span>
          {showQr ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showQr && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            <QrCodeCard url={result.shortUrl} shortCode={result.shortCode} />
          </div>
        )}

        <Separator className="bg-white/8" />


        <Button
          variant="ghost"
          id="shorten-another-button"
          onClick={onReset}
          className="w-full gap-2 text-slate-400 hover:text-white hover:bg-white/8 transition-all text-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Shorten another link
        </Button>
      </CardContent>
    </Card>
  );
}
