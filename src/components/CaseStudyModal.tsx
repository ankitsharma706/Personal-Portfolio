/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Calendar, 
  Globe, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Flame,
  AlertTriangle,
  Info,
  BookOpen,
  Moon,
  Sun
} from "lucide-react";
import { CaseStudy } from "../lib/caseStudies";

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const [isPaperDark, setIsPaperDark] = useState(() => {
    try {
      return localStorage.getItem("aegis_paper_dark") === "true";
    } catch (e) {
      return false;
    }
  });

  const togglePaperDark = () => {
    setIsPaperDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aegis_paper_dark", String(next));
      } catch (e) {}
      return next;
    });
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (study) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [study]);

  // Sync state changes on dynamic intervals as fallbacks
  useEffect(() => {
    if (!study) return;
    try {
      const activeState = localStorage.getItem("aegis_paper_dark") === "true";
      if (activeState !== isPaperDark) {
        setIsPaperDark(activeState);
      }
    } catch (e) {}
  }, [study]);

  if (!study) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2B221D]/45 backdrop-blur-sm cursor-zoom-out"
        />

        {/* Modal Sheet Canvas (Apricot Whisper editorial ivory paper) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative w-full h-full sm:h-[88vh] max-w-5xl border-0 sm:border rounded-none sm:rounded shadow-lg flex flex-col overflow-hidden z-10 transition-all duration-300 ${
            isPaperDark 
              ? "bg-[#1E1610] border-[#4A3C34] text-[#FAF5EE]" 
              : "bg-apricot-card border-apricot-border text-apricot-text-muted"
          }`}
        >
          
          {/* Header Bar */}
          <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between z-20 select-none transition-colors duration-300 ${
            isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
          }`}>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase shrink-0">
              <Terminal className={`w-4 h-4 transition-colors ${isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"}`} />
              <span className={isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"}>[ PLATFORM JOURNAL ENGINEERING REPORT ]</span>
            </div>
            
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Reading Mode Toggle Button */}
              <button
                type="button"
                onClick={togglePaperDark}
                className={`p-1 px-2.5 rounded border transition-all font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                  isPaperDark
                    ? "bg-[#2D1F17] border-[#4A3C34] text-[#E66E90] hover:text-[#FF9EAA]"
                    : "bg-apricot-secondary border-apricot-border text-apricot-text-dim hover:text-apricot-text"
                }`}
                title="Toggle Reading Mode (Paper-Dark Contrast Theme)"
              >
                {isPaperDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>READING MODE: {isPaperDark ? "DARK" : "LIGHT"}</span>
              </button>

              <button
                onClick={onClose}
                className={`p-1 px-2.5 rounded border transition-all font-mono text-[10px] flex items-center gap-1 cursor-pointer ${
                  isPaperDark
                    ? "bg-[#2D1F17] border-[#4A3C34] text-[#FAF5EE] hover:text-[#FEFCF8]"
                    : "bg-apricot-secondary border-apricot-border text-apricot-text-dim hover:text-apricot-text"
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE [ESC]</span>
              </button>
            </div>
          </div>

          {/* Scrolling Content viewport */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left scrollbar-thin">
            
            {/* Title Billboard Hero Section */}
            <div className={`border-b pb-6 transition-colors duration-300 ${
              isPaperDark ? "border-[#4A3C34]" : "border-apricot-border"
            }`}>
              <div className={`flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase font-bold mb-2 whitespace-nowrap transition-colors ${
                isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
              }`}>
                <span>SYSTEM EVALUATION SHEET</span>
                <span className={`w-1.5 h-1.5 rounded-full inline-block transition-colors ${
                  isPaperDark ? "bg-[#E66E90]" : "bg-apricot-accent"
                }`} />
                <span>SEGMENT: {study.sector}</span>
              </div>
              <h1 className={`font-serif italic font-medium text-3xl sm:text-4xl leading-tight transition-colors ${
                isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
              }`}>
                {study.projectName}
              </h1>
              <p className={`font-sans text-xs sm:text-sm font-bold uppercase tracking-wider mt-2.5 max-w-3xl transition-colors ${
                isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
              }`}>
                ➔ {study.tagline}
              </p>
            </div>

            {/* Performance Ledger Grid Columns */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 border rounded p-4 font-mono text-[10px] select-none transition-all duration-300 ${
              isPaperDark 
                ? "bg-[#130D08]/60 border-[#4A3C34]" 
                : "bg-apricot-secondary/40 border-apricot-border"
            }`}>
              <div className={`flex flex-col gap-1 p-2 rounded border text-center sm:text-left transition-colors duration-300 ${
                isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
              }`}>
                <span className={`uppercase font-bold text-[8.5px] transition-colors ${
                  isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                }`}>TARGET SECTOR</span>
                <span className={`font-bold transition-colors ${
                  isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                }`}>{study.sector}</span>
              </div>
              
              <div className={`flex flex-col gap-1 p-2 rounded border text-center sm:text-left transition-colors duration-300 ${
                isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
              }`}>
                <span className={`uppercase font-bold text-[8.5px] transition-colors ${
                  isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                }`}>OPERATING MARKET</span>
                <span className={`font-bold transition-colors ${
                  isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                }`}>🌍 {study.market}</span>
              </div>

              <div className={`flex flex-col gap-1 p-2 rounded border text-center sm:text-left transition-colors duration-300 ${
                isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
              }`}>
                <span className={`uppercase font-bold text-[8.5px] transition-colors ${
                  isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                }`}>SYSTEM CAPACITY</span>
                <span className={`font-bold transition-colors ${
                  isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                }`}>{study.throughput}</span>
              </div>

              <div className={`flex flex-col gap-1 p-2 rounded border text-center sm:text-left transition-colors duration-300 ${
                isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
              }`}>
                <span className={`uppercase font-bold text-[8.5px] transition-colors ${
                  isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                }`}>SECURITY COMPLIANCE</span>
                <span className={`font-bold flex items-center justify-center sm:justify-start gap-1 transition-colors ${
                  isPaperDark ? "text-[#96e2be]" : "text-emerald-800"
                }`}>
                  <ShieldCheck className={`w-3.5 h-3.5 transition-colors ${
                    isPaperDark ? "text-[#58c091]" : "text-emerald-600"
                  }`} />
                  {study.securityStandard}
                </span>
              </div>
            </div>

            {/* Two Column Layout: Main Body vs Key Parameters Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              
              {/* Main Narrative Area (8 Columns) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Problem Statement */}
                <div className="space-y-3">
                  <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                    isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                  }`}>
                    <span className={`text-xs font-mono font-bold transition-colors ${
                      isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                    }`}>[01]</span>
                    The Problem Space
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                    isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                  }`}>
                    {study.problem}
                  </p>
                </div>

                {/* Opportunity Statement */}
                <div className="space-y-3">
                  <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                    isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                  }`}>
                    <span className={`text-xs font-mono font-bold transition-colors ${
                      isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                    }`}>[02]</span>
                    Strategic Opportunity
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                    isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                  }`}>
                    {study.opportunity}
                  </p>
                </div>

                {/* Research Methods */}
                <div className={`space-y-3 border p-5 sm:p-6 rounded transition-all duration-300 ${
                  isPaperDark 
                    ? "bg-[#2D1F17]/40 border-[#4A3C34]" 
                    : "bg-apricot-secondary/40 border-apricot-border"
                }`}>
                  <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                    isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                  }`}>
                    <span className={`text-xs font-mono font-bold transition-colors ${
                      isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                    }`}>[03]</span>
                    Research Framework & Methods
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors ${
                    isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                  }`}>
                    {study.research}
                  </p>
                </div>

                {/* System Architecture Narrative */}
                <div className="space-y-3">
                  <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                    isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                  }`}>
                    <span className={`text-xs font-mono font-bold transition-colors ${
                      isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                    }`}>[04]</span>
                    Topology & Infrastructure design
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                    isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                  }`}>
                    {study.architecture}
                  </p>
                </div>

              </div>

              {/* Sidebar: Low-level engineering parameters (4 Columns) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Solution Summary Card */}
                <div className={`premium-card p-5 border rounded h-full flex flex-col justify-between transition-all duration-300 ${
                  isPaperDark 
                    ? "bg-[#2D1F17]/50 border-[#4A3C34]" 
                    : "bg-apricot-card border-apricot-border"
                }`}>
                  <div>
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-widest block mb-3 select-none transition-colors ${
                      isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                    }`}>
                      ➔ IMPLEMENTED SOLUTIONS MATRIX
                    </span>
                    <p className={`font-sans text-xs leading-relaxed transition-colors ${
                      isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                    }`}>
                      {study.solutions}
                    </p>
                  </div>
                  <div className={`mt-6 pt-4 border-t font-mono text-[8.5px] transition-colors ${
                    isPaperDark ? "border-[#4A3C34]/80 text-[#B0A090]" : "border-apricot-border text-apricot-text-dim"
                  }`}>
                    RECONCILIATION BENCHMARKS: INTEGRITY DETECTED
                  </div>
                </div>

                {/* Results Card */}
                <div className={`premium-card p-5 border rounded h-full flex flex-col justify-between transition-all duration-300 ${
                  isPaperDark 
                    ? "bg-[#112419]/60 border-[#2A4637]" 
                    : "bg-emerald-50/50 border-emerald-200"
                }`}>
                  <div>
                    <span className={`font-mono text-[9px] uppercase font-bold tracking-widest block mb-3 select-none transition-colors ${
                      isPaperDark ? "text-[#5EC292]" : "text-emerald-800"
                    }`}>
                      ➔ MEASURED PERFORMANCE RESULTS
                    </span>
                    <p className={`font-sans text-xs leading-relaxed transition-colors ${
                      isPaperDark ? "text-[#D2ECE0]" : "text-emerald-950"
                    }`}>
                      {study.results}
                    </p>
                  </div>
                  <div className={`mt-6 pt-4 border-t font-mono text-[8.5px] font-bold flex items-center gap-1 transition-colors ${
                    isPaperDark ? "border-[#2A4637]/80 text-[#5EC292]" : "border-emerald-200 text-emerald-800"
                  }`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>ANOMALIES AUDIENCES DRIFT MINIMIZED</span>
                  </div>
                </div>

              </div>
              
            </div>

            {/* Technical Challenges Accordion-Style Block */}
            <div className={`space-y-4 pt-4 border-t transition-colors duration-300 ${
              isPaperDark ? "border-[#4A3C34]" : "border-apricot-border"
            }`}>
              <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
              }`}>
                <span className={`text-xs font-mono font-bold transition-colors ${
                  isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                }`}>[05]</span>
                Micro-Engineering Challenges & Resolutions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {study.technicalChallenges.map((challenge, index) => (
                  <div key={index} className={`premium-card border rounded p-5 text-left flex flex-col gap-3 transition-all duration-300 ${
                    isPaperDark 
                      ? "bg-[#2D1F17]/50 border-[#41332A]" 
                      : "bg-apricot-card border-apricot-border"
                  }`}>
                    <div className="flex items-start gap-2.5 select-none animate-fade-in">
                      <div className={`p-1 px-2 border rounded font-mono text-[8.5px] font-bold uppercase shrink-0 transition-colors ${
                        isPaperDark 
                          ? "bg-[#E66E90]/5 border-[#E66E90]/15 text-[#E66E90]" 
                          : "bg-apricot-accent/5 border-apricot-accent/15 text-apricot-accent"
                      }`}>
                        CHALLENGE 0{index + 1}
                      </div>
                      <h4 className={`font-sans font-bold text-xs uppercase tracking-wide leading-tight transition-colors ${
                        isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                      }`}>
                        {challenge.title}
                      </h4>
                    </div>
                    
                    <p className={`font-sans text-xs leading-relaxed transition-colors ${
                      isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                    }`}>
                      <strong className={`font-mono text-[8.5px] mr-1 uppercase font-bold transition-colors ${
                        isPaperDark ? "text-[#E66E90]" : "text-coral"
                      }`}>[INCIDENT DIAGNOSIS]</strong>
                      {challenge.desc}
                    </p>
                    
                    <div className={`p-3 border rounded flex gap-2 font-sans text-xs leading-relaxed select-text transition-colors duration-300 ${
                      isPaperDark 
                        ? "bg-[#112419]/50 border-[#233B2E] text-[#D2ECE0]" 
                        : "bg-emerald-50 border-emerald-150 text-emerald-950"
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                        isPaperDark ? "text-[#5EC292]" : "text-emerald-600"
                      }`} />
                      <span>{challenge.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* High-fidelity Technical Roadmap Checklist */}
            <div className={`space-y-4 pt-4 border-t transition-colors duration-300 ${
              isPaperDark ? "border-[#4A3C34]" : "border-apricot-border"
            }`}>
              <h3 className={`font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 select-none transition-colors ${
                isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
              }`}>
                <span className={`text-xs font-mono font-bold transition-colors ${
                  isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                }`}>[06]</span>
                System Operational Roadmap
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {study.futureRoadmap.map((item, index) => (
                  <div key={index} className="flex gap-3 items-stretch">
                    <div className={`w-0.5 bg-gradient-to-b shrink-0 transition-colors ${
                      isPaperDark ? "from-[#E66E90]" : "from-apricot-accent"
                    } to-transparent`} />
                    <div className="flex flex-col justify-between py-1 text-left">
                      <span className={`font-mono text-[9px] font-bold block uppercase mb-1 transition-colors ${
                        isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                      }`}>
                        PHASE 0{index + 1}
                      </span>
                      <p className={`font-sans text-xs leading-relaxed transition-colors ${
                        isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                      }`}>
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer controls layout */}
          <div className={`sticky bottom-0 border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 select-none transition-colors duration-300 ${
            isPaperDark ? "bg-[#1E1610] border-[#4A3C34]" : "bg-apricot-card border-apricot-border"
          }`}>
            <div className={`flex items-center gap-1.5 font-mono text-[9px] transition-colors ${
              isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
            }`}>
              <Info className={`w-3.5 h-3.5 transition-colors ${isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"}`} />
              <span>Complies with ISO 27001, FFIEC banking controls, and regulatory requirements.</span>
            </div>
            
            <button
              onClick={onClose}
              className={`w-full sm:w-auto px-5 py-2 rounded font-mono text-xs font-bold uppercase tracking-wide shadow-sm cursor-pointer select-none transition-colors duration-300 ${
                isPaperDark
                  ? "bg-[#E66E90] hover:bg-[#FF8FA9] text-[#1E1610]"
                  : "bg-apricot-accent hover:bg-apricot-accent-hover text-white"
              }`}
            >
              Close Ledger Sheets ➔
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
