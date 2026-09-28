export interface CategoryGroup {
  id: string;
  name: string;
  h2Title: string;
  description: string;
  badge: string;
}

export const DEFAULT_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "fintech-banking",
    name: "Fintech & Banking",
    h2Title: "High-Concurrency Fintech, Clearing & Payment Processing Engines",
    description:
      "Ultra-low latency transaction clearing, distributed consistency, and sub-12ms financial messaging engineered across distributed zones.",
    badge: "FINTECH & TRANSACTIONS",
  },
  {
    id: "ai-automation",
    name: "Enterprise AI & Orchestration",
    h2Title: "Enterprise AI Solutions, LLMs & Autonomous Agent Pipelines",
    description:
      "Dense vector search, private RAG pipelines, and automated multi-agent diagnostic intelligence for regulated enterprise domains.",
    badge: "AI & NEURAL ARCHITECTURE",
  },
  {
    id: "cloud-devops",
    name: "Cloud Infrastructure & DevOps",
    h2Title: "Cloud Infrastructure, Kubernetes & DevOps Modernization",
    description:
      "Multi-cloud architectures, zero-trust container pipelines, automated GitOps meshes, and 99.99% uptime SLA engineering.",
    badge: "CLOUD & RESILIENCE",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Governance",
    h2Title: "Zero-Trust Cybersecurity, SOC 2 Compliance & Cryptographic Defense",
    description:
      "Continuous security telemetry, eBPF inspection, and automated cryptographic vulnerability mitigation meeting ISO 27001 standards.",
    badge: "CYBERSECURITY & COMPLIANCE",
  },
];
