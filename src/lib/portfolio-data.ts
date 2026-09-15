import { query } from "@/lib/db";

export interface PortfolioProjectItem {
  id?: number | string;
  title: string;
  category: string;
  client: string;
  summary: string;
  stack?: string[] | string;
  live_url?: string;
  github_url?: string;
  image_url?: string;
  created_at?: string;
}

export interface PortfolioShowcaseData {
  headline?: string;
  description?: string;
  badgeLabel?: string;
  overlayMetricTitle?: string;
  showcasePictureUrl?: string;
}

export interface TelemetryLine {
  prefix: string;
  text?: string;
  highlight?: string;
  highlightClass?: string;
  suffix?: string;
  isMuted?: boolean;
}

export interface CaseStudyTelemetry {
  terminalTitle: string;
  terminalStatus: string;
  lines: TelemetryLine[];
  metrics: { val: string; lbl: string }[];
}

export const DEFAULT_SHOWCASE: PortfolioShowcaseData = {
  headline: "Built on rigorous enterprise standards",
  description:
    "Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls.",
  badgeLabel: "HOW WE GUARANTEE EXECUTION",
  overlayMetricTitle: "100% principal engineers led",
  showcasePictureUrl: "",
};

export const DEFAULT_CASE_STUDIES: PortfolioProjectItem[] = [
  {
    id: 1,
    title: "Next-gen multi-region high frequency payment processing engine",
    category: "Fintech & Banking",
    client: "Apex Global Settlement Net • United Kingdom",
    summary:
      "Engineered ultra-low latency transaction clearing engine capable of processing 150,000 TPS with sub-12ms latency and zero transactional drift rate across distributed European and North American zones.",
    stack: ["Go", "Kubernetes", "CockroachDB", "Kafka", "AWS CloudTrail", "Redis"],
    live_url: "/contact",
    image_url:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Enterprise neural copilot & multi-agent document intelligence",
    category: "Enterprise AI & Orchestration",
    client: "Cognitive Health Analytics • United States",
    summary:
      "Autonomous multi-agent orchestration and dense vector search to automate compliance extraction across 20M+ medical unstructured diagnostic records with zero private hallucination leakage.",
    stack: ["Python", "PyTorch", "Ray Serve", "LangChain", "FastAPI", "Docker"],
    live_url: "/contact",
    image_url:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Zero-trust multi-cloud Kubernetes infrastructure & GitOps mesh",
    category: "Cloud Infrastructure & DevOps",
    client: "Nexen Global Logistics • Germany",
    summary:
      "Architected an enterprise container pipeline and automated GitOps mesh processing real-time telemetry from 50,000+ freight systems across Europe with multi-cloud automated failover.",
    stack: ["Terraform", "Kubernetes", "Istio", "ArgoCD", "Grafana", "Prometheus"],
    live_url: "/contact",
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Automated SOC 2 compliance logging & cryptographic shield",
    category: "Cybersecurity & Governance",
    client: "Sentinel Knox Trust • Switzerland",
    summary:
      "Continuous security telemetry and automated cryptographic vulnerability mitigation, heading direct ISO 27001 and SOC 2 Type II controls with real-time threat detection.",
    stack: ["HashiCorp Vault", "eBPF", "Wazuh", "Go", "AWS", "PostgreSQL"],
    live_url: "/contact",
    image_url:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
  },
];

export function getTelemetryPreset(idx: number, proj: PortfolioProjectItem): CaseStudyTelemetry {
  if (idx === 0) {
    return {
      terminalTitle: "APEX_CLEARING_ENGINE // TX_STREAM",
      terminalStatus: "● SYNCHRONIZED",
      lines: [
        { prefix: "> pipeline: ", text: "multi_region_raft_consensus" },
        { prefix: "> current_throughput: ", highlight: "150,000 TPS", suffix: " [MAX]" },
        { prefix: "> settlement_latency_p99: ", highlight: "8.4ms", highlightClass: "text-emerald-300" },
        { prefix: "> transactional_drift: ", text: "0.000000% (atomic integrity verified)", isMuted: true },
      ],
      metrics: [
        { val: "150k TPS", lbl: "Throughput ceiling" },
        { val: "<12ms", lbl: "Baseline latency" },
        { val: "99.999%", lbl: "Uptime SLA" },
      ],
    };
  }

  if (idx === 1) {
    return {
      terminalTitle: "NEURAL_DISPATCHER // RAG_CORPUS",
      terminalStatus: "● INFERENCE ACTIVE",
      lines: [
        { prefix: "> embedding_dimension: ", text: "3072 (dense float16)" },
        { prefix: "> records_indexed: ", highlight: "20,400,000 docs" },
        { prefix: "> retrieval_p99: ", highlight: "14.2ms", highlightClass: "text-emerald-300" },
        { prefix: "> pii_masking: ", text: "automated redaction verified", isMuted: true },
      ],
      metrics: [
        { val: "86%", lbl: "Staff time saved" },
        { val: "99.4%", lbl: "Extraction accuracy" },
        { val: "100%", lbl: "HIPAA compliant" },
      ],
    };
  }

  if (idx === 2) {
    return {
      terminalTitle: "GITOPS_MESH // MULTI_CLOUD",
      terminalStatus: "● SYNCHRONIZED",
      lines: [
        { prefix: "> active_clusters: ", text: "18 nodes across 4 regions" },
        { prefix: "> telemetry_throughput: ", highlight: "18,000,000 / day" },
        { prefix: "> failover_recovery_rto: ", highlight: "<1.8s", highlightClass: "text-emerald-300" },
        { prefix: "> infra_savings: ", text: "-62% annualized cloud spend", isMuted: true },
      ],
      metrics: [
        { val: "18m daily", lbl: "Events processed" },
        { val: "-62%", lbl: "Cloud infra costs" },
        { val: "<2 mins", lbl: "Deploy cycle" },
      ],
    };
  }

  if (idx === 3) {
    return {
      terminalTitle: "SECURITY_AUDIT // CONTINUOUS",
      terminalStatus: "● ZERO VULNERABILITIES",
      lines: [
        { prefix: "> encryption: ", text: "AES-256-GCM + hardware KMS" },
        { prefix: "> compliance_status: ", highlight: "SOC 2 TYPE II PASS" },
        { prefix: "> intrusion_alert_latency: ", highlight: "<4.2s", highlightClass: "text-emerald-300" },
        { prefix: "> access_controls: ", text: "biometric mTLS + short-lived JWTs", isMuted: true },
      ],
      metrics: [
        { val: "100% pass", lbl: "Continuous audit" },
        { val: "<10 sec", lbl: "Threat detection" },
        { val: "500+", lbl: "Automated tests" },
      ],
    };
  }

  const cleanTitle = (proj.title || "PROJECT")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "_")
    .slice(0, 20);

  return {
    terminalTitle: `${cleanTitle} // CLUSTER`,
    terminalStatus: "● VERIFIED BUILD",
    lines: [
      { prefix: "> orchestration: ", text: "automated_zero_downtime" },
      { prefix: "> telemetry_mesh: ", highlight: "100% operational" },
      { prefix: "> latency_budget_p99: ", highlight: "<10ms", highlightClass: "text-emerald-300" },
      { prefix: "> audit_signature: ", text: "verified ed25519 attestation", isMuted: true },
    ],
    metrics: [
      { val: "99.99%", lbl: "Uptime SLA" },
      { val: "<15ms", lbl: "Execution speed" },
      { val: "100%", lbl: "Automated CI/CD" },
    ],
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProjectItem[]> {
  try {
    const res = await query(
      `SELECT id, title, category, client, summary, stack, live_url, github_url, image_url, created_at 
       FROM portfolio_projects 
       ORDER BY id DESC`
    );
    return res.rows.map((row) => {
      let parsedStack: string[] = [];
      if (Array.isArray(row.stack)) {
        parsedStack = row.stack;
      } else if (typeof row.stack === "string") {
        try {
          const parsed = JSON.parse(row.stack);
          parsedStack = Array.isArray(parsed) ? parsed : [row.stack];
        } catch {
          parsedStack = row.stack.split(",").map((s: string) => s.trim()).filter(Boolean);
        }
      }
      return {
        ...row,
        stack: parsedStack,
      };
    });
  } catch (err) {
    console.error("Failed to load portfolio projects:", err);
    return DEFAULT_CASE_STUDIES;
  }
}

export async function getPortfolioShowcase(): Promise<PortfolioShowcaseData> {
  let showcase = { ...DEFAULT_SHOWCASE };
  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config' LIMIT 1");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;
      if (val.portfolioShowcase) {
        showcase = { ...showcase, ...val.portfolioShowcase };
      }
    }
  } catch (err) {
    console.error("Failed to load portfolio showcase:", err);
  }
  return showcase;
}
