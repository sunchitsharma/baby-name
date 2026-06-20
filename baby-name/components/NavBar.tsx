"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { href: "/suggest", label: "Suggest" },
  { href: "/predict", label: "Predict" },
  { href: "/wall", label: "Wall" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="relative flex items-center justify-center px-3 sm:px-6 pt-5 pb-2">
      {/* Home — arrow only on mobile, full label on larger screens */}
      <Link
        href="/"
        aria-label="Home"
        className="absolute left-3 sm:left-6 flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
        style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}
      >
        <span className="text-base leading-none">←</span>
        <span className="hidden sm:inline">Home</span>
      </Link>

      {/* Step pills — centered, the priority on every screen */}
      <div
        className="flex items-center gap-0.5 sm:gap-1 glass-card rounded-full px-1.5 sm:px-2 py-1.5"
        style={{ borderColor: "rgba(0,245,255,0.1)" }}
      >
        {STEPS.map((step, i) => {
          const active = pathname === step.href;
          return (
            <span key={step.href} className="flex items-center gap-0.5 sm:gap-1">
              <Link
                href={step.href}
                className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs tracking-wide sm:tracking-widest uppercase transition-all"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  background: active ? "rgba(0,245,255,0.12)" : "transparent",
                  color: active ? "#34f5ff" : "rgba(226,232,240,0.35)",
                  boxShadow: active ? "0 0 10px rgba(0,245,255,0.15)" : "none",
                }}
              >
                {step.label}
              </Link>
              {i < STEPS.length - 1 && (
                <span style={{ color: "rgba(226,232,240,0.15)", fontSize: "0.6rem" }}>›</span>
              )}
            </span>
          );
        })}
      </div>

      {/* Gen Beta tag — hidden on mobile to avoid crowding */}
      <div
        className="absolute right-6 hidden sm:block text-xs tracking-widest uppercase"
        style={{ color: "rgba(255,150,200,0.4)", fontFamily: "var(--font-geist-mono)" }}
      >
        Gen Beta
      </div>
    </nav>
  );
}
