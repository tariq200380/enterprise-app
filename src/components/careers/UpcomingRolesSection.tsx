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

const ROLES: Role[] = [
  {
    id: "designer",
    title: "Senior Product Designer (Design Systems & WCAG AAA)",
    department: "UI/UX & Design",
    categoryBadge: "UI/UX & DESIGN",
    location: "REMOTE (GLOBAL)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description:
      "Own the visual and interactive systems for complex enterprise portals, dashboards, and mobile applications.",
    tags: ["Figma", "Design Systems", "WCAG AAA", "Prototyping", "User Research"],
  },
  {
    id: "sre",
    title: "Cloud DevOps & SRE Architect (Kubernetes & Terraform)",
    department: "Cloud & SRE",
    categoryBadge: "CLOUD & INFRASTRUCTURE",
    location: "REMOTE (GLOBAL)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description:
      "Architect multi-cloud, automated, self-healing infrastructure with zero configuration drift and 99.99% SLA.",
    tags: ["AWS", "Kubernetes", "Terraform", "Datadog", "CI/CD", "Docker"],
  },
  {
    id: "solutions",
    title: "Solutions Architect & Technical Engagement Lead",
    department: "Solutions & Growth",
    categoryBadge: "SOLUTIONS & GROWTH",
    location: "REMOTE / SAN FRANCISCO (USA)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description:
      "Bridge client business goals with engineering execution by leading technical discovery and architectural scoping.",
    tags: ["Solutions Architecture", "Technical Scoping", "Cloud", "Client Pods"],
  },
  {
    id: "ai",
    title: "Principal AI & LLM Systems Engineer (PyTorch & CUDA)",
    department: "AI & Machine Learning",
    categoryBadge: "AI & MACHINE LEARNING",
    location: "REMOTE / LONDON (UK)",
    statusBadge: "ANNOUNCEMENT COMING SOON",
    description:
      "Develop and deploy sovereign fine-tuned open-source LLM inference clusters on private on-prem GPU hardware.",
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

export default function UpcomingRolesSection() {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [modalRole, setModalRole] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const filteredRoles = ROLES.filter((role) => {
    if (selectedDept === "All Departments") return true;
    if (selectedDept === "Engineering") {
      return (
        role.department === "Cloud & SRE" ||
        role.department === "AI & Machine Learning" ||
        role.categoryBadge.includes("CLOUD") ||
        role.categoryBadge.includes("AI")
      );
    }
    return role.department.toLowerCase() === selectedDept.toLowerCase();
  });

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setStatusMessage("");

    const fd = new FormData(e.currentTarget);
    const candidate_name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const domain_specialty = (fd.get("specialty") as string)?.trim() || modalRole || "General Engineering";
    const portfolio_github = (fd.get("portfolio") as string)?.trim() || "";

    if (!candidate_name || !email) {
      setSubmitStatus("error");
      setStatusMessage("Please provide your name and email address.");
      return;
    }

    try {
      const res = await fetch("/api/admin/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_name,
          email,
          domain_specialty,
          portfolio_github,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setSubmitStatus("success");
      setStatusMessage("Registration received! You are now on our priority hiring alert list.");

      // Auto dismiss modal after 3 seconds
      setTimeout(() => {
        setModalRole(null);
        setSubmitStatus("idle");
        setStatusMessage("");
      }, 3000);
    } catch (err: any) {
      setSubmitStatus("error");
      setStatusMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="roles" className="w-full bg-white border-t border-gray-200/80 py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <span className="text-xs font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
          OPEN ENGINEERING VACANCIES
        </span>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
          Explore Active Pod Openings &amp; Upcoming Roles
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
        </p>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
          {DEPARTMENTS.map((dept) => {
            const isActive = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`text-xs px-4 py-2 rounded-md transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#0052FF] text-white font-semibold shadow-xs"
                    : "bg-white hover:bg-gray-50 text-gray-600 font-medium border border-gray-200/80"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Job Openings Cards List */}
        <div className="flex flex-col gap-4 sm:gap-5 mt-10 sm:mt-12 max-w-6xl mx-auto text-left">
          {filteredRoles.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-500 text-sm">
              No roles currently listed in this category. Register your interest below.
            </div>
          ) : (
            filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-blue-50 text-[#0052FF] border border-blue-100/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {role.categoryBadge}
                    </span>
                    <span className="bg-gray-50 text-gray-600 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                      {role.location}
                    </span>
                    <span className="bg-amber-50 text-amber-600 border border-amber-200/80 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {role.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mt-3 tracking-tight">
                    {role.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed font-normal">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-50 text-gray-600 border border-gray-200/80 text-[11px] font-medium px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalRole(role.title);
                    setSubmitStatus("idle");
                    setStatusMessage("");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all duration-200 shrink-0 self-start md:self-center cursor-pointer"
                >
                  <span>🔔</span>
                  <span>Register for Alert</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Don't see your exact engineering domain? Bottom Box */}
        <div className="mt-8 rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-6xl mx-auto shadow-xs">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Don&apos;t see your exact engineering domain?
            </h3>
            <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
              Register your coordinates with our Senior Talent Network. When new high-concurrency or AI pod requirements open, we contact registered candidates before public job listings.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalRole("Senior Talent Network");
              setSubmitStatus("idle");
              setStatusMessage("");
            }}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.99] transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer"
          >
            + Register in Talent Network
          </button>
        </div>
      </div>

      {/* Role Alert / Talent Network Registration Modal */}
      {modalRole && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-150 text-left">
            <button
              type="button"
              onClick={() => {
                setModalRole(null);
                setSubmitStatus("idle");
                setStatusMessage("");
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            >
              ✕
            </button>

            {submitStatus === "success" ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Registration Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {statusMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalRole(null);
                    setSubmitStatus("idle");
                    setStatusMessage("");
                  }}
                  className="mt-6 px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
                  Priority Talent Registration
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  {modalRole === "Senior Talent Network"
                    ? "Join Senior Talent Network"
                    : `Register Alert: ${modalRole}`}
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-5 leading-relaxed font-normal">
                  Submit your coordinates to receive priority dispatch when this pod opens for interview scheduling.
                </p>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Work Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Primary Engineering Specialty *
                    </label>
                    <input
                      name="specialty"
                      type="text"
                      defaultValue={modalRole}
                      required
                      className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      GitHub / Portfolio / LinkedIn URL
                    </label>
                    <input
                      name="portfolio"
                      type="text"
                      placeholder="github.com/username or linkedin.com/in/..."
                      className="w-full h-11 px-3.5 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      {statusMessage}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalRole(null);
                        setSubmitStatus("idle");
                        setStatusMessage("");
                      }}
                      className="px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="px-5 py-2.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      {submitStatus === "loading" ? "Submitting..." : "Submit Registration"}
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
