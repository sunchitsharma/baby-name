"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";
import { useVisitorName } from "@/lib/useVisitorName";
import { supabase } from "@/lib/supabase";

const DEADLINE = new Date("2026-06-20T16:00:00Z"); // 5 PM BST = 4 PM UTC
const MAX_SUGGESTIONS = 3;

const BLOCKED_MESSAGES = [
  {
    emoji: "🙏",
    title: "You've been wonderfully generous!",
    body: "Three suggestions is more than enough — we're truly grateful. The baby will only get one name, so we want to give everyone a fair chance. Your picks are safely in!",
  },
  {
    emoji: "✨",
    title: "Three is the magic number.",
    body: "We've noted all your suggestions and they mean the world to us. We just want to make sure everyone gets a turn — so we're keeping it to three per person. Thank you!",
  },
  {
    emoji: "💛",
    title: "Your enthusiasm is adorable.",
    body: "We love that you want to suggest more — but three is our limit so everyone gets a fair go. Your suggestions are in safe hands, we promise!",
  },
];

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
      <div className="glass-card rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold"
        style={{ fontFamily: "var(--font-geist-mono)", color: "#34f5ff", borderColor: "rgba(0,245,255,0.25)", boxShadow: "0 0 20px rgba(0,245,255,0.1)" }}>
        {String(value).padStart(2, "0")}
      </div>
      <span style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

const inputClass = "neon-input rounded-xl px-5 py-3.5 w-full text-sm";
const labelClass = "text-xs tracking-widest uppercase";
const labelStyle = { color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" };

function AstrologyModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: "rgba(2,0,16,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          key="sheet"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="glass-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-y-auto max-h-[92vh]"
          style={{ borderColor: "rgba(191,0,255,0.25)", boxShadow: "0 0 60px rgba(191,0,255,0.12)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full" style={{ background: "rgba(226,232,240,0.15)" }} />
          </div>

          <div className="px-6 pb-8 pt-4 sm:pt-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(191,0,255,0.6)", fontFamily: "var(--font-geist-mono)" }}>
                  Vedic Astrology · वैदिक ज्योतिष
                </div>
                <h2 className="text-2xl font-bold" style={{
                  background: "linear-gradient(120deg, #bf00ff, #ff9ec8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  What the stars say
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}>
                  तारे क्या कहते हैं
                </p>
              </div>
              <button onClick={onClose}
                className="shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ background: "rgba(226,232,240,0.06)", border: "1px solid rgba(226,232,240,0.1)", color: "rgba(226,232,240,0.4)" }}>
                ✕
              </button>
            </div>

            {/* Rashi */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(191,0,255,0.06)", border: "1px solid rgba(191,0,255,0.15)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">♊</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#bf00ff" }}>Mithun Rashi (Gemini)</p>
                  <p className="text-xs" style={{ color: "rgba(191,0,255,0.55)", fontFamily: "var(--font-geist-mono)" }}>मिथुन राशि</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(226,232,240,0.6)" }}>
                Rashi (Moon Sign) represents the zodiac sign occupied by the Moon at birth — used in Vedic astrology for personality, compatibility, and naming traditions.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.35)", fontStyle: "italic" }}>
                राशि जन्म के समय चंद्रमा की स्थिति पर आधारित होती है। वैदिक ज्योतिष में इसका उपयोग व्यक्तित्व, अनुकूलता तथा नामकरण परंपराओं में किया जाता है।
              </p>
            </div>

            {/* Nakshatra */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(52,245,255,0.05)", border: "1px solid rgba(52,245,255,0.12)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✦</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#34f5ff" }}>Ardra Nakshatra</p>
                  <p className="text-xs" style={{ color: "rgba(52,245,255,0.5)", fontFamily: "var(--font-geist-mono)" }}>आर्द्रा नक्षत्र</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(226,232,240,0.6)" }}>
                A Nakshatra is a lunar constellation used in Vedic astrology. The birth Nakshatra determines auspicious naming syllables.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.35)", fontStyle: "italic" }}>
                नक्षत्र वैदिक ज्योतिष में चंद्रमा की स्थिति पर आधारित एक तारामंडल है। जन्म नक्षत्र के आधार पर शुभ नाम-अक्षर निर्धारित किए जाते हैं।
              </p>
            </div>

            {/* Recommended syllables */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(226,232,240,0.5)", fontFamily: "var(--font-geist-mono)" }}>
                Recommended Starting Syllables
              </p>
              <p className="text-xs mb-3" style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)" }}>अनुशंसित नाम प्रारंभ अक्षर</p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>
                Names beginning with these syllables are most closely aligned with her birth Nakshatra and Pada.
              </p>
              <div className="flex flex-wrap gap-2">
                {[["Ku","कु"],["Ka","का"],["Ki","कि"],["Ke","के"],["Ko","को"],["Ha","ह"]].map(([en, hi]) => (
                  <div key={en} className="flex flex-col items-center rounded-xl px-3 py-2 text-center"
                    style={{ background: "rgba(191,0,255,0.1)", border: "1px solid rgba(191,0,255,0.3)" }}>
                    <span className="text-sm font-bold" style={{ color: "#bf00ff" }}>{en}</span>
                    <span className="text-xs mt-0.5" style={{ color: "rgba(191,0,255,0.5)" }}>{hi}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitra Akshara */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "rgba(226,232,240,0.5)", fontFamily: "var(--font-geist-mono)" }}>
                Mitra Akshara — Friendly Syllables
              </p>
              <p className="text-xs mb-3" style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)" }}>मित्र अक्षर</p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>
                Also auspicious — not the primary Nakshatra syllables, but harmonious and favorable.
              </p>
              <div className="flex flex-wrap gap-2">
                {[["I","ई"],["U","ऊ"],["E","ए"],["V","व"]].map(([en, hi]) => (
                  <div key={en} className="flex flex-col items-center rounded-xl px-3 py-2 text-center"
                    style={{ background: "rgba(52,245,255,0.07)", border: "1px solid rgba(52,245,255,0.2)" }}>
                    <span className="text-sm font-bold" style={{ color: "#34f5ff" }}>{en}</span>
                    <span className="text-xs mt-0.5" style={{ color: "rgba(52,245,255,0.45)" }}>{hi}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidance */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(226,232,240,0.03)", border: "1px solid rgba(226,232,240,0.07)" }}>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(226,232,240,0.55)" }}>
                Parents may choose a name from either the recommended Nakshatra syllables or the Mitra Akshara syllables. The former follows the traditional naming system more closely, while the latter provides additional flexibility while remaining astrologically harmonious.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.3)", fontStyle: "italic" }}>
                माता-पिता नाम का चयन मुख्य नक्षत्र-अक्षरों या मित्र अक्षरों में से किसी से भी कर सकते हैं। नक्षत्र-अक्षर पारंपरिक नामकरण पद्धति के अधिक निकट माने जाते हैं, जबकि मित्र अक्षर ज्योतिषीय अनुकूलता बनाए रखते हुए अधिक विकल्प प्रदान करते हैं।
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SuggestPage() {
  const { name: yourName, setName: setYourName } = useVisitorName();
  const [babyName, setBabyName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [lastSubmitted, setLastSubmitted] = useState("");
  const [step, setStep] = useState<"form" | "success" | "blocked">("form");
  const [blockedMsg] = useState(BLOCKED_MESSAGES[Math.floor(Math.random() * BLOCKED_MESSAGES.length)]);
  const [showAstrology, setShowAstrology] = useState(false);
  const countdown = useCountdown(DEADLINE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourName.trim() || !babyName.trim()) return;
    setLoading(true);
    const name = babyName.trim();
    await supabase.from("suggestions").insert({
      suggested_by: yourName.trim(),
      name,
      note: note.trim(),
    });
    setLastSubmitted(name);
    setSubmitted((prev) => [...prev, name]);
    setLoading(false);
    setStep("success");
  };

  const handleSuggestAnother = () => {
    if (submitted.length >= MAX_SUGGESTIONS) {
      setStep("blocked");
    } else {
      setBabyName("");
      setNote("");
      setStep("form");
    }
  };

  const remaining = MAX_SUGGESTIONS - submitted.length;

  return (
    <div className="relative min-h-screen" style={{ background: "#020010" }}>
      <Background tint="cyan" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavBar />

        <header className="text-center pt-6 sm:pt-12 pb-5 sm:pb-10 px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-5 px-4 py-1.5 rounded-full glass-card text-[11px] sm:text-xs tracking-widest uppercase"
              style={{ color: "rgba(0,245,255,0.7)" }}>
              <span className="pulse-neon">◈</span>
              Step 1 of 2 · Suggest a Name
              <span className="pulse-neon">◈</span>
            </div>
            <h1 className="font-display aurora-text text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{
                backgroundImage: "linear-gradient(120deg, #34f5ff 0%, #c061ff 60%, #ff5e9c 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 34px rgba(52,245,255,0.22))",
              }}>
              What&apos;s her name?
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.45)" }}>
              The first Gen Beta in the Sharma &amp; Sethi family needs a name.<br />You could be the one who suggests it.
            </p>
          </motion.div>
        </header>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-12 px-4">
          <p className="text-[11px] sm:text-xs tracking-widest uppercase text-center" style={{ color: "rgba(226,232,240,0.3)", fontFamily: "var(--font-geist-mono)" }}>
            Suggestions close · Saturday 20 June · 5:00 PM BST
          </p>
          <div className="flex gap-2 sm:gap-4">
            <TimeUnit value={countdown.days} label="Days" />
            <TimeUnit value={countdown.hours} label="Hours" />
            <TimeUnit value={countdown.minutes} label="Mins" />
            <TimeUnit value={countdown.seconds} label="Secs" />
          </div>
        </motion.div>

        {/* Astrology CTA */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="flex justify-center mb-5 sm:mb-8 px-4">
          <button
            onClick={() => setShowAstrology(true)}
            className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-all hover:opacity-80 active:scale-95 w-full max-w-lg"
            style={{ borderColor: "rgba(191,0,255,0.3)", boxShadow: "0 0 24px rgba(191,0,255,0.08)" }}
          >
            <span className="text-2xl shrink-0">🔯</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "rgba(226,232,240,0.9)" }}>
                See astrological guidance for her name
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(191,0,255,0.6)", fontFamily: "var(--font-geist-mono)" }}>
                Nakshatra · Rashi · शुभ अक्षर — tap to open
              </p>
            </div>
            <span className="text-lg shrink-0" style={{ color: "rgba(191,0,255,0.5)" }}>›</span>
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="w-full max-w-lg mx-auto px-4 pb-12 sm:pb-20">
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10" style={{ borderColor: "rgba(0,245,255,0.15)" }}>

            <AnimatePresence mode="wait">

              {/* ── FORM ── */}
              {step === "form" && (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 sm:gap-5">
                  {submitted.length > 0 && (
                    <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                      style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", color: "rgba(0,245,255,0.6)", fontFamily: "var(--font-geist-mono)" }}>
                      <span>◈</span>
                      <span>{submitted.length}/{MAX_SUGGESTIONS} suggestions used · {remaining} left</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} style={labelStyle}>Your Name</label>
                    <input className={inputClass} placeholder="Who are you?" value={yourName} onChange={(e) => setYourName(e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} style={labelStyle}>Baby Name Suggestion</label>
                    <input className={inputClass} placeholder="What should we call her?" value={babyName} onChange={(e) => setBabyName(e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass} style={labelStyle}>
                      Why this name? <span style={{ opacity: 0.4 }}>(optional)</span>
                    </label>
                    <textarea className={inputClass + " resize-none"} placeholder="Tell the universe why..." rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading || !yourName.trim() || !babyName.trim()} className="neon-btn rounded-xl px-6 py-4 text-sm mt-1">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">◈</motion.span>
                        Transmitting...
                      </span>
                    ) : "⟡ Submit to the Stars"}
                  </button>
                </motion.form>
              )}

              {/* ── SUCCESS ── */}
              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8 text-center gap-5">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    className="text-5xl">✦</motion.div>
                  <div>
                    <p className="text-2xl font-bold neon-text mb-2">Logged in the cosmos</p>
                    <p className="text-sm mb-3" style={{ color: "rgba(226,232,240,0.45)" }}>
                      <span style={{ color: "#bf00ff" }}>"{lastSubmitted}"</span> has been added to the shortlist
                    </p>
                    {/* Submitted chips */}
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {submitted.map((n) => (
                        <span key={n} className="px-3 py-1 rounded-full text-xs"
                          style={{ background: "rgba(191,0,255,0.1)", border: "1px solid rgba(191,0,255,0.25)", color: "#bf00ff", fontFamily: "var(--font-geist-mono)" }}>
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                    {remaining > 0 ? (
                      <button onClick={handleSuggestAnother} className="neon-btn rounded-xl px-6 py-3 text-sm flex-1">
                        + Another ({remaining} left)
                      </button>
                    ) : (
                      <button onClick={() => setStep("blocked")} className="rounded-xl px-6 py-3 text-sm flex-1"
                        style={{ background: "rgba(226,232,240,0.04)", border: "1px solid rgba(226,232,240,0.08)", color: "rgba(226,232,240,0.3)", cursor: "not-allowed" }}>
                        0 left · you&apos;re done here
                      </button>
                    )}
                    <Link href="/predict"
                      className="neon-btn rounded-xl px-6 py-3 text-sm flex-1 text-center"
                      style={{ borderColor: "rgba(255,0,110,0.5)", color: "#ff9ec8" }}>
                      Next: Predictions →
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* ── BLOCKED ── */}
              {step === "blocked" && (
                <motion.div key="blocked" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8 text-center gap-5">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl"
                  >
                    {blockedMsg.emoji}
                  </motion.div>
                  <div>
                    <p className="text-xl font-bold mb-3" style={{ color: "#ff006e" }}>{blockedMsg.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>{blockedMsg.body}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {submitted.map((n) => (
                      <span key={n} className="px-3 py-1 rounded-full text-xs"
                        style={{ background: "rgba(191,0,255,0.1)", border: "1px solid rgba(191,0,255,0.2)", color: "#bf00ff", fontFamily: "var(--font-geist-mono)" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "rgba(226,232,240,0.25)", fontFamily: "var(--font-geist-mono)" }}>
                    Your 3 suggestions are in. That&apos;s your lot.
                  </p>
                  <Link href="/predict"
                    className="neon-btn rounded-xl px-8 py-3.5 text-sm w-full text-center mt-2"
                    style={{ borderColor: "rgba(255,0,110,0.5)", color: "#ff9ec8" }}>
                    Fine. Go leave a prediction instead →
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {step === "form" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1" style={{ background: "rgba(226,232,240,0.06)" }} />
              <Link href="/predict" className="text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ color: "rgba(226,232,240,0.25)", fontFamily: "var(--font-geist-mono)" }}>
                Skip to Predictions →
              </Link>
              <div className="h-px flex-1" style={{ background: "rgba(226,232,240,0.06)" }} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {showAstrology && <AstrologyModal onClose={() => setShowAstrology(false)} />}
    </div>
  );
}
