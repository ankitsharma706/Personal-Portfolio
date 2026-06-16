import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import ConstellationCanvas from "./ConstellationCanvas";

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const marqueeTags = [
    "Smart City APIs", "DeFi Banking", "AML Intelligence", "On-Chain Identity", "Workforce Platform", "Carbon Marketplace", "Urban Flow", "Blockchain", "Distributed Systems", "AI Systems"
  ];

  // Staggered variants for animations
  const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-0"
    >
      {/* Layer 0: Constellation Canvas (Fades in slowly) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.1 }}
        className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 pointer-events-none"
      >
        <ConstellationCanvas />
      </motion.div>

      {/* Layer 1: Subtle Vignette / Ambient grid overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, var(--bg-primary) 100%),
            repeating-linear-gradient(to bottom, transparent, transparent 79px, rgba(255,255,255,0.015) 79px, rgba(255,255,255,0.015) 80px)
          `
        }}
      />

      {/* Corporate Editorial Watermark */}
      <div className="absolute top-24 right-8 font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-[0.2em] pointer-events-none select-none hidden lg:block z-20">
        ANKIT SHARMA · CLASSIFIED SYSTEMS RESEARCH // AUT-2025
      </div>

      {/* Layer 2: Content (Bottom-left aligned) */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-[clamp(24px,5vw,80px)] mt-auto mb-16 z-20 pt-16">
        <div className="max-w-4xl flex flex-col items-start text-left">
          
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="visible"
            className="font-mono text-[11px] font-medium text-[var(--color-accent-primary)] tracking-[0.14em] uppercase mb-6"
          >
            [ TECHNOLOGY RESEARCH & PRODUCT ARCHITECTURE ]
          </motion.div>

          {/* Syne Display Headline */}
          <div className="space-y-2 select-text">
            <motion.span
              variants={fadeUp(0.35)}
              initial="hidden"
              animate="visible"
              className="block font-serif font-extrabold text-[var(--text-primary)] tracking-tight leading-none"
              style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Building
            </motion.span>
            
            <motion.span
              variants={fadeUp(0.45)}
              initial="hidden"
              animate="visible"
              className="block font-serif font-extrabold text-[var(--color-accent-primary)] tracking-tight leading-none select-all"
              style={{ 
                fontSize: "clamp(48px, 7vw, 88px)",
                textShadow: "var(--neon-glow)"
              }}
            >
              Infrastructure
            </motion.span>

            <motion.span
              variants={fadeUp(0.55)}
              initial="hidden"
              animate="visible"
              className="block font-serif font-light text-[var(--text-secondary)] tracking-normal leading-[1.2] mt-4"
              style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
              the World Runs On.
            </motion.span>
          </div>

          {/* Meta Information Row */}
          <motion.div 
            variants={fadeUp(0.65)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full mt-10 md:mt-12 text-left"
          >
            <div className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-md">
              Full Stack Engineer & AI Systems Builder based in India. 
              Building distributed infrastructure that solves real problems at scale.
            </div>
            <div className="font-sans text-[15px] text-[var(--text-muted)] leading-relaxed flex flex-col justify-end">
              <span className="font-mono text-[10px] text-[var(--color-accent-primary)] mb-1.5 uppercase tracking-widest">[ TARGET CORE DOMAINS ]</span>
              <span className="text-[var(--text-secondary)]">Smart Cities · Fintech · Blockchain</span>
              <span className="text-[var(--text-secondary)]">AI Systems · Distributed Systems</span>
            </div>
          </motion.div>

          {/* Thin Separator */}
          <motion.div
            variants={fadeUp(0.7)}
            initial="hidden"
            animate="visible"
            className="w-full h-[1px] bg-[var(--color-border-primary)] my-8"
          />

          {/* Action trigger row */}
          <motion.div
            variants={fadeUp(0.75)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-6 w-full"
          >
            <a
              href="#projects"
              className="font-serif font-semibold text-sm uppercase tracking-wider text-[var(--bg-primary)] bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all duration-200 px-7 py-3.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50"
              style={{ boxShadow: "0 0 20px var(--btn-glow)" }}
            >
              Explore My Work
            </a>
            
            <a
              href="https://github.com/ankitsharma706"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]/30 bg-[var(--card-bg)]/20 hover:bg-[var(--card-bg)]/40 transition-all duration-200 px-6 py-3.5 rounded-lg flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              View on GitHub ↗
            </a>

            <div className="ml-auto hidden md:flex items-center gap-2 text-[var(--text-muted)] font-mono text-[11px] select-none">
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Infinite scrolling bottom thin layout ticker */}
      <div className="w-full border-t border-[var(--color-border-primary)] bg-[var(--bg-secondary)] overflow-hidden py-4 mt-auto">
        <div className="relative w-full flex overflow-x-hidden">
          {/* Animated marquee block */}
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              repeat: Infinity,
              duration: prefersReduced ? 55 : 28,
              ease: "linear"
            }}
            className="flex whitespace-nowrap gap-16 text-[11px] text-[var(--text-muted)]"
          >
            {Array(3).fill(marqueeTags).flat().map((tag, idx) => (
              <span key={idx} className="font-mono flex items-center gap-3">
                {tag.toUpperCase()} <span className="text-[var(--color-border-primary)] font-light">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
