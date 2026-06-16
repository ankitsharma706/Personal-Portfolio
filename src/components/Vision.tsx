/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function Vision() {
  const theses = [
    {
      title: "AI + Physical Infrastructure",
      desc: "Embedding intelligence into city systems, supply chains, and industrial operations. The next frontier is the physical world, not another SaaS dashboard."
    },
    {
      title: "Compliant DeFi for Everyone",
      desc: "The next billion financial users will not use a bank. They will use an API. I am building that infrastructure — with compliance as a first principle, not an afterthought."
    },
    {
      title: "Sovereign Digital Identity",
      desc: "Every person deserves a portable, verifiable, self-owned identity. Steel workers in Jamshedpur. DeFi users in Texas. No intermediary required."
    }
  ];

  return (
    <section
      id="vision"
      className="bg-apricot-bg py-24 relative overflow-hidden text-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Full Bleed Text Pattern */}
        <div className="max-w-[720px] mx-auto flex flex-col items-center justify-center mb-16 select-none">
          
          <span className="font-mono text-[11px] font-bold text-apricot-accent uppercase tracking-[0.12em] block mb-4">
            [ LOOKING FORWARD ]
          </span>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif italic font-light text-apricot-text leading-[1.25]"
            style={{ fontSize: "clamp(24px, 5vw, 42px)" }}
          >
            "The next decade belongs to engineers who can speak the language of both silicon and society."
          </motion.p>

          <span className="font-mono text-[11px] text-apricot-text-dim mt-4 block">
            — Ankit Sharma, 2025
          </span>

          {/* Thin rule divider */}
          <hr className="w-16 h-px border-none bg-apricot-border mt-12 mb-4 mx-auto" />

        </div>

        {/* 3 columns map of vision boards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {theses.map((thesis, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4 }}
              className="premium-card p-7 text-left flex flex-col items-start border border-apricot-border bg-apricot-card rounded-[2px] transition-all duration-300"
            >
              <h3 className="font-serif font-bold text-apricot-text text-xl mb-3">
                {thesis.title}
              </h3>

              {/* Thin decoration line */}
              <hr className="w-full h-px border-none bg-apricot-border/60 mb-4" />

              <p className="font-sans text-[14px] text-apricot-text-muted leading-relaxed">
                {thesis.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
