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
    id: "designer",
    title: "Senior Product Designer (Design Systems & WCAG AAA)",
    department: "UI/UX & Design",
    categoryBadge: "UI/UX & DESIGN",
    location: "REMOTE (GLOBAL)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description: "Own the visual and interactive systems for complex enterprise portals, dashboards, and mobile applications.",
    tags: ["Figma", "Design Systems", "WCAG AAA", "Prototyping", "User Research"],
  },
  {
    id: "sre",
    title: "Cloud DevOps & SRE Architect (Kubernetes & Terraform)",
    department: "Cloud & SRE",
    categoryBadge: "CLOUD & INFRASTRUCTURE",
    location: "REMOTE (GLOBAL)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description: "Architect multi-cloud, automated, self-healing infrastructure with zero configuration drift and 99.99% SLA.",
    tags: ["AWS", "Kubernetes", "Terraform", "Datadog", "CI/CD", "Docker"],
  },
  {
    id: "solutions",
    title: "Solutions Architect & Technical Engagement Lead",
    department: "Solutions & Growth",
    categoryBadge: "SOLUTIONS & GROWTH",
    location: "REMOTE / SAN FRANCISCO (USA)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description: "Bridge client business goals with engineering execution by leading technical discovery and architectural scoping.",
    tags: ["Solutions Architecture", "Technical Scoping", "Cloud", "Client Pods"],
  },
  {
    id: "ai",
    title: "Principal AI & LLM Systems Engineer (PyTorch & CUDA)",
    department: "AI & Machine Learning",
    categoryBadge: "AI & MACHINE LEARNING",
    location: "REMOTE / LONDON (UK)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description: "Develop and deploy sovereign fine-tuned open-source LLM inference clusters on private on-prem GPU hardware.",
    tags: ["PyTorch", "vLLM", "CUDA", "Python", "Triton", "Ollama"],
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
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [modalRole, setModalRole] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const dbRoles: Role[] = initialDbJobs.map((dj) => ({
    id: `db-${dj.id}`,
    title: dj.title,
    department: normalizeDept(dj.department),
    categoryBadge: (dj.department || "ENGINEERING").toUpperCase(),
    location: dj.location || "REMOTE (GLOBAL)",
    statusBadge: dj.status === "ACTIVE" ? "ACTIVE POD OPENING" : dj.status,
    description: dj.description,
    tags: parseTags(dj.tags),
  }));

  const allRoles = [...dbRoles, ...BASELINE_ROLES];

  const filteredRoles = allRoles.filter((role) => {
    if (selectedDept === "All Departments") return true;
    if (selectedDept === "Engineering") {
      return (
        role.department === "Engineering" ||
        role.department === "Cloud & SRE" ||
        role.department === "AI & Machine Learning" ||
        role.categoryBadge.includes("ENGINEERING") ||
        role.categoryBadge.includes("CLOUD") ||
        role.categoryBadge.includes("AI")
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

  const inputClass = "w-full h-11 px-3.5 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:border-[#0052FF] focus:bg-white transition-colors";

  return (
    <section id="roles" className="w-full bg-white border-t border-gray-200/80 py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
          OPEN ENGINEERING VACANCIES
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
          Explore Active Pod Openings &amp; Upcoming Roles
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
        </p>

        {/* Department Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`text-xs px-4 py-2 rounded-md transition-all cursor-pointer ${
                selectedDept === dept
                  ? "bg-[#0052FF] text-white font-semibold shadow-xs"
                  : "bg-white hover:bg-gray-50 text-gray-600 font-medium border border-gray-200/80"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="flex flex-col gap-4 sm:gap-5 mt-10 sm:mt-12 max-w-6xl mx-auto text-left">
          {filteredRoles.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-500 text-sm">
              No roles currently listed in this category. Register your interest below.
            </div>
          ) : (
            filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {role.categoryBadge}
                    </span>
                    <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      {role.location}
                    </span>
                    <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {role.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">{role.title}</h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">{role.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {role.tags.map((tag) => (
                      <span key={tag} className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalRole(role.title);
                    setStatus("idle");
                    setMsg("");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <span>🔔</span>
                  <span>Register for Alert</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Talent Network Card */}
        <div className="mt-8 rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-6xl mx-auto shadow-xs">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">Don&apos;t see your exact engineering domain?</h3>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
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
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            + Register in Talent Network
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {modalRole && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative text-left">
            <button
              type="button"
              onClick={() => setModalRole(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Registration Confirmed!</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">{msg}</p>
                <button
                  type="button"
                  onClick={() => setModalRole(null)}
                  className="mt-6 px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">Priority Talent Registration</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  {modalRole === "Senior Talent Network" ? "Join Senior Talent Network" : `Register Alert: ${modalRole}`}
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed font-normal">
                  Submit your coordinates to receive priority dispatch when this pod opens for interview scheduling.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input name="name" type="text" required placeholder="e.g. Alex Henderson" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email Address *</label>
                    <input name="email" type="email" required placeholder="alex@example.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Specialty *</label>
                    <input name="specialty" type="text" defaultValue={modalRole} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">GitHub / Portfolio URL</label>
                    <input name="portfolio" type="text" placeholder="github.com/username" className={inputClass} />
                  </div>
                  {status === "error" && <p className="text-xs text-red-600 font-medium">{msg}</p>}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalRole(null)}
                      className="px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-5 py-2.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer disabled:opacity-50"
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
