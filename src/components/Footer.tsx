/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Twitter, Instagram } from "lucide-react";

// Inline Discord brand SVG icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.873-.894a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.92 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.244.19.372.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.156-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.156-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.156 2.418z"/>
  </svg>
);

interface FooterProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function Footer({ theme, setTheme }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="bottom-footer"
      className="bg-apricot-card py-12 border-t border-apricot-border relative z-10 select-none animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left Column Identity */}
        <div className="flex flex-col items-start text-left">
          <span className="font-serif italic font-medium text-apricot-text text-lg">
            Ankit Sharma
          </span>
          <span className="font-mono text-[9px] text-apricot-text-dim tracking-wider uppercase mt-1">
            Bhubaneswar & Jamshedpur, India
          </span>
        </div>

        {/* Center Column Copyright Credentials & Apple premium Toggle */}
        <div className="flex flex-col items-center justify-center text-center gap-4 py-2 border-y md:border-y-0 border-apricot-border/40 md:py-0">
          <div className="font-mono text-[10px] text-apricot-text-dim">
            © {currentYear} Ankit Sharma
          </div>

          {/* Premium Settings Dual-Theme Apple Slider */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase relative select-none">
              
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`transition-all duration-300 pointer-events-auto uppercase focus:outline-none cursor-pointer ${
                  theme === "light"
                    ? "text-apricot-accent font-black tracking-wider"
                    : "text-apricot-text-dim hover:text-apricot-text opacity-60"
                }`}
                title="Symmetric light publication style"
              >
                Light
              </button>

              <div 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className="relative w-24 h-5 flex items-center cursor-pointer group px-1"
                aria-label={`Current theme is ${theme}. Click to switch to ${theme === 'light' ? 'dark' : 'light'}.`}
              >
                {/* Horizontal line track (○────● / ●────○ symbolization) */}
                <span className="absolute left-0 right-0 h-[1.5px] bg-apricot-border/60 group-hover:bg-apricot-accent/40 rounded transition-colors" />
                
                {/* Visual node slots */}
                <span className="absolute left-[8px] w-1.5 h-1.5 rounded-full border border-apricot-border bg-apricot-card" />
                <span className="absolute right-[8px] w-1.5 h-1.5 rounded-full border border-apricot-border bg-apricot-card" />

                {/* Highly polished Apple premium slide knob */}
                <div 
                  className="absolute w-3.5 h-3.5 rounded-full bg-apricot-accent border border-apricot-card shadow-md transition-all duration-300 ease-out flex items-center justify-center"
                  style={{
                    left: theme === "light" ? "4px" : "calc(100% - 18px)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF9] animate-pulse" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`transition-all duration-300 pointer-events-auto uppercase focus:outline-none cursor-pointer ${
                  theme === "dark"
                    ? "text-apricot-accent font-black tracking-wider"
                    : "text-apricot-text-dim hover:text-apricot-text opacity-60"
                }`}
                title="Contrast research dark infrastructure"
              >
                Dark
              </button>

            </div>
            
            <div className="font-mono text-[9px] text-apricot-text-dim tracking-widest uppercase">
              [ Theme: {theme === "light" ? "Light" : "Dark"} ]
            </div>
          </div>
        </div>

        {/* Right Column Social Control Panel */}
        <div className="flex items-center justify-center md:justify-end gap-5">
          
          <a
            href="mailto:ankitsharma706contact@gmail.com"
            aria-label="Send direct email to Ankit Sharma"
            className="text-apricot-text-dim hover:text-apricot-accent transition-colors p-1 rounded"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://github.com/ankitsharma706"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Open Source code repositories"
            className="text-apricot-text-dim hover:text-apricot-accent transition-colors p-1 rounded"
          >
            <Github className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/ankitsharma706/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn professional networking"
            className="text-apricot-text-dim hover:text-apricot-accent transition-colors p-1 rounded"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://x.com/ankit_sharma708"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow technical tweets on X"
            className="text-apricot-text-dim hover:text-apricot-accent transition-colors p-1 rounded"
          >
            <Twitter className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://www.instagram.com/oxitasm/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="text-apricot-text-dim hover:text-apricot-accent transition-colors p-1 rounded"
          >
            <Instagram className="w-4.5 h-4.5" />
          </a>

       

        </div>

      </div>
    </footer>
  );
}
