/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  status: 'In Development' | 'Building' | 'In Progress' | 'Planned' | 'Live';
  statusColor: string;
  market: string;
  desc: string;
  stack: string[];
  compliance?: string[];
  sector?: string;
  github: string;
  live?: string;
  type: string;
  visualType: 'city' | 'defi' | 'aml' | 'workforce' | 'identity' | 'ecommerce';
}

export interface Domain {
  title: string;
  icon: string;
  desc: string;
  tags: string[];
  color: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface ResearchCard {
  category: string;
  title: string;
  note: string;
  source: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface Stat {
  val: number;
  suffix: string;
  label: string;
  mono: string;
}

export const DOMAINS: Domain[] = [
  {
    title: "Smart City & Mobility APIs",
    icon: "Building2",
    desc: "AI APIs for sustainable urban mobility — traffic prediction, EV routing optimization, carbon footprint tracking, and logistics intelligence for Indian Smart Cities Mission.",
    tags: ["Next.js", "Python", "TensorFlow Lite", "Redis", "PostGIS"],
    color: "#4A9EBF"
  },
  {
    title: "DeFi & Fintech Infrastructure",
    icon: "Landmark",
    desc: "Compliant DeFi-to-bank infrastructure for US consumers. KYC/AML pipeline, OFAC screening, FinCEN BSA compliance, USD stablecoin transfers via Plaid + Circle APIs.",
    tags: ["Solidity", "Node.js", "Plaid API", "Circle API", "MongoDB"],
    color: "#2DD4BF"
  },
  {
    title: "AI-Powered Systems",
    icon: "Brain",
    desc: "GNN-powered AML intelligence reducing false positives 70%+. LLM compliance copilots, ML job-matching, anomaly detection, and AI-native backend architectures.",
    tags: ["Python", "PyTorch", "LangChain", "FastAPI", "Redis"],
    color: "#7BA7BC"
  },
  {
    title: "Blockchain & Identity",
    icon: "Link2",
    desc: "Self-sovereign digital identity using ZKPs and verifiable credentials. On-chain supply chain provenance, tokenized carbon credits, and wallet-native authentication.",
    tags: ["Solidity", "Circom", "SnarkJS", "IPFS", "Ethers.js"],
    color: "#4A9EBF"
  },
  {
    title: "Distributed Systems",
    icon: "Network",
    desc: "Event-driven architectures, Redis caching layers reducing API latency 60%+, multi-tenant data systems, WebSocket real-time pipelines, and horizontal scaling patterns.",
    tags: ["Node.js", "Redis", "MongoDB", "GraphQL", "Docker"],
    color: "#2DD4BF"
  },
  {
    title: "Industrial Workforce Platforms",
    icon: "Factory",
    desc: "ML job-matching for the Indian steel sector using bipartite graph algorithms. Shift scheduling, certification tracking, and plant-side workforce analytics at scale.",
    tags: ["React", "Redux", "Node.js", "Python", "Firebase"],
    color: "#7BA7BC"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "urban-flow",
    name: "Urban Flow AI",
    status: "In Development",
    statusColor: "teal",
    market: "India",
    desc: "Real-time traffic prediction, EV route optimization, and smart city logistics intelligence. AI APIs for sustainable mobility integrating with Indian Smart Cities Mission infrastructure.",
    stack: ["Next.js", "MongoDB", "Firebase", "Python", "FastAPI", "Redis", "TensorFlow Lite"],
    type: "Smart City",
    github: "https://github.com/ankitsharma706",
    visualType: 'city'
  },
  {
    id: "defi-gateway",
    name: "DeFi Banking Gateway",
    status: "Building",
    statusColor: "orange",
    market: "USA",
    desc: "Compliant DeFi-to-bank infrastructure for US consumers. Wallet-to-bank bridging, full KYC/AML pipeline, USD stablecoin transfers, FinCEN-compliant transaction monitoring.",
    stack: ["Solidity", "Next.js", "Ethers.js", "Node.js", "Plaid API", "Circle API", "MongoDB", "Redis"],
    compliance: ["FinCEN", "BSA", "OFAC", "KYC/AML"],
    type: "Fintech Infrastructure",
    github: "https://github.com/CONDUIT-FINTECH",
    visualType: 'defi'
  },
  {
    id: "aml-engine",
    name: "AML Intelligence Engine",
    status: "Building",
    statusColor: "orange",
    market: "USA",
    desc: "Graph Neural Network-powered Anti-Money Laundering for US financial institutions. Reduces false positives 70%+ vs rule-based systems. SAR auto-drafting, OFAC screening.",
    stack: ["Python", "PyTorch Geometric", "Node.js", "FastAPI", "MongoDB", "Next.js"],
    compliance: ["FinCEN SAR/CTR", "OFAC SDN Screening"],
    type: "AI + Compliance",
    github: "https://github.com/ankitsharma706",
    visualType: 'aml'
  },
  {
    id: "assava",
    name: "ASSAVA Workforce Platform",
    status: "In Progress",
    statusColor: "teal",
    market: "India",
    desc: "ML job-matching and workforce management for the Indian steel sector. Bipartite graph matching, shift scheduling, certification tracking, and plant analytics.",
    stack: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "Python", "Redis", "Firebase"],
    sector: "Steel Industry",
    type: "AI + Marketplace",
    github: "https://github.com/ankitsharma706",
    visualType: 'workforce'
  },
  {
    id: "onchain-identity",
    name: "On-Chain Identity Protocol",
    status: "Planned",
    statusColor: "yellow",
    market: "Global",
    desc: "Self-sovereign digital identity for DeFi — verifiable credentials, zero-knowledge proofs for selective disclosure, wallet-native authentication. No PII stored on-chain.",
    stack: ["Solidity", "Circom", "SnarkJS", "IPFS", "Ceramic Network", "Next.js", "Ethers.js"],
    type: "Blockchain + Identity",
    github: "https://github.com/ankitsharma706",
    visualType: 'identity'
  },
  {
    id: "caffenia",
    name: "Caffenia",
    status: "Live",
    statusColor: "green",
    market: "India",
    desc: "Modern e-commerce storefront with full cart management, Firebase authentication, product admin panel, and order processing pipeline.",
    stack: ["React", "Node.js", "MongoDB", "Firebase", "Tailwind CSS"],
    live: "https://caffenia.vercel.app/",
    github: "https://github.com/ankitsharma706",
    type: "Full Stack",
    visualType: 'ecommerce'
  }
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2022",
    title: "Started serious full-stack engineering",
    desc: "Built first production applications — React frontends, Node.js APIs, MongoDB databases. Learned Redux architecture and Firebase real-time systems."
  },
  {
    year: "2023",
    title: "First AI-integrated systems",
    desc: "Built Caffenia (live e-commerce) and started Smart City AI APIs — traffic prediction, EV routing using TensorFlow Lite and Python ML pipelines."
  },
  {
    year: "2023–2024",
    title: "Industrial workforce platform",
    desc: "ASSAVA: ML job-matching for the Indian steel industry. Bipartite graph algorithms, shift scheduling, plant-side workforce analytics. Real domain, real constraints."
  },
  {
    year: "2024",
    title: "Entered blockchain & DeFi",
    desc: "Deep dive into Solidity, Ethereum, ZKPs. Built On-Chain Identity Protocol architecture. Studied EVM internals at opcode level for gas optimization."
  },
  {
    year: "2024–2025",
    title: "US Fintech & Compliance Engineering",
    desc: "Launched CONDUIT-FINTECH org on GitHub. Building DeFi Banking Gateway with FinCEN BSA compliance, OFAC screening, KYC/AML pipelines for US markets. Regulatory engineering."
  },
  {
    year: "2025",
    title: "AML Intelligence & Graph ML",
    desc: "GNN-powered Anti-Money Laundering engine using PyTorch Geometric. SAR auto-drafting, structuring detection, false positive reduction 70%+ vs rule-based systems."
  },
  {
    year: "NOW",
    title: "Building at the intersection of AI + Finance + Identity",
    desc: "Open to founding engineer roles, infrastructure positions, and technical co-founder conversations.",
    highlight: true
  }
];

export const RESEARCH: ResearchCard[] = [
  {
    category: "DISTRIBUTED SYSTEMS",
    title: "Designing Data-Intensive Applications",
    note: "The mental model behind every system architecture I design — a definitive reference for thinking in networks, layers, and operational correctness.",
    source: "Martin Kleppmann"
  },
  {
    category: "GRAPH ALGORITHMS",
    title: "GNN for Financial Fraud Detection",
    note: "Core to my AML Intelligence Engine — Kipf & Welling GCN structures applied directly to high-dimensional transaction data flow patterns.",
    source: "Kipf & Welling, 2017"
  },
  {
    category: "BLOCKCHAIN RESEARCH",
    title: "Vitalik's Ethereum Research Posts",
    note: "ZKP rollups, account abstraction, and L2 scaling paradigms — directly informs the design of decentralized identity protocol logic.",
    source: "Vitalik Buterin"
  },
  {
    category: "US FINTECH REGULATION",
    title: "FinCEN BSA/AML Examination Manual",
    note: "The regulatory bible for building compliant fintech. Real code architecture decisions must flow directly from regulatory compliance first.",
    source: "US Treasury / FinCEN"
  },
  {
    category: "SYSTEM DESIGN",
    title: "A Philosophy of Software Design",
    note: "Complexity is the enemy. Depth is the goal. Completely transformed the way I establish clean module boundaries and file formats.",
    source: "John Ousterhout"
  },
  {
    category: "SMART CITIES",
    title: "India Smart Cities Mission Documentation",
    note: "Understanding government open data standards and physical-digital API requirements for seamless Urban Flow AI platform integrations.",
    source: "Ministry of Housing & Urban Affairs, India"
  }
];

export const STATS: Stat[] = [
  {
    val: 58,
    suffix: "+",
    label: "GitHub Repositories",
    mono: "repos"
  },
  {
    val: 6,
    suffix: "+",
    label: "Engineering Domains",
    mono: "verticals"
  },
  {
    val: 70,
    suffix: "%+",
    label: "AML False Positive Reduction (target)",
    mono: "vs rule-based systems"
  },
  {
    val: 3,
    suffix: "",
    label: "Production Systems Live",
    mono: "shipped"
  }
];

export const TECH_STACK: TechCategory[] = [
  {
    category: "LANGUAGES",
    items: ["TypeScript", "JavaScript", "Python", "Solidity", "C++", "Java"]
  },
  {
    category: "FRONTEND",
    items: ["React", "Next.js", "Redux", "Tailwind CSS", "Three.js", "Framer Motion"]
  },
  {
    category: "BACKEND",
    items: ["Node.js", "Express.js", "FastAPI", "GraphQL", "REST APIs", "WebSocket"]
  },
  {
    category: "DATABASES",
    items: ["MongoDB", "MySQL", "Redis", "Firebase", "ClickHouse"]
  },
  {
    category: "BLOCKCHAIN",
    items: ["Ethereum", "Solidity", "Ethers.js", "Web3.js", "IPFS", "Hardhat", "Circom", "SnarkJS", "Ceramic Network"]
  },
  {
    category: "AI / ML",
    items: ["Python", "PyTorch", "PyTorch Geometric", "TensorFlow Lite", "LangChain", "FastAPI", "Scikit-learn"]
  },
  {
    category: "INFRASTRUCTURE",
    items: ["Docker", "GitHub Actions", "Vercel", "Railway", "Netlify", "Plaid API", "Circle API"]
  },
  {
    category: "AUTH & TOOLS",
    items: ["Firebase Auth", "JWT", "Clerk", "Postman", "Figma", "VS Code"]
  }
];
