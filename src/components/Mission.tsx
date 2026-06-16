import React from "react";
import { motion } from "motion/react";
import Eyebrow from "./Eyebrow";

export default function Mission() {
  return (
    <section
      id="mission"
      className="bg-[var(--bg-secondary)] py-24 border-t border-white/5 relative overflow-hidden"
    >
      {/* Light vignetting/glow for ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-apricot-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
        
        {/* Centered container with max width 720px */}
        <div className="max-w-[720px] w-full text-left">
          
          {/* Eyebrow */}
          <Eyebrow text="ON ENGINEERING" className="mb-6 text-left" />

          {/* Pull quote heading in Syne */}
          <h2 
            className="font-serif font-bold text-[#E8EDF5] tracking-tight mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: "1.15" }}
          >
            Most engineers build features.<br />
            <span className="text-apricot-accent">I build foundations.</span>
          </h2>

          {/* Elegant subtler separator line */}
          <div className="w-[60px] h-[1px] bg-white/10 mt-8 mb-8" />

          {/* Content paragraphs */}
          <div className="space-y-6 font-sans text-[16px] text-[#8A9BB8] leading-[1.8]">
            <p>
              The infrastructure layer is where real software leverage lives. A well-designed 
              data ledger model, caching system, or schema boundary outlives front-end trends. I think 
              exclusively in systems, not sandboxes — prioritizing horizontal scaling plans, strict boundary 
              constraints, and absolute correctness before writing client assets.
            </p>
            <p>
              My engineering portfolio covers heavy-industry and regulated sectors that demand more than 
              standard developer recipes: machine learning pipelines for Indian municipal transit metrics, 
              graph allocations for steel plant labor markets, and compliance clearing systems for US digital banking. 
              These are designed to strict laws, standard schemas, and hard physical parameters.
            </p>
            <p>
              Impact in the dirt is the ultimate software metric. Scaling distributed systems and coordinating nodes across complex geographical bounds requires structural rigor. From high-availability message brokers to ZK-proof verification systems, everything I build is engineered for high integrity and zero-trust operations.
            </p>
          </div>

          {/* Closing line in JetBrains Mono */}
          <div className="font-mono text-[13px] text-[#007A6E] text-right mt-12 select-none">
            // Build things that matter. At scale. With precision.
          </div>

        </div>

      </div>
    </section>
  );
}
