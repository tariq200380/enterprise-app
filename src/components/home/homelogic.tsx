"use client";

import { useState, useEffect } from "react";

// Input styling helper
const inputStyle = "w-full px-3 py-2 border border-slate-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:border-[#0052FF]";

export default function HomeLogic() {
  // SIRF 1 STATE: "project" (inquiry modal) | "review" (review modal) | "done" (success screen) | null (band)
  const [modal, setModal] = useState<"project" | "review" | "done" | null>(null);

  // Buttons par click hone par popup kholna
  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-modal]");
      const type = btn?.dataset.modal;
      if (type === "project" || type === "review") {
        e.preventDefault();
        setModal(type);
      }
    };
    document.addEventListener("click", handleOpen);
    return () => document.removeEventListener("click", handleOpen);
  }, []);

  // Form submit function (Inquiry & Review dono ke liye)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitBtn = form.querySelector<HTMLButtonElement>("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";
    }

    const fd = new FormData(form);
    const isProject = modal === "project";

    let avatar = "";
    if (!isProject) {
      const picFile = fd.get("pic") as File | null;
      if (picFile && picFile.size > 0) {
        try {
          const upData = new FormData();
          upData.append("file", picFile);
          const upRes = await fetch("/api/admin/upload", { method: "POST", body: upData });
          const upJson = await upRes.json();
          if (upJson?.url) avatar = upJson.url;
        } catch {
          // ignore upload failure
        }
      }
    }

    const data = isProject
      ? {
          client_name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company") || "Enterprise",
          phone: fd.get("phone") || "",
          service: fd.get("service") || "Software Development",
          project_details: fd.get("details") || "",
          need_nda: fd.get("nda") === "on",
        }
      : {
          client_name: fd.get("name"),
          role: fd.get("role") || "Client",
          company: fd.get("location") || "Global",
          avatar,
          rating: Number(fd.get("rating")) || 5,
          quote: fd.get("quote"),
          verified: false,
        };

    const res = await fetch(isProject ? "/api/admin/inquiries" : "/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);

    if (res?.ok) {
      setModal("done");
    } else if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = isProject ? "Submit Project Inquiry" : "Submit Review ★";
    }
  };

  // Agar popup band hai to kuch render na karein
  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative border border-slate-200 text-left shadow-2xl">
        
        {/* Cross Close Button */}
        <button
          type="button"
          onClick={() => setModal(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-black font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        {/* 1. SUCCESS SCREEN (Jab submit ho jaye) */}
        {modal === "done" ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Submission Received!
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Shukriya! Hum jald hi aapse contact karein ge.
            </p>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="px-5 py-2 bg-black text-white text-xs font-semibold rounded cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* 2. FORMS (Project ya Review) */
          <div>
            <h2 className="text-xl font-outfit font-bold mb-1 text-slate-900">
              {modal === "project" ? "Start Your Project" : "Write a Client Review"}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {modal === "project" ? "Apne project ki details darj karein:" : "Apna review darj karein:"}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
              {/* Row 1: Name & (Email / Role) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input name="name" required placeholder="Full Name *" className={inputStyle} />
                {modal === "project" ? (
                  <input name="email" type="email" required placeholder="Work Email *" className={inputStyle} />
                ) : (
                  <input name="role" required placeholder="Role & Company *" className={inputStyle} />
                )}
              </div>

              {/* Row 2: (Company & Phone) ya (Location & Rating) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {modal === "project" ? (
                  <>
                    <input name="company" placeholder="Company Name" className={inputStyle} />
                    <input name="phone" placeholder="Phone / WhatsApp" className={inputStyle} />
                  </>
                ) : (
                  <>
                    <input name="location" placeholder="Country / City" className={inputStyle} />
                    <select name="rating" defaultValue="5" className={inputStyle}>
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </>
                )}
              </div>

              {/* Project ke liye Services list */}
              {modal === "project" && (
                <select name="service" defaultValue="Software Development" className={inputStyle}>
                  <option value="Software Development">Software Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Mobile Applications">Mobile Applications</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Database Management">Database Management</option>
                  <option value="Cybersecurity & QA">Cybersecurity &amp; QA</option>
                  <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
                  <option value="Digital Marketing & Branding">Digital Marketing &amp; Branding</option>
                </select>
              )}

              {/* Review ke liye Client Photo / Pic upload option */}
              {modal === "review" && (
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-medium text-slate-600">
                    Client Picture / Photo (Optional):
                  </label>
                  <input
                    type="file"
                    name="pic"
                    accept="image/*"
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border border-slate-300 rounded p-1 cursor-pointer"
                  />
                </div>
              )}

              {/* Textarea */}
              <textarea
                name={modal === "project" ? "details" : "quote"}
                rows={3}
                required={modal === "review"}
                placeholder={modal === "project" ? "Project details ya timeline..." : "Apna review yahan likhein..."}
                className={inputStyle}
              />

              {/* NDA checkbox for Project */}
              {modal === "project" && (
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input name="nda" type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-[#0052FF]" />
                  Execute standard Non-Disclosure Agreement (NDA)
                </label>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-semibold rounded cursor-pointer"
                >
                  {modal === "project" ? "Submit Project Inquiry" : "Submit Review ★"}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
