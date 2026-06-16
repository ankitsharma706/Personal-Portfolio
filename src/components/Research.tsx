import React from "react";
import { motion } from "motion/react";
import { RESEARCH } from "../lib/data";
import Eyebrow from "./Eyebrow";

export default function Research() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section
      id="research"
      className="bg-[var(--bg-primary)] py-24 border-t border-apricot-border relative overflow-hidden"
    >
      {/* Structural ambient light vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-apricot-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-16 select-none animate-fadeIn">
          <Eyebrow text="ACADEMIC & SECTOR EXPOSURE" className="mb-4" />
          <h2 className="font-serif font-semibold text-apricot-text tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: "1.15" }}>
            Raw Underpinnings.
          </h2>
        </div>

        {/* 3-Panel grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {RESEARCH.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col justify-between p-6 bg-apricot-card/80 backdrop-blur-[12px] -webkit-backdrop-blur-[12px] border border-apricot-border rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Internal card spot lighting */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-gradient-to-tr from-apricot-accent/5 to-transparent" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Category Tracker */}
                  <span className="block font-mono text-[10px] text-apricot-text-muted group-hover:text-apricot-text tracking-wider uppercase mb-3 select-none">
                    RESEARCH REGISTER // {card.category}
                  </span>

                  {/* Document Title */}
                  <h3 className="font-serif font-bold text-[16px] text-apricot-text tracking-tight leading-snug mb-4">
                    {card.title}
                  </h3>

                  {/* Core Narrative excerpt with left border */}
                  <div className="border-l-2 border-apricot-accent/20 group-hover:border-apricot-accent/50 pl-3.5 mb-6 transition-colors">
                    <p className="font-sans text-[13px] text-apricot-text-dim leading-[1.6] italic">
                      "{card.note}"
                    </p>
                  </div>
                </div>

                {/* Citation bottom row */}
                <div className="font-mono text-[10px] text-apricot-accent select-none pt-2">
                  <span className="text-apricot-text-muted mr-1.5">SOURCE:</span>
                  <span>{card.source.toUpperCase()}</span>
                </div>
              </div>

              {/* Bottom linear accent indicator on hover */}
              <div className="absolute bottom-0 left-0 h-[1px] bg-apricot-accent w-0 group-hover:w-[120px] transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
