import React from "react";
import { Moon, Sun } from "lucide-react";

interface FooterProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Footer({ theme, setTheme }: FooterProps) {
  return (
    <footer className="relative z-10 w-full border-t border-[var(--color-border)] bg-[var(--card-bg)] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-bold text-xl  text-[var(--text-primary)]">Ankit Sharma</span>
          <span className="text-[var(--text-muted)] text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </footer>
  );
}
