import { 
  Cpu, Layers, Code2, Activity, Database, Globe, Shield, Flame, 
  Building2, Landmark, Factory, Link2, Coffee, LucideIcon 
} from "lucide-react";

export interface ToolNode {
  id: string;
  name: string;
  sub: string;
  desc: string;
  icon: LucideIcon;
}

export interface ProjectNode {
  id: string;
  name: string;
  category: string;
  market: string;
  connectedTools: string[];
  icon: LucideIcon;
}

export const TOOLS: ToolNode[] = [
  { 
    id: "python", 
    name: "PYTHON", 
    sub: "AI & DATA SCIENCE", 
    desc: "High-performance ML pipelines and data science infrastructure for AI-native systems.",
    icon: Cpu 
  },
  { 
    id: "solidity", 
    name: "SOLIDITY", 
    sub: "DECENTRALIZED LEDGER", 
    desc: "Smart contract layer for decentralized applications and on-chain protocol logic.",
    icon: Layers 
  },
  { 
    id: "react", 
    name: "REACT & NEXT.JS", 
    sub: "CORE FRONTEND", 
    desc: "Component-driven frontend architecture for complex interactive product interfaces.",
    icon: Code2 
  },
  { 
    id: "redis", 
    name: "REDIS", 
    sub: "STREAMING & CACHE", 
    desc: "Flexible high-performance analytical document storage.", // Based on user prompt
    icon: Activity 
  },
  { 
    id: "mongodb", 
    name: "MONGODB", 
    sub: "DATABASE LAYER", 
    desc: "Flexible high-performance analytical document storage with real-time sync capabilities.",
    icon: Database 
  },
  { 
    id: "plaid", 
    name: "PLAID & CIRCLE API", 
    sub: "FINTECH INTEGRATION", 
    desc: "Bank-grade financial data aggregation and payment initiation API integration layer.",
    icon: Globe 
  },
  { 
    id: "zkp", 
    name: "ZKP TOOLS", 
    sub: "ASSET CRYPTOGRAPHY", 
    desc: "Zero-knowledge proof cryptography for privacy-preserving identity and asset verification.",
    icon: Shield 
  },
  { 
    id: "firebase", 
    name: "FIREBASE", 
    sub: "APPLICATION BACKEND", 
    desc: "Real-time application backend with authentication, Firestore, and cloud functions.",
    icon: Flame 
  }
];

export const PROJECTS: ProjectNode[] = [
  {
    id: "urban-flow",
    name: "URBAN FLOW AI",
    category: "SMART CITY",
    market: "INDIA",
    icon: Building2,
    connectedTools: ["python", "react", "redis", "mongodb", "firebase"]
  },
  {
    id: "defi-gateway",
    name: "DEFI BANKING GATEW...",
    category: "FINTECH INFRASTRUCTURE",
    market: "USA",
    icon: Landmark,
    connectedTools: ["solidity", "react", "mongodb", "plaid", "zkp"]
  },
  {
    id: "aml-engine",
    name: "AML INTELLIGENCE E...",
    category: "AI + COMPLIANCE",
    market: "USA",
    icon: Shield,
    connectedTools: ["python", "mongodb", "redis", "firebase"]
  },
  {
    id: "assava",
    name: "ASSAVA WORKFORCE ...",
    category: "AI + MARKETPLACE",
    market: "INDIA",
    icon: Factory,
    connectedTools: ["python", "react", "redis", "mongodb", "firebase"]
  },
  {
    id: "identity",
    name: "ON-CHAIN IDENTITY P...",
    category: "BLOCKCHAIN + IDENTITY",
    market: "GLOBAL",
    icon: Link2,
    connectedTools: ["solidity", "zkp", "react", "firebase"]
  },
  {
    id: "caffenia",
    name: "CAFFENIA",
    category: "FULL STACK",
    market: "INDIA",
    icon: Coffee,
    connectedTools: ["react", "mongodb", "firebase", "redis"]
  }
];

// Mapping for specific interactions between a Tool and a Project
export const TOOL_PROJECT_DESCRIPTIONS: Record<string, string> = {
  // Python
  "python-urban-flow": "Runs traffic prediction ML models and EV routing algorithms.",
  "python-aml-engine": "Trains GNN models for transaction anomaly detection.",
  "python-assava": "Powers bipartite job-matching graph algorithms.",
  
  // Solidity
  "solidity-defi-gateway": "Smart contracts handle token transfers and escrow logic.",
  "solidity-identity": "Core identity credential contracts deployed on Ethereum.",
  
  // React
  "react-urban-flow": "Renders real-time city map visualizations and admin dashboards.",
  "react-defi-gateway": "Powers the secure fintech portal and wallet integration UI.",
  "react-assava": "Delivers mobile-friendly worker portal and job board interfaces.",
  "react-identity": "Provides decentralized wallet authentication and profile management.",
  "react-caffenia": "Builds high-performance commercial storefronts and checkout flows.",

  // Redis
  "redis-urban-flow": "Caches geospatial traffic queries for ultra-low latency.",
  "redis-aml-engine": "Maintains sliding window transaction histories for streaming ML models.",
  "redis-assava": "Stores active worker sessions and real-time job availability.",
  "redis-caffenia": "Manages high-throughput cart sessions and inventory locking.",

  // MongoDB
  "mongodb-urban-flow": "Stores historical traffic vectors, city paths, and sensor registries.",
  "mongodb-defi-gateway": "Persists transaction audits, legal AML profiles, and compliance registries.",
  "mongodb-aml-engine": "Stores transaction graph data and ML training datasets.",
  "mongodb-assava": "Manages worker profiles, job listings, and shift records.",
  "mongodb-caffenia": "Stores product catalog, orders, and user accounts.",

  // Plaid
  "plaid-defi-gateway": "Bridges fiat bank accounts with on-chain stablecoin liquidity.",

  // ZKP
  "zkp-defi-gateway": "Provides private proofs for accredited investor status verification.",
  "zkp-identity": "Generates zk-SNARK proofs for anonymous identity claims.",

  // Firebase
  "firebase-urban-flow": "Pushes real-time alerts to municipal managers.",
  "firebase-aml-engine": "Provides secure authentication for compliance officers.",
  "firebase-assava": "Handles push notifications and instant shift updates.",
  "firebase-identity": "Syncs off-chain metadata and user session states.",
  "firebase-caffenia": "Powers user authentication, saved carts, and order updates."
};
