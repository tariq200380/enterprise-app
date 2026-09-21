"use client";

import { useState, useEffect } from "react";

const inputStyle = "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF6B00]";

export default function CareerLogic() {
  // SIRF 1 STATE: null (band) | "security" (hotline) | "done" (success) | Job Title (e.g. "Senior Rust Architect")
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-modal]");
      if (btn?.dataset.modal === "job") setActive(btn.dataset.role || "Senior Talent Network");
      if (btn?.dataset.modal === "security") setActive("security");
    };
    document.addEventListener("click", handleOpen);
    return () => document.removeEventListener("click", handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const isJob = active !== "security";

    const res = await fetch(isJob ? "/api/admin/candidates" : "/api/admin/security-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isJob ? {
        candidate_name: fd.get("name"),
        email: fd.get("email"),
        domain_specialty: fd.get("specialty") || active,
        portfolio_github: fd.get("portfolio") || "",
      } : {
        reporter_name: fd.get("name"),
        email: fd.get("email"),
        category: fd.get("category") || "Security Complaint",
        severity: fd.get("severity") || "Medium",
        subject: fd.get("subject") || "Security Report",
        description: fd.get("description"),
      }),
    }).catch(() => null);

    if (res?.ok) setActive("done");
  };

  if (!active) return null;
  const isJob = active !== "security" && active !== "done";

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative border border-slate-200 text-left shadow-2xl">
        <button type="button" onClick={() => setActive(null)} className="absolute top-4 right-4 text-slate-400 hover:text-black font-bold text-lg cursor-pointer">✕</button>

        {active === "done" ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-orange-50 border-2 border-orange-300 text-[#FF6B00] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">✓</div>
            <h3 className="text-lg font-outfit font-bold text-slate-900 mb-1">Submission Received!</h3>
            <p className="text-xs text-slate-500 mb-5">Shukriya! Hum jald hi aapse contact karein ge.</p>
            <button type="button" onClick={() => setActive(null)} className="px-5 py-2 bg-black text-white text-xs font-semibold rounded cursor-pointer">Close Window</button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-outfit font-bold mb-1 text-slate-900">{isJob ? "Apply for Engineering Role" : "Security & Founder Hotline"}</h2>
            <p className="text-xs text-slate-500 mb-4">{isJob ? `Position: ${active}` : "Submit your security report or architecture proposal:"}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input name="name" required placeholder="Full Name *" className={inputStyle} />
                <input name="email" type="email" required placeholder="Work Email *" className={inputStyle} />
              </div>

              {isJob ? (
                <>
                  <input name="specialty" defaultValue={active} placeholder="Domain / Primary Specialty" className={inputStyle} />
                  <input name="portfolio" placeholder="GitHub / LinkedIn / Portfolio URL" className={inputStyle} />
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <select name="category" defaultValue="Security Complaint" className={inputStyle}>
                      <option value="Security Complaint">Security Complaint</option>
                      <option value="Vulnerability Disclosure">Vulnerability Disclosure</option>
                      <option value="Architecture Proposal">Architecture Proposal</option>
                      <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                    <select name="severity" defaultValue="Medium" className={inputStyle}>
                      <option value="Low">Low Severity</option>
                      <option value="Medium">Medium Severity</option>
                      <option value="High">High Severity</option>
                      <option value="Critical">Critical Severity</option>
                    </select>
                  </div>
                  <input name="subject" required placeholder="Subject / Brief Summary *" className={inputStyle} />
                  <textarea name="description" rows={3} required placeholder="Details, reproduction steps, or proposal summary..." className={inputStyle} />
                </>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setActive(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-semibold rounded cursor-pointer">{isJob ? "Submit Application" : "Transmit Report"}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
