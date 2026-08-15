"use client";

import Link from "next/link";
import { Link2, Home, Zap, FileText } from "lucide-react";
import HeaderAuth from "./header-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@frontend/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home, sectionId: null },
  { href: "/#features", label: "Features", icon: Zap, sectionId: "features" },
  { href: "/terms-of-use", label: "Terms of Use", icon: FileText, sectionId: null },
];

function useActiveNav(pathname: string) {
  // null → "home" is active; "features" → Features is active
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const featuresEl = document.getElementById("features");
    if (!featuresEl) {
      setActiveSection("home");
      return;
    }

    function onScroll() {
      const rect = featuresEl!.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom > 80) {
        setActiveSection("features");
      } else {
        setActiveSection("home");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return activeSection;
}

export default function Navbar() {
  const pathname = usePathname();
  const activeSection = useActiveNav(pathname);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.href === "/") return activeSection === "home";
    if (link.sectionId) return activeSection === link.sectionId;
    return activeSection === link.href;
  };

  return (
    <header className="navbar-glass sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-6 gap-4">

        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex shrink-0 items-center gap-2.5 group transition-all duration-200"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 shadow-md shadow-violet-600/30 group-hover:shadow-violet-600/50 group-hover:scale-105 transition-all duration-200">
            <Link2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-[hsl(var(--foreground))]">
            TinyURL
          </span>
        </Link>

        <nav className="flex-1 flex justify-center" aria-label="Main navigation">
          <div className="hidden md:flex items-center gap-1 px-1.5 py-1.5 rounded-2xl nav-pill-bg">
            {navLinks.map((link) => {
              const active = isActive(link);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (link.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault();
                      const id = link.href.split("#")[1];
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", link.href);
                      }
                    }
                  }}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 select-none",
                    active ? "nav-item-active" : "nav-item-inactive"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-colors duration-200",
                      active ? "nav-icon-active" : "nav-icon-inactive"
                    )}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 flex items-center">
          <HeaderAuth />
        </div>

      </div>
    </header>

  );
}
