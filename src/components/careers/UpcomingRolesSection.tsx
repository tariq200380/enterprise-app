"use client";

import { useState } from "react";

interface Role {
  id: string;
  title: string;
  department: string;
  categoryBadge: string;
  location: string;
  statusBadge: string;
  description: string;
  tags: string[];
}

export interface DbJob {
  id: number;
  title: string;
  department: string;
  location: string;
  status: string;
  description: string;
  tags: string[] | string;
}

const BASELINE_ROLES: Role[] = [
  {
    id: "pds",
    title: "Principal Distributed Systems Engineer",
    department: "Engineering",
    categoryBadge: "ENGINEERING",
    location: "Remote · Global · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Architect and scale mission-critical distributed runtime and consensus engines with extreme fault tolerance and low latency.",
    tags: ["Rust", "Distributed Systems", "Raft", "Linux", "Async IO"],
  },
  {
    id: "rust-plat",
    title: "Senior Rust Platform Engineer",
    department: "Engineering",
    categoryBadge: "ENGINEERING",
    location: "Remote · EU hours · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Build high-throughput backend services and core micro-runtimes using modern safe Rust and zero-cost abstractions.",
    tags: ["Rust", "Tokio", "gRPC", "High-Throughput", "Systems"],
  },
  {
    id: "ai",
    title: "Principal AI & LLM Systems Engineer (PyTorch & CUDA)",
    department: "AI & Machine Learning",
    categoryBadge: "AI & MACHINE LEARNING",
    location: "Remote · London / Global · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Develop and deploy sovereign fine-tuned open-source LLM inference clusters on private on-prem GPU hardware.",
    tags: ["PyTorch", "vLLM", "CUDA", "Python", "Triton", "Ollama"],
  },
  {
    id: "designer",
    title: "Senior Product Designer (Design Systems & WCAG AAA)",
    department: "UI/UX & Design",
    categoryBadge: "UI/UX & DESIGN",
    location: "Remote · Global · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Own the visual and interactive systems for complex enterprise portals, dashboards, and mobile applications.",
    tags: ["Figma", "Design Systems", "WCAG AAA", "Prototyping", "User Research"],
  },
  {
    id: "sre",
    title: "Cloud DevOps & SRE Architect (Kubernetes & Terraform)",
    department: "Cloud & SRE",
    categoryBadge: "CLOUD & INFRASTRUCTURE",
    location: "Remote · Global · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Architect multi-cloud, automated, self-healing infrastructure with zero configuration drift and 99.99% SLA.",
    tags: ["AWS", "Kubernetes", "Terraform", "Datadog", "CI/CD", "Docker"],
  },
  {
    id: "solutions",
    title: "Solutions Architect & Technical Engagement Lead",
    department: "Solutions & Growth",
    categoryBadge: "SOLUTIONS & GROWTH",
    location: "Remote · San Francisco · Full-time",
    statusBadge: "ACTIVE POD OPENING",
    description: "Bridge client business goals with engineering execution by leading technical discovery and architectural scoping.",
    tags: ["Solutions Architecture", "Technical Scoping", "Cloud", "Client Pods"],
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "AI & Machine Learning",
  "UI/UX & Design",
  "Cloud & SRE",
  "Solutions & Growth",
];

const normalizeDept = (dept: string = "") => {
  const d = dept.toLowerCase();
  if (d.includes("ai") || d.includes("ml")) return "AI & Machine Learning";
  if (d.includes("design") || d.includes("ui")) return "UI/UX & Design";
  if (d.includes("cloud") || d.includes("sre")) return "Cloud & SRE";
  if (d.includes("solution") || d.includes("growth")) return "Solutions & Growth";
  return "Engineering";
};

const parseTags = (tags: any): string[] => {
  if (Array.isArray(tags)) return tags;
  try { return JSON.parse(tags); } catch { return tags ? [String(tags)] : ["Enterprise"]; }
};

export default function UpcomingRolesSection({ initialDbJobs = [] }: { initialDbJobs?: DbJob[] }) {
  const [selectedDept, setSelectedDept] = useState("Engineering");
  const [modalRole, setModalRole] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const dbRoles: Role[] = initialDbJobs.map((dj) => ({
    id: `db-${dj.id}`,
    title: dj.title,
    department: normalizeDept(dj.department),
    categoryBadge: (dj.department || "ENGINEERING").toUpperCase(),
    location: dj.location.includes("·") ? dj.location : `Remote · ${dj.location} · Full-time`,
    statusBadge: dj.status === "ACTIVE" ? "ACTIVE POD OPENING" : dj.status,
    description: dj.description,
    tags: parseTags(dj.tags),
  }));

  const allRoles = [...BASELINE_ROLES, ...dbRoles];

  const filteredRoles = allRoles.filter((role) => {
    if (selectedDept === "All Departments") return true;
    if (selectedDept === "Engineering") {
      return (
        role.department === "Engineering" ||
        role.categoryBadge.includes("ENGINEERING")
      );
    }
    return role.department.toLowerCase() === selectedDept.toLowerCase();
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const candidate_name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const domain_specialty = (fd.get("specialty") as string)?.trim() || modalRole || "Engineering";
    const portfolio_github = (fd.get("portfolio") as string)?.trim() || "";

    if (!candidate_name || !email) {
      setStatus("error");
      setMsg("Please provide your name and email.");
      return;
    }

    try {
      const res = await fetch("/api/admin/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_name, email, domain_specialty, portfolio_github }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Registration failed.");

      setStatus("success");
      setMsg("Registration received! You are on our priority hiring alert list.");
      setTimeout(() => {
        setModalRole(null);
        setStatus("idle");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Something went wrong.");
    }
  };

  const inputClass = "w-full h-11 px-3.5 bg-slate-50 border border-slate-200 text-sm rounded-lg outline-none focus:border-[#FF6B00] focus:bg-white transition-colors";

  return (
    <section id="roles" className="w-full bg-[#FAFBFC] border-b border-slate-200/70 py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
          OPEN ENGINEERING VACANCIES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
          Explore active pod<br className="hidden sm:inline" /> openings &amp; upcoming roles
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
        </p>

        {/* Department Tabs (Pill filters matching reference design) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`text-xs px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                selectedDept === dept
                  ? "bg-[#FF6B00] text-white font-semibold shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="flex flex-col gap-3.5 sm:gap-4 mt-10 sm:mt-12 max-w-5xl mx-auto text-left">
          {filteredRoles.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/90 text-slate-500 text-sm">
              No active roles currently listed in this category. Register with our Talent Network below.
            </div>
          ) : (
            filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal">
                    {role.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalRole(role.title);
                    setStatus("idle");
                    setMsg("");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <span>Apply</span>
                  <span>&rarr;</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Talent Network Card */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-5xl mx-auto shadow-xs">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Don&apos;t see your exact engineering domain?
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
              Register your coordinates with our Senior Talent Network. When new pod requirements open, we contact registered candidates before public listings.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalRole("Senior Talent Network");
              setStatus("idle");
              setMsg("");
            }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            Talent Network
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {modalRole && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative text-left">
            <button
              type="button"
              onClick={() => setModalRole(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-orange-50 text-[#FF6B00] border border-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Registration Confirmed!</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">{msg}</p>
                <button
                  type="button"
                  onClick={() => setModalRole(null)}
                  className="mt-6 px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1">Priority Talent Registration</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  {modalRole === "Senior Talent Network" ? "Join Senior Talent Network" : `Apply / Register: ${modalRole}`}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed font-normal">
                  Submit your coordinates to receive priority dispatch when this pod opens for interview scheduling.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input name="name" type="text" required placeholder="e.g. Alex Henderson" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email Address *</label>
                    <input name="email" type="email" required placeholder="alex@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Specialty *</label>
                    <input name="specialty" type="text" defaultValue={modalRole} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio URL</label>
                    <input name="portfolio" type="text" placeholder="github.com/username" className={inputClass} />
                  </div>
                  {status === "error" && <p className="text-xs text-red-600 font-medium">{msg}</p>}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalRole(null)}
                      className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      {status === "loading" ? "Submitting..." : "Submit Registration"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
