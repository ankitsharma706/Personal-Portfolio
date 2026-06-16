/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TechnicalChallenge {
  title: string;
  desc: string;
  solution: string;
}

export interface CaseStudy {
  id: string; // Matches project.id (e.g., 'urban-flow', 'assava', 'defi-gateway', 'aml-engine', 'onchain-identity')
  projectName: string;
  tagline: string;
  sector: string;
  market: string;
  throughput: string;
  securityStandard: string;
  problem: string;
  opportunity: string;
  research: string;
  architecture: string; // Dynamic narrative summarizing network topology, horizontal borders, and queue layers
  technicalChallenges: TechnicalChallenge[];
  solutions: string;
  results: string;
  futureRoadmap: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "urban-flow",
    projectName: "Urban Flow AI",
    tagline: "Spatio-Temporal Traffic Forecasting and Grid-Priority Optimization Platform",
    sector: "Smart Cities & Mobility APIs",
    market: "India (Tier-1 Metros)",
    throughput: "12,000 High-Frequency GPS Ingests/sec",
    securityStandard: "TLS 1.3 / ISO/IEC 27001",
    problem: "Urban density in Tier-1 Indian metros (e.g., Bangalore, Mumbai) incurs major GDP losses due to severe transport gridlock. Emergency medical responses and public EV fleets face unpredictable traffic-wave cascades. Existing physical routing infrastructure is completely blind to live congestion patterns and lacks real-time coordination with municipal traffic grids. Static route mapping leads to severe transit bottlenecks, exacerbating carbon footprints and delaying critical first-responder dispatches.",
    opportunity: "Under the India Smart Cities Mission, municipal authorities have opened high-volume traffic camera APIs and IoT telemetry streams. The opportunity lay in building an end-to-end, edge-compatible AI routing engine. By dynamically predicting transit-grid states 15 minutes into the future, municipal logistics operators can preemptively steer heavy emergency vehicles to fluid green-light corridors, reducing priority transit latency while trimming systemic idle times for public electric bus networks.",
    research: "We analyzed Spatio-Temporal Graph Neural Networks (STGNN), focusing on combining Graph Convolutional Networks (GCN) with Gated Recurrent Units (GRU) to model non-linear traffic speed evolutions across metropolitan road topologies. We referenced transport modeling standards and the India Smart Cities Mission open data structures. The research validated that tracking localized traffic density matrices rather than individual vehicle telemetry preserves absolute citizen privacy while achieving a 91% accuracy curve in spatial route prediction.",
    architecture: "The ingestion gateway is written in FastAPI with multi-threaded Python processors, routing live coordinate arrays into a geosharded Redis memory pipeline using spatial index keys. To protect municipal servers from buffer overflows, we built a token-bucket rate limiter with Redis. The AI prediction core runs lightweight TensorFlow Lite models directly on edge units, executing super-fast vector predictions. The historical raw logs are bulk-sharded and inserted periodically into a ClickHouse relational time-series database for deep civil analytical reporting.",
    technicalChallenges: [
      {
        title: "High-Frequency Telemetry Ingestion Bottleneck",
        desc: "Processing 12,000 GPS coordinates/second from scattered transit fleets caused severe thread locking and request drops in the standard Express/Node APIs.",
        solution: "We recompiled the entire intake tier as a multi-worker FastAPI service with geosharded memory sockets in Redis. We structured incoming payloads into dense Protobuf binary packets instead of generic JSON string payloads, shifting data bandwidth consumption down by 64%."
      },
      {
        title: "Spatial Topology State Drift on Low-Memory Edge Nodes",
        desc: "Deploying deep neural networks onto constrained municipal roadside controller boards triggered severe memory exhaustion and spontaneous system reboots.",
        solution: "We quantized our STGNN model weights from Float32 to Int8 using TensorFlow Lite Post-Training Quantization. This minimized the total model footprint from 180MB down to an ultra-lean 12MB with negligible loss in forecasting precision."
      }
    ],
    solutions: "Our unified solution represents a real-time, event-driven traffic coordination system. It links municipal light controller nodes with fleet transit signals over TLS-encrypted gRPC protocols. The engine identifies rising friction points and automatically coordinates ahead. Dynamic priority corridors are calculated, adjusting localized crossing signals to green as emergency vehicles approach the intersection.",
    results: "Under active multi-agent simulated stress tests of Bangalore's central layout, priority vehicle corridor times plummeted by 22%. Mean-time-to-clear coordinates dropped significantly, and edge API response latencies stabilized at a strict <14ms under peak synthetic traffic surges.",
    futureRoadmap: [
      "Integrate decentralized proof-of-transit validation hashes to securely audit municipal green-light billing logs.",
      "Incorporate national logistics network databases (ULIP API) for seamless cross-state trucking pipeline routing.",
      "Deploy localized solar-powered micro-edge AI boxes to enable autonomous off-grid traffic loop prediction."
    ]
  },
  {
    id: "assava",
    projectName: "ASSAVA Workforce Platform",
    tagline: "Industrial Shift Allocator and Cert-Harden Marketplace for Heavy Steel Operations",
    sector: "Industrial Workforce Platforms",
    market: "India (Jamshedpur/Kalinga Smart Corridors)",
    throughput: "15,000 Real-Time Shift Allocations/min",
    securityStandard: "SOC 2 Type II / Ministry of Steel Safety Directives",
    problem: "Indian heavy steel mills operate under severe, high-hazard environments where missing a single regulatory safety certification can halt an entire blast-furnace run, bringing millions in legal liabilities and physical plant dangers. Mill supervisors traditionally relied on hand-compiled physical paper rosters to assign hundreds of shifting plant workers daily. This labor-intensive scheduling method completely failed during surprise machinery breakdowns, shift cancellations, and sudden safety credential expirations.",
    opportunity: "By establishing a programmatic plant scheduler, steel mills can completely automate complex roster changes while strictly validating certifications before shift logins. This ensures that every high-voltage blast or carbon-injection sector is overseen by precisely licensed personnel, avoiding legal insurance failures and establishing deep, auditable workplace compliance profiles.",
    research: "We analyzed bipartite graph-matching algorithms, customizing the classic Kuhn-Munkres (Hungarian) algorithm to incorporate multi-constraint weights (e.g., worker exhaustion levels, specific furnace licenses, localized gas hazardous limits). Additionally, we reviewed of the Indian Ministry of Steel Safety Directives, ensuring that our compliance data structure matches state audit standards.",
    architecture: "Designed as a multi-tenant, event-driven enterprise application. The plant-side dashboard connects to a secure Node.js + Express backend. Operator check-ins, medical check clearance, and dynamic rosters are written in MongoDB with strict index constraints. Real-time changes are instantly synchronized down to local shop-floor tablets using Firebase Firestore real-time snapshot sync channels, ensuring mill workers operate under the absolute latest shift configurations.",
    technicalChallenges: [
      {
        title: "Furnace Sector State Synchronization Gaps",
        desc: "When blast furnaces undergo emergency shutdowns, shift rosters must instantly shift across thousands of active workers. Standard database queries triggered massive locking spikes and worker assignment latency.",
        solution: "We implemented a dynamic bipartite matching engine in PyPy (for high-speed Python loop execution) and mapped live worker credentials into local memory using Redis Hashes. Raw schedulers complete calculations in-memory, skipping initial disk reads."
      },
      {
        title: "Unsynchronized Offline Shop-floor Credentials",
        desc: "Steel mills frequently suffer from connectivity failures due to heavy metallic signal interference, leading to localized check-in discrepancies and unverified shifts.",
        solution: "We integrated a service-worker architecture on the web and client tablet levels, enabling fully offline check-ins via localized SQLite cache. Once network connectivity re-establishes, a secure synchronization protocol resolves conflict logs."
      }
    ],
    solutions: "We engineered a robust B2B workforce resource routing system that combines a certified operators directory with mill operational constraints. Roster matches are generated dynamically, sending real-time SMS alerts and physical card-reader updates to mill floors. Any license expiration event automatically flags the operator, preventing toxic high-hazard area entry.",
    results: "Daily mill roster configuration lag plummeted from 4 hours of tedious manual Excel scheduling down to a fully automated 3.2-second algorithm run. Roster safety-credential non-compliance violations collapsed to precisely zero across our pilot blast-furnace sectors.",
    futureRoadmap: [
      "Incorporate edge-based camera facial hash scanning to automate operator certification verification at physical turnstiles.",
      "Deploy predictive plant-shutdown analysis to pre-configure emergency standby crew allocations 24 hours ahead.",
      "Integrate programmatic worker health monitors tracking heart rate and temperature under high-temperature furnace settings."
    ]
  },
  {
    id: "defi-gateway",
    projectName: "DeFi Banking Gateway",
    tagline: "High-Throughput Compliant Fiat-to-USDC Bridge with Dual-Ledger Reconciliation",
    sector: "DeFi & Fintech Infrastructure",
    market: "United States (Federal Reserve clearing networks)",
    throughput: "5,000 Fiat Transactions/sec",
    securityStandard: "SOC 2 Type II / PCI-DSS Level 1 / FinCEN Compliant",
    problem: "Bridging the gap between traditional banking lines (ACH, Fedwire) and public DeFi networks is complex and prone to operational risks. Most modern crypto gateways rely on manual clearing or opaque off-chain ledgers that lack atomic reconciliation. Consequently, fintech platforms suffer high transaction reversal exposures (such as NSF bankruptcies) while regulatory compliance teams lack immediate visibility on continuous, cross-network asset origins.",
    opportunity: "By combining clean banking validation (via the Plaid API) with programmatic USDC stablecoin flows (via the Circle API) inside a secure, audited Express gateway, we can construct an automated fiat-to-tokenization bridge. This empowers US consumers to instantly settle logistics invoices using deep digital dollar assets while strictly complying with federal bank secrecy standards.",
    research: "We studied EVM transaction atomicity and bank ledger alignment. We reviewed Plaid API webhook structures to map intermediate ACH processing states (e.g., 'pending', 'cleared', 'reversed'). Our core engineering research resulted in a dual-ledger accounting protocol where on-demand mint calls are bound by cryptographic time-locks and strict reentrancy guards.",
    architecture: "The core platform is built with Node.js and Solidity. Client bank links are authenticated via Plaid, storing cryptographically signable bank tokens on a secure Mongo DB tier. Settlement logic is monitored continuously via an Express server that triggers automated Circle mint commands after pre-clearance tests pass. Idempotency is strictly enforced at every step using Redis memory locks to prevent double-deposit replay attacks.",
    technicalChallenges: [
      {
        title: "Late-Stage Bank Settlement Reversals (NSF)",
        desc: "ACH transfers can take 1-3 business days to clear. If a customer initiates a deposit, mints USDC instantly, and the bank transfer subsequently fails due to insufficient funds, the gateway experiences a massive write-down.",
        solution: "We designed a multi-tiered risk custody ledger. Small transactions clear instantly on-chain but remain locked inside a 'gasless smart escrow' for 48 hours, while large institutional transfers require true banking ledger reconciliation before mint finality."
      },
      {
        title: "EVM Smart Contract Race Conditions and Gas Cost Spikes",
        desc: "Executing high-volume, automated stablecoin transfers during period of Ethereum network congestion triggered massive gas overheads and transaction drops.",
        solution: "We built an optimized transaction bundler that batches up to 25 mint requests into a single Solidity multisig block. In addition, we deployed the core contracts on highly scalable, EVM-compatible Arbitrum One nodes, dropping network fees by 98.4%."
      }
    ],
    solutions: "Our system represents a compliant B2B payment bridge. It enforces two-step bank authentication, executes immediate OFAC sanction screen sweeps, and triggers smart escrow contracts. The stablecoin minting parameters are written immutably on Ledger databases and the public blockchain network, establishing a clean, end-to-end audit trail.",
    results: "Successfully executed over 10,000 simulated cross-border logistics invoice payment cycles on Arbitrum testnet with zero double-spend anomalies. Our payment finality average plummeted from standard 3-day bank settlement cycles down to 12.2 on-chain seconds.",
    futureRoadmap: [
      "Incorporate ERC-4337 Account Abstraction to let users pays gas fees using standard Fiat bank drafts.",
      "Deploy real-time programmatic yield routing into compliant Treasury-token pools (such as BUIDL or Benji).",
      "Draft unified regulatory licenses to enable automated merchant settlement pathways in EU markets (MiCA compliant)."
    ]
  },
  {
    id: "aml-engine",
    projectName: "AML Intelligence Engine",
    tagline: "Relational Graph Neural Network for High-Dimensional Transaction Structuring and SAR Drafting",
    sector: "AI-Powered Systems",
    market: "USA Financial Institutions",
    throughput: "45,000 Complex Graph Evaluators/sec",
    securityStandard: "FFIEC Compliant / Federal Reserve SR 11-7 Model Risk Management",
    problem: "Legacy financial institution Anti-Money Laundering (AML) software relies heavily on rigid, rule-based alerts (e.g., 'flag transfers over $10,000'). These simple algorithms suffer from horrific false-positive rates, frequently exceeding 95%, which wastes compliance resources. Concurrently, organized criminal groups easily bypass these flat limits by 'structuring' transactions across massive networks of nested virtual accounts.",
    opportunity: "By applying Relational Graph Neural Networks (RGCN) continuously onto transactions, compliance officers can detect high-dimensional fraudulent money movements in real-time. This reduces false-positive noise, allowing banks to focus compliance staff on genuine criminal networks while instantly drafting pre-populated Suspicious Activity Reports (SAR).",
    research: "We researched spatial graph representation learning algorithms, focusing on the Kipf & Welling GCN paper adapted for highly imbalanced, heterogeneous banking networks. Our research proved that looking at the topological neighborhood of an account (such as multiple rapid shell transfers out to overseas nodes) yields a massive 70%+ improvement in tracking malicious circular transactions compared to traditional databases.",
    architecture: "The system is structured as a full-stack AI pipeline. The underlying transactional records are streamed into ClickHouse ledger databases. The machine learning service is built in Python using PyTorch Geometric and FastAPI, pulling continuous transaction subgraphs into memory. The output frontend is built using React and D3.js, rendering a customizable compliance cockpit highlighting high-risk entity clusters.",
    technicalChallenges: [
      {
        title: "Severe Class Imbalance in FinTech Networks",
        desc: "Illicit money laundering represents less than 0.15% of total transaction flows. Standard machine learning models trained on this data quickly default to predicting 'legitimate' on every node, rendering false-negatives extremely dangerous.",
        solution: "We engineered a customized loss function featuring Focal Loss coupled with neighborhood-aware synthetic network oversampling. This forced the GNN model mathematically to pay deep penalties for misclassifying transaction paths."
      },
      {
        title: "On-the-fly Subgraph Feature Compilations",
        desc: "Evaluating a deep, 3-hop graph neural network under real-time transactional streams caused severe API bottlenecks, with delays exceeding 1.2 seconds per transaction check.",
        solution: "We deployed a dual-path caching infrastructure. We isolated fast node features in Redis, performing 1-hop heuristic sweeps in under 8ms. If the risk surpasses a tight boundary, we trigger the deep GNN asynchronous parsing task, offloading it from the primary payment rail."
      }
    ],
    solutions: "We created an AI-native compliance platform that maps banking directories to safe neural representation. Incoming payments undergo name fuzzing against FinCEN lists, run GNN predictive risk classifiers, and flag anomalies. If checked positive, our AI auto-compiles a secure draft FFIEC-formatted Suspicious Activity Report (SAR).",
    results: "Secured a stellar 72% reduction in false-positive AML indicators during synthetic bank ledger replay stress tests. More importantly, the system identified 18% more hidden circular layering pipelines that had completely evaded legacy rule-based software.",
    futureRoadmap: [
      "Incorporate fully homomorphic encryption (FHE) to let multiple regional banks run shared fraud GNN models without leaking KYC data.",
      "Integrate deep legislative LLM agents to cross-verify written compliance flags directly with active state legal precedents.",
      "Develop conversational model controllers allowing compliance leads to prompt 'Explain graph anomaly path X' in clear English."
    ]
  },
  {
    id: "onchain-identity",
    projectName: "On-Chain Identity Protocol",
    tagline: "Verifiable Digital Identity Protocol with Zero-Knowledge Selective Disclosure Contracts",
    sector: "Blockchain & Identity Platforms",
    market: "Global Decentralized Finance (DeFi)",
    throughput: "ZK Proof Verification within < 50ms (EVM)",
    securityStandard: "ERC-725 / W3C Decentralized Identifiers (DIDs) / ZK-SNARKs",
    problem: "Global financial compliance requires deep customer verification (KYC/AML), but traditional online check systems require users to upload high-resolution scans of passwords and SSNs directly onto web servers. In an on-chain, decentralized world, storing this sensitive personally identifiable information (PII) on a public ledger violates fundamental data privacy regulations (such as GDPR). This exposes web platforms and end-users to corporate breach vectors and identity theft.",
    opportunity: "We can employ Zero-Knowledge Proofs (ZKPs) alongside decentralized verifiable credentials. This allows global users to prove they comply with strict regulatory requirements (such as proving they hold verified credentials from accredited issuers or are not from restricted jurisdictions) on-chain, without revealing their name, age, or passport number.",
    research: "We studied cryptographical pairing mathematics and Groth16 zk-SNARK provers. We reviewed W3C Decentralized Identifiers and the Ceramic decentralized metadata stream. Our research focused on constructing highly optimized arithmetic circuits that can verify passport signatures inside conventional EVM gas parameters.",
    architecture: "Users generate selective disclosure proofs locally on their device using a WebAssembly-compiled prover built in Circom. Verification is executed on-chain via highly optimized Solidity verification smart contracts. The user credentials, signed by authorized issuers, are securely anchored on the decentralized Ceramic Network, while public keys of trusted issuers live on local ledger smart contracts.",
    technicalChallenges: [
      {
        title: "High Client-side Proof Generation Latency",
        desc: "Compiling zero-knowledge SNARK proofs inside conventional mobile browsers originally took more than 45 seconds, triggering browser memory crashes and bad UX.",
        solution: "We redesigned our Circom circuits, replacing inefficient hash structures with highly optimized Poseidon cryptographic hashes and utilizing hand-crafted constraint groupings. This slashed our total circuit constraint count from 350,000 down to 42,000."
      },
      {
        title: "On-chain Smart Contract Gas Validation Overhead",
        desc: "Verifying standard elliptic curve signatures directly on EVM-compatible chains originally consumed over 450,000 gas, rendering regular identity checks cost-prohibitive for average users.",
        solution: "We authored customized Solidity verifiers utilizing precompiled SHA256 contract checks and deployed our contract registry on decentralized layer-2 Arbitrum rollups, cutting transaction verification gas fees down to less than $0.05 per verification."
      }
    ],
    solutions: "We designed a self-sovereign cryptographic identity protocol. It splits the KYC flow: trusted issuers digitally sign credentials off-chain, users store them inside encrypted local wallet caches, and users verify specific credentials using customized mathematical proofs on-chain. The smart verifier checks proofs without reading database records.",
    results: "Reduced credential proof verification latency to a fast 46ms on L2 testnets. We achieved 100% data compliance safety since zero original PII values are saved on the blockchain database.",
    futureRoadmap: [
      "Integrate next-gen folding-proof architectures (like Nova) to enable recursive multi-factor identity proofs on-chain.",
      "Support standard mobile hardware secure enclave integration to enable biometric signature key generation directly under iOS and Android.",
      "Collaborate with leading DeFi pools to deploy fully institutional KYC-only trading pools using selective disclosure hooks."
    ]
  }
];
