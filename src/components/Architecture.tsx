import React from "react";
import Eyebrow from "./Eyebrow";
import TopologyGraph from "./topology/TopologyGraph";

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="bg-[var(--bg-primary)] py-24 border-t border-white/5 relative overflow-hidden"
    >
      {/* Light glow overlay coordinates */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-apricot-accent/[0.015] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-apricot-accent/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 select-none animate-fadeIn">
          <Eyebrow text="SYSTEMS ARCHITECTURE" className="mb-4" />
          <h2 className="font-serif font-semibold text-[#E8EDF5] tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: "1.15" }}>
            How the Systems Connect.
          </h2>
          <p className="font-sans text-sm text-[#8A9BB8] mt-4 max-w-2xl mx-auto">
            Click any technology to trace its connections across all active projects.
          </p>
        </div>

        {/* Topological Data Routing Graph */}
        <TopologyGraph />

      </div>
    </section>
  );
}
