"use client";

import { useState, useEffect } from "react";

const inputStyle =
  "w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#FF6B00] transition-colors";

export default function CareerLogic() {
  const [active, setActive] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    setActive(null);
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-modal]");
      if (btn?.dataset.modal === "job") {
        setErrorMessage(null);
        setActive(btn.dataset.role || "Senior Talent Network");
      }
      if (btn?.dataset.modal === "security") {
        setErrorMessage(null);
        setActive("security");
      }
    };
    document.addEventListener("click", handleOpen);
    return () => document.removeEventListener("click", handleOpen);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [active]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const fd = new FormData(e.currentTarget);
    const isJob = active !== "security";

    try {
      const res = await fetch(
        isJob ? "/api/admin/candidates" : "/api/admin/security-reports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isJob
              ? {
                  candidate_name: fd.get("name"),
                  email: fd.get("email"),
                  domain_specialty: fd.get("specialty") || active,
                  portfolio_github: fd.get("portfolio") || "",
                }
              : {
                  reporter_name: fd.get("name"),
                  email: fd.get("email"),
                  category: fd.get("category") || "Security Complaint",
                  severity: fd.get("severity") || "Medium",
                  subject: fd.get("subject") || "Security Report",
                  description: fd.get("description"),
                }
          ),
        }
      );

      if (res.ok) {
        setActive("done");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(
          data?.error || "Submission failed. Please check your inputs and try again."
        );
      }
    } catch {
      setErrorMessage("Network error occurred. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!active) return null;
  const isJob = active !== "security" && active !== "done";

  return (
    <div
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-modal-title"
        className="bg-white rounded-xl max-w-lg w-full p-6 relative border border-slate-200 text-left shadow-2xl"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-slate-400 hover:text-black font-bold text-lg cursor-pointer p-1"
        >
          ✕
        </button>

        {active === "done" ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-orange-50 border-2 border-orange-300 text-[#FF6B00] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ✓
            </div>
            <h3
              id="career-modal-title"
              className="text-lg font-outfit font-bold text-slate-900 mb-1"
            >
              Submission Received!
            </h3>
            <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto leading-relaxed">
              Thank you! Our engineering talent team will review your coordinates and contact you shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <h2
              id="career-modal-title"
              className="text-xl font-outfit font-bold mb-1 text-slate-900"
            >
              {isJob ? "Apply for Engineering Role" : "Security & Founder Hotline"}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {isJob
                ? `Position: ${active}`
                : "Submit your security report or architecture proposal:"}
            </p>

            {errorMessage && (
              <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  name="name"
                  required
                  aria-label="Full Name"
                  placeholder="Full Name *"
                  className={inputStyle}
                  disabled={isSubmitting}
                />
                <input
                  name="email"
                  type="email"
                  required
                  aria-label="Work Email"
                  placeholder="Work Email *"
                  className={inputStyle}
                  disabled={isSubmitting}
                />
              </div>

              {isJob ? (
                <>
                  <input
                    name="specialty"
                    defaultValue={active}
                    aria-label="Domain or Primary Specialty"
                    placeholder="Domain / Primary Specialty"
                    className={inputStyle}
                    disabled={isSubmitting}
                  />
                  <input
                    name="portfolio"
                    aria-label="GitHub, LinkedIn, or Portfolio URL"
                    placeholder="GitHub / LinkedIn / Portfolio URL"
                    className={inputStyle}
                    disabled={isSubmitting}
                  />
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <select
                      name="category"
                      defaultValue="Security Complaint"
                      aria-label="Report Category"
                      className={inputStyle}
                      disabled={isSubmitting}
                    >
                      <option value="Security Complaint">Security Complaint</option>
                      <option value="Vulnerability Disclosure">Vulnerability Disclosure</option>
                      <option value="Architecture Proposal">Architecture Proposal</option>
                      <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                    <select
                      name="severity"
                      defaultValue="Medium"
                      aria-label="Severity Level"
                      className={inputStyle}
                      disabled={isSubmitting}
                    >
                      <option value="Low">Low Severity</option>
                      <option value="Medium">Medium Severity</option>
                      <option value="High">High Severity</option>
                      <option value="Critical">Critical Severity</option>
                    </select>
                  </div>
                  <input
                    name="subject"
                    required
                    aria-label="Subject Summary"
                    placeholder="Subject / Brief Summary *"
                    className={inputStyle}
                    disabled={isSubmitting}
                  />
                  <textarea
                    name="description"
                    rows={3}
                    required
                    aria-label="Detailed Description"
                    placeholder="Details, reproduction steps, or proposal summary..."
                    className={inputStyle}
                    disabled={isSubmitting}
                  />
                </>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black cursor-pointer transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05d00] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold rounded cursor-pointer transition-all flex items-center gap-1.5"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isJob
                    ? "Submit Application"
                    : "Transmit Report"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
