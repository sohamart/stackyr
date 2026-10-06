import bcrypt from 'bcryptjs';

export const initialBrands = [
  {
    name: "WEBIND by Stackyr",
    slug: "webind",
    tagline: "Autonomous Web Infrastructure & Real-Time Digital Acceleration",
    description: "WEBIND by Stackyr delivers hyper-velocity edge network compute, autonomous deployment meshes, and zero-latency dynamic asset delivery for mission-critical web ecosystems. Built for scale, resilience, and unyielding performance.",
    category: "Web Infrastructure & Cloud",
    logo: "/uploads/stackyr-icon-dark.png",
    coverImage: "/uploads/originals/stackyr-brand-dark.jpeg",
    accentColor: "#FF6B00",
    websiteUrl: "https://webind.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/stackyr_tech",
      linkedin: "https://linkedin.com/company/stackyr",
      github: "https://github.com/stackyr/webind",
      discord: "https://discord.gg/stackyr"
    },
    services: [
      "Distributed Edge Compute",
      "Dynamic Multi-Cloud Mesh",
      "Sub-Millisecond Asset Delivery",
      "Automated Zero-Downtime CI/CD",
      "AI Traffic Orchestration"
    ],
    metrics: [
      { label: "P99 Latency", value: "8.2ms" },
      { label: "Throughput", value: "100k+ req/s" },
      { label: "Uptime SLA", value: "99.999%" }
    ],
    featured: true,
    isComingSoon: false,
    order: 1,
    status: "active"
  },
  {
    name: "KRONIX AI",
    slug: "kronix-ai",
    tagline: "Autonomous Multi-Agent Cognitive Synthesizer",
    description: "Enterprise-grade multi-agent autonomous decision pipelines capable of real-time reasoning, cross-domain workflow execution, and adaptive machine cognition across vast telemetry data streams.",
    category: "AI & Autonomous Systems",
    logo: "/uploads/stackyr-icon-dark.png",
    coverImage: "",
    accentColor: "#FF8A00",
    websiteUrl: "https://kronix.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/kronix_ai",
      linkedin: "https://linkedin.com/company/kronix-ai",
      github: "https://github.com/stackyr/kronix",
      discord: ""
    },
    services: [
      "Multi-Agent Orchestration",
      "Cognitive Workflow Automation",
      "Dynamic Knowledge Synthesis",
      "Neural Telemetry Streaming"
    ],
    metrics: [
      { label: "Decision Velocity", value: "12x" },
      { label: "Cognitive Accuracy", value: "99.4%" },
      { label: "Parallel Agents", value: "1,024" }
    ],
    featured: true,
    isComingSoon: false,
    order: 2,
    status: "active"
  },
  {
    name: "CYBERMESH",
    slug: "cybermesh",
    tagline: "Zero-Knowledge Sovereign Intelligence & Post-Quantum Defense",
    description: "Hardware-accelerated cryptographic mesh delivering confidential computing, verifiable zero-knowledge machine learning proofs, and quantum-resistant infrastructure protection.",
    category: "Security & Sovereign Data",
    logo: "/uploads/stackyr-icon-light.png",
    coverImage: "",
    accentColor: "#F59E0B",
    websiteUrl: "https://cybermesh.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/cybermesh_sec",
      linkedin: "https://linkedin.com/company/cybermesh",
      github: "https://github.com/stackyr/cybermesh",
      discord: ""
    },
    services: [
      "ZK-ML Proof Verification",
      "Confidential Enclave Compute",
      "Post-Quantum Cryptography",
      "Autonomous Threat Neutralization"
    ],
    metrics: [
      { label: "Proof Generation", value: "340ms" },
      { label: "Entropy Grade", value: "Class 5" },
      { label: "Attack Surface", value: "0-Trust" }
    ],
    featured: true,
    isComingSoon: false,
    order: 3,
    status: "active"
  },
  {
    name: "SYNAPTH",
    slug: "synapth",
    tagline: "Hyper-Dimensional Data Vector Fabric",
    description: "Next-generation distributed vector store and topological search engine built for exabyte-scale neural embeddings and millisecond similarity retrieval.",
    category: "Data Intelligence",
    logo: "/uploads/stackyr-icon-dark.png",
    coverImage: "",
    accentColor: "#EA580C",
    websiteUrl: "https://synapth.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/synapth_data",
      linkedin: "https://linkedin.com/company/synapth",
      github: "https://github.com/stackyr/synapth",
      discord: ""
    },
    services: [
      "Exabyte Vector Indexing",
      "Graph-Vector Fusion",
      "Sub-2ms Approximate Nearest Neighbor",
      "Hybrid Semantic Routing"
    ],
    metrics: [
      { label: "Vector Search", value: "1.4ms" },
      { label: "Indexing Density", value: "10B+" },
      { label: "Recall Rate", value: "99.8%" }
    ],
    featured: false,
    isComingSoon: false,
    order: 4,
    status: "active"
  },
  {
    name: "NEUROFLOW",
    slug: "neuroflow",
    tagline: "Real-time Generative Creative Engine & Neural Canvas",
    description: "Deep generative pipeline empowering creative studios, product designers, and digital architects to render real-time procedural environments and interactive 3D assets.",
    category: "Creative Tech",
    logo: "/uploads/stackyr-icon-light.png",
    coverImage: "",
    accentColor: "#F97316",
    websiteUrl: "https://neuroflow.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/neuroflow_gen",
      linkedin: "https://linkedin.com/company/neuroflow",
      github: "",
      discord: "https://discord.gg/neuroflow"
    },
    services: [
      "Real-time Neural Rendering",
      "Procedural 3D Generation",
      "Dynamic Aesthetic Styling",
      "Spatial Multi-modal Models"
    ],
    metrics: [
      { label: "Frame Latency", value: "60 FPS" },
      { label: "Param Count", value: "32B" },
      { label: "Export Formats", value: "USDZ / GLTF" }
    ],
    featured: false,
    isComingSoon: false,
    order: 5,
    status: "active"
  },
  {
    name: "AURA CLOUD",
    slug: "aura-cloud",
    tagline: "Intelligent Micro-Edge Hardware & Bare-Metal AI Fabric",
    description: "Distributed low-power silicon clusters engineered for on-premise sovereign inferencing, sub-watt edge computation, and air-gapped industrial deployment.",
    category: "Web Infrastructure & Cloud",
    logo: "/uploads/stackyr-icon-dark.png",
    coverImage: "",
    accentColor: "#D97706",
    websiteUrl: "https://aura.stackyr.io",
    socialLinks: {
      twitter: "https://x.com/auracloud_io",
      linkedin: "https://linkedin.com/company/aura-cloud",
      github: "",
      discord: ""
    },
    services: [
      "Bare-Metal Silicon Slicing",
      "Sovereign Edge Ingestion",
      "Sub-Watt Neural Kernels",
      "Cold-Storage Replication"
    ],
    metrics: [
      { label: "Power Efficiency", value: "0.8W / TOPS" },
      { label: "Deployment Speed", value: "< 5 mins" },
      { label: "Cold-Start", value: "14ms" }
    ],
    featured: false,
    isComingSoon: false,
    order: 6,
    status: "active"
  },
  {
    name: "VORTEX QUANTUM",
    slug: "vortex-quantum",
    tagline: "Quantum Annealing & Hybrid Algorithmic Optimizer",
    description: "Hybrid quantum-classical algorithmic co-processors solving NP-hard logistics, portfolio optimization, and genomic sequence folding at quantum speed.",
    category: "AI & Autonomous Systems",
    logo: "/uploads/stackyr-icon-dark.png",
    coverImage: "",
    accentColor: "#FB923C",
    websiteUrl: "",
    socialLinks: {},
    services: [
      "Hybrid Quantum Annealing",
      "Combinatorial Optimization",
      "Qubit State Simulation",
      "Tensor Network Solvers"
    ],
    metrics: [
      { label: "Status", value: "Q4 2026 Stealth" },
      { label: "Topology", value: "128 Logical Qubits" }
    ],
    featured: false,
    isComingSoon: true,
    order: 7,
    status: "active"
  },
  {
    name: "HYPERAXIS",
    slug: "hyperaxis",
    tagline: "Autonomous High-Frequency Liquidity & Defi Mesh",
    description: "Self-governing algorithmic market-maker and institutional liquidity matrix powered by predictive neural models and zero-loss risk hedging architectures.",
    category: "Security & Sovereign Data",
    logo: "/uploads/stackyr-icon-light.png",
    coverImage: "",
    accentColor: "#F59E0B",
    websiteUrl: "",
    socialLinks: {},
    services: [
      "Predictive Liquidity Routing",
      "Arbitrage Neutralization Engine",
      "Autonomous Flash Settlement",
      "Cross-Chain Risk Oracles"
    ],
    metrics: [
      { label: "Status", value: "Private Alpha" },
      { label: "Throughput", value: "Sub-microsecond" }
    ],
    featured: false,
    isComingSoon: true,
    order: 8,
    status: "active"
  }
];

export const initialSiteContent = {
  hero: {
    badgeText: "Autonomous Venture Ecosystem • Next Gen",
    title: "Stacking Intelligence.",
    titleAccent: "Engineering the Frontiers.",
    tagline: "Stackyr orchestrates a hyper-synergistic ecosystem of breakthrough AI ventures, high-velocity web infrastructure, and sovereign computing architectures.",
    ctaText: "Explore Brand Ecosystem",
    ctaLink: "#ecosystem",
    secondaryCtaText: "Discover WEBIND Platform",
    secondaryCtaLink: "#webind",
    videoUrl: "/videos/stackyr-showcase.mp4",
    stats: [
      { label: "Ecosystem Ventures", value: "8+", detail: "Deep-tech portfolio brands" },
      { label: "Compute Nodes", value: "14.2K", detail: "Distributed global mesh" },
      { label: "Model Inferences / sec", value: "850K+", detail: "Autonomous execution rate" },
      { label: "Uptime & SLA", value: "99.999%", detail: "Mission-critical reliability" }
    ]
  },
  webind: {
    badge: "Flagship Infrastructure Platform",
    title: "WEBIND by Stackyr",
    tagline: "Next-Generation Autonomous Web Infrastructure & Digital Acceleration",
    description: "WEBIND unifies hyper-scalable cloud edge computing, multi-agent AI web orchestration, and sub-millisecond dynamic asset compilation into a single, bulletproof developer stack. Engineered for companies that demand uncompromising speed and limitless scale.",
    liveUrl: "https://webind.stackyr.io",
    previewImage: "/uploads/originals/stackyr-brand-dark.jpeg",
    highlights: [
      { title: "Autonomous Edge Meshing", desc: "Intelligently routes traffic across global Tier-1 backbones with sub-10ms delivery everywhere.", metric: "8.2ms p99" },
      { title: "Dynamic AI Pipeline", desc: "Compiles, optimizes, and transforms web assets in real-time through on-the-fly generative neural workers.", metric: "4.8x Speed" },
      { title: "Zero-Trust Sovereign Security", desc: "Integrated post-quantum cryptographic enclaves protecting payloads and API handshakes.", metric: "100% Secure" },
      { title: "Infinite Composable Scaling", desc: "Elastic auto-sharding clusters that scale from zero to millions of concurrent requests seamlessly.", metric: "99.999% SLA" }
    ],
    techStack: ["Edge Rust V8", "WASM Mesh", "Multi-Agent Orchestrator", "Distributed Redis", "Post-Quantum TLS", "eBPF Routing"]
  },
  story: {
    badge: "The Stackyr Ethos & Genesis",
    title: "Why We Stack Intelligence",
    paragraphs: [
      "In an era where isolated technology silos create computational friction, Stackyr was forged with a unified premise: intelligence compounds exponentially when layered synergistically.",
      "Rather than operating disconnected startups, we build and orchestrate an interconnected constellation of specialized ventures — each mastering an essential technological layer: from low-level silicon acceleration to autonomous agent orchestration and high-performance digital ecosystems like WEBIND.",
      "Every brand in the Stackyr ecosystem feeds telemetry, algorithmic breakthroughs, and infrastructure into every other. When one venture scales, the entire collective intelligence ascends."
    ],
    mission: "To orchestrate, incubate, and scale synergistic deep-tech brands that collectively solve humanity’s high-computation frontiers.",
    vision: "An interconnected hyper-intelligence fabric where every stacked node amplifies all others.",
    pillars: [
      {
        title: "Synergistic Compounding",
        desc: "Each venture enhances the capabilities, throughput, and technological edge of every other entity.",
        icon: "Layers"
      },
      {
        title: "Uncompromising Velocity",
        desc: "We eliminate bureaucratic drag, building production-grade deep-tech at an unprecedented speed of iteration.",
        icon: "Zap"
      },
      {
        title: "Sovereign Engineering",
        desc: "Foundational control over compute, cryptographic layers, and algorithmic architectures.",
        icon: "Shield"
      }
    ]
  },
  capabilities: {
    badge: "Foundational Pillars",
    title: "How We Stack Intelligence",
    subtitle: "Modular, composable, and relentlessly optimized foundations powering each entity in our venture stack.",
    items: [
      {
        id: "cap-1",
        title: "Autonomous Multi-Agent Orchestration",
        description: "Coordinated swarms of specialized cognitive agents that plan, verify, and execute multi-modal workflows across distributed telemetry.",
        metrics: "Sub-15ms coordination latency",
        tags: ["Cognitive Mesh", "Agent Swarms", "Self-Healing"]
      },
      {
        id: "cap-2",
        title: "Distributed Edge & Sovereign Infrastructure",
        description: "Bare-metal high-density compute fabrics interconnected with zero-trust post-quantum security and low-power silicon optimization.",
        metrics: "14.2K globally distributed nodes",
        tags: ["Low-Power Silicon", "Confidential Compute", "Global Mesh"]
      },
      {
        id: "cap-3",
        title: "Hyper-Velocity Web & Digital Acceleration",
        description: "Powering platforms like WEBIND with instant compilation, zero-latency streaming pipelines, and micro-frontend federation.",
        metrics: "8.2ms worldwide average p99",
        tags: ["Edge CDN", "WASM Runtime", "Dynamic Bundling"]
      },
      {
        id: "cap-4",
        title: "Exabyte-Scale Topological Vector Fabrics",
        description: "High-density neural vector storage with mathematical similarity search designed for trillion-token context retrieval.",
        metrics: "10B+ vectors indexed concurrently",
        tags: ["Graph Search", "HNSW Indices", "Quantized Memory"]
      },
      {
        id: "cap-5",
        title: "Zero-Knowledge Sovereign Defense",
        description: "Hardware-level enclaves and verifiable zk-SNARK cryptographic guarantees for enterprise data confidentiality and compliance.",
        metrics: "Zero-Trust hardware roots",
        tags: ["zk-ML Proofs", "Quantum Defense", "Audit Trails"]
      },
      {
        id: "cap-6",
        title: "Neural Real-Time Procedural Synthesis",
        description: "Spatial generative engines generating dynamic user interfaces, 3D assets, and procedural environments with instant tactile response.",
        metrics: "60 FPS real-time neural feed",
        tags: ["Generative UI", "Procedural 3D", "USDZ Pipeline"]
      }
    ]
  },
  cta: {
    badge: "Join the Orbit",
    title: "Ready to Stack Intelligence With Us?",
    description: "Whether you are building the next breakthrough technology brand, seeking venture synergy, or scaling enterprise infrastructure with WEBIND, our architecture is ready.",
    buttonText: "Initiate Venture Dialogue",
    email: "contact@stackyr.io"
  },
  sectionsConfig: {
    heroEnabled: true,
    featuredEnabled: true,
    ecosystemEnabled: true,
    webindEnabled: true,
    capabilitiesEnabled: true,
    storyEnabled: true,
    comingSoonEnabled: true,
    ctaEnabled: true
  },
  visualAssets: {
    mainLogoDark: "/stackyr-full-dark.png",
    mainLogoLight: "/stackyr-full-light.png",
    iconLogoDark: "/stackyr-icon-dark.png",
    iconLogoLight: "/stackyr-icon-light.png",
    heroBgStyle: "mesh-particle"
  }
};

export async function getHashedAdminPassword() {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash('stackyr2026!', salt);
}
