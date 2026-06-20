"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";

interface Suggestion {
  id: number;
  suggestedBy: string;
  name: string;
  note: string;
  timestamp: Date;
}

// Sample data kept for local testing/demos. The real wall starts empty
// until visitors submit — swap SUGGESTIONS to SAMPLE_SUGGESTIONS to preview a full wall.
const SAMPLE_SUGGESTIONS: Suggestion[] = [
  { id: 1, suggestedBy: "Priya", name: "Aanya", note: "Means grace and inexhaustible — perfect for a strong girl", timestamp: new Date("2026-06-16T08:30:00") },
  { id: 2, suggestedBy: "Rahul", name: "Zara", note: "Timeless, elegant, works everywhere in the world", timestamp: new Date("2026-06-16T10:15:00") },
  { id: 3, suggestedBy: "Meera", name: "Avya", note: "Unique yet familiar — she'll stand out", timestamp: new Date("2026-06-17T14:00:00") },
  { id: 4, suggestedBy: "Arjun", name: "Nia", note: "Short, bright, carries well in any language", timestamp: new Date("2026-06-18T09:00:00") },
  { id: 5, suggestedBy: "Kavya", name: "Tara", note: "Star in Sanskrit. She already is one.", timestamp: new Date("2026-06-19T16:45:00") },
];

const SUGGESTIONS: Suggestion[] = [];
void SAMPLE_SUGGESTIONS;

const REVEAL = new Date("2026-06-22T16:00:00Z"); // 5 PM BST = 4 PM UTC

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="glass-card rounded-2xl w-16 h-16 flex items-center justify-center text-2xl font-bold"
        style={{ fontFamily: "var(--font-geist-mono)", color: "#bf00ff", borderColor: "rgba(191,0,255,0.25)", boxShadow: "0 0 20px rgba(191,0,255,0.1)" }}>
        {String(value).padStart(2, "0")}
      </div>
      <span style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

export default function WallPage() {
  const reveal = useCountdown(REVEAL);
  const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <div className="relative min-h-screen" style={{ background: "#020010" }}>
      <Background tint="cyan" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavBar />

        {/* Header */}
        <header className="text-center pt-4 sm:pt-8 pb-3 sm:pb-6 px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-4 px-4 py-1.5 rounded-full glass-card text-[11px] sm:text-xs tracking-widest uppercase"
              style={{ color: "rgba(191,0,255,0.8)", borderColor: "rgba(191,0,255,0.2)" }}>
              <span className="pulse-neon">◈</span>
              {SUGGESTIONS.length === 0
                ? "A Blank Canvas"
                : `${SUGGESTIONS.length} Name${SUGGESTIONS.length === 1 ? "" : "s"} Suggested`}
              <span className="pulse-neon">◈</span>
            </div>
            <h1 className="font-display aurora-text text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2 sm:mb-4"
              style={{
                backgroundImage: "linear-gradient(120deg, #34f5ff 0%, #c061ff 55%, #ff5e9c 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 34px rgba(192,97,255,0.28))",
              }}>
              The Wall
            </h1>
            <p className="text-base md:text-lg" style={{ color: "rgba(226,232,240,0.4)" }}>
              {SUGGESTIONS.length === 0
                ? "No names yet — her story is waiting for its first word."
                : "Every name the universe has sent so far."}
            </p>
          </motion.div>
        </header>

        <main className="w-full max-w-5xl mx-auto px-4 pb-8 sm:pb-16 grid md:grid-cols-3 gap-4 sm:gap-6 items-start">

          {/* Suggestions — takes 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {SUGGESTIONS.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl px-8 py-6 text-center flex flex-col items-center gap-3"
                style={{ borderColor: "rgba(0,245,255,0.12)" }}
              >
                <div className="text-4xl float-soft">🌠</div>
                <div>
                  <p className="font-display text-2xl font-semibold mb-2" style={{ color: "rgba(232,236,244,0.9)" }}>
                    Be the first.
                  </p>
                  <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "rgba(226,232,240,0.45)" }}>
                    No names yet. The first one here could be hers.
                  </p>
                </div>
                <Link href="/suggest"
                  className="neon-btn rounded-xl px-7 py-3.5 text-sm">
                  ⟡ Suggest the first name
                </Link>
              </motion.div>
            )}

            {SUGGESTIONS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card rounded-2xl p-6"
                style={{ borderColor: "rgba(0,245,255,0.1)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold" style={{
                      fontFamily: "var(--font-geist-mono)",
                      background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>{s.name}</span>
                    <span className="text-sm" style={{ color: "rgba(0,245,255,0.5)", fontFamily: "var(--font-geist-mono)" }}>
                      by {s.suggestedBy}
                    </span>
                  </div>
                  <span className="text-xs shrink-0 mt-1" style={{ color: "rgba(226,232,240,0.2)", fontFamily: "var(--font-geist-mono)" }}>
                    {formatDate(s.timestamp)}
                  </span>
                </div>
                {s.note && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>
                    "{s.note}"
                  </p>
                )}
              </motion.div>
            ))}

            {/* Suggest yours CTA */}
            {SUGGESTIONS.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: SUGGESTIONS.length * 0.07 + 0.1 }}>
                <Link href="/suggest"
                  className="flex items-center justify-center gap-2 neon-btn rounded-2xl px-6 py-4 text-sm w-full">
                  ⟡ Add your suggestion
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right rail — reveal countdown + status */}
          <div className="flex flex-col gap-5">

            {/* Reveal countdown */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5 text-center"
              style={{ borderColor: "rgba(191,0,255,0.25)", boxShadow: "0 0 40px rgba(191,0,255,0.08)" }}>
              <div className="text-3xl mb-2">🔮</div>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(191,0,255,0.7)", fontFamily: "var(--font-geist-mono)" }}>
                Name Revealed In
              </p>
              <p className="text-sm mb-4" style={{ color: "rgba(226,232,240,0.4)" }}>Sunday 22 June · 5:00 PM</p>
              <div className="flex justify-center gap-3">
                <TimeUnit value={reveal.days} label="Days" />
                <TimeUnit value={reveal.hours} label="Hrs" />
                <TimeUnit value={reveal.minutes} label="Min" />
                <TimeUnit value={reveal.seconds} label="Sec" />
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
              style={{ borderColor: "rgba(0,245,255,0.1)" }}>
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)" }}>Timeline</p>
              <div className="flex flex-col gap-0">
                {[
                  { dot: "#00f5ff", label: "Suggestions open", sub: "Now", done: true },
                  { dot: "#00f5ff", label: "Suggestions close", sub: "Sat 21 June · 5 PM BST", done: false },
                  { dot: "#bf00ff", label: "Voting opens", sub: "Sun 22 June · Morning", done: false },
                  { dot: "#ff9ec8", label: "Name revealed", sub: "Sun 22 June · 5 PM", done: false },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                        style={{ background: item.dot, boxShadow: item.done ? `0 0 8px ${item.dot}` : "none", opacity: item.done ? 1 : 0.4 }} />
                      {i < arr.length - 1 && <div className="w-px flex-1 my-1" style={{ background: "rgba(226,232,240,0.08)" }} />}
                    </div>
                    <div className="pb-5">
                      <p className="text-sm font-medium" style={{ color: item.done ? "rgba(226,232,240,0.8)" : "rgba(226,232,240,0.45)" }}>{item.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(226,232,240,0.25)", fontFamily: "var(--font-geist-mono)" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Predict CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Link href="/predict"
                className="flex items-center justify-center gap-2 neon-btn rounded-2xl px-6 py-4 text-sm w-full"
                style={{ borderColor: "rgba(255,0,110,0.4)", color: "#ff9ec8" }}>
                🔮 Leave a prediction
              </Link>
            </motion.div>
          </div>
        </main>

        <footer className="text-center pb-6" style={{ color: "rgba(226,232,240,0.12)", fontSize: "0.65rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em" }}>
          GENERATION BETA · SHARMA &amp; SETHI · 2026
        </footer>
      </div>
    </div>
  );
}
