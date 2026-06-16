/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Search, 
  Filter, 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Lock, 
  Database, 
  Activity, 
  ArrowRight,
  Info,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Moon,
  Sun
} from "lucide-react";

export interface LogEntry {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  role: string;
  category: "Applied Cryptography" | "ML Edge Inference" | "Compliance Automation" | "High-Rate Ingestion" | "Distributed Consensus";
  readingTime: string;
  technicalDepth: "High" | "Extremely High" | "Critical Principal";
  summary: string;
  content: string;
  codeSnippet?: string;
  hazards: string[];
}

export const INITIAL_LOGS: LogEntry[] = [
  {
    id: "log-01",
    title: "Refactoring Reentrancy Mutex Guards on ERC-20 Ledger Bridges",
    slug: "refactoring-reentrancy-mutex-guards",
    date: "2026-06-12",
    author: "Ankit Sharma",
    role: "Senior Distributed Architect",
    category: "Applied Cryptography",
    readingTime: "5 min read",
    technicalDepth: "Critical Principal",
    summary: "An in-depth post-mortem and structural resolution of a high-concurrency race condition inside our Aegis contract accounting sweeps under simulated high-rate deposits.",
    content: `### 1. THE CONCURRENCY HAZARD
Under high-velocity stress testing simulating over 5,000 deposit requests per minute on the Arbitrum L2 gasless escrow, our monitoring stack caught intermittent dual-credit balance sweep alerts.

Analysis of the ledger bridge contract revealed that standard balance sweeps resolved their external token transfers *before* updating the inner credit states. This classic reentrancy gap allowed multi-threaded Plaid bank webhooks to double-fire transfer instructions inside a 1500ms safety window.

### 2. STRUCTURAL CONTRACT ARCHITECTURE
Legacy implementation (Vulnerable):
\`\`solidity
// ❌ VULNERABLE CODE - Transfer before state update
function sweepEscrow(bytes32 depositId) external {
    uint256 amount = escrowBalances[depositId];
    require(amount > 0, "No funds locked");
    
    // External contract call before state reduction
    (bool success, ) = targetBridge.call(abi.encodeWithSignature("mint(address,uint256)", userAddress, amount));
    require(success, "Bridge transfer failed");
    
    escrowBalances[depositId] = 0; // State mutation too late!
}
\`\`

Our patch aligns both the Solidity contract layout with the **Checks-Effects-Interactions** model and maps local API gates to prevent webhook redundancy.

### 3. THE RECONCILIATION ENGINE PATCH
We deployed a dynamic, dual-ledger lock. First, we shifted the contract's local variable updates to occur *before* the external bridge call. Second, we deployed an atomic Redis mutex locks in our Express gateway.

\`\`solidity
// ✅ HARDENED CODE - State modified FIRST
function sweepEscrowSecure(bytes32 depositId) external nonReentrant {
    uint256 amount = escrowBalances[depositId];
    require(amount > 0, "Zero funds active");
    
    // 1. Checks: completed above
    // 2. Effects: state updated immediately
    escrowBalances[depositId] = 0;
    
    // 3. Interactions: external token gateway called last
    (bool success, ) = targetBridge.call(abi.encodeWithSignature("mint(address,uint256)", userAddress, amount));
    require(success, "Bridge call reversed");
}
\`\``,
    codeSnippet: `// API Mutex lock implementation
const acquireMutexLock = async (depositId: string): Promise<boolean> => {
  const absoluteKey = \`lock:escrow:\${depositId}\`;
  const isAcquired = await redis.set(absoluteKey, "locked", "NX", "PX", 2500);
  return isAcquired !== null;
};`,
    hazards: ["REENTRANCY_VULNERABILITY", "COMPETITION_RACE_STATE", "ACH_SETTLE_SWEEP_REDUNDANCY"]
  },
  {
    id: "log-02",
    title: "Quantizing Spatio-Temporal GCN Road Networks into 8-Bit Interstitial Math",
    slug: "quantizing-spatio-temporal-gcn",
    date: "2026-05-28",
    author: "Ankit Sharma",
    role: "ML Systems Director",
    category: "ML Edge Inference",
    readingTime: "7 min read",
    technicalDepth: "Extremely High",
    summary: "Compressing dense Float32 Graph Conv Network weights to execute real-time traffic wave calculations on roadside ARM microcontrollers without forecasting model drift.",
    content: `### 1. THE EDGE POWER BARRIER
Our Spatio-Temporal Graph Neural Networks (STGNN) used to forecast metropolitan traffic waves in Tier-1 Indian cities are highly precise but computationally heavy. 

Standard PyTorch network models operate on 32-bit floating-point (Float32) weight matrices. When deployed to solar-powered roadside municipal controllers, the 180MB model memory footprints regularly triggered Out-Of-Memory (OOM) leaks and intense processor heat levels.

### 2. COMPACT INTEGER TRANSFORMATIONS (INT8)
To operate continuously inside roadside nodes, the matrix calculation pathways required optimization. We structured an INT8 quantization workflow.

By translating the floating-point values down to signed 8-bit integers, we reduce calculations to simple, fast CPU register operations:

$$W_{int8} = \\text{clamp}\\left(\\text{round}\\left(\\frac{W_{float32}}{S}\\right) + Z, -128, 127\\right)$$

Where **S** represents the scale coefficient and **Z** represents the mathematical zero-point index.

### 3. DEPLOYMENT CRITERIA & OUTPUTS
To stop localized network predictions from drifting, we performed **Quantization-Aware Training (QAT)** by feeding simulated local coordinates arrays during model calibration.

- Model file size shrunk from **180MB** to an incredibly compact **12.4MB** (93% reduction).
- Calculation latencies dropped from 440ms to **38ms**, letting edge boxes update predictions at 10Hz intervals.
- The traffic prediction accuracy lost was less than **0.65%**, guaranteeing precise routing coordinates.`,
    codeSnippet: `// Quantization Configuration
import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8
tflite_quant_model = converter.convert()`,
    hazards: ["EDGE_OOM_RESOURCE_SPIKES", "MATRIX_WEIGHT_UNDERFLOW", "FORECAST_DRIFT_DIVERGENCE"]
  },
  {
    id: "log-03",
    title: "Linear String Indexing & Multi-Core Bitmask Checks for FinCEN Lists",
    slug: "linear-string-indexing-fincen",
    date: "2026-04-15",
    author: "Ankit Sharma",
    role: "Systems Specialist",
    category: "Compliance Automation",
    readingTime: "4 min read",
    technicalDepth: "High",
    summary: "Mapping US FinCEN SDN and OFAC sanction registries to customized Redis Bloom Filters to execute 45,000 fuzzy compliance checks per second on wire transaction flows.",
    content: `### 1. FUZZY STRING COMPUTATIONAL WALLS
Comparing thousands of incoming international wiring names (e.g., matching 'Mohammed Al-Sharif' to list entries like 'Mhd Al-Shareef') requires complex string algebra such as the Jaro-Winkler metric.

Calculating Jaro-Winkler equations inline across our 12,000 coordinates/second payments ledger created severe processor locking. Conventional SQL databases completely choked, dragging API response times above 1400ms.

### 2. THE MULTI-STAGE BITMASK FILTER
We solved this by splitting our screening logic into a two-tiered filter architecture:

1. **Pre-check (Bloom Filter)**: We hash client Names into optimized Redis Bloom Filters initialized with a strict false-positive target of 0.01%. Clean, non-matching profiles clear this check in less than 0.2ms.
2. **Heavy Match Group (GNN Graph)**: Only the suspicious 1.2% matching profiles are sent to the deep ML engine for exact Jaro-Winkler distance and graph evaluations.

### 3. MATHEMATICAL ALIGNMENT MATRIX
The Bloom Filter utilizes multiple independent hash calculation paths to map the name into a compact byte array:

$$P(e) = \\left(1 - e^{-kn/m}\\right)^k$$

Where **m** is bit array length, **n** is the number of inserted strings, and **k** is the amount of hashing checks.`,
    codeSnippet: `// Initialize Bloom Filter with Plated Keys
const checkSanctionFilter = async (clientName: string): Promise<boolean> => {
  const normalized = clientName.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Quick in-memory bloom test
  const isPresent = await redis.bf.exists("sanctions:sdn:bloom", normalized);
  return isPresent; // true indicates potential hit -> direct to GNN list
};`,
    hazards: ["STRING_ALGEBRA_CPU_BLOCKING", "REGULATORY_SCREENING_FALSE_POSITIVES", "LEDGER_INGESTION_LATENCY_SPIKES"]
  },
  {
    id: "log-04",
    title: "Eliminating Thread Logs on Multi-Worker Geosharded Ingestion Sockets",
    slug: "eliminating-thread-logs-geosharded",
    date: "2026-03-02",
    author: "Ankit Sharma",
    role: "Core Platform Architect",
    category: "High-Rate Ingestion",
    readingTime: "6 min read",
    technicalDepth: "Extremely High",
    summary: "Resolving GPRS vehicle coordination drops by switching JSON streams to Protobuf and sharding Redis Pub/Sub channels across geographic coordinate sectors.",
    content: `### 1. THE INGESTION BOTTLE-NECK
Receiving telemetry streams from 15,000 GPS coordinate transmitters on a single Express/Node server caused severe event-loop blockage. Web browser clients experienced rendering delays, and about 4.2% of raw coordination logs were dropped during peak times.

The thread locks were traced to heavy operations translating massive JSON string coordinates inside Node's V8 single-threaded memory queue.

### 2. PROTOBUF BINARY COMPRESSION & SWEEPS
We re-engineered the coordinate transmission packets. Moving from stringified JSON packages to optimized **Protocol Buffers (Protobuf)** dropped standard packet weight from 340 bytes to 44 bytes.

\`\`\`protobuf
// Optimized positional telemetry payload structure
message VehicleCoordinates {
  required string vehicle_id = 1;
  required double latitude = 2;
  required double longitude = 3;
  required int64 timestamp = 4;
  required float engine_temp = 5;
}
\`\`\`

### 3. GEOSHARDED CLUSTER NETWORKS
Rather than subscribing to a single consolidated data channel, we divided our Redis message queues into localized geospatial sectors. 

Rather than sending signals globally, NodeJS worker threads only listen to coordinates originating within their assigned sector, splitting the data traffic across separate hardware processor cores. Packet drop rates plummeted to exactly 0.00%.`,
    codeSnippet: `// Spatial Sector Segment Logic
export function getSpatialClusterShard(lat: number, lg: number): string {
  const sectorX = Math.floor((lg + 180) / 5); // 5-degree intervals
  const sectorY = Math.floor((lat + 90) / 5);
  return \`coordinates:shard:x\${sectorX}:y\${sectorY}\`;
}`,
    hazards: ["SINGLE_THREAD_EVENT_LOCKS", "TELEMETRY_PACKET_DROPS", "JSON_PARSING_CPU_OVERHEAD"]
  }
];

export default function EngineeringLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeReadLog, setActiveReadLog] = useState<LogEntry | null>(null);

  const [isPaperDark, setIsPaperDark] = useState(() => {
    try {
      return localStorage.getItem("aegis_paper_dark") === "true";
    } catch (e) {
      return false;
    }
  });

  const togglePaperDark = () => {
    setIsPaperDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aegis_paper_dark", String(next));
      } catch (e) {}
      return next;
    });
  };
  
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<LogEntry["category"]>("Applied Cryptography");
  const [newDepth, setNewDepth] = useState<LogEntry["technicalDepth"]>("Extremely High");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCodeSnippet, setNewCodeSnippet] = useState("");
  const [newHazards, setNewHazards] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aegis_engineering_logs");
      if (stored) {
        setLogs(JSON.parse(stored));
      } else {
        setLogs(INITIAL_LOGS);
        localStorage.setItem("aegis_engineering_logs", JSON.stringify(INITIAL_LOGS));
      }
    } catch (e) {
      setLogs(INITIAL_LOGS);
    }
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesCategory = selectedCategory === "ALL" || log.category === selectedCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();
      if (!cleanQuery) return matchesCategory;

      const matchesSearch = 
        log.title.toLowerCase().includes(cleanQuery) ||
        log.summary.toLowerCase().includes(cleanQuery) ||
        log.author.toLowerCase().includes(cleanQuery) ||
        log.content.toLowerCase().includes(cleanQuery) ||
        log.hazards.some(h => h.toLowerCase().includes(cleanQuery));

      return matchesCategory && matchesSearch;
    });
  }, [logs, selectedCategory, searchQuery]);

  const categories = ["ALL", "Applied Cryptography", "ML Edge Inference", "Compliance Automation", "High-Rate Ingestion", "Distributed Consensus"];

  const handlePublishLog = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim()) {
      alert("Missing required fields. Please fill Title, Summary, and Content.");
      return;
    }

    const compiledHazards = newHazards
      .split(",")
      .map(h => h.trim().toUpperCase().replace(/\s+/g, "_"))
      .filter(h => h.length > 0);

    const createdLog: LogEntry = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      slug: newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      date: new Date().toISOString().split('T')[0],
      author: "Ankit Sharma (Visitor Mode)",
      role: "Visiting Systems Auditor",
      category: newCategory,
      readingTime: `${Math.max(2, Math.ceil(newContent.length / 800))} min read`,
      technicalDepth: newDepth,
      summary: newSummary.trim(),
      content: newContent.trim(),
      codeSnippet: newCodeSnippet.trim() || undefined,
      hazards: compiledHazards.length > 0 ? compiledHazards : ["VISITOR_AUDIT_ENTRY"]
    };

    const updated = [createdLog, ...logs];
    setLogs(updated);
    localStorage.setItem("aegis_engineering_logs", JSON.stringify(updated));

    setNewTitle("");
    setNewSummary("");
    setNewContent("");
    setNewCodeSnippet("");
    setNewHazards("");
    
    setSuccessToast("Technical log successfully added to browser ledger!");
    setShowAdminConsole(false);
    setActiveReadLog(createdLog);

    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset current engineering logs back to official original seeds?")) {
      setLogs(INITIAL_LOGS);
      localStorage.setItem("aegis_engineering_logs", JSON.stringify(INITIAL_LOGS));
      setActiveReadLog(null);
      setSuccessToast("Engineering log reset to default baseline.");
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  const handleDeleteLog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Proceed to delete this log entry permanently?")) {
      const filtered = logs.filter(l => l.id !== id);
      setLogs(filtered);
      localStorage.setItem("aegis_engineering_logs", JSON.stringify(filtered));
      if (activeReadLog?.id === id) {
        setActiveReadLog(null);
      }
      setSuccessToast("Register entry purged successfully.");
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <section id="engineering-log" className="bg-apricot-bg py-24 relative border-t border-apricot-border overflow-hidden">
      <div className="absolute inset-0 bg-apricot-secondary/10 bg-[radial-gradient(rgba(192,79,131,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-apricot-accent/5 border border-apricot-border px-2.5 py-0.5 rounded text-[9.5px] font-mono text-apricot-accent uppercase tracking-wider mb-3 select-none">
              <Terminal className="w-3.5 h-3.5 text-apricot-accent" />
              SECURE DECENTRALIZED LOG REGISTERS
            </div>
            <h2 
              className="font-serif italic font-medium text-apricot-text"
              style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: "1.15" }}
            >
              Engineering Lab Journal
            </h2>
            <p className="font-sans text-xs sm:text-sm text-apricot-text-muted mt-2 max-w-2xl leading-relaxed">
              Highly technical analyses of software performance problems, network latency optimizations, and cryptographic compliance controls. Real-time entries persist locally in your browser cache.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0 select-none">
            <button
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className="px-4 py-2 bg-apricot-card hover:bg-apricot-secondary border border-apricot-accent text-apricot-accent rounded font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>DRAFT JOURNAL ENTRY</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="p-2 bg-apricot-card hover:bg-apricot-secondary border border-apricot-border text-apricot-text-dim hover:text-apricot-text rounded transition-all cursor-pointer"
              title="Reset records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success toast alert indicator */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-3 text-emerald-800 font-mono text-xs text-left"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <span className="font-bold block uppercase tracking-wide">[STATUS SUCCESS]</span>
                <span className="text-emerald-900 mt-0.5 block">{successToast}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Admin creation console form */}
        <AnimatePresence>
          {showAdminConsole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <form 
                onSubmit={handlePublishLog}
                className="premium-card p-6 bg-apricot-card border border-apricot-accent rounded text-left flex flex-col gap-5 relative"
              >
                <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-apricot-accent to-transparent"></div>
                
                <div className="flex items-center justify-between border-b border-apricot-border pb-3 select-none">
                  <span className="font-mono text-xs font-extrabold text-apricot-accent flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    CREATE NEW ENGINEERING CHRONICLE POST
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAdminConsole(false)}
                    className="font-mono text-[10px] text-apricot-text-dim hover:text-apricot-text transition-colors"
                  >
                    [CANCEL]
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Title field */}
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                      Post Title (Log Heading) *
                    </label>
                    <input
                      required
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Solving Memory Fragmentation on Redis Key Clusters"
                      className="bg-apricot-secondary border border-apricot-border rounded px-3 py-2 text-xs font-mono text-apricot-text placeholder-apricot-text-dim outline-none focus:border-apricot-accent transition-all"
                    />
                  </div>

                  {/* Category Field */}
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                      Engineering Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="bg-apricot-secondary border border-apricot-border rounded px-2.5 py-2 text-xs font-mono text-apricot-text-muted outline-none focus:border-apricot-accent"
                    >
                      <option value="Applied Cryptography">Applied Cryptography</option>
                      <option value="ML Edge Inference">ML Edge Inference</option>
                      <option value="Compliance Automation">Compliance Automation</option>
                      <option value="High-Rate Ingestion">High-Rate Ingestion</option>
                      <option value="Distributed Consensus">Distributed Consensus</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Technical Depth */}
                  <div className="md:col-span-4 flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                      Technical Depth Level
                    </label>
                    <select
                      value={newDepth}
                      onChange={(e) => setNewDepth(e.target.value as any)}
                      className="bg-apricot-secondary border border-apricot-border rounded px-2.5 py-2 text-xs font-mono text-apricot-accent outline-none focus:border-apricot-accent"
                    >
                      <option value="High">Level: High</option>
                      <option value="Extremely High">Level: Extremely High</option>
                      <option value="Critical Principal">Level: Critical Principal</option>
                    </select>
                  </div>

                  {/* Hazard tags mapping */}
                  <div className="md:col-span-8 flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                      Hazard / Topic Identifiers (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newHazards}
                      onChange={(e) => setNewHazards(e.target.value)}
                      placeholder="e.g. MEMORY_LEAK, REDIS, CACHE_DRIFT"
                      className="bg-apricot-secondary border border-apricot-border rounded px-3 py-2 text-xs font-mono text-apricot-text placeholder-apricot-text-dim outline-none focus:border-apricot-accent"
                    />
                  </div>
                </div>

                {/* Summary field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                    Brief Summary (Aesthetic Teaser) *
                  </label>
                  <input
                    required
                    type="text"
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Short summary highlighting the core problem vectors and solution mechanics..."
                    className="bg-apricot-secondary border border-apricot-border rounded px-3 py-2 text-xs font-mono text-apricot-text placeholder-apricot-text-dim outline-none focus:border-apricot-accent"
                  />
                </div>

                {/* Content body */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                    Technical Narrative Content Body (Markdown is supported) *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Use markdown headers (###), paragraphs, or bullet logs to explain the incident, root cause, and deployment resolution..."
                    className="bg-apricot-secondary border border-apricot-border rounded p-3 text-xs font-mono text-apricot-text placeholder-apricot-text-dim outline-none focus:border-apricot-accent h-[160px] resize-y"
                  />
                </div>

                {/* Code Snippet field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-apricot-text-dim uppercase font-bold">
                    Code Patch Snippet (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={newCodeSnippet}
                    onChange={(e) => setNewCodeSnippet(e.target.value)}
                    placeholder="// e.g. code snippets detailing helper structures, contract functions or config constants"
                    className="bg-apricot-secondary border border-apricot-border rounded p-3 text-xs font-mono text-apricot-accent placeholder-apricot-text-dim outline-none focus:border-apricot-accent h-[100px] resize-y"
                  />
                </div>

                {/* Form CTA Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminConsole(false)}
                    className="px-4 py-2 border border-apricot-border hover:border-apricot-text-dim text-apricot-text-dim hover:text-apricot-text font-mono text-xs rounded transition-all"
                  >
                    DISCARD
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-apricot-accent hover:bg-apricot-accent-hover text-white font-mono text-xs font-bold rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>PUBLISH TO BROWSER CACHE</span>
                  </button>
                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between mb-8 pb-4 border-b border-apricot-border">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md select-none">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-apricot-text-dim" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. mutex, Bloom, coordinates...)"
              className="w-full bg-apricot-card hover:bg-apricot-bg border border-apricot-border rounded pl-10 pr-4 py-2 text-xs font-mono text-apricot-text placeholder-apricot-text-dim outline-none focus:border-apricot-accent focus:ring-1 focus:ring-apricot-accent/20 transition-all"
            />
          </div>

          {/* Scrolling category tags list */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded font-mono text-[9px] font-bold border whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-apricot-accent border-apricot-accent text-white"
                    : "bg-apricot-card border-apricot-border text-apricot-text-muted hover:text-apricot-text hover:border-apricot-accent"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive feeds */}
          <div className={`${activeReadLog ? "lg:col-span-6" : "lg:col-span-12"} space-y-4 text-left transition-all duration-300`}>
            
            <div className="flex items-center justify-between font-mono text-[9px] text-apricot-text-dim select-none uppercase tracking-wider mb-2">
              <span>{filteredLogs.length} dynamic results loaded</span>
              <span>TTY::OUTPUT_GATEWAY</span>
            </div>

            {filteredLogs.length > 0 ? (
              <div className="space-y-4">
                {filteredLogs.map((log) => {
                  const isActive = activeReadLog?.id === log.id;
                  
                  return (
                    <div
                      key={log.id}
                      onClick={() => setActiveReadLog(log)}
                      className={`premium-card p-5 rounded border transition-all duration-300 cursor-pointer text-left relative overflow-hidden flex flex-col justify-between h-full group min-w-0 ${
                        isActive
                          ? "bg-apricot-card border-apricot-accent shadow-sm"
                          : "bg-apricot-card border-apricot-border hover:border-apricot-accent"
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      <div>
                        {/* Upper row parameters */}
                        <div className="flex items-center justify-between text-[9px] font-mono mb-3 select-none">
                          <span className="text-apricot-accent font-extrabold uppercase tracking-wider">
                            {log.category}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-apricot-text-muted flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {log.readingTime}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded font-semibold text-[8px] border shrink-0 ${
                              log.technicalDepth === "Critical Principal"
                                ? "bg-red-50 border-red-200 text-red-800"
                                : log.technicalDepth === "Extremely High"
                                ? "bg-amber-50 border-amber-200 text-amber-800"
                                : "bg-apricot-secondary border-apricot-border text-apricot-accent"
                            }`}>
                              {log.technicalDepth.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Title Header */}
                        <h3 className="font-sans font-bold text-base text-apricot-text group-hover:text-apricot-accent tracking-tight leading-snug transition-colors">
                          {log.title}
                        </h3>

                        {/* Summary */}
                        <p className="font-sans text-xs text-apricot-text-muted mt-2.5 leading-relaxed">
                          {log.summary}
                        </p>
                      </div>

                      {/* Lower metrics row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-apricot-border">
                        <div className="flex items-center mt-1 gap-2.5 font-mono text-[9px] text-apricot-text-dim">
                          <span>
                            BLOCK-DATE: <strong className="text-apricot-text font-medium">{log.date}</strong>
                          </span>
                          <span>
                            WRITER: <strong className="text-apricot-text font-medium">{log.author}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1 select-none">
                          {log.id.startsWith("custom") && (
                            <button
                              onClick={(e) => handleDeleteLog(log.id, e)}
                              className="p-1 text-apricot-text-dim hover:text-red-750 bg-red-50 hover:bg-red-100 border border-transparent hover:border-red-200 rounded transition-all"
                              title="Delete local post"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          
                          <div className="flex items-center gap-0.5 font-mono text-[10px] text-apricot-accent font-bold group-hover:translate-x-0.5 transition-transform pl-1">
                            <span>READ REGISTER</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="premium-card py-16 text-center border border-apricot-border rounded bg-apricot-card select-none">
                <AlertTriangle className="w-6 h-6 text-apricot-accent mx-auto mb-3 opacity-65" />
                <span className="font-mono text-xs font-bold text-apricot-text uppercase">
                  No Matching Journal Lists Located
                </span>
                <p className="font-sans text-xs text-apricot-text-muted mt-1 max-w-sm mx-auto">
                  Adjust your search inputs or toggle different tabs above to retrieve indexed reports.
                </p>
              </div>
            )}

          </div>

          {/* Right: Embedded system reading terminal console (ivory parchment design) */}
          <AnimatePresence>
            {activeReadLog && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="lg:col-span-6 flex flex-col h-full text-left"
              >
                <div className={`premium-card p-6 flex flex-col justify-between h-full relative overflow-hidden min-h-[500px] transition-all duration-300 ${
                  isPaperDark 
                    ? "bg-[#1E1610] border-[#4A3C34] text-[#FAF5EE]" 
                    : "bg-[#FFFDF9] border-apricot-accent text-apricot-text-muted"
                }`}>
                  
                  <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t rounded-tl transition-colors ${
                    isPaperDark ? "border-[#B8436E]/45" : "border-apricot-accent/45"
                  }`} />
                  <div className={`absolute top-0 right-0 w-3 h-3 border-r border-t rounded-tr transition-colors ${
                    isPaperDark ? "border-[#B8436E]/45" : "border-apricot-accent/45"
                  }`} />

                  <div>
                    {/* Header bar controls */}
                    <div className={`flex items-center justify-between font-mono text-[9px] border-b pb-3 mb-4 select-none transition-colors ${
                      isPaperDark ? "border-[#4A3C34]/80 text-[#B0A090]" : "border-apricot-border text-apricot-text-dim"
                    }`}>
                      <span className={`flex items-center gap-1.5 font-extrabold uppercase animate-pulse transition-colors ${
                        isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"
                      }`}>
                        <Activity className="w-3.5 h-3.5" />
                        ACTIVE JOURNAL AUDIT VIEWPORT
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {/* Reading Mode Toggle Button */}
                        <button
                          type="button"
                          onClick={togglePaperDark}
                          className={`px-2 py-0.5 border rounded transition-all flex items-center gap-1 cursor-pointer text-[8px] font-mono font-bold ${
                            isPaperDark
                              ? "bg-[#2D1F17] border-[#4A3C34] text-[#E66E90] hover:text-[#FF9EAA]"
                              : "bg-apricot-secondary border-apricot-border text-apricot-text-dim hover:text-apricot-text"
                          }`}
                          title="Toggle Reading Mode (Paper-Dark Contrast Theme)"
                        >
                          {isPaperDark ? <Sun className="w-2.5 h-2.5" /> : <Moon className="w-2.5 h-2.5" />}
                          <span>READING MODE: {isPaperDark ? "DARK" : "LIGHT"}</span>
                        </button>

                        <button
                          onClick={() => setActiveReadLog(null)}
                          className={`px-1.5 py-0.5 border rounded transition-all flex items-center gap-0.5 cursor-pointer text-[8px] font-mono ${
                            isPaperDark
                              ? "bg-[#2D1F17] border-[#4A3C34] text-[#FAF5EE] hover:text-[#FEFCF8]"
                              : "bg-apricot-secondary border-apricot-border text-apricot-text-dim hover:text-apricot-text"
                          }`}
                        >
                          [CLOSE CONSOLE]
                        </button>
                      </div>
                    </div>

                    {/* Metadata summary */}
                    <div className={`border rounded p-3.5 mb-5 font-mono text-[9px] space-y-1.5 text-left relative select-none transition-colors ${
                      isPaperDark 
                        ? "bg-[#251C15] border-[#4A3C34]" 
                        : "bg-apricot-secondary/40 border-apricot-border"
                    }`}>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className={`font-bold uppercase leading-snug transition-colors ${
                          isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"
                        }`}>
                          {activeReadLog.title}
                        </span>
                      </div>
                      <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 border-t mt-1.5 font-medium transition-colors ${
                        isPaperDark ? "border-[#4A3C34]/60 text-[#FAF5EE]" : "border-apricot-border text-apricot-text-muted"
                      }`}>
                        <span>WRITER: <strong className={`transition-colors ${isPaperDark ? "text-[#E66E90] font-bold" : "text-apricot-accent font-bold"}`}>{activeReadLog.author}</strong></span>
                        <span>DATE: <strong className={`transition-colors ${isPaperDark ? "text-[#FEFCF8]" : "text-apricot-text"}`}>{activeReadLog.date}</strong></span>
                        <span>DEPTH: <strong className={`transition-colors ${isPaperDark ? "text-[#E66E90]" : "text-apricot-accent"}`}>{activeReadLog.technicalDepth}</strong></span>
                      </div>
                    </div>

                    {/* Article Body monospaced printing block */}
                    <div className={`relative font-mono text-[11px] leading-relaxed max-h-[380px] overflow-y-auto pr-2 overflow-x-hidden space-y-4 ${
                      isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                    }`}>
                      
                      {activeReadLog.content.split("\n\n").map((chunk, idx) => {
                        // Header tags
                        if (chunk.startsWith("###")) {
                          return (
                            <h4 key={idx} className={`font-sans font-bold text-xs uppercase tracking-wide border-l-2 pl-2 mt-4 transition-colors ${
                              isPaperDark
                                ? "text-[#FEFCF8] border-[#E66E90]"
                                : "text-apricot-text border-apricot-accent"
                            }`}>
                              {chunk.replace("###", "").trim()}
                            </h4>
                          );
                        }

                        // Code logs blocks
                        if (chunk.trim().startsWith("```")) {
                          const codeLines = chunk.replace(/```[a-z]*/g, "").trim();
                          return (
                            <div key={idx} className={`p-3 rounded border overflow-x-auto text-[10px] relative select-text leading-tight group font-mono transition-colors ${
                              isPaperDark
                                ? "bg-[#130D08] border-[#4A3C34] text-[#FAF5EE]"
                                : "bg-apricot-secondary border border-apricot-border text-apricot-text"
                            }`}>
                              <span className={`absolute top-1 right-2 text-[7.5px] font-bold uppercase select-none transition-colors ${
                                isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                              }`}>CODE DEPLOY PATCH</span>
                              <pre className="m-0 font-mono">{codeLines}</pre>
                            </div>
                          );
                        }

                        return (
                          <p key={idx} className={`whitespace-pre-line text-left leading-relaxed font-sans text-xs transition-colors ${
                            isPaperDark ? "text-[#FAF5EE]" : "text-apricot-text-muted"
                          }`}>
                            {chunk}
                          </p>
                        );
                      })}

                      {/* Display snippet helper block if present */}
                      {activeReadLog.codeSnippet && !activeReadLog.content.includes(activeReadLog.codeSnippet) && (
                        <div className={`mt-4 pt-4 border-t transition-colors ${
                          isPaperDark ? "border-[#4A3C34]" : "border-apricot-border"
                        }`}>
                          <span className={`font-mono text-[8.5px] uppercase font-bold tracking-wider block mb-1.5 select-none transition-colors ${
                            isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                          }`}>INTEGRATION CONSOLE REFERENCE</span>
                          <div className={`p-3 rounded border overflow-x-auto text-[10px] relative select-text leading-tight font-mono transition-colors ${
                            isPaperDark
                              ? "bg-[#130D08] border-[#4A3C34] text-[#FAF5EE]"
                              : "bg-apricot-secondary border border-apricot-border text-apricot-text"
                          }`}>
                            <pre className="font-mono m-0">{activeReadLog.codeSnippet}</pre>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Active Hazards Risk Map list */}
                    <div className={`mt-6 pt-4 border-t text-left transition-colors ${
                      isPaperDark ? "border-[#4A3C34]" : "border-apricot-border"
                    }`}>
                      <span className={`font-mono text-[8px] uppercase font-bold block mb-2 select-none transition-colors ${
                        isPaperDark ? "text-[#B0A090]" : "text-apricot-text-dim"
                      }`}>
                        ➔ COMPLIANCE INCIDENT RISKS PARAMETERS INDEX
                      </span>
                      <div className="flex flex-wrap gap-1.5 select-none">
                        {activeReadLog.hazards.map((haz, hidx) => (
                          <span
                            key={hidx}
                            className={`px-2 py-0.5 border font-mono text-[8.5px] font-semibold rounded transition-colors ${
                              isPaperDark
                                ? "bg-[#331C15] border-[#5E2B20] text-[#FFC4C4]"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                          >
                            ⚠️ {haz}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Closing line benchmarks */}
                  <div className={`mt-8 pt-4 border-t flex items-center justify-between font-mono text-[8.5px] select-none uppercase transition-colors ${
                    isPaperDark ? "border-[#4A3C34] text-[#B0A090]" : "border-apricot-border text-apricot-text-dim"
                  }`}>
                    <span>SECURITY CRITERIA: OFAC & SECTOR RECONCILED</span>
                    <span>MD5::PASS_AUDIT</span>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
