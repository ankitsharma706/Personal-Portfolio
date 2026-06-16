/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Database,
  ArrowRight,
  Terminal,
  RefreshCw,
  Info,
  DollarSign,
  Briefcase,
  AlertTriangle
} from "lucide-react";

interface SynthesizedComponent {
  name: string;
  category: string;
  specs: string[];
  latency: string;
  protocol: string;
}

interface SynthesizedData {
  title: string;
  tagline: string;
  overview: string;
  components: SynthesizedComponent[];
  dataFlow: { from: string; to: string; label: string }[];
  fiduciaryPath: string;
  riskMitigation: string;
}

const SUGGESTIONS = [
  "High-throughput commodity rail ledger for coal & steel shipping",
  "Verifiable carbon-offset tokenization with zero-knowledge credentials",
  "Real-time grid priority routing pipeline for 50k autonomous buses"
];

const PREBAKED_SYSTEM: SynthesizedData = {
  title: "Aegis Ledger & Liquidity Engine",
  tagline: "High-throughput fiat-to-USDC compliance settlement bridge",
  overview: "An event-driven dual-ledger accounting system engineered to settle cross-border logistics invoices. Features parallel reentrancy guards, memory queue transaction buffers, and continuous FinCEN sanctions testing before state finality.",
  components: [
    {
      name: "Client Cryptographic Node",
      category: "Endpoint Edge",
      specs: [
        "In-browser BIP-44 key generation and ECDSA signatures",
        "Deterministic local payload locking preventing replay intercepts",
        "Payload sequence nonce tagging to defeat replay injections"
      ],
      latency: "< 3ms local",
      protocol: "JSON-RPC Protocol"
    },
    {
      name: "Idempotent Gateway API",
      category: "Ingestion Routing",
      specs: [
        "Stateful rate limiting with sliding Redis memory tokens",
        "Strict JWT payload check with signature validation",
        "Double-spend verification filters logging pending nonces"
      ],
      latency: "< 8ms gateway",
      protocol: "HTTPS / TLS 1.3"
    },
    {
      name: "Compliance Audit Stream",
      category: "OFAC Controls",
      specs: [
        "Jaro-Winkler name fuzzing matching active FinCEN SDN files",
        "Geographic IP range blocks tracking proxy anomalies",
        "Real-time transaction freezing events emitting logs"
      ],
      latency: "< 14ms stream",
      protocol: "Secure gRPC"
    },
    {
      name: "Liquid Custody Vault",
      category: "Smart Ledger",
      specs: [
        "Multi-signature custody routing rules via EVM smart contracts",
        "Strict reentrancy protection blocks using gas bounds",
        "Automated stablecoin mint/burn callbacks with Circle APIs"
      ],
      latency: "EVM Block (~12s)",
      protocol: "EVM Bytecode"
    },
    {
      name: "Fedwire Ledger Connector",
      category: "Legacy Bank Bridge",
      specs: [
        "Insured omnibus deposits tracking custodial account balances",
        "Plaid API integration verifying bank credential linkages",
        "Fedwire instant settlements routing files during operating hours"
      ],
      latency: "1-2 Business Hours",
      protocol: "Fedwire Network"
    }
  ],
  dataFlow: [
    { from: "Client Cryptographic Node", to: "Idempotent Gateway API", label: "Signed payload stream" },
    { from: "Idempotent Gateway API", to: "Compliance Audit Stream", label: "Sanction match audit" },
    { from: "Compliance Audit Stream", to: "Liquid Custody Vault", label: "Consensus emission order" },
    { from: "Liquid Custody Vault", to: "Fedwire Ledger Connector", label: "Bank ACH trigger" }
  ],
  fiduciaryPath: "The transactional stream starts at the secure Client Node where the user authorizes payment. The Idempotent Gateway API intercepts inputs, calling Plaid API to securely link authenticated US bank accounts. Once verified, the gateway fires programmatic stablecoin minting parameters, triggering Circle APIs to instantly convert USD to USDC on-chain. Fiduciary assets are safeguarded inside FDIC-insured depository omnibus reserve bank accounts, with audited transaction states immutably recorded inside both our relational ledger databases and the EVM state logs.",
  riskMitigation: "To prevent reentrancy and transaction state drift, all Ledger smart contracts utilize strict Solidity mutex locks and reentrancy guards. All ingestion endpoints enforce database unique constraint indexes to prevent double-processing. Sanction risk is managed via an active integration with continuous FinCEN SDN list trees, executing Jaro-Winkler fuzzy text comparisons with a strict match factor of 0.88; any potential violation automatically triggers a custody freeze event and drafts a secure Suspicious Activity Report (SAR) template."
};

export default function AISynthesisLab() {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [systemData, setSystemData] = useState<SynthesizedData>(PREBAKED_SYSTEM);
  const [selectedComponentIdx, setSelectedComponentIdx] = useState<number>(0);
  const [apiReady, setApiReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkSvc() {
      try {
        const res = await fetch("/api/gemini/ready");
        const out = await res.json();
        setApiReady(!!out?.ready);
      } catch (err) {
        setApiReady(false);
      }
    }
    checkSvc();
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          return 3;
        }
        return prev + 1;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, [loading]);

  const loadingSteps = [
    "INTERCEPTING INTENT & RESOLVING ARCHITECTURAL PATTERNS...",
    "GEOMETRICALLY COMPILING INTERACTIVE COMPONENTS TOPOLOGY...",
    "CONSTRUCTING SECURE PLAIDS-TO-CIRCLE FIDUCIARY LIQUIDITY RAILS...",
    "VALIDATING SYSTEM COMPLIANCE AND OFAC SANCTION CHECKS..."
  ];

  async function handleSynthesize() {
    if (!problem.trim()) return;
    
    setLoading(true);
    setLoadStep(0);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/gemini/synthesize-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: problem.trim() })
      });

      const resBody = await response.json();
      
      if (!response.ok) {
        throw new Error(resBody.message || resBody.error || "Synthesis request failed.");
      }

      if (resBody.success && resBody.data) {
        setSystemData(resBody.data);
        setSelectedComponentIdx(0);
      } else {
        throw new Error("Invalid output layout returned by synthesize pipeline.");
      }

    } catch (err: any) {
      console.warn("AI synthesis failed, engaging robust pre-baked fallback:", err);
      setErrorMessage(`Gemini Synthesis fell back to sandbox: ${err.message || "Connection timeout."}`);
      
      const customizedBackup = { ...PREBAKED_SYSTEM };
      if (problem.toLowerCase().includes("carbon") || problem.toLowerCase().includes("credit")) {
        customizedBackup.title = "Veridian Carbon Exchange Layer";
        customizedBackup.tagline = "Double-spend resistant ZK-wrapped carbon credit ledger";
      } else if (problem.toLowerCase().includes("bus") || problem.toLowerCase().includes("grid") || problem.toLowerCase().includes("traffic")) {
        customizedBackup.title = "Dynamic grid congestion router";
        customizedBackup.tagline = "Budapest bipartite resource scheduler with edge-TFLite evaluation";
      }
      setSystemData(customizedBackup);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }

  const getNodeCoordinates = (index: number, total: number) => {
    const centerX = 230;
    const centerY = 110;
    const radius = 78;
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  return (
    <div className="mt-24 border-t border-apricot-border pt-20">
      
      {/* Title section */}
      <div className="flex flex-col items-center text-center mb-12 select-none">
        <div className="inline-flex items-center gap-1.5 bg-apricot-accent/5 border border-apricot-border px-3 py-1 rounded text-[10px] font-mono text-apricot-accent uppercase tracking-wider mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-apricot-accent" />
          AI ENGINE INTEGRATED MULTI-PERSONA CO-PILOT
        </div>
        <h3 
          className="font-serif italic font-medium text-apricot-text mt-3"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", lineHeight: "1.15" }}
        >
          Systems Design Synthesis Lab
        </h3>
        <p className="font-sans text-xs sm:text-sm text-apricot-text-muted mt-2 max-w-xl">
          State your custom constraints: industrial rosters, spatial predictions, or clearing ledgers. The server-side Gemini intelligence compiles compliant software topologies in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto text-left">
        
        {/* Left Input Console (Full width/max width centered) */}
        <div className="xl:col-span-12 lg:col-span-12 flex flex-col gap-6 max-w-4xl mx-auto w-full">
          
          <div className="premium-card p-6 bg-apricot-card border border-apricot-border rounded flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-apricot-secondary/20 bg-[radial-gradient(rgba(192,79,131,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
            
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between pb-3.5 border-b border-apricot-border mb-4 select-none">
                <span className="font-mono text-[10px] text-apricot-accent font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-apricot-accent" />
                  SYSTEM INTEGRITY DICTIONARY INPUTS
                </span>
                <span className="font-mono text-[9px] text-apricot-text-dim">
                  {apiReady ? "● SECURE_CHANNEL::LOADED" : "● LOCAL_SANDBOX_STABLE"}
                </span>
              </div>

              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="State your heavy-industry or fintech project problem (e.g., 'We need to clear real-time safety credentials for 15,000 metallurgical steel plant workers and ledger audit hashes securely on-chain.')"
                className="w-full h-24 bg-apricot-secondary border border-apricot-border focus:border-apricot-accent rounded p-3 text-xs text-apricot-text placeholder-apricot-text-dim focus:outline-none focus:ring-1 focus:ring-apricot-accent/20 resize-none font-sans"
              />

              {/* Suggestion Pills */}
              <div className="mt-4">
                <span className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold block mb-2 select-none">
                  // PREPARED SIMILES REGISTER:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setProblem(s)}
                      className="text-left font-mono text-[10px] text-apricot-text-muted bg-apricot-bg hover:text-apricot-accent hover:bg-apricot-secondary border border-apricot-border rounded px-3 py-1.5 transition-colors cursor-pointer select-none"
                    >
                      ▪ {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error messages if any */}
              {errorMessage && (
                <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded text-[10px] font-mono text-red-750 flex items-center gap-1.5 leading-tight">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action trigger */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-apricot-border pt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-apricot-text-dim select-none">
                  <Info className="w-3.5 h-3.5 text-apricot-accent" />
                  <span>Validates cryptographic balance structures automatically.</span>
                </div>
                <button
                  onClick={handleSynthesize}
                  disabled={loading || !problem.trim()}
                  className={`px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 outline-none border cursor-pointer select-none ${
                    loading || !problem.trim()
                      ? "bg-apricot-secondary border-apricot-border text-apricot-text-dim/50 cursor-not-allowed"
                      : "bg-apricot-card text-apricot-accent border-apricot-accent hover:bg-apricot-accent hover:text-apricot-card shadow-sm active:scale-98"
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Compiling System Graph...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Synthesize System Topology</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Real-time Loading Terminal Panel */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading-terminal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="xl:col-span-12 bg-[#2B221D] border border-apricot-accent/40 rounded p-8 min-h-[460px] flex flex-col justify-between text-left font-mono text-apricot-bg"
            >
              <div className="space-y-4">
                {/* Header indicators */}
                <div className="flex items-center justify-between text-[10px] text-apricot-secondary/40 border-b border-apricot-secondary/10 pb-4">
                  <span className="flex items-center gap-1.5 font-bold text-apricot-secondary">
                    <span className="w-2 h-2 rounded-full bg-apricot-accent animate-ping" />
                    CO-PILOT INTENT PARSING COMPILER
                  </span>
                  <span>TEL_LOG_ACTIVE // ID: 0x99FF</span>
                </div>

                <div className="text-[12px] space-y-3 pt-4">
                  {loadingSteps.map((step, idx) => {
                    const isDone = loadStep > idx;
                    const isActive = loadStep === idx;
                    
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-3 transition-opacity duration-300 ${
                          isDone ? "text-apricot-text-dim opacity-55" : isActive ? "text-apricot-accent font-bold" : "text-apricot-text-muted"
                        }`}
                      >
                        <span className="shrink-0">{isDone ? "✔" : isActive ? "➔" : "▪"}</span>
                        <span className="break-words leading-relaxed">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Flow loader graphics */}
              <div className="w-full max-w-sm mt-8 border border-apricot-border/10 bg-apricot-text/30 p-4 rounded flex items-center gap-4">
                <RefreshCw className="w-5 h-5 text-apricot-accent animate-spin" />
                <span className="text-[11px] text-apricot-secondary/80 leading-relaxed">
                  Evaluating relational tables, idempotency queues, cryptographic keys, and peer settlement rails...
                </span>
              </div>
            </motion.div>
          ) : (
            
            /* Interactive Output Console (Full Width 12 Columns when finished) */
            <motion.div
              key="compiled-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2"
            >
              
              {/* Primary Output Deck (8 Columns) */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Evocative Header Box */}
                <div className="premium-card p-6 bg-apricot-card border border-apricot-border rounded text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] text-apricot-accent tracking-widest font-bold">
                      [ COMPILED SYSTEM TOPOLOGY REGISTRY ]
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-apricot-accent" />
                  </div>
                  <h2 className="font-serif italic font-medium text-lg sm:text-2xl text-apricot-text leading-tight">
                    {systemData.title}
                  </h2>
                  <p className="font-sans text-apricot-accent text-xs font-bold uppercase tracking-wider mt-1.5">
                    ➔ {systemData.tagline}
                  </p>
                  
                  <p className="font-sans text-apricot-text-muted text-xs sm:text-sm mt-4 border-t border-apricot-border pt-4 leading-relaxed">
                    {systemData.overview}
                  </p>
                </div>

                {/* SVG Vector Topology Graph */}
                <div className="premium-card bg-apricot-card border border-apricot-border rounded p-6 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
                  
                  <style>{`
                    @keyframes pathLaser {
                      0% { stroke-dashoffset: 40; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .svg-signal-path {
                      stroke: #C04F83;
                      stroke-width: 1.5;
                      stroke-dasharray: 6, 6;
                      animation: pathLaser 4s linear infinite;
                    }
                    .svg-signal-path-dim {
                      stroke: #E6D8CA;
                      stroke-width: 1;
                    }
                  `}</style>

                  <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-dim border-b border-apricot-border pb-3 mb-4 select-none">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-apricot-accent rounded-full inline-block" />
                      INTELLIGENCE TOPOLOGY ARCHITECTURE MAP
                    </span>
                    <span>VERIFIED GRAPH NODES: {systemData.components.length}</span>
                  </div>

                  <div className="relative w-full flex-grow h-[220px] flex items-center justify-center select-none">
                    
                    {/* SVG Connections and Lines Overlay */}
                    <svg className="absolute inset-0 w-full h-full text-apricot-accent" viewBox="0 0 460 220" preserveAspectRatio="none">
                      {systemData.components.map((_, idx) => {
                        if (idx === systemData.components.length - 1) return null;
                        
                        const coordFrom = getNodeCoordinates(idx, systemData.components.length);
                        const coordTo = getNodeCoordinates(idx + 1, systemData.components.length);
                        
                        const isPrimaryFlow = selectedComponentIdx === idx || selectedComponentIdx === idx + 1;
                        
                        return (
                          <path
                            key={idx}
                            d={`M ${coordFrom.x} ${coordFrom.y} C ${(coordFrom.x + coordTo.x)/2} ${coordFrom.y}, ${(coordFrom.x + coordTo.x)/2} ${coordTo.y}, ${coordTo.x} ${coordTo.y}`}
                            fill="none"
                            className={isPrimaryFlow ? "svg-signal-path" : "svg-signal-path-dim"}
                          />
                        );
                      })}
                    </svg>

                    {/* Nodes Array representation */}
                    {systemData.components.map((c, idx) => {
                      const coord = getNodeCoordinates(idx, systemData.components.length);
                      const isSelected = selectedComponentIdx === idx;
                      
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedComponentIdx(idx)}
                          className={`absolute flex flex-col items-center justify-center cursor-pointer z-10`}
                          style={{
                            left: `${(coord.x / 460) * 100}%`,
                            top: `${(coord.y / 220) * 100}%`,
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                              isSelected 
                                ? "bg-apricot-secondary border-apricot-accent text-apricot-accent shadow-sm" 
                                : "bg-apricot-card border-apricot-border text-apricot-text-muted hover:border-apricot-accent/60"
                            }`}
                          >
                            <span className="font-mono text-xs font-bold">{idx + 1}</span>
                          </motion.div>
                          
                          <span className={`font-mono text-[8px] mt-1.5 uppercase font-bold p-1 px-1.5 bg-[#FFFDF9] rounded border border-apricot-border whitespace-nowrap max-w-[110px] truncate ${
                            isSelected ? "text-apricot-accent" : "text-apricot-text-dim"
                          }`}>
                            {c.name}
                          </span>
                        </div>
                      );
                    })}

                  </div>

                  <div className="mt-4 pt-3 border-t border-apricot-border font-mono text-[8px] text-apricot-text-dim text-center uppercase tracking-widest select-none">
                    ⚡ SELECT ANY INTEGRITY NODE TO INSPECT SECURE MODULE INFORMATION IN DETAIL
                  </div>

                </div>

                {/* Secure Compliance & Risk Mitigation Section */}
                <div className="premium-card p-6 bg-apricot-card border border-apricot-border rounded text-left">
                  <div className="flex items-center gap-2 mb-4 select-none">
                    <ShieldAlert className="w-4.5 h-4.5 text-apricot-accent" />
                    <span className="font-mono text-[9px] text-apricot-accent tracking-widest uppercase font-extrabold">
                      RISK CONTROLS & COMPLIANCE BOUNDARIES
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-[13px] text-apricot-text-muted leading-relaxed">
                    {systemData.riskMitigation}
                  </p>
                </div>

              </div>

              {/* Right Details Deck (4 Columns) */}
              <div className="lg:col-span-4 flex flex-col gap-6 justify-between h-full">
                
                {/* Segment component specification details */}
                <div className="premium-card bg-apricot-card border border-apricot-border rounded p-6 text-left h-full flex flex-col justify-between">
                  
                  <div>
                    <div className="border-b border-apricot-border pb-3 mb-4 font-mono text-[9px] text-apricot-text-dim flex justify-between uppercase select-none">
                      <span>SPECIFICATION LOG</span>
                      <span>NODE REQ: 0{selectedComponentIdx + 1}</span>
                    </div>

                    <div className="flex items-center gap-2.5 bg-apricot-secondary border border-apricot-border p-3 rounded mb-5 select-none">
                      <div className="p-2 bg-apricot-card border border-apricot-border rounded text-apricot-accent">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-sans font-bold text-[12px] text-apricot-text uppercase tracking-wide truncate">
                          {systemData.components[selectedComponentIdx]?.name}
                        </h4>
                        <span className="font-mono text-[8px] text-apricot-accent uppercase tracking-wider block font-semibold">
                          {systemData.components[selectedComponentIdx]?.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold block mb-2.5 select-none">
                        [ COMPLIANT SPECS INVENTORY ]
                      </span>
                      <ul className="space-y-3 pr-1">
                        {systemData.components[selectedComponentIdx]?.specs.map((spec, index) => (
                          <li key={index} className="font-sans text-[11px] text-apricot-text-muted leading-relaxed flex items-start gap-1.5">
                            <span className="text-apricot-accent font-bold mt-0.5 shrink-0">▪</span>
                            <span className="shrink-1">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-apricot-border space-y-2 select-none">
                    <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-muted">
                      <span>LATENCY PROFILE:</span>
                      <span className="p-0.5 px-1.5 bg-apricot-accent/5 border border-apricot-accent/20 rounded text-apricot-accent font-bold">
                        {systemData.components[selectedComponentIdx]?.latency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-muted">
                      <span>WIRE PROTOCOL:</span>
                      <span className="font-bold text-apricot-text uppercase">
                        {systemData.components[selectedComponentIdx]?.protocol}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Dynamic Fiduciary Stablecoin Clearing Rail diagram */}
                <div className="premium-card p-6 bg-apricot-secondary/40 border border-apricot-border rounded text-left h-full flex flex-col justify-between">
                  
                  <div>
                    <div className="flex items-center justify-between pb-3.5 border-b border-apricot-border mb-4 select-none">
                      <span className="font-mono text-[10px] text-apricot-accent font-extrabold uppercase tracking-wide flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-apricot-accent" />
                        FIDUCIARY TRANSACTION PIPELINE
                      </span>
                    </div>

                    <div className="bg-apricot-card border border-apricot-border rounded p-3 flex items-center justify-between gap-1.5 font-mono text-[8px] text-apricot-text-muted mb-4 select-none">
                      <div className="flex flex-col items-center gap-0.5 shrink-0 p-1 px-1.5 bg-apricot-secondary rounded border border-apricot-border">
                        <span className="text-apricot-accent font-bold">PLAID</span>
                        <span>LINK</span>
                      </div>
                      <span className="text-emerald-700 font-semibold shrink-0">➔ ACH ➔</span>
                      <div className="flex flex-col items-center gap-0.5 shrink-0 p-1 px-1.5 bg-apricot-secondary rounded border border-apricot-accent/20">
                        <span className="text-apricot-accent font-bold">CIRCLE</span>
                        <span>MINT</span>
                      </div>
                      <span className="text-emerald-700 font-semibold shrink-0">➔ USDC ➔</span>
                      <div className="flex flex-col items-center gap-0.5 shrink-0 p-1 px-1.5 bg-apricot-secondary rounded border border-apricot-border">
                        <span className="text-apricot-text font-bold">LEDGER</span>
                        <span>FINALITY</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-apricot-text-muted leading-relaxed">
                      {systemData.fiduciaryPath}
                    </p>
                  </div>

                </div>

              </div>
              
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
