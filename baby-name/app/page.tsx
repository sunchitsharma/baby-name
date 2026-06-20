"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Background from "@/components/Background";

export default function AnnouncementPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#020010" }}>
      <Background tint="pink" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-20">

        {/* Family badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 sm:mb-10 px-5 py-2 rounded-full glass-card text-[11px] sm:text-xs tracking-widest uppercase"
          style={{ color: "rgba(255, 150, 200, 0.8)", borderColor: "rgba(255,0,110,0.2)" }}
        >
          <span className="pulse-neon">✦</span>
          The Sharma &amp; Sethi Family
          <span className="pulse-neon">✦</span>
        </motion.div>

        {/* Main announcement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-3xl"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="flex justify-center mb-5 sm:mb-8"
          >
            <div className="relative float-soft">
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full pulse-neon"
                style={{
                  background: "radial-gradient(circle, rgba(255,94,156,0.3) 0%, transparent 70%)",
                  transform: "scale(1.25)",
                  filter: "blur(22px)",
                }}
              />
              {/* Rotating conic halo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full"
                style={{
                  inset: -6,
                  background:
                    "conic-gradient(from 0deg, #34f5ff, #c061ff, #ff5e9c, #ffd1e8, #34f5ff)",
                  filter: "blur(2px)",
                  opacity: 0.9,
                }}
              />
              {/* Photo */}
              <div
                className="relative rounded-full p-[3px]"
                style={{ background: "rgba(4,2,15,0.6)" }}
              >
                <div
                  className="rounded-full overflow-hidden w-[144px] h-[144px] sm:w-[220px] sm:h-[220px]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                >
                  <Image
                    src="/baby.png"
                    alt="Our baby girl, born 15 June 2026"
                    width={220}
                    height={220}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <h1
            className="font-display aurora-text text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-3 sm:mb-5"
            style={{
              backgroundImage: "linear-gradient(120deg, #ffd1e8 0%, #ff5e9c 35%, #c061ff 70%, #34f5ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 48px rgba(255,94,156,0.28))",
            }}
          >
            She&apos;s here.
          </h1>

          <p className="font-display text-xl sm:text-2xl md:text-3xl font-light mb-2" style={{ color: "rgba(232,236,244,0.88)" }}>
            A baby girl joined our universe
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10" style={{ color: "rgba(226,232,240,0.4)" }}>
            15 June 2026 &nbsp;·&nbsp; 3:27 PM BST
          </p>

          {/* Gen cards */}
          <div className="flex flex-row items-stretch justify-center gap-2 sm:gap-4 mb-8 sm:mb-14">
            {/* Vamika - Gen Alpha */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl px-3 py-4 sm:px-6 sm:py-5 text-center flex-1 min-w-0 max-w-[200px]"
              style={{ borderColor: "rgba(0,245,255,0.15)" }}
            >
              <div className="text-2xl mb-1">👧</div>
              <div className="font-bold text-lg" style={{ color: "#00f5ff", fontFamily: "var(--font-geist-mono)" }}>Vamika</div>
              <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: "rgba(0,245,255,0.5)" }}>Gen Alpha · 2023</div>
              <div className="text-xs mt-2" style={{ color: "rgba(226,232,240,0.35)" }}>Big sister · 1st Gen Alpha</div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-lg sm:text-2xl self-center shrink-0"
              style={{ color: "rgba(255,0,110,0.5)" }}
            >
              +
            </motion.div>

            {/* New baby - Gen Beta */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl px-3 py-4 sm:px-6 sm:py-5 text-center relative overflow-hidden flex-1 min-w-0 max-w-[200px]"
              style={{ borderColor: "rgba(255,0,110,0.3)", boxShadow: "0 0 30px rgba(255,0,110,0.1)" }}
            >
              {/* Glow pulse behind */}
              <div className="absolute inset-0 rounded-2xl pulse-neon" style={{ background: "rgba(255,0,110,0.04)" }} />
              <div className="relative">
                <div className="text-2xl mb-1">👶</div>
                <div className="font-bold text-lg" style={{
                  fontFamily: "var(--font-geist-mono)",
                  background: "linear-gradient(135deg, #ff9ec8, #ff006e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  ???
                </div>
                <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: "rgba(255,0,110,0.6)" }}>Gen Beta · 2026</div>
                <div className="text-xs mt-2" style={{ color: "rgba(226,232,240,0.45)" }}>1st Gen Beta in the family</div>
              </div>
            </motion.div>
          </div>

          {/* Invite copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-card rounded-2xl px-5 py-5 sm:px-8 sm:py-7 mb-6 sm:mb-10 max-w-xl mx-auto"
            style={{ borderColor: "rgba(255,0,110,0.15)" }}
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: "rgba(226,232,240,0.7)" }}>
              She&apos;s arrived, she&apos;s healthy, she&apos;s absolutely perfect —
              and she doesn&apos;t have a name yet.{" "}
              <span style={{ color: "#ff9ec8" }}>We&apos;d love your help.</span>
            </p>
            <p className="hidden sm:block text-xs sm:text-sm mt-2 sm:mt-3" style={{ color: "rgba(226,232,240,0.4)" }}>
              Suggest a name. Leave a prediction. Be part of her story.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link
              href="/suggest"
              className="inline-block neon-btn rounded-xl px-10 py-4 text-base"
              style={{
                borderColor: "rgba(255,0,110,0.5)",
                color: "#ff9ec8",
                boxShadow: "0 0 20px rgba(255,0,110,0.15)",
              }}
            >
              ✦ &nbsp; Help us name her
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 text-center w-full"
          style={{ color: "rgba(226,232,240,0.15)", fontSize: "0.7rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em" }}
        >
          GENERATION BETA · FIRST CONTACT · 15.06.2026
        </motion.footer>
      </div>
    </div>
  );
}
