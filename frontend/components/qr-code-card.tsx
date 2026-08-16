"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@frontend/components/ui/button";
import { toast } from "sonner";

interface QrCodeCardProps {
  url: string;
  shortCode: string;
}


export default function QrCodeCard({ url, shortCode }: QrCodeCardProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    try {
      const canvas = qrRef.current?.querySelector("canvas");
      if (!canvas) {
        toast.error("Could not find QR code canvas. Please try again.");
        return;
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `tinyurl-qr-${shortCode}.png`;
      link.click();

      toast.success("QR code downloaded!");
    } catch {
      toast.error("Failed to download QR code.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">

      <div
        ref={qrRef}
        className="p-3 rounded-xl bg-white shadow-lg"
        aria-label="QR code for shortened URL"
      >
        <QRCodeCanvas
          value={url}
          size={160}
          level="H"
          includeMargin={false}
          fgColor="#1e1b4b"
          bgColor="#ffffff"
        />
      </div>


      <Button
        variant="outline"
        size="sm"
        id="download-qr-button"
        onClick={handleDownload}
        className="w-full gap-2 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all text-xs"
      >
        <Download className="h-3.5 w-3.5" />
        Download QR Code
      </Button>
    </div>
  );
}
