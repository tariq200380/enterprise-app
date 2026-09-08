"use client";

import React from "react";
import { Testimonial } from "@/types/admin";

interface TestimonialsModuleProps {
  testimonials: Testimonial[];
  onOpenAddModal: () => void;
  onToggleVerified: (id: number, current: boolean) => void;
  onDeleteTestimonial: (id: number) => void;
}

export default function TestimonialsModule({
  testimonials,
  onOpenAddModal,
  onToggleVerified,
  onDeleteTestimonial,
}: TestimonialsModuleProps) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Client Testimonials &amp; Social Proof</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Verified endorsements from enterprise CTOs, VPs of Engineering, and managing directors.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer"
        >
          <span>+</span> <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{t.client_name}</h4>
                  <span className="text-[11px] text-[#64748B] block">{t.role}, {t.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-xs">★</span>
                ))}
              </div>
              <p className="text-xs text-[#334155] leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100 text-xs">
              <button
                onClick={() => onToggleVerified(t.id, t.verified)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  t.verified ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                }`}
              >
                {t.verified ? "✓ Verified Client" : "Unverified"}
              </button>
              <button
                onClick={() => onDeleteTestimonial(t.id)}
                className="text-red-600 hover:underline font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
