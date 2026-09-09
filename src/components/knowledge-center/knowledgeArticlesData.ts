export interface ProductBlueprint {
  id: string;
  award: string;
  name: string;
  rating: string;
  stars: number;
  price: string;
  image: string;
  description?: string;
  long_text?: string;
  pros: string[];
  cons: string[];
  specs?: Record<string, string>;
  buy_links?: Array<{
    store: string;
    price: string;
    color: string;
    url: string;
  }>;
}

export interface PeerReview {
  id?: string;
  article_id: number;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
}

export interface KnowledgeArticle {
  id: number;
  category: string;
  date: string;
  read_time: string;
  views?: string;
  title: string;
  author: string;
  author_role?: string;
  editors_note?: string;
  intro_paragraphs: string[];
  video_url?: string;
  audio_url?: string;
  products?: ProductBlueprint[];
}

export const ARTICLES_STORE: KnowledgeArticle[] = [
  {
    id: 1,
    category: "HARDWARE & WORKSTATIONS",
    date: "Aug 16, 2026",
    read_time: "18 min read",
    views: "64,250",
    title: "The 7 Best Enterprise AI & Cloud Laptops for Senior Engineers & Architects",
    author: "Dr. Sarah Jenkins (Chief Systems Architect) & Marcus Vance (Senior Hardware Lead)",
    author_role: "Senior Hardware Benchmarking & Architecture Lead",
    editors_note:
      "August 2026: With this comprehensive update, our hardware engineering squad has vetted dozens of flagship workstations specifically for local generative AI inference, multi-container Docker and Kubernetes orchestrations, and massive distributed compiler builds. We run continuous 24-hour thermal dissipation tests in Creed Tech Labs to ensure these machines maintain peak turbo frequencies without thermal throttling.",
    intro_paragraphs: [
      "Choosing an engineering workstation in 2026 is fundamentally different from selecting a standard consumer laptop. With enterprise software teams increasingly executing local neural fine-tuning, running quantized 70-billion-parameter foundation models completely offline, and managing complex multi-tier containerized microservices stacks, traditional ultrabooks with 16GB of soldered RAM simply crumble under memory pressure.",
      "In our labs over the past six months, we evaluated more than 25 workstations across seven critical hardware vectors: sustained memory bandwidth, zero-copy unified RAM pooling, sustained multi-core compilation times under heavy thermal loads, thermal acoustic dB output, display color accuracy for design fidelity, keyboard actuation ergonomics, and real-world unplugged battery longevity.",
      "Below, you will find our deep-dive architectural analysis, comprehensive laboratory benchmark comparisons, pros and cons breakdowns, and detailed product-by-product evaluations.",
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    products: [
      {
        id: "hp-omnibook",
        award: "Best Windows Laptop for Most People",
        name: "HP OmniBook 5 14 (Qualcomm Snapdragon X Elite / OLED)",
        rating: "4.0 Excellent",
        stars: 4,
        price: "$899",
        image:
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop",
        pros: [
          "Field-leading battery endurance (21 hours 14 minutes continuous execution)",
          "Aggressively priced starting at just $899 with 32GB LPDDR5X RAM",
          "Vivid 14.0-inch 2.8K (2880x1800) OLED 120Hz display with 100% DCI-P3 color gamut",
          "Whisper-quiet dual fans that remain below 24 dB under typical IDE workloads",
        ],
        cons: [
          "Plastic keyboard deck could benefit from additional internal structural stiffening",
          "Occasional x86 translation overhead on legacy, unoptimized Windows kernel-mode drivers",
        ],
        long_text:
          "The HP OmniBook 5 14 marks a seismic transition in the Windows laptop ecosystem. Built around Qualcomm's 4nm Oryon CPU architecture, it eliminates the historical compromise between high-performance computing and true all-day battery life.",
        specs: {
          "Processor (CPU)": "Qualcomm Snapdragon X Elite (12 Cores, up to 3.8 GHz Turbo)",
          "Neural Engine (NPU)": "Qualcomm Hexagon NPU (45 TOPS dedicated AI compute)",
          "Memory (RAM)": "32GB LPDDR5X-8448 MHz",
          "Storage (SSD)": "1TB PCIe Gen4 x4 NVMe M.2 2280 SSD",
        },
        buy_links: [
          { store: "Amazon", price: "$899 at Amazon", color: "#FF9900", url: "https://amazon.com" },
        ],
      },
      {
        id: "macbook-pro-16",
        award: "Best Workstation for AI Engineers",
        name: 'Apple MacBook Pro 16" (M3 Max / 128GB Unified Memory)',
        rating: "4.5 Exceptional",
        stars: 5,
        price: "$3,499",
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
        pros: [
          "Unrivaled 128GB Unified RAM running Llama-3-70B Q4_K_M completely in VRAM",
          "400 GB/s memory bandwidth obliterates standard GPU transfer bottlenecks",
          "Liquid Retina XDR Mini-LED display with 1600 nits peak HDR and 120Hz ProMotion",
        ],
        cons: [
          "Substantial financial investment starting above $3,400",
          "Unified RAM and SSD are fully integrated on-die and cannot be upgraded post-purchase",
        ],
        long_text:
          "For AI researchers and distributed systems architects, the 16-inch MacBook Pro configured with the 16-core M3 Max and 128GB Unified Memory is nothing short of a computing revelation.",
        specs: {
          "Processor (CPU)": "Apple M3 Max (16-Core: 12 Performance + 4 Efficiency)",
          "Graphics (GPU)": "40-Core GPU with Hardware Ray Tracing",
          "Unified Memory": "128GB Unified Memory (400 GB/s Bandwidth)",
          "Storage (SSD)": "4TB PCIe Gen4 SSD (7,400 MB/s Read)",
        },
        buy_links: [
          { store: "Apple Store", price: "$3,499 at Apple", color: "#000000", url: "https://apple.com" },
        ],
      },
    ],
  },
  {
    id: 2,
    category: "AI RESEARCH",
    date: "Aug 15, 2026",
    read_time: "12 min read",
    views: "42,100",
    title:
      "Artificial Intelligence Development from 1950 to 1965: The Foundation of Modern AI Research",
    author: "Dr. Marcus Vance (Principal AI Fellow)",
    author_role: "Lead Theoretical AI Fellow",
    editors_note:
      "A deep historical and algorithmic exploration into the early Dartmouth workshops, symbolic logic, Perceptron neural primitives, and early compiler architectures.",
    intro_paragraphs: [
      "The epoch spanning 1950 to 1965 defined the fundamental computational principles of modern artificial intelligence. From Alan Turing's seminal 1950 paper 'Computing Machinery and Intelligence' introducing the imitation game to the 1956 Dartmouth Summer Research Project where John McCarthy coined the term 'Artificial Intelligence', this era established symbolic computation, heuristic search, and neural perceptrons.",
      "Understanding these mathematical foundations is essential for contemporary enterprise architects working with modern deep learning and sovereign model fine-tuning.",
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    products: [
      {
        id: "ai-perceptrons",
        award: "Historical Computing Benchmark",
        name: "Dartmouth Workshop & Rosenblatt Perceptron Mark I (1956-1960)",
        rating: "5.0 Landmark",
        stars: 5,
        price: "Historical Archive",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop",
        pros: [
          "Established first single-layer artificial neural network weighting equations",
          "Formulated LISP programming language for symbolic knowledge representation",
        ],
        cons: ["Limited by 4KB magnetic-core hardware memory constraints"],
        long_text:
          "The Mark I Perceptron was the world's first hardware implementation of an artificial neural network.",
        specs: {
          "Hardware Architecture": "IBM 704 Vacuum Tube Mainframe",
          "Memory Capacity": "4,096 36-bit words (Magnetic Core)",
          "Clock Speed": "40,000 instructions per second",
        },
        buy_links: [],
      },
    ],
  },
  {
    id: 3,
    category: "CLOUD INFRASTRUCTURE",
    date: "Aug 14, 2026",
    read_time: "14 min read",
    views: "38,900",
    title:
      "Cloud Native Microservices Architecture: A Deep Dive into Kubernetes Orchestration",
    author: "Helena Rostova (VP of Cloud & SRE)",
    author_role: "Senior Hardware Benchmarking & Architecture Lead",
    editors_note:
      "An executive blueprint on architecting self-healing, multi-tenant Kubernetes clusters with zero-trust eBPF service meshes, automatic pod horizontal scaling, and sub-10ms P99 latency guarantees.",
    intro_paragraphs: [
      "Modern enterprise systems require continuous 99.999% SLA availability. Moving beyond monolithic architectures to microservices requires robust service discovery, distributed tracing, and automated canary deployments.",
      "In this analysis, we evaluate the architectural tradeoffs between Envoy proxy service meshes, eBPF-based kernel routing with Cilium, and GitOps continuous delivery pipelines.",
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    products: [
      {
        id: "k8s-blueprint",
        award: "Enterprise SRE Blueprint",
        name: "Creed Sovereign Multi-Region Kubernetes Topology (v1.31)",
        rating: "4.9 Enterprise Grade",
        stars: 5,
        price: "Open Architecture",
        image:
          "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000&auto=format&fit=crop",
        pros: [
          "Sub-10ms P99 intra-cluster API latency across 5 global availability zones",
          "Automated Cilium eBPF packet routing bypassing iptables bottlenecks",
        ],
        cons: [
          "Requires advanced SRE expertise for custom eBPF kernel debugging",
        ],
        long_text:
          "By leveraging eBPF in modern Linux kernels, network packets are routed directly at the network interface layer without incurring standard netfilter CPU overhead.",
        specs: {
          "Service Mesh Layer": "Cilium eBPF (Kernel 6.8+)",
          "Ingress Gateway": "Envoy Gateway 1.30 with mTLS 1.3",
        },
        buy_links: [],
      },
    ],
  },
];

export const POST_REVIEWS_STORE: Record<number, PeerReview[]> = {
  1: [
    {
      article_id: 1,
      name: "Dr. Marcus Vance",
      role: "Chief Technology Officer @ FinTech Global Frankfurt",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 16, 2026",
      title: "M3 Max with 128GB RAM transformed our local LLM development",
      comment:
        "This in-depth benchmark matches our internal production findings exactly. Having 128GB of unified memory allows our engineering squads to run unquantized Llama-3-70B models directly on the laptop during transatlantic flights with zero cloud dependency. Outstanding review depth.",
      helpful: 34,
    },
    {
      article_id: 1,
      name: "David Thorne",
      role: "Principal Systems Engineer @ CloudNative US",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 15, 2026",
      title: "21 hours real battery life while compiling Rust is unbelievable",
      comment:
        "Qualcomm Snapdragon X Elite has truly redefined what ARM on Windows can do. Zero fan noise during heavy code refactoring in VS Code and it easily lasted 2 full work days on a single charge.",
      helpful: 42,
    },
    {
      article_id: 1,
      name: "Elena Rostova",
      role: "Principal AI Systems Architect @ Neural Bio Labs",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 14, 2026",
      title: "ThinkPad P16 ECC memory saved our quantitative simulations",
      comment:
        "The ThinkPad P16 Gen 2 is indeed a heavy machine, but the 192GB ECC RAM configuration is the only setup that prevents silent data corruption during 14-hour Monte Carlo and financial risk simulations. Great inclusion of the acoustic dB levels as well.",
      helpful: 28,
    },
  ],
  2: [
    {
      article_id: 2,
      name: "Prof. Arthur Pendelton",
      role: "AI Research Fellow @ Oxford Institute of Data",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 16, 2026",
      title: "Masterful historical breakdown of early symbolic vs neural paradigms",
      comment:
        "Rarely do modern tech publications trace contemporary Transformer architectures back to the Rosenblatt Perceptron and McCarthy's LISP with such mathematical precision. Excellent foundational reading for junior and senior AI fellows alike.",
      helpful: 39,
    },
    {
      article_id: 2,
      name: "Dr. Sarah Jenkins",
      role: "Chief Systems Architect @ FinEdge Global",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 15, 2026",
      title: "Essential context for modern LLM architecture designers",
      comment:
        "Understanding the hardware bottlenecks of the 1950s gives brilliant clarity to why modern matrix multiplication accelerators (TPUs/GPUs) are designed the way they are. The timeline diagrams are remarkably clear.",
      helpful: 27,
    },
    {
      article_id: 2,
      name: "Jonathan Anastas",
      role: "Ador Network Services / Chief Marketing Officer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 14, 2026",
      title: "A brilliant whitepaper our entire executive team enjoyed",
      comment:
        "Concise, authoritative, and historically rigorous. Helps our board understand how the last 70 years of computational milestones led to current sovereign enterprise models.",
      helpful: 18,
    },
  ],
  3: [
    {
      article_id: 3,
      name: "Alex Linetski",
      role: "Lead Cloud Infrastructure Engineer @ HiRefresh Agency",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 16, 2026",
      title: "Cilium eBPF packet routing slashed our P99 API latency by 45%",
      comment:
        "We implemented Creed Tech's eBPF microservices blueprint directly in our EU cloud cluster. Bypassing iptables completely eliminated connection tracking bottlenecks under 100k concurrent WebSocket connections.",
      helpful: 46,
    },
    {
      article_id: 3,
      name: "Vlad Hryhoren",
      role: "VP of Site Reliability @ ScaledCore Systems",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 15, 2026",
      title: "The cleanest zero-downtime canary deployment architecture we've seen",
      comment:
        "The automated Envoy routing with mTLS 1.3 encryption out of the box passed our external SOC 2 Type II audit with flying colors. A masterclass in Kubernetes production engineering.",
      helpful: 31,
    },
    {
      article_id: 3,
      name: "Liam Gallagher",
      role: "VP of Cloud Engineering @ DataScale Global",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
      rating: 5,
      date: "Aug 14, 2026",
      title: "Robust multi-tenant isolation and automated pod autoscaling",
      comment:
        "This saved us weeks of trial and error configuring custom metrics horizontal pod autoscaling. Highly recommended for enterprise SRE teams.",
      helpful: 24,
    },
  ],
};

export const SIDEBAR_BRAND_WIRES = [
  {
    icon: "🌐",
    title: "Enter Google Play's sw...",
    category: "GOOGLE AI & DEVICES",
  },
  {
    icon: "🧠",
    title: "How Claude is accelera...",
    category: "FRONTIER AI & SCIENCE",
  },
  {
    icon: "🤖",
    title: "Introducing AI Futures",
    category: "OPENAI FOUNDATION",
  },
  {
    icon: "⚡",
    title: "Blackwell Ultra GPU Cl...",
    category: "NVIDIA DATA CENTER",
  },
  {
    icon: "🪟",
    title: "Azure Sovereign Cloud...",
    category: "MICROSOFT ENTERPRISE",
  },
];
