/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CollaborationMarquee from "./components/CollaborationMarquee";
import ReviewBoard from "./components/ReviewBoard";
import Mission from "./components/Mission";
import Domains from "./components/Domains";
import Projects from "./components/Projects";
import EngineeringLog from "./components/EngineeringLog";
import Architecture from "./components/Architecture";
import Timeline from "./components/Timeline";
import Research from "./components/Research";
import Metrics from "./components/Metrics";
import TechStack from "./components/TechStack";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SiteMap from "./components/SiteMap";
import VercelAnalytics from "./components/VercelAnalytics";
import ScrollReveal from "./components/ScrollReveal";
import { Map, ArrowUp } from "lucide-react";
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored as 'light' | 'dark';
      }
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Synchronize dynamic mouse coordinate styling across tactile glass and premium panels
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.glass-panel, .premium-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [siteMapOpen, setSiteMapOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if the focus is inside an input, select, or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setSiteMapOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const docScrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Control Back to Top visibility past the Hero section
      setShowBackToTop(docScrollTop > 450);

      const projectsEl = document.getElementById("projects");
      const engineeringLogEl = document.getElementById("engineering-log");

      if (!projectsEl || !engineeringLogEl) return;

      const projectsRect = projectsEl.getBoundingClientRect();
      const engineeringLogRect = engineeringLogEl.getBoundingClientRect();

      // Find the absolute top and bottom coordinates relative to the page document
      const startY = docScrollTop + projectsRect.top;
      const endY = docScrollTop + engineeringLogRect.bottom;

      const currentScroll = docScrollTop;
      const viewportHeight = window.innerHeight;

      // Check if we are inside the reading window
      if (currentScroll < startY) {
        setReadingProgress(0);
        setActiveSegment(null);
      } else if (currentScroll > endY - viewportHeight) {
        setReadingProgress(100);
        setActiveSegment("Completed");
      } else {
        const totalReadingHeight = endY - startY - viewportHeight;
        const progress = ((currentScroll - startY) / totalReadingHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));

        // Determine which segment the user is currently looking at
        if (projectsRect.bottom > viewportHeight / 2) {
          setActiveSegment("Case Studies");
        } else {
          setActiveSegment("Engineering Journal");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Trigger initial calculation
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <motion.div
      style={{
        "--bg-primary": theme === "light" ? "#F7F1E8" : "#04060A",
        "--bg-secondary": theme === "light" ? "#EDE6D9" : "#070C14",
        "--card-bg": theme === "light" ? "#FCFAF5" : "#0A1020",
        "--color-accent-primary": theme === "light" ? "#006B6B" : "#00E5CC",
        "--color-accent-hover": theme === "light" ? "#005757" : "#00B8A4",
        "--color-accent-secondary": theme === "light" ? "#818263" : "#A07840",
        "--color-accent-highlight": theme === "light" ? "#1F4A7A" : "#4A5A70",
        "--text-primary": theme === "light" ? "#1C2422" : "#E8EDF5",
        "--text-secondary": theme === "light" ? "#4C5451" : "#8A9BB8",
        "--text-muted": theme === "light" ? "#78827F" : "#4A5A70",
        "--color-border-primary": theme === "light" ? "#E5DFC4" : "rgba(255, 255, 255, 0.05)",
        "--neon-glow": theme === "light" ? "none" : "0 0 40px rgba(0, 229, 204, 0.45), 0 0 80px rgba(0, 229, 204, 0.15)",
        "--btn-glow": theme === "light" ? "transparent" : "rgba(0, 229, 204, 0.4)",
      } as any}
      animate={{
        "--bg-primary": theme === "light" ? "#F7F1E8" : "#04060A",
        "--bg-secondary": theme === "light" ? "#EDE6D9" : "#070C14",
        "--card-bg": theme === "light" ? "#FCFAF5" : "#0A1020",
        "--color-accent-primary": theme === "light" ? "#006B6B" : "#00E5CC",
        "--color-accent-hover": theme === "light" ? "#005757" : "#00B8A4",
        "--color-accent-secondary": theme === "light" ? "#818263" : "#A07840",
        "--color-accent-highlight": theme === "light" ? "#1F4A7A" : "#4A5A70",
        "--text-primary": theme === "light" ? "#1C2422" : "#E8EDF5",
        "--text-secondary": theme === "light" ? "#4C5451" : "#8A9BB8",
        "--text-muted": theme === "light" ? "#78827F" : "#4A5A70",
        "--color-border-primary": theme === "light" ? "#E5DFC4" : "rgba(255, 255, 255, 0.05)",
        "--neon-glow": theme === "light" ? "none" : "0 0 40px rgba(0, 229, 204, 0.45), 0 0 80px rgba(0, 229, 204, 0.15)",
        "--btn-glow": theme === "light" ? "transparent" : "rgba(0, 229, 204, 0.4)",
      } as any}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen bg-apricot-bg overflow-x-hidden font-sans text-apricot-text antialiased"
    >
      {/* Slim Dynamic Reading Depth Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] bg-[var(--color-accent-primary)] z-50 transition-all duration-100 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Embedded Mini Section Track Indicator pill (Floating top-right below nav) */}
      <AnimatePresence>
        {activeSegment && (
          <motion.div
            key="reading-depth-indicator"
            initial={{ opacity: 0, y: -20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-5 right-6 z-40 bg-[#FFFDF9] border border-apricot-border/80 p-1.5 px-3 rounded font-mono text-[8.5px] font-bold text-[var(--color-accent-primary)] uppercase tracking-widest shadow-sm select-none pointer-events-none md:flex hidden items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
            <span>READING DEPTH: {Math.round(readingProgress)}% · {activeSegment}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Header */}
      <Nav />

      {/* Sections Array */}
      <main id="main-studio-dashboard">
        {/* Section 1 - Ambient Hero & Constellation Grid */}
        <Hero />

        {/* Strategic Collaboration Partners Marquee */}
        <ScrollReveal duration={0.6}>
          <CollaborationMarquee />
        </ScrollReveal>

        {/* Live Multi-Persona Review Board Audits Grid */}
        <ScrollReveal>
          <ReviewBoard />
        </ScrollReveal>

        {/* Section 2 - Core Beliefs Systems & Philosophy */}
        <ScrollReveal>
          <Mission />
        </ScrollReveal>

        {/* Section 3 - Target Research Domains Verticals */}
        <ScrollReveal>
          <Domains />
        </ScrollReveal>

        {/* Section 4 - Projects Catalogue & Interactive AI Generation Labs */}
        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        {/* Section 4.5 - Engineering Log & Interactive Incident Registries */}
        <ScrollReveal>
          <EngineeringLog />
        </ScrollReveal>

        {/* Section 5 - Network Architecture Maps & SVGs */}
        <ScrollReveal>
          <Architecture />
        </ScrollReveal>

        {/* Section 6 - Multi-Year Development Timeline */}
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>

        {/* Section 7 - Academic Publication & Reading Index */}
        <ScrollReveal>
          <Research />
        </ScrollReveal>

        {/* Section 8 - Native Animation Metrics Display */}
        <ScrollReveal>
          <Metrics />
        </ScrollReveal>

        {/* Section 9 - Complete Technology Stacks & Badges */}
        <ScrollReveal>
          <TechStack />
        </ScrollReveal>

        {/* Section 10 - Editorial Manifesto & Futuristic Vision Cards */}
        <ScrollReveal>
          <Vision />
        </ScrollReveal>

        {/* Section 11 - Outreach Forms, Social Matrices & Status Indicators */}
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Layout footer credit benchmarks */}
      <Footer theme={theme} setTheme={setTheme} />

      {/* Back to Top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <>
            {/* Desktop floating 'Back to Top' button styled with the same glass-panel look as the Navigation Registry */}
            <motion.button 
              key="back-to-top-desktop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={scrollToTop}
              className="fixed bottom-[88px] right-6 z-40 glass-panel bg-[#FFFDF9] hover:bg-[#F3EBE0] border border-apricot-border/80 p-2.5 px-4 rounded shadow-md cursor-pointer hover:border-[var(--color-accent-primary)]/40 dark:hover:border-[#3FA3A3]/40 hover:shadow-lg transition-all duration-300 md:flex hidden items-center gap-2 group text-left select-none outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)] dark:focus:ring-[#3FA3A3]"
              aria-label="Scroll Back to Top"
              title="Return to top of page"
            >
              <ArrowUp className="w-4 h-4 text-[var(--color-accent-primary)] dark:text-[#3FA3A3] group-hover:-translate-y-0.5 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-[8.5px] font-bold text-[#8C7A6B] leading-[1]">FLUIDITY DEPTH</span>
                <span className="font-mono text-[9.5px] font-extrabold text-[var(--color-accent-primary)] dark:text-[#3FA3A3] tracking-wider mt-0.5 uppercase leading-[1]">BACK TO TOP</span>
              </div>
            </motion.button>

            {/* Mobile touch-friendly floating trigger button, stacked gracefully above the mobile site map button */}
            <motion.button 
              key="back-to-top-mobile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              className="fixed bottom-[72px] right-5 z-40 md:hidden flex w-11 h-11 rounded-full bg-[var(--color-accent-primary)] dark:bg-[#3FA3A3] text-white dark:text-black shadow-lg items-center justify-center cursor-pointer hover:bg-[var(--color-accent-hover)] dark:hover:bg-[#4FB3B3] transition-all"
              aria-label="Scroll Back to Top"
            >
              <ArrowUp className="w-5 h-5 text-white dark:text-black" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Interactive, keyboard-discoverable Floating Site Map Indicator and Launcher */}
      <button 
        onClick={() => setSiteMapOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#FFFDF9] hover:bg-[#F3EBE0] border border-apricot-border/80 p-2.5 px-4 rounded shadow-md cursor-pointer hover:border-[var(--color-accent-primary)]/40 hover:shadow-lg transition-all duration-300 md:flex hidden items-center gap-2 group text-left select-none outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]"
        aria-label="Open Site Map"
        title="Shortcut: M"
      >
        <Map className="w-4 h-4 text-[var(--color-accent-primary)] group-hover:rotate-6 transition-transform" />
        <div className="flex flex-col">
          <span className="font-mono text-[8.5px] font-bold text-[#8C7A6B] leading-[1]">NAVIGATION REGISTRY</span>
          <span className="font-mono text-[9.5px] font-extrabold text-[var(--color-accent-primary)] tracking-wider mt-0.5 uppercase leading-[1]">PRESS [ M ] KEY</span>
        </div>
      </button>

      {/* Touch-friendly trigger for mobile screens */}
      <button 
        onClick={() => setSiteMapOpen(true)}
        className="fixed bottom-5 right-5 z-40 md:hidden flex w-11 h-11 rounded-full bg-[var(--color-accent-primary)] text-white shadow-lg items-center justify-center cursor-pointer hover:bg-[var(--color-accent-hover)] transition-all"
        aria-label="Open Navigation Index Map"
      >
        <Map className="w-5 h-5 text-white" />
      </button>

      {/* Full-screen keyboard interactive Portal Overlay */}
      <SiteMap isOpen={siteMapOpen} onClose={() => setSiteMapOpen(false)} />

      {/* Vercel Web Analytics tracker & widget controller */}
      <VercelAnalytics />

    </motion.div>
  );
}
