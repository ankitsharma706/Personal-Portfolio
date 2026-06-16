/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { TECH_STACK, PROJECTS, Project } from "../lib/data";
import { 
  Hammer, 
  Brain, 
  Cpu, 
  Layers, 
  Activity, 
  Database, 
  Globe, 
  ShieldAlert, 
  Network, 
  ArrowRight, 
  CornerDownRight, 
  CheckCircle2,
  Sliders,
  Sparkles,
  Terminal
} from "lucide-react";

// Web Audio API custom computer-sound chimer for terminal simulation feedback
function playAudioTick(frequency: number, type: OscillatorType = "sine", duration: number = 0.08) {
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Smooth elegant, highly comfortable low hardware-feedback tone
    gain.gain.setValueAtTime(0.006, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Fail silently when browser security controls prevent audio context instantiation before user interaction
  }
}

// Definitions of the 8 core technologies mapped
interface TechNode {
  id: string;
  name: string;
  category: string;
  desc: string;
}

const TECH_NODES: TechNode[] = [
  { id: "Python", name: "Python", category: "AI & Data Science", desc: "Scientific scripting, Graph Neural Networks, and mathematical modeling." },
  { id: "Solidity", name: "Solidity", category: "Decentralized Ledger", desc: "EVM compatible secure smart contracts and asset custody logic." },
  { id: "React & Next.js", name: "React & Next.js", category: "Core Frontend", desc: "Server-side rendering, responsive interfaces, and state synchronization." },
  { id: "Redis", name: "Redis", category: "Streaming & Cache", desc: "Distributed sliding indexes, in-memory queues, and real-time streaming." },
  { id: "MongoDB", name: "MongoDB", category: "Database Layer", desc: "Flexible high-performance analytical document storage." },
  { id: "Plaid & Circle API", name: "Plaid & Circle API", category: "Fintech Integration", desc: "Fiat ACH pipeline connectors and programmable USD stablecoin bridges." },
  { id: "ZKP Tools", name: "ZKP Tools", category: "Asset Cryptography", desc: "Zero-knowledge verification structures (Circom and SnarkJS)." },
  { id: "Firebase", name: "Firebase", category: "Application Backend", desc: "Document synchronization events and native client validation security." },
];

// Bidirectional connections mapping
interface Connection {
  tech: string;
  project: string;
  notes: string;
}

const CONNECTIONS: Connection[] = [
  // Urban Flow AI
  { tech: "Python", project: "urban-flow", notes: "Builds transit spatial predictive algorithms and processes coordinates with TensorFlow Lite." },
  { tech: "React & Next.js", project: "urban-flow", notes: "Renders spatial maps, routing consoles, and actual transit statistics." },
  { tech: "Redis", project: "urban-flow", notes: "Speeds up spatial indexing and serves dynamic pub-sub updates." },
  { tech: "Firebase", project: "urban-flow", notes: "Syncs active GPS location states and real-time notification prompts." },
  { tech: "MongoDB", project: "urban-flow", notes: "Stores historical traffic vectors, city paths, and sensor registries." },

  // DeFi Banking Gateway
  { tech: "Solidity", project: "defi-gateway", notes: "Drafts custody smart contracts, on-chain balances, and gas-efficient stablecoin locks." },
  { tech: "React & Next.js", project: "defi-gateway", notes: "Powers fintech portals, Plaid widgets, and direct ledger action controls." },
  { tech: "Redis", project: "defi-gateway", notes: "Implements high-speed security logs and transactional duplicate-locking flags." },
  { tech: "Plaid & Circle API", project: "defi-gateway", notes: "Directly bridges US bank accounts and automates USDC mint/burn orders." },
  { tech: "MongoDB", project: "defi-gateway", notes: "Persists transaction audits, legal AML profiles, and compliance registries." },

  // AML Intelligence Engine
  { tech: "Python", project: "aml-engine", notes: "Powers GNN structures in PyTorch Geometric to detect structuring and patterns." },
  { tech: "React & Next.js", project: "aml-engine", notes: "Powers an interactive compliance workspace with graphical data flows." },
  { tech: "MongoDB", project: "aml-engine", notes: "Saves high-dimensional bank transactions and suspicious alert trees." },

  // ASSAVA Workforce Platform
  { tech: "React & Next.js", project: "assava", notes: "Drives industrial rosters, shift checkers, and mill metrics." },
  { tech: "Python", project: "assava", notes: "Executes Budapest bipartite matrix matching for optimization rosters." },
  { tech: "Redis", project: "assava", notes: "Caches fast factory statuses and cross-zone shift locking signals." },
  { tech: "MongoDB", project: "assava", notes: "Holds employee shift calendars, plant compliance records, and credentials." },
  { tech: "Firebase", project: "assava", notes: "Maintains Safety Checklist notifications and instant workforce alerts." },

  // On-Chain Identity Protocol
  { tech: "Solidity", project: "onchain-identity", notes: "Implements public registry verification keys and storage trees on Ethereum." },
  { tech: "React & Next.js", project: "onchain-identity", notes: "Creates decentralized wallet authentication dashboard layouts." },
  { tech: "ZKP Tools", project: "onchain-identity", notes: "Fires Circom compiling and client-side zk-SNARK proof derivations." },

  // Caffenia
  { tech: "React & Next.js", project: "caffenia", notes: "Builds ultra-fast commercial checkout pages, carts, and product cards." },
  { tech: "Firebase", project: "caffenia", notes: "Validates active customer sessions and user login authentications." },
  { tech: "MongoDB", project: "caffenia", notes: "Keeps clean inventory arrays, tags lists, and processed invoices." }
];

// Helper to resolve specific icons dynamically
function getTechIcon(id: string, className?: string) {
  switch (id) {
    case "Python": return <Brain className={className} />;
    case "Solidity": return <Cpu className={className} />;
    case "React & Next.js": return <Layers className={className} />;
    case "Redis": return <Activity className={className} />;
    case "MongoDB": return <Database className={className} />;
    case "Plaid & Circle API": return <Globe className={className} />;
    case "ZKP Tools": return <ShieldAlert className={className} />;
    case "Firebase": return <Network className={className} />;
    default: return <Activity className={className} />;
  }
}

function getProjectIcon(id: string, className?: string) {
  switch (id) {
    case "urban-flow": return <Globe className={className} />;
    case "defi-gateway": return <Cpu className={className} />;
    case "aml-engine": return <ShieldAlert className={className} />;
    case "assava": return <Activity className={className} />;
    case "onchain-identity": return <Layers className={className} />;
    case "caffenia": return <Database className={className} />;
    default: return <Cpu className={className} />;
  }
}

export default function TechStack() {
  // Navigation active state - can be a selected tech or selected project ID
  const [activeTech, setActiveTech] = useState<string | null>("Python");
  const [activeProj, setActiveProj] = useState<string | null>(null);

  // High-fidelity active sweeps testing states
  const [isTesting, setIsTesting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Sound sweep sequences and logging
  const runTelemetrySweep = () => {
    if (isTesting) return;
    setIsTesting(true);
    setConsoleLogs(["➔ INITIATING PIPELINE SWEEP CONSOLE ROUTE..."]);
    
    // Play warm electronic initial activation sweep chimes
    playAudioTick(240, "sine", 0.08);

    const activeNodeName = activeTech 
      ? TECH_NODES.find(t => t.id === activeTech)?.name || "" 
      : PROJECTS.find(p => p.id === activeProj)?.name || "";

    const diagnosticSteps = [
      `➔ ACCESS PORT 3000 CONSOLE HANDSHAKE ESTABLISHED`,
      `➔ VERIFYING COMPRESSION FORMAT: GOB / BSON BUFFER`,
      `➔ DISPATCHING SIMULATED PACKETS ALONG TOPOLOGY CURVES`,
      `➔ BOUND NODE COMMITS: ${activeNodeName || "UNIVERSAL"} DISCONNECTED FAULT: 0`,
      `➔ REDIS IDEMPOTENCY LOCK ACQUIRED IN 0.35ms`,
      `➔ SUCCESS: SYSTEM TOPOLOGY SECURE & VERIFIED`
    ];

    diagnosticSteps.forEach((logMessage, idx) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, logMessage]);
        // Trigger classy digital micro telemetry beep progression
        const freqStep = 320 + (idx * 120);
        playAudioTick(freqStep, "sine", 0.05);
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsTesting(false);
    }, (diagnosticSteps.length + 1) * 350);
  };

  // Trigger smooth scrolling to targeted layout elements
  function handleScrollToSection(id: string) {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Determine connected states
  const connectedProjects = activeTech 
    ? CONNECTIONS.filter(c => c.tech === activeTech).map(c => c.project) 
    : activeProj 
      ? [activeProj] 
      : [];

  const connectedTechs = activeProj 
    ? CONNECTIONS.filter(c => c.project === activeProj).map(c => c.tech) 
    : activeTech 
      ? [activeTech] 
      : [];

  // Active Connection detail lists
  const currentDetails = CONNECTIONS.filter(c => {
    if (activeTech) return c.tech === activeTech;
    if (activeProj) return c.project === activeProj;
    return false;
  });

  const selectedNodeName = activeTech 
    ? TECH_NODES.find(t => t.id === activeTech)?.name || "" 
    : PROJECTS.find(p => p.id === activeProj)?.name || "";

  const selectedNodeCategory = activeTech 
    ? TECH_NODES.find(t => t.id === activeTech)?.category || "" 
    : PROJECTS.find(p => p.id === activeProj)?.type || "";

  const selectedNodeDesc = activeTech 
    ? TECH_NODES.find(t => t.id === activeTech)?.desc || "" 
    : PROJECTS.find(p => p.id === activeProj)?.desc || "";

  // Coordinate indexes for drawing the vector SVG map nicely
  const getTechYIndex = (techId: string) => TECH_NODES.findIndex(t => t.id === techId);
  const getProjYIndex = (projId: string) => PROJECTS.findIndex(p => p.id === projId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section
      id="stack"
      className="bg-apricot-bg py-24 relative overflow-hidden border-b border-apricot-border"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(192,79,131,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        {/* <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="font-mono text-[10px] font-bold text-apricot-accent tracking-[0.25em] uppercase">
            [ INFRASTRUCTURE INTEGRITY INTERGON ENGINE ]
          </span>
          <h2 
            className="font-serif italic font-medium text-apricot-text mt-3"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: "1.15" }}
          >
            Ecosystem Pipeline Interconnects
          </h2>
          <p className="font-sans text-xs sm:text-sm text-apricot-text-muted mt-2 max-w-lg leading-relaxed">
            Interact with the topological canvas below to verify how languages, APIs, and caching databases feed concrete technical platforms.
          </p>
        </div> */}

        {/* 1. INTERACTIVE SYSTEM CONNECTION NODES MAP */}
        {/* <div className="mb-24">
          
          <div className="flex items-center gap-2 mb-6 select-none">
            <Sliders className="w-4.5 h-4.5 text-apricot-accent" />
            <span className="font-mono text-[10px] font-bold text-apricot-text-dim tracking-wider uppercase">
              TOPOLOGICAL DATA ROUTING GRAPH // REAL-TIME SYSTEM TRACES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            
            <div className="lg:col-span-8 bg-apricot-card border border-apricot-border rounded p-6 relative overflow-hidden flex flex-col justify-between min-h-[580px]">
              
            
              <style>{`
                @keyframes signalPacketFlow {
                  0% { stroke-dashoffset: 40; }
                  100% { stroke-dashoffset: 0; }
                }
                .laser-active {
                  stroke: #B8436E;
                  stroke-width: 2;
                  stroke-dasharray: 6, 6;
                  fill: none !important;
                  animation: signalPacketFlow 2s linear infinite;
                  filter: drop-shadow(0 0 2px rgba(184, 67, 110, 0.15));
                }
                .laser-dim {
                  stroke: #E0D0BE;
                  stroke-width: 1;
                  fill: none !important;
                  transition: stroke 0.4s ease;
                }
                .laser-highlighted {
                  stroke: rgba(184, 67, 110, 0.25);
                  stroke-width: 1.2;
                  fill: none !important;
                  stroke-dasharray: 4, 4;
                }
                @keyframes packetTravel {
                  0% {
                    offset-distance: 0%;
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  95% {
                    opacity: 1;
                  }
                  100% {
                    offset-distance: 100%;
                    opacity: 0;
                  }
                }
                .packet-dot {
                  offset-rotate: auto;
                  filter: drop-shadow(0px 0px 1px #B8436E);
                }
              `}</style>
              <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-dim border-b border-apricot-border pb-3 mb-6 relative z-10 select-none">
                <span className="flex items-center gap-1.5 min-w-[120px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-apricot-text-dim"></span>
                  CORE INTERPRETERS & TOOLS
                </span>
                <span className="text-center font-bold tracking-widest text-apricot-accent">
                  TOPOLOGY COUPLINGS
                </span>
                <span className="flex items-center gap-1.5 justify-end min-w-[120px] text-right">
                  RECONCILED PLATFORMS
                  <span className="w-1.5 h-1.5 rounded-full bg-apricot-accent"></span>
                </span>
              </div>

              <div className="relative w-full flex-grow flex items-stretch md:flex-row flex-col gap-6">


                <div className="flex flex-col justify-between h-full w-full md:w-[32%] relative z-10 gap-3">
                  {TECH_NODES.map((tech) => {
                    const isSelected = activeTech === tech.id;
                    const isConnected = connectedTechs.includes(tech.id);
                    const activeState = isSelected 
                      ? "border-apricot-accent bg-apricot-accent/5 text-apricot-text" 
                      : isConnected 
                      ? "border-apricot-accent/50 bg-apricot-accent/2 text-apricot-text" 
                      : "border-apricot-border hover:border-apricot-accent text-apricot-text-muted";

                    return (
                      <button
                        key={tech.id}
                        onClick={() => {
                          setActiveTech(tech.id);
                          setActiveProj(null);
                        }}
                        className={`w-full premium-card border px-3 py-2.5 rounded flex items-center gap-2.5 transition-all duration-300 text-left outline-none cursor-pointer group relative ${activeState}`}
                      >
                        {isSelected && (
                          <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-apricot-accent rounded-full"></span>
                        )}
                        <div className={`p-1.5 rounded bg-apricot-secondary border shrink-0 transition-colors ${isSelected ? "border-apricot-accent/40 text-apricot-accent" : "border-apricot-border text-apricot-text-muted group-hover:text-apricot-accent"}`}>
                          {getTechIcon(tech.id, "w-4 h-4")}
                        </div>
                        <div className="truncate">
                          <h4 className="font-sans font-bold text-xs uppercase tracking-wide truncate">{tech.name}</h4>
                          <span className="font-mono text-[8.5px] text-apricot-text-dim uppercase truncate block">{tech.category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="hidden md:block absolute inset-0 pointer-events-none select-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {CONNECTIONS.map((conn, idx) => {
                      const techIdx = getTechYIndex(conn.tech);
                      const projIdx = getProjYIndex(conn.project);

                      if (techIdx === -1 || projIdx === -1) return null;

                      // Derive Y node percentages
                      const totalTech = TECH_NODES.length;
                      const totalProj = PROJECTS.length;

                      const yTech = (techIdx * (90 / (totalTech - 1)) + 5); 
                      const yProj = (projIdx * (90 / (totalProj - 1)) + 5);

                      // SVG Connection Line Styling
                      const isTechSelected = activeTech === conn.tech;
                      const isProjSelected = activeProj === conn.project;
                      const isConnectionActive = isTechSelected || isProjSelected;

                      let lineClass = "laser-dim";
                      if (isConnectionActive) {
                        lineClass = "laser-active";
                      } else if (activeTech === null && activeProj === null) {
                        lineClass = "laser-highlighted";
                      }

                      return (
                        <g key={idx}>
                          <path
                            d={`M 32 ${yTech} C 48 ${yTech}, 52 ${yProj}, 68 ${yProj}`}
                            fill="none"
                            className={lineClass}
                            vectorEffect="non-scaling-stroke"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="hidden md:block w-[36%] pointer-events-none"></div>

                <div className="flex flex-col justify-between h-full w-full md:w-[32%] relative z-10 gap-3">
                  {PROJECTS.map((proj) => {
                    const isSelected = activeProj === proj.id;
                    const isConnected = connectedProjects.includes(proj.id);
                    const activeState = isSelected 
                      ? "border-apricot-accent bg-apricot-accent/5 text-apricot-text" 
                      : isConnected 
                      ? "border-apricot-accent/50 bg-apricot-accent/2 text-apricot-text" 
                      : "border-apricot-border hover:border-apricot-accent text-apricot-text-muted";

                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          setActiveProj(proj.id);
                          setActiveTech(null);
                        }}
                        className={`w-full premium-card border px-3 py-2.5 rounded flex items-center justify-between transition-all duration-300 text-left outline-none cursor-pointer group relative ${activeState}`}
                      >
                        <div className="flex items-center gap-2.5 max-w-[85%]">
                          <div className={`p-1.5 rounded bg-apricot-secondary border shrink-0 transition-colors ${isSelected ? "border-apricot-accent/40 text-apricot-accent" : "border-apricot-border text-apricot-text-muted group-hover:text-apricot-accent"}`}>
                            {getProjectIcon(proj.id, "w-4 h-4")}
                          </div>
                          <div className="truncate">
                            <h4 className="font-sans font-bold text-xs uppercase tracking-wide truncate">{proj.name}</h4>
                            <span className="font-mono text-[8.5px] text-apricot-text-dim uppercase truncate block">{proj.type}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-apricot-accent rounded-full"></span>
                        )}

                        <span className="font-mono text-[8px] text-apricot-text-dim border border-apricot-border px-1.2 py-0.2 rounded uppercase tracking-wider scale-90 md:block hidden">
                          {proj.market}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>
              <div className="mt-6 pt-4 border-t border-apricot-border flex items-center justify-between text-[9px] font-mono text-apricot-text-dim select-none">
                <span>TOTAL REGISTERED LINKS: {CONNECTIONS.length}</span>
                <span className="flex items-center gap-3 font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-apricot-border"></span> STANDBY</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-apricot-accent animate-pulse"></span> TRACE SWEEPS ACTIVE</span>
                </span>
              </div>

            </div>

            
            <div className="lg:col-span-4 premium-card bg-apricot-secondary/40 border border-apricot-border rounded p-6 flex flex-col justify-between text-left relative overflow-hidden h-full">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(rgba(192,79,131,0.015)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none"></div>

              <div>
            
                <div className="flex items-center justify-between font-mono text-[10px] text-apricot-text-dim pb-3.5 mb-5 border-b border-apricot-border select-none">
                  <span className="uppercase tracking-widest flex items-center gap-1.5 text-apricot-accent font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    SIGNAL READOUT CONSOLE
                  </span>
                  <span>ONLINE_RUNNING</span>
                </div>

            
                <div className="mb-5 pb-5 border-b border-apricot-border pb-5">
                  <span className="font-mono text-[9px] text-apricot-text-dim uppercase tracking-wider block mb-1 select-none">
                    [ SELECTED GRID NODE ]
                  </span>
                  <div className="flex items-center gap-3 bg-apricot-card border border-apricot-border p-3 rounded">
                    <div className="p-2 bg-apricot-secondary border border-apricot-border rounded text-apricot-accent">
                      {activeTech ? getTechIcon(activeTech, "w-5 h-5") : getProjectIcon(activeProj || "", "w-5 h-5")}
                    </div>
                    <div className="truncate">
                      <h3 className="font-sans font-bold text-sm text-apricot-text uppercase tracking-tight truncate">
                        {selectedNodeName}
                      </h3>
                      <span className="font-mono text-[9px] text-apricot-text-dim tracking-wider uppercase block">
                        {selectedNodeCategory}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-apricot-text-muted mt-2 leading-relaxed">
                    {selectedNodeDesc}
                  </p>
                </div>

            
                <div className="mb-5 pb-5 border-b border-apricot-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] text-apricot-text-dim uppercase tracking-wider block select-none flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-apricot-accent" />
                      [ SYSTEM INTEGRITY GATE ]
                    </span>
                    {isTesting ? (
                      <span className="font-mono text-[8.5px] text-emerald-700 font-bold tracking-wider animate-pulse flex items-center gap-1.5 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> EXECUTING TRACE
                      </span>
                    ) : (
                      <span className="font-mono text-[8.5px] text-apricot-text-dim tracking-wider uppercase select-none">
                        READY SECURE
                      </span>
                    )}
                  </div>

                  {isTesting || consoleLogs.length > 0 ? (
                    <div className="bg-[#241C1A] border border-apricot-border/60 text-[10px] text-apricot-bg font-mono p-3 rounded leading-relaxed min-h-[110px] max-h-[140px] overflow-y-auto space-y-1 block shadow-sm select-none">
                      {consoleLogs.map((log, lidx) => (
                        <div key={lidx} className="text-apricot-bg/90 truncate animate-fade-in">
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-apricot-secondary/40 border border-apricot-border/40 p-3 rounded flex flex-col items-center justify-center text-center select-none min-h-[110px]">
                      <span className="font-sans text-[11px] text-apricot-text-muted">
                        Test real-time systems integration signals and verify end-to-end active pipelines.
                      </span>
                    </div>
                  )}

                  <button
                    onClick={runTelemetrySweep}
                    disabled={isTesting}
                    className={`w-full mt-3 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded transition-all outline-none border cursor-pointer select-none flex items-center justify-center gap-1.5 ${
                      isTesting 
                        ? "bg-apricot-secondary text-apricot-text-dim border-apricot-border cursor-not-allowed"
                        : "bg-apricot-card text-apricot-accent border-apricot-accent hover:bg-apricot-accent hover:text-apricot-card"
                    }`}
                  >
                    {isTesting ? "TRAVERSING PIPELINE..." : "COMPILE DIAGNOSTIC SWEEP"}
                  </button>
                </div>

            
                <div>
                  <span className="font-mono text-[9px] text-apricot-text-dim uppercase tracking-wider block mb-2 select-none">
                    [ CONFLICT RECONCILIATIONS ]
                  </span>

                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    {currentDetails.map((detail, idx) => {
                      const counterpartName = activeTech 
                        ? PROJECTS.find(p => p.id === detail.project)?.name || "" 
                        : detail.tech;

                      return (
                        <div 
                          key={idx} 
                          className="p-2.5 rounded bg-apricot-card border border-apricot-border hover:border-apricot-accent transition-colors text-left"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold font-sans text-apricot-text mb-1 uppercase tracking-wide">
                            <span className="text-apricot-accent text-[9px]">➔</span>
                            <span>{counterpartName}</span>
                          </div>
                          
                          <p className="font-sans text-[11px] text-apricot-text-muted leading-relaxed">
                            {detail.notes}
                          </p>
                        </div>
                      );
                    })}

                    {currentDetails.length === 0 && (
                      <div className="py-6 text-center text-apricot-text-dim font-mono text-xs">
                        NO ACTIVE CONNECTIONS MAPPED
                      </div>
                    )}
                  </div>
                </div>

              </div>

            
              <div className="mt-6 pt-4 border-t border-apricot-border text-left select-none">
                {activeProj ? (
                  <button
                    onClick={() => handleScrollToSection("projects")}
                    className="w-full flex items-center justify-between font-mono text-xs text-apricot-accent bg-apricot-card hover:bg-apricot-secondary border border-apricot-accent px-4 py-2.5 rounded transition-all group text-left cursor-pointer outline-none shadow-sm"
                  >
                    <span>GO TO CASE STUDIES CATALOGUE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-apricot-accent" />
                  </button>
                ) : (
                  <div className="font-mono text-[9px] text-apricot-text-dim uppercase text-center py-2 relative">
                    <Sparkles className="w-3 h-3 text-apricot-accent inline-block mr-1.5 animate-spin" style={{ animationDuration: "3s" }} />
                    SELECT SECTORS ON GRAPH TO ANALYZE TOPOLOGY
                  </div>
                )}
              </div>

            </div>

            
          </div>

        </div> */}

        
        <div className="text-left mt-20 select-none">
          <div className="flex items-center gap-2 mb-6">
            <Hammer className="w-4.5 h-4.5 text-apricot-accent" />
            <span className="font-mono text-[10px] font-bold text-apricot-text-dim tracking-wider uppercase">
              CATEGORIZED COMPRESSED DIRECTORY // ARCHITECTURE STANDARDS
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto flex flex-col border-t border-apricot-border"
          >
            {TECH_STACK.map((group, index) => (
              <motion.div
                key={index}
                variants={rowVariants}
                className="py-5 border-b border-apricot-border flex flex-col lg:flex-row lg:items-center items-start gap-4 lg:gap-8 group"
              >
                {/* Category Label - min-width 180px and mb-3 on tablet/mobile, mb-0 on lg */}
                <div className="lg:min-w-[180px] lg:w-[180px] shrink-0 mb-3 lg:mb-0 font-mono text-[10px] font-bold text-apricot-text-dim uppercase group-hover:text-apricot-accent transition-colors duration-200 text-left">
                  // {group.category}
                </div>

                {/* Badges Container - flex-wrap and gap-2 to avoid badges clashing/overflowing */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs text-apricot-text-muted bg-apricot-card hover:text-apricot-accent border border-apricot-border hover:border-apricot-accent px-3.5 py-1.5 rounded transition-all duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certification notice watermark */}
        <div className="flex items-center justify-center gap-1.5 mt-16 font-mono text-[10px] text-apricot-text-dim select-none uppercase">
          <Hammer className="w-3.5 h-3.5 text-apricot-accent" /> ALL ARCHITECTURE PIPELINES STABILIZED SINCE 2022
        </div>

      </div>
    </section>
  );
}
