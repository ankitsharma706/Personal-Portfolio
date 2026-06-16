/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Building, 
  Activity, 
  Cpu, 
  Coins, 
  Database, 
  ShieldCheck, 
  Layers, 
  Workflow,
  HelpCircle,
  Sparkles,
  Link2,
  Cable
} from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: React.ComponentType<any>;
  metric: string;
  metricLabel: string;
  caseStudyId: string;
  caseStudyName: string;
}

const COLLABORATORS: Collaborator[] = [
  {
    id: "stripe",
    name: "Stripe Core Ledger",
    description: "Ledger Infrastructure Integration",
    detail: "Collaborated on enterprise double-entry schemas and balance accounting guards designed to reconcile delayed ACH bank settlement cycles safely within decentralized fintech applications.",
    icon: Activity,
    metric: "99.999% Sync",
    metricLabel: "BALANCE CORRECTNESS TESTED",
    caseStudyId: "defi-gateway",
    caseStudyName: "DeFi Banking Gateway"
  },
  {
    id: "google-brain",
    name: "Google Brain Architecture",
    description: "Spatio-Temporal Model Selection",
    detail: "Consulted on Spatio-Temporal Graph Neural Networks (STGNN) to execute predictive traffic-wave calculations within low-power embedded edge municipal roadside hardware controllers.",
    icon: Cpu,
    metric: "Float32 ➔ Int8",
    metricLabel: "QUANTIZED MODEL SIZE COMPRESSION",
    caseStudyId: "urban-flow",
    caseStudyName: "Urban Flow AI"
  },
  {
    id: "plaid",
    name: "Plaid Core API",
    description: "Secure Core Banking Gateways",
    detail: "Engineered secure bank account authorizations, direct accounts matching, and real-time webhook status triggers to secure transactions before capital routing.",
    icon: Workflow,
    metric: "Instant Token auth",
    metricLabel: "SECURE ACCOUNT CLEARANCE CHANNEL",
    caseStudyId: "defi-gateway",
    caseStudyName: "DeFi Banking Gateway"
  },
  {
    id: "circle",
    name: "Circle Settlement Rails",
    description: "Dynamic Digital USD Liquidity",
    detail: "Constructed programmatic stablecoin flows backed by real-time bank ledger clearance notifications, dropping settlement intervals down to on-chain seconds.",
    icon: Coins,
    metric: "12s Multi-Chain",
    metricLabel: "STABLECOIN ISSUANCE REAL-TIME LIMITS",
    caseStudyId: "defi-gateway",
    caseStudyName: "DeFi Banking Gateway"
  },
  {
    id: "urban-smart-cities",
    name: "India Smart Cities Mission",
    description: "Municipal Telemetry Streams",
    detail: "Partnered on open IoT traffic-sensor meshes and camera networks, integrating 10Hz telemetry GPS feeds into highly optimized geosharded data backends.",
    icon: Globe,
    metric: "12k Coordinates/s",
    metricLabel: "IOT GEO-LOCATIONAL INGESTION CAPACITY",
    caseStudyId: "urban-flow",
    caseStudyName: "Urban Flow AI"
  },
  {
    id: "ministry-steel",
    name: "Ministry of Steel Oversight",
    description: "Industrial Safety Regulations",
    detail: "Crafted programmatic shift-rosters, license audits, and medical screening parameters mapped to national metallurgical plant-safety directives in heavy industrial zones.",
    icon: Building,
    metric: "Zero Failures",
    metricLabel: "LICENSE & MEDICAL VERIFICATION RATE",
    caseStudyId: "assava",
    caseStudyName: "ASSAVA Workforce Platform"
  },
  {
    id: "arbitrum",
    name: "Arbitrum Layer-2 Scaling",
    description: "High-Throughput Gas Optimization",
    detail: "Deployed customized Solidity verifier registries on secondary rollups, dropping selective identity check transaction costs back below $0.05 per customer query.",
    icon: Layers,
    metric: "98.4% Fee Cut",
    metricLabel: "GAS CONSUMPTION EFFICIENCY GAINS",
    caseStudyId: "onchain-identity",
    caseStudyName: "On-Chain Identity Protocol"
  },
  {
    id: "ceramic",
    name: "Ceramic Identity Metadata",
    description: "Decentralized Sovereign Streaming",
    detail: "Anchored signed credential hashes within decentralized database metadata pipelines, adhering strictly to global data protection and GDPR guidelines.",
    icon: Database,
    metric: "0% Persistent PII",
    metricLabel: "IMMUTABLE AUDIT WITHOUT PRIVACY LEAKS",
    caseStudyId: "onchain-identity",
    caseStudyName: "On-Chain Identity Protocol"
  },
  {
    id: "fincen",
    name: "FinCEN Clearing Indexes",
    description: "Dynamic AML Sanctions Databases",
    detail: "Built continuous Jaro-Winkler string fuzzy matching algorithms to check foreign transaction targets directly against official SDN sanctions list trees in real-time.",
    icon: ShieldCheck,
    metric: "45,000 Loops/s",
    metricLabel: "AML GRAPH CLASSIFIER COCKPIT SPEED",
    caseStudyId: "aml-engine",
    caseStudyName: "AML Intelligence Engine"
  }
];

export default function CollaborationMarquee() {
  const [activePartner, setActivePartner] = useState<Collaborator | null>(null);

  const tripledPartners = useMemo(() => {
    return [...COLLABORATORS, ...COLLABORATORS, ...COLLABORATORS];
  }, []);

  const scrollToCaseStudySection = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative py-12 border-b border-apricot-border bg-apricot-secondary/50 overflow-hidden">
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subsection Header */}
        <div className="flex flex-col items-center text-center mb-8 relative select-none">
          <div className="inline-flex items-center gap-1.5 bg-apricot-accent/5 border border-apricot-border px-3 py-1 rounded text-[10px] font-mono text-apricot-accent uppercase tracking-wider mb-2">
            <Cable className="w-3.5 h-3.5 text-apricot-accent" />
            PROGRAMMATIC COLLABORATIONS & SECURE CHANNELS
          </div>
          <h4 className="font-serif italic font-medium text-apricot-text text-base sm:text-lg tracking-wide">
            Ecosystem Integration Map
          </h4>
        </div>

        {/* Scrolling Viewport */}
        <div className="w-full relative overflow-hidden py-2 px-1 border-y border-apricot-border bg-apricot-bg/40">
          
          {/* Left/Right ambient masking overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-apricot-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-apricot-bg to-transparent z-10 pointer-events-none" />

          {/* Marquee sliding track container */}
          <div className="marquee-track flex gap-4 pr-4">
            {tripledPartners.map((partner, index) => {
              const Icon = partner.icon;
              const isActive = activePartner?.id === partner.id;

              return (
                <div
                  key={`${partner.id}-${index}`}
                  onClick={() => {
                    setActivePartner(isActive ? null : partner);
                  }}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded border transition-all duration-300 cursor-pointer min-w-[250px] select-none ${
                    isActive
                      ? "bg-apricot-card border-apricot-accent shadow-sm text-apricot-text"
                      : "bg-apricot-card/70 border-apricot-border text-apricot-text-muted hover:border-apricot-accent hover:text-apricot-text"
                  }`}
                >
                  <div className={`p-1.5 rounded transition-colors ${
                    isActive
                      ? "bg-apricot-accent/10 border-apricot-accent/25 text-apricot-accent"
                      : "bg-apricot-secondary border-apricot-border text-apricot-text-dim"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-[12px] tracking-wide leading-none mb-1">
                      {partner.name}
                    </span>
                    <span className="font-mono text-[8.5px] text-apricot-text-dim uppercase truncate leading-none">
                      {partner.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Integration Details Panel Box */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-4xl min-h-[96px] premium-card bg-apricot-card rounded p-5 flex flex-col justify-between relative overflow-hidden text-left">
            
            <AnimatePresence mode="wait">
              {activePartner ? (
                <motion.div
                  key={activePartner.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                >
                  
                  {/* Detailed summary (8 Cols) */}
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-[9px] text-apricot-accent font-bold bg-apricot-secondary border border-apricot-border p-0.5 px-2 rounded uppercase select-none">
                        INTEGRATION ACTIVE // {activePartner.name.toUpperCase()}
                      </span>
                      <button 
                        onClick={scrollToCaseStudySection}
                        className="inline-flex items-center gap-1 font-mono text-[9px] text-apricot-text hover:text-apricot-accent transition-colors leading-none"
                      >
                        <Link2 className="w-3 h-3" />
                        <span>LINK TO: {activePartner.caseStudyName.toUpperCase()} ➔</span>
                      </button>
                    </div>
                    
                    <p className="font-sans text-xs text-apricot-text-muted leading-relaxed">
                      {activePartner.detail}
                    </p>
                  </div>

                  {/* Quantitative verified stats metrics (4 Cols) */}
                  <div className="md:col-span-4 bg-apricot-secondary/40 border border-apricot-border rounded p-3 flex flex-col justify-center items-center text-center font-mono select-none">
                    <span className="text-[8px] text-apricot-text-dim uppercase font-bold leading-none mb-1.5">
                      {activePartner.metricLabel}
                    </span>
                    <div className="text-apricot-accent text-sm font-extrabold flex items-center gap-1 leading-tight uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-apricot-accent animate-pulse" />
                      <span>{activePartner.metric}</span>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="default-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full py-1"
                >
                  <div className="flex items-center gap-3 text-apricot-text-muted">
                    <HelpCircle className="w-5 h-5 text-apricot-accent/40 shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[9px] font-bold text-apricot-accent uppercase">
                        [ECOSYSTEM INTELLIGENCE ACCESS REGISTER]
                      </span>
                      <p className="font-sans text-[11px] text-apricot-text-muted mt-0.5 leading-tight">
                        Select any moving collaborator badge inside the marquee track above to inspect raw compliance links, data payloads, and verification benchmarks.
                      </p>
                    </div>
                  </div>

                  <div className="font-mono text-[8px] text-apricot-text-dim bg-apricot-secondary/60 border border-apricot-border px-2.5 py-1 rounded max-w-xs self-center sm:self-auto text-center sm:text-right">
                    TTY::ACTIVE_LISTENERS // SECURE_PORTAL
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

    </div>
  );
}
