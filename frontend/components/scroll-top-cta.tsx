"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollTopCta() {
  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          document.getElementById("original-url")?.focus();
        }, 500);
      }}
      className="rounded-full px-8 py-6 text-base font-bold bg-white text-violet-950 hover:bg-violet-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
    >
      <ArrowUp className="mr-2 h-5 w-5" />
      Start for free
    </Button>
  );
}

