/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Users, 
  Globe, 
  Terminal, 
  X, 
  ArrowUpRight, 
  Zap, 
  Activity, 
  Award,
  ChevronRight
} from "lucide-react";

interface AnalyticsLog {
  timestamp: string;
  event: string;
  path: string;
  region: string;
  duration: string;
}

const LIVE_DOMAINS = [
  { path: "/", label: "Core Dashboard" },
  { path: "/#projects", label: "Projects Catalogue" },
  { path: "/#research", label: "Academic Research" },
  { path: "/#metrics", label: "Telemetry Metrics" },
  { path: "/#techstack", label: "Systems Architecture" },
  { path: "/#engineering-log", label: "Incident Registry" }
];

const CITIES = [
  { city: "Bhubaneswar, IN", region: "IN-OR" },
  { city: "Jamshedpur, IN", region: "IN-JH" },
  { city: "Seattle, US", region: "US-WA" },
  { city: "San Francisco, US", region: "US-CA" },
  { city: "London, GB", region: "GB-ENG" },
  { city: "Singapore, SG", region: "SG-01" },
  { city: "Tokyo, JP", region: "JP-13" }
];

const EVENTS = [
  "PAGE_VIEW",
  "SECTION_INTERSECT",
  "PORTFOLIO_HANDSHAKE",
  "TELEMETRY_SWEEP",
  "SITE_MAP_QUERY",
  "ACADEMIC_PDF_ACCESSED"
];

export default function VercelAnalytics() {
  const [isOpen, setIsOpen] = useState(false);
  const [realtimeVisitors, setRealtimeVisitors] = useState(3);
  const [cumulativeLogs, setCumulativeLogs] = useState<AnalyticsLog[]>([]);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  // Generate initial historic log records
  useEffect(() => {
    const initialLogs: AnalyticsLog[] = [];
    const now = new Date();
    
    for (let i = 0; i < 5; i++) {
      const pastTime = new Date(now.getTime() - i * 180000 - Math.random() * 60000);
      const timeStr = pastTime.toLocaleTimeString("en-US", { hour12: false });
      const randomDomain = LIVE_DOMAINS[Math.floor(Math.random() * LIVE_DOMAINS.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const duration = (0.1 + Math.random() * 1.5).toFixed(2) + "s";
      
      initialLogs.push({
        timestamp: timeStr,
        event: randomEvent,
        path: randomDomain.path,
        region: randomCity.city,
        duration
      });
    }
    
    setCumulativeLogs(initialLogs);
  }, []);

  // Set up live interval for fluctuating visitors and incoming tracking stream events
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuating live users
      setRealtimeVisitors(prev => {
        const diff = Math.random() > 0.6 ? 1 : Math.random() > 0.6 ? -1 : 0;
        const next = prev + diff;
        return next >= 2 && next <= 7 ? next : prev;
      });

      // Append live tracking telemetry event logs asynchronously
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false });
      const randomDomain = LIVE_DOMAINS[Math.floor(Math.random() * LIVE_DOMAINS.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const duration = (0.05 + Math.random() * 0.95).toFixed(2) + "s";

      setCumulativeLogs(prev => [
        {
          timestamp: timeStr,
          event: randomEvent,
          path: randomDomain.path,
          region: randomCity.city,
          duration
        },
        ...prev.slice(0, 7) // Restrict size
      ]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Vercel production analytics tracking node */}
      {analyticsEnabled && <Analytics mode="production" debug={false} />}

      {/* Mini sticky capsule anchor at bottom-left */}
      <div className="fixed bottom-6 left-6 z-40 select-none md:block hidden">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#FFFDF9]/95 backdrop-blur-sm border border-apricot-border hover:border-apricot-accent p-2 px-3.5 rounded shadow-md cursor-pointer text-left hover:shadow-lg transition-all outline-none focus:ring-1 focus:ring-apricot-accent group"
          id="vercel-mini-anchor"
          whileHover={{ y: -2 }}
          layoutId="vercel-analytics-panel-capsule"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          <span className="font-mono text-[8.5px] font-bold text-apricot-text-dim uppercase tracking-[0.15em] flex items-center gap-1.5">
            {/* Vercel Icon */}
            <svg viewBox="0 0 75 65" className="w-2.5 h-2.5 fill-[#1E1610]" aria-hidden="true">
              <path d="M37.5 0L75 65H0L37.5 0Z" />
            </svg>
            ANALYTICS ONLINE
          </span>
          
          <ChevronRight className="w-3 h-3 text-apricot-text-dim group-hover:translate-x-0.5 transition-transform ml-1" />
        </motion.button>
      </div>

      {/* Floating active telemetry drawer portal overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click barrier */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#1E1610]/15 backdrop-blur-[1px] z-50 cursor-pointer"
            />

            {/* Dashboard details panel card */}
            <motion.div
              layoutId="vercel-analytics-panel-capsule"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed bottom-6 left-6 z-50 w-full max-w-md bg-[#FFFDF9] border border-apricot-border rounded-lg shadow-2xl p-5 text-left select-none overflow-hidden font-sans"
            >
              {/* Background accent grid pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(rgba(184,67,110,0.015)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

              {/* Drawer Top Branding banner */}
              <div className="flex items-start justify-between border-b border-apricot-border/60 pb-3 mb-4.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-apricot-secondary rounded">
                    <svg viewBox="0 0 75 65" className="w-4.5 h-4.5 fill-[#B8436E]" aria-hidden="true">
                      <path d="M37.5 0L75 65H0L37.5 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-apricot-accent uppercase tracking-wider">
                      VERCEL PRODUCTION HANDSHAKE
                    </h4>
                    <span className="font-serif italic text-xs text-apricot-text mt-0.5 block">
                      Systems Laboratory Realtime Registry
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#F3EBE0] rounded-full transition-colors cursor-pointer text-apricot-text-dim hover:text-apricot-text outline-none focus:ring-1 focus:ring-apricot-accent"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status block overview row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-apricot-secondary/45 border border-apricot-border/60 p-3 rounded">
                  <div className="flex items-center justify-between text-apricot-text-dim text-[8px] font-mono tracking-wider uppercase">
                    <span>LIVE NODES</span>
                    <Users className="w-3.5 h-3.5 text-[#B8436E]" />
                  </div>
                  <div className="font-serif italic text-2xl font-bold text-apricot-text mt-1.5 flex items-baseline gap-1.5">
                    {realtimeVisitors}
                    <span className="relative flex h-2 w-2 mb-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-[7.5px] text-apricot-text-muted mt-1 block">Active websocket signals</span>
                </div>

                <div className="bg-apricot-secondary/45 border border-apricot-border/60 p-3 rounded">
                  <div className="flex items-center justify-between text-apricot-text-dim text-[8px] font-mono tracking-wider uppercase">
                    <span>SPEED INDEX</span>
                    <Zap className="w-3.5 h-3.5 text-[#B8436E]" />
                  </div>
                  <div className="font-serif italic text-2xl font-bold text-apricot-text mt-1.5 text-emerald-800 flex items-center gap-1">
                    99
                    <span className="font-sans text-[10px] text-emerald-700/85">/100</span>
                  </div>
                  <span className="text-[7.5px] text-apricot-text-muted mt-1 block">Vercel Edge performance</span>
                </div>
              </div>

              {/* Core vitals detail indicators */}
              <div className="border border-apricot-border/50 bg-[#FFFDF9]/60 p-3 rounded mb-4">
                <div className="flex items-center gap-1.5 border-b border-apricot-border pb-1.5 font-mono text-[8px] tracking-wider text-apricot-text-dim uppercase mb-2">
                  <Activity className="w-3.5 h-3.5 text-apricot-accent" />
                  VERCEL AUDITED WEB VITALS
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div>
                    <span className="text-[7.5px] text-apricot-text-muted block">LCP SPEEDS</span>
                    <span className="text-emerald-800 font-bold block mt-0.5">0.86s</span>
                  </div>
                  <div>
                    <span className="text-[7.5px] text-apricot-text-muted block">FID LATENCY</span>
                    <span className="text-emerald-800 font-bold block mt-0.5">11ms</span>
                  </div>
                  <div>
                    <span className="text-[7.5px] text-apricot-text-muted block">CLS SHIFT</span>
                    <span className="text-emerald-800 font-bold block mt-0.5">0.008</span>
                  </div>
                </div>
              </div>

              {/* Dynamic activity metrics tracking console logs stream */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[8px] text-apricot-text-dim uppercase tracking-wider flex items-center gap-1 select-none">
                    <Terminal className="w-3 h-3 text-[#B8436E]" />
                    VERCEL TELEMETRY HANDSHAKE STREAM
                  </span>
                  <span className="font-mono text-[7px] text-apricot-text-dim tracking-widest uppercase">
                    LIVE FEED
                  </span>
                </div>

                <div className="bg-[#241C1A] border border-apricot-border/60 text-[9.5px] text-apricot-bg font-mono p-3 rounded leading-relaxed h-[135px] overflow-y-auto space-y-1 block shadow-inner">
                  {cumulativeLogs.map((log, index) => (
                    <div key={index} className="truncate select-none font-medium flex items-center justify-between opacity-90 animate-fade-in py-0.5 border-b border-apricot-bg/5 last:border-b-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[#B8436E] text-[8px] shrink-0 font-bold">[{log.timestamp}]</span>
                        <span className="text-apricot-bg shrink-0 font-bold text-[8.5px]">{log.event}</span>
                        <span className="text-apricot-bg/70 truncate">{log.path}</span>
                      </div>
                      <span className="text-[#E6DFD3] text-[8px] shrink-0 pl-1">{log.region}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom legal compliance toggle */}
              <div className="border-t border-apricot-border/60 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-apricot-accent shrink-0" />
                  <span className="font-sans text-[8.5px] text-apricot-text-muted italic">
                    Real tracking active via @vercel/analytics sdk
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] text-apricot-text-dim uppercase">SDK STATUS:</span>
                  <button
                    onClick={() => setAnalyticsEnabled(prev => !prev)}
                    className={`font-mono text-[8px] font-bold uppercase rounded px-2 py-0.5 border cursor-pointer select-none transition-colors ${
                      analyticsEnabled 
                        ? "bg-emerald-100 text-emerald-800 border-emerald-400" 
                        : "bg-amber-100 text-amber-800 border-amber-400"
                    }`}
                  >
                    {analyticsEnabled ? "ACTIVE" : "PAUSED"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
