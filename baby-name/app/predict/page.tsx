"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";
import { useVisitorName } from "@/lib/useVisitorName";
import { supabase } from "@/lib/supabase";

const QUESTIONS = [
  { emoji: "💼", q: "What will she be when she grows up?" },
  { emoji: "🗣️", q: "What will her first word be?" },
  { emoji: "👀", q: "Who in the family does she look like?" },
  { emoji: "⚡", q: "What's her superpower going to be?" },
  { emoji: "🎭", q: "What's going to be her most dramatic trait?" },
  { emoji: "🏆", q: "What will she be better at than Sunchit by age 10?" },
];

export default function PredictPage() {
  const { name: from, setName: setFrom, clearName, ready } = useVisitorName();
  const [editingName, setEditingName] = useState(false);
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitted, setSubmitted] = useState<{ q: string; a: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !answer.trim()) return;
    setLoading(true);
    await supabase.from("predictions").insert({
      predicted_by: from.trim(),
      question: QUESTIONS[selected].q,
      answer: answer.trim(),
    });
    setSubmitted({ q: QUESTIONS[selected].q, a: answer.trim() });
    setLoading(false);
    setStep("success");
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#020010" }}>
      <Background tint="pink" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavBar />

        {/* Header */}
        <header className="text-center pt-6 sm:pt-12 pb-5 sm:pb-10 px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-5 px-4 py-1.5 rounded-full glass-card text-[11px] sm:text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,150,200,0.8)", borderColor: "rgba(255,0,110,0.2)" }}>
              <span className="pulse-neon">◈</span>
              Step 2 of 2 · Reveal Predictions
              <span className="pulse-neon">◈</span>
            </div>
            <h1 className="font-display aurora-text text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{
                backgroundImage: "linear-gradient(120deg, #ffd1e8 0%, #ff5e9c 45%, #c061ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 34px rgba(255,94,156,0.28))",
              }}>
              Make a prediction.
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-md mx-auto" style={{ color: "rgba(226,232,240,0.45)" }}>
              These get read out loud at the name reveal on{" "}
              <span style={{ color: "#ff9ec8" }}>Sunday at 5 PM</span>.<br />
              Be bold. Be funny. Be honest.
            </p>
          </motion.div>
        </header>

        <div className="w-full max-w-2xl mx-auto px-4 pb-12 sm:pb-20">
          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="glass-card rounded-3xl p-10 text-center flex flex-col items-center gap-6"
                style={{ borderColor: "rgba(255,0,110,0.2)" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180 }}
                  className="text-6xl">🔮</motion.div>
                <div>
                  <p className="text-2xl font-bold mb-2" style={{ color: "#ff9ec8" }}>Sealed for Sunday</p>
                  <p className="text-sm mb-4" style={{ color: "rgba(226,232,240,0.4)" }}>
                    Your prediction will be read aloud at 5 PM
                  </p>
                  {submitted && (
                    <div className="glass-card rounded-2xl p-5 text-left mt-4" style={{ borderColor: "rgba(255,0,110,0.15)" }}>
                      <p className="text-xs mb-2" style={{ color: "rgba(255,150,200,0.5)", fontFamily: "var(--font-geist-mono)" }}>{submitted.q}</p>
                      <p className="text-base font-medium" style={{ color: "rgba(226,232,240,0.8)" }}>"{submitted.a}"</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button onClick={() => { setStep("form"); setAnswer(""); setSubmitted(null); setSelected(0); }}
                    className="neon-btn rounded-xl px-6 py-3 text-sm flex-1"
                    style={{ borderColor: "rgba(255,0,110,0.4)", color: "#ff9ec8" }}>
                    + Add another
                  </button>
                  <Link href="/wall"
                    className="neon-btn rounded-xl px-6 py-3 text-sm flex-1 text-center"
                    style={{ borderColor: "rgba(0,245,255,0.4)", color: "#00f5ff" }}>
                    See the Wall →
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-4 sm:gap-6">

                {/* Name — remembered from your suggestion, so we don't ask twice */}
                <div className="glass-card rounded-3xl p-5 sm:p-8" style={{ borderColor: "rgba(255,0,110,0.15)" }}>
                  {ready && from && !editingName ? (
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs tracking-widest uppercase mb-1.5" style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}>Predicting as</p>
                        <p className="text-lg font-semibold" style={{ color: "#ff9ec8" }}>{from}</p>
                      </div>
                      <button type="button" onClick={() => { clearName(); setEditingName(true); }}
                        className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                        style={{ color: "rgba(226,232,240,0.4)", fontFamily: "var(--font-geist-mono)", border: "1px solid rgba(226,232,240,0.12)" }}>
                        Not you?
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}>Your Name</label>
                      <input className="neon-input rounded-xl px-5 py-3.5 w-full text-sm"
                        style={{ borderColor: "rgba(255,0,110,0.2)" }}
                        placeholder="Who's making this prediction?"
                        value={from} onChange={(e) => setFrom(e.target.value)}
                        onBlur={() => { if (from.trim()) setEditingName(false); }}
                        autoFocus={editingName} required />
                    </>
                  )}
                </div>

                {/* Question picker */}
                <div className="glass-card rounded-3xl p-5 sm:p-8" style={{ borderColor: "rgba(255,0,110,0.15)" }}>
                  <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}>Pick your question</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {QUESTIONS.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelected(i)}
                        className="rounded-xl px-4 py-3 text-left text-sm transition-all"
                        style={{
                          background: selected === i ? "rgba(255,0,110,0.12)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${selected === i ? "rgba(255,0,110,0.4)" : "rgba(255,255,255,0.06)"}`,
                          color: selected === i ? "#ff9ec8" : "rgba(226,232,240,0.5)",
                          boxShadow: selected === i ? "0 0 15px rgba(255,0,110,0.1)" : "none",
                        }}
                      >
                        <span className="mr-2">{item.emoji}</span>{item.q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Answer */}
                <div className="glass-card rounded-3xl p-5 sm:p-8" style={{ borderColor: "rgba(255,0,110,0.15)" }}>
                  <label className="block text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(226,232,240,0.35)", fontFamily: "var(--font-geist-mono)" }}>Your answer</label>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,150,200,0.5)" }}>
                    {QUESTIONS[selected].emoji} {QUESTIONS[selected].q}
                  </p>
                  <textarea
                    className="neon-input rounded-xl px-5 py-3.5 w-full text-sm resize-none"
                    style={{ borderColor: "rgba(255,0,110,0.2)" }}
                    placeholder="Go on, say it..."
                    rows={3}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" disabled={loading || !from.trim() || !answer.trim()}
                  className="neon-btn rounded-xl px-6 py-4 text-sm"
                  style={{ borderColor: "rgba(255,0,110,0.5)", color: "#ff9ec8", boxShadow: "0 0 20px rgba(255,0,110,0.1)" }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">◈</motion.span>
                      Sealing...
                    </span>
                  ) : "🔮 Seal my prediction"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {step === "form" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1" style={{ background: "rgba(226,232,240,0.06)" }} />
              <Link href="/wall" className="text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ color: "rgba(226,232,240,0.25)", fontFamily: "var(--font-geist-mono)" }}>
                See the Wall →
              </Link>
              <div className="h-px flex-1" style={{ background: "rgba(226,232,240,0.06)" }} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
