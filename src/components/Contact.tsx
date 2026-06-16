/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Github, Twitter, Instagram, CornerDownRight } from "lucide-react";

// Cleaned unused DiscordIcon


export default function Contact() {
  const contacts = [
    {
      icon: <Mail className="w-5 h-5 text-apricot-accent" />,
      label: "Email Protocol",
      value: "ankitsharma706contact@gmail.com",
      href: "mailto:ankitsharma706contact@gmail.com"
    },
    {
      icon: <Linkedin className="w-5 h-5 text-apricot-accent" />,
      label: "LinkedIn Professional",
      value: "in/ankitsharma706",
      href: "https://www.linkedin.com/in/ankitsharma706/"
    },
    {
      icon: <Github className="w-5 h-5 text-apricot-accent" />,
      label: "GitHub Source Archive",
      value: "ankitsharma706",
      href: "https://github.com/ankitsharma706"
    },
    {
      icon: <Twitter className="w-5 h-5 text-apricot-accent" />,
      label: "X (Twitter) Channel",
      value: "@ankit_sharma708",
      href: "https://x.com/ankit_sharma708"
    },
    {
      icon: <Instagram className="w-5 h-5 text-apricot-accent" />,
      label: "Instagram Presence",
      value: "@oxitasm",
      href: "https://www.instagram.com/oxitasm/"
    },
    
  ];

  return (
    <section
      id="contact"
      className="bg-apricot-bg py-24 relative border-t border-apricot-border"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Core title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl select-none"
        >
          <span className="font-mono text-[10px] font-bold text-apricot-accent tracking-[0.25em] uppercase">
            [ OUTBOUND INTERACTION INTERLINK ]
          </span>
          <h2 
            className="font-serif italic font-medium text-apricot-text mt-4 tracking-tight"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: "1.15" }}
          >
            Let's Build Something <br />
            <span className="text-apricot-accent font-roman">
              That Endures.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-apricot-text-muted mt-6 leading-relaxed max-w-xl mx-auto">
            Open to founding engineer positions, infrastructure architecture roles, 
            technical co-founder discussions, and high-concurrency software designs.
          </p>
        </motion.div>

        {/* Dynamic 5 columns grid of social panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full max-w-7xl mt-16 font-sans">
          {contacts.map((c, idx) => (
            <motion.a
              key={idx}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: "#B8436E" }}
              className="premium-card p-4 sm:p-5.5 flex flex-col items-start border border-apricot-border bg-apricot-card rounded relative group text-left outline-none focus:ring-1"
            >
              {/* Box core icon */}
              <div className="w-9 h-9 rounded bg-apricot-secondary border border-apricot-border flex items-center justify-center mb-5">
                {c.icon}
              </div>

              {/* Title category */}
              <span className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                {c.label}
              </span>

              {/* Value entry with break-all, overflow-wrap, hyphens */}
              <span 
                className="text-xs sm:text-sm font-bold text-apricot-text group-hover:text-apricot-accent mt-1 transition-colors block w-full select-text"
                style={{ wordBreak: "break-all", overflowWrap: "break-word", hyphens: "auto" }}
              >
                {c.value}
              </span>

              {/* Link guide bottom indicator */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-apricot-accent group-hover:text-apricot-text mt-4 transition-colors select-none">
                <span>CONNECT SECURELY</span>
                <CornerDownRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>

            </motion.a>
          ))}
        </div>

        {/* Active status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center gap-2.5 bg-apricot-card border border-apricot-border px-5 py-2.5 rounded shadow-sm select-text"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] text-apricot-text font-bold uppercase tracking-wider">
            Available for Select Collaborations — 2026
          </span>
        </motion.div>

      </div>
    </section>
  );
}
