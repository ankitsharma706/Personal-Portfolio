import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import FeaturedProjects from "./components/FeaturedProjects"; // refresh import
import GitHubShowcase from "./components/GitHubShowcase";
import ExperienceTimeline from "./components/ExperienceTimeline";
import DSACoding from "./components/DSACoding";
import DevOpsJourney from "./components/DevOpsJourney"; // refresh import
import Contact from "./components/Contact"; // refresh import
import Footer from "./components/Footer";


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

  // Global Ctrl+K command menu listener state
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Cursor Spotlight State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden font-sans text-[var(--text-primary)] antialiased transition-colors duration-300">
      
      {/* Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color, rgba(128,128,128,0.08)), transparent 40%)`
        }}
      />

      {/* Gooey SVG Filter */}
      <svg width="0" height="0" className="absolute hidden">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: "gooey-toast",
          style: {
            background: "var(--card-bg)",
            color: "var(--text-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: "100px",
            padding: "12px 24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            backdropFilter: "blur(10px)"
          }
        }}
      />

      {/* Background Grid Pattern Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-60" />

      {/* Background Grid Accent Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)] to-[var(--bg-primary)] pointer-events-none z-0 opacity-80" />

      {/* Sticky Navigation */}
      <Nav theme={theme} setTheme={setTheme} />

      {/* Single Page Sections */}
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <TechStack />
        <FeaturedProjects />
        <GitHubShowcase />
        <ExperienceTimeline />
        <DSACoding />
        <DevOpsJourney />
        <Contact />
      </main>

      <Footer theme={theme} setTheme={setTheme} />
      


      {/* Placeholder for Command Menu implementation */}
      {commandMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--card-bg)] w-full max-w-lg p-6 rounded-2xl shadow-2xl border border-[var(--color-border)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">Command Menu</h3>
              <button onClick={() => setCommandMenuOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">ESC</button>
            </div>
            <p className="text-sm text-[var(--text-muted)]">Command palette feature coming soon...</p>
          </div>
        </div>
      )}

    </div>
  );
}
