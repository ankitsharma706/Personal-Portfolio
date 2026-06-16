import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TIMELINE, TimelineEntry } from "../lib/data";
import Eyebrow from "./Eyebrow";
import { Terminal, Shield, Network, Cpu, Lock } from "lucide-react";

export default function Timeline() {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  // Generate simulated ledger telemetry data based on milestone titles
  const getLedgerTelemetry = (year: string, title: string) => {
    switch (year) {
      case "2022":
        return {
          hash: "SHA256::d943fa1ec309f...c6b",
          status: "INTEGRITY_SUCCESS",
          speed: "115 TPS concurrency peak",
          payload: {
            engine: "Node.js v18.4 · MongoDB Atlas · React Redux",
            security: "Session tokens validated · CORS whitelist active",
            telemetry: "DB Queries <= 12ms",
            logs: ["SYS_START // Port: 3000 online", "DB_CONNECTION // MongoDB cluster sync OK", "SESSION_DAEMON // Ready"]
          }
        };
      case "2023":
        return {
          hash: "SHA256::3f8c8a12903fe...eac",
          status: "API_OPTIMIZED_60%",
          speed: "TensorFlow model inference: ~42ms",
          payload: {
            engine: "Python ML Pipeline · TensorFlow Lite · Redis",
            security: "Token-bucket rate-limiting active (100 req/min)",
            telemetry: "L2 Cache hit rate: 94.2%",
            logs: ["MODEL_LOAD // Loaded transit-traffic.tflite", "COORDINATES_INGRESS // GeoJSON validator ready", "CACHE_SYNC // Redis key invalidation mapped"]
          }
        };
      case "2023–2024":
        return {
          hash: "SHA256::e0a112dfbc941...aa3",
          status: "HIGH_AVAILABILITY_99.98%",
          speed: "Shift allocations solved < 120ms",
          payload: {
            engine: "Express.js · Python Optimization Node · Redis",
            security: "Enterprise session firewalls enabled",
            telemetry: "Total active concurrent worker threads: 12",
            logs: ["SOLVER_INIT // Bipartite match engine online", "GRAPH_EDGES_COUNT // 14,000 workforce vertices connected", "LATENCY_REGISTER // Edge solvers optimized"]
          }
        };
      case "2024":
        return {
          hash: "SHA256::bc109f298dae3...39b",
          status: "BYTECODE_COMPILED_GAS_OPTIMIZED",
          speed: "Gas execution score: 28,400 GWEI optimal",
          payload: {
            engine: "Ethereum Virtual Machine (EVM) · Solidity v0.8.20",
            security: "Non-reentrant custody controls established",
            telemetry: "Contracts statically verified via Slither tool",
            logs: ["COMPILER_OUT // EVM raw opcodes verified", "ESCROW_LOCK // Lock states set with escape timers", "SIG_COUNT // 2 of 3 multisig signatures mapped"]
          }
        };
      case "2024–2025":
        return {
          hash: "SHA256::ae3901bca280f...8f4",
          status: "REGULATORY_COMPLIANT_SHIELD",
          speed: "Clearing matching loop speed: ~15ms",
          payload: {
            engine: "Plaid bank API · Circle USDC clearing engines",
            security: "OFAC SDN daily tree sync and verify",
            telemetry: "Federal currency threshold triggers active",
            logs: ["PLAID_CONNECT // Depository auth bridges mapped", "USDC_VAULT_DELEGATION // ID matching ledger audit", "SANCTION_ALERTS // OFAC geo-block active"]
          }
        };
      case "2025":
        return {
          hash: "SHA256::f778a01bc9942...99d",
          status: "GNN_REDUCTION_70%_FALSE_POSITIVES",
          speed: "AML graph traversal: 45,000 subgraphs/s",
          payload: {
            engine: "PyTorch Geometric · FastAPI · LangChain AI Copilot",
            security: "Local node compliance shield with strict rules",
            telemetry: "False Positive anomaly threshold score: 0.12",
            logs: ["AI_MODEL_WAKE // PyTorch Graph model ready", "SAR_DRAFTING_AGENT // LLM structuring detector initialized", "ANOMALY_TRIGGER // Suspicious activity tracking ON"]
          }
        };
      case "NOW":
      default:
        return {
          hash: "SHA256::0x00E5CC_ACTIVE_ENTRY",
          status: "STANDBY_READY_FOR_COMMISSIONING",
          speed: "Latency: < 1ms global infrastructure runtime",
          payload: {
            engine: "Syne Display · JetBrains Mono Tech CLI Engine",
            security: "Zero-Trust authorization layer compiled",
            telemetry: "Availability state: Operational // Open to build",
            logs: ["TTY_WAKE // Terminal listener ready", "PORTFOLIO_SYSTEMS // All nodes green", "SYS_STATUS // Standby for founding engineer / co-founder calls"]
          }
        };
    }
  };

  return (
    <section
      id="timeline"
      className="bg-[var(--bg-secondary)] py-24 border-t border-apricot-border relative overflow-hidden"
    >
      {/* Visual background ambient line grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,122,110,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center mb-20 select-none animate-fadeIn">
          <Eyebrow text="PROJECT CHRONOLOGY" className="mb-4" />
          <h2 className="font-serif font-semibold text-apricot-text tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: "1.15" }}>
            A Ledger of Execution.
          </h2>
        </div>

        {/* Vertical timeline timeline blocks */}
        <div className="relative w-full max-w-4xl mx-auto">
          
          {/* Vertical spine line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-apricot-accent/25 via-white/5 to-transparent transform -translate-x-[0.5px]" />

          <div className="flex flex-col gap-12">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeSegmentIndex === index;
              const telemetry = getLedgerTelemetry(item.year, item.title);

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row lg:items-start ${
                    isEven ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Glowing center indicator dot */}
                  <div
                    onClick={() => setActiveSegmentIndex(isActive ? null : index)}
                    className={`absolute left-6 lg:left-1/2 w-4 h-4 rounded-full border-2 bg-apricot-bg transform -translate-x-[8px] z-20 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "border-apricot-accent scale-125 shadow-[0_0_12px_var(--color-accent-primary)]" 
                        : item.highlight 
                          ? "border-apricot-accent scale-110" 
                          : "border-apricot-border hover:border-apricot-accent"
                    }`}
                  >
                    {(item.highlight || isActive) && (
                      <span className="absolute inset-0 rounded-full bg-apricot-accent animate-ping opacity-75 pointer-events-none" />
                    )}
                  </div>

                  {/* Glassmorphism Timeline Card */}
                  <div
                    onClick={() => setActiveSegmentIndex(isActive ? null : index)}
                    className={`group cursor-pointer select-none relative p-6 bg-apricot-card/80 backdrop-blur-[16px] -webkit-backdrop-blur-[16px] border border-apricot-border/80 hover:border-apricot-accent/40 hover:bg-apricot-card rounded-xl w-[calc(100%-3rem)] ml-12 lg:ml-0 lg:w-[44%] text-left shadow-[0_0_0_1px_rgba(0,180,180,0.04),0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 ${
                      isEven ? "lg:mr-[6%]" : "lg:ml-[6%]"
                    }`}
                  >
                    {/* Spotlight glow inside cards */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-[radial-gradient(150px_circle_at_50%_50%,rgba(0,180,180,0.03)_0%,transparent_100%)]" />

                    <div className="relative z-10">
                      {/* Card Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                          item.highlight || isActive
                            ? "border-apricot-accent/20 bg-apricot-accent/10 text-apricot-accent"
                            : "border-apricot-border bg-white/[0.01] text-apricot-text-muted"
                        }`}>
                          {item.year}
                        </span>
                        
                        <span className="font-mono text-[9px] text-apricot-text-muted/50 group-hover:text-apricot-text-muted tracking-wider">
                          [ CLICK TO RESOLVE ]
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-serif font-bold text-[18px] text-apricot-text tracking-tight leading-snug">
                        {item.title}
                      </h3>

                      {/* Description Narrative */}
                      <p className="font-sans text-[13px] text-apricot-text-dim mt-3 leading-[1.65]">
                        {item.desc}
                      </p>

                      {/* Expandable Ledger Telemetry Block */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Keep logs interactive without closing card
                          >
                            <div className="border border-apricot-border bg-apricot-secondary/80 rounded-lg p-4 font-mono text-[10px] leading-relaxed text-apricot-text-dim space-y-3.5 select-text">
                              
                              {/* Header Title with lock */}
                              <div className="flex items-center gap-1.5 border-b border-apricot-border pb-1.5 text-apricot-accent">
                                <Terminal className="w-3.5 h-3.5" />
                                <span className="font-bold">LEDGER TRACE RESOLVED</span>
                                <Lock className="w-3 h-3 ml-auto text-apricot-accent-dim" />
                              </div>

                              {/* Target signatures */}
                              <div>
                                <span className="text-apricot-text-muted block">BLOCK_HASH & SIGNATURES:</span>
                                <span className="text-apricot-text break-all">{telemetry.hash}</span>
                              </div>

                              <div>
                                <span className="text-apricot-text-muted block">INTEGRITY_STATE:</span>
                                <span className="text-apricot-accent">{telemetry.status}</span>
                              </div>

                              <div>
                                <span className="text-apricot-text-muted block">LATENCY_SPEED:</span>
                                <span className="text-apricot-text">{telemetry.speed}</span>
                              </div>

                              {/* Payload breakdown */}
                              <div className="border-t border-apricot-border pt-3 space-y-1">
                                <span className="text-apricot-text-muted block">PAYLOAD_REGISTERS:</span>
                                <div><span className="text-apricot-accent-dim">&gt; ENGINE:</span> <span className="text-apricot-text">{telemetry.payload.engine}</span></div>
                                <div><span className="text-apricot-accent-dim">&gt; NETWORK:</span> <span className="text-apricot-text">{telemetry.payload.telemetry}</span></div>
                                <div><span className="text-apricot-accent-dim">&gt; SECURITY:</span> <span className="text-apricot-text">{telemetry.payload.security}</span></div>
                              </div>

                              {/* TTY Daemon logs */}
                              <div className="border-t border-apricot-border pt-3 space-y-0.5">
                                <span className="text-apricot-text-muted block">TTY_LOGS:</span>
                                {telemetry.payload.logs.map((logLine, idx) => (
                                  <div key={idx} className="text-apricot-text-muted">
                                    <span className="text-apricot-accent-dim">[OK]</span> {logLine}
                                  </div>
                                ))}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Left or Right hover target lines */}
                    <div className="absolute bottom-0 left-0 h-[1.5px] bg-apricot-accent w-0 group-hover:w-full transition-all duration-300" />
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
