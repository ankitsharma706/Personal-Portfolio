import React, { useState, useEffect } from "react";
import { Activity, ChevronRight, ArrowRight } from "lucide-react";
import { ToolNode, ProjectNode, TOOLS, PROJECTS, TOOL_PROJECT_DESCRIPTIONS } from "../../lib/topology-data";

interface SignalConsoleProps {
  selectedToolId: string | null;
}

export const SignalConsole: React.FC<SignalConsoleProps> = ({ selectedToolId }) => {
  const [scanState, setScanState] = useState<"idle" | "compiling" | "scanning" | "verified">("idle");

  const handleScan = () => {
    if (scanState !== "idle") return;
    
    setScanState("compiling");
    
    setTimeout(() => {
      setScanState("scanning");
      setTimeout(() => {
        setScanState("verified");
        setTimeout(() => {
          setScanState("idle");
        }, 1000);
      }, 700);
    }, 500);
  };

  const getButtonText = () => {
    switch(scanState) {
      case "compiling": return "COMPILING...";
      case "scanning": return "SCANNING NODES...";
      case "verified": return "INTEGRITY VERIFIED ✓";
      default: return "COMPILE DIAGNOSTIC SWEEP";
    }
  };

  const isAnimating = scanState !== "idle";
  
  const tool = selectedToolId ? TOOLS.find(t => t.id === selectedToolId) : null;
  const connectedProjects = tool ? PROJECTS.filter(p => p.connectedTools.includes(tool.id)) : [];
  const Icon = tool ? tool.icon : null;

  return (
    <div 
      className="w-[280px] shrink-0 bg-apricot-secondary border-l border-apricot-border flex flex-col overflow-y-auto hidden lg:flex"
    >
      {/* SECTION A — HEADER */}
      <div 
        className="px-3 py-2 border-b border-apricot-border flex justify-between items-center shrink-0"
      >
        <span className="flex items-center gap-2">
          <Activity size={10} className="text-apricot-accent" />
          <span className="font-mono text-[9px] text-apricot-accent tracking-[0.10em]">
            SIGNAL READOUT CONSOLE
          </span>
        </span>
        <div className="flex items-center gap-1.5 opacity-80">
          <span className="font-mono text-[9px] text-apricot-accent">ONLINE_RUNNING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* SECTION B — MAIN READOUT */}
      <div className="px-3 py-4 flex flex-col shrink-0">
        <span className="font-mono text-[9px] text-apricot-text-dim tracking-[0.10em]">
          [ SELECTED GRID NODE ]
        </span>

        {/* Selected State Indicator */}
        <div className="mt-3 min-h-[50px]">
          {tool && Icon ? (
            <div className="flex flex-col gap-2">
              <div 
                className="w-full rounded p-2 flex items-center gap-3 bg-apricot-card/50"
                style={{
                  border: "1px solid var(--color-accent-primary)"
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded bg-apricot-accent/20 border border-apricot-accent/30">
                  <Icon size={14} className="text-apricot-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold text-apricot-text uppercase">
                    {tool.name}
                  </span>
                  <span className="font-mono text-[9px] text-apricot-text-dim uppercase mt-0.5">
                    {tool.sub}
                  </span>
                </div>
              </div>
              <p className="font-sans text-[12px] text-apricot-text-dim leading-[1.6] mt-2.5">
                {tool.desc}
              </p>
            </div>
          ) : (
            <div className="mt-2.5 text-apricot-text-dim font-mono text-[10px]">
              <span className="opacity-50">_ AWAITING_SELECTION...</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px border-b border-apricot-border border-dashed my-4"></div> 
        
        {/* System Integrity Gate */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] text-apricot-text-dim tracking-[0.10em] flex items-center gap-1.5">
              <ChevronRight size={10} className="text-apricot-accent opacity-50" />
              [ SYSTEM INTEGRITY GATE ]
            </span>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-mono text-[9px] text-apricot-accent">READY SECURE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>
          
          <p className="font-sans text-[11px] text-apricot-text-dim leading-[1.5] text-center my-3 max-w-[220px] mx-auto">
            Test real-time systems integration signals and verify end-to-end active pipelines.
          </p>

          <button
            onClick={handleScan}
            disabled={isAnimating}
            className={`w-full h-[28px] mt-2 font-mono text-[9px] font-bold tracking-[0.1em] rounded flex items-center justify-center transition-all ${isAnimating ? 'opacity-80 cursor-wait' : 'hover:bg-apricot-accent/10 cursor-pointer'}`}
            style={{
              border: `1px solid ${isAnimating ? "transparent" : "var(--color-accent-primary)"}`,
              color: "var(--color-accent-primary)",
              backgroundColor: isAnimating ? "var(--color-accent-primary)" : "transparent",
            }}
          >
            <span className={isAnimating ? "text-apricot-bg" : "text-apricot-accent"}>
              {getButtonText()}
            </span>
          </button>
        </div>
      </div>

      {/* SECTION C — CONFLICT RECONCILIATIONS */}
      <div className="px-3 pt-3.5 flex-1 flex flex-col min-h-0 border-t border-apricot-border">
        <span className="font-mono text-[9px] text-apricot-text-dim tracking-[0.10em] shrink-0">
          [ CONFLICT RECONCILIATIONS ]
        </span>
        
        <div className="mt-2.5 flex-1 overflow-y-auto pr-1 hide-scrollbar">
          {tool && connectedProjects.length > 0 ? (
            connectedProjects.map(project => {
              const description = TOOL_PROJECT_DESCRIPTIONS[`${tool.id}-${project.id}`] || "System linked.";
              return (
                <div 
                  key={project.id}
                  className="flex gap-2 py-2.5"
                  style={{ borderBottom: "1px solid rgba(0,229,204,0.06)" }}
                >
                  <span className="font-mono text-[10px] text-[#00E5CC] shrink-0 mt-0.5">→</span>
                  <div>
                    <div className="font-mono text-[10px] font-medium text-[#00E5CC] uppercase">
                      {project.name}
                    </div>
                    <div className="font-sans text-[11px] text-[#4A6A80] mt-1 leading-[1.5]">
                      {description}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-4 text-[#4A6A80] font-mono text-[10px] text-center">
              NO ACTIVE CONFLICTS
            </div>
          )}
        </div>
        
        {/* BOTTOM HINT */}
        <div 
          className="mt-auto pt-3 pb-3 text-center"
          style={{ borderTop: "1px solid rgba(0,229,204,0.08)" }}
        >
          <span className="font-mono text-[9px] text-[#2A4055] tracking-[0.08em]">
            ⚙ SELECT SECTORS ON GRAPH TO ANALYZE TOPOLOGY
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scanPulse {
          0% { border-color: rgba(0,229,204,0.30); }
          50% { border-color: rgba(0,229,204,1.0); box-shadow: 0 0 16px rgba(0,229,204,0.5); }
          100% { border-color: rgba(0,229,204,0.30); }
        }
        .animate-scan-pulse {
          animation: scanPulse 0.5s ease infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </div>
  );
};
