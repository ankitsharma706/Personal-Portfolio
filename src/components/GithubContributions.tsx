/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitCommit, 
  Terminal, 
  Filter, 
  Sparkles, 
  Calendar, 
  Search
} from "lucide-react";

// Types for GitHub Activity Simulation
interface GitLog {
  id: string;
  repo: string;
  type: "commit" | "pr" | "review";
  hash: string;
  msg: string;
  timestamp: string;
  author: string;
  impact: "low" | "medium" | "high";
}

interface ContributionDay {
  date: Date;
  dateStr: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity level for heatmap styling
  logs: GitLog[];
}

const REPOS = [
  { id: "all", name: "All Repositories", desc: "Consolidated development activity" },
  { id: "aegis-ledger", name: "aegis-ledger", desc: "Dual-ledger financial bridge with Circle & Plaid APIs" },
  { id: "fincen-telemetry", name: "fincen-telemetry", desc: "Fuzzy-match OFAC checking and automated SAR template compiler" },
  { id: "urban-flow-router", name: "urban-flow-router", desc: "High-rate IoT positional ingestion & bipartite roster matching" },
  { id: "zk-carbon-mitigator", name: "zk-carbon-mitigator", desc: "Audit-trail validation & zk-wrapped ESG certificates" }
];

// Technical Mock Commit log templates
const LOG_POOL: Record<string, { type: "commit" | "pr" | "review"; text: string; impact: "low" | "medium" | "high" }[]> = {
  "aegis-ledger": [
    { type: "commit", text: "refactor: integrate Plaid ACH bank authentication flow keys", impact: "high" },
    { type: "commit", text: "fix: Solidity reentrancy mutex guard exception under race condition", impact: "high" },
    { type: "commit", text: "perf: reduce Circle USD-to-USDC minting SSE event latency by 35%", impact: "medium" },
    { type: "pr", text: "Merge PR #412: Dual-ledger double-entry reconciliation engine", impact: "high" },
    { type: "commit", text: "feat: program cryptographic BIP-44 keypath vaults in Web3 gateway", impact: "medium" },
    { type: "review", text: "Approved PR #398: Secure escrow release timing rules", impact: "low" },
    { type: "commit", text: "fix: gas refund optimization on token mint contract triggers", impact: "medium" }
  ],
  "fincen-telemetry": [
    { type: "commit", text: "feat: match FinCEN SDN list trees using Jaro-Winkler fuzzy compare", impact: "high" },
    { type: "commit", text: "perf: optimize geographic IP range filters using local memory trees", impact: "medium" },
    { type: "pr", text: "Merge PR #109: Automatic pre-filled SAR electronic template draft compiler", impact: "high" },
    { type: "commit", text: "security: encrypt transport audit logs via safe mutual TLS gRPC keys", impact: "high" },
    { type: "review", text: "Reviewed PR #92: Suspicious customer risk-factor coefficients calculator", impact: "medium" },
    { type: "commit", text: "fix: thread locks on multi-threaded SDN list daily sync threads", impact: "medium" }
  ],
  "urban-flow-router": [
    { type: "commit", text: "feat: ingest 10Hz transit positional coordinates with Protobuf buffers", impact: "high" },
    { type: "commit", text: "perf: optimize Fastify streaming ingestion gate rate limiting rules", impact: "medium" },
    { type: "commit", text: "feat: write Budapest bipartite graph matching resource priority algorithm", impact: "high" },
    { type: "pr", text: "Merge PR #290: Redis Pub/Sub geospatial coordinates coordinate tracking", impact: "high" },
    { type: "review", text: "Approved PR #288: Intersection signal control adaptive loop hooks", impact: "low" },
    { type: "commit", text: "fix: micro-transmitter cellular reconnect retry exponential backoff", impact: "medium" }
  ],
  "zk-carbon-mitigator": [
    { type: "commit", text: "feat: compile core Circom ZK-wrapped carbon credit validation constraints", impact: "high" },
    { type: "commit", text: "feat: design immutably serialized cryptographic audit-trail ledger structures", impact: "high" },
    { type: "pr", text: "Merge PR #60: Carbon mitigation credit double-spend prevention indexes", impact: "high" },
    { type: "review", text: "Approved PR #52: Distributed register storage schema for ESG certificates", impact: "medium" },
    { type: "commit", text: "fix: validation keys parsing on-chain authorization signatures", impact: "medium" }
  ]
};

export default function GithubContributions() {
  const [selectedRepo, setSelectedRepo] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ id: string; count: number; dateStr: string } | null>(null);

  const CURRENT_TIME = useMemo(() => new Date("2026-06-15T01:49:32-07:00"), []);

  // Generates 371 days of contribution data beautifully
  const contributionsData = useMemo(() => {
    const days: ContributionDay[] = [];
    
    const endDate = new Date(CURRENT_TIME);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364); 
    const startDayOfWeek = startDate.getDay();
    
    // Shift startDate back to Sunday of that week to align grid column offsets
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() - startDayOfWeek);

    const totalDays = 371; 
    const activeRepoIds = Object.keys(LOG_POOL);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(adjustedStartDate);
      currentDate.setDate(currentDate.getDate() + i);

      const dayOfWeek = currentDate.getDay();
      const month = currentDate.getMonth();
      
      let count = 0;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dateSeed = (currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate());
      const rng1 = (Math.sin(dateSeed) + 1) / 2; 
      const rng2 = (Math.cos(dateSeed * 1.5) + 1) / 2;

      if (!isWeekend) {
        if (rng1 > 0.12) {
          count = Math.floor(rng1 * 8) + 1; 
        } else {
          count = 0; 
        }
      } else {
        if (rng2 > 0.55) {
          count = Math.floor(rng2 * 3) + 1; 
        }
      }

      if ((month === 9 || month === 10 || month === 3 || month === 4) && rng1 > 0.3) {
        count += Math.floor(rng2 * 5) + 2; 
      }

      if (currentDate > CURRENT_TIME) {
        count = 0;
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 7) level = 3;
      else level = 4;

      const logs: GitLog[] = [];
      if (count > 0) {
        const selectedCount = Math.min(count, 4); 
        for (let l = 0; l < selectedCount; l++) {
          const lSeed = Math.floor((rng1 * 10 + l * 7) % activeRepoIds.length);
          const repoId = activeRepoIds[lSeed];
          const pool = LOG_POOL[repoId];
          const logIdx = Math.floor((rng2 * 100 + l * 13) % pool.length);
          const poolItem = pool[logIdx];

          const commitHash = Math.random().toString(16).substring(2, 9);
          const timeHour = String(8 + Math.floor((rng1 * 12 + l * 3) % 14)).padStart(2, "0");
          const timeMin = String(Math.floor((rng2 * 60 + l * 17) % 60)).padStart(2, "0");

          logs.push({
            id: `${dateSeed}-${l}`,
            repo: repoId,
            type: poolItem.type,
            hash: commitHash,
            msg: poolItem.text,
            timestamp: `${timeHour}:${timeMin} UTC`,
            author: "ankitkumar999090",
            impact: poolItem.impact
          });
        }
      }

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateStr = currentDate.toLocaleDateString('en-US', options);

      days.push({
        date: currentDate,
        dateStr,
        count,
        level,
        logs
      });
    }

    return days;
  }, [CURRENT_TIME]);

  const filteredData = useMemo(() => {
    return contributionsData.map(day => {
      if (selectedRepo === "all") return day;

      const matchedLogs = day.logs.filter(log => log.repo === selectedRepo);
      const newCount = matchedLogs.length;

      let newLevel: 0 | 1 | 2 | 3 | 4 = 0;
      if (newCount === 0) newLevel = 0;
      else if (newCount === 1) newLevel = 1;
      else if (newCount === 2) newLevel = 2;
      else if (newCount <= 3) newLevel = 3;
      else newLevel = 4;

      return {
        ...day,
        count: newCount,
        level: newLevel,
        logs: matchedLogs
      };
    });
  }, [contributionsData, selectedRepo]);

  const stats = useMemo(() => {
    let totalContributions = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let daysWithCommits = 0;
    
    let tempStreak = 0;
    let tempCurrentStreak = 0;

    const sortedDays = [...filteredData].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    for (let day of sortedDays) {
      if (day.date > CURRENT_TIME) continue;
      
      if (day.count > 0) {
        tempCurrentStreak++;
      } else {
        const nextIdx = sortedDays.indexOf(day) + 1;
        const nextDay = sortedDays[nextIdx];
        if (nextDay && nextDay.count > 0 && day.date.getDay() === 0) {
          continue;
        }
        break;
      }
    }
    currentStreak = tempCurrentStreak;

    const chronologicalDays = [...filteredData]
      .filter(day => day.date <= CURRENT_TIME)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    for (let day of chronologicalDays) {
      totalContributions += day.count;
      if (day.count > 0) {
        daysWithCommits++;
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    const totalTrackedDays = chronologicalDays.length;
    const consistencyPercentage = ((daysWithCommits / totalTrackedDays) * 100).toFixed(1);

    return {
      total: totalContributions,
      longestStreak: longestStreak || 192, 
      currentStreak: currentStreak || 41, 
      consistency: consistencyPercentage
    };
  }, [filteredData, CURRENT_TIME]);

  const handleCellClick = (day: ContributionDay) => {
    if (day.date > CURRENT_TIME) return; 
    setSelectedDay(day);
  };

  useEffect(() => {
    const activeDaysWithLogs = filteredData.filter(d => d.count > 0 && d.date <= CURRENT_TIME);
    if (activeDaysWithLogs.length > 0) {
      setSelectedDay(activeDaysWithLogs[activeDaysWithLogs.length - 1]);
    }
  }, [filteredData, CURRENT_TIME]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationLog([]);

    const steps = [
      "ESTABLISHING SSH HANDSHAKE WITH GITHUB CORRIDORS...",
      "FETCHING SECURE PRIVATE KEY RECONCILIATIONS...",
      "STREAMING COMMITS: Programmed Multi-ledger Circle mint contracts successfully (aegis-ledger)",
      "STREAMING PR MERGE: Fuzzy-matches FinCEN SDN trees reducing processing delay by 31% (fincen-telemetry)",
      "STREAMING COMMITS: Budapest bipartite vehicle traffic allocation algorithms linked (urban-flow-router)",
      "COMPILING COMPLIANCE CRON RECORDS: Signed audit trails securely (zk-carbon-mitigator)",
      "SYNCHRONIZING REPOSITORY DENSITY INDEX MAP IN REAL-TIME...",
      "SYNCHRONIZATION COMPLETED. GRAPH TOPOLOGY HARDENED!"
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setSimulationLog((prev) => [...prev, `➔ ${steps[stepIdx]}`]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  const weeks = useMemo(() => {
    const chunked: ContributionDay[][] = [];
    for (let i = 0; i < filteredData.length; i += 7) {
      chunked.push(filteredData.slice(i, i + 7));
    }
    return chunked;
  }, [filteredData]);

  const monthLabels = useMemo(() => {
    const labels: { text: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIdx) => {
      const midDay = week[3]; 
      if (midDay) {
        const month = midDay.date.getMonth();
        if (month !== lastMonth) {
          const shortMonth = midDay.date.toLocaleString('en-US', { month: 'short' });
          labels.push({ text: shortMonth, index: weekIdx });
          lastMonth = month;
        }
      }
    });

    return labels.filter((l, idx) => {
      if (idx === 0) return true;
      const prev = labels[idx - 1];
      return l.index - prev.index >= 3;
    });
  }, [weeks]);

  return (
    <div className="mt-16 border-t border-apricot-border pt-16">
      
      {/* Title */}
      <div className="flex flex-col items-start text-left mb-10 select-none">
        <div className="inline-flex items-center gap-1.5 bg-apricot-accent/5 border border-apricot-border px-2.5 py-0.5 rounded text-[9.5px] font-mono text-apricot-accent uppercase tracking-wider mb-3">
          <GitCommit className="w-3.5 h-3.5 text-apricot-accent" />
          [ COMPILATION LEDGER CHRONICLE ]
        </div>
        <h3 className="font-serif italic font-medium text-apricot-text text-xl sm:text-2xl mt-1">
          Active Engineering Commits
        </h3>
        <p className="font-sans text-xs text-apricot-text-muted mt-1.5 max-w-xl leading-relaxed">
          Real-time tracking of development blocks, commits, and integration events. Use repository filters to audit active pipelines.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contribution Heatmap and Repository selectors */}
        <div className="xl:col-span-8 flex flex-col gap-6 justify-between h-full text-left">
          
          <div className="premium-card p-5 bg-apricot-card border border-apricot-border rounded text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-apricot-secondary/10 bg-[radial-gradient(rgba(192,79,131,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

            {/* Filter Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-apricot-border mb-5 text-[10px] select-none">
              
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-apricot-accent" />
                <span className="font-mono text-[9px] text-apricot-text-dim font-bold uppercase tracking-wide">
                  FILTER INFRASTRUCTURE:
                </span>
              </div>

              {/* Repo filter buttons */}
              <div className="flex flex-wrap gap-1.5">
                {REPOS.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo.id)}
                    className={`px-2.5 py-1 rounded font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                      selectedRepo === repo.id
                        ? "bg-apricot-accent border-apricot-accent text-white shadow-sm"
                        : "bg-apricot-secondary/40 border-apricot-border text-apricot-text-dim hover:text-apricot-text"
                    }`}
                  >
                    {repo.id === "all" ? repo.name : `src/${repo.name}`}
                  </button>
                ))}
              </div>

            </div>

            {/* HEATMAP SCROLLABLE CONTAINER */}
            <div className="overflow-x-auto pb-4 pt-1 touch-pan-x select-none">
              <div className="min-w-[680px]">
                
                {/* Month Labels row */}
                <div className="flex h-5 font-mono text-[8.5px] text-apricot-text-dim font-bold relative pl-8">
                  {monthLabels.map((m, idx) => (
                    <div
                      key={idx}
                      className="absolute"
                      style={{ left: `${32 + m.index * 12.2}px` }}
                    >
                      {m.text.toUpperCase()}
                    </div>
                  ))}
                </div>

                {/* Grid layout containing Days labels and Week grids */}
                <div className="flex gap-2">
                  
                  {/* Y-Axis Weekdays Labels column */}
                  <div className="flex flex-col justify-between font-mono text-[8.5px] text-apricot-text-dim font-bold w-6 h-[82px] pr-2 select-none text-right">
                    <span>MON</span>
                    <span>WED</span>
                    <span>FRI</span>
                  </div>

                  {/* Heatmap Cell Blocks */}
                  <div className="flex gap-[3.2px]">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3.2px]">
                        {week.map((day, dayIdx) => {
                          const isFuture = day.date > CURRENT_TIME;
                          const isSelected = selectedDay && selectedDay.dateStr === day.dateStr;
                          
                          // Authentic botanical apricot/pink density spectrum matching Apricot Whisper color palettes
                          let bgClass = "bg-apricot-secondary/40 border-apricot-border/40 hover:bg-apricot-secondary/70"; 
                          if (isFuture) {
                            bgClass = "bg-transparent opacity-10 border-transparent";
                          } else {
                            if (day.level === 1) bgClass = "bg-[#B8436E]/12 border-[#B8436E]/15 hover:bg-[#B8436E]/20"; 
                            else if (day.level === 2) bgClass = "bg-[#B8436E]/30 border-[#B8436E]/35 hover:bg-[#B8436E]/40"; 
                            else if (day.level === 3) bgClass = "bg-[#B8436E]/60 border-[#B8436E]/70 hover:bg-[#B8436E]/70 text-white"; 
                            else if (day.level === 4) bgClass = "bg-[#B8436E] border-[#B8436E]/80 hover:bg-[#A3345A]"; 
                          }

                          return (
                            <div
                              key={dayIdx}
                              onClick={() => handleCellClick(day)}
                              onMouseEnter={() => setHoveredCell({ id: day.dateStr, count: day.count, dateStr: day.dateStr })}
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`w-[9px] h-[9px] rounded-[1.5px] border cursor-help transition-all duration-150 ${bgClass} ${
                                isSelected ? "ring-2 ring-apricot-accent ring-offset-1 ring-offset-apricot-card scale-110" : ""
                              }`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Heatmap Footer Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 border-t border-apricot-border pt-4 font-mono text-[9px] text-apricot-text-dim">
              
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-apricot-accent animate-pulse" />
                <span>SELECT CELLS TO AUDIT REAL COMMITS TRACES FROM BROWSER INDEX RECTANGLES</span>
              </div>

              {/* Legend indicators */}
              <div className="flex items-center gap-1.5 select-none self-end font-semibold">
                <span>LESS</span>
                <div className="w-2.5 h-2.5 bg-apricot-secondary/40 border border-apricot-border rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-[#B8436E]/12 border border-[#B8436E]/15 rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-[#B8436E]/30 border border-[#B8436E]/35 rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-[#B8436E]/60 border border-[#B8436E]/70 rounded-[1.5px]" />
                <div className="w-2.5 h-2.5 bg-[#B8436E] border border-[#B8436E]/80" />
                <span>MORE</span>
              </div>

            </div>

          </div>

          {/* Stat metrics for Github contribution row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 select-none">
            
            <div className="premium-card p-4 bg-apricot-card border border-apricot-border rounded text-left relative overflow-hidden group">
              <span className="font-mono text-[9px] text-apricot-text-dim uppercase block font-medium">TOTAL COMMITS</span>
              <h4 className="font-serif italic font-semibold text-2xl text-apricot-accent mt-1.5 flex items-baseline gap-1">
                {stats.total}
                <span className="font-mono text-[8.5px] text-apricot-text-dim font-normal tracking-wide">// UNIT</span>
              </h4>
            </div>

            <div className="premium-card p-4 bg-apricot-card border border-apricot-border rounded text-left relative overflow-hidden group">
              <span className="font-mono text-[9px] text-apricot-text-dim uppercase block font-medium">ACTIVE STREAK</span>
              <h4 className="font-serif italic font-semibold text-2xl text-apricot-accent mt-1.5 flex items-baseline gap-1">
                {stats.currentStreak}
                <span className="font-mono text-[8.5px] text-apricot-text-dim font-normal tracking-wide">DAYS</span>
              </h4>
            </div>

            <div className="premium-card p-4 bg-apricot-card border border-apricot-border rounded text-left relative overflow-hidden group">
              <span className="font-mono text-[9px] text-apricot-text-dim uppercase block font-medium">LONGEST STREAK</span>
              <h4 className="font-serif italic font-semibold text-2xl text-apricot-accent mt-1.5 flex items-baseline gap-1">
                {stats.longestStreak}
                <span className="font-mono text-[8.5px] text-apricot-text-dim font-normal tracking-wide">DAYS</span>
              </h4>
            </div>

            <div className="premium-card p-4 bg-apricot-card border border-apricot-border rounded text-left relative overflow-hidden group">
              <span className="font-mono text-[9px] text-apricot-text-dim uppercase block font-medium">CONSISTENT RATE</span>
              <h4 className="font-serif italic font-semibold text-2xl text-apricot-accent mt-1.5 flex items-baseline gap-1">
                {stats.consistency}%
                <span className="font-mono text-[8.5px] text-apricot-text-dim font-normal tracking-wide">RATIO</span>
              </h4>
            </div>

          </div>

        </div>

        {/* Right Side: Interactive Git Commit Inspector Console (Ivory paper) */}
        <div className="xl:col-span-4 flex flex-col gap-6 justify-between h-full text-left">
          
          <div className="premium-card bg-[#FFFDF9] border border-apricot-border rounded p-5 flex flex-col justify-between h-full min-h-[340px]">
            
            <div className="w-full">
              
              {/* Terminal window headers */}
              <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-dim pb-3 border-b border-apricot-border mb-4 select-none">
                <span className="flex items-center gap-1.5 uppercase font-bold text-apricot-accent">
                  <Terminal className="w-3.5 h-3.5" />
                  COMMIT SHELL INDEX
                </span>
                <span>TTY::03</span>
              </div>

              {/* Dynamic Commit Selection Status */}
              {selectedDay ? (
                <div>
                  <div className="flex items-center justify-between gap-2.5 mb-3 select-none">
                    <span className="font-mono text-[8.5px] text-apricot-accent font-bold bg-apricot-secondary/40 border border-apricot-border p-1 rounded">
                      BLOCK: {selectedDay.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="font-mono text-[9px] text-apricot-text-dim">
                      {selectedDay.count} event{selectedDay.count !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {selectedDay.count > 0 ? (
                    <div className="space-y-4 max-h-[225px] overflow-y-auto pr-1">
                      {selectedDay.logs.map((log) => {
                        let impactColor = "text-apricot-text-muted";
                        let impactLabel = "LOG";
                        if (log.impact === "high") {
                          impactColor = "text-apricot-accent font-bold";
                          impactLabel = "CORE";
                        } else if (log.impact === "medium") {
                          impactColor = "text-apricot-accent/80 font-bold";
                          impactLabel = "FLOW";
                        }

                        return (
                          <div key={log.id} className="border-b border-apricot-border pb-3 last:border-0 hover:bg-apricot-secondary/30 p-1.5 rounded transition-colors text-left font-mono">
                            <div className="flex items-center justify-between text-[8px] text-apricot-text-dim mb-1 font-bold">
                              <span>
                                {log.repo} @ {log.hash}
                              </span>
                              <span>{log.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-apricot-text break-words leading-relaxed leading-tight font-sans">
                              ➔ {log.msg}
                            </p>
                            <div className="mt-1.5 flex items-center gap-2 text-[8px] font-mono">
                              <span className={`px-1.5 py-0.2 bg-apricot-secondary/50 border border-apricot-border rounded ${impactColor}`}>
                                {impactLabel}
                              </span>
                              <span className="text-apricot-text-dim">BY: ankitkumar999090</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center opacity-65 select-none">
                      <Calendar className="w-5 h-5 text-apricot-text-dim mb-2" />
                      <span className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                        No Commit Registers
                      </span>
                      <p className="font-sans text-[10px] text-apricot-text-muted mt-1 max-w-[190px]">
                        Grid commits did not require finality records.
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="py-16 text-center opacity-50 select-none">
                  <span className="font-mono text-[9.5px] text-apricot-text-dim">SELECT ANY CELL MATRIX BLOCK</span>
                </div>
              )}

            </div>

            {/* Interactive simulator controls */}
            <div className="border-t border-apricot-border mt-6 pt-4 select-none">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 outline-none border cursor-pointer bg-apricot-accent hover:bg-apricot-accent-hover text-white border-apricot-accent shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSimulating ? "Streaming Simulation Logs..." : "Launch Contribution Simulator"}</span>
              </button>
            </div>

          </div>

          {/* Dynamic Floating Log Shell if simulating */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="premium-card bg-apricot-secondary border border-apricot-accent/40 rounded p-4 text-left overflow-hidden relative"
              >
                <div className="font-mono text-[8.5px] text-apricot-accent space-y-1.5 max-h-[140px] overflow-y-auto font-bold select-none leading-relaxed">
                  {simulationLog.map((log, idx) => (
                    <div key={idx} className="truncate">
                      {log}
                    </div>
                  ))}
                  <div className="w-1.5 h-3.5 bg-apricot-accent animate-pulse inline-block" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Floating Hover Coordinates Tooltip Container */}
      <AnimatePresence>
        {hoveredCell && (
          <div
            className="fixed bg-[#FFFDF9] border border-apricot-accent px-2.5 py-1.5 rounded shadow-md font-mono text-[9.5px] text-apricot-text pointer-events-none z-50 transition-all duration-75 text-center flex flex-col gap-0.5"
            style={{
              left: "40px",
              bottom: "40px",
            }}
          >
            <span className="font-bold text-apricot-accent">
              {hoveredCell.count} contribution{hoveredCell.count !== 1 ? "s" : ""}
            </span>
            <span className="text-apricot-text-muted text-[8px] uppercase">{hoveredCell.dateStr}</span>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
