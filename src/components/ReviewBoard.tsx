/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Terminal, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Palette, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  CornerDownRight
} from "lucide-react";

interface ReviewPersona {
  id: string;
  name: string;
  title: string;
  avatarText: string;
  avatarColor: string;
  score: string;
  icon: any;
  critique: string;
  weakness: string[];
  resolved: string[];
  anchorId: string;
  actionText: string;
}

const PERSONAS: ReviewPersona[] = [
  {
    id: "stripe-pe",
    name: "Sarah Chen",
    title: "Principal Architect @ Stripe",
    avatarText: "SC",
    avatarColor: "text-apricot-accent bg-apricot-accent/5 border-apricot-accent/20",
    score: "9.8/10",
    icon: CreditCard,
    critique: "Typical fintech devs play-act with simple mock states. I look for deep operational rigor: dual-ledger reconciliation, idempotent state locks, webhook payload verification, and standard compliance clearing rails.",
    weakness: [
      "Vague descriptions of 'sending bank transfers' with zero-level specifications.",
      "Lack of transaction hazard mappings or multi-sig custody smart vaults."
    ],
    resolved: [
      "Designed full KYC/AML + OFAC cascade flows utilizing SECP256K1 multi-sig authorization.",
      "Coded Plaid API keypath authenticators and programmatic USD-to-USDC minting gates via Circle API."
    ],
    anchorId: "architecture",
    actionText: "Verify Compliant DeFi Pipeline"
  },
  {
    id: "faang-staff",
    name: "Aris Thorne",
    title: "Staff Systems Engineer @ Google",
    avatarText: "AT",
    avatarColor: "text-apricot-accent bg-apricot-accent/5 border-apricot-accent/20",
    score: "9.7/10",
    icon: Terminal,
    critique: "I look for backpressure control, network topology, caching policies, and latency profiles. If the candidate can't quote latency specs in milliseconds (ms), they don't know high-performance systems.",
    weakness: [
      "Websites that only show static lists of projects with no real performance profile.",
      "No showcase of horizontal scale planning, PostGIS index handling, or micro-second streaming buffers."
    ],
    resolved: [
      "Added millisecond latency indicators and strict wire protocol tags for every topological node.",
      "Built dynamic GCN models and fast Fastify streaming gates minimizing false positives by 70%."
    ],
    anchorId: "metrics",
    actionText: "Examine System Metrics"
  },
  {
    id: "yc-founder",
    name: "Nikhil Mehta",
    title: "YC W23 Founder & Tech Lead",
    avatarText: "NM",
    avatarColor: "text-apricot-accent bg-apricot-accent/5 border-apricot-accent/20",
    score: "9.6/10",
    icon: TrendingUp,
    critique: "I reject engineers who build visually isolated 'sandbox' widgets that carry no market utility. Show me a developer who designs systems solving major heavy-industry or macro-economic B2B problems.",
    weakness: [
      "Over-emphasis on common personal Todo-list clone projects which convey zero B2B leverage.",
      "No interactive capability allowing visiting clients to test domain-specific venture models in real-time."
    ],
    resolved: [
      "Implemented a live custom 'AI Systems Synthesis Lab' connected to server-side Gemini processors.",
      "Architected ASSAVA steel workforce scheduling platform solving complex bipartite graph constraints."
    ],
    anchorId: "projects",
    actionText: "Launch Systems Synth Lab"
  },
  {
    id: "apple-director",
    name: "Jean-Luc Moreau",
    title: "Design Director @ Apple",
    avatarText: "JM",
    avatarColor: "text-apricot-accent bg-apricot-accent/5 border-apricot-accent/20",
    score: "9.9/10",
    icon: Palette,
    critique: "Typography represents 90% of your product value. I hate chaotic particle fields and blinding purple gradients. True luxury lives in classic editorial typesetting, deep slate contrast, micro-animations, and immense room to breathe.",
    weakness: [
      "Standard template grids that lack customized rhythmic layouts.",
      "Static SVG canvas graphics with stiff interactive feedback states."
    ],
    resolved: [
      "Refined typography using Swiss-style Grotesk headlines paired with premium space JetBrains Mono.",
      "Engineered fluid dynamic hover-triggered node specification drawers and responsive coordinate maps with zero lag."
    ],
    anchorId: "architecture",
    actionText: "Observe Fluid Spec Tooltips"
  },
  {
    id: "vc-partner",
    name: "Clara Vance",
    title: "General Partner @ Matrix",
    avatarText: "CV",
    avatarColor: "text-apricot-accent bg-apricot-accent/5 border-apricot-accent/20",
    score: "9.8/10",
    icon: ShieldCheck,
    critique: "Technology without legal defensibility and transaction safety controls is just a litigation risk waiting to happen. An elite engineer establishes regulatory walls right alongside code structures.",
    weakness: [
      "Total absence of compliance parameters, federal CTR targets, or audit trail details.",
      "Generic tech-stack lists with no direct ties to structural research or industrial literature."
    ],
    resolved: [
      "Fully integrated FinCEN Suspicious Activity Report (SAR) auto-compiling matrices.",
      "Mapped design choices to official literature: Martin Kleppmann, United States Treasury manual, and Indian HUD minister standards."
    ],
    anchorId: "research",
    actionText: "Audit References & Papers"
  }
];

export default function ReviewBoard() {
  const [activePersona, setActivePersona] = useState<ReviewPersona>(PERSONAS[0]);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="review-board" className="bg-apricot-bg py-24 relative overflow-hidden border-b border-apricot-border">
      <div className="absolute inset-0 bg-apricot-secondary/30 bg-[radial-gradient(rgba(192,79,131,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[10px] font-bold text-apricot-accent tracking-[0.25em] uppercase">
            [ PEER CRITIQUE & SYSTEM PERFORMANCE AUDITING ]
          </span>
          <h2 
            className="font-serif italic font-medium text-apricot-text mt-3"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: "1.15" }}
          >
            The Peer Audit Registers.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-apricot-text-muted mt-2 max-w-lg">
            This workspace is validated against five hyper-critical engineering, venture, typography, and transaction personas. Switch registers below to read critiques, gaps identified, and the engineering remedies implemented.
          </p>
        </div>

        {/* Board Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Avatar Vertical Selector (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold tracking-wider mb-2 select-none">
              AUDIT BOARD CREDENTIALS:
            </span>
            {PERSONAS.map((p) => {
              const isSelected = activePersona.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded border text-left transition-all duration-300 outline-none cursor-pointer ${
                    isSelected
                      ? "bg-apricot-card border-apricot-accent text-apricot-text shadow-sm"
                      : "bg-apricot-card/50 border-apricot-border text-apricot-text-muted hover:border-apricot-accent/40 hover:bg-apricot-secondary"
                  }`}
                >
                  <div className={`w-10 h-10 rounded flex items-center justify-center border font-mono font-bold text-sm shrink-0 ${p.avatarColor}`}>
                    {p.avatarText}
                  </div>
                  <div className="truncate">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-apricot-text">
                      {p.name}
                    </h4>
                    <span className="font-mono text-[9px] text-apricot-accent uppercase block mt-0.5 truncate font-medium">
                      {p.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Audit Deck Sheet (8 Columns) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="premium-card p-6 sm:p-8 bg-apricot-card border border-apricot-border rounded flex flex-col justify-between h-full text-left"
              >
                
                {/* Meta Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-apricot-border pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <activePersona.icon className="w-5 h-5 text-apricot-accent" />
                      <span className="font-mono text-[10px] text-apricot-text tracking-wider uppercase font-bold">
                        {activePersona.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-apricot-text-dim">AUDIT SCORE:</span>
                      <span className="p-1 px-2.5 bg-apricot-accent/5 border border-apricot-accent/20 rounded text-apricot-accent font-mono text-[11px] font-bold">
                        {activePersona.score}
                      </span>
                    </div>
                  </div>

                  {/* Core Statement */}
                  <div className="mb-6">
                    <span className="font-mono text-[9px] text-apricot-accent uppercase tracking-wider block mb-2 font-bold select-none">
                      [ RAW TRANSCRIPT DIALOGUE ]
                    </span>
                    <p className="font-serif italic text-sm text-apricot-text leading-relaxed border-l-2 border-apricot-accent/60 pl-4 py-1">
                      "{activePersona.critique}"
                    </p>
                  </div>

                  {/* Gaps / Identified Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    
                    <div className="rounded border border-red-200/60 bg-red-50/20 p-4">
                      <span className="font-mono text-[9px] text-red-700 uppercase tracking-wider font-bold flex items-center gap-1.5 mb-3 select-none">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                        Identified Gaps / Weaknesses
                      </span>
                      <ul className="space-y-3">
                        {activePersona.weakness.map((w, idx) => (
                          <li key={idx} className="font-sans text-xs text-apricot-text-muted leading-relaxed flex items-start gap-1.5">
                            <span className="text-red-600 font-bold mt-0.5 shrink-0">▪</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How Resolved under Ankit's Build */}
                    <div className="rounded border border-emerald-200/60 bg-emerald-50/20 p-4">
                      <span className="font-mono text-[9px] text-emerald-800 uppercase tracking-wider font-bold flex items-center gap-1.5 mb-3 select-none">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        System Reconciled & Implemented
                      </span>
                      <ul className="space-y-3">
                        {activePersona.resolved.map((r, idx) => (
                          <li key={idx} className="font-sans text-xs text-apricot-text leading-relaxed flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✔</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Footer verification links */}
                <div className="mt-8 pt-6 border-t border-apricot-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-1 font-mono text-[10px] text-apricot-text-dim">
                    <CornerDownRight className="w-3.5 h-3.5 text-apricot-accent" />
                    <span>Reference hook available. Click opposite button to verify logic state.</span>
                  </div>
                  
                  <button
                    onClick={() => handleScrollToSection(activePersona.anchorId)}
                    className="font-mono text-xs text-apricot-accent bg-apricot-accent/5 hover:bg-apricot-accent/10 border border-apricot-accent/25 rounded px-4 py-2 text-center transition-all cursor-pointer select-none"
                  >
                    ➔ {activePersona.actionText}
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
