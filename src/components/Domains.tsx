import React from "react";
import { motion } from "motion/react";
import { DOMAINS } from "../lib/data";
import Eyebrow from "./Eyebrow";

export default function Domains() {
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Node cluster icon: 3 coordinates/dots connected by simple paths
  const NodeClusterIcon = () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#007A6E" 
      strokeWidth="1.5" 
      className="w-6 h-6"
    >
      <circle cx="6" cy="18" r="2" fill="#00E5CC" />
      <circle cx="18" cy="6" r="2" fill="#00E5CC" />
      <circle cx="12" cy="12" r="2" fill="#00E5CC" />
      <line x1="6.5" y1="17.5" x2="11.5" y2="12.5" />
      <line x1="12.5" y1="11.5" x2="17.5" y2="6.5" />
    </svg>
  );

  return (
    <section
      id="domains"
      className="bg-[var(--bg-primary)] py-24 border-t border-apricot-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header: centered */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <Eyebrow text="DOMAINS OF PRACTICE" className="mb-4" />
          <h2 className="font-serif font-semibold text-apricot-text tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: "1.15" }}>
            Six Disciplines. One Architect.
          </h2>
        </div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DOMAINS.map((domain, index) => {
            const domainNumber = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative cursor-pointer flex flex-col justify-between text-left p-7 rounded-xl border border-apricot-border/80 bg-apricot-card/80 backdrop-blur-[16px] -webkit-backdrop-blur-[16px] shadow-[0_0_0_1px_rgba(0,229,204,0.08),0_8px_32px_rgba(0,0,0,0.5)] hover:border-apricot-accent/40 hover:bg-apricot-card hover:shadow-[0_0_0_1px_rgba(0,229,204,0.20),0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,204,0.08)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Embedded background hover spotlight element */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(280px circle at 50% 50%, rgba(0,229,204,0.05) 0%, transparent 100%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Top Row */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[11px] font-bold text-apricot-text-muted/50 group-hover:text-apricot-text-muted transition-colors">
                      {domainNumber}
                    </span>
                    <NodeClusterIcon />
                  </div>

                  {/* Domain Name */}
                  <h3 className="font-serif font-bold text-[20px] text-apricot-text mt-6 tracking-tight leading-tight">
                    {domain.title}
                  </h3>

                  {/* 1px subtle divider */}
                  <div className="w-full h-[1px] bg-white/5 my-3.5" />

                  {/* Domain Description */}
                  <p className="font-sans text-[14px] text-apricot-text-dim leading-[1.65]">
                    {domain.desc}
                  </p>
                </div>

                {/* Tags block & Bottom growing highlight line */}
                <div className="relative z-10 mt-6 pt-4 border-t border-apricot-border">
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-apricot-text-muted group-hover:text-apricot-text-dim bg-white/[0.02] border border-apricot-border rounded px-2 py-0.5 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom line that fills on hover */}
                <div className="absolute bottom-0 left-0 h-[1.5px] bg-apricot-accent w-0 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
